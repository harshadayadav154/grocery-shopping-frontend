import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./Components/ProductList/ProductList";
import CartCheckout from "./Components/CartCheckout/CartCheckout";
import Login from "./Components/Login/Login";
import Register from "./Components/Login/Register";
import Navbar from "./Components/Navbar/Navbar";
import Payment from "./Components/Payment/Payment";
import "./App.css";

function App() {
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
