import { useState } from "react";
import { currentDiscountCollection, dateDiffInDays, dateFormat, doReprice, readyToRemove, readyToReprice } from "../helpers";
import { CONST_COLLECTIONS } from "../constants";

export interface IuseReadProducts {
    newArrivals?: {
        do: boolean
        age: number
    }
    tags?: {
        do: boolean
        reprice: boolean
        inStock: boolean
    }
    reprice?: {
        do: boolean
        inStock: boolean
    }
    // inStock?: boolean
    outOfStock?: {
        do: boolean
        age: number
        except: string[]
        exceptAge: number
    }
}
export interface IdoReadAll {
    types: string[]
    vendor?: string | undefined
    status?: string
    product?: string | undefined
    age?: number
}
export function useReadAllProducts({ newArrivals = { do: false, age: 0 }, tags = { do: false, reprice: false, inStock: false }, reprice = { do: false, inStock: false }, outOfStock = { do: false, age: 0, except: [], exceptAge: 0 } }: IuseReadProducts) {
    const [theProducts, setTheProducts] = useState<IShopifyProd[] | undefined>([])
    const [progress, setProgress] = useState(0)
    const [quantity, setQuantity] = useState(0)

    const headers = new Headers();
    var url = `${import.meta.env.VITE_AZURE_FUNC_URL}/api/HFHTShopify`;

    const doReset = () => {
        setTheProducts(undefined)
    }
    const doReadProducts = async ({ types, vendor, status = 'active', product, age = 999 }: IdoReadAll) => {
        console.log('useReadProduct', prompt)
        var productList: IShopifyProd[] = []
        let body: any = newArrivals.do ?
            {
                method: 'getCollection',
                collections: [CONST_COLLECTIONS["newly-added-items"]],
                product: '',
            }
            :
            {
                method: 'getProds',
                collections: '',
                product: product ? `handle=${product}` : '',
                status: status,
            }
        vendor && (body.vendor = vendor)
        for (var i = 0; i < (newArrivals.do ? 1 : types.length); i++) {
            body.type = types[i]
            let options = {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            }
            try {
                const response = await fetch(url, options);
                console.log(response);
                if (!response.ok) throw `Shopify Product failed with ${response.status}: ${response.statusText}`
                const shopifyResponse = (await response.json());
                console.log(shopifyResponse)
                productList = productList.concat(
                    shopifyResponse.theList.data.filter((item: IShopifyProd, idx: number) => {
                        if (reprice.do) {
                            if (reprice.inStock) {
                                if (item.variants[0].inventory_quantity > 0) {
                                    let thePct = readyToReprice(item, currentDiscountCollection())
                                    console.log(thePct)
                                    return thePct !== null
                                } else {
                                    return false
                                }
                            }
                        }
                        if (tags.do) {
                            if (tags.inStock) {
                                if (item.variants[0].inventory_quantity > 0) {
                                    return dateDiffInDays(dateFormat(item.created_at), dateFormat(null)) <= age
                                } else {
                                    return false
                                }
                            }
                        }
                        if (outOfStock.do) {
                            let useThisAge = outOfStock.except.includes(item.product_type) ? outOfStock.exceptAge : outOfStock.age
                            return (item.variants[0].inventory_quantity < 1) && readyToRemove(item, useThisAge)
                        }
                        if (newArrivals.do) {
                            return dateDiffInDays(dateFormat(item.created_at), dateFormat(null)) > newArrivals.age
                        }
                        return true
                    })
                )
                if (tags.reprice || reprice.do) {
                    reprice && (productList = doReprice(productList))
                }
                setProgress(Math.round(((i + 1) / (newArrivals.do ? 1 : types.length)) * 100))
                console.log(shopifyResponse.theList.data);
                console.log(productList)
                await (delay(3000))
                console.log('delayed');

                if (!product) {
                    if (shopifyResponse.theList.err) alert(shopifyResponse.theList.err)
                }
            }
            catch (error) {
                console.log(error);
                alert(error);
            }
        }
        // setTheProducts([...new Set(productList)])
        let noDups = productList.filter((item, idx) => {
            console.log(idx === productList.findIndex(o => item.id === o.id))
            return idx === productList.findIndex(o => item.id === o.id)
        })
        setTheProducts(noDups)
        setQuantity(noDups.length)
    }
    return [theProducts, doReadProducts, doReset, progress, quantity] as const;
}
function delay(ms: number) {
    return new Promise(resolve => { setTimeout(() => { resolve('') }, ms) })
}