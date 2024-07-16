import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

// fetching single event
export async function fetchUser({ userId, signal }) {
  const response = await fetch(
    `http://localhost:4040/api/v1/ba/register/${userId}`,
    {
      signal,
    }
  );

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the user");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { user } = await response.json();

  return user;
}

// updating fun
export async function updateUser({ userId, data }) {
  const response = await fetch(
    `http://localhost:4040/api/v1/ba/register/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify({ data }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const error = new Error("An error occurred while updating the user");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}
