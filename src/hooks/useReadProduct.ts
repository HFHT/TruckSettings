import { useState } from "react";

export interface IuseReadProduct {
    theProduct: IShopifyReturn
    doReadProduct: Function
    doReset: Function
}
export interface IdoRead {
    type?:string | undefined
    vendor?: string | undefined
    status?: string
}
export function useReadProduct() {
    const [theProduct, setTheProduct] = useState<IShopifyReturn | undefined>({} as IShopifyReturn)

    const headers = new Headers();
    var url = `${import.meta.env.VITE_AZURE_FUNC_URL}/api/HFHTShopify`;

    const doReset = () => {
        setTheProduct(undefined)
    }
    const doReadProduct = async ({type, vendor, status='active'}:IdoRead) => {
        console.log('useReadProduct', prompt)

        let body:any = {
            method: 'getAllProds',
            collections: '',
            product: '',
            status: status,
        }
        type && (body.type = type)
        vendor && (body.vendor = vendor)

        let options = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        };
        try {
            const response = await fetch(url, options);
            console.log(response);
            if (!response.ok) throw `Shopify Product failed with ${response.status}: ${response.statusText}`
            const shopifyResponse = (await response.json());
            console.log(shopifyResponse);
            if (shopifyResponse.theList.err) alert(shopifyResponse.theList.err)
            setTheProduct(shopifyResponse)
        }
        catch (error) {
            console.log(error);
            alert(error);
        }
    }
    return [theProduct, doReadProduct, doReset] as const;
}
