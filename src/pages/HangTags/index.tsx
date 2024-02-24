import { useState } from "react"
import { useReadCollects, useReadProduct, useUpdateProduct } from "../../hooks"
import { Button } from "../../components"

interface IHangTag {
    isOpen: boolean
}
export function HangTags({ isOpen }: IHangTag) {
    const [allProducts, doReadProducts] = useReadProduct()
    const [theProd, doUpdateProduct] = useUpdateProduct()
    const [barcode, setBarcode] = useState('')

    function handleReadProducts(shopifyType: string) {
        const xyz = doReadProducts && doReadProducts(shopifyType)
    }
    if (!isOpen) return (<></>)

    return (
        <>
            <h3>Hang Tag Printing</h3>
            <p>Print out hang tags for all instock products in Shopify or for a single product by providing it's barcode.</p>
            <Button classes='dbtn' onClick={() => handleReadProducts('Furniture-Bedroom')}>Furniture-Living</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('Furniture-Dining')}>Furniture-Living</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('Furniture-Living')}>Furniture-Living</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('Furniture-Office')}>Furniture-Living</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('Furniture-Patio')}>Furniture-Living</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('Appliance-HeatCool')}>Furniture-Living</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('Appliance-Household')}>Furniture-Living</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('Appliance-Kitchen')}>Furniture-Living</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('Appliance-Laundry')}>Furniture-Living</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('Appliance-Outdoor')}>Furniture-Living</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('Cabinets')}>Furniture-Living</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('BldgMat-Door')}>Furniture-Living</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('BldgMat-Window')}>Furniture-Living</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('BldgMat-Tools')}>Furniture-Living</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('BldgMat-Electrical')}>Furniture-Living</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('BldgMat-Plumbing')}>Furniture-Living</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('BldgMat-Paint')}>Furniture-Living</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('Household-ArtDecor')}>Furniture-Living</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('Household-Sporting')}>Furniture-Living</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('Flooring')}>Furniture-Living</Button>
            <input className='username' type={'text'} value={barcode} placeholder='Product barcode' title={'Driver Name'} onChange={(e: any) => setBarcode(e.target.value)} />
        </>
    )
}