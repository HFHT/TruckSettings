import './archive.css';

import { useEffect, useState } from "react"
import { usePrinter, usePrintHangTags, useReadAllProducts, useReadProduct, useUpdateAllProducts } from "../../hooks"
import { Button, ProgressBar } from "../../components"
import { doDelay, printHangTags, readyToPrint } from "../../helpers"
import { CONST_ARCHIVE_AFTER, CONST_EXCEPTIONS, CONST_GROUPINGS, CONST_NEW_ARRIVAL } from "../../constants"

interface IArchive {
    isOpen: boolean
    noSave: boolean
    toast: Function
}
export function NewArchive({ isOpen, noSave, toast }: IArchive) {
    const [age, setAge] = useState(CONST_ARCHIVE_AFTER)
    const [newArrival, setNewArrival] = useState(CONST_NEW_ARRIVAL)

    const [haveProducts, setHaveProducts] = useState(false)
    const [allProducts, doReadProducts, doReset, fetchProgress, quantity] = useReadAllProducts({ reprice: false, outOfStock: { do: true, age: age, except: CONST_EXCEPTIONS, exceptAge: 31 } })
    const [allNewProducts, doReadNewProducts, doNewReset, fetchNewProgress, newQuantity] = useReadAllProducts({ newArrivals: { do: true, age: newArrival } })

    const [doUpdateProducts, updateProgress] = useUpdateAllProducts({ archive: true, nosave: noSave })
    const [doUpdateNewProducts, updateNewProgress] = useUpdateAllProducts({ newArrivals: true, nosave: noSave })

    function handleReadProducts() {
        if (!confirm('This will archive products in Shopify, are you sure you want to proceed?')) return
        doReadProducts({ types: CONST_GROUPINGS })

    }
    function handleArchiveProducts() {
        doUpdateProducts({ productList: allProducts ? allProducts : [], status: 'active' })
    }

    useEffect(() => {
        if (!allProducts) return
        if ((allProducts.length === 0) && fetchProgress === 100) {
            toast('No products ready to archive.')
        }
        if (fetchProgress === 100) doReadNewProducts({ types: [] })
    }, [allProducts])

    useEffect(() => {
        if (updateProgress === 100) {
            //When finished archiving, process trimming of the New Arrivals collection
            doUpdateNewProducts({ productList: allNewProducts ? allNewProducts : [] })
        }


    }, [updateProgress])


    if (!isOpen) return (<></>)

    return (
        <>
            <h3>Archive sold products</h3>
            <p>Archive sold products and remove older items from the New Arrivals collection.</p>
            <div className='agediv'>
                <div>Archive (days):</div>
                <input className='username' disabled={fetchProgress > 0} type={'text'} value={age} title={'Age'} onChange={(e: any) => setAge(e.target.value)} />
                <div></div>
                <div>New Arrival (days)</div>
                <input className='username' disabled={fetchProgress > 0} type={'text'} value={newArrival} title={'NewArrival'} onChange={(e: any) => setNewArrival(e.target.value)} />
            </div>
            <div className='tagbtnprog'>
                <Button classes='' disabled={fetchProgress === 100} onClick={() => handleReadProducts()}>Fetch Products</Button>
                <ProgressBar progress={fetchProgress} label={' - Fetching Shopify Products...'} />
            </div>
            {fetchProgress === 100 &&
                <div className='tagbtnprog'>
                    <Button classes='' disabled={(allProducts && (allProducts.length === 0)) || updateProgress === 100} onClick={() => handleArchiveProducts()}>Archive Products</Button>
                    <ProgressBar progress={updateProgress} label={` - Archiving ${quantity} products`} />
                    <div></div>
                    <ProgressBar progress={updateNewProgress} label={` - Removing ${newQuantity} New Arrivals`} />
                </div>
            }
        </>
    )

}