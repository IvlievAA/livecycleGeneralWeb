
import config from '../../../app.config.json';
import './MonthSchedule.css'
import {useEffect, useState} from "react";
import MonthScheduleCell from "./MonthScheduleCell/MonthScheduleCell";
import moment from "moment";


export default function MonthSchedule(props){


    const [state,setState]=useState([])

    useEffect(()=>{
        moment.locale('ru', {
            week: {
                dow: 1
            }
        });

        const message  = JSON.stringify({
            month: props.current.month(),
            year:props.current.year()
        });
        fetch(config.backendUrl+'/schedule/month_events/',{
            method:'POST',
            cors:'no-cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'omit',
            body:message
        })
            .then(resp=>resp.json())
            .then(data =>{
                const month = createState(data.days)
                setState(month)
            })
    },[props.current])

    const createState=(resp)=>{
        const month = []
        let week= []
        const copyCurrent = moment(props.current);
        let date = copyCurrent.startOf('month').startOf('isoWeek');
        for (let i = 0; i < 42; i++) {
            week.push({
                dayNumber:date.format('DD'),
                dateMomentFormat:date.format('DD.MM.YYYY'),
                events:[]
            })
            date.add(1,'days')
            if((i+1)%7===0){
                month.push(week)
                week=[]
            }
        }

        resp.forEach(dayEvents =>{
            const dayDate = moment(dayEvents.date).format('DD.MM.YYYY')
            const dayViewInfo = month.flatMap(num=>num).find(day=>day.dateMomentFormat===dayDate);
            dayViewInfo.events = dayEvents.events;
        })

        return month;
    }

    return(
        <div className='ms'>

            <table className='ms-month'>
                <thead>
                    <th className='ms-week-day-name'>Monday</th>
                    <th className='ms-week-day-name'>Tuesday</th>
                    <th className='ms-week-day-name'>Wednesday</th>
                    <th className='ms-week-day-name'>Thursday</th>
                    <th className='ms-week-day-name'>Friday</th>
                    <th className='ms-week-day-name'>Saturday</th>
                    <th className='ms-week-day-name'>Sunday</th>
                </thead>
                <tbody>
                {
                    state.map(o=>
                        <tr>
                            {o.map(d=>(<MonthScheduleCell day={d}/>))}
                        </tr>)
                }
                </tbody>
            </table>

        </div>
    )
}