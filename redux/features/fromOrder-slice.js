import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFromOrderDetail: false,
};
export const fromOrder = createSlice({
  name: "fromOrder",
  initialState,
  reducers: {
    updatefromOrder: (state, action) => {
      // Inicializa la cantidad de items
      state.isFromOrderDetail = action.payload;
    },

    isFromOrderDetail: (state, action) => {
      state.isFromOrderDetail = action.payload;
    },
  },
});

export const { isFromOrderDetail, updatefromOrder } = fromOrder.actions;
export default fromOrder.reducer;
