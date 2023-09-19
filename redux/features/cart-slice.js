import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartQtyItems: 0, // Cantidad de items
    cartItems: [],
    cartItem: {},
    shoppingSession: null
};

export const cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addQtyItems: (state) => {
            // Incrementa la cantidad de items de manera inmutable
            state.cartQtyItems += 1;
        },
        reduceQtyItems: (state) => {
            // Reduce la cantidad de items de manera inmutable
            if (state.cartQtyItems > 0) {
                state.cartQtyItems -= 1;
            }
        },
        updateQtyItems: (state, action) => {
            // Inicializa la cantidad de items
            state.cartQtyItems = action.payload;
        },
        updateShoppingSession: (state, action) => {
            state.shoppingSession = action.payload;
          },
        addItemToCart: (state, action) => {
            // Agrega un objeto al array cartItems
            state.cartItems.push(action.payload);
        },
    },
});

export const { addQtyItems, reduceQtyItems, updateQtyItems, updateShoppingSession,addItemToCart } = cart.actions;
export default cart.reducer;