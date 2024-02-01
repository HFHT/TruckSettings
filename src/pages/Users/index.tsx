import { useState } from 'react';
import { Input } from '../../components';
import { find_id } from '../../helpers';
import { MiscIcons } from '../../icons';
import './users.css';

interface IDownloads {
    isOpen: boolean
    isAdmin: boolean
    dbSettings: []
    mutateDB: Function
    // dbSched: any
}

export const Users = ({ isOpen, isAdmin, dbSettings, mutateDB/* dbTrack, dbSched */ }: IDownloads) => {
    if (!isOpen) return (<></>)
    const uIdx = find_id('_id', 'Users', dbSettings)
    const [theUsers, setTheUsers] = useState<DBUsers>(dbSettings[uIdx])
    const [newPin, setNewPin] = useState<IPin>({ person: '', pin: '' })
    console.log(theUsers, uIdx)
    function onPinChange(thisPin: IPin, pinIdx: number) {
        console.log(thisPin, pinIdx)
        const thisUser = { ...theUsers }
        thisUser.pins[pinIdx] = thisPin
        console.log(thisUser)
        setTheUsers(thisUser)
        mutateDB(theUsers, dbSettings, false)
    }
    function addNew() {
        console.log('addNew')
        if (newPin.person === '' || newPin.pin === '') return
        const thisUser = { ...theUsers }
        thisUser.pins.push(newPin)
        setNewPin({ person: '', pin: '' })
        setTheUsers(thisUser)
        mutateDB(theUsers, dbSettings, false)
    }
    function remove(idx: number) {
        console.log('remove', idx)
        const thisUser = { ...theUsers }
        thisUser.pins.splice(idx, 1)
        setTheUsers(thisUser)
        mutateDB(theUsers, dbSettings, false)
    }
    return (
        <>
            <h2>Driver Pins</h2>
            {theUsers.pins.map((thePin: IPin, i: number) => (
                // <User pin={thePin} idx={i} key={i} onChange={(p: any) => onPinChange(p, i)} />
                <div className='userpindiv' key={i}>
                    <div className={!isAdmin ? 'hidden' : ''} onClick={() => remove(i)}>{MiscIcons('trash')}</div>
                    <input className='userdriver' disabled={!isAdmin} type={'text'} value={thePin.person} title={'Driver Name'} onChange={(e: any) => onPinChange({ ...thePin, person: e.target.value }, i)} />
                    <input className='userpin' disabled={!isAdmin} type={isAdmin ? 'text' : 'password'} value={thePin.pin} title={'Driver PIN'} onChange={(e: any) => onPinChange({ ...thePin, pin: e.target.value }, i)} />
                </div>
            ))}
            <div className='userpindiv'>
                <div className={!isAdmin ? 'hidden' : ''} onClick={() => addNew()}>{MiscIcons('circleplus')}</div>
                <input className='userdriver' disabled={!isAdmin} type={'text'} value={newPin.person} title={'Driver Name'} onChange={(e: any) => setNewPin({ ...newPin, person: e.target.value })} />
                <input className='userpin' disabled={!isAdmin} type={'number'} value={newPin.pin} title={'Driver PIN'} onChange={(e: any) => setNewPin({ ...newPin, pin: e.target.value })} />
            </div>
        </>
    )
}
