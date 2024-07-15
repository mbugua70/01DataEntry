import {Link, useLocation} from "react-router-dom"

const UserHeader = () =>{

    const locaton = useLocation()
    const pathname = locaton.pathname
    return(
        <>
           <header>
      <nav>
        <div className="nav-wrapper">
          <span className="brand-logo center"> {pathname === "/registration" ? "Registration" : "Survey"}</span>
          <Link to="/" className="right home-icon" id="home-el">
            <i className="material-icons">home</i>
          </Link>
        </div>
      </nav>
    </header>
        </>
    )
}

export default UserHeader;