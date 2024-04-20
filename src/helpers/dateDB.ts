export const daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const daysOfWeekLong: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export const dayOfWeek = (dow: number, long = false) => {
    return long ? daysOfWeekLong[dow] : daysOfWeek[dow]
}
export const dateDB = () => {
    // Return current date in DB format
    const theDate = new Date;
    return theDate.toISOString().substring(0, 10);
};

export const dateFormat = (date: any) => {
    // Return the provided date in a yyyy-mm-dd format
    var d = date ? new Date(date) : new Date()
    return dateElements(d);
}

export const dateDayName = (date: any) => {
    const dow: any = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const d = newDate(date)
    return daysOfWeek[d.getDay()];
}

export const dateAdjust = (date: any, adjust: number) => {
    // Return the date adjusted by the amount in adjust. Date gymnastics due to Date(date) returning yesterday
    let d = newDate(date)
    d.setDate(d.getDate() + adjust);
    return dateElements(d)
}


export function dateDiffInDays(d1: any, d2: any) {
    const a = newDate(d1)
    const b = newDate(d2)
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    // console.log(Math.floor((utc2 - utc1) / _MS_PER_DAY))
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function dateElements(d: any) {
    // Return a date in the format of yyyy-mm-dd
    var month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function newDate(date: any) {
    const parts = date.split('-')
    let d = new Date(parts[0], parts[1] - 1, parts[2])
    return d
}

export function daysInMonth(date: any) {
    // date is of format mm/dd/yyyy
    const parts = date.split('-')
    return new Date(parts[0], parts[1], 0).getDate()
}

export function getFirstOfMonth(date: any) {
    // date is of format mm/dd/yyyy
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const parts = date.split('-')
    const dow = new Date(parts[0], parts[1] - 1, 1).getDay()
    return { dow: dow, day: daysOfWeekLong[dow], first: [parts[0], parts[1], '01'].join('-') }
}

export function nextBusinessDay(date: string, businessDays: boolean[]): string {
    // return the date of the next business day
    const parts: any = date.split('-')

    const theDate = new Date(parts[0], parts[1] - 1, parts[2])
    const dow = theDate.getDay()
    const twoWeeks = businessDays.concat(businessDays)
    let thisDate = date
    // console.log(date, theDate, dow, twoWeeks)
    if (!businessDays[dow]) {
        // not a business day+
        for (let i = dow + 1; twoWeeks.length; i++) {
            // console.log(i, twoWeeks[i])
            if (twoWeeks[i]) {
                return dateAdjust(date, i - dow)
            }
        }
        return thisDate
    }
    return thisDate
}

export async function doDelay(delay: number) {
    return new Promise(ok => setTimeout(ok, delay));
}