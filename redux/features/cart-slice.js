import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  total: 0,
  items: [],
  quantity: 0,
  sessionId: null,
  loadingTaxes: false,
  showTaxes: false,
};
export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addQtyItems: (state) => {
      // Incrementa la cantidad de items de manera inmutable
      state.quantity += 1;
    },
    reduceQtyItems: (state) => {
      // Reduce la cantidad de items de manera inmutable

      state.quantity -= 1;
    },
    updateQtyItems: (state, action) => {
      // Inicializa la cantidad de items
      state.quantity = action.payload;
    },
    updateShoppingSession: (state, action) => {
      state.shoppingSession = action.payload;
    },
    addItemToCart: (state, action) => {
      // Agrega un objeto al array cartItems
      state.items.push(action.payload);
    },
    updateCartItems: (state, action) => {
      state.items = action.payload.data;
    },
    isTaxesLoading: (state, action) => {
      state.loadingTaxes = action.payload;
    },
    updateTaxesState: (state,action)=> {
      state.showTaxes = action.payload;
    }
  },
});

export const {
  addQtyItems,
  reduceQtyItems,
  updateQtyItems,
  updateShoppingSession,
  addItemToCart,
  updateCartItems,
  isTaxesLoading,
  updateTaxesState
} = cart.actions;
export default cart.reducer;
