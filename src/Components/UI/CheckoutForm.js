// Importing components
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Importing from redux
import { startCheckout } from "../../redux/CheckoutSlice";
import { placeOrder } from "../../redux/OrderSlice";
import { selectCartItems } from "../../redux/CartSlice";

function CheckoutForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(selectCartItems);
  const totalPrice =
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    address: "",
  });

  // Calculating total
  const shippingPrice = 5;
  const totalWithShipping = totalPrice + shippingPrice;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  // Create Order
  const handleCheckout = () => {
    const { name, email } = userInfo;
    dispatch(startCheckout({ userInfo, totalPrice }));
    dispatch(
      placeOrder({
        user: { username: name, email },
        shippingAddress: userInfo.address,
        items: { cartItems },
        totalPrice,
      })
    );
    navigate("/order");
  };
  return (
    <>
      <div className="mb-4">
        <label htmlFor="name" className="block mb-1">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={userInfo.name}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-1">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={userInfo.email}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block mb-1">
          Address:
        </label>
        <textarea
          id="address"
          name="address"
          value={userInfo.address}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full h-24"
        ></textarea>
      </div>
      <hr className="p-4" />
      <div className="mb-4">
        <div className="flex justify-between">
          <h2>Total Price: </h2>
          <h2>${totalPrice.toFixed(2)}</h2>
        </div>

        <hr className="p-4" />
        <div className="flex justify-between">
          <h2>Shipping Price:</h2>
          <h2>${shippingPrice.toFixed(2)}</h2>
        </div>

        <hr className="p-4" />
        <div className="flex justify-between font-bold">
          <h2> Total with Shipping:</h2>
          <h2>${totalWithShipping.toFixed(2)}</h2>
        </div>
      </div>
      <hr className="p-4" />
      <button
        onClick={handleCheckout}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Checkout
      </button>
    </>
  );
}

export default CheckoutForm;
