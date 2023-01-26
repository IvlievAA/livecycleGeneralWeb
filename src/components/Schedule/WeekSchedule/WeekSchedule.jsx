import './WeekSchedule.css'
import {useEffect, useState} from "react";
import moment from "moment";
import DayEvent from "./DayEvent/DayEvent";
import config from "../../../app.config.json";

export default function WeekSchedule(props) {


    const [dates, setDates] = useState([])
    const [dayEvents, setDayEvents] = useState([])
    const [state, setState] = useState([])

    const getMass = () => {
        const arr = []
        let subArr = []
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 24; j++) {
                subArr.push({isBlock: true})
            }
            arr.push(subArr)
            subArr = []
        }
        return arr;
    }

    const arr = getMass();

    const weeklyDayNames = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ]


    useEffect(() => {
        moment.locale('ru', {
            week: {
                dow: 1
            }
        });
        setNumbersWeekDays(moment(props.current))
        requestEvents()
    }, [props.current])

    const requestEvents = () => {
        const resultState = getMass();
        const day = moment(props.current).startOf('week');
        const arrDayEvents = []
        const begin = day.toISOString()
        for (let i = 0; i < 7; i++) {
            arrDayEvents.push({
                date: day.toISOString().substring(0, 18),
                events: []
            })
            day.add(1, 'day')
        }
        const end = day.toISOString()
        const body = JSON.stringify({
            begin,
            end
        })
        fetch(config.backendUrl + '/schedule/weekly_events', {
            method: 'POST',
            cors: 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'omit',
            body
        })
            .then(response => response.json())
            .then(message => {
                message.days.forEach(day => {
                    const dayIndex = arrDayEvents.findIndex(localDay => localDay.date === day.date.substring(0, 18))
                    arrDayEvents[dayIndex].events = day.events
                })
                const result = mapEvents(resultState,arrDayEvents);
                setState(result)
            })
    }

    const mapEvents = (prepare,events) => {
        for (let i = 0; i < 7; i++) {
            if(events[i].events.length !==0){
                events[i].events.reduce(o=> o.isBlock=false)
            }
        }

        for (let i = 0; i < 7; i++) {
            if(events[i].events){
                prepare[i].push(...events[i].events)
            }
        }
        return prepare;
    }


    const setNumbersWeekDays = (now) => {
        let begin = now.startOf('isoWeek')
        const days = [];
        for (let i = 0; i < 7; i++) {
            days.push({
                dayNumber: begin.format('DD'),
                dayName: weeklyDayNames[i]
            })
            begin.add(1, 'day')
        }
        setDates(days)
    }

    return (<div className='ws-container'>
            <div className='ws-container-weekly-days'>
                {
                    dates.map(day => (
                        <div
                            className='ws-weekly-day-name'>
                            <div className='ws-weekly-day'>
                                <h1 className='ws-weekly-day-number'>{day.dayNumber}</h1>
                                <p className='ws-weekly-day-name-day'>{day.dayName}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='ws'>
                <div className='ws-hours-menu'>
                    <div className='ws-hour-label'>
                        <p className='ws-hour-value'>00:00</p>
                    </div>
                    <div className='ws-hour-label'>
                        <p className='ws-hour-value'>01:00</p>
                    </div>
                    <div className='ws-hour-label'>
                        <p className='ws-hour-value'>02:00</p>
                    </div>
                    <div className='ws-hour-label'>
                        <p className='ws-hour-value'>03:00</p>
                    </div>
                    <div className='ws-hour-label'>
                        <p className='ws-hour-value'>04:00</p>
                    </div>
                    <div className='ws-hour-label'>
                        <p className='ws-hour-value'>05:00</p>
                    </div>
                    <div className='ws-hour-label'>
                        <p className='ws-hour-value'>06:00</p>
                    </div>
                    <div className='ws-hour-label'>
                        <p className='ws-hour-value'>07:00</p>
                    </div>
                    <div className='ws-hour-label'>
                        <p className='ws-hour-value'>08:00</p>
                    </div>
                    <div className='ws-hour-label'>
                        <p className='ws-hour-value'>09:00</p>
                    </div>
                    <div className='ws-hour-label'>
                        <p className='ws-hour-value'>10:00</p>
                    </div>
                    <div className='ws-hour-label'>
                        <p className='ws-hour-value'>11:00</p>
                    </div>
                    <div className='ws-hour-label'>
                        <p className='ws-hour-value'>12:00</p>
                    </div>
                    <div className='ws-hour-label'>
                        <p className='ws-hour-value'>13:00</p>
                    </div>
                    <div className='ws-hour-label'>
                        <p className='ws-hour-value'>14:00</p>
                    </div>
                    <div className='ws-hour-label'>
                        <p className='ws-hour-value'>15:00</p>
                    </div>
                    <div className='ws-hour-label'>
                        <p className='ws-hour-value'>16:00</p>
                    </div>
                    <div className='ws-hour-label'>
                        <p className='ws-hour-value'>17:00</p>
                    </div>
                    <div className='ws-hour-label'>
                        <p className='ws-hour-value'>18:00</p>
                    </div>
                    <div className='ws-hour-label'>
                        <p className='ws-hour-value'>19:00</p>
                    </div>
                    <div className='ws-hour-label'>
                        <p className='ws-hour-value'>20:00</p>
                    </div>
                    <div className='ws-hour-label'>
                        <p className='ws-hour-value'>21:00</p>
                    </div>
                    <div className='ws-hour-label'>
                        <p className='ws-hour-value'>22:00</p>
                    </div>
                    <div className='ws-hour-label'>
                        <p className='ws-hour-value'>23:00</p>
                    </div>

                </div>
                {
                    state.length !==0 ?state.map( d => (<div className='ws-day'>
                        {
                            d.map(h=> (h.isBlock?<div className='ws-hour'></div>:<DayEvent event={h}/>))
                        }
                    </div>)):'asas'
                }
            </div>
        </div>

    )
}