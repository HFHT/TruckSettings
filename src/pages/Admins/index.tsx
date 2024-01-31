import { useState } from 'react';
// import { Input } from '../../components';
import { find_id } from '../../helpers';
import { MiscIcons } from '../../icons';
import './admin.css';

interface IDownloads {
    isOpen: boolean
    isAdmin: boolean
    dbSettings: any
    mutateDB: Function
    // dbSched: any
}

export const Admins = ({ isOpen, isAdmin, dbSettings, mutateDB/* dbTrack, dbSched */ }: IDownloads) => {
    if (!isOpen) return (<></>)
    const uIdx = find_id('_id', 'Admins', dbSettings)
    const [theUsers, setTheUsers] = useState(dbSettings[uIdx])
    const [newAdmin, setNewAdmin] = useState({ id: '', permissions: ['All'] })
    const isEmail = (email: string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

    console.log(theUsers, uIdx)
    function onPinChange(thisPin: any, pinIdx: number) {
        console.log(thisPin, pinIdx)
        const thisUser = { ...theUsers }
        thisUser.admins[pinIdx] = thisPin
        console.log(thisUser)
        setTheUsers(thisUser)
        mutateDB(theUsers, dbSettings, false)
    }
    function addNew() {
        console.log('addNew')
        if (!isEmail(newAdmin.id) || newAdmin.permissions.length === 0) return
        const thisUser = { ...theUsers }
        thisUser.admins.push(newAdmin)
        setNewAdmin({ id: '', permissions: ['All'] })
        setTheUsers(thisUser)
        mutateDB(theUsers, dbSettings, false)
    }
    function remove(idx: number) {
        console.log('remove', idx)
        const thisUser = { ...theUsers }
        thisUser.admins.splice(idx, 1)
        setTheUsers(thisUser)
        mutateDB(theUsers, dbSettings, false)
    }
    return (
        <>
            <h2>Administrators</h2>
            {theUsers.admins.map((theAdmin: any, i: number) => (
                // <User pin={thePin} idx={i} key={i} onChange={(p: any) => onPinChange(p, i)} />
                <div className='userpindiv' key={i}>
                    <div className={!isAdmin ? 'hidden' : ''} onClick={() => remove(i)}>{MiscIcons('trash')}</div>
                    <input className='userdriver' disabled={!isAdmin} type={'text'} value={theAdmin.id} title={'Driver Name'} onChange={(e: any) => onPinChange({ ...theAdmin, id: e.target.value }, i)} />
                    {/* <input className='userpin' type={'number'} value={theAdmin.persmissions} title={'Driver PIN'} onChange={(e: any) => onPinChange({ ...theAdmin, permissions: e.target.value }, i)} /> */}
                </div>
            ))}
            <div className='userpindiv'>
                <div className={!isAdmin ? 'hidden' : ''} onClick={() => addNew()}>{MiscIcons('circleplus')}</div>
                <input className='userdriver' disabled={!isAdmin} type={'text'} value={newAdmin.id} title={'Driver Name'} onChange={(e: any) => setNewAdmin({ ...newAdmin, id: e.target.value })} />
                {/* <input className='userpin' type={'number'} value={newAdmin.permissions} title={'Driver PIN'} onChange={(e: any) => setNewAdmin({ ...newAdmin, permissions: e.target.value })} /> */}
            </div>
        </>
    )
}
