import './main.css';

import { useDb } from "../../hooks";
import { Controls, Downloads } from "..";
import { ToastContainer } from "react-toastify";
import { useMemo, useState } from "react";
import { buildAppts, dateFormat, find_row } from "../../helpers";
import { followupAppt } from "../../components";
export function Main({ settings }: any) {
    const [dbTrack, mutateTrack, updateTrack, trackFetching] = useDb({ key: 'track', theDB: 'DonorTracking', interval: 4 })
    const [dbDonor, mutateDonor, updateDonor, donorFetching] = useDb({ key: 'donors', theDB: 'Donors', interval: 4 })
    const [dbSched, mutateSched, updateSched, schedFetching] = useDb({ key: 'sched', theDB: 'Schedule', interval: 4 })
    const [dbSettings, mutateSettings, updateSettings, settingsFetching] = useDb({ key: 'settings', theDB: 'Settings', interval: 4 })
    const [curDate, setCurDate] = useState(dateFormat(''))      // holds the schedule display date set by navigation controls
    const [schedDate, setSchedDate] = useState('')              // holds the date from the appt date field
    const [name, setName] = useState<IName>({ first: '', last: '', company: '' })
    const [phone, setPhone] = useState('')
    const [zip, setZip] = useState('');
    const [mode, setMode] = useState('Dashboard')

    const searchList = useMemo(() => { console.log('useMemo-appts'); return buildAppts(dbSched) }, [dbSched, schedFetching])
    const handleSetSchedDate = (e: string) => {
        setSchedDate(e)
        setCurDate(e)
    }
    const handleModeChange = (e: string) => {
        console.log(e)
        e === 'Dashboard' && mode !== e && setMode(e)
        e === 'Downloads' && mode !== e && setMode(e)
        e === 'Users' && mode !== e && setMode(e)
        e === 'Holidays' && mode !== e && setMode(e)
        e === 'Templates' && mode !== e && setMode(e)
        e === 'Routes' && mode !== e && setMode(e)
    }
    function handleFollowup(thisApptID: followupAppt) {
        //When a followup item is clicked a followupAppt object is passed with the DB and appt index.
        //Locate the appt and then call handleEdit for the appointment.
        if (!thisApptID) return
        let thisDay = dbSched[thisApptID.dbIdx]
        console.log('handleFollowup', thisApptID, thisDay._id, thisDay.c[thisApptID.apptIdx].id)
        setCurDate(thisDay._id)
        handleEdit(thisDay.c[thisApptID.apptIdx].id, thisDay._id)
    }
    const handleEdit = (apptID: string, apptDate: string) => {
        // When a schedule block is clicked get the pickup object and open and pass to the editor
        console.log('handleEdit', dbSched && find_row('_id', apptDate, dbSched), apptID)
    }
    return (
        <div className='maingrid'>
            <div className='maincontrol'>
                <ToastContainer position="top-left" className='mytoast' autoClose={3000} hideProgressBar={true} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
                <Controls
                    controls={{ zip: zip, name: name, curDate: curDate, phone: phone }}
                    // availSlots={zipAvailSlots}
                    holidays={find_row('_id', 'Holidays', settings)}
                    setZip={(e: any) => setZip(e)}
                    setSched={(e: any) => handleSetSchedDate(e)}
                    setName={(e: any) => setName(e)}
                    setPhone={(e: any) => setPhone(e)}
                    setCurDate={(e: any) => setCurDate(e)}
                    mode={mode}
                    setMode={(e: any) => handleModeChange(e)}
                    searchList={searchList}
                    handleSearch={(e: any) => handleFollowup(e)}
                />
            </div>
            {(dbTrack && dbDonor && dbSched && dbSettings) ?
                <div className='mainpage'>
                    <Downloads isOpen={mode === 'Downloads'} dbDonor={dbDonor} dbTrack={dbTrack} dbSched={dbSched} />
                </div>
                :
                'loading...'
            }
        </div>
    )
}