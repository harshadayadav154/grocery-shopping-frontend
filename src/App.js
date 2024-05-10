import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import ProductList from "./Components/ProductList/ProductList";
import CartCheckout from "./Components/CartCheckout/CartCheckout";
import Login from "./Components/Login/Login";
import Register from "./Components/Login/Register";
import Navbar from "./Components/Navbar/Navbar";
import Payment from "./Components/Payment/Payment";
import MyOrders from "./Components/Order/MyOrder";

// Importing from redux
import { getUserDetails } from "./redux/UserSlice";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = localStorage.getItem("User");
    if (user) {
      // Dispatch an action to set the user in the Redux store
      dispatch(getUserDetails(user)); // Assuming user details are stored as JSON
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/checkout" element={<CartCheckout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/order" element={<Payment />} />
          <Route path="/myOrders" element={<MyOrders />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
