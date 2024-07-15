import {Outlet} from "react-router-dom"
import UserHeader from "./userheader";



const Layout = () =>{
    return(
       <>
       <UserHeader/>
       <Outlet/>
       </>
    )
}

export default Layout;