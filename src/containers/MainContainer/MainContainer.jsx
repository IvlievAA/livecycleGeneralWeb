import './MainContainer.css'
import {Outlet} from "react-router";
import MainMenu from "../../components/MainMenu/MainMenu";


export default function MainContainer(props){

    return(
        <div className='container-main'>
            <MainMenu/>
            <div className='container-main-body'>
                <Outlet/>
            </div>
        </div>
    )
}