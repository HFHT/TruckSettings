import './routes.css';

import { useEffect, useState } from 'react';
import { find_id, find_row } from '../../helpers';
import { MiscIcons } from '../../icons';
import { PopoverPicker, Tiles } from '../../components';
import { CONST_MAP_CNTL } from '../../constants';
export interface IRoutes {
    isOpen: boolean
    dbSettings: []
    mutateDB: Function
}
export const Routes = ({ isOpen, dbSettings, mutateDB/* dbTrack, dbSched */ }: IRoutes) => {
    if (!isOpen) return (<></>)
    const uIdx = find_id('_id', 'routes', dbSettings)
    const [chosen, setChosen] = useState<string[]>([])
    const [color, setColor] = useState("#aabbcc")
    const [theRoutes, setTheRoutes] = useState<DBRoutes>(dbSettings[uIdx])
    Object.entries(theRoutes.trucks).map(([k, v], i) => console.log(k, v, i))
    return (
        <div className='routemain'>
            <h2>Routes</h2>
            <div className='routemaingrid'>
                <div>
                    <p>Routes Pickup</p>
                    <div className='routegrid'>
                        <div>Route</div>
                        <div>Order</div>
                        <div>Color</div>
                        <div>Sunday</div>
                        <div>Monday</div>
                        <div>Tuesday</div>
                        <div>Wednesday</div>
                        <div>Thursday</div>
                        <div>Friday</div>
                        <div>Saturday</div>
                    </div>
                    {Object.entries(theRoutes.trucks).map(([k, v]: any, i: number) => (
                        <div key={i} className='routegrid'>
                            <EditInput field={k} />
                            <Reorder field={k} idx={i} length={Object.entries(theRoutes.trucks).length} />
                            <div><PopoverPicker color={v.pickup.color} onChange={setColor} /></div>
                            {v.pickup.loadsize.map((ls: string, j: number) => (
                                <input key={`${i}${j}`} className='inputsmall' disabled={false} type={'number'} value={ls} title={'Slot'} onChange={(e: any) => console.log(e)} />
                            ))}
                        </div>
                    ))}
                    <div className='routegrid'>
                        <input className='inputsmall' disabled={false} type={'text'} value={''} placeholder='New route...' title={'Route'} onChange={(e: any) => console.log(e)} />
                        <div></div>
                        <div><PopoverPicker color={'#808080'} onChange={setColor} /></div>
                        <input className='inputsmall' disabled={false} type={'number'} value={0} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={0} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={0} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={0} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={0} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={0} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={0} title={'Slots'} onChange={(e: any) => console.log(e)} />
                    </div>
                    <p>Routes Delivery</p>
                    {Object.entries(theRoutes.trucks).map(([k, v]: any, i: number) => (
                        <div key={i} className='routegrid'>
                            <EditInput field={k} />
                            <div></div>
                            <div><PopoverPicker color={v.delivery.color} onChange={setColor} /></div>
                            {v.delivery.loadsize.map((ls: string, j: number) => (
                                <input key={`${i}${j}`} className='inputsmall' disabled={false} type={'number'} value={ls} title={'Slot'} onChange={(e: any) => console.log(e)} />
                            ))}
                        </div>
                    ))}
                </div>

                <div className='routezipscroll'>
                    <p>Zips</p>
                    <div className='routezipmain'>
                        <div className='routezipgrid'>
                            <EditInput field={''} edit={true} handleAddDay={(e: any) => console.log(e)} handleDelete={(e: any) => console.log(e)} />
                            <div>
                                <div className='routedaygrid'>
                                    <select value={'-'} onChange={(e: any) => console.log(e.target.value)} title={'title'}>
                                        <option value='-'>-</option>
                                        <option value='0'>Sunday</option>
                                        <option value='1'>Monday</option>
                                        <option value='2'>Tuesday</option>
                                        <option value='3'>Wednesday</option>
                                        <option value='4'>Thursday</option>
                                        <option value='5'>Friday</option>
                                        <option value='6'>Saturday</option>
                                    </select>
                                    <Tiles tiles={CONST_MAP_CNTL} colors={[]} chosen={[]} title={''} onClick={(name: string, id: number, chosen: string[]) => setChosen([...chosen])} />
                                </div>
                            </div>
                        </div>
                        {Object.entries(theRoutes.routes).map(([k, v]: any, i: number) => (

                            <div key={i} className='routezipgrid'>
                                <EditInput field={k} handleAddDay={(e: any) => console.log(e)} handleDelete={(e: any) => console.log(e)} />
                                <div>
                                    {v.map((rt: any, j: number) => (
                                        <div key={`${i}${j}`} className='routedaygrid'>
                                            <select value={rt.dow} onChange={(e: any) => console.log(e.target.value)} title={'title'}>
                                                <option value='0'>Sunday</option>
                                                <option value='1'>Monday</option>
                                                <option value='2'>Tuesday</option>
                                                <option value='3'>Wednesday</option>
                                                <option value='4'>Thursday</option>
                                                <option value='5'>Friday</option>
                                                <option value='6'>Saturday</option>
                                            </select>
                                            <Tiles tiles={CONST_MAP_CNTL} colors={[]} chosen={rt.rt} title={''} onClick={(name: string, id: number, chosen: string[]) => setChosen([...chosen])} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
function EditInput({ field, setField, handleAddDay, handleDelete, edit = false }: any) {
    const [editMode, setEditMode] = useState(edit)
    const handleSave = () => {
        setEditMode(false)
        console.log('save')
    }
    return (
        <>
            {editMode ?
                <div className='editinput'>
                    <input size={6} className='inputsmall' type={'text'} value={field} title={'Field'} onChange={(e: any) => console.log(e)} />
                    <span title='save' onClick={() => handleSave()}> {MiscIcons('save')}</span>
                    <span title='close' onClick={() => setEditMode(false)}> {MiscIcons('close')}</span>
                </div>
                :
                <div className='editinput'>
                    {field}
                    <span title='edit' onClick={() => setEditMode(true)}> {MiscIcons('edit')}</span>
                    {handleAddDay && <span title='Add Day' onClick={() => handleAddDay(field)}> {MiscIcons('circleplus')}</span>}
                    {handleDelete && <span title='Delete Zip' onClick={() => handleDelete(field)}> {MiscIcons('trash')}</span>}

                </div>
            }
        </>
    )
}
function Reorder({ field, idx, length }: any) {
    return (
        <div className='editinput'>
            <span title='up' onClick={() => console.log('up')}> {idx === 0 ? MiscIcons('empty') : MiscIcons('up')}</span>
            <span title='down' onClick={() => console.log('down')}> {idx === length - 1 ? MiscIcons('empty') : MiscIcons('down')}</span>
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