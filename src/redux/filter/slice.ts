import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { FilterSliceState, Sort, SortPropertyEnum } from "./types";

const initialState: FilterSliceState = {
  pageCurrent: 1,
  categoryId: 0,
  sortTypeObj: {
    name: "популярности ⬇",
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
  searchValue: "",
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortTypeObj(state, action: PayloadAction<Sort>) {
      state.sortTypeObj = action.payload;
      console.log("STATE CHANGED: setSortTypeObj");
    },
    setPageCurrent(state, action: PayloadAction<number>) {
      state.pageCurrent = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.pageCurrent = Number(action.payload.pageCurrent);
        state.categoryId = Number(action.payload.categoryId);
        state.sortTypeObj = action.payload.sortTypeObj;
        console.log("STATE CHANGED: setFilters");
      } else {
        state.pageCurrent = 1;
        state.categoryId = 0;
        state.sortTypeObj = {
          name: "популярности ⬇",
          sortProperty: SortPropertyEnum.RATING_DESC,
        };
        console.log("STATE CHANGED: setFilters ELSE");
      }
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const {
  setCategoryId,
  setSortTypeObj,
  setPageCurrent,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
