import {Link} from "react-router-dom"
import HomeNavBar from "./homenavbar";

const PageNotFound = () =>{
    return(
        <>
        <HomeNavBar/>
        <div className="pagenotfound">
            <span><i className="material-icons">error</i></span>
            <p>Sorry,the page you are looking for cannot be found!!</p>
            <Link to="/" className="waves-effect waves-light btn">Back to Home</Link>
        </div>

        </>

    )
}

export default PageNotFound;