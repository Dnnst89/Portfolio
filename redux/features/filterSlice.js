import { createSlice } from "@reduxjs/toolkit";
const initialState = {filterState: {}};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
      setSelectedFilter: (state, action) => {
        state.filterState = action.payload
      },
      
    },
  });

export const { setSelectedFilter } = filterSlice.actions;
export default filterSlice.reducer;