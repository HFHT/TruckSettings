import { DateMetrics, TheMetrics } from ".";
import { dateDiffInDays, dateFormat } from "../../helpers";
export function donorMetrics(theDateMetrics: TheMetrics) {
    if (!theDateMetrics) return []
    function trimZero(s: string) {
        while (s.charAt(0) === '0') s = s.substring(1)
        return s
    }
    let todayDate = dateFormat(null)
    let runningTotal = 0
    let retVal: any = []
    theDateMetrics.metrics.forEach((thisDayMetric: DateMetrics) => {
        if (dateDiffInDays(todayDate, thisDayMetric.date) < 1) {
            let thisDate: string[] = thisDayMetric.date.split('-')
            runningTotal = runningTotal + thisDayMetric.donor.qtyDonors
            retVal.push({ qtyDonors: runningTotal, date: `${trimZero(thisDate[1])}/${trimZero(thisDate[2])}` })
        }
    })
    return retVal

}