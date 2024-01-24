import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import cartReducer from "./features/cart-slice";
import registryForm from "./features/registryForm";
import orderReducer from "./features/orderSlice";
import itemsOnCartReducer from "./features/itemsOnCartSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    registryForm,
    order: orderReducer,
    itemsOnCart: itemsOnCartReducer,
  },
});
