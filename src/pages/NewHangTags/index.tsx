import './hangtags.css';

import { useEffect, useState } from "react"
import { usePrinter, usePrintHangTags, useReadAllProducts, useReadProduct } from "../../hooks"
import { Button, ProgressBar } from "../../components"
import { doDelay, printHangTags, readyToPrint } from "../../helpers"
import { CONST_GROUPINGS } from "../../constants"

// async function thisDelay(amt: number = 250) {
//     console.log('delay...')
//     await doDelay(amt)
// }
interface IHangTag {
    isOpen: boolean
    noPrint: boolean
    doSave: Function
    dbSettings: any[]
}
export function NewHangTags({ isOpen, noPrint, doSave, dbSettings }: IHangTag) {
    const CONST_BATCH_AMT = 25

    const [allProducts, doReadProducts, doReset, fetchProgress, quantity] = useReadAllProducts({ tags: { do: true, reprice: true, inStock: true } })
    const [theQueue, updateQueue, printStatus] = usePrintHangTags({ noPrint: noPrint })
    const [progress, setProgress] = useState(0)

    const [nextIdx, setNextIdx] = useState(0)

    function handleReadProducts(age: number) {
        if (!confirm('This will print out alot of tags, are you sure you want to proceed?')) return
        doReadProducts({ types: CONST_GROUPINGS, age: age })

    }
    function handlePrint() {
        if (!allProducts) return
        let theseProducts = allProducts.slice(nextIdx * CONST_BATCH_AMT, (nextIdx * CONST_BATCH_AMT) + CONST_BATCH_AMT)
        setNextIdx(nextIdx + 1)
        updateQueue(theseProducts)
    }

    useEffect(() => {
        console.log('printerStatus', printStatus)
        if (printStatus === 'Done') {
            setProgress(progress + 1)
        }
    }, [printStatus])


    useEffect(() => {
        if (!allProducts) return
        console.log(allProducts)
        doSave({ _id: "hangtags", data: allProducts }, dbSettings, false)

    }, [allProducts])

    if (!isOpen) return (<></>)

    return (
        <>
            <h3>Hang Tag Printing</h3>
            <p>Print out hang tags for all instock products in Shopify or for a single product by providing it's barcode.</p>
            <div className='tagbtnprog'>
                <Button classes='' disabled={fetchProgress === 100} onClick={() => handleReadProducts(999)}>Fetch All Products</Button>
                <Button classes='' disabled={fetchProgress === 100} onClick={() => handleReadProducts(1)}>Fetch Todays Products</Button>
                <ProgressBar progress={fetchProgress} label={' - Fetching Shopify Products...'} />
            </div>
            {fetchProgress === 100 &&
                <div className='tagbtnprog'>
                    <Button classes='' disabled={fetchProgress !== 100} onClick={() => handlePrint()}>Print {CONST_BATCH_AMT}</Button>
                    <ProgressBar progress={Math.round(((progress) / quantity) * 100)} label={` - Printing ${(CONST_BATCH_AMT * nextIdx) > quantity ? quantity : (CONST_BATCH_AMT * nextIdx)} of ${quantity}`} />
                </div>
            }
        </>
    )

}