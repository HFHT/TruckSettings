//@ts-ignore
import { CSVLink } from "react-csv";
import './download.css';
import { Button } from "../../components";

interface IDownloads {
    isOpen: boolean
    dbSched: IScheds[]
    dbDonor: IDonor[]
    dbTrack: IVisits[]
}

export const Downloads = ({ isOpen, dbDonor, dbTrack, dbSched }: IDownloads) => {
    if (!isOpen) return (<></>)
    return (
        <>
            <h2>Downloads</h2>
            <div className='downloadmain'>
                <CSVLink data={csvDonors(dbDonor)} filename={'HabiStoreDonors.csv'}><Button classes='dbtn'>Download Donors</Button></CSVLink>
                <CSVLink data={csvTrack(dbTrack)} filename={'HabiStoreVisits.csv'}><Button classes='dbtn'>Download Web Visits</Button></CSVLink>
                <CSVLink data={csvPickup(dbSched)} filename={'HabiStorePickups.csv'}><Button classes='dbtn'>Download Pickups</Button></CSVLink>
            </div>
        </>
    )
    function csvDonors(dbDonor: IDonor[]) {
        let csv = [['First', 'Last', 'Address', 'Unit', 'email', 'Date', 'ID']]
        dbDonor.forEach((theRcd: any) => {
            csv.push([theRcd.name.first, theRcd.name.last, theRcd.addr.addr, theRcd.apt, theRcd.email, theRcd.dt, theRcd._id])
        })
        return csv
    }
    function csvTrack(dbTrack: IVisits[]) {
        let csv = [['Date', 'Step', 'Zip', 'Phone', 'Browser', '', 'OS', '', 'Vendor', 'Model', 'Type', 'Fingerprint', 'Reason']]
        dbTrack.forEach((theRcd: any) => {
            theRcd.sessions.forEach((theSession: any) => {
                csv.push([
                    theSession.dt,
                    theSession.step,
                    theSession.zip,
                    theSession.phone]
                    .concat(getNameVersion(theRcd.browser.browser))
                    .concat(getNameVersion(theRcd.browser.os))
                    .concat(getDevice(theRcd.browser.device))
                    .concat(theRcd._id)
                    .concat(getProperty('reason', theSession))
                )
            })
        })
        return csv

        function getNameVersion(val: any) {
            if (!val) return ''
            return [getProperty('name', val), getProperty('version', val)]
        }
        function getDevice(val: any) {
            if (!val) return ''
            return [getProperty('vendor', val), getProperty('model', val), getProperty('type', val)]
        }
        function getProperty(prop: string, val: any) {
            if (val.hasOwnProperty(prop)) return val[prop]
            return ''
        }
    }
    function csvPickup(dbSched: IScheds[]) {
        let csv = [['Date', 'Done?', 'Route', 'First', 'Last', 'Company', 'Address', 'Unit', 'Zip', 'email', 'Items', 'ID', 'src', 'Fingerprint']]
        dbSched.forEach((theDay: IScheds) => {
            theDay.c.forEach((theAppt: ISched) => {
                csv.push([
                    theDay._id,
                    theAppt.done ? 'Yes' : '',
                    theAppt.appt.rt,
                    theAppt.name.first,
                    theAppt.name.last,
                    theAppt.name.company ? theAppt.name.company : '',
                    theAppt.place.addr ? theAppt.place.addr : '',
                    theAppt.cust.apt,
                    theAppt.zip,
                    theAppt.email,
                    getItems(theAppt.items),
                    `'${theAppt.id}`,
                    theAppt.src ? theAppt.src : '',
                    theAppt.cancel ? theAppt.cancel : '',
                    theAppt.fingerprint ? theAppt.fingerprint : ''
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
}
