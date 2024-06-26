import { dateFormat } from "../helpers";

export const CONST_DISCOUNTS = ['blue-discount-collection', 'yellow-collection', 'red-collection', 'green-collection']
export const CONST_DISCOUNT_COLORS = [{ fg: '#000000', bg: '#EEEEEE' }, { fg: '#FFFFFF', bg: '#FFCC00' }, { fg: '#FFFFFF', bg: '#A63740' }, { fg: '#FFFFFF', bg: '#43B02A' }]
export const CONST_DISCOUNT_PCT = [1, 0.75, 0.5, 0.25]
export const CONST_ARCHIVE_AFTER = 4
export const CONST_NEW_ARRIVAL = 2
export const CONST_LOGO_IMAGE = 'HabiStorelogo_stacked_black.png'


export const CONST_NOTSUPPORTED_IMAGES = ['HEIC', 'MPG', 'MPEG']
export const CONST_NOTSUPPORTED_IMG = 'https://hfhtdev.blob.core.windows.net/habistorepickup/invalidphoto.jpg'
export const CONST_IMAGE_EMAIL: string = ''
export const CONST_EMAILS: any = {
  confirmation:
  {
    type: 'Confirmation',
    subject: 'Confirmation of your HabiStore donation pickup.',
    body: '<h3>Thank you for letting us handle the pickup of your donation!</h3><p>Date: {DATE}, Time: {TIME}</p><p>{NAME}</p><p>{ADDRESS}</p><p>{NOTES}</p><p>Please make sure that you have removed all personal items from your donation.</p><p>If we have to enter your home, please ensure that your items are located in an easily accessible location with a safe pathway to the exit.</p><p> All donations are subject to denial upon arrival. Acceptance is at the discretion of the driver. Check out the <a href="https://www.habitattucson.org/habistore/" target="_blank" style="background-color: rgb(255, 255, 255);"> Donation Guide</a> for more details.</p><p>If you have any questions or need to cancel or reschedule, contact our Scheduler at <a href="mailto:habistore@habitattucson.org">habistore@habitattucson.org</a> or call <a href="tel:+15202305323">(520)230-5323</a>. Please leave a voicemail and we will return your call within one business day.</p><div style="display:flex"><div style="margin-right:4px"><img width="100px" src="https://hfhtdev.blob.core.windows.net/production/ImpactImageSmall.jpg"/></div><div><p>Thank you for supporting the <a href="https://www.habitattucson.org" target="_blank" style="background-color: rgb(255, 255, 255);">Habitat for Humanity Tucson</a> mission of building strength, stability, and self-reliance through homeownership in Southern Arizona!</p><p>Like and follow us on <a href="https://www.facebook.com/HabiStoreTucson/" target="_blank" style="background-color: rgb(255, 255, 255);">Facebook</a> and <a href="https://www.instagram.com/habistoretucson/" target="_blank" style="background-color: rgb(255, 255, 255);">Instagram</a> for new updates and current inventory.</p></div></div>'
  },
  reschedule:
  {
    type: 'Reschedule',
    subject: 'Reschedule of your HabiStore donation pickup.',
    body: '<h3>Your HabiStore donation pickup has been rescheduled for...</h3><p>Date: {DATE}, Time: {TIME}</p><p>{NAME}</p><p>{ADDRESS}</p><p>{NOTES}</p><p>Please make sure that you have removed all personal items from your donation.</p><p>If we have to enter your home, please ensure that your items are located in an easily accessible location with a safe pathway to the exit.</p><p> All donations are subject to denial upon arrival. Acceptance is at the discretion of the driver. Check out the <a href="https://www.habitattucson.org/habistore/" target="_blank" style="background-color: rgb(255, 255, 255);"> Donation Guide</a> for more details.</p><p>If you have any questions or need to cancel or reschedule, contact our Scheduler at <a href="mailto:habistore@habitattucson.org">habistore@habitattucson.org</a> or call <a href="tel:+15202305323">(520)230-5323</a>. Please leave a voicemail and we will return your call within one business day.</p><p>Thank you for supporting the <a href="https://www.habitattucson.org" target="_blank" style="background-color: rgb(255, 255, 255);">Habitat for Humanity Tucson</a> mission of building strength, stability, and self-reliance through homeownership in Southern Arizona!</p><p>Like and follow us on <a href="https://www.facebook.com/HabiStoreTucson/" target="_blank" style="background-color: rgb(255, 255, 255);">Facebook</a> and <a href="https://www.instagram.com/habistoretucson/" target="_blank" style="background-color: rgb(255, 255, 255);">Instagram</a> for new updates and current inventory.</p>'
  },
  reminder:
  {
    type: 'Reminder',
    subject: 'Reminder of your HabiStore donation pickup.',
    body: '<h3>Reminder, your upcoming HabiStore pick up is scheduled for...</h3><p>Date: {DATE}, Time: {TIME}</p><p>{NAME}</p><p>{ADDRESS}</p><p>{NOTES}</p><p>Please make sure that you have removed all personal items from your donation.</p><p>If we have to enter your home, please ensure that your items are located in an easily accessible location with a safe pathway to the exit.</p><p> All donations are subject to denial upon arrival. Acceptance is at the discretion of the driver. Check out the <a href="https://www.habitattucson.org/habistore/" target="_blank" style="background-color: rgb(255, 255, 255);"> Donation Guide</a> for more details.</p><p>If you have any questions or need to cancel or reschedule, contact our Scheduler at <a href="mailto:habistore@habitattucson.org">habistore@habitattucson.org</a> or call <a href="tel:+15202305323">(520)230-5323</a>. Please leave a voicemail and we will return your call within one business day.</p><p>Thank you for supporting the <a href="https://www.habitattucson.org" target="_blank" style="background-color: rgb(255, 255, 255);">Habitat for Humanity Tucson</a> mission of building strength, stability, and self-reliance through homeownership in Southern Arizona!</p><p>Like and follow us on <a href="https://www.facebook.com/HabiStoreTucson/" target="_blank" style="background-color: rgb(255, 255, 255);">Facebook</a> and <a href="https://www.instagram.com/habistoretucson/" target="_blank" style="background-color: rgb(255, 255, 255);">Instagram</a> for new updates and current inventory.</p>'
  },
  cancel:
  {
    type: 'Cancellation',
    subject: 'Cancellation of your HabiStore donation pickup.',
    body: '<h3>Confirming the cancellation of your HabiStore pickup, previously scheduled for:</h3><p>Date: {DATE}, Time: {TIME}</p><p>{NAME}</p><p>{ADDRESS}</p><p>If you did not intend to cancel this donation, please contact our Scheduler at <a href="mailto:habistore@habitattucson.org">habistore@habitattucson.org</a> or call <a href="tel:+15202305323">(520)230-5323</a>. Please leave a voicemail and we will return your call within one business day.</p><p>Thank you for supporting the <a href="https://www.habitattucson.org" target="_blank" style="background-color: rgb(255, 255, 255);">Habitat for Humanity Tucson</a> mission of building strength, stability, and self-reliance through homeownership in Southern Arizona!</p><p>Like and follow us on <a href="https://www.facebook.com/HabiStoreTucson/" target="_blank" style="background-color: rgb(255, 255, 255);">Facebook</a> and <a href="https://www.instagram.com/habistoretucson/" target="_blank" style="background-color: rgb(255, 255, 255);">Instagram</a> for new updates and current inventory.</p>'
  },
  receipt:
  {
    type: 'Receipt',
    subject: 'HabiStore donation receipt',
    body: '<h3>Thank you for your donation to the HabiStore!</h3><p>Date: {DATE}, Time: {TIME}</p><p>{NAME}</p><p>{ADDRESS}<p>Your donation to Habitat for Humanity Tucson may be tax deductible and eligible for the Ariziona charitable tax credit. Please check this with your tax consultant.</p>These are the items that were included in your donation.</p>{LIST}<p>Thank you for supporting the <a href="https://www.habitattucson.org" target="_blank" style="background-color: rgb(255, 255, 255);">Habitat for Humanity Tucson</a> mission of building strength, stability, and self-reliance through homeownership in Southern Arizona!</p><p>Like and follow us on <a href="https://www.facebook.com/HabiStoreTucson/" target="_blank" style="background-color: rgb(255, 255, 255);">Facebook</a> and <a href="https://www.instagram.com/habistoretucson/" target="_blank" style="background-color: rgb(255, 255, 255);">Instagram</a> for new updates and current inventory.</p>{IMAGES}'
  },
  email:
  {
    type: 'Email',
    subject: 'Reminder, Habitat Tucson Veterans Night at the Gaslight Theatre',
    body: '<p>Table selection: <b>{SEAT}</b></p><p>{NAME}, thank you for your support of the Habitat for Humanity Tucson\'s Veterans Committee. The proceeds from this fundraiser will fund affordable housing for veterans in the Tucson area. </p>We look forward to seeing you at 8:30PM on March 16th, 2024 for the Gaslight Theater\'s production of "The Curse of the Pirate\'s Gold". Doors open at 8:15PM. The Gaslight theatre is located at <a href="https://maps.app.goo.gl/Kwbv6VEs2HpKcUhk8" target="_blank">7010 E Broadway, Tucson Az</a></p><p>Please bring either:<ul><li>A copy of the HabiStore receipt email or text. (print or mobile device)</li><li>or a copy of this email. (print or mobile device)</li></ul></p><p>During the show, we will be conducting two separate raffles; tickets are $5 each or five(5) for $20</p><ul><li>A 50/50 raffle, the winner receives 50% of the pot.<li>A prize raffle, prizes include: <ul><li>A glider ride for 1 adult (weight limit 242lbs) valued at $160</li><li>Necklace and Earring set valued at $160</li><li>Fully equipped tool belt valued at $150</li><li>Two sets of Earrings valued at $100</li><li>American Flag Hard Hat valued at $55</li><li>Macys $50 Gift Card</li><li>HabiStore $50 Gift Card</li><li>Trader Joe $45 Snack Bag</li><li>Trader Joe $25 Gift Card</li></ul></ul><p><img src="https://hfhtdev.blob.core.windows.net/production/webflyer_1160x_crop_center.webp" width="100px" /><img src="https://hfhtdev.blob.core.windows.net/production/Jewelry1.jpg" width="100px" /><img src="https://hfhtdev.blob.core.windows.net/production/Jewelry2.jpg" width="100px" /></p>'
  }
}

