import { createSlice } from "@reduxjs/toolkit";

// Importing API calls
import { createOrder, fetchOrdersByEmail } from "../API/OrderAPI";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    error: null,
    myOrders: [], // New state to hold fetched orders
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
    setMyOrders: (state, action) => {
      state.myOrders = action.payload;
    },
  },
});

export const selectOrders = (state) => state.order.myOrders;

export const { orderLoading, orderSuccess, orderFailure, setMyOrders } =
  orderSlice.actions;

export const placeOrder = (orderData) => async (dispatch) => {
  try {
    dispatch(orderLoading());
    // Call API to create order
    const response = await createOrder(orderData);
    dispatch(orderSuccess());
  } catch (error) {
    dispatch(orderFailure(error.message));
  }
};

export const fetchOrders = (email) => async (dispatch) => {
  try {
    dispatch(orderLoading());
    // Call API to fetch orders by user email
    const response = await fetchOrdersByEmail(email);
    dispatch(setMyOrders(response.orders));
    dispatch(orderSuccess(response.orders));
  } catch (error) {
    dispatch(orderFailure(error.message));
  }
};

export default orderSlice.reducer;
