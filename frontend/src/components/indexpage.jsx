import { NavLink } from "react-router-dom";
import HomeNavBar from "./homenavbar";
import Dexie from "dexie";
import { OfflineContext } from "../context_offline/offline_context";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect, useCallback, useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import useOnlineStatus from "../custom_hook/useOffline";
import { surveyForm } from "./api";

const db = new Dexie("MyDatabase");
db.version(1).stores({
  data: "++id, jsonData",
});

const IndexPage = () => {
  const customId = "custom-id-yes";
  const [itemLength, setItemLength] = useState(0);
  const isOnline = useOnlineStatus();
  const { offlineData, removeFromOffline } = useContext(OfflineContext);

  useEffect(() => {
    console.log(offlineData.length);
    setItemLength(offlineData.length);
  }, [offlineData]);

  console.log("test rendering");

  useEffect(() => {
    const syncData = async () => {
      console.log(`isOnline: ${isOnline}`);
      if (isOnline) {
        if (offlineData.length === 0) {
          console.log("No offline data to sync.");
          return;
        } else {
          try {
            for (const item of offlineData) {
              console.log("Uploading stored data:", item);
              const response = await surveyForm(item.jsonData);

              if (response.reports) {
                console.log("Data uploaded successfully:", item.id);
                removeFromOffline(item.id);
              } else {
                console.error("Failed to upload data:", item.id);
              }
            }
          } catch (error) {
            console.error("Error syncing data:", error);
          }
        }
      } else {
        console.log("Sync offline");
      }
    };

    syncData();

    const handleOnline = () => syncData();
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, [isOnline, removeFromOffline]);

  const handleOfflineData = async () => {
    console.log("Offline button Clicked");
    if (offlineData.length === 0) {
      toast.info("No record was found !", {
        toastId: customId,
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
      return;
    } else {
      console.log(`isOnline: ${isOnline}`);
      if (isOnline) {
        try {
          for (const item of offlineData) {
            console.log("Uploading stored data:", item);
            const response = await surveyForm(item.jsonData);

            if (response.reports) {
              console.log("Data uploaded successfully:", item.id);
              removeFromOffline(item.id);
            } else {
              console.error("Failed to upload data:", item.id);
            }
          }
        } catch (error) {
          console.error("Error syncing data:", error);
        }
      } else {
        console.log("Sync offline");
      }
    }
  };

  return (
    <>
      {/* navbar below */}
      <HomeNavBar />
      {/* index content */}
      <div className="container">
        <div className="firstnav">
          <NavLink
            onClick={handleOfflineData}
            to="#"
            className="item-link-offline col l12 center valign-wrapper waves-effect"
          >
            <span className="nav-style">OFFLINE - {itemLength ?? 0}</span>
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
        <ToastContainer />
      </div>
      {/* <Outlet /> */}
    </>
  );
};

export default IndexPage;
