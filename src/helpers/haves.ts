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

export function readyToRemove(shopifyProduct: any, theAge: number = CONST_ARCHIVE_AFTER) {
    return dateDiffInDays(dateFormat(shopifyProduct.created_at), dateFormat(null)) > theAge
}