/* eslint-disable react-refresh/only-export-components */
import {Suspense} from 'react'
import { getUserData } from "./api";
import { requireAuth } from "./utilis";
import {useLoaderData, Await, defer, Outlet} from 'react-router-dom'

// import SurveyPage from "./survey"


export async function loader ({request}) {
    await requireAuth(request)
    return defer({userData: getUserData()});
}

const SurveyLayout = () =>{

    const userDataPromise = useLoaderData();

    return(
        <>
       <Suspense fallback={<h6>Loading user data....</h6>}>
       <Await resolve={userDataPromise.userData}>
                {userData => {
                    return(
                    <Outlet context={{userData}} />

                    )
                }}
            </Await>

        </Suspense>
        </>
    )
}

export default SurveyLayout;