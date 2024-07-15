import {NavLink, Outlet} from "react-router-dom";
import HomeNavBar from "./homenavbar";

const  IndexPage = () =>{

    return(
        <>
          {/* navbar below */}
      <HomeNavBar/>
          {/* index content */}

      <div className="container">
      <div className="firstnav">
        <NavLink
          to="/registration"
          className="item-link col l12 center valign-wrapper waves-effect firstchild"
          ><span className="nav-style">REGISTRATION</span></NavLink>

        <NavLink
          to="survey"
          className="item-link col l12 center valign-wrapper waves-effect"
          ><span className="nav-style">REPORT</span></NavLink>

      </div>
    </div>
      <Outlet/>
        </>
    )
}

export default IndexPage;