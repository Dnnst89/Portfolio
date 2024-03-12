import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  priceRange: {},
};
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addFilter: (state, action) => {
      state.priceRange = action.payload;
    },
  },
});

export const { addFilter } = filterSlice.actions;
export default filterSlice.reducer;
