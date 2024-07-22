import { createContext, useReducer, useEffect, useCallback } from "react";
import Dexie from "dexie";
import useOnlineStatus from "../custom_hook/useOffline";
import { surveyForm } from "../components/api";

const db = new Dexie("MyDatabase");
db.version(1).stores({
  data: "++id, jsonData",
});

// initilizing the contextapi
export const OfflineContext = createContext({
  offlineData: [],
  addToOffline: () => {},
  removeFromOffline: () => {},
});

const dataReducer = (state, action) => {
  switch (action.type) {
    case "ADD_DATA":
      return {
        ...state,
        offlineData: [...state.offlineData, action.payload],
      };
    case "REMOVE_DATA":
      return {
        ...state,
        offlineData: state.offlineData.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, {
    offlineData: [],
  });

  // const loadData = async () => {
  //   const data = await db.data.toArray();
  //   dispatch({ type: "ADD_DATA", payload: data });
  // };
  // loadData();

  const addToOffline = async (jsonData) => {
    console.log("addOffline working");
    const id = await db.data.add({ jsonData });
    console.log(id);
    dispatch({
      type: "ADD_DATA",
      payload: { id, jsonData },
    });
  };

  const removeFromOffline = async (id) => {
    console.log("Deleting data is being called");
    await db.data.delete(id);
    dispatch({
      type: "REMOVE_DATA",
      payload: { id },
    });
  };

  return (
    <OfflineContext.Provider
      value={{
        offlineData: state.offlineData,
        addToOffline,
        removeFromOffline,
      }}
    >
      {children}
    </OfflineContext.Provider>
  );
};
