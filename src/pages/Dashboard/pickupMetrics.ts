import { TheMetrics } from ".";
export function pickupMetrics(theDateMetrics: TheMetrics) {
    if (!theDateMetrics) return []
    function trimZero(s:string) {
        while (s.charAt(0)==='0') s= s.substring(1)
        return s
    }
    return theDateMetrics.metrics.map((thisDayMetric: any) => {
        let thisDate: string[] = thisDayMetric.date.split('-')
        
        return { ...thisDayMetric.pickup, date: `${trimZero(thisDate[1])}/${trimZero(thisDate[2])}` }
    })

}