/// <reference types="vite/client" />

interface IControls {
    _id: string
    blocks: IBlocks[]
}
interface IBlocks {
    date: string
    routes: string[]
}
interface ISchedMonth {
    dom: string
    routes: ISched[][]
}

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
    appt: IAppt
    items: Iitem[];
    imgs: string[]
    src: null | '' | 'w' | 's' | 'o' | 'd' | 'x' // w-web, s-scheduler, d-delivery, x - block slot
    call?: string
    done?: boolean
    resched?: boolean
    note?: string
    calls: Icall[]
    remind?: boolean
    waitlist?: string
    full?: boolean
    gpsStop?: string
    fingerprint?: string
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
interface Iprod {
    prod: string;
    qty: number;
}
interface Iprods extends Array<Iprod> { }
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

interface IEdit {
    zip?: string;
    id?: string;
    src?: string;
    rt?: string;
    time?: string;
    slot?: string;
}

interface IDaily {
    _id: number;
    date: Date;
    client: IClient[];
    slots: ISlots;
}

interface IDailys extends Array<IDaily> { }

interface IClient {
    name: string;               // client info
    addr: string;
    phone: string;
    zip: string;
    note: string;               // Gate code etc.
    online: boolean;            // Scheduled by client online
    done: boolean;              // Pickup/delivery completed
    ts: Date;                   // Date & Time of pickup/delivery
}

// interface IItem {
//     prod: string;               // Item name, Bed, etc.
//     qty: number;                // Quantity of this item.
//     refused?: boolean;           // Driver refused this item
//     reason?: string              // Reason for refusal
// }
// interface IItems extends Array<IItem> { }

interface ISlot {
    r: string;                  // Route 'Blue'
    s: number;                  // Stop on the route
    c: number;                  // index into the client array
    n: 1 | 2;                   // slots taken (1 or 2)
    d: boolean;                 // Stop completed
    x: boolean;                 // Stop cancelled
}
interface ISlots extends Array<ISlot> { }

interface Itile {
    i: string;
    t: string
}
interface Itiles extends Array<Itile> { }

interface IType {
    products: Iitems
    chosen: Iprods
    hasCustom: string
    customItems: any
    customIdx: number
    setCustomItems: Function
    title?: string
    onClick: Function
}

interface ITiles {
    tiles: Iitems
    chosen?: Iprods
    hasCustom?: string
    customItems: any
    customIdx: number
    setCustomItems: Function
    onClick(e: string, i: number, t: string, b: number): Function | void
}



// old stuff below-----------------------------------------------------------
interface ICard {
    _id: any;
    classMod: string;
    invItem: string;
    catName: string;
    catSub: string;
    isSerial?: boolean;
    invBarCode: string;
    invSKUs: InvSKUs;
    invImg: string;
    invFav: boolean;
    invDesc: string;
    invType: string;
    invAccessCount: number;
    invSize: string;
    invColor: string;
    invTotal: number;
    invQtyByLoc: {
        total: number;
        byLoc: any;
    }
    invWarnLevels: {
        Yellow: number;
        Red: number;
    };
}
interface ICards extends Array<ICard> { }

interface InvSKU {
    invUPC: string;
    invMFG: string;
    invModel: string;
    invDesc: string;
    invURL: string;
    invQR: string;
    invQty: number;
    img: string;
    imgFav?: boolean;
    invSerials?: [InvSerials];
    invLocQty?: any;
};
interface InvSKUs extends Array<InvSKU> { }
interface InvSKUsIdx extends InvSKU {
    idx: number;
}

interface InvSerials {
    invSerial: string;
    invLoc: string;
    invAcquired: date;
    invDisposed: date;
    invQR: string;
}

// interface InvLocQty {
//     invLoc: string;
//     invQty: number;
// }

interface Fetch {
    data: any;
    error: object;
}

interface ISKU {
    SKU: string;
    QR: string;
    _id: string;
    idx: number;
}
interface ISKUs extends Array<ISKU> { }

interface IUPC {
    brand: string;
    categories: string;
    description: string;
    image: string;
    manufacturer: {
        company: string;
    };
    product_web_page: string;
    retun_code: number;
    return_message: string;
    thumbnail: {
        height: string;
        width: string;
        url: string;
    }
    upc_code: string;
    usage: string;
}

interface ILocation {
    Name: string;
    lat: number;
    lon: number;
    org: Orgs;
}
interface ILocations extends Array<ILocation> { }

interface Org {
    Aisle: string;
    Bay: string;
}

interface Orgs extends Array<Org> { }

interface XferHist {
    _id: number;
    item_id: number;
    skuIdx: number;
    img: string;
    from: string;
    fromQty?: number;
    to: string;
    toQty?: number;
    qty: number;
    serial?: string;
    date: string;
    by: string;
}
interface XfersHist extends Array<XferHist> { }

interface PCard {
    _id: number;
    palTitle: string;
    palQR: string;
    palDest: string;
    palBy: string;
    palUsedBy: string;
    palCreateDate: string;
    palUsedDate: string;
    palStatus: string;
    palImg: string;
    palItems: PItems;
}
interface PCards extends Array<PCard> { }

interface PItem {
    inv_id: number;
    invUPCorBarcode: string;
    invQty: number;
    invImg: string;
    invDesc: string;
    invType: string;
    invIsSerial: boolean;
    invSerials: [string];
}
interface PItems extends Array<PItem> { }

interface IPrint {
    _id: number;
    mac: string;
    job: string;
    printed: false;
    blob: string;
    fileX: string;
}

interface IPrintQueue extends Array<IPrint> { }

interface IprintJob {
    printer: "label" | "receipt";
    upc: string;
    desc: string;
}

