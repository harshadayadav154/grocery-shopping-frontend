import { createSlice } from "@reduxjs/toolkit";

// Importing API calls
import { createOrder } from "../API/OrderAPI";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {
    orderLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    orderSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    orderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { orderLoading, orderSuccess, orderFailure } = orderSlice.actions;

export const placeOrder = (orderData) => async (dispatch) => {
  try {
    dispatch(orderLoading());
    // Call API to create order
    const response = await createOrder(orderData);
    console.log(response); // Handle response as needed
    dispatch(orderSuccess());
  } catch (error) {
    dispatch(orderFailure(error.message));
  }
};

export default orderSlice.reducer;
