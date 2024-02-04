import { DateMetrics, TheMetrics, emptyDateMetrics, emptyTheMetrics } from "."
import { CONST_CANCEL_ROUTE } from "../../constants"
import { find_id } from "../../helpers"

export function dateMetrics(dbTrack: IVisits[], dbDonor: IDonor[], dbSched: IScheds[]) {
    let theMetrics: TheMetrics = emptyTheMetrics
    const hasWebCompleted = (thisStep: string | number) => thisStep.toString() === 'C' ? 1 : 0
    const wasCancelled = (thisRoute: string) => thisRoute.toString() === CONST_CANCEL_ROUTE ? 1 : 0
    const wasCompleted = (done: boolean | undefined) => done ? 1 : 0

    const whichValue = (v: string | null, m: string, q: number, rt: string | number) => {
        if (rt.toString() === CONST_CANCEL_ROUTE) return 0
        if (v === m) return q
        return 0
    }
    dbTrack && dbTrack.forEach((fingerprint: IVisits) => {
        // console.log(fingerprint,theMetrics)
        fingerprint.sessions.forEach((session: ISessions) => {
            const idx = find_id('date', session.dt, theMetrics.metrics)
            console.log(session, idx)
            if (idx > -1) {
                let steps = theMetrics.metrics[idx].web.steps
                steps.push(session.step.toString())
                theMetrics.metrics[idx] = {
                    ...theMetrics.metrics[idx],
                    web: {
                        visits: theMetrics.metrics[idx].web.visits + 1,
                        completed: theMetrics.metrics[idx].web.completed + hasWebCompleted(session.step),
                        steps: steps
                    }
                }
            } else {
                theMetrics.metrics.push({
                    ...emptyDateMetrics,
                    date: session.dt,
                    web: {
                        visits: 1,
                        completed: hasWebCompleted(session.step),
                        steps: [session.step.toString()]
                    }
                })
            }
            let steps = theMetrics.totals.web.steps
            console.log(steps)
            steps.push(session.step.toString())
            theMetrics.totals = {
                ...theMetrics.totals, web: {
                    visits: theMetrics.totals.web.visits + 1,
                    completed: theMetrics.totals.web.completed + hasWebCompleted(session.step),
                    steps: steps,
                    sumSteps: []
                }
            }

        })
    })
    dbDonor && dbDonor.forEach((donor: IDonor) => {
        const idx = find_id('date', donor.dt, theMetrics.metrics)
        // console.log(session, idx)
        if (idx > -1) {
            theMetrics.metrics[idx] = {
                ...theMetrics.metrics[idx],
                donor: {
                    qtyDonors: theMetrics.metrics[idx].donor.qtyDonors + 1
                }
            }
        } else {
            theMetrics.metrics.push({
                ...emptyDateMetrics,
                date: donor.dt,
                donor: {
                    qtyDonors: 1
                }
            })
        }
        theMetrics.totals = {
            ...theMetrics.totals, donors: theMetrics.totals.donors + 1
        }
    })

    dbSched && dbSched.forEach((scheds: IScheds) => {
        // console.log(fingerprint,theMetrics)
        scheds.c.forEach((sched: ISched) => {
            const idx = find_id('date', scheds._id, theMetrics.metrics)
            // console.log(session, idx)
            if (idx > -1) {
                theMetrics.metrics[idx] = {
                    ...theMetrics.metrics[idx],
                    pickup: {
                        qtyWeb: theMetrics.metrics[idx].pickup.qtyWeb + whichValue(sched.src, 'w', 1, sched.appt.rt),
                        totalItemsWeb: theMetrics.metrics[idx].pickup.totalItemsWeb + whichValue(sched.src, 'w', sched.items.length, sched.appt.rt),
                        qtyManual: theMetrics.metrics[idx].pickup.qtyManual + whichValue(sched.src, 's', 1, sched.appt.rt),
                        totalItemsManual: theMetrics.metrics[idx].pickup.totalItemsManual + whichValue(sched.src, 's', sched.items.length, sched.appt.rt),
                        qtyCancel: theMetrics.metrics[idx].pickup.qtyCancel + wasCancelled(sched.appt.rt)
                    },
                    delivery: {
                        qty: theMetrics.metrics[idx].delivery.qty + whichValue(sched.src, 'd', 1, sched.appt.rt),
                        totalItems: theMetrics.metrics[idx].delivery.totalItems + whichValue(sched.src, 'd', sched.items.length, sched.appt.rt)
                    }

                }
            } else {
                theMetrics.metrics.push({
                    ...emptyDateMetrics,
                    date: scheds._id,
                    pickup: {
                        qtyWeb: whichValue(sched.src, 'w', 1, sched.appt.rt),
                        totalItemsWeb: whichValue(sched.src, 'w', sched.items.length, sched.appt.rt),
                        qtyManual: whichValue(sched.src, 's', 1, sched.appt.rt),
                        totalItemsManual: whichValue(sched.src, 's', sched.items.length, sched.appt.rt),
                        qtyCancel: wasCancelled(sched.appt.rt)
                    },
                    delivery: {
                        qty: whichValue(sched.src, 'd', 1, sched.appt.rt),
                        totalItems: whichValue(sched.src, 'd', sched.items.length, sched.appt.rt)
                    }
                })
            }
            theMetrics.totals = {
                ...theMetrics.totals,
                pickup: {
                    scheduled: theMetrics.totals.pickup.scheduled + whichValue(sched.src, 'w', 1, sched.appt.rt) + whichValue(sched.src, 's', 1, sched.appt.rt),
                    completed: theMetrics.totals.pickup.completed + whichValue(sched.src, 'w', wasCompleted(sched.done), sched.appt.rt) + whichValue(sched.src, 's', wasCompleted(sched.done), sched.appt.rt)
                },
                delivery: {
                    scheduled: theMetrics.totals.delivery.scheduled + whichValue(sched.src, 'd', 1, sched.appt.rt),
                    completed: theMetrics.totals.delivery.completed + whichValue(sched.src, 'd', sched.done ? 1 : 0, sched.appt.rt)
                }
            }

        })
    })
    if (theMetrics.metrics.length === 0) return theMetrics
    theMetrics.metrics.sort(function (a, b) { return new Date(a.date).getTime() - new Date(b.date).getTime() })
    let sumSteps = theMetrics.totals.web.steps.reduce(function (value: any, value2: any) {
        return (value[value2] ? ++value[value2] : (value[value2] = 1), value);
    }, {});
    let theSteps: any = {}
    theSteps['0'] = sumSteps['0'] + sumSteps['1'] + sumSteps['2'] + sumSteps['3'] + sumSteps['4'] + sumSteps['5'] + sumSteps.C + sumSteps.X + sumSteps.R
    theSteps['1'] = sumSteps['1'] + sumSteps['2'] + sumSteps['3'] + sumSteps['4'] + sumSteps['5'] + sumSteps.C + sumSteps.X + sumSteps.R
    theSteps['2'] = sumSteps['2'] + sumSteps['3'] + sumSteps['4'] + sumSteps['5'] + sumSteps.C + sumSteps.X
    theSteps['3'] = sumSteps['3'] + sumSteps['4'] + sumSteps['5'] + sumSteps.C + sumSteps.X
    theSteps['4'] = sumSteps['4'] + sumSteps['5'] + sumSteps.C + sumSteps.X
    theSteps['5'] = sumSteps['5'] + sumSteps.C + sumSteps.X
    theSteps.C = sumSteps.C
    theSteps.X = sumSteps.X

    theMetrics.totals.web.sumSteps = theSteps
    console.log('dashboard-metrics', theMetrics)
    return theMetrics
}