export const CONST_TYPES: any = {
  living: ['Furniture-Living'],
  dining: ['Furniture-Dining'],
  furniture: ['Furniture-Bedroom', 'Furniture-Office', 'Furniture-Patio'],
  //appliance: ['Appliance-HeatCool', 'Appliance-Household', 'Appliance-Kitchen', 'Appliance-Laundry', 'Appliance-Outdoor', 'BldgMat-Electrical'],

  appliance: ['Appliance-Kitchen'],
  bldgmat: ['Cabinets', 'Flooring', 'BldgMat-Door', 'BldgMat-Window', 'BldgMat-Tools', 'BldgMat-Plumbing'],
  household: ['Household-ArtDecor', 'Household-Sporting']
}
export const CONST_EXCEPTIONS = [
  'Appliance-HeatCool',
  'Appliance-Household',
  'Appliance-Kitchen',
  'Appliance-Laundry',
  'Appliance-Outdoor',
  'BldgMat-Electrical',
]
export const CONST_GROUPINGS = [
  'Furniture-Bedroom',
  'Furniture-Dining',
  'Furniture-Living',
  'Furniture-Office',
  'Furniture-Patio',
  'Appliance-HeatCool',
  'Appliance-Household',
  'Appliance-Kitchen',
  'Appliance-Laundry',
  'Appliance-Outdoor',
  'Cabinets',
  'BldgMat-Door',
  'BldgMat-Window',
  'BldgMat-Tools',
  'BldgMat-Electrical',
  'BldgMat-Plumbing',
  'BldgMat-Paint',
  'Household-ArtDecor',
  'Household-Sporting'
]








