import { createSlice } from "@reduxjs/toolkit";

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    totalPrice: 0,
    isCheckingOut: false,
    error: null,
  },
  reducers: {
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    startCheckout: (state) => {
      state.isCheckingOut = true;
      state.error = null;
    },
    checkoutSuccess: (state) => {
      state.isCheckingOut = false;
    },
    checkoutFailure: (state, action) => {
      state.isCheckingOut = false;
      state.error = action.payload;
    },
  },
});

export const {
  setTotalPrice,
  startCheckout,
  checkoutSuccess,
  checkoutFailure,
} = checkoutSlice.actions;

export const selectTotalPrice = (state) => state.checkout.totalPrice;
export const selectIsCheckingOut = (state) => state.checkout.isCheckingOut;
export const selectError = (state) => state.checkout.error;

export default checkoutSlice.reducer;
