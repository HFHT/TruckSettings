export function dateDaysBetween(day1: string | undefined, day2: string | undefined): number | undefined {
    if (typeof (day1) !== 'string' || typeof (day2) !== 'string') return undefined
    let DifferenceInTime = new Date(day2).getTime() - new Date(day1).getTime()
    return Math.round(DifferenceInTime / (1000 * 3600 * 24))
}
