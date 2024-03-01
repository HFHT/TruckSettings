import { CONST_DISCOUNTS, CONST_DISCOUNT_COLORS, CONST_LOGO_IMAGE } from "../constants"

interface IusePrinter {
    name?: string
    height?: number
    width?: number
}
export function usePrinter({ name = '_blank', height = 400, width = 600 }: IusePrinter) {
    const print = (detail: { was: string, now: string, item: string, vendor: string }) => {
        const theColorIdx = CONST_DISCOUNTS.findIndex((c: string) => c === detail.vendor)
        if (theColorIdx===-1) {
            console.log(`currentDiscount, bad color: ${detail.vendor}`)
            alert(`Item not Printed! Shopify item, ${detail.item}, has an incorrect vendor: ${detail.vendor}.`)
            return
        }

        var mywindow = window.open('', name, 'popup' /*`height=${height}, width=${width}`*/)
        if (mywindow) {
            // mywindow.document.write('')
            mywindow.document.write(
                `<html><head>\
                <title>Print</title>\
                <link rel="preconnect" href="https://fonts.googleapis.com">\
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\
                <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet">\
                </head><body >`
            )
            mywindow.document.write(
                `<div style="width:400px; "><img width="320"\
                src="${import.meta.env.VITE_STORAGEIMAGEURL}${CONST_LOGO_IMAGE}"/>`
            )
            mywindow.document.write(
                `<table style="display:flex; align-items:baseline">\
                <tr style="display:flex; align-items:center "><td>\
                <img height="80" style="margin-left:1rem;"\
                src="${import.meta.env.VITE_STORAGEIMAGEURL}WAS.png"/>\
                </td><td><h1 style="font-size:4rem; margin-left:4rem; text-decoration-line: underline;">${detail.was}</h1></td></tr>`
            )
            mywindow.document.write(
                `<tr style="display:flex; align-items:center "><td>\
                <img height="80" style="margin-left:1rem;"\
                src="${import.meta.env.VITE_STORAGEIMAGEURL}NOW.png"/>\
                </td><td><h1 style="font-size:4rem; margin-left:4rem; text-decoration-line: underline;">${detail.now}</h1></td></tr>`
            )
            mywindow.document.write(
                `<tr style="display:flex; align-items:center "><td>\
                <img height="80" style="margin-left:1rem;"\
                src="${import.meta.env.VITE_STORAGEIMAGEURL}ITEM.png"/>\
                </td><td><h1 style="font-size:4rem; margin-left:3rem; text-decoration-line: underline;">${detail.item}</h1></td></tr>\
                </table>`
            )
            // mywindow.document.write(
            //     `<img width="480"\
            //     src="${import.meta.env.VITE_STORAGEIMAGEURL}BANGNAIL.png"/>`
            // )
            mywindow.document.write(
                `<div style="display:flex; justify-content:center; align-items:center; height:120px; ${currentDiscount(theColorIdx)}"><h2 style=" text-align:center">EVERY SALE BANGS A NAIL</h2></div></div>`
            )
            // mywindow.document.write(document.getElementById(elem).innerHTML);
            mywindow.document.write('</body></html>')
            mywindow.document.close() // necessary for IE >= 10
            mywindow.focus() // necessary for IE >= 10*/

            mywindow.addEventListener('load', () => {
                //@ts-ignore
                mywindow.print();
                //@ts-ignore
                mywindow.close();
            })

        }
    }
    return print

    function currentDiscount(theColorIdx: number) {
        return `color:${CONST_DISCOUNT_COLORS[theColorIdx].fg}; background-color:${CONST_DISCOUNT_COLORS[theColorIdx].bg};`
    }
}
