import './routes.css';

import { useEffect, useState } from 'react';
import { dayOfWeek, find_id } from '../../helpers';
import { MiscIcons } from '../../icons';
import { Button, PopoverPicker, Tiles } from '../../components';
import { useExitPrompt } from '../../hooks';
export interface IRoutes {
    isOpen: boolean
    dbSettings: any[]
    mutateDB: Function
    refetchDB: Function
    toast: Function
}
export const Routes = ({ isOpen, dbSettings, mutateDB, refetchDB, toast/* dbTrack, dbSched */ }: IRoutes) => {
    // if (!isOpen) return (<></>)
    const CONST_TRUCK_OBJ = {
        "Newroute": { "pickup": { "loadsize": [0, 0, 0, 0, 0, 0, 0], "color": "#aabbcc" }, "delivery": { "loadsize": [0, 0, 0, 0, 0, 0, 0], "color": "#aabbcc" } }
    }
    const CONST_LOAD_SIZE = [0, 0, 0, 0, 0, 0, 0]
    const CONST_TRUCK_COLOR = "#aabbcc"
    const uIdx = find_id('_id', 'routes', dbSettings)
    const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false)
    const [newTruckName, setNewTruckName] = useState('')
    const [newTruckLoadsize, setNewTruckLoadsive] = useState(CONST_LOAD_SIZE)
    const [newTruckColor, setNewTruckColor] = useState(CONST_TRUCK_COLOR)
    const [newZip, setNewZip] = useState('')
    const [newZipDay, setNewZipDay] = useState('-')
    const [newZipTrucks, setNewZipTrucks] = useState<string[]>([])

    const [forceRender, setForceRender] = useState(0)

    var theRoutes: DBRoutes = dbSettings[uIdx]
    const truckTiles = Object.keys(theRoutes.trucks)
    console.log(truckTiles)
    const saveChanges = () => {
        if (!theRoutes) return
        console.log(theRoutes)
        let hasError = false
        if (newTruckName && Object.entries(theRoutes.trucks).find(([k, v]: any) => k === newTruckName)) {
            toast('Duplicate Truck Name')
            hasError = true
        }
        if (newZip && (newZip.length !== 5 || !Number(newZip))) {
            toast('Invalid Zip Code')
            hasError = true
        }
        if (newZip && (Object.entries(theRoutes.routes).find(([k, v]: any) => k === newZip))) {
            toast('Duplicate Zip Code')
            hasError = true
        }
        if (newZip && (newZipDay === '-')) {
            toast('New Zip Code, day not set')
            hasError = true
        }
        if (hasError) return
        if (newTruckName) {
            console.log(newTruckName, newTruckColor, newTruckLoadsize)
            let trucks = theRoutes.trucks
            trucks[newTruckName] = { "pickup": { "loadsize": newTruckLoadsize, "color": newTruckColor }, "delivery": { "loadsize": [0, 0, 0, 0, 0, 0, 0], "color": newTruckColor } }
            theRoutes.trucks = trucks

        }
        if (newZip) {
            console.log(newZip, newZipDay, newZipTrucks)

            let routes = theRoutes.routes
            routes[newZip] = [{ dow: newZipDay, rt: newZipTrucks }]
            theRoutes.routes = routes
        }
        console.log(theRoutes)
        setShowExitPrompt(false)
        setForceRender(forceRender + 1)
        mutateDB(theRoutes, dbSettings, false)
        cancelChanges(true)
    }
    const cancelChanges = (resetOnly = false) => {
        setShowExitPrompt(false)
        setNewTruckName('')
        setNewTruckLoadsive(CONST_LOAD_SIZE)
        setNewTruckColor(CONST_TRUCK_COLOR)
        setNewZip('')
        setNewZipDay('-')
        setNewZipTrucks([])
        if (!resetOnly) { refetchDB() }
        // if (!resetOnly) { dbSettings[uIdx] = originalRoutes }

        setForceRender(forceRender + 1)

    }
    const changeName = (which: string, rt: string, nn: string) => {
        //Can't really change the name as it ripples through all appointments, must reconsider this!
        return
        console.log(which, rt, nn, theRoutes.trucks)
        console.log(JSON.stringify(theRoutes.trucks))
        const newJSONObj = JSON.parse(JSON.stringify(theRoutes.trucks).replace(`"${rt}":`, `"${nn}":`))
        console.log(newJSONObj)
    }
    const changeColor = (which: string, rt: string, nc: string) => {
        console.log(which, rt, nc, theRoutes.trucks)
        console.log(theRoutes.trucks[rt][which].color)
        theRoutes.trucks[rt][which].color = nc
        setShowExitPrompt(true)
        setForceRender(forceRender + 1)
    }
    const changeSlot = (which: string, rt: string, dow: number, ns: string) => {
        console.log(which, rt, dow, ns, theRoutes.trucks)
        console.log(theRoutes.trucks[rt][which].loadsize[dow])
        theRoutes.trucks[rt][which].loadsize[dow] = Number(ns) ? Number(ns) : 0
        setShowExitPrompt(true)
        setForceRender(forceRender + 1)
    }
    const changeDow = (zip: string, whichDay: number, theDow: number | string) => {
        console.log(zip, whichDay, theDow)
        console.log(theRoutes.routes[zip], theRoutes.routes[zip][whichDay].dow)
        if (theDow === 'x') {
            if (!confirm(`Are you sure you want to remove ${dayOfWeek(theRoutes.routes[zip][whichDay].dow, true)} from ${zip}?`)) {
                return
            }
            theRoutes.routes[zip].splice(whichDay, 1)
        } else {
            if (theRoutes.routes[zip].find(({ dow, rt }: any) => Number(dow) === Number(theDow))) {
                toast('Duplicate Day for Zip')
                return
            }
            theRoutes.routes[zip][whichDay].dow = theDow
        }
        setShowExitPrompt(true)
        setForceRender(forceRender + 1)
    }
    const changeTruck = (zip: string, whichDay: number, chosen: string[]) => {
        console.log(zip, whichDay, chosen)
        console.log(theRoutes.routes[zip], theRoutes.routes[zip][whichDay].rt)
        theRoutes.routes[zip][whichDay].rt = chosen
        setShowExitPrompt(true)
        setForceRender(forceRender + 1)
    }
    const changeNewSlot = (v: string, i: number) => {
        let ls = newTruckLoadsize
        ls[i] = Number(v) ? Number(v) : 0
        setNewTruckLoadsive([...ls])
        setShowExitPrompt(true)
    }
    const haveNewRouteName = newTruckName !== ''
    const haveNewZip = newZip.length === 5

    const setDirection = (direction: number, i: number) => {
        console.log(direction, i)
        let theOrder = Object.entries(theRoutes.trucks)
        const theMover = theOrder.splice(i, 1)
        theOrder.splice(i + direction, 0, ...theMover)
        let newOrder = {}
        theOrder.forEach((t: any, i: number) => {
            newOrder = { ...newOrder, [t[0]]: t[1] }
        })
        theRoutes.trucks = newOrder
        console.log(theOrder)
        console.log(newOrder)
        setShowExitPrompt(true)
        setForceRender(forceRender + 1)
    }
    const handleAddDay = (i: number, e: any) => {
        console.log(i, e)
        console.log(theRoutes.routes[e])
        theRoutes.routes[e].push({ dow: '-', rt: [] })
        setShowExitPrompt(true)
        setForceRender(forceRender + 1)
    }
    useEffect(() => {
        console.log('Routes-useEffect', theRoutes, dbSettings)
    }, [])

    return (
        <>
            {!isOpen ? <div> </div> :

                <div className='routemain'>
                    <h2>Routes</h2>
                    <div className='routemaingrid'>
                        <div>
                            <p>Routes Pickup</p>
                            <div className='routegrid'>
                                <div>Route</div><div>Order</div><div>Color</div><div>Sunday</div><div>Monday</div><div>Tuesday</div><div>Wednesday</div><div>Thursday</div><div>Friday</div><div>Saturday</div>
                            </div>
                            {theRoutes && Object.entries(theRoutes.trucks).map(([k, v]: any, i: number) => (
                                <div key={i} className='routegrid'>
                                    <EditInput field={k} disabled={true} setField={(newName: string) => changeName('pickup', k, newName)} />
                                    <Reorder field={k} idx={i} length={Object.entries(theRoutes.trucks).length} setDirection={(direction: number) => setDirection(direction, i)} />
                                    <div><PopoverPicker color={v.pickup.color} onChange={(newColor: string) => changeColor('pickup', k, newColor)} /></div>
                                    {v.pickup.loadsize.map((ls: string, j: number) => (
                                        <input key={`${i}${j}`} className='inputsmall' disabled={false} type={'text'} value={ls} title={'Slot'} onChange={(e: any) => changeSlot('pickup', k, j, e.target.value)} />
                                    ))}
                                </div>
                            ))}
                            <div className='routegrid'>
                                <input className='inputsmall' disabled={false} type={'text'} value={newTruckName} placeholder='New route...' title={'Route'} onChange={(e: any) => { setNewTruckName(e.target.value); setShowExitPrompt(true) }} />
                                <div></div>
                                <div>{haveNewRouteName && <PopoverPicker color={newTruckColor} onChange={(newColor: string) => { setNewTruckColor(newColor); setShowExitPrompt(true) }} />}</div>
                                {haveNewRouteName && <>
                                    {newTruckLoadsize.map((ls: number, j: number) => (
                                        <input key={`a${j}`} className='inputsmall' disabled={false} type={'text'} value={ls} title={'Slot'} onChange={(e: any) => changeNewSlot(e.target.value, j)} />
                                    ))}
                                </>}
                            </div>
                            <p>Routes Delivery</p>
                            {theRoutes && Object.entries(theRoutes.trucks).map(([k, v]: any, i: number) => (
                                <div key={i} className='routegrid'>
                                    <EditInput field={k} disabled={true} />
                                    <div></div>
                                    <div><PopoverPicker color={v.delivery.color} onChange={(newColor: string) => changeColor('delivery', k, newColor)} /></div>
                                    {v.delivery.loadsize.map((ls: string, j: number) => (
                                        <input key={`${i}${j}`} className='inputsmall' disabled={false} type={'text'} value={ls} title={'Slot'} onChange={(e: any) => changeSlot('delivery', k, j, e.target.value)} />
                                    ))}
                                </div>
                            ))}
                            <div className='routebtns'>
                                <Button disabled={!showExitPrompt} onClick={() => saveChanges()}>&nbsp;&nbsp;&nbsp;Save&nbsp;&nbsp;&nbsp;</Button>
                                <Button disabled={!showExitPrompt} onClick={() => cancelChanges(false)}>Cancel</Button>
                            </div>
                        </div>

                        <div className='routezipscroll'>
                            <p>Zips</p>
                            <div className='routezipmain'>
                                <div className='routezipgrid'>
                                    <input className='inputsmall' disabled={false} type={'text'} value={newZip} placeholder='New zip...' title={'New Zip'} onChange={(e: any) => { setNewZip(e.target.value); setShowExitPrompt(true) }} />

                                    {/* <EditInput field={''} edit={true} handleAddDay={(e: any) => console.log(e)} handleDelete={(e: any) => console.log(e)} /> */}
                                    {haveNewZip && <div>
                                        <div className='routedaygrid'>
                                            <select value={newZipDay} onChange={(e: any) => setNewZipDay(e.target.value)} title={'Zip day of week'}>
                                                <option value='-'>-</option>
                                                <option value='0'>Sunday</option><option value='1'>Monday</option><option value='2'>Tuesday</option><option value='3'>Wednesday</option><option value='4'>Thursday</option><option value='5'>Friday</option><option value='6'>Saturday</option>
                                            </select>
                                            <Tiles tiles={truckTiles} colors={[]} chosen={newZipTrucks} title={''} onClick={(name: string, id: number, chosen: string[]) => setNewZipTrucks([...chosen])} />
                                        </div>
                                    </div>
                                    }
                                </div>
                                {theRoutes && Object.entries(theRoutes.routes).map(([k, v]: any, i: number) => (
                                    <div key={i} className='routezipgrid'>
                                        <EditInput field={k} handleAddDay={(e: any) => handleAddDay(i, e)} handleDelete={(e: any) => console.log(e)} />
                                        <div>
                                            {v.map((rt: any, j: number) => (
                                                <div key={`${i}${j}`} className='routedaygrid'>
                                                    <select value={rt.dow} onChange={(e: any) => changeDow(k, j, e.target.value)} title={'title'}>
                                                        {rt.dow === '-' && <option value='-'>-</option>}
                                                        {(v.length > 1) && <option value='x'>-Remove!</option>}
                                                        <option value='0'>Sunday</option><option value='1'>Monday</option><option value='2'>Tuesday</option><option value='3'>Wednesday</option><option value='4'>Thursday</option><option value='5'>Friday</option><option value='6'>Saturday</option>
                                                    </select>
                                                    <Tiles tiles={truckTiles} colors={[]} chosen={rt.rt} title={''} onClick={(name: string, id: number, chosen: string[]) => changeTruck(k, j, chosen)} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
function EditInput({ field, disabled = false, setField, handleAddDay, handleDelete, edit = false }: any) {
    const [editMode, setEditMode] = useState(edit)
    const [theField, setTheField] = useState(field)
    const handleSave = () => {
        setEditMode(false)
        console.log('save')
        setField(theField)
    }
    // useEffect(() => {
    //     setTheField(field)
    // }, [])

    return (
        <>
            {editMode ?
                <div className='editinput'>
                    <input size={6} className='inputsmall' type={'text'} value={theField} title={'Field'} onChange={(e: any) => setTheField(e.target.value)} />
                    {!disabled && <span title='save' onClick={() => handleSave()}> {MiscIcons('save')}</span>}
                    {!disabled && <span title='close' onClick={() => { setEditMode(false); setTheField(field) }}> {MiscIcons('close')}</span>}
                </div>
                :
                <div className='editinput'>
                    {field}
                    {!disabled && <span title='edit' onClick={() => setEditMode(true)}> {MiscIcons('edit')}</span>}
                    {handleAddDay && <span title='Add Day' onClick={() => handleAddDay(field)}> {MiscIcons('circleplus')}</span>}
                    {handleDelete && <span title='Delete Zip' onClick={() => handleDelete(field)}> {MiscIcons('trash')}</span>}

                </div>
            }
        </>
    )
}
function Reorder({ field, idx, length, setDirection }: any) {
    return (
        <div className='editinput'>
            <span title='up' onClick={() => setDirection(-1)}> {idx === 0 ? MiscIcons('empty') : MiscIcons('up')}</span>
            <span title='down' onClick={() => setDirection(1)}> {idx === length - 1 ? MiscIcons('empty') : MiscIcons('down')}</span>
        </div>
    )
}
function RouteMap() {
    function handleImageClick(e: any) {
        console.log(`X: ${e.pageX - e.target.offsetLeft}, Y: ${e.pageY - e.target.offsetTop}`, e)
    }
    return (
        <>
            <div className='routeoverlay'>
                <img src={`${import.meta.env.VITE_STORAGEIMAGEURL}${'tucson-zip.jpg'}`} className='routemap' alt="Tucson Zip Code Map" useMap="#workmap" onClick={(e) => handleImageClick(e)} />
                <div className='route-pin' style={{ left: '20px', top: '40px' }}>
                    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 16 16" focusable="false" fill="blue">
                        <path fillRule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.3 1.3 0 0 0-.37.265.3.3 0 0 0-.057.09V14l.002.008.016.033a.6.6 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.6.6 0 0 0 .146-.15l.015-.033L12 14v-.004a.3.3 0 0 0-.057-.09 1.3 1.3 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465s-2.462-.172-3.34-.465c-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411" />
                    </svg>
                </div>
                <map name="workmap">
                    <area shape="rect" coords="100,142,135,154" alt="85653" onClick={() => { console.log('85653') }} />
                    <area shape="poly" coords="1,350, 191,345, 191,337,  207,339, 207,381, 146, 381, 145,372, 133,373, 132,398, 1,401 " alt="85634" onClick={() => { console.log('85634') }} />
                </map>

            </div>
        </>
    )
}