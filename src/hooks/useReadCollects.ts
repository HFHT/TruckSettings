import { useState } from "react";
import { CONST_COLLECTIONS } from "../constants";

export function useReadCollects() {
    const [theProduct, setTheProduct] = useState<IShopifyReturn | undefined>({} as IShopifyReturn)

    const headers = new Headers();
    var url = `${import.meta.env.VITE_AZURE_FUNC_URL}/api/HFHTShopify`;

    const doReset = () => {
        setTheProduct(undefined)
    }
    const doReadProduct = async () => {
        console.log('useReadCollection', prompt)

        let options = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                method: 'listCollects',
                collections: [CONST_COLLECTIONS["newly-added-items"]],
                product: '',
                // status: 'active',
                // vendor: 'green-collection',
                // tags: 'Bedroom',
                // type: type
            })
        };
        try {
            const response = await fetch(url, options);
            console.log(response);
            if (!response.ok) throw `Shopify Product failed with ${response.status}: ${response.statusText}`
            const shopifyResponse = (await response.json());
            console.log(shopifyResponse);
            if (shopifyResponse.theList.err) console.log(shopifyResponse.theList.err)
            setTheProduct(shopifyResponse)
        }
        catch (error) {
            console.log(error);
            alert(error);
        }
    }
    return [theProduct, doReadProduct, doReset] as const
}
