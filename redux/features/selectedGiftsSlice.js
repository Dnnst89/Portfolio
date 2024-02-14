import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedGifts: [],
};

const selectedGiftsSlice = createSlice({
  name: "selectedGifts",
  initialState,
  reducers: {
    setSelectedGifts: (state, action) => {
      state.selectedGifts = action.payload;
    },
  },
});

export const { setSelectedGifts } = selectedGiftsSlice.actions;

export default selectedGiftsSlice.reducer;
