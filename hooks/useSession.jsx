// hydrateSession.js
import { setUser } from "@/redux/features/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useSession = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Retrieve session data from localStorage or sessionStorage
    const sessionData = JSON.parse(localStorage.getItem("userData"));

    // Dispatch actions to update the Redux store with session data
    if (sessionData && sessionData.isAuthenticated) {
      dispatch(setUser(sessionData.user));
    }
  }, [dispatch]);
};

export default useSession;
