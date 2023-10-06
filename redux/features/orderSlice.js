// orderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: [],
  reducers: {
    addOrder: (state, action) => {
      return [...state, action.payload];
    },
    removeOrder: (state, action) => {},
  },
});

export const { addOrder, removeOrder } = orderSlice.actions;
export default orderSlice.reducer;
