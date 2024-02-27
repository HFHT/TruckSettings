import { CONST_DISCOUNTS } from "../constants"

export function currentDiscountCollection() {
    var theDiscounts = CONST_DISCOUNTS
    theDiscounts = theDiscounts.concat(CONST_DISCOUNTS)
    theDiscounts = theDiscounts.concat(CONST_DISCOUNTS)
    var theMonth = new Date().getMonth()
    const theDay = new Date().getDate()
    if (theDay>=27) theMonth++
    console.log(theDiscounts, theMonth, theDiscounts[theMonth])
    const startMonth = theDiscounts[theMonth]
    let startIdxAry = theDiscounts.reduce((a:any, e: any, i:number) => {
        if (e === startMonth) a.push(i);
        return a
    },[])
    let startIdx = Number(startIdxAry[startIdxAry.length - 1])
    let retVal = []
    for (let i = 0; i < 4; i++) {
        retVal.push({ c: theDiscounts[startIdx - i], p: (1 - (.25 * i)) })
    }
    return retVal
}