// Importing components
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Importing from Redux slices
import {
  selectUser,
  setRedirectToPage,
  selectIsAuthenticated,
} from "../../redux/UserSlice";
import {
  selectCartItems,
  removeItem,
  addItem,
  clearCart,
} from "../../redux/CartSlice";

// Importing UI components
import CheckoutForm from "../UI/CheckoutForm";
import CartItems from "../UI/CartItems";

function CartCheckout() {
  // state variables
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  // Remove from cart
  const handleRemove = (product) => {
    dispatch(removeItem({ product }));
  };

  // Clear cart
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Add to cart
  const handleAddToCart = (product) => {
    dispatch(addItem({ product }));
  };

  useEffect(() => {
    // Check if the user is authenticated
    if (!isAuthenticated) {
      dispatch(setRedirectToPage("/checkout"));
      // If user is not authenticated, navigate to the login page
      navigate("/login");
    }
  }, [user, isAuthenticated, dispatch, navigate]);

  return (
    <div className="mx-auto mt-8 px-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">Cart Checkout</h1>
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div className="flex justify-center w-75">
          <div className="bg-gray-100 p-4 m-5">
            <ul>
              {cartItems.map((item) => (
                <li key={item._id} className="flex p-6">
                  <CartItems
                    item={item}
                    handleAddToCart={handleAddToCart}
                    handleRemove={handleRemove}
                  />
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <button
                onClick={handleClearCart}
                className="mr-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Clear Cart
              </button>
            </div>
          </div>

          <div className="w-1/2">
            <CheckoutForm />
          </div>
        </div>
      )}
    </div>
  );
}

export default CartCheckout;
