import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  sortTypeObj: { name: "популярности ⬇", sortProperty: "rating" },
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortTypeObj(state, action) {
      state.sortTypeObj = action.payload;
    },
  },
});

export const { setCategoryId, setSortTypeObj } = filterSlice.actions;

export default filterSlice.reducer;
