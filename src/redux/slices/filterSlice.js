import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageCurrent: 1,
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
    setPageCurrent(state, action) {
      state.pageCurrent = action.payload;
    },
    setFilters(state, action) {
      state.pageCurrent = Number(action.payload.pageCurrent);
      state.categoryId = Number(action.payload.categoryId);
      state.sortTypeObj = action.payload.sort;
    },
  },
});

export const { setCategoryId, setSortTypeObj, setPageCurrent, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
