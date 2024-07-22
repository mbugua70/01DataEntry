import { useState, useEffect } from "react";

const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const checkOnlineStatus = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts/1",
          {
            method: "HEAD",
            cache: "no-store",
          }
        );
        setIsOnline(response.ok);
      } catch (error) {
        setIsOnline(false);
      }
    };

    const updateOnlineStatus = () => {
      if (navigator.onLine) {
        checkOnlineStatus();
      } else {
        setIsOnline(false);
      }
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    // Initial check
    updateOnlineStatus();

    // Cleanup listeners on component unmount
    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  return isOnline;
};

export default useOnlineStatus;
