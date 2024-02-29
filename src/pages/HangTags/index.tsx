import { useEffect, useState } from "react"
import { usePrinter, useReadProduct } from "../../hooks"
import { Button } from "../../components"
import { doDelay, printHangTags, readyToPrint } from "../../helpers"

// async function thisDelay(amt: number = 250) {
//     console.log('delay...')
//     await doDelay(amt)
// }
interface IHangTag {
    isOpen: boolean
    params: any
}
export function HangTags({ isOpen, params }: IHangTag) {
    const CONST_BATCH_AMT = 25

    const [allProducts, doReadProducts, doReset] = useReadProduct()
    const [nextIdx, setNextIdx] = useState(0)

    const [barcode, setBarcode] = useState('')
    const [theError, setTheError] = useState('')

    const isDisabled = () => {
        return nextIdx === 0
    }
    function handleReadProducts(shopifyType: string) {
        if (!confirm('This will print out alot of tags, are you sure you want to proceed?')) return
        doReadProducts({ type: shopifyType })
    }
    function handleNextProducts() {
        let theseProducts = allProducts!.theList.data.slice(nextIdx * CONST_BATCH_AMT, (nextIdx * CONST_BATCH_AMT) + CONST_BATCH_AMT)
        if (theseProducts.length === 0) {
            doReset()
            setNextIdx(0)
        } else {
            printHangTags(theseProducts, params.noprint)
            setNextIdx(nextIdx + 1)
        }
    }

    useEffect(() => {
        console.log('Archive-useEffect', allProducts)
        if (!allProducts || !allProducts.hasOwnProperty('theList')) return
        if (allProducts.theList.hasOwnProperty('data')) {
            if (allProducts.theList.data.length < 1) return
            printHangTags(allProducts.theList.data.slice(0, CONST_BATCH_AMT), params.noprint)
            setNextIdx(nextIdx + 1)
        } else {
            if (allProducts.theProduct.hasOwnProperty('data')) {
                printHangTags(allProducts.theProduct.data.products, params.noprint)
            } else {
                return
            }
        }

    }, [allProducts])

    function handleSingleProduct() {
        if (barcode==='') return
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