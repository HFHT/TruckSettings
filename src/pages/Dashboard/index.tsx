import './dashboard.css';

import { Id } from "react-toastify"
import { dateMetrics } from "./dateMetrics"
import { useMemo, useState } from "react"
import { BiAxialLineChart, LineChart, Sankey, Select, StackedBar, Tiles } from "../../components"
//Totals, donors, total pickups, web pickups, cancellations, Web vists, Completed Web Visits
//Donors by Zip
//Donors by Date
//Donation size by Zip
//Donation size by Date
//Web visits by date
//Completed web visits by date
//Conversion rate by date
//Device and browser information

interface IDashboard {
    isOpen: boolean
    isAdmin: boolean
    siteSettings: any
    dbSched: IScheds[]
    dbDonor: IDonor[]
    dbTrack: IVisits[]
}

export type DateMetrics = {
    date: string
    web: {
        steps: string[]
        visits: number
        completed: number
    },
    pickup: {
        qtyWeb: number
        totalItemsWeb: number
        qtyManual: number
        totalItemsManual: number
        qtyCancel: number
    },
    delivery: {
        qty: number
        totalItems: number
    },
    donor: {
        qtyDonors: number
    }
}
export const emptyDateMetrics = {
    date: '',
    web: {
        steps: [],
        visits: 0,
        completed: 0
    },
    pickup: {
        qtyWeb: 0,
        totalItemsWeb: 0,
        qtyManual: 0,
        totalItemsManual: 0,
        qtyCancel: 0
    },
    delivery: {
        qty: 0,
        totalItems: 0
    },
    donor: {
        qtyDonors: 0
    }
}
export type TheMetrics = {
    totals: {
        donors: number,
        web: {
            visits: number
            completed: number
            steps: string[]
            sumSteps: string[]
        },
        pickup: {
            scheduled: number
            completed: number
        },
        delivery: {
            scheduled: number
            completed: number
        }
    },
    metrics: DateMetrics[]
}
export const emptyTheMetrics = {
    totals: {
        donors: 0,
        web: {
            visits: 0,
            completed: 0,
            steps: [],
            sumSteps: []
        },
        pickup: {
            scheduled: 0,
            completed: 0
        },
        delivery: {
            scheduled: 0,
            completed: 0
        }
    },
    metrics: []
}
export type ZipMetrics = {
    zip: string
    donors: number
    qtyPickup: number
    totalPickupItems: number
    qtyDelivery: number
    totalDeliveryItems: number
}
export function Dashboard({ isOpen, isAdmin, siteSettings, dbSched, dbDonor, dbTrack }: IDashboard) {
    if (!isOpen) return (<></>)
    const [view, setView] = useState('Month')
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const [theYear, setTheYear] = useState(Number(new Date().getFullYear()))
    const [theMonth, setTheMonth] = useState(months[Number(new Date().getMonth())])

    let theseDatesMetrics = useMemo(() => dateMetrics(dbTrack, dbDonor, dbSched), [dbTrack, dbDonor, dbSched])

    return (
        <>
            <h2>Dashboard</h2>
            <div className='dashcontrols'>
                <Tiles tiles={['Month', 'Year']} title={'View'} onClick={(e) => setView(e)} />

                <Select value={theYear} setter={(e: any) => setTheYear(e)} title={'Year'} >
                    <option value="0">--All</option>
                    {getYears(siteSettings).map((theYear: string, i: number) => (
                        <option key={i} value={theYear}>{theYear}</option>
                    ))}
                </Select>
                <Select value={theMonth} setter={(e: any) => setTheMonth(e)} title={'Month'} >
                    <option value="0">--All</option>
                    {months.map((theYear: string, i: number) => (
                        <option key={i} value={theYear}>{theYear}</option>
                    ))}
                </Select>
            </div>
            {`Donors: ${theseDatesMetrics.totals.donors}, `}
            {/* {`Web Visits: ${theseDatesMetrics.totals.web.visits} `} */}
            {/* {`Web Booked: ${theseDatesMetrics.totals.web.completed} `} */}
            {/* {`Conversion Rate: ${(theseDatesMetrics.totals.web.completed / theseDatesMetrics.totals.web.visits * 100).toFixed(2).toLocaleString()}% `} */}
            {`Pickups Booked: ${theseDatesMetrics.totals.pickup.scheduled}, `}
            {`Pickups Completed: ${theseDatesMetrics.totals.pickup.completed} `}
            {/* {`Deliveries Booked: ${theseDatesMetrics.totals.delivery.scheduled} `}
            {`Deliveries Completed: ${theseDatesMetrics.totals.delivery.completed} `} */}
            <div className='dashboardchartarea'>
                <StackedBar dataKeys={['date', 'quantity', 'booked', 'cancel']} 
                title='Online Pickup Conversion' 
                note={` ${(theseDatesMetrics.totals.web.completed / theseDatesMetrics.totals.web.visits * 100).toFixed(2).toLocaleString()}% Conversion Rate = ${theseDatesMetrics.totals.web.completed} Booked / ${theseDatesMetrics.totals.web.visits} Visits`}
                data={[
                    { date: "Visit", quantity: theseDatesMetrics.totals.web.visits },
                    { date: "Zip", quantity: theseDatesMetrics.totals.web.sumSteps['1'] },
                    { date: "Agree", quantity: theseDatesMetrics.totals.web.sumSteps['2'], },
                    { date: "Items", quantity: theseDatesMetrics.totals.web.sumSteps['3'] },
                    { date: "Photo", quantity: theseDatesMetrics.totals.web.sumSteps['4'], },
                    { date: "Contact", quantity: theseDatesMetrics.totals.web.sumSteps['5'], },
                    { date: "Final", booked: theseDatesMetrics.totals.web.completed, cancel: 4 }
                ]}
                />
                {/* <StackedBar dataKeys={['date', 'web', 'manual', 'cancel']} data={[
                    {
                        date: "02/01",
                        web: 4000,
                        manual: 2400,
                        cancel: 100
                    },
                    {
                        date: "02/02",
                        web: 3000,
                        manual: 1398,
                        cancel: 1000
                    },
                    {
                        date: "02/03",
                        web: 2000,
                        manual: 9800,
                        cancel: 100
                    }]}
                /> */}
                {/* <LineChart dataKeys={['date', 'web', 'manual', 'cancel']} data={[
                    {
                        date: "02/01",
                        web: 4000,
                        manual: 2400,
                        cancel: 100
                    },
                    {
                        date: "02/02",
                        web: 3000,
                        manual: 1398,
                        cancel: 1000
                    },
                    {
                        date: "02/03",
                        web: 2000,
                        manual: 9800,
                        cancel: 100
                    }]}
                /> */}
                {/* <BiAxialLineChart dataKeys={['date', 'web', 'manual', 'cancel']} data={[
                    {
                        date: "02/01",
                        web: 4000,
                        manual: 2400,
                        cancel: 100
                    },
                    {
                        date: "02/02",
                        web: 3000,
                        manual: 1398,
                        cancel: 1000
                    },
                    {
                        date: "02/03",
                        web: 2000,
                        manual: 9800,
                        cancel: 100
                    }]}
                /> */}
                {/* <Sankey dataKeys={['date', 'web', 'manual', 'cancel']} data={{
                    // "nodes": [
                    //     { "name": "Visit" },
                    //     { "name": "Direct-Favourite" },
                    //     { "name": "Page-Click" },
                    //     { "name": "Detail-Favourite" },
                    //     { "name": "Lost" }
                    // ],
                    // "links": [
                    //     { "source": 0, "target": 1, "value": 3728.3 },
                    //     { "source": 0, "target": 2, "value": 354170 },
                    //     { "source": 2, "target": 3, "value": 62429 },
                    //     { "source": 2, "target": 4, "value": 291741 }
                    // ]
                    "nodes": [
                        { "name": "Visit" },
                        { "name": "Abandoned" },
                        { "name": "Zip" },
                        { "name": "Accepted" },
                        { "name": "Donations" },
                        { "name": "Photos" },
                        { "name": "Contact" },
                        { "name": "Completed" },
                        { "name": "Cancelled" },
                    ],
                    "links": [
                        // { "source": 0, "target": 1, "value": 50 },
                        { "source": 0, "target": 2, "value": 100 },
                        // { "source": 2, "target": 1, "value": 20 },
                        { "source": 2, "target": 3, "value": 80 },
                        // { "source": 3, "target": 1, "value": 20 },
                        { "source": 3, "target": 4, "value": 60 },
                        // { "source": 4, "target": 1, "value": 30 },
                        { "source": 4, "target": 5, "value": 30 },
                        // { "source": 5, "target": 1, "value": 10 },
                        { "source": 5, "target": 6, "value": 20 },
                        // { "source": 6, "target": 1, "value": 1 },
                        { "source": 6, "target": 7, "value": 15 },
                        // { "source": 5, "target": 8, "value": 5 },
                        { "source": 6, "target": 8, "value": 4 },
                    ]
                }}
                /> */}
            </div>
        </>
    )
    function getYears(s: any) {
        const thisYear = Number(new Date().getFullYear())
        const startYear = Number(new Date(s.StartDate).getFullYear())
        let retYears = []
        for (let i = startYear; i <= thisYear; i++) {
            retYears.push(i.toString())
        }
        return retYears
    }
}


