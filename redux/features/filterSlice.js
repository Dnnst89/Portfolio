import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAgeRangeURL: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addFilter: (state, action) => {
      state.isAgeRangeURL = action.payload;
    },
  },
});

export const { addFilter } = filterSlice.actions;
export default filterSlice.reducer;
