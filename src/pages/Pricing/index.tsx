import { useEffect, useState } from "react"
import { useReadCollects, useReadProduct, useUpdateProduct, useUpdateVariant } from "../../hooks"
import { Button } from "../../components"
import { repriceProducts } from "../../helpers"

interface IHangTag {
    isOpen: boolean
}
export function Pricing({ isOpen }: IHangTag) {
    const CONST_BATCH_AMT = 50

    const [allProducts, doReadProducts, doReset] = useReadProduct()
    const [theProd, doUpdateProduct] = useUpdateProduct()
    const [theVariant, updateTheVariant] = useUpdateVariant()
    const [repriceList, setRepriceList] = useState<any[]>([])
    const [nextIdx, setNextIdx] = useState(0)

    function handleReadProducts(shopifyVendor: string) {
        const theDay = new Date().getDate()
        if (theDay > 3 && theDay < 27) {
            alert('This operation is only allowed at the end of the month.')
            return
        }
        if (!confirm('This will change prices in Shopify, are you sure you want to proceed?')) return
        if (!confirm('Are you really sure?')) return
        doReadProducts({ vendor: shopifyVendor })
    }
    function handleNextProducts() {
        let theseProducts = allProducts!.theList.data.slice(nextIdx * CONST_BATCH_AMT, (nextIdx * CONST_BATCH_AMT) + CONST_BATCH_AMT)
        if (theseProducts.length === 0) {
            doReset()
            setNextIdx(0)
        } else {
            repriceProducts(theseProducts, updateTheVariant)
            setNextIdx(nextIdx + 1)
        }
    }
    const isDisabled = () => {
        return nextIdx === 0
    }
    useEffect(() => {
        console.log('Pricing-useEffect', allProducts)
        if (!allProducts || !allProducts.hasOwnProperty('theList')) return
        if (allProducts && allProducts.theList.data.length < 1) return
        repriceProducts(allProducts.theList.data.slice(0, CONST_BATCH_AMT), updateTheVariant)
        setNextIdx(nextIdx + 1)
    }, [allProducts])

    useEffect(() => {
        console.log('Pricing-useEffect', theVariant)
        if (!theVariant) return
        setRepriceList([...repriceList, theVariant])
        console.log(theVariant)


    }, [theVariant])

    function handleStop() {
        doReset()
        setNextIdx(0)
    }
    if (!isOpen) return (<></>)

    return (
        <>
            <h3>End of Month Pricing</h3>
            <p>Update pricing of all active products at the end of the month.</p>
            <div className='btngroup'>
                <Button classes='dbtn' disabled={!isDisabled()} onClick={() => handleReadProducts('yellow-collection')}>Yellow</Button>
                <Button classes='dbtn' disabled={!isDisabled()} onClick={() => handleReadProducts('blue-discount-collection')}>White</Button>
                <Button classes='dbtn' disabled={!isDisabled()} onClick={() => handleReadProducts('red-collection')}>Red</Button>
                <Button classes='dbtn' disabled={!isDisabled()} onClick={() => handleReadProducts('green-collection')}>Green</Button>
            </div>
            <Button classes='dbtn' disabled={isDisabled()} onClick={() => handleNextProducts()}>Next {CONST_BATCH_AMT}</Button>
            <Button classes='dbtn' disabled={isDisabled()} onClick={() => handleStop()}>Cancel</Button>
            <div className='archiveList'>
                {repriceList && repriceList.map((thisProd: any, idx: number) => (
                    <div key={idx}>{thisProd.theProduct.data.variant.product_id}:{thisProd.theProduct.err} </div>
                ))}
            </div>
        </>
    )
}