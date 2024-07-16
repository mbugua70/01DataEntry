import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function EventForm({ inputData, onSubmit, children }) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    onSubmit({ ...data });
  }

  return (
    <form id="event-form" onSubmit={handleSubmit}>
      <label htmlFor="ba_name">Name</label>
      <input
        type="text"
        name="ba_name"
        id="ba_name"
        placeholder="Enter name"
        defaultValue={inputData?.ba_name ?? ""}
      />

      <label htmlFor="ba_phone">Phone Numbers</label>
      <input
        type="tel"
        name="ba_phone"
        id="ba_phone"
        placeholder="Tel e.g 0728**"
        defaultValue={inputData?.ba_phone ?? ""}
      />

      <label htmlFor="ba_location">Location</label>
      <input
        type="text"
        name="ba_location"
        id="ba_location"
        placeholder="Enter location"
        defaultValue={inputData?.ba_location ?? ""}
      />

      <p className="form-actions">{children}</p>
    </form>
  );
}
