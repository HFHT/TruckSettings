import './pricing.css';

import { useEffect, useState } from "react"
import { useReadAllProducts, useUpdateAllProducts } from "../../hooks"
import { Button, ProgressBar } from "../../components"
import { CONST_GROUPINGS } from "../../constants"

interface IArchive {
    isOpen: boolean
    noSave: boolean
    noPrice: boolean
    toast: Function
}
export function NewPricing({ isOpen, noSave, noPrice, toast }: IArchive) {

    const [allProducts, doReadProducts, doReset, fetchProgress, quantity] = useReadAllProducts({ reprice: true, inStock: true })

    const [doUpdateProducts, updateProgress] = useUpdateAllProducts({ reprice: true, nosave: noSave })

    function handleReadProducts() {
        const theDay = new Date().getDate()
        if (theDay > 3 && theDay < 27 && noPrice) {
            alert('This operation is only allowed at the end of the month.')
            return
        }
        if (!confirm('This will change prices in Shopify, are you sure you want to proceed?')) return
        if (!confirm('Are you really sure?')) return
        doReadProducts({ types: CONST_GROUPINGS })

    }
    function handleRepriceProducts() {
        doUpdateProducts({ productList: allProducts ? allProducts : [] })
    }

    useEffect(() => {
        if (!allProducts) return
        if ((allProducts.length === 0) && fetchProgress === 100) {
            toast('No products ready to reprice.')
        }
    }, [allProducts])

    if (!isOpen) return (<></>)

    return (
        <>
            <h3>End of Month Pricing</h3>
            <p>Update pricing of all active products at the end of the month.</p>
            <div className='tagbtnprog'>
                <Button classes='' disabled={fetchProgress === 100} onClick={() => handleReadProducts()}>Fetch Products</Button>
                <ProgressBar progress={fetchProgress} label={' - Fetching Shopify Products...'} />
            </div>
            {fetchProgress === 100 &&
                <div className='tagbtnprog'>
                    <Button classes='' disabled={(allProducts && (allProducts.length === 0)) || updateProgress === 100} onClick={() => handleRepriceProducts()}>Reprice Products</Button>
                    <ProgressBar progress={updateProgress} label={` - Repricing ${quantity} products`} />
                </div>
            }
        </>
    )

}