import { useEffect, useState } from "react"
import { useReadCollects, useReadProduct, useUpdateProduct, useUpdateVariant } from "../../hooks"
import { Button } from "../../components"
import { repriceProducts } from "../../helpers"

interface IHangTag {
    isOpen: boolean
}
export function Pricing({ isOpen }: IHangTag) {
    const [allProducts, doReadProducts] = useReadProduct()
    const [theProd, doUpdateProduct] = useUpdateProduct()
    const [theVariant, updateTheVariant] = useUpdateVariant()
    const [repriceList, setRepriceList] = useState<any[]>([])

    function handleReadProducts(shopifyVendor: string) {
        const theDay = new Date().getDate()
        if (theDay > 3 && theDay < 27) {
            alert('This operation is only allowed at the end of the month.')
            return
        }
        if (!confirm('This will change prices in Shopify, are you sure you want to proceed?')) return
        if (!confirm('Are you really sure?')) return
        const xyz = doReadProducts && doReadProducts({ vendor: shopifyVendor })
    }

    useEffect(() => {
        console.log('Pricing-useEffect', allProducts)
        if (!allProducts || !allProducts.hasOwnProperty('theList')) return
        if (allProducts && allProducts.theList.data.length < 1) return
        repriceProducts(allProducts.theList.data, updateTheVariant)

    }, [allProducts])

    useEffect(() => {
        console.log('Pricing-useEffect', theVariant)
        if (!theVariant) return
        setRepriceList([...repriceList, theVariant])
        console.log(theVariant)


    }, [theVariant])
    if (!isOpen) return (<></>)

    return (
        <>
            <h3>End of Month Pricing</h3>
            <p>Update pricing of all active products at the end of the month.</p>
            <Button classes='dbtn' onClick={() => handleReadProducts('yellow-collection')}>Yellow</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('blue-discount-collection')}>White</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('red-collection')}>Red</Button>
            <Button classes='dbtn' onClick={() => handleReadProducts('green-collection')}>Green</Button>
            <div className='archiveList'>
                {repriceList && repriceList.map((thisProd: any, idx: number) => (
                    <div key={idx}>{thisProd.theProduct.data.variant.product_id}:{thisProd.theProduct.err} </div>
                ))}
            </div>
        </>
    )
}