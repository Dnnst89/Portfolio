import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  purchasedProducts: [],
};

const purchasedItemsSlice = createSlice({
  name: "purchasedItems",
  initialState,
  reducers: {
    setPurchasedProduct: (state, action) => {
      state.purchasedProducts.push(action.payload);
    },

    clearPurchasedProducts: (state) => {
      state.purchasedProducts = [];
    },
  },
});

export const { setPurchasedProduct, clearPurchasedProducts } =
  purchasedItemsSlice.actions;

// Exporta el reducer
export default purchasedItemsSlice.reducer;
