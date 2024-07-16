import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchUser, updateUser } from "../util/http.js";
import { useOutletContext } from "react-router-dom";

import EventForm from "./EventForm.jsx";
import Modal from "../UI/Modal.jsx";
import LoadingIndicator from "../UI/Loadingindicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
  const navigate = useNavigate();

  const { userData } = useOutletContext();

  const userId = userData.userId;
  console.log(userId);
  const { data, isError, isPending, error } = useQuery({
    queryKey: ["events", userId],
    queryFn: (signal) => fetchUser(userData, signal),
  });

  const { mutate } = useMutation({
    mutationFn: updateUser,
    // onMutate will be exercuted instantly right before you get back a response from the updating function
    //  it will be called immediately once the mutate function is called.
    onMutate: async (data) => {
      // cancelQueries will only cancel queries triggered by useQuery and not mutation

      // setQueryData takes two arguement
      // 1. its the key of the event you  want to edit.
      // 2. the second arguement is the new data
      const newEventData = data.event;
      await queryClient.cancelQueries({ queryKey: ["events", paramsId.id] });
      // the use of getQueryData to get the data
      // takes the queryKey as its parameter
      // it gets the previousOld data
      const previousData = queryClient.getQueryData(["events", paramsId.id]);
      queryClient.setQueryData(["events", paramsId.id], newEventData);

      // inorder for the previousData to be part of the context we should return it
      return { previousData };
    },
    //  has callback fun as its property
    // the callBack fun has three parameter
    // 1. error
    // 2. newData
    // 3. context method
    onError: (errror, data, context) => {
      queryClient.setQueryData(["events", paramsId.id], context.previousData);
    },
    // always refetch after error or success
    onSettled: () => {
      queryClient.invalidateQueries(["events", paramsId.id]);
    },
  });

  function handleSubmit(formData) {
    mutate({ id: paramsId.id, event: formData });
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
    console.log(data);
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
