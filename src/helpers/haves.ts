import { dateDiffInDays, dateFormat } from "."
import { CONST_ARCHIVE_AFTER } from "../constants"

export function nullOrUndefined(e: any | undefined, v: any = '') {
    if (e === null) return v
    if (e === undefined) return v
    return e
}

export function hasInventory(shopifyProduct: any) {
    return shopifyProduct.variants[0].inventory_quantity >= 1
}

export function readyToArchive(shopifyProduct: any, theAge: number = CONST_ARCHIVE_AFTER) {
    if (hasInventory(shopifyProduct)) return false
    return dateDiffInDays(dateFormat(shopifyProduct.variants[0].updated_at), dateFormat(null)) > theAge
}

export function readyToRemove(shopifyProduct: IShopifyProd, theAge: number = CONST_ARCHIVE_AFTER) {
    let useThisDate = (shopifyProduct.variants.length > 0) && shopifyProduct.variants[0].hasOwnProperty('updated_at') ?
        shopifyProduct.variants[0].updated_at : shopifyProduct.updated_at
    console.log(shopifyProduct.variants.length > 0, shopifyProduct.variants[0].hasOwnProperty('updated_at'), useThisDate, shopifyProduct, theAge)
    return dateDiffInDays(dateFormat(useThisDate), dateFormat(null)) > theAge
}

export function readyToPrint(shopifyProduct: IShopifyProd) {
    if (hasInventory(shopifyProduct)) return true
    return false
}

export function readyToReprice(shopifyProduct: IShopifyProd, collectionPcts: { c: string, p: number }[]): number | null {
    //Use Vendor to find which discount should be applied
    //Check if the discount is already applied, if so then return null (don't do it again, handle re-run)
    //If inventory is zero then return null (Handle warranty items that need to maintain price for 30 days)
    //If number of variations is greater than one, alert and then return null (color discount products  don't have variants)
    // console.log(shopifyProduct.id, shopifyProduct.vendor, shopifyProduct.variants[0].barcode, shopifyProduct.variants[0].id, getPct(shopifyProduct.variants[0].price, shopifyProduct.variants[0].compare_at_price))

    if (!hasInventory(shopifyProduct)) {
        console.log('reprice: no inventory', shopifyProduct.id)
        return null
    }
    if (shopifyProduct.variants.length !== 1) {
        alert(`Product ${shopifyProduct.variants[0].barcode} has more than 1 variant, not processed.`)
        return null
    }
    let pctToApply = collectionPcts.find((e: any) => e.c === shopifyProduct.vendor)
    console.log('reprice:', pctToApply, shopifyProduct.id, shopifyProduct.vendor, shopifyProduct.variants[0].barcode, shopifyProduct.variants[0].id, getPct(shopifyProduct.variants[0].price, shopifyProduct.variants[0].compare_at_price))
    if (!pctToApply) {
        alert(`Product ${shopifyProduct.variants[0].barcode} has incorrect vendor, not processed.`)
        return null
    }
    if (pctToApply.p === getPct(shopifyProduct.variants[0].price, shopifyProduct.variants[0].compare_at_price)) {
        console.log('reprice: already priced', shopifyProduct.id)
        return null
    }
    return pctToApply.p

    function getPct(n: number | string, d: number | string): number {
        let pct = Number(n) / Number(d)
        // console.log(n, d, pct)
        return pct
    }
}