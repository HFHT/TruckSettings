import { TheMetrics } from ".";
export function pickupMetrics(theDateMetrics: TheMetrics) {
    if (!theDateMetrics) return []
    function trimZero(s:string) {
        while (s.charAt(0)==='0') s= s.substring(1)
        return s
    }
    return theDateMetrics.metrics.map((thisDayMetric: any) => {
        let thisDate: string[] = thisDayMetric.date.split('-')
        console.log(thisDate)
        console.log(thisDayMetric.donor)

        if (thisDate[0]==='') {
            alert('There is an entry in the database with a blank _id!!! Contact Support.')
            return
        }
        return { ...thisDayMetric.pickup, date: `${trimZero(thisDate[1])}/${trimZero(thisDate[2])}` }
    })

}