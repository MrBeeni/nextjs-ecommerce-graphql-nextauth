import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProduct = createAsyncThunk(
  "users/getAllUsers",
  async (thunkApi) => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data;
  }
);

const initialState = {
  products: [],
  loading: false,
} as any;

const productSice = createSlice({
  name: "user",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products.push(...action.payload);
    });

    builder.addCase(fetchProduct.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export default productSice.reducer;