export const CONST_NO_EMAIL = 'none'
export const CONST_STORE_LOC1 = { lat: 32.2500024, lng: -110.987376 }
export const CONST_SHOPIFY_TAG = 'Pickup'
export const TRUCK_FUTURE_DAYS = 5;
export const CONST_REMIND_DAYS = 7;
export const CONST_RECENT_DAYS = 3;
export const CONST_DEFAULT_ROUTE = 'Unassigned';
export const CONST_CANCEL_ROUTE = 'Cancel';

export const CONST_SCHED_SLOTS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
export const CONST_SCHED_TIMES = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18']
export const CONST_BUSINESS_DAYS = [false, true, true, true, true, true, false] // Monday-Friday

export const CONST_INIT: ISched = { id: '0', name: { first: '', last: '' }, phone: '', email: '', cust: { apt: '', note: '' }, zip: '', place: { addr: '', lat: '', lng: '', zip: '' }, appt: { id: '0', slot: '', rt: '', time: '', cell: '', note: '' }, dt: dateFormat(null), items: [{ prod: '', qty: 0 }], imgs: [], src: null, calls: [] }
export const CONST_QTY_SLOTS = 18;
export const CONST_QTY_ROUTES = 5;
export const CONST_MAP_CNTL = ['Blue', 'Red', '3rd', 'Corporate']
export const CONST_SCHED_CNTL = [CONST_DEFAULT_ROUTE, 'Blue', 'Red', '3rd', 'Corporate']
export const CONST_ROUTES = [CONST_DEFAULT_ROUTE, 'Blue', 'Red', '3rd', 'Corporate', CONST_CANCEL_ROUTE]
export const CONST_ROUTE: any = {
  Unassigned: { n: CONST_DEFAULT_ROUTE, s: 'var(--color-dark-background)' },
  Blue: { n: 'Blue Route', s: 'var(--color-blue-background)' },
  Red: { n: 'Red Route', s: 'var(--color-red-background)' },
  '3rd': { n: '3rd Truck', s: 'var(--color-green-background)' },
  Corporate: { n: 'Corporate', s: 'var(--color-magenta-background)' }
}
export const CONST_ROUTE_MAX = 10

