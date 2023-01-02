import { Link } from "react-router-dom";

import './MainMenu.css'


export default function MainMenu(props){

    // 0A2647
    // 144272
    // 205295
    // 2C74B3

    // https://colorhunt.co/palette/0a26471442722052952c74b3

    return(
        <div className='mm'>
            <div className='header-item header-logo'>
                <span className='header-header-logo-label'>Live</span>
            </div>
                <div className='header-links'>
                    <Link className='header-link' to='/'>Home</Link>
                    <Link className='header-link' to='/calendar'>Calendar</Link>
                    <Link className='header-link' to='/streams'>Streams</Link>
                    <Link className='header-link' to='/analytic'>Analytic</Link>
                </div>


        </div>
    )
}