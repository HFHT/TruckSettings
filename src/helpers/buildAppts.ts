
// Builds a searchable array of appointments 
export interface apptsType {
    id: number;
    first_name: string;
    last_name: string;
    company: string | null | undefined;
    email: string;
    phone: string;
    dt: string;
    dbIdx: number;
    apptIdx: number;
    done: boolean | undefined;
    resched: boolean | undefined;
}

export const buildAppts = (db: Idb) => {
    let retVal: apptsType[] = []
    if (!db) return retVal
    db.forEach((thisDay, dbIdx: number) => {
        thisDay.c.forEach((theDay, apptIdx: number) => {
            retVal.push(buildAppt(theDay, dbIdx, apptIdx, thisDay._id))

        })
    })
    return retVal
};
function buildAppt(thisDay: ISched, i: number, j: number, dt: string): apptsType {
    return {
        id: i, dbIdx: i, apptIdx: j, dt: dt,
        first_name: thisDay.name.first, last_name: thisDay.name.last, company: thisDay.name.company,
        phone: thisDay.phone, email: thisDay.email,
        done: thisDay.done, resched: thisDay.resched
    }
}