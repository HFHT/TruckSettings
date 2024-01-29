import { dateAdjust, dateDiffInDays, dateFormat, find_id, nextBusinessDay } from "."
import { CONST_BUSINESS_DAYS, CONST_CANCEL_ROUTE, CONST_DEFAULT_ROUTE, CONST_RECENT_DAYS, CONST_REMIND_DAYS } from "../constants"

// Returns the array index of the record that contains the _id passed as a parameter
export interface followupType {
    reminders: followupItem
    reschedule: followupItem
    recent: followupItem
    deliveries: followupItem
    unscheduled: followupItem
    theWaitList: waitListAppt[]
    blocks: IBlocks[]
}
export interface waitListAppt {
    dbIdx: number
    apptIdx: number
    id: string
    dt: string
    waitdt: string
    apptName: { first: string, last: string }
    apptPhone: string
    zip: string
    done: boolean | undefined
}
export interface followupItem {
    qty: number
    appts: followupAppt[]
}

export interface followupAppt {
    dbIdx: number
    apptIdx: number
    apptName: { first: string, last: string }
    apptPhone: string
}
export const buildFollowups = (dt: string, db: Idb, dbCntl: IControls[]): followupType => {
    //cycle through db
    // schedDate is within CONST_REMIND_DAYS then add it
    // reschedule property is set then add it
    // thedate is within CONST_RECENT_DAYS then add it
    const today = dateFormat(null)
    let retVal: followupType = { reminders: { qty: 0, appts: [] }, reschedule: { qty: 0, appts: [] }, recent: { qty: 0, appts: [] }, deliveries: { qty: 0, appts: [] }, unscheduled: { qty: 0, appts: [] }, theWaitList: [], blocks: [] }
    if (!db || !dbCntl) return retVal
    console.log('buildFollowups')
    db.forEach((thisDay, dbIdx: number) => {
        thisDay.c.forEach((theDay, apptIdx: number) => {
            if (thisDay._id === nextBusinessDay(dateAdjust(today, 1), CONST_BUSINESS_DAYS)) {
                // console.log('remind', theDay)
                if (theDay.remind) {
                    retVal.reminders.qty++
                    retVal.reminders.appts.push(buildAppts(theDay, dbIdx, apptIdx))
                }
            }
            if (dateDiffInDays(today, theDay.dt) >= 0 && dateDiffInDays(today, theDay.dt) < CONST_RECENT_DAYS) {
                // console.log('recent', theDay)
                retVal.recent.qty++
                retVal.recent.appts.push(buildAppts(theDay, dbIdx, apptIdx))
            }
            if (theDay.resched) {
                // console.log('reschedule', theDay)
                retVal.reschedule.qty++
                retVal.reschedule.appts.push(buildAppts(theDay, dbIdx, apptIdx))
            }
            if (theDay.src === 'd' && theDay.appt.rt === CONST_DEFAULT_ROUTE) {
                // console.log('deliveries', theDay)
                retVal.deliveries.qty++
                retVal.deliveries.appts.push(buildAppts(theDay, dbIdx, apptIdx))
            }
            if (theDay.src === 'w' && theDay.appt.rt === CONST_DEFAULT_ROUTE) {
                // console.log('unscheduled', theDay)
                retVal.unscheduled.qty++
                retVal.unscheduled.appts.push(buildAppts(theDay, dbIdx, apptIdx))
            }
            if (theDay.hasOwnProperty('waitlist') && theDay.waitlist && theDay.waitlist !== '') {
                if (theDay.appt.rt !== CONST_CANCEL_ROUTE) {
                    retVal.theWaitList.push({ dbIdx: dbIdx, apptIdx: apptIdx, id: theDay.id, dt: thisDay._id, waitdt: theDay.waitlist, apptName: theDay.name, apptPhone: theDay.phone, zip: theDay.zip, done: theDay.done })
                }
            }
        })
    })
    const cIdx = find_id('_id', 'Controls', dbCntl)
    if (cIdx > -1) {
        dbCntl[cIdx].blocks.forEach((block) => {
            if (dateDiffInDays(dateFormat(null), block.date) > 0) {
                if (block.routes.length>0) retVal.blocks.push(block)
            }
        })
    }

    return retVal
};
function buildAppts(thisDay: ISched, i: number, j: number): followupAppt {
    return { dbIdx: i, apptIdx: j, apptName: thisDay.name, apptPhone: thisDay.phone }
}