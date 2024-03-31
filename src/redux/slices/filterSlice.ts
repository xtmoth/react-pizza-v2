import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum SortPropertyEnum {
  RATING_DESC = "rating",
  TITLE_DESC = "title",
  PRICE_DESC = "price",
  RATING_ASC = "-rating",
  TITLE_ASC = "-title",
  PRICE_ASC = "-price",
}

export type Sort = {
  name: string;
  sortProperty: "rating" | "title" | "price" | "-rating" | "-title" | "-price";
};

interface FilterSliceState {
  pageCurrent: number;
  categoryId: number;
  sortTypeObj: Sort;
  searchValue: string;
}

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
    },
    setPageCurrent(state, action: PayloadAction<number>) {
      state.pageCurrent = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.pageCurrent = Number(action.payload.pageCurrent);
        state.categoryId = Number(action.payload.categoryId);
        state.sortTypeObj = action.payload.sortTypeObj;
      } else {
        state.pageCurrent = 1;
        state.categoryId = 0;
        state.sortTypeObj = {
          name: "популярности ⬇",
          sortProperty: SortPropertyEnum.RATING_DESC,
        };
      }
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sortTypeObj;

export const {
  setCategoryId,
  setSortTypeObj,
  setPageCurrent,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
