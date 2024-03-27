import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params, thunkAPI) => {
    const { category, order, sortBy, search, pageCurrent } = params;
    const { data } = await axios.get(
      `https://65e7602b53d564627a8eab8e.mockapi.io/items?page=${pageCurrent}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    if (data.length === 0) {
      return thunkAPI.rejectWithValue("Пиццы пустые");
    }

    return thunkAPI.fulfillWithValue(data);
  }
);

const initialState = {
  items: [],
  status: "loading", //loading | success | error
};

export const pizzasSlice = createSlice({
  name: "pizza",
  initialState,

  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = "loading";
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = "error";
      state.items = [];
    });
  },
});

export const selectPizzaData = (state) => state.pizza;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
