import { useState } from "react";

export function useUpdateCollects() {
    const [theCollect, setTheCollect] = useState<{ prodid: string, err: string }>()

    const headers = new Headers();
    var url = `${import.meta.env.VITE_AZURE_FUNC_URL}/api/HFHTShopify`;

    const doUpdateCollect = async (collectId: string, prodid: string) => {
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
            if (shopifyResponse.theCollections.err) { console.log(shopifyResponse.theCollections.err) }
            setTheCollect({ prodid: prodid, err: shopifyResponse.theCollections.err })
        }
        catch (error) {
            console.log(error);
            alert(error);
        }
        return true
    }
    return [theCollect, doUpdateCollect] as const
}