export const CONST_RT_SYTLE: any = { Red: 'var(--color-red-background)', Blue: 'var(--color-blue-background)', '3rd': 'var(--color-green-background)', Corporate: 'var(--color-magenta-background)', Unassigned: 'var(--color-dark-background)', Cancel: '' }
export const CONST_GPT_PROMPT = 'You will parse only the information provided into a list of items and quantities: {items}. Your response should be in JSON format. Here is the expected JSON format:[  {    "prod": "Item 1", "qty": "Quantity 1"  },  { "prod": "Item 2", "qty": "Quantity 2"  },  "prod": "Item 3", "qty": "Quantity 3"]'

export const routeLoadSize: any =
// Number of slots per day Sun-Sat
{
  'Blue': [0, 10, 10, 10, 10, 10, 0],
  'Red': [0, 10, 10, 10, 10, 10, 0],
  '3rd': [0, 0, 6, 6, 6, 0, 0],
  'Corporate': [0, 0, 0, 0, 0, 0, 0]
}

export const dayHours: any =
  // Will hold control for the allowed times on the schedule, Work in progress (not used!!)
  [0, 6, 6, 6, 6, 6, 0]

export const routeZips: any =
// Sun 0, Mon 1, Tue 2, Wed 3, Thu 4, Fri 5, Sat 6
{
  85614: [{ dow: 4, rt: ['Blue', 'Red'] }],
  85622: [{ dow: 4, rt: ['Blue', 'Red'] }],
  85629: [{ dow: 4, rt: ['Blue', 'Red'] }],
  85641: [{ dow: 4, rt: ['Blue', 'Red'] }],
  85653: [{ dow: 2, rt: ['Blue', 'Red'] }],
  85658: [{ dow: 2, rt: ['Blue', 'Red'] }],
  85701: [{ dow: 2, rt: ['Blue', 'Red'] }],
  85702: [{ dow: 2, rt: ['Blue', 'Red'] }],
  85704: [{ dow: 3, rt: ['Blue', 'Red'] }],
  85705: [
    { dow: 2, rt: ['Blue', 'Red', '3rd'] },
    { dow: 3, rt: ['3rd'] },
    { dow: 4, rt: ['Blue', 'Red'] },
    { dow: 5, rt: ['Blue', 'Red'] }
  ],
  85706: [{ dow: 4, rt: ['Blue', 'Red'] }],
  85707: [{ dow: 4, rt: ['Red'] }],
  85708: [{ dow: 4, rt: ['Red'] }],
  85710: [{ dow: 1, rt: ['Red'] }],
  85711: [{ dow: 1, rt: ['Blue', 'Red'] }],
  85712: [{ dow: 1, rt: ['Blue', 'Red'] }],
  85713: [{ dow: 4, rt: ['Blue', 'Red'] }],
  85714: [{ dow: 4, rt: ['Blue', 'Red'] }],
  85715: [{ dow: 1, rt: ['Red'] }],
  85716: [{ dow: 1, rt: ['Blue', 'Red'] }],
  85718: [
    { dow: 1, rt: ['Blue', 'Red'] },
    { dow: 5, rt: ['Blue', 'Red'] }
  ],
  85719: [
    { dow: 1, rt: ['Blue', 'Red'] },
    { dow: 5, rt: ['Blue', 'Red'] }
  ],
  85726: [{ dow: 4, rt: ['Blue', 'Red'] }],
  85730: [{ dow: 1, rt: ['Blue', 'Red'] }],
  85735: [{ dow: 4, rt: ['Blue', 'Red'] }],
  85736: [{ dow: 4, rt: ['Blue', 'Red'] }],
  85737: [{ dow: 3, rt: ['Blue', 'Red'] }],
  85739: [{ dow: 3, rt: ['Blue', 'Red'] }],
  85741: [
    { dow: 2, rt: ['Blue', 'Red'] },
    { dow: 3, rt: ['Blue', 'Red'] }
  ],
  85742: [{ dow: 2, rt: ['Blue', 'Red'] }],
  85743: [{ dow: 2, rt: ['Blue', 'Red'] }],
  85744: [{ dow: 4, rt: ['Blue', 'Red'] }],
  85745: [
    { dow: 2, rt: ['Blue', 'Red', '3rd'] },
    { dow: 3, rt: ['3rd'] },
    { dow: 4, rt: ['Blue', 'Red', '3rd'] }
  ],
  85746: [{ dow: 4, rt: ['Blue', 'Red'] }],
  85747: [{ dow: 4, rt: ['Blue', 'Red'] }],
  85748: [{ dow: 1, rt: ['Blue', 'Red'] }],
  85749: [{ dow: 5, rt: ['Blue', 'Red'] }],
  85750: [{ dow: 5, rt: ['Blue', 'Red'] }],
  85755: [{ dow: 3, rt: ['Blue', 'Red'] }],
  85756: [{ dow: 4, rt: ['Blue', 'Red'] }],
  85757: [{ dow: 4, rt: ['Blue', 'Red'] }],
  // Sun 0, Mon 1, Tue 2, Wed 3, Thu 4, Fri 5, Sat 6

}

