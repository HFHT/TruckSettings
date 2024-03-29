import './archive.css';

import { useEffect, useState } from "react"
import { useReadCollects, useReadProduct, useUpdateCollects, useUpdateProduct } from "../../hooks"
import { Button, ProgressBar } from "../../components"
import { archiveProducts, trimNewArrivals } from "../../helpers"
import { CONST_ARCHIVE_AFTER } from "../../constants"

interface IHangTag {
    isOpen: boolean
    toast: Function
}

export function Archive({ isOpen, toast }: IHangTag) {
    const [allProducts, doReadProducts, doReset] = useReadProduct()
    const [theProd, doUpdateProduct] = useUpdateProduct()
    const [allNewItems, doReadNewItems] = useReadCollects()
    const [theCollect, doUpdateCollect] = useUpdateCollects()

    const [archiveList, setArchiveList] = useState<any[]>([])
    const [newItemList, setNewItemList] = useState<any[]>([])
    const [age, setAge] = useState(7)
    const [ready, setReady] = useState(0)
    const [progress, setProgress] = useState(0)
    const [progressLabel, setProgressLabel] = useState('')

    function handleReadProducts(shopifyType: string, thisAge: number = CONST_ARCHIVE_AFTER) {
        setAge(thisAge)
        doReadProducts({ type: shopifyType })
        setProgressLabel(shopifyType)
    }
    function handleReadCollection(thisAge: number = CONST_ARCHIVE_AFTER) {
        setAge(thisAge)
        doReadNewItems()
        setProgressLabel('New Arrivals')
    }

    useEffect(() => {
        console.log('Archive-useEffect', allProducts)
        if (!allProducts || !allProducts.hasOwnProperty('theList')) return
        if (allProducts && allProducts.theList.data.length < 1) return
        setReady(archiveProducts(allProducts.theList.data, age, doUpdateProduct))
        if (ready < 1) toast('No Products Returned.')
        setProgress(0)
        setArchiveList([])
        return () => {
            console.log('doReset')
            doReset
        }
    }, [allProducts])

    useEffect(() => {
        if (!theProd) return
        setArchiveList([...archiveList, theProd])
        setProgress(Math.floor(((archiveList.length + 1) / ready) * 100))
        console.log(theProd)
    }, [theProd])

    useEffect(() => {
        console.log('Archive-useEffect', allNewItems)
        if (!allNewItems || !allNewItems.hasOwnProperty('theCollections')) return
        if (allNewItems && allNewItems.theCollections.data.length < 1) return
        setReady(trimNewArrivals(allNewItems.theCollections.data, 2, doUpdateCollect))
        if (ready < 1) toast('No New Items Returned.')
        setProgress(0)
        setNewItemList([])
        return () => {
            console.log('doReset')
            doReset
        }
    }, [allNewItems])

    useEffect(() => {
        if (!theCollect) return
        setNewItemList([...newItemList, theCollect])
        setProgress(Math.floor(((newItemList.length + 1) / ready) * 100))
        console.log(theCollect)
    }, [theCollect])

    if (!isOpen) return (<></>)

    return (
        <>
            <h3>Archive sold products</h3>
            <p></p>
            <ProgressBar progress={progress} label={progressLabel} />
            <div className='btngroup'>

                <Button classes='dbtn' onClick={() => handleReadProducts('Furniture-Bedroom')}>Furniture-Bedroom</Button>
                <Button classes='dbtn' onClick={() => handleReadProducts('Furniture-Dining')}>Furniture-Dining</Button>
                <Button classes='dbtn' onClick={() => handleReadProducts('Furniture-Living')}>Furniture-Living</Button>
                <Button classes='dbtn' onClick={() => handleReadProducts('Furniture-Office')}>Furniture-Office</Button>
                <Button classes='dbtn' onClick={() => handleReadProducts('Furniture-Patio')}>Furniture-Patio</Button>
                <Button classes='dbtn' onClick={() => handleReadProducts('Appliance-HeatCool', 30)}>Appliance-HeatCool</Button>
                <Button classes='dbtn' onClick={() => handleReadProducts('Appliance-Household', 30)}>Appliance-Household</Button>
                <Button classes='dbtn' onClick={() => handleReadProducts('Appliance-Kitchen', 30)}>Appliance-Kitchen</Button>
                <Button classes='dbtn' onClick={() => handleReadProducts('Appliance-Laundry', 30)}>Appliance-Laundry</Button>
                <Button classes='dbtn' onClick={() => handleReadProducts('Appliance-Outdoor', 30)}>Appliance-Outdoor</Button>
                <Button classes='dbtn' onClick={() => handleReadProducts('Cabinets')}>Cabinets</Button>
                <Button classes='dbtn' onClick={() => handleReadProducts('BldgMat-Door')}>BldgMat-Door</Button>
                <Button classes='dbtn' onClick={() => handleReadProducts('BldgMat-Window')}>BldgMat-Window</Button>
                <Button classes='dbtn' onClick={() => handleReadProducts('BldgMat-Tools')}>BldgMat-Tools</Button>
                <Button classes='dbtn' onClick={() => handleReadProducts('BldgMat-Electrical', 30)}>BldgMat-Electrical</Button>
                <Button classes='dbtn' onClick={() => handleReadProducts('BldgMat-Plumbing')}>BldgMat-Plumbing</Button>
                <Button classes='dbtn' onClick={() => handleReadProducts('BldgMat-Paint')}>BldgMat-Paint</Button>
                <Button classes='dbtn' onClick={() => handleReadProducts('Household-ArtDecor')}>Household-ArtDecor</Button>
                <Button classes='dbtn' onClick={() => handleReadProducts('Household-Sporting')}>Household-Sporting</Button>
                <Button classes='dbtn' onClick={() => handleReadProducts('Flooring')}>Flooring</Button>
                <Button classes='dbtn' onClick={() => handleReadCollection()}>New Arrivals</Button>
            </div>
            <div className='archiveList'>
                {archiveList && archiveList.map((thisProd: any, idx: number) => (
                    <div key={idx}>{thisProd.theProduct.data.product.id}:{thisProd.theProduct.err} </div>
                ))}
                {newItemList && newItemList.map((thisProd: any, idx: number) => (
                    <div key={idx}>{thisProd.prodid}:{thisProd.err} </div>
                ))}
            </div>
        </>
    )


}