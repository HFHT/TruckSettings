import { currentDiscountCollection, readyToReprice } from "."

export async function repriceProducts(theProducts: IShopifyProd[], doUpdate:Function) {
    const theCollectionPct = currentDiscountCollection()
    console.log(theCollectionPct)

    theProducts.forEach((thisProduct: IShopifyProd, idx: number) => {
        let repricePct = readyToReprice(thisProduct, theCollectionPct)
        console.log(repricePct)
        if (repricePct) {
            let theNewPrice = Number(thisProduct.variants[0].compare_at_price) * repricePct
            doReprice(thisProduct, theNewPrice, idx)
        }
    })
    function doReprice(thisProduct: IShopifyProd, theNewPrice: number, i: number) {
        setTimeout(() => {
            console.log(thisProduct, thisProduct.variants[0].id, Date.now())
            doUpdate({ variantId: thisProduct.variants[0].id, price: theNewPrice })
        }, 750 * i)
    }
}