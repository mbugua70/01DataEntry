import { redirect } from "react-router-dom";


export async function requireAuth(request){
     const pathname = new URL(request.url).pathname
     const storeOne = localStorage.getItem("Auth")
     const storeTwo = JSON.parse(storeOne);
     const isLoggedIn = storeTwo === null ? false : true;
    if (!isLoggedIn) {
    //  checking if user is logged in
    // const response = redirect(`/registration?message=You must log in first!!&redirectTo=${pathname}`)
    // response.body = true  // It's silly, but it works
    // return response
     return redirect(`/registration?message=You must log in first!!&redirectTo=${pathname}`)
    }
    return null
}