const msg = {
  pickup: 'Pick up only if included as part of larger donation.',
  solid: 'Solid wood construction only. No particle board.',
  appl: 'Appliances must be 10 years old or new, in full working order, and not missing parts or pieces.',
  rip: 'This item must be free of rips, stains, tears, excessive wear and pet hair.',
  working: 'Must be in good working condition.',
  mirror: 'Must have a frame. We do not accept unframed or plate glass mirrors.'
}

export const CONST_acceptedProducts =
  [
    { i: 'Accessories', t: msg.pickup },
    { i: 'Misc', t: msg.pickup },
    { i: 'Stuff', t: msg.pickup },
    { i: 'Bathtub', t: 'Bath tubs steel or fiberglass-No Cast Iron Sinks or Bath tubs.' },
    { i: 'Tub', t: 'Bath tubs steel or fiberglass-No Cast Iron Sinks or Bath tubs.' },
    { i: 'Sink', t: 'Removal of faucet preferred. No chips, spider veins or deep scratches in finish.' },
    { i: 'Toilet', t: 'Toilet 1.6 gallon or less. ' + msg.working + ' ' + msg.pickup },
    { i: 'Bidet', t: 'Bidet 1.6 gallon or less. ' + msg.working + ' ' + msg.pickup },
    { i: 'Mirror', t: msg.mirror },
    { i: 'Organizer', t: '' },
    { i: 'Vanity', t: 'Bathroom vanities no water damage, will not take counter top without cabinet.' },
    { i: 'Bed', t: 'We do not accept Hospital or Sleep Number beds. Must be disassembled for pick up.' },
    { i: 'Bed Frame', t: 'Must be disassembled for pick up.' },
    { i: 'Chest', t: msg.solid },
    { i: 'Dresser', t: 'Mirror should be detached from dresser for pickup.' },
    { i: 'Foundation', t: 'We do not accept Hospital or Sleep Number beds. Must be disassembled for pick up.' },
    { i: 'Headboard', t: 'Must be disassembled for pick up.' },
    { i: 'Footboard', t: 'Must be disassembled for pick up.' },
    { i: 'Mattress', t: '5 yrs or younger, must have original manufacturing tags attached, No rips, stains or tears.' },
    { i: 'Mirror', t: msg.mirror },
    { i: 'Nightstand', t: msg.solid },
    { i: 'Shelving', t: msg.solid },
    { i: 'Shelves', t: msg.solid },
    { i: 'Shelf', t: msg.solid },
    { i: 'Trundle Bed', t: 'Must be disassembled for pick up.' },
    { i: 'Wardrobe', t: msg.solid },
    { i: 'Bench', t: msg.solid },
    { i: 'Buffet', t: msg.solid },
    { i: 'Cart', t: msg.solid },
    { i: 'Chest', t: msg.solid },
    { i: 'China Cabinet', t: msg.solid },
    { i: 'Corner Cabinet', t: msg.solid },
    { i: 'Table', t: msg.solid },
    { i: 'Dining Table', t: msg.solid },
    { i: 'Chair', t: msg.solid },
    { i: 'Dining Chair', t: msg.solid },
    { i: 'Liquor Cabinet', t: msg.solid },
    { i: 'Wine Rack', t: '' },
    { i: 'Accessories', t: msg.pickup },
    { i: 'Barstool', t: msg.rip },
    { i: 'Cabinet', t: 'Doors and drawers must be included.' },
    { i: 'Cooktop', t: msg.appl },
    { i: 'Countertop', t: 'Kitchen counter tops- no cut outs, straight pieces only.' },
    { i: 'Dishwasher', t: 'Dishwasher must be 5 years old or new, in full working order, and not missing parts or pieces. Must be disconnected.' },
    { i: 'Freezer', t: msg.appl },
    { i: 'Household', t: msg.appl },
    { i: 'Housewares', t: 'We accept glassware, pots, pans, art decor, figurines, etc. Pickup only as part of a larger donation.' },
    { i: 'Kitchen Chair', t: msg.rip },
    { i: 'Kitchen Table', t: msg.solid },
    { i: 'Kitchen Sink', t: 'Removal of faucet preferred. No chips, spider veins or deep scratches in finish.' },
    { i: 'Microwave', t: msg.appl },
    { i: 'Oven', t: msg.appl },
    { i: 'Range', t: msg.appl },
    { i: 'Stove', t: msg.appl },
    { i: 'Range Hood', t: msg.appl },
    { i: 'Vent', t: msg.appl },
    { i: 'Refigerator', t: msg.appl },
    { i: 'Frig', t: msg.appl },
    { i: 'Dryer', t: msg.appl + ' Must be disconnected from gas, electric and dryer vent.' },
    { i: 'Washer', t: msg.appl + ' Must be disconnected.' },
    { i: 'Washing Machine', t: msg.appl + ' Must be disconnected.' },
    { i: 'Washer/Dryer', t: msg.appl + ' Must be disconnected from gas, electric and dryer vent.' },
    { i: 'Fan', t: msg.appl },
    { i: 'Arm Chair', t: msg.rip },
    { i: 'Bean Bag', t: msg.rip },
    { i: 'Bookshelf', t: msg.solid },
    { i: 'Chair', t: msg.solid },
    { i: 'Coffee Table', t: msg.solid },
    { i: 'End Table', t: msg.solid },
    { i: 'Love Seat', t: '' },
    { i: 'Media Center', t: msg.solid },
    { i: 'Mirror', t: msg.mirror },
    { i: 'Ottoman', t: msg.rip },
    { i: 'Recliner', t: msg.rip },
    { i: 'Sectional', t: msg.rip },
    { i: 'Sleeper Sofa', t: 'In working condition. ' + msg.rip },
    { i: 'Sofa', t: msg.rip },
    { i: 'Sofa Table', t: msg.solid },
    { i: 'Storage', t: msg.solid },
    { i: 'TV', t: 'Flat screen TVs (5 yrs or younger). ' + msg.pickup },
    { i: 'Television', t: 'Flat screen TVs (5 yrs or younger). ' + msg.pickup },
    { i: 'TV Stand', t: msg.solid },
    { i: 'Bookcase', t: msg.solid },
    { i: 'Credenza', t: msg.solid },
    { i: 'Desk', t: 'Desk must be 5 X 3 or smaller. ' + msg.solid },
    { i: 'File Cabinet', t: 'Metal or ' + msg.solid },
    { i: 'Filing Cabinet', t: 'Metal or ' + msg.solid },
    { i: 'Office Chair', t: msg.rip },
    { i: 'Printer Stand', t: msg.solid },
    { i: 'Fencing', t: 'Fencing, must be a min of 10 ft, chicken wire min 25 ft.' },
    { i: 'Fence', t: 'Fencing, must be a min of 10 ft, chicken wire min 25 ft.' },
    { i: 'Hammock', t: '' },
    { i: 'Landscape', t: msg.pickup },
    { i: 'Landscaping', t: msg.pickup },
    { i: 'Yard', t: msg.pickup },
    { i: 'Outdoor Bed', t: '' },
    { i: 'Patio Bed', t: '' },
    { i: 'Outdoor End Table', t: '' },
    { i: 'Patio End Table', t: '' },
    { i: 'Outdoor Sofa', t: '' },
    { i: 'Patio Sofa', t: '' },
    { i: 'Patio Chair', t: '' },
    { i: 'Patio Table', t: '' },
    { i: 'Sunshade', t: '' },
    { i: 'Grill', t: 'Propane tanks not accepted.' + msg.appl },
    { i: 'Area rug', t: 'Finished edges must be intact with no fraying.' },
    { i: 'HVAC', t: 'Gas or electric. Must be less than 15 years old. Must be removed properly and capped.' },
    { i: 'AC', t: 'Gas or electric. Must be less than 15 years old. Must be removed properly and capped.' },
    { i: 'Air Conditioner', t: 'Gas or electric. Must be less than 15 years old. Must be removed properly and capped.' },
    { i: 'Heater', t: 'Gas or electric. Must be less than 15 years old. Must be removed properly and capped.' },
    { i: 'Blind', t: 'Must be fully functioning and include all mounting hardware and accessories. We only accept vertical blinds that are brand new, in box.' },
    { i: 'Carpet', t: 'Carpet min 100 sq ft, no padding.' },
    { i: 'Fastener', t: 'Pick up only if included as part of larger donation.' },
    { i: 'Hardware', t: 'Pick up only if included as part of larger donation.' },
    { i: 'Decking', t: 'Wood or composite. Must be in good condition with no rot, nails, or screws. Minimum of 100 sq ft for pickup.' },
    { i: 'Drywall', t: 'Full or half sheets only. No holes. Minimum of 5 full sheets for pickup.' },
    { i: 'Insulation', t: 'New only. Minimum of 4 full rolls for pickup.' },
    { i: 'Lumber', t: 'Unused lumber 8 ft or larger, no holes, no splitting or water damage.' },
    { i: 'Wood', t: 'Unused lumber 8 ft or larger, no holes, no splitting or water damage.' },
    { i: 'Plywood', t: 'Must be at least 6 feet long and free of nails, screws and holes.' },
    { i: 'Trim', t: 'Must be at least 6 feet long and free of nails, screws and holes.' },
    { i: 'Molding', t: 'Must be at least 6 feet long and free of nails, screws and holes.' },
    { i: 'Tile', t: 'Ceramic, porcelain, marble, granite. New only. Must be full pieces ready to install. Minimum of 1 full box.' },
    { i: 'Laminate', t: 'Full pieces only. Minimum of 100 sq feet for pickup.' },
    { i: 'Carpet', t: 'Full pieces only. Minimum of 100 sq feet for pickup.' },
    { i: 'Flooring', t: 'Full pieces only. Minimum of 100 sq feet for pickup.' },
    { i: 'Sporting Good', t: 'In working condition.' },
    { i: 'Exercise', t: 'In working condition.' },
    { i: 'Bike', t: 'In working condition.' },
    { i: 'Bicycle', t: 'In working condition.' },
    { i: 'Treadmill', t: 'In working condition.' },
    { i: 'Stepper', t: 'In working condition.' },
    { i: 'Houseware', t: '' },
    { i: 'Door', t: 'Must be not have any holes or deep scratches.' },
    { i: 'Sliding Glass Door', t: 'Sliding glass door w/ frame 48-72 X 80.' },
    { i: 'Sliding Door', t: 'Sliding glass door w/ frame 48-72 X 80.' },
    { i: 'Slider', t: 'Sliding glass door w/ frame 48-72 X 80.' },
    { i: 'Lamp', t: 'Must include shade if applicable.' },
    { i: 'Light', t: 'Ceiling, can lights, hanging, wall mount, and exterior lights. Must include glass or globes.' },
    { i: 'Ladder', t: 'We do not accept wooden ladders. Must be in good working condition.' },
    { i: 'Mower', t: msg.working },
    { i: 'Vacuum', t: msg.working },
    { i: 'Tool', t: msg.working },
    { i: 'Window', t: 'Windows must be double-paned, in casings, and not just sashes.' },
  ]

