import './gaslight.css';

import { useMemo, useState } from "react"
import { find_id } from "../../helpers"
import { CONST_EMAILS } from "../../constants"
import { Button, Input, Modal, useModal } from '../../components';
import { MiscIcons } from '../../icons';


interface Etypes {
    isOpen: boolean
    isAdmin: boolean
    mutateDB: Function
    sendEmail: Function
    dbSettings: any
    params: any
}

export function Gaslight({ isOpen, isAdmin, mutateDB, dbSettings, sendEmail, params }: Etypes) {
    if (!isOpen) return (<></>)
    const [theGuest, setTheGuest] = useState<any>('')
    const [theQty, setTheQty] = useState<undefined | number>(undefined)
    const qtyModal = useModal()

    const uIdx = find_id('_id', 'gaslight', dbSettings)
    if (uIdx === -1) { console.log('email list not found'); return }
    // const [theList, setTheList] = useState<any[]>(dbSettings[uIdx].data)
    const seatingChart = useMemo(() => { return buildSeatingChart(dbSettings[uIdx].data) }, [dbSettings, uIdx])
    function buildSeatingChart(theList: any) {
        let curRow = theList[0].Row
        let theRows: any[] = []
        let theTables: any[] = []
        console.log(theList, curRow)
        theList
            .sort((a: any, b: any) => `${a.Row}${a.Table}`.localeCompare(`${b.Row}${b.Table}`))
            .forEach((row: any) => {
                if (curRow !== row.Row) {
                    theRows.push(theTables)
                    curRow = row.Row
                    theTables = []
                }
                theTables.push(row)
            })
        console.log(theRows)
        return theRows
    }
    function checkIn(e: any) {
        console.log(e)
        qtyModal.toggle()
        setTheGuest(e)
        setTheQty(e.Seats)
    }
    function doCheckin() {
        const gIdx = find_id('_id', theGuest._id, dbSettings[uIdx].data)
        console.log(gIdx, theGuest)
        const thisGuest: any[] = [...dbSettings[uIdx].data]
        // thisGuest[gIdx].checkedIn = true;
        thisGuest[gIdx].checkedInQty = theQty
        console.log(thisGuest)
        mutateDB({ _id: 'gaslight', data: thisGuest }, dbSettings, false)
        setTheQty(undefined)
        qtyModal.toggle()

    }

    return (
        <>
            <div className='tbtngroup'>
                {seatingChart && seatingChart
                    .map((row: any, i: number) => {
                        return (
                            <div key={i} >
                                {
                                    row.map((table: any, j: number) => (
                                        <RowTable key={i + j} table={table} setter={(e: any) => checkIn(e)} />
                                    ))
                                }
                            </div>
                        )
                    }
                    )}
            </div>
            <Modal isOpen={qtyModal.isOpen} toggle={qtyModal.toggle} classes='qty-modal'>
                <div className='qtydiv'>
                    <div>{`${theGuest.Name}`}</div>
                    <div className="modal-close"><button onClick={(e) => qtyModal.toggle()}>{MiscIcons('close')}</button></div>
                    <Input type={'number'} value={theQty} min={0} max={theGuest.Seats} onChange={(e: number) => setTheQty(e)} title={'Guests'} />
                    <Button onClick={() => doCheckin()}>Check In {`${theGuest.Row}-${theGuest.Table}`}</Button>
                </div>
            </Modal>
        </>
    )
    function RowTable({ table, setter }: any) {
        let backColor = ''
        let checkedInQty = table.hasOwnProperty('checkedInQty') ? Number(table.checkedInQty) : 0
        if (checkedInQty > 0) {
            if (Number(table.checkedInQty) < Number(table.Seats)) {
                backColor = 'tbtnyellow'
            } else {
                backColor = 'tbtngreen'
            }
        }
        return (
            <>
                <button className={`${backColor} tbtn buttonmain buttonoutlined buttonfull text-sm`} onClick={() => setter(table)}>
                    {`${table.Row}-${table.Table} (${checkedInQty}/${table.Seats})`}<br /> {`${table.Name}`}
                </button>
            </>
        )
    }

}
