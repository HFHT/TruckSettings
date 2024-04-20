import './main.css';
import 'react-toastify/dist/ReactToastify.min.css';

import { useDb, useEmail, useParams } from "../../hooks";
import { Admins, Archive, Controls, Dashboard, Downloads, Email, Gaslight, HangTags, Holidays, NewArchive, NewHangTags, Pricing, Routes, Templates, Users } from "..";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useMemo, useState } from "react";
import { find_id, find_row } from "../../helpers";
import { Button } from '../../components';
import { dateMetrics } from '../Dashboard/dateMetrics';
import { pickupMetrics } from '../Dashboard/pickupMetrics';
import { donorMetrics } from '../Dashboard/donorMetrics';
import { NewPricing } from '../NewPricing';
export function Main({ account }: any) {
    const params = useParams(['debug', 'nosave', 'noprint', 'noprice', 'noemail']) // noprint: do not print hang tags; noprice: do not reprice items

    const [dbTrack, mutateTrack, updateTrack, trackFetching] = useDb({ key: 'track', theDB: 'DonorTracking', interval: 4 })
    const [dbDonor, mutateDonor, updateDonor, donorFetching] = useDb({ key: 'donors', theDB: 'Donors', interval: 4 })
    const [dbSched, mutateSched, updateSched, schedFetching] = useDb({ key: 'sched', theDB: 'Schedule', interval: 4 })
    const [dbSettings, mutateSettings, updateSettings, settingsFetching, refetchSettings ] = useDb({ key: 'settings', theDB: 'Settings', interval: 0 })
    const [sendEMail, eMailSent] = useEmail({ toast: toast, noSend: params.noemail })

    const [mode, setMode] = useState('Dashboard')
    const [isAdmin, setIsAdmin] = useState(false)
    const [siteSettings, setSiteSettings] = useState()

    const dashboardMetrics = useMemo(() => {
        console.log('dashboardMetrics-useMemo')
        var dateM:any = dateMetrics(dbTrack, dbDonor, dbSched)
        var pickupM: any = pickupMetrics(dateM)
        var donorM: any = donorMetrics(dateM)
        return {date:dateM, pickup: pickupM, donor: donorM}
    }, [dbTrack, dbDonor, dbSched])

    const handleModeChange = (e: string) => {
        console.log(e)
        e === 'Dashboard' && mode !== e && setMode(e)
        e === 'Downloads' && mode !== e && setMode(e)
        e === 'HangTags' && mode !== e && setMode(e)
        e === 'Routes' && mode !== e && setMode(e)
        e === 'Archive' && mode !== e && setMode(e)
        // e === 'NewArchive' && mode !== e && setMode(e)
        e === 'Pricing' && mode !== e && setMode(e)
        e === 'Users' && mode !== e && setMode(e)
        e === 'Holidays' && mode !== e && setMode(e)
        e === 'Templates' && mode !== e && setMode(e)
        e === 'Routes' && mode !== e && setMode(e)
        e === 'Email' && mode !== e && setMode(e)
        e === 'Gaslight' && mode !== e && setMode(e)
    }

    const handleEdit = (apptID: string, apptDate: string) => {
        // When a schedule block is clicked get the pickup object and open and pass to the editor
        console.log('handleEdit', dbSched && find_row('_id', apptDate, dbSched), apptID)
    }
    useEffect(() => {
        if (!dbSettings || !account.hasOwnProperty('username')) return
        setIsAdmin(checkForAdmin(dbSettings, account.username))
        setSiteSettings(find_row('_id', 'Site', dbSettings))
    }, [dbSettings, account])

    return (
        <div className='maingrid'>
            <div className='maincontrol'>
                <ToastContainer position="top-left" className='mytoast' autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
                <Controls
                    mode={mode}
                    setMode={(e: any) => handleModeChange(e)}
                />
            </div>
            {(dbTrack && dbDonor && dbSched && dbSettings && siteSettings) ?
                <div className='mainpage'>
                    <Dashboard isOpen={mode === 'Dashboard'} isAdmin={isAdmin} metrics={dashboardMetrics} siteSettings={siteSettings} />
                    <Downloads isOpen={mode === 'Downloads'} dbDonor={dbDonor} dbTrack={dbTrack} dbSched={dbSched} />
                    {/* <HangTags isOpen={mode === 'HangTags'} noPrint={params.noprint}/> */}
                    <NewArchive isOpen={mode === 'Archive'} noSave={params.nosave} toast={toast}/>

                    <NewHangTags isOpen={mode === 'HangTags'} noPrint={params.noprint}/>

                    {/* <Archive isOpen={mode === 'Archive'} toast={toast}/> */}
                    <NewPricing isOpen={mode === 'Pricing'}  noPrice={params.noprice} noSave={params.nosave} toast={toast}/>
                    <Holidays isOpen={mode === 'Holidays'} isAdmin={isAdmin} mutateDB={mutateSettings} dbSettings={dbSettings} />
                    <Templates isOpen={mode === 'Templates'} isAdmin={isAdmin} mutateDB={mutateSettings} dbSettings={dbSettings} />
                    <UserPage isOpen={mode === 'Users'} isAdmin={isAdmin} mutateDB={mutateSettings} dbSettings={dbSettings} />
                    <Routes isOpen={mode === 'Routes'} mutateDB={mutateSettings} refetchDB={refetchSettings} dbSettings={dbSettings} toast={toast}/>

                    <Email isOpen={mode === 'Email'} isAdmin={isAdmin} mutateDB={mutateSettings} dbSettings={dbSettings} sendEmail={sendEMail}/>
                    <Gaslight isOpen={mode === 'Gaslight'} isAdmin={isAdmin} mutateDB={mutateSettings} dbSettings={dbSettings} sendEmail={sendEMail} />
                </div>
                :
                'loading...'
            }
        </div>
    )

    function checkForAdmin(db: any, user: string) {
        const uRow = find_row('_id', 'Admins', db)
        console.log(uRow.admins, user, find_id('id', user, uRow.admins))
        return find_id('id', user, uRow.admins) > -1
    }
}
export interface IUsers {
    isOpen: boolean
    isAdmin: boolean
    dbSettings: []
    mutateDB: Function
}
function UserPage({ isOpen, isAdmin, dbSettings, mutateDB }: IUsers) {
    if (!isOpen) return (<></>)

    return (
        <div className='userdiv'>
            <Users isOpen={isOpen} isAdmin={isAdmin} mutateDB={mutateDB} dbSettings={dbSettings} />
            <Admins isOpen={isOpen} isAdmin={isAdmin} mutateDB={mutateDB} dbSettings={dbSettings} />
        </div>

    )
}
