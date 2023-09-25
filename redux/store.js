import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import registryForm from "./features/registryForm";
import paymentReducer from "./features/paymentSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    registryForm,
    payment: paymentReducer,
  },
});
