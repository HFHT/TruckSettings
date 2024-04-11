import { currentDiscountCollection, readyToReprice } from "."

export function repriceProducts(theProducts: IShopifyProd[], doUpdate: Function): number {
    const theCollectionPct = currentDiscountCollection()
    let theSize = 0
    console.log(theProducts, theCollectionPct)

    theProducts.forEach((thisProduct: IShopifyProd, idx: number) => {
        let repricePct = readyToReprice(thisProduct, theCollectionPct)
        // console.log(repricePct)
        if (repricePct) {
            let theNewPrice = Number(thisProduct.variants[0].compare_at_price) * repricePct
            doReprice(thisProduct, theNewPrice, idx)
            theSize++
        }
    })
    return theSize
    function doReprice(thisProduct: IShopifyProd, theNewPrice: number, i: number) {
        setTimeout(() => {
            console.log(thisProduct, thisProduct.variants[0].id, Date.now())
            doUpdate({ variantId: thisProduct.variants[0].id, price: theNewPrice })
        }, 1200 * i)
    }
}

export function doReprice(theProducts: IShopifyProd[]) {
    const theCollectionPct = currentDiscountCollection()
    console.log(theProducts, theCollectionPct)
    theProducts.forEach((thisProduct: IShopifyProd, idx: number) => {
        let repricePct = readyToReprice(thisProduct, theCollectionPct)
        console.log(repricePct)
        if (repricePct) {
            theProducts[idx].variants[0].price = (Number(thisProduct.variants[0].compare_at_price) * repricePct).toString()
        }
    })
    return theProducts
}