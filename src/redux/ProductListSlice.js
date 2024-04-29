import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Importing API calls
import { fetchProducts, fetchCategories } from "../API/ProductListAPI";

const initialState = {
  products: [],
  categories: [],
  status: "idle",
  error: null,
};

export const fetchProductsAsync = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await fetchProducts();
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    try {
      const response = await fetchCategories();
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = "loaded";
        state.products = action.payload;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "loaded";
        state.categories = action.payload;
      })
      .addCase(fetchCategoriesAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export the selector functions
export const selectProducts = (state) => state.products.products;
export const selectCategories = (state) => state.products.categories;
export const selectProductsStatus = (state) => state.products.status;
export const selectError = (state) => state.products.error;

export default productSlice.reducer;
