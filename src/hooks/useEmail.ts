//{to:'xyz@xyz.com', subject:'Hi', text:'Just saying hi', html: '<h1>Hi There!</h1>}

import { useState } from "react";
import { CONST_IMAGE_EMAIL, CONST_NO_EMAIL } from "../constants";

export interface ISendMail {
    email: IEmail,
    list: Iitem[]
    listAll: boolean
    images?: string[] | undefined
    doConfirm?: boolean
    template: {
        subject: string
        body: string
        type: string
    }
}
interface IEmail {
    name: { first: string, last: string },
    addr: string | undefined
    note: { apt: string, note: string }
    email: string
    seat: string
    date: string
    time: string
}
interface IuseEmail {
    toast: Function
    noSend?: boolean
}
export function useEmail({ toast, noSend = false }: IuseEmail) {

    const [emailSent, setEmailSent] = useState(true)
    console.log('useEmail', noSend)

    const sendEMail = async ({ email, list, listAll, images = [], template, doConfirm = true}: ISendMail) => {
        // if (!chatGPT) return;
        console.log('sendEmail', email, template)
        if (!email || email.email === CONST_NO_EMAIL) { setEmailSent(false); return; }
        if (doConfirm && !confirm('Send email?')) { setEmailSent(false); return; }
        const headers = new Headers();
        const optionsDesc = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                to: email.email,
                subject: template.subject,
                html: formatTemplate({ email, list, listAll, images, template }),
                text: ''
            })
        }
        console.log('sendEmail', optionsDesc.body)
        //if the doNotSend param is set then skip actually sending the email
        if (noSend) return
        fetch(`${import.meta.env.VITE_AZURE_FUNC_URL}/api/HFHTSendEmail`, optionsDesc)
            .then(response => {
                console.log(response);
                if (response.ok) {
                    toast(`${template.type} email to ${email.name} Sent...`)
                } else {
                    !response.ok && alert(`There is a problem with the network, ${template.type} email to ${email.name.first} ${email.name.last} not sent. Please try again later.`)
                }
            })
            .catch(error => { console.log(error); toast(`Send of ${template.type} email to ${email.name} failed: ` + error) })
    }

    return [sendEMail, emailSent] as const;

    function formatTemplate({ email, list, listAll, images, template }: ISendMail) {
        let theResult = template.body
        theResult = theResult.replace(/{DATE}/g, email.date).replace(/{TIME}/g, email.time === '' ? '9AM-3PM' : email.time).replace(/{ADDRESS}/g, formatAddr(email)).replace(/{NOTES}/g, formatNote(email))
        theResult = theResult.replace(/{LIST}/g, buildList(list, listAll))
        theResult = theResult.replace(/{IMAGES}/g, buildImages(images))
        theResult = theResult.replace(/{NAME}/g, `${email.name}`)
        theResult = theResult.replace(/{SEAT}/g, `${email.seat}`)
        return theResult
    }
    function formatNote(email: IEmail) {
        return (email.note.note === '') ? '' : `Note: ${email.note.note}`
    }
    function formatAddr(email: IEmail) {
        if (!email.addr || email.addr === '') return ''
        if (email.note.apt !== '') return `${email.addr}  unit: ${email.note.apt}`
        return email.addr
    }
    function buildList(theList: Iitem[], listAll: boolean) {
        let retList = theList.length > 0 ? '<ul compact>' : ''
        theList.forEach((theItem: Iitem) => {
            if (listAll || theItem.c) {
                retList = `${retList} <li>${theItem.qty}-${theItem.prod}</li>`
            }
        })
        retList = `${retList} ${theList.length > 0 ? '</ul>' : ''}`
        return retList
    }
    function buildImages(theImages: string[] | undefined) {
        console.log(theImages)
        let retImages = ''
        if (theImages && theImages.length > 0) {
            retImages = `${CONST_IMAGE_EMAIL} `
            theImages.forEach((theImage: string) => {
                retImages = `${retImages} <a href="${import.meta.env.VITE_STORAGEIMAGEURL}${theImage}" ><img src="${import.meta.env.VITE_STORAGEIMAGEURL}${theImage}" height="200px"/></a>`
            })
        }
        return retImages
    }
}


