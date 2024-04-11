import { useState } from "react";

export interface IuseUpdateProducts {
    newArrivals?: boolean
    reprice?: boolean                   // update the variant pricing
    archive?: boolean                   // update the product status
    nosave?: boolean
}
export interface IdoUpdateAll {
    productList: IShopifyProd[]
    status?: string
}
export function useUpdateAllProducts({ newArrivals = false, reprice = false, archive = false, nosave = false }: IuseUpdateProducts) {
    // const [theProducts, setTheProducts] = useState<IShopifyProd[] | undefined>([])
    const [progress, setProgress] = useState(0)

    const headers = new Headers();
    var url = `${import.meta.env.VITE_AZURE_FUNC_URL}/api/HFHTShopify`;

    const doUpdateProducts = async ({ productList, status = 'active' }: IdoUpdateAll) => {
        console.log('useUpdateAllProducts', productList, status, nosave, reprice, archive)
        if (!reprice && !archive && !newArrivals) { console.log('doUpdateProducts, no method selected'); return }

        for (var i = 0; i < productList.length; i++) {
            var theBody = ''
            if (archive) {
                theBody = JSON.stringify({
                    method: 'updateProd',
                    product: {
                        handle: productList[i].id,
                        body: JSON.stringify({
                            "product": {
                                "id": productList[i].id,
                                "status": 'archived'
                            }
                        })
                    }
                })
            }
            if (reprice) {
                theBody = JSON.stringify({
                    method: 'updateVariant',
                    product: {
                        handle: productList[i].variants[0].id,
                        body: JSON.stringify({ "variant": { "id": productList[i].variants[0].id, "price": productList[i].variants[0].price } })
                    }
                })
            }
            if (newArrivals) {
                theBody = JSON.stringify({
                    method: 'removeProdFromCollect',
                    collections: [productList[i].id]
                })
            }
            let options = {
                method: "POST",
                headers: headers,
                body: theBody
            }
            try {
                console.log(options)
                if (!nosave) {
                    const response = await fetch(url, options);
                    console.log(response);
                    if (!response.ok) throw `Shopify Product failed with ${response.status}: ${response.statusText}`
                    const shopifyResponse = (await response.json());
                    console.log(shopifyResponse);
                    if (shopifyResponse.theProduct.err) { console.log(shopifyResponse.theProduct.err) }
                }
                setProgress(Math.round(((i + 1) / productList.length) * 100))
                await (delay(2000))
                console.log('delayed');
            }
            catch (error) {
                console.log(error);
                alert(error);
            }
        }
    }
    return [doUpdateProducts, progress] as const;
}
function delay(ms: number) {
    return new Promise(resolve => { setTimeout(() => { resolve('') }, ms) })
}