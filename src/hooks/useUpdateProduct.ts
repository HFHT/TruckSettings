import { useState } from "react";

export function useUpdateProduct() {
    const [theProduct, setTheProduct] = useState()

    const headers = new Headers();
    var url = `${import.meta.env.VITE_AZURE_FUNC_URL}/api/HFHTShopify`;

    const doUpdateProduct = async (prodId: string) => {
        console.log('doUpdateProduct', prompt)

        let options = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                method: 'updateProd',
                product: {
                    handle: prodId,
                    body: JSON.stringify({
                        "product": {
                            "id": prodId,
                            "status": 'archived'
                        }
                    })
                }
            })
        };
        try {
            const response = await fetch(url, options);
            console.log(response);
            if (!response.ok) throw `Shopify Product failed with ${response.status}: ${response.statusText}`
            const shopifyResponse = (await response.json());
            console.log(shopifyResponse);
            if (shopifyResponse.theProduct.err) {console.log(shopifyResponse.theProduct.err)}
            setTheProduct(shopifyResponse)
        }
        catch (error) {
            console.log(error);
            alert(error);
        }
        return true
    }
    return [theProduct, doUpdateProduct] as const
}
