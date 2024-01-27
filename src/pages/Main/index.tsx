//@ts-ignore
import { CSVLink } from "react-csv";
import { useDb } from "../../hooks";
export function Main({ settings }: any) {
    const [dbTrack, mutateTrack, updateTrack, trackFetching] = useDb({ key: 'track', theDB: 'DonorTracking', interval: 4 })
    const [dbDonor, mutateDonor, updateDonor, donorFetching] = useDb({ key: 'donors', theDB: 'Donors', interval: 4 })
    const [dbSched, mutateSched, updateSched, schedFetching] = useDb({ key: 'sched', theDB: 'Schedule', interval: 4 })
    const [dbSettings, mutateSettings, updateSettings, settingsFetching] = useDb({ key: 'settings', theDB: 'Settings', interval: 4 })

    return (
        <>
            <div>Main</div>

            {(dbTrack && dbDonor && dbSched && dbSettings) ?
                <>
                    <CSVLink data={csvDonors(dbDonor)} filename={'HabiStoreDonors.csv'}>Download Donors</CSVLink>
                    <CSVLink data={csvTrack(dbTrack)} filename={'HabiStoreVisits.csv'}>Download Web Visits</CSVLink>
                    <CSVLink data={csvPickup(dbSched)} filename={'HabiStoreAppts.csv'}>Download Pickups</CSVLink>

                </>
                :
                'loading...'
            }
        </>
    )
}
export function csvPickup(dbSched: any) {
    let csv = [['Date', 'Done?', 'Route', 'First', 'Last', 'Company', 'Address', 'Unit', 'Zip', 'email', 'ID']]
    console.log(dbSched)
    dbSched.forEach((theDay: any) => {
        console.log(theDay)
        theDay.c.forEach((theAppt: any) => {
            console.log(theAppt)
            csv.push([
                theDay._id,
                theAppt.done ? 'Yes' : '',
                theAppt.appt.rt,
                theAppt.name.first,
                theAppt.name.last,
                theAppt.name.company,
                theAppt.place.addr,
                theAppt.cust.apt,
                theAppt.zip,
                theAppt.email,
                getItems(theAppt.items),
                `'${theAppt.id}`
            ])
        })
    })
    return csv
    function getItems(items: any[]) {
        let retVal = ''
        items.forEach((theItem: any) => {
            retVal = `${retVal} ${theItem.prod}(${theItem.qty}${theItem.c ? 'c' : '?'}) `
        })
        return retVal
    }
}
export function csvDonors(dbDonor: any) {
    let csv = [['First', 'Last', 'Address', 'Unit', 'email', 'Date', 'ID']]
    console.log(dbDonor)
    dbDonor.forEach((theRcd: any) => {
        csv.push([theRcd.name.first, theRcd.name.last, theRcd.addr.addr, theRcd.apt, theRcd.email, theRcd.dt, theRcd._id])
    })
    return csv
}
export function csvTrack(dbTrack: any) {
    let csv = [['Date', 'Step', 'Zip', 'Phone', 'Browser', '', 'OS', '', 'Vendor', 'Model', 'Type', 'Fingerprint']]
    console.log(dbTrack)
    dbTrack.forEach((theRcd: any) => {
        console.log(theRcd)
        theRcd.sessions.forEach((theSession: any) => {
            console.log(theSession)
            csv.push([
                theSession.dt,
                theSession.step,
                theSession.zip,
                theSession.phone]
                .concat(getNameVersion(theRcd.browser.browser))
                .concat(getNameVersion(theRcd.browser.os))
                .concat(getDevice(theRcd.browser.device))
                .concat(theRcd._id))
        })
    })
    return csv

    function getNameVersion(val: any) {
        console.log(val)
        if (!val) return ''
        return [getProperty('name', val), getProperty('version', val)]
    }
    function getDevice(val: any) {
        console.log(val)
        if (!val) return ''
        return [getProperty('vendor', val), getProperty('model', val), getProperty('type', val)]
    }
    function getProperty(prop: string, val: any) {
        if (val.hasOwnProperty(prop)) return val[prop]
        return ''
    }
}