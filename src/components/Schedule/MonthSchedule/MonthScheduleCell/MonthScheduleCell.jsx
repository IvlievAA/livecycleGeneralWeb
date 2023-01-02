import './MonthScheduleCell.css'


export default function MonthScheduleCell(props) {

    return (
        <td className='msc'>
            <div className='msc-body'>
                <div className='msc-day'>{props.day.dayNumber}</div>
                <div className='msc-events'>
                    {
                        props.day.events.map(evnt => (
                            <div className='msc-event'></div>
                        ))
                    }
                </div>
            </div>

        </td>
    )
}