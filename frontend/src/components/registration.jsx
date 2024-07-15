
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */

// import React from "react"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {  Form,redirect,  useActionData, useNavigation, useLoaderData } from "react-router-dom";

import { loginUser } from "./api";



console.log(Navigator)

export const loginloader = ({request}) =>{
return new URL(request.url).searchParams.get("message")
}

export const action = async ({ request }) => {
  console.log("testing the action");
  const formData = await request.formData();
  const ba_name = formData.get("ba_name");
  const ba_phone = formData.get("ba_phone");
  const ba_location = formData.get("ba_location");
  if (!ba_location || !ba_name || !ba_phone) {
    return "Please fill all the required fields";
  }
  const formdata = new FormData();
  formdata.append("ba_name", ba_name);
  formdata.append("ba_location", ba_location);
  formdata.append("ba_phone", ba_phone);
  console.log(formdata.get("ba_name"));
  // const pathname = new URL(request.url).searchParams.get("redirectTo") || "/survey"
  try {
    const ba_name = formdata.get("ba_name");
    const ba_phone = formdata.get("ba_phone");
    const ba_location = formdata.get("ba_location");
    const workout = { ba_name, ba_phone, ba_location };
    const data = await loginUser(workout);
    if (data) {
      const loginData = JSON.stringify(data);
      localStorage.setItem("Auth", loginData);
      setTimeout(() => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
          html: <i>You have registered successfully!</i>,
          icon: "success",
        });
      }, 2000);
    }

    // console.log(pathname)
    // const response = redirect(pathname)
    // response.body = true
    // console.log(pathname)
    return redirect("/survey");
  } catch (err) {
    console.error("err", err.syntaxError);
    console.log(err.message);
    return err.message;
  }
};

const RegistrationPage = () => {
  const loginLoaderMessage = useLoaderData();
  console.log(loginLoaderMessage);

  const navigation = useNavigation();
  console.log(navigation);

  const errorMessage = useActionData();
  console.log(errorMessage);

  const storeBa = localStorage.getItem("Auth");
  const storeBaTwo = JSON.parse(storeBa);

  return (
    <>
      <div className="container">
        <div className="card-panel card-relative">
          <div className="parentError">
            <span>
              {" "}
              {loginLoaderMessage === null ? (
                ""
              ) : (
                <i className="material-icons">error</i>
              )}
            </span>
            <p className="login_errmessage">
              {loginLoaderMessage && !errorMessage && loginLoaderMessage}
              {errorMessage && errorMessage}
            </p>
          </div>
          <Form className="form" method="post" replace>
            <label htmlFor="ba_name">Name</label>
            <input
              type="text"
              name="ba_name"
              id="ba_name"
              placeholder="Enter name"
              defaultValue={storeBaTwo === null ? "" : storeBaTwo.user.ba_name}
            />
            <label htmlFor="ba_phone">Phone Numbers</label>
            <input
              type="tel"
              name="ba_phone"
              id="ba_phone"
              placeholder="Tel e.g 0728**"
              defaultValue={storeBaTwo === null ? "" : storeBaTwo.user.ba_phone}
            />
            <label htmlFor="ba_location">Location</label>
            <input
              type="text"
              name="ba_location"
              id="ba_location"
              placeholder="Enter location"
              defaultValue={
                storeBaTwo === null ? "" : storeBaTwo.user.ba_location
              }
            />

            <span className="flex_button">
              <button
                className="btn waves-effect color_change"
                disabled={navigation.state === "submitting"}
              >
                {navigation.state === "submitting" ? "registering" : "Register"}
              </button>
            </span>
          </Form>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;