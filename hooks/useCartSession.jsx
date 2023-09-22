// hydrateSession.js
import { updateShoppingSession } from "@/redux/features/cart-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useCartSession = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Retrieve session data from localStorage or sessionStorage
    const sessionData = JSON.parse(localStorage.getItem("cartSession"));
    console.log(sessionData)
    // Dispatch actions to update the Redux store with session data
    if (sessionData) {
      dispatch(updateShoppingSession(sessionData));
    }
  }, [dispatch]);
};

export default useCartSession;
