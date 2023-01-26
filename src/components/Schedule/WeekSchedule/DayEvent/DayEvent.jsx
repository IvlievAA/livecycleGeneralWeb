import './DayEvent.css'
import {useEffect, useState} from "react";

export default function DayEvent(props) {


    const beginTimeToPixels = (time) => {
        const hours = parseInt(time.substring(0, 2));
        const minute = parseInt(time.substring(3, 5));

        let sum = hours * 60 + minute + hours - 1;

        return sum;
    }

    const getHeight = (begin, end) => {
        const beginHours = parseInt(begin.substring(0, 2));
        const beginMinute = parseInt(begin.substring(3, 5));

        let endHours = parseInt(end.substring(0, 2));
        const endMinute = parseInt(end.substring(3, 5));


        const beginValue = beginHours * 60 + beginMinute;
        const endValue = endHours * 60 + endMinute;

        let result;

        if (beginHours > endHours) {
            result = 24 * 60 - beginValue;
        } else {
            result = endValue - beginValue;
        }
        return result;
    }

    return (<div className='de' style={{
        top: beginTimeToPixels(props.event.begin) + 'px',
        backgroundColor: props.event.stream.customColor,
        height: getHeight(props.event.begin, props.event.end)
    }}>
        <div className='de-content'>
            <div>
                {props.event.important ?
                    <svg
                        className='de-important'
                        xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode"
                         viewBox="0 0 24 24" width="512"
                         height="512">
                        <path
                            d="M16.514,4.213c-1.122-.953-2.282-1.937-3.446-3.1L12,.048,10.941,1.114a14.411,14.411,0,0,0-3.317,6.1c-.015-.052-.029-.1-.043-.157L6.947,4.6,5.1,6.334C3.245,8.073,1.531,10.154,1.53,13.58A10.376,10.376,0,0,0,9.3,23.711a10.984,10.984,0,0,0,2.69.337A10.464,10.464,0,0,0,22.47,13.582C22.47,9.27,19.709,6.926,16.514,4.213Zm.069,15.261c-.109.084-.225.154-.337.232a4.584,4.584,0,0,0,.35-1.753c0-2.539-2.3-3.552-4.6-5.85-2.507,2.507-4.6,3.311-4.6,5.85A4.574,4.574,0,0,0,7.8,19.8,7.469,7.469,0,0,1,4.536,13.58a5.463,5.463,0,0,1,1.137-3.449c.109.172.224.338.346.5a2.253,2.253,0,0,0,2.32.854A2.314,2.314,0,0,0,10.1,9.7a15.809,15.809,0,0,1,2.043-5.316c.844.776,1.67,1.477,2.426,2.12,3.218,2.731,4.9,4.287,4.9,7.078A7.423,7.423,0,0,1,16.583,19.474Z"/>
                    </svg> : null}
                <p className='de-name'>{props.event.eventName}</p>
            </div>
            <p className='de-time'>{props.event.begin.substring(0, 5) + ' - ' + props.event.end.substring(0, 5)}</p>
        </div>
    </div>)
}