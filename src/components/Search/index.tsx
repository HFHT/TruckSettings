
import './search.css';

import { useState } from "react";
import { Input } from "..";
import Fuse from "fuse.js";

interface ISearch {
    db: any;
    setter: Function;
    value: string;
}

export function Search({ db, setter, value }: ISearch) {
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredList, setFilteredList] = useState([])
    const fuse = new Fuse(db, {
        keys: [
            { name: 'first_name', weight: 0.5 },
            { name: 'last_name', weight: 0.7 },
            { name: 'company', weight: 0.7 },
            { name: 'phone', weight: 0.8 },
            { name: 'email', weight: 0.2 }
        ],
        minMatchCharLength: 3,
        includeScore: true,
        threshold: 0.3
    })
    const handleInputChange = (event: any) => {
        console.log(event)
        setSearchTerm(event);
        const filtered = fuse.search(event).map(({ item }) => item);
        //@ts-ignore
        setFilteredList(filtered);
    };
    const handleClick = ((appt: followupAppt) => {
        setter(appt)
        setSearchTerm('')
        setFilteredList([])
    })
    return (
        <div className='searchdiv'>
            <Input type='text' value={searchTerm} onChange={(e: string) => handleInputChange(e)} title='Find Appointment...' />
            {filteredList.length > 0 &&
                <div className='searchresults'>
                    {filteredList.map((thisResult: any, idx: number) => (
                        <div key={idx} onClick={(e: any) => handleClick({ dbIdx: thisResult.dbIdx, apptIdx: thisResult.apptIdx, apptName: thisResult.name, apptPhone: thisResult.phone })}>
                            {`${thisResult.first_name} ${thisResult.last_name} ${thisResult.company ? `(${thisResult.company})` : ''} - ${thisResult.dt} ${thisResult.done ? 'done' : ''} ${thisResult.resched ? 'reschedule' : ''}`}
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}
export interface followupAppt {
    dbIdx: number
    apptIdx: number
    apptName: { first: string, last: string }
    apptPhone: string
}