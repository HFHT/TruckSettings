import { DateMetrics, TheMetrics, emptyDateMetrics, emptyTheMetrics } from "."
import { CONST_CANCEL_ROUTE } from "../../constants"
import { find_id } from "../../helpers"

export function dateMetrics(dbTrack: IVisits[], dbDonor: IDonor[], dbSched: IScheds[]) {
    let theMetrics: TheMetrics = { ...emptyTheMetrics }
    console.log('dateMetrics-empty', theMetrics)
    const hasWebCompleted = (thisStep: string | number) => thisStep.toString() === 'C' ? 1 : 0
    const isCancelled = (thisRoute: string) => thisRoute.toString() === CONST_CANCEL_ROUTE
    const isDone = (done: boolean | undefined) => done ? true : false

    function howMuchToAdd(match: boolean, completeOrCancel: boolean, amt: number = 1) {
        if (match && completeOrCancel) return amt
        return 0

    }

    dbTrack && dbTrack.forEach((fingerprint: IVisits) => {
        // console.log(fingerprint,theMetrics)
        fingerprint.sessions.forEach((session: ISessions) => {
            const idx = find_id('date', session.dt, theMetrics.metrics)
            // console.log(session, idx)
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
            // console.log(steps)
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
                ...{...emptyDateMetrics},
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
                        qtyWeb: theMetrics.metrics[idx].pickup.qtyWeb + howMuchToAdd(sched.src === 'w', true),
                        totalItemsWeb: theMetrics.metrics[idx].pickup.totalItemsWeb + howMuchToAdd(sched.src === 'w', true, sched.items.length),
                        qtyManual: theMetrics.metrics[idx].pickup.qtyManual + howMuchToAdd(sched.src === 's', true),
                        totalItemsManual: theMetrics.metrics[idx].pickup.totalItemsManual + howMuchToAdd(sched.src === 's', true, sched.items.length),
                        qtyCancel: theMetrics.metrics[idx].pickup.qtyCancel + (isCancelled(sched.appt.rt) ? 1 : 0)
                    },
                    delivery: {
                        qty: theMetrics.metrics[idx].delivery.qty + howMuchToAdd(sched.src === 'd', true),
                        totalItems: theMetrics.metrics[idx].delivery.totalItems + howMuchToAdd(sched.src === 'd', true, sched.items.length)
                    }
                }
            } else {
                theMetrics.metrics.push({
                    ...{...emptyDateMetrics},
                    date: scheds._id,
                    pickup: {
                        qtyWeb: howMuchToAdd(sched.src === 'w', true),
                        totalItemsWeb: howMuchToAdd(sched.src === 'w', true, sched.items.length),
                        qtyManual: howMuchToAdd(sched.src === 's', true),
                        totalItemsManual: howMuchToAdd(sched.src === 's', true, sched.items.length),
                        qtyCancel: isCancelled(sched.appt.rt) ? 1 : 0
                    },
                    delivery: {
                        qty: howMuchToAdd(sched.src === 'd', true),
                        totalItems: howMuchToAdd(sched.src === 'd', true, sched.items.length)
                    }
                })
            }
            theMetrics.totals = {
                ...theMetrics.totals,
                pickup: {
                    scheduled: theMetrics.totals.pickup.scheduled + howMuchToAdd(sched.src === 'w' || sched.src === 's', true),
                    completed: theMetrics.totals.pickup.completed + howMuchToAdd(sched.src === 'w' || sched.src === 's', isDone(sched.done)),
                    cancelled: theMetrics.totals.pickup.cancelled + howMuchToAdd(sched.src === 'w' || sched.src === 's', isCancelled(sched.appt.rt))
                },
                delivery: {
                    scheduled: theMetrics.totals.delivery.scheduled + howMuchToAdd(sched.src === 'd', true),
                    completed: theMetrics.totals.delivery.completed + howMuchToAdd(sched.src === 'd', isDone(sched.done))
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