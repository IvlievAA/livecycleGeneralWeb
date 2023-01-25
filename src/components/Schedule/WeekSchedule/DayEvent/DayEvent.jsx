import './DayEvent.css'
import {useEffect, useState} from "react";

export default function DayEvent(props) {

    const [top, setTop] = useState(0);

    useEffect(() => {
        const topValue = calculateTop();
        setTop(topValue)
    }, [])


    const calculateTop = () => {


        return 200;
    }

    return (<div className='de' style={{top:top+'px',backgroundColor:'#eeee'}}>
        <div>
            <div>
                {false ? <span style={{display:'inline-block',marginRight:'10px'}}>s</span> : null}
                <p className='de-name'>Тренинг</p>
            </div>
            <p className='de-time'>11:00-21:00</p>
        </div>
    </div>)
}