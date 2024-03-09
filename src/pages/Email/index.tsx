import { useState } from "react"
import { find_id } from "../../helpers"
import { Button } from "../../components"
import { CONST_EMAILS } from "../../constants"


interface Etypes {
    isOpen: boolean
    isAdmin: boolean
    mutateDB: Function
    sendEmail: Function
    dbSettings: any
    params: any
}

export function Email({ isOpen, isAdmin, mutateDB, dbSettings, sendEmail, params }: Etypes) {
    if (!isOpen) return (<></>)

    const uIdx = find_id('_id', 'gaslight', dbSettings)
    if (uIdx === -1) { console.log('email list not found'); return }
    const [theList, setTheList] = useState<any[]>(dbSettings[uIdx].data)
    function handleSendEmail(props: any) {
        console.log(props)
        sendEmail({
            email: {
                name: props.Name,
                addr: `${props.Street},${props.City},${props.State} ${props.Zip}`,
                seat: `${props.Row} - ${props.Table} (seats ${props.Seats})`,
                note: '',
                email: props.Email,
                date: '',
                time: ''
            },
            list: [],
            listAll: false,
            template: CONST_EMAILS.email,
            noSend: params.noemail
        })

    }
    return (
        <div className='btngroup'>
            {theList && theList.filter((row: any) => (row.Name && row.Email)).map((row: any, i: number) => (
                <Button key={i} classes='dbtn' onClick={() => handleSendEmail(row)}>{row.Name}</Button>
            ))}
        </div>
    )
}
