import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: {},
  },
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;
      const { _id } = product;
      if (!state.items[_id]) {
        state.items[_id] = { ...product, quantity: 0 }; // Initialize quantity to 0
      }
      state.items[_id].quantity += 1; // Increment quantity by 1
    },
    removeItem: (state, action) => {
      const { product } = action.payload;
      const { _id } = product;
      if (state.items[_id]) {
        state.items[_id].quantity -= 1;
        if (state.items[_id].quantity <= 0) {
          // delete the item from cart if quantity is zero
          delete state.items[_id];
        }
      }
    },
    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => Object.values(state.cart.items);

export default cartSlice.reducer;
