import { useState } from 'react';
import { find_id } from '../../helpers';
import { MiscIcons } from '../../icons';
import { IUsers } from '..';

export const Holidays = ({ isOpen, isAdmin, dbSettings, mutateDB/* dbTrack, dbSched */ }: IUsers) => {
    if (!isOpen) return (<></>)
    const uIdx = find_id('_id', 'Holidays', dbSettings)
    const [theHolidays, setTheHolidays] = useState<DBHolidays>(dbSettings[uIdx])
    const [newHoliday, setNewHoliday] = useState({ date: '', title: '' })
    console.log(theHolidays, uIdx)
    function onPinChange(thisPin: IHoliday, pinIdx: number) {
        console.log(thisPin, pinIdx)
        const thisUser = { ...theHolidays }
        thisUser.dates[pinIdx] = thisPin
        console.log(thisUser)
        setTheHolidays(thisUser)
        mutateDB(theHolidays, dbSettings, false)
    }
    function addNew() {
        console.log('addNew')
        if (newHoliday.title === '' || newHoliday.date === '') return
        const thisUser = { ...theHolidays }
        thisUser.dates.push(newHoliday)
        setNewHoliday({ date: '', title: '' })
        setTheHolidays(thisUser)
        mutateDB(theHolidays, dbSettings, false)
    }
    function remove(idx: number) {
        console.log('remove', idx)
        const thisUser = { ...theHolidays }
        thisUser.dates.splice(idx, 1)
        setTheHolidays(thisUser)
        mutateDB(theHolidays, dbSettings, false)
    }
    return (
        <div className='userdriver'>
            <h2>Holidays</h2>
            {theHolidays.dates.map((theHoliday: IHoliday, i: number) => (
                // <User pin={thePin} idx={i} key={i} onChange={(p: any) => onPinChange(p, i)} />
                <div className='userpindiv' key={i}>
                    <div className={!isAdmin ? 'hidden' : ''} onClick={() => remove(i)} title='Remove Holiday'>{MiscIcons('trash')}</div>
                    <input className='username' disabled={!isAdmin} type={'text'} value={theHoliday.title} title={'Holiday Title'} onChange={(e: any) => onPinChange({ ...theHoliday, title: e.target.value }, i)} />
                    <input className='userpin' disabled={!isAdmin} type={'date'} value={theHoliday.date} title={'Holiday Date'} onChange={(e: any) => onPinChange({ ...theHoliday, date: e.target.value }, i)} />
                </div>
            ))}
            <div className='userpindiv'>
                <div className={!isAdmin ? 'hidden' : ''} onClick={() => addNew()} title='Add Holiday'>{MiscIcons('circleplus')}</div>
                <input className='username' disabled={!isAdmin} type={'text'} value={newHoliday.title} title={'Holiday Title'} onChange={(e: any) => setNewHoliday({ ...newHoliday, title: e.target.value })} />
                <input className='userpin' disabled={!isAdmin} type={'date'} value={newHoliday.date} title={'Holiday Date'} onChange={(e: any) => setNewHoliday({ ...newHoliday, date: e.target.value })} />
            </div>
        </div>
    )
}
