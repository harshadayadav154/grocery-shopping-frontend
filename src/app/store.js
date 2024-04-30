// store.js
import { configureStore } from "@reduxjs/toolkit";
import productListReducer from "../redux/ProductListSlice";
import cartReducer from "../redux/CartSlice";
import userReducer from "../redux/UserSlice";
import OrderReducer from "../redux/OrderSlice";

export default configureStore({
  reducer: {
    products: productListReducer,
    cart: cartReducer,
    user: userReducer,
    order: OrderReducer,
  },
});
