import { useState } from 'react';
import { find_id } from '../../helpers';
import { MiscIcons } from '../../icons';
import { IUsers } from '..';

export const Admins = ({ isOpen, isAdmin, dbSettings, mutateDB/* dbTrack, dbSched */ }: IUsers) => {
    if (!isOpen) return (<></>)
    const uIdx = find_id('_id', 'Admins', dbSettings)
    const [theUsers, setTheUsers] = useState<DBAdmins>(dbSettings[uIdx])
    const [newAdmin, setNewAdmin] = useState<IAdmin>({ id: '', permissions: ['All'] })
    const isEmail = (email: string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

    console.log(theUsers, uIdx)
    function onPinChange(thisPin: IAdmin, pinIdx: number) {
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
        <div className='useradmin'>
            <h2>Administrators</h2>
            {theUsers.admins.map((theAdmin: IAdmin, i: number) => (
                <div className='userpindiv' key={i}>
                    {isAdmin ?
                        <div onClick={() => remove(i)} title='Remove Admin'>{MiscIcons('trash')}</div>
                        : <div></div>
                    }
                    <input className='username' disabled={!isAdmin} type={'text'} value={theAdmin.id} title={'Driver Name'} onChange={(e: any) => onPinChange({ ...theAdmin, id: e.target.value }, i)} />
                </div>
            ))}
            {isAdmin &&
                <div className='userpindiv'>
                    <div onClick={() => addNew()} title='Add Admin'>{MiscIcons('circleplus')}</div>
                    <input className='username' disabled={!isAdmin} type={'text'} value={newAdmin.id} title={'Driver Name'} onChange={(e: any) => setNewAdmin({ ...newAdmin, id: e.target.value })} />
                </div>
            }
        </div>
    )
}
