import { useEffect, useState } from "react"
import { useReadCollects, useReadProduct, useUpdateProduct, useUpdateVariant } from "../../hooks"
import { Button, ProgressBar, Select } from "../../components"
import { repriceProducts } from "../../helpers"
import { CONST_TYPES } from "../../constants"

interface IHangTag {
    isOpen: boolean
    params: any //noprice params.noprint !== null
}
export function Pricing({ isOpen, params }: IHangTag) {
    const CONST_BATCH_AMT = 50
    // CONST_TYPES
    const [productTypes, doReadProducts, doReset] = useReadProduct()
    const [theProd, doUpdateProduct] = useUpdateProduct()
    const [theVariant, updateTheVariant] = useUpdateVariant(params.noprice !== null)
    const [theCollection, setTheCollection] = useState('0')
    const [allProducts, setAllProducts] = useState<any[]>([])
    const [repriceList, setRepriceList] = useState<any[]>([])
    const [nextIdx, setNextIdx] = useState(0)
    const [ready, setReady] = useState(0)
    const [progress, setProgress] = useState(0)
    const [progressLabel, setProgressLabel] = useState('')


    function handleReadTypes(shopifyTypes: string[]) {
        console.log(shopifyTypes)
        const theDay = new Date().getDate()
        if (theCollection==='0') {
            alert('You must first select a Collection.')
            return
        }
        if (theDay > 3 && theDay < 27 && params.noprice === null) {
            alert('This operation is only allowed at the end of the month.')
            return
        }
        if (!confirm('This will change prices in Shopify, are you sure you want to proceed?')) return
        if (!confirm('Are you really sure?')) return
        setAllProducts([])
        shopifyTypes.forEach((shopifyVendor: string, idx: number) => {
            doReadProducts({ vendor: theCollection, type: shopifyVendor })
        })
    }
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
        let theseProducts = allProducts.slice(nextIdx * CONST_BATCH_AMT, (nextIdx * CONST_BATCH_AMT) + CONST_BATCH_AMT)
        if (theseProducts.length === 0) {
            doReset()
            setNextIdx(0)
        } else {
            setReady(repriceProducts(theseProducts, updateTheVariant))
            setNextIdx(nextIdx + 1)
        }
    }
    const isDisabled = () => {
        return nextIdx === 0
    }

    useEffect(() => {
        if (!productTypes || !productTypes.hasOwnProperty('theList')) return
        if (productTypes && productTypes.theList.data.length < 1) return
        let theArray = [...allProducts].concat(productTypes.theList.data)
        setAllProducts(theArray)
    }, [productTypes])

    useEffect(() => {
        console.log('Pricing-useEffect', allProducts)
        if (!allProducts) return
        if (allProducts && allProducts.length < 1) return
        setReady(repriceProducts(allProducts.slice(0, CONST_BATCH_AMT), updateTheVariant))
        setNextIdx(nextIdx + 1)
    }, [allProducts])

    useEffect(() => {
        console.log('Pricing-useEffect', theVariant)
        if (!theVariant) return
        setRepriceList([...repriceList, theVariant])
        console.log(theVariant)
        setProgress(progress + 1)
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
            <ProgressBar progress={Math.floor((progress / ready) * 100)} label={progressLabel} />

            {/* <div className='btngroup'>
                <Button classes='dbtn' disabled={!isDisabled()} onClick={() => handleReadProducts('yellow-collection')}>Yellow</Button>
                <Button classes='dbtn' disabled={!isDisabled()} onClick={() => handleReadProducts('blue-discount-collection')}>White</Button>
                <Button classes='dbtn' disabled={!isDisabled()} onClick={() => handleReadProducts('red-collection')}>Red</Button>
                <Button classes='dbtn' disabled={!isDisabled()} onClick={() => handleReadProducts('green-collection')}>Green</Button>
            </div> */}
            <div>
                <Select value={theCollection} setter={(e: any) => setTheCollection(e)} title={'Collection'} >
                    <option value="0">--</option>
                    <option value="yellow-collection">yellow-collection</option>
                    <option value="blue-discount-collection">white-collection</option>
                    <option value="red-collection">red-collection</option>
                    <option value="green-collection">green-collection</option>
                </Select>
            </div>
            <div className='btngroup'>
                {Object.entries(CONST_TYPES).map(([k, v]: any, idx: number) => (
                    <Button key={idx} classes='dbtn' disabled={!isDisabled()} onClick={() => handleReadTypes(v)}>{k}</Button>
                ))}

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