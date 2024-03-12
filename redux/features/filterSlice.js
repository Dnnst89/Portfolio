import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredBrands: [
    {
      isAgeRangeURL: "",
      brandsFiltered: [],
    },
  ],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addFilter: (state, action) => {
      const { isAgeRangeURL, brandsFiltered } = action.payload;
      state.filteredBrands[0].isAgeRangeURL = isAgeRangeURL;
      state.filteredBrands[0].brandsFiltered = brandsFiltered;
    },
  },
});

export const { addFilter } = filterSlice.actions;
export default filterSlice.reducer;
