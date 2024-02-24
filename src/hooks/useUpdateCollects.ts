import { useState } from "react";

export function useUpdateCollects() {
    const [theCollect, setTheCollect] = useState<IShopifyCollect>()

    const headers = new Headers();
    var url = `${import.meta.env.VITE_AZURE_FUNC_URL}/api/HFHTShopify`;

    const doUpdateCollect = async (collectId: string) => {
        console.log('doUpdateProduct', prompt)

        let options = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                method: 'removeProdFromCollect',
                collections: [collectId],
            })
        };
        try {
            const response = await fetch(url, options);
            console.log(response);
            //Response should be an empty object -> theCollections: {data:{},err:null}
            if (!response.ok) throw `Shopify Collect failed with ${response.status}: ${response.statusText}`
            const shopifyResponse = (await response.json());
            console.log(shopifyResponse);
            if (shopifyResponse.theProduct.err) {console.log(shopifyResponse.theProduct.err)}
            setTheCollect(shopifyResponse)
        }
        catch (error) {
            console.log(error);
            alert(error);
        }
        return true
    }
    return [theCollect, doUpdateCollect] as const
}
