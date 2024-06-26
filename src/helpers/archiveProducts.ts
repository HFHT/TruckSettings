import { readyToArchive, readyToRemove } from "."

export function archiveProducts(theProducts: IShopifyProd[], theAge: number, doUpdate: Function): number {
    let isReady = 0
    theProducts.forEach((thisProduct: IShopifyProd, idx: number) => {
        console.log(thisProduct.id, readyToArchive(thisProduct, theAge))
        if (readyToArchive(thisProduct, theAge)) {
            doArchive(thisProduct, idx)
            isReady++
        }
    })
    return isReady

    function doArchive(thisProduct: IShopifyProd, i: number) {
        setTimeout(() => {
            console.log(thisProduct, thisProduct.variants[0].barcode, Date.now())
            doUpdate(thisProduct.id)
        }, 750 * i)
    }
}

export function trimNewArrivals(theProducts: IShopifyCollect[], theAge: number, doUpdate: Function): number {
    let isReady = 0
    theProducts.forEach((thisProduct: IShopifyCollect, idx: number) => {
        // console.log(thisProduct.id, thisProduct.product_id, readyToRemove(thisProduct, theAge))
        // if (readyToRemove(thisProduct, theAge)) {
        //     doCollect(thisProduct, idx)
        //     isReady++
        // }
    })
    return isReady

    function doCollect(thisProduct: IShopifyCollect, i: number) {
        setTimeout(() => {
            console.log(thisProduct, Date.now())
            doUpdate(thisProduct.id, thisProduct.product_id)
        }, 750 * i)
    }
}