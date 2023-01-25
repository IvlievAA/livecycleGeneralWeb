import './MainContainer.css'
import {Outlet} from "react-router";
import MainMenu from "../../components/MainMenu/MainMenu";


export default function MainContainer(props){

    return(
        <div className='container-main'>
            {/*<MainMenu/>*/}
            <div style={{
                display:'inline-block',
                height:'100%',
                width:'3%',
                backgroundColor:'#0A2647'
            }}></div>
            <div className='container-main-body'>
                <Outlet/>
            </div>
        </div>
    )
}