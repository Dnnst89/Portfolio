import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth-slice';
import cartReducer from './features/cart-slice';
import registryForm from './features/registryForm';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        registryForm
    },
});