export const CONST_COLLECTIONS = {
  "appliances": 458029072692,
  "art-home-decor": 458559619380,
  "bathroom": 458762846516,
  "bedroom": 458559291700,
  "blue-discount-collection": 458699637044,
  "building-materials": 458029302068,
  "cabinets": 458029236532,
  "dining-room": 458559357236,
  "doors-windows": 458559979828,
  "featured-collection": 460037718324,
  "flooring": 458560045364,
  "green-collection": 457776300340,
  "heating-cooling": 458559914292,
  "furniture": 458028908852,
  "home-improvement": 458560569652,
  "frontpage": 457649455412,
  "household-appliances": 458559947060,
  "kitchen-appliances": 458559815988,
  "kitchen": 458559422772,
  "laundy-appliances": 458559881524,
  "lighting": 458029334836,
  "living-room": 458333454644,
  "newly-added-items": 457779544372,
  "office-furniture": 458559521076,
  "paint": 458560373044,
  "patio-outdoor-living": 458559652148,
  "plumbing": 458029433140,
  "priced-items": 460192481588,
  "purchased-products": 459866800436,
  "red-collection": 457779183924,
  "rugs": 458559684916,
  "sporting-goods": 458559717684,
  "yellow-tags": 459019026740,
  "tags": 459018273076,
  "tools": 458560110900,
  "featured-items": 457779642676,
  "yellow-collection": 457778987316
}

