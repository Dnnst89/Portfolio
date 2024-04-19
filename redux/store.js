import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import cartReducer from "./features/cart-slice";
import registryForm from "./features/registryForm";
import orderReducer from "./features/orderSlice";
import selectedGiftsReducer from "./features/selectedGiftsSlice";
import fromOrderReducer from "./features/fromOrder-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    registryForm,
    order: orderReducer,
    selectedGifts: selectedGiftsReducer,
    fromOrder: fromOrderReducer,
  },
});
