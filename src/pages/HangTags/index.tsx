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
}
export function HangTags({ isOpen }: IHangTag) {
    const [allProducts, doReadProducts] = useReadProduct()
    const print = usePrinter({})

    const [barcode, setBarcode] = useState('')

    function handleReadProducts(shopifyType: string) {
        const xyz = doReadProducts && doReadProducts(shopifyType)
    }
    useEffect(() => {
        console.log('Archive-useEffect', allProducts)
        if (!allProducts || !allProducts.hasOwnProperty('theList')) return
        if (allProducts && allProducts.theList.data.length < 1) return
        printHangTags(allProducts.theList.data)

    }, [allProducts])

    if (!isOpen) return (<></>)

    return (
        <>
            <h3>Hang Tag Printing</h3>
            <p>Print out hang tags for all instock products in Shopify or for a single product by providing it's barcode.</p>
            <Button classes='dbtn' onClick={() => handleReadProducts('Furniture-Bedroom')}>Furniture-Bedroom</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('Furniture-Dining')}>Furniture-Dining</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('Furniture-Living')}>Furniture-Living</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('Furniture-Office')}>Furniture-Office</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('Furniture-Patio')}>Furniture-Patio</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('Appliance-HeatCool')}>Appliance-HeatCool</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('Appliance-Household')}>Appliance-Household</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('Appliance-Kitchen')}>Appliance-Kitchen</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('Appliance-Laundry')}>Appliance-Laundry</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('Appliance-Outdoor')}>Appliance-Outdoor</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('Cabinets')}>Cabinets</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('BldgMat-Door')}>BldgMat-Door</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('BldgMat-Window')}>BldgMat-Window</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('BldgMat-Tools')}>BldgMat-Tools</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('BldgMat-Electrical')}>BldgMat-Electrical</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('BldgMat-Plumbing')}>BldgMat-Plumbing</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('BldgMat-Paint')}>BldgMat-Paint</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('Household-ArtDecor')}>Household-ArtDecor</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('Household-Sporting')}>Household-Sporting</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('Flooring')}>Flooring</Button>
            <input className='username' type={'text'} value={barcode} placeholder='Product barcode' title={'Driver Name'} onChange={(e: any) => setBarcode(e.target.value)} />
        </>
    )
    // function doHangTags(theProducts: IShopifyProd[]) {

    //     theProducts.forEach((thisProduct: IShopifyProd) => {
    //         console.log(thisProduct.id, thisProduct.variants[0].barcode, readyToPrint(thisProduct))
    //         if (readyToPrint(thisProduct)) {
    //             print({
    //                 was: thisProduct.variants[0].compare_at_price,
    //                 now: thisProduct.variants[0].price,
    //                 item: thisProduct.variants[0].barcode.slice(-5),
    //                 vendor: thisProduct.vendor
    //             })

    //             thisDelay(2000)
    //         }
    //     })
    // }

}