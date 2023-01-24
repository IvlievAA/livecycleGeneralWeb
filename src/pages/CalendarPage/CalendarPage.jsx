import './CalendarPage.css'
import {useCallback, useEffect, useRef, useState} from "react";
import MonthSchedule from "../../components/Schedule/MonthSchedule/MonthSchedule";
import WeekSchedule from "../../components/Schedule/WeekSchedule/WeekSchedule";
import moment from "moment";

export default function CalendarPage(props) {

    const calendarMode = {
        TABLE: 'TABLE',
        COlUMS: 'COLUMNS'
    }

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]


    const [mode, setMode] = useState(calendarMode.TABLE)
    const [currentPoint, setCurrentPoint] = useState(moment())
    const [changeValue, setChangeValue] = useState({
        value: 0,
        mode: calendarMode.TABLE
    })

    const [streams, setStreams] = useState([
        {
            label: 'All',
            key: 'all',
            selected: true
        },
        {
            label: 'TestStream',
            key: 'testStream',
            selected: false
        }
    ])

    const [currentDate, setCurrentDate] = useState({
        month: '',
        year: ''
    });


    useEffect(() => {
        setCurrentDate({
            month: months[currentPoint.month()],
            year: currentPoint.year()
        })
    }, [])

    useEffect(() => {
        const current = getNow()
        setCurrentPoint(current);
        setCurrentDate({
            month: months[current.month()],
            year: current.year()
        })
    }, [changeValue])


    const clickByStreamTab = (stream) => {
        const tmp = [...streams];
        const item = tmp.filter(o => o.key === stream.key)
        if (!item.selected) {
            tmp.filter(o => o.selected).forEach(o => o.selected = false)
            tmp.filter(o => o.key === stream.key).forEach(o => o.selected = true)

            setStreams(tmp)
        }
    }

    const changeMode = (newMode) => {
        moment.locale('ru', {
            week: {
                dow: 1
            }
        });
        setCurrentPoint(moment())
        setChangeValue({
            value: 0,
            mode:newMode
        })
        if (mode !== newMode) {
            setMode(newMode)
        }
    }

    const addMonth = () => {
        setChangeValue({...changeValue, value: changeValue.value + 1})
    }

    const subMonth = () => {
        setChangeValue({...changeValue, value: changeValue.value - 1})
    }

    const getNow = () => {
        let obj = moment();
        if (changeValue.value !== 0) {
            if (changeValue.mode === calendarMode.TABLE) {
                return obj.add(changeValue.value, 'month')
            } else {
                return obj.add(changeValue.value, 'week').startOf('isoWeek')
            }
        } else {
            return obj;
        }
    }


    const getDayForWeek = (mode) => {
        if (mode === 'begin') {
            return currentPoint.startOf('week').format('D')+ ' '+ months[currentPoint.startOf('week').month()]
        } else {
            return currentPoint.endOf('week').format('D') + ' '+ months[currentPoint.endOf('week').month()]
        }
    }

    const addWeek = ()=>{
        setChangeValue({...changeValue,value: changeValue.value+1})
    }

    const subWeek = ()=>{
        setChangeValue({...changeValue,value: changeValue.value-1})
    }

    return (<div className='cp'>
        <div className='cp-current-settings'>
            {mode === calendarMode.TABLE ?
                <div>
                    <p className='cp-current-item'>{currentDate.month}</p>
                    <p className='cp-current-item cp-current-year'>{currentDate.year}</p>
                    <div className='cp-current-item'>
                        <svg className='cp-current-switch' xmlns="http://www.w3.org/2000/svg" id="Outline"
                             viewBox="0 0 24 24" width="512"
                             height="512"
                             onClick={subMonth}
                        >
                            <path
                                d="M17.17,24a1,1,0,0,1-.71-.29L8.29,15.54a5,5,0,0,1,0-7.08L16.46.29a1,1,0,1,1,1.42,1.42L9.71,9.88a3,3,0,0,0,0,4.24l8.17,8.17a1,1,0,0,1,0,1.42A1,1,0,0,1,17.17,24Z"/>
                        </svg>
                        <svg className='cp-current-switch' xmlns="http://www.w3.org/2000/svg" id="Outline"
                             viewBox="0 0 24 24" width="512"
                             height="512"
                             onClick={addMonth}
                        >
                            <path
                                d="M7,24a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42l8.17-8.17a3,3,0,0,0,0-4.24L6.29,1.71A1,1,0,0,1,7.71.29l8.17,8.17a5,5,0,0,1,0,7.08L7.71,23.71A1,1,0,0,1,7,24Z"/>
                        </svg>
                    </div>
                </div> :
                <div>
                    <div>
                        <div className='cp-current-item'>
                            <div style={{margin: 0}} className='cp-current-inside-item'>{getDayForWeek('begin')}</div>
                            <span className='cp-current-inside-item'>-</span>
                            <div className='cp-current-inside-item'>{getDayForWeek('end')}</div>
                        </div>
                        <p className='cp-current-inside-item'>{currentPoint.endOf('week').year()}</p>

                        <div style={{marginLeft: '6px'}} className='cp-current-item'>
                            <svg className='cp-current-switch' xmlns="http://www.w3.org/2000/svg" id="Outline"
                                 viewBox="0 0 24 24" width="512"
                                 height="512"
                                 onClick={subWeek}
                            >
                                <path
                                    d="M17.17,24a1,1,0,0,1-.71-.29L8.29,15.54a5,5,0,0,1,0-7.08L16.46.29a1,1,0,1,1,1.42,1.42L9.71,9.88a3,3,0,0,0,0,4.24l8.17,8.17a1,1,0,0,1,0,1.42A1,1,0,0,1,17.17,24Z"/>
                            </svg>
                            <svg className='cp-current-switch' xmlns="http://www.w3.org/2000/svg" id="Outline"
                                 viewBox="0 0 24 24" width="512"
                                 height="512"
                                 onClick={addWeek}
                            >
                                <path
                                    d="M7,24a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42l8.17-8.17a3,3,0,0,0,0-4.24L6.29,1.71A1,1,0,0,1,7.71.29l8.17,8.17a5,5,0,0,1,0,7.08L7.71,23.71A1,1,0,0,1,7,24Z"/>
                            </svg>
                        </div>
                    </div>
                </div>}
            <div className='cp-streams'>
                <div style={{display: 'inline-block'}}>
                    {
                        streams.map(stream => (
                            <div
                                onClick={(e) => {
                                    clickByStreamTab(stream)
                                }}
                                className={stream.selected ? 'cp-stream-item cp-stream-item-selected' : 'cp-stream-item'}>
                                {stream.label}
                            </div>))
                    }
                </div>

                <div className='cp-modes'>
                    <svg
                        onClick={() => {
                            changeMode(calendarMode.TABLE)
                        }}
                        className={mode === calendarMode.TABLE ? 'cp-mode cp-mode-active' : 'cp-mode cp-mode-no-active'}
                        xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512">
                        <path
                            d="M7,0H4A4,4,0,0,0,0,4V7a4,4,0,0,0,4,4H7a4,4,0,0,0,4-4V4A4,4,0,0,0,7,0ZM9,7A2,2,0,0,1,7,9H4A2,2,0,0,1,2,7V4A2,2,0,0,1,4,2H7A2,2,0,0,1,9,4Z"/>
                        <path
                            d="M20,0H17a4,4,0,0,0-4,4V7a4,4,0,0,0,4,4h3a4,4,0,0,0,4-4V4A4,4,0,0,0,20,0Zm2,7a2,2,0,0,1-2,2H17a2,2,0,0,1-2-2V4a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2Z"/>
                        <path
                            d="M7,13H4a4,4,0,0,0-4,4v3a4,4,0,0,0,4,4H7a4,4,0,0,0,4-4V17A4,4,0,0,0,7,13Zm2,7a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V17a2,2,0,0,1,2-2H7a2,2,0,0,1,2,2Z"/>
                        <path
                            d="M20,13H17a4,4,0,0,0-4,4v3a4,4,0,0,0,4,4h3a4,4,0,0,0,4-4V17A4,4,0,0,0,20,13Zm2,7a2,2,0,0,1-2,2H17a2,2,0,0,1-2-2V17a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2Z"/>
                    </svg>
                    <svg
                        onClick={() => {
                            changeMode(calendarMode.COlUMS)
                        }}
                        className={mode === calendarMode.COlUMS ? 'cp-mode cp-mode-active' : 'cp-mode cp-mode-no-active'}
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512">
                        <g id="_01_align_center" data-name="01 align center">
                            <path d="M13,2V9H2V3A1,1,0,0,1,3,2H13m2-2H3A3,3,0,0,0,0,3v8H15V0Z"/>
                            <path d="M21,2a1,1,0,0,1,1,1V9H19V2h2m0-2H17V11h7V3a3,3,0,0,0-3-3Z"/>
                            <path d="M5,15v7H3a1,1,0,0,1-1-1V15H5m2-2H0v8a3,3,0,0,0,3,3H7V13Z"/>
                            <path d="M22,15v6a1,1,0,0,1-1,1H11V15H22m2-2H9V24H21a3,3,0,0,0,3-3V13Z"/>
                        </g>
                    </svg>

                </div>
            </div>
        </div>
        <div className={mode === calendarMode.TABLE ? 'cp-month-background cp-schedule' : 'cp-schedule'}>
            {mode === calendarMode.TABLE ? <MonthSchedule mothYearProps={currentDate} current={currentPoint}/> :
                <WeekSchedule current={currentPoint}/>}
        </div>
    </div>)
}