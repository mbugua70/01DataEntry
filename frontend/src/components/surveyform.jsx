/* eslint-disable react-refresh/only-export-components */
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ToastContainer, toast, Slide } from "react-toastify";
import { surveyForm } from "./api";
import { OfflineContext } from "../context_offline/offline_context";
import useOnlineStatus from "../custom_hook/useOffline";

const SurveyForm = () => {
  const isOnline = useOnlineStatus();
  const { addToOffline } = useContext(OfflineContext);
  const form = useForm({
    defaultValues: {
      name: "",
      location: "",
      user_id: "",
      present: "",
      phone: "",
    },
  });

  const { register, handleSubmit, reset, formState } = form;
  const { isSubmitSuccessful, isSubmitting } = formState;

  const onSubmit = async (data) => {
    if (isOnline) {
      console.log("online working");
      try {
        const response = await surveyForm(data);
        if (response) {
          const MySwal = withReactContent(Swal);
          MySwal.fire({
            html: <i>Your data have been submitted successfully!</i>,
            icon: "success",
          });
        }
      } catch (err) {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
          html: <i>{err.message}</i>,
          icon: "error",
        });
      }
    } else {
      console.log("offline working");

      // addToOffline(data);
      // toastify
      toast.info("Failed to upload to the data !", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    }
  };

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <>
      <div className="card-panel card-relative">
        <form
          className="form"
          id="form"
          method="post"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h4>Report</h4>
          <label htmlFor="name">1. Name</label>
          <input
            className="input"
            type="text"
            name="name"
            id="name"
            placeholder="Enter name of the respondent"
            {...register("name")}
          />
          <label htmlFor="phone">2. Phone</label>
          <input
            className="input"
            type="tel"
            name="phone"
            id="phone"
            placeholder="Enter phone number"
            {...register("phone")}
          />
          <label htmlFor="present">3. Gift Item</label>
          <input
            className="input"
            type="text"
            name="present"
            id="present"
            placeholder="Enter gift"
            {...register("present")}
          />
          <label htmlFor="location">4. Location</label>
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Enter the  location"
            {...register("location")}
          />
          <label htmlFor="user_id">5. ID</label>
          <input
            className="input"
            type="number"
            name="user_id"
            id="user_id"
            placeholder="Enter ID"
            {...register("user_id")}
          />

          <button className="btn-large" id="hide_icons" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                submitting{" "}
                <div
                  className="preloader-wrapper icon-submit active"
                  id="preloader_icon_three"
                >
                  <div className="spinner-layer spinner-green-only">
                    <div className="circle-clipper left">
                      <div className="circle"></div>
                    </div>
                    <div className="gap-patch">
                      <div className="circle"></div>
                    </div>
                    <div className="circle-clipper right">
                      <div className="circle"></div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                submit{" "}
                <i className="material-icons" id="buttonSubmit_icon">
                  send
                </i>
              </>
            )}
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default SurveyForm;