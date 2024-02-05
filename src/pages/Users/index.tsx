import { useState } from 'react';
import { find_id } from '../../helpers';
import { MiscIcons } from '../../icons';
import { IUsers } from '..';

export const Users = ({ isOpen, isAdmin, dbSettings, mutateDB/* dbTrack, dbSched */ }: IUsers) => {
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
        <div className='userdriver'>
            <h2>Driver Pins</h2>
            {theUsers.pins.map((thePin: IPin, i: number) => (
                <div className='userpindiv' key={i}>
                    {isAdmin ?
                        <div onClick={() => remove(i)} title='Remove Driver'>{MiscIcons('trash')}</div>
                        : <div></div>
                    }
                    <input className='username' disabled={!isAdmin} type={'text'} value={thePin.person} title={'Driver Name'} onChange={(e: any) => onPinChange({ ...thePin, person: e.target.value }, i)} />
                    <input className='userpin' disabled={!isAdmin} type={isAdmin ? 'text' : 'password'} value={thePin.pin} title={'Driver PIN'} onChange={(e: any) => onPinChange({ ...thePin, pin: e.target.value }, i)} />
                </div>
            ))}
            {isAdmin &&
                <div className='userpindiv'>
                    <div className={!isAdmin ? 'hidden' : ''} onClick={() => addNew()} title='Add Driver'>{MiscIcons('circleplus')}</div>
                    <input className='username' disabled={!isAdmin} type={'text'} value={newPin.person} title={'Driver Name'} onChange={(e: any) => setNewPin({ ...newPin, person: e.target.value })} />
                    <input className='userpin' disabled={!isAdmin} type={'number'} value={newPin.pin} title={'Driver PIN'} onChange={(e: any) => setNewPin({ ...newPin, pin: e.target.value })} />
                </div>
            }
        </div>
    )
}
