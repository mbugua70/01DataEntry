import { NavLink, Outlet } from "react-router-dom";
import HomeNavBar from "./homenavbar";
import Dexie from "dexie";
import { OfflineContext } from "../context_offline/offline_context";
import { useContext, useEffect, useCallback } from "react";
import useOnlineStatus from "../custom_hook/useOffline";
import { surveyForm } from "./api";

const db = new Dexie("MyDatabase");
db.version(1).stores({
  data: "++id, jsonData",
});

const IndexPage = () => {
  const isOnline = useOnlineStatus();
  const { offlineData, removeFromOffline } = useContext(OfflineContext);

  const syncData = useCallback(async () => {
    console.log("SyncData function called");

    if (isOnline) {
      console.log("Sync online");

      // Process each offline data item
      for (const item of offlineData) {
        // Prepare batched data

        try {
          for (const sendData of item) {
            const response = await surveyForm(sendData.jsonData);
            console.log(response);
          }
          // Remove from offline context and database
          for (const eachItem of item) {
            console.log(eachItem.id);
            removeFromOffline(eachItem.id);
            console.log("Offline data deleted");
            await db.data.delete(eachItem.id);
          }
        } catch (error) {
          console.error("Error syncing data:", error);
        }
      }
    } else {
      console.log("Sync offline");
    }
  }, [isOnline, offlineData, removeFromOffline]);

  useEffect(() => {
    // Sync data when online status changes
    syncData();

    const handleOnline = () => syncData();
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, [syncData]);

  return (
    <>
      {/* navbar below */}
      <HomeNavBar />
      {/* index content */}

      <div className="container">
        <div className="firstnav">
          <NavLink
            to="#"
            className="item-link col l12 center valign-wrapper waves-effect"
          >
            <span className="nav-style">OFFLINE </span>
          </NavLink>
          <NavLink
            to="/registration"
            className="item-link col l12 center valign-wrapper waves-effect firstchild"
          >
            <span className="nav-style">REGISTRATION</span>
          </NavLink>
          <NavLink
            to="survey"
            className="item-link col l12 center valign-wrapper waves-effect"
          >
            <span className="nav-style">REPORT</span>
          </NavLink>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default IndexPage;
