import { readyToPrint } from "."

export function printHangTags(theProducts: IShopifyProd[], print: Function): number {
    let isReady = 0
    console.log(theProducts)
    theProducts.forEach((thisProduct: IShopifyProd, idx: number) => {
        console.log(thisProduct.id, thisProduct.variants[0].barcode, readyToPrint(thisProduct))
        if (readyToPrint(thisProduct)) {
            doPrint(thisProduct, idx)
            isReady++
        }
    })
    return isReady

    function doPrint(thisProduct: any, i: number) {
        setTimeout(() => {
            console.log(thisProduct, Date.now())
            print({
                was: thisProduct.variants[0].compare_at_price,
                now: thisProduct.variants[0].price,
                item: thisProduct.variants[0].barcode.slice(-5),
                vendor: thisProduct.vendor
            })
        }, 4000 * i)
    }
}