import './routes.css';

import { useState } from 'react';
import { find_id } from '../../helpers';
import { MiscIcons } from '../../icons';
import { Tiles } from '../../components';
import { CONST_MAP_CNTL } from '../../constants';
export interface IRoutes {
    isOpen: boolean
    dbSettings: []
    mutateDB: Function
}
export const Routes = ({ isOpen, dbSettings, mutateDB/* dbTrack, dbSched */ }: IRoutes) => {
    if (!isOpen) return (<></>)
    const [chosen, setChosen] = useState<string[]>([])

    return (
        <div className='routemain'>
            <h2>Routes</h2>
            <div className='routemaingrid'>
                <div>
                    <p>Routes Pickup</p>
                    <div className='routegrid'>
                        <div>Route</div>
                        <div>Sunday</div>
                        <div>Monday</div>
                        <div>Tuesday</div>
                        <div>Wednesday</div>
                        <div>Thursday</div>
                        <div>Friday</div>
                        <div>Saturday</div>
                    </div>
                    <div className='routegrid'>
                        <div>Blue</div>
                        <input className='inputsmall' disabled={false} type={'number'} value={0} title={'Sunday Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={10} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={10} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={10} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={10} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={10} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={0} title={'Slots'} onChange={(e: any) => console.log(e)} />
                    </div>
                    <div className='routegrid'>
                        <div>Red</div>
                        <input className='inputsmall' disabled={false} type={'number'} value={0} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={10} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={10} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={10} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={10} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={10} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={0} title={'Slots'} onChange={(e: any) => console.log(e)} />
                    </div>
                    <div className='routegrid'>
                        <input className='inputsmall' disabled={false} type={'text'} value={''} placeholder='New route...' title={'Route'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={0} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={0} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={0} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={0} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={0} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={0} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={0} title={'Slots'} onChange={(e: any) => console.log(e)} />
                    </div>
                    <p>Routes Delivery</p>
                    <div className='routegrid'>
                        <div>Blue</div>
                        <input className='inputsmall' disabled={false} type={'number'} value={0} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={4} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={4} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={4} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={4} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={4} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={0} title={'Slots'} onChange={(e: any) => console.log(e)} />
                    </div>
                    <div className='routegrid'>
                        <div>Red</div>
                        <input className='inputsmall' disabled={false} type={'number'} value={0} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={4} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={4} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={4} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={4} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={4} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={0} title={'Slots'} onChange={(e: any) => console.log(e)} />
                    </div>
                    <div className='routegrid'>
                        <input className='inputsmall' disabled={false} type={'text'} value={''} placeholder='New route...' title={'Route'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={0} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={0} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={0} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={0} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={0} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={0} title={'Slots'} onChange={(e: any) => console.log(e)} />
                        <input className='inputsmall' disabled={false} type={'number'} value={0} title={'Slots'} onChange={(e: any) => console.log(e)} />
                    </div>
                </div>

                <div>
                    <p>Zips</p>
                    <div className='routezipmain'>
                        <div className='routezipgrid'>
                            <div title='Add Day'>85614 {MiscIcons('circleplus')}</div>
                            <div className=''>
                                <div className='routedaygrid'>
                                    <select value={0} onChange={(e: any) => console.log(e.target.value)} title={'title'}>
                                        <option value='0'>Sunday</option>
                                        <option value='1'>Monday</option>
                                        <option value='2'>Tuesday</option>
                                        <option value='3'>Wednesday</option>
                                        <option value='4'>Thursday</option>
                                        <option value='5'>Friday</option>
                                        <option value='6'>Saturday</option>
                                    </select>
                                    <Tiles tiles={CONST_MAP_CNTL} chosen={chosen} title={''} onClick={(name: string, id: number, chosen: string[]) => setChosen([...chosen])} />
                                </div>
                            </div>
                        </div>
                        <div className='routezipgrid'>
                            <div title='Add Day'>85622 {MiscIcons('circleplus')}</div>
                            <div className=''>
                                <div className='routedaygrid'>
                                    <select value={0} onChange={(e: any) => console.log(e.target.value)} title={'title'}>
                                        <option value='0'>Sunday</option>
                                        <option value='1'>Monday</option>
                                        <option value='2'>Tuesday</option>
                                        <option value='3'>Wednesday</option>
                                        <option value='4'>Thursday</option>
                                        <option value='5'>Friday</option>
                                        <option value='6'>Saturday</option>
                                    </select>
                                    <Tiles tiles={CONST_MAP_CNTL} chosen={chosen} title={''} onClick={(name: string, id: number, chosen: string[]) => setChosen([...chosen])} />
                                </div>

                            </div>
                        </div>
                        <div className='routezipgrid'>
                            <div title='Add Day'>85629 {MiscIcons('circleplus')}</div>
                            <div className=''>
                                <div className='routedaygrid'>
                                    <select value={0} onChange={(e: any) => console.log(e.target.value)} title={'title'}>
                                        <option value='0'>Sunday</option>
                                        <option value='1'>Monday</option>
                                        <option value='2'>Tuesday</option>
                                        <option value='3'>Wednesday</option>
                                        <option value='4'>Thursday</option>
                                        <option value='5'>Friday</option>
                                        <option value='6'>Saturday</option>
                                    </select>
                                    <Tiles tiles={CONST_MAP_CNTL} chosen={chosen} title={''} onClick={(name: string, id: number, chosen: string[]) => setChosen([...chosen])} />
                                </div>
                            </div>
                        </div>
                        <div className='routezipgrid'>
                            <div title='Add Day'>85641 {MiscIcons('circleplus')}</div>
                            <div className=''>
                                <div className='routedaygrid'>
                                    <select value={0} onChange={(e: any) => console.log(e.target.value)} title={'title'}>
                                        <option value='0'>Sunday</option>
                                        <option value='1'>Monday</option>
                                        <option value='2'>Tuesday</option>
                                        <option value='3'>Wednesday</option>
                                        <option value='4'>Thursday</option>
                                        <option value='5'>Friday</option>
                                        <option value='6'>Saturday</option>
                                    </select>
                                    <Tiles tiles={CONST_MAP_CNTL} chosen={chosen} title={''} onClick={(name: string, id: number, chosen: string[]) => setChosen([...chosen])} />
                                </div>
                            </div>
                        </div>
                        <div className='routezipgrid'>
                            <div title='Add Day'>85705 {MiscIcons('circleplus')}</div>
                            <div className=''>
                                <div className='routedaygrid'>
                                    <select value={0} onChange={(e: any) => console.log(e.target.value)} title={'title'}>
                                        <option value='1'>Monday</option>
                                        <option value='2'>Tuesday</option>
                                        <option value='3'>Wednesday</option>
                                        <option value='4'>Thursday</option>
                                        <option value='5'>Friday</option>
                                        <option value='6'>Saturday</option>
                                    </select>
                                    <Tiles tiles={CONST_MAP_CNTL} chosen={chosen} title={''} onClick={(name: string, id: number, chosen: string[]) => setChosen([...chosen])} />
                                </div>
                                <div className='routedaygrid'>
                                    <select value={0} onChange={(e: any) => console.log(e.target.value)} title={'title'}>
                                        <option value='1'>Monday</option>
                                        <option value='2'>Tuesday</option>
                                        <option value='3'>Wednesday</option>
                                        <option value='4'>Thursday</option>
                                        <option value='5'>Friday</option>
                                        <option value='6'>Saturday</option>
                                    </select>
                                    <Tiles tiles={CONST_MAP_CNTL} chosen={chosen} title={''} onClick={(name: string, id: number, chosen: string[]) => setChosen([...chosen])} />
                                </div>
                                <div className='routedaygrid'>
                                    <select value={0} onChange={(e: any) => console.log(e.target.value)} title={'title'}>
                                        <option value='1'>Monday</option>
                                        <option value='2'>Tuesday</option>
                                        <option value='3'>Wednesday</option>
                                        <option value='4'>Thursday</option>
                                        <option value='5'>Friday</option>
                                        <option value='6'>Saturday</option>
                                    </select>
                                    <Tiles tiles={CONST_MAP_CNTL} chosen={chosen} title={''} onClick={(name: string, id: number, chosen: string[]) => setChosen([...chosen])} />
                                </div>
                                <div className='routedaygrid'>
                                    <select value={0} onChange={(e: any) => console.log(e.target.value)} title={'title'}>
                                        <option value='1'>Monday</option>
                                        <option value='2'>Tuesday</option>
                                        <option value='3'>Wednesday</option>
                                        <option value='4'>Thursday</option>
                                        <option value='5'>Friday</option>
                                        <option value='6'>Saturday</option>
                                    </select>
                                    <Tiles tiles={CONST_MAP_CNTL} chosen={chosen} title={''} onClick={(name: string, id: number, chosen: string[]) => setChosen([...chosen])} />
                                </div>
                            </div>
                        </div>
                        <div className='routezipgrid'>
                            <div title='Add Day'>85706 {MiscIcons('circleplus')}</div>
                            <div className=''>
                                <div className='routedaygrid'>
                                    <select value={0} onChange={(e: any) => console.log(e.target.value)} title={'title'}>
                                        <option value='0'>Sunday</option>
                                        <option value='1'>Monday</option>
                                        <option value='2'>Tuesday</option>
                                        <option value='3'>Wednesday</option>
                                        <option value='4'>Thursday</option>
                                        <option value='5'>Friday</option>
                                        <option value='6'>Saturday</option>
                                    </select>
                                    <Tiles tiles={CONST_MAP_CNTL} chosen={chosen} title={''} onClick={(name: string, id: number, chosen: string[]) => setChosen([...chosen])} />
                                </div>
                            </div>
                        </div>
                        <div className='routezipgrid'>
                            <div title='Add Day'>85707 {MiscIcons('circleplus')}</div>
                            <div className=''>
                                <div className='routedaygrid'>
                                    <select value={0} onChange={(e: any) => console.log(e.target.value)} title={'title'}>
                                        <option value='0'>Sunday</option>
                                        <option value='1'>Monday</option>
                                        <option value='2'>Tuesday</option>
                                        <option value='3'>Wednesday</option>
                                        <option value='4'>Thursday</option>
                                        <option value='5'>Friday</option>
                                        <option value='6'>Saturday</option>
                                    </select>
                                    <Tiles tiles={CONST_MAP_CNTL} chosen={chosen} title={''} onClick={(name: string, id: number, chosen: string[]) => setChosen([...chosen])} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

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