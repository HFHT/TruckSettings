import { useEffect, useState } from "react"
import { usePrinter, useReadProduct } from "../../hooks"
import { Button, ProgressBar } from "../../components"
import { doDelay, printHangTags, readyToPrint } from "../../helpers"

// async function thisDelay(amt: number = 250) {
//     console.log('delay...')
//     await doDelay(amt)
// }
interface IHangTag {
    isOpen: boolean
    noPrint: boolean
}
export function HangTags({ isOpen, noPrint }: IHangTag) {
    const CONST_BATCH_AMT = 25

    const [allProducts, doReadProducts, doReset] = useReadProduct()
    const [print, seperator, printStatus] = usePrinter({ noPrint: noPrint })

    const [nextIdx, setNextIdx] = useState(0)

    const [barcode, setBarcode] = useState('')
    const [theError, setTheError] = useState('')
    const [size, setSize] = useState(0)
    const [overallProgress, setOverallProgress] = useState(0)
    const [ready, setReady] = useState(0)
    const [progress, setProgress] = useState(0)
    const [progressLabel, setProgressLabel] = useState('')

    const isDisabled = () => {
        return nextIdx === 0
    }
    function handleReadProducts(shopifyType: string) {
        if (!confirm('This will print out alot of tags, are you sure you want to proceed?')) return
        doReadProducts({ type: shopifyType })
        setProgressLabel(shopifyType)
        setReady(0)
        setSize(0)
        setProgress(0)
        seperator({ category: shopifyType })
    }
    function handleNextProducts() {
        let theseProducts = allProducts!.theList.data.slice(nextIdx * CONST_BATCH_AMT, (nextIdx * CONST_BATCH_AMT) + CONST_BATCH_AMT)
        setProgress(0)
        if (theseProducts.length === 0) {
            doReset()
            setNextIdx(0)
        } else {
            setReady(printHangTags(theseProducts, print))
            setNextIdx(nextIdx + 1)
        }
    }

    useEffect(() => {
        console.log('Archive-useEffect', allProducts)
        if (!allProducts || !allProducts.hasOwnProperty('theList')) return
        if (allProducts.theList.hasOwnProperty('data')) {
            if (allProducts.theList.data.length < 1) return
            setReady(printHangTags(allProducts.theList.data.slice(0, CONST_BATCH_AMT), print))
            setSize(allProducts.theList.data.length)
            setNextIdx(nextIdx + 1)
        } else {
            if (allProducts.theProduct.hasOwnProperty('data')) {
                setReady(printHangTags(allProducts.theProduct.data.products, print))
                setSize(1)
            } else {
                return
            }
        }

    }, [allProducts])

    useEffect(() => {
        console.log('printerStatus', printStatus)
        if (printStatus === 'Done') {
            setProgress(progress + 1)
        }
    }, [printStatus])


    function handleSingleProduct() {
        if (barcode === '') return
        doReadProducts({ product: barcode })
        setBarcode('')
    }
    function handleStop() {
        doReset()
        setNextIdx(0)
    }
    if (!isOpen) return (<></>)

    return (
        <>
            <h3>Hang Tag Printing</h3>
            <p>Print out hang tags for all instock products in Shopify or for a single product by providing it's barcode.</p>
            <ProgressBar progress={Math.floor(((nextIdx) / Math.ceil(size / 25)) * 100)} label={''} />
            <ProgressBar progress={Math.floor((progress / ready) * 100)} label={progressLabel} />
            <div className='btngroup'>
                <Button classes='dbtn' disabled={!isDisabled()} onClick={() => handleReadProducts('Furniture-Bedroom')}>Furniture-Bedroom</Button>
                <Button classes='dbtn' disabled={!isDisabled()} onClick={() => handleReadProducts('Furniture-Dining')}>Furniture-Dining</Button>
                <Button classes='dbtn' disabled={!isDisabled()} onClick={() => handleReadProducts('Furniture-Living')}>Furniture-Living</Button>
                <Button classes='dbtn' disabled={!isDisabled()} onClick={() => handleReadProducts('Furniture-Office')}>Furniture-Office</Button>
                <Button classes='dbtn' disabled={!isDisabled()} onClick={() => handleReadProducts('Furniture-Patio')}>Furniture-Patio</Button>
                <Button classes='dbtn' disabled={!isDisabled()} onClick={() => handleReadProducts('Appliance-HeatCool')}>Appliance-HeatCool</Button>
                <Button classes='dbtn' disabled={!isDisabled()} onClick={() => handleReadProducts('Appliance-Household')}>Appliance-Household</Button>
                <Button classes='dbtn' disabled={!isDisabled()} onClick={() => handleReadProducts('Appliance-Kitchen')}>Appliance-Kitchen</Button>
                <Button classes='dbtn' disabled={!isDisabled()} onClick={() => handleReadProducts('Appliance-Laundry')}>Appliance-Laundry</Button>
                <Button classes='dbtn' disabled={!isDisabled()} onClick={() => handleReadProducts('Appliance-Outdoor')}>Appliance-Outdoor</Button>
                <Button classes='dbtn' disabled={!isDisabled()} onClick={() => handleReadProducts('Cabinets')}>Cabinets</Button>
                <Button classes='dbtn' disabled={!isDisabled()} onClick={() => handleReadProducts('BldgMat-Door')}>BldgMat-Door</Button>
                <Button classes='dbtn' disabled={!isDisabled()} onClick={() => handleReadProducts('BldgMat-Window')}>BldgMat-Window</Button>
                <Button classes='dbtn' disabled={!isDisabled()} onClick={() => handleReadProducts('BldgMat-Tools')}>BldgMat-Tools</Button>
                <Button classes='dbtn' disabled={!isDisabled()} onClick={() => handleReadProducts('BldgMat-Electrical')}>BldgMat-Electrical</Button>
                <Button classes='dbtn' disabled={!isDisabled()} onClick={() => handleReadProducts('BldgMat-Plumbing')}>BldgMat-Plumbing</Button>
                <Button classes='dbtn' disabled={!isDisabled()} onClick={() => handleReadProducts('BldgMat-Paint')}>BldgMat-Paint</Button>
                <Button classes='dbtn' disabled={!isDisabled()} onClick={() => handleReadProducts('Household-ArtDecor')}>Household-ArtDecor</Button>
                <Button classes='dbtn' disabled={!isDisabled()} onClick={() => handleReadProducts('Household-Sporting')}>Household-Sporting</Button>
                <Button classes='dbtn' disabled={!isDisabled()} onClick={() => handleReadProducts('Flooring')}>Flooring</Button>
                <div className='btnspace'></div>
                <Button classes='dbtn' disabled={isDisabled()} onClick={() => handleNextProducts()}>Next {CONST_BATCH_AMT}</Button>
                <Button classes='dbtn' disabled={isDisabled()} onClick={() => handleStop()}>Cancel</Button>
            </div>
            <div className='rule'></div>
            <div className='btngroup flex'>
                <input className='barcode' type={'text'} value={barcode} placeholder='Product barcode' title={'Driver Name'} onChange={(e: any) => setBarcode(e.target.value)} />
                <Button classes='dbtn' disabled={!isDisabled()} onClick={() => handleSingleProduct()}>Print</Button>
                <p className='errtext'>{theError}</p>
            </div>

        </>
    )

}