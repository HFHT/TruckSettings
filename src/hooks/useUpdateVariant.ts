import { useState } from "react";
interface IdoVariant {
    variantId: string
    price: number
}
export function useUpdateVariant() {
    const [theProduct, setTheProduct] = useState()

    const headers = new Headers();
    var url = `${import.meta.env.VITE_AZURE_FUNC_URL}/api/HFHTShopify`;

    const doUpdateVariant = async ({variantId, price}:IdoVariant) => {
        console.log('doUpdateVariant', variantId, price)
        if (!variantId) return
        let options = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                method: 'updateVariant',
                product: {
                    handle: variantId,
                    body: JSON.stringify({
                        "variant": {
                            "id": variantId,
                            "weight": "0.1"
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
            if (shopifyResponse.theProduct.err) { console.log(shopifyResponse.theProduct.err) }
            setTheProduct(shopifyResponse)
        }
        catch (error) {
            console.log(error);
            alert(error);
        }
        return true
    }
    return [theProduct, doUpdateVariant] as const
}
