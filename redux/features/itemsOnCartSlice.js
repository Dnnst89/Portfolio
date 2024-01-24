import { createSlice } from "@reduxjs/toolkit";

export const itemsOnCartSlice = createSlice({
  name: "itemsOnCart",
  initialState: {
    newValue: [],
    giftList: [],
  },
  reducers: {
    setNewValue: (state, action) => {
      state.newValue = action.payload;
    },
    setGiftList: (state, action) => {
      state.giftList = action.payload;
    },
  },
});

export const { setNewValue, giftList } = itemsOnCartSlice.actions;
export default itemsOnCartSlice.reducer;
