import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchUser, updateUser, queryClient } from "../util/http.js";
import { useOutletContext } from "react-router-dom";

import EventForm from "./EventForm.jsx";
import Modal from "../UI/Modal.jsx";
import LoadingIndicator from "../UI/Loadingindicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
  const navigate = useNavigate();

  const { userData } = useOutletContext();

  const userId = userData.userId;

  const { data, isError, isPending, error } = useQuery({
    queryKey: ["user", userId],
    queryFn: (signal) => fetchUser(userData, signal),
  });

  const { mutate } = useMutation({
    mutationFn: updateUser,
    // onMutate will be exercuted instantly right before you get back a response from the updating function
    //  it will be called immediately once the mutate function is called.
    onMutate: async (data) => {
      const newEventData = data.user;

      await queryClient.cancelQueries({
        queryKey: ["user", userData.userId],
      });
      // the use of getQueryData to get the data
      // takes the queryKey as its parameter
      // it gets the previousOld data
      const previousData = queryClient.getQueryData(["user", userData.userId]);
      queryClient.setQueryData(["user", userData.userId], newEventData);

      // inorder for the previousData to be part of the context we should return it
      return { previousData };
    },
    //  has callback fun as its property
    // the callBack fun has three parameter
    // 1. error
    // 2. newData
    // 3. context method
    onError: (error, data, context) => {
      console.error("Error in mutation:", error);
      queryClient.setQueryData(["user", userData.userId], context.previousData);
    },
    // always refetch after error or success
    onSettled: () => {
      console.log("Mutation settled with data:", data);
      queryClient.invalidateQueries(["user", userData.userId]);
    },
  });

  function handleSubmit(formData) {
    mutate({ id: userData.userId, user: formData });
    navigate("../");
  }

  function handleClose() {
    navigate("../");
  }

  let content;

  if (isPending) {

    content = (
      <div className="center">
        <LoadingIndicator />
      </div>
    );
  }

  if (isError) {
    console.log("Error client working");
    console.log(isError);
    console.log(error);
    content = (
      <>
        <ErrorBlock
          title="Failed to load event"
          message={error.info?.message || "Failed to load the event "}
        />
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
  // return <h1>Edit Me</h1>;
}
