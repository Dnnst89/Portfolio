import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import registryForm from "./features/registryForm";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        registryForm,
    },
});
