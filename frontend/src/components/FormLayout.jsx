import { Outlet, useRouteLoaderData } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import SurveyPage from "./survey";

export default function FormLayout() {
  const { userData } = useOutletContext();
  return (
    <>
      <SurveyPage />
      <Outlet context={{ userData }} />
    </>
  );
}
