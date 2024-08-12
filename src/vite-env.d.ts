/// <reference types="vite/client" />

interface IShopifyReturn {
    theList: {
        data: IShopifyProd[]
    }
    theProduct: {
        data: any
    }
    theCollections: {
        data: IShopifyCollect[]
    }
}
interface IShopifyProd {
    id: string                              // Common properties of products and collections
    created_at: string
    updated_at: string
    image: string
    handle: string                          // Unique to products
    product_type: string
    status: 'active' | 'archived' | 'draft'
    vendor: string
    variants: IShopifyVariant[]

    product_id: string                      // Unique to list of products in a collection
    colleciton_id: string
}
interface IShopifyVariant {
    id: string
    barcode: string
    created_at: string
    updated_at: string
    compare_at_price: string
    inventory_item_id: string
    inventory_quantity: number
    old_inventory_quantity: number
    price: string
}
interface IShopifyCollect {
    id: string
    product_id: string
    created_at: string
    updated_at: string
}
//Schedule Database 
interface Idb extends Array<IScheds> { }
interface IScheds {
    _id: string
    c: [ISched]
}
interface ISched {
    id: string
    dt: string
    idx?: number
    name: IName
    phone: string
    zip: string
    place: IPlace
    email: string
    cust: ICustInfo
    addr?: string
    appt: IAppt
    apptDt?: string
    items: Iitem[];
    imgs: string[]
    src: null | '' | 'w' | 's' | 'o' | 'd' | 'x' // w-web, s-scheduler, d-delivery, x - block slot
    call?: string
    done?: boolean
    resched?: boolean
    cancel?: string
    note?: string
    calls: Icall[]
    remind?: boolean
    waitlist?: string
    full?: boolean
    gpsStop?: string
    fingerprint?: string
    by?: string
}
interface IName {
    first: string
    last: string
    company?: string | undefined | null
}
interface Iitem {
    prod: string;
    qty: number | string;
    c?: boolean;
}
interface ICustInfo {
    apt: string
    note: string
}
interface IAppt {
    id: string;
    // apt: string;
    note: string;
    // email: string;
    slot: string;
    rt: string;
    time: string;
    cell: string;
    full?: boolean;
}
interface Icall {
    dt: string;
    note: string;
}
interface IPlace {
    addr?: string;
    lat?: string | number;
    lng?: string | number;
    zip?: string;
    num?: string
    route?: string
    city?: string
    state?: string
    c_cd?: string
    c_nm?: string
}

//Donor Database
interface IDonor {
    _id: string
    addr: IPlace
    apt: string
    dt: string
    email: string
    name: IName
    nt: string
}
type KioskFormType = {
    _id: number | string
    first_name: string
    last_name: string
    email: string
    phone: string
    note: string
    addresses: KioskAddressType[]
    shopifyId: string
    date: string
    newsletter: boolean
    emailReceipt: boolean
    list: any[]
}
type KioskAddressType = {
    address1: string
    address2: string
    city: string
    province: string
    company: string
    zip: string
}
//Vists Tracking Database
interface IVisits {
    _id: string
    sessions: ISessions[]
    browser: IBrowser
}
interface ISessions {
    dt: string
    phone: string
    step: number | string
    zip: string
}
interface IBrowser {
    ua: string
    browser: {
        name: string
        major: string
        version: string
    }
    cpu: {
        architecture: string | undefined
    }
    device: {
        model: string | undefined
        type: string | undefined
        vendor: string | undefined
    }
    engine: {
        name: string
        version: string
    }
    os: {
        name: string
        version: string
    }
}

//Settings Database
interface DBHolidays {
    _id: 'Holidays'
    dates: IHoliday[]
}
interface IHoliday {
    date: string
    title: string
}
interface DBUsers {
    _id: 'Users'
    pins: IPin[]
}
interface IPin {
    pin: string
    person: string
}
interface DBAdmins {
    _id: 'Admins'
    admins: IAdmin[]
}
interface IAdmin {
    id: string
    permissions: string[]
}
interface DBEmail {
    _id: 'email'
    templates: ITemplate[]
}
interface DBRoutes {
    _id: 'routes'
    trucks: any,
    routes: any,
    online: any
}
interface ITemplate {
    confirmation: IEmailType
    reschedule: IEmailType
    reminder: IEmailType
    cancel: IEmailType
    receipt: IEmailType
}
interface IEmailType {
    type: string
    subject: string
    body: string
}