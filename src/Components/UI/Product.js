// Importing components
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartButton from "../UI/CartButton";

// Importing from redux
import { addItem, removeItem } from "../../redux/CartSlice";

function Product({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addItem({ product }));
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeItem({ product, quantity: 1 }));
  };

  const cartItems = useSelector((state) => state.cart.items || {});
  const renderQuantityControls = (product) => {
    const { _id } = product;
    const cartItem = cartItems[_id]; // Check if the product is in the cart
    const quantity = cartItem ? cartItem.quantity : 0; // Access quantity if cartItem exists

    if (quantity > 0) {
      return (
        <>
          <div className="flex items-center">
            <button
              onClick={() => handleRemoveFromCart(product)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-300 font-bold px-3 py-2 rounded-l w-full"
            >
              -
            </button>
            <span className="bg-gray-200 px-3 py-2 border border-gray-300 w-full text-center">
              {quantity}
            </span>
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-300 font-bold px-3 py-2 rounded-r w-full"
            >
              +
            </button>
          </div>
        </>
      );
    } else {
      return <CartButton product={product} onClickHandler={handleAddToCart} />;
    }
  };

  return (
    <div className="group relative border border-gray-300 rounded-md shadow-md p-2 bg-white">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80 ">
        <img
          src={product.images}
          alt={product.name}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 mb-4 flex justify-between px-2">
        <div>
          <h2 className="text-lg text-gray-700 font-bold">
            <a href={product.name}>{product.name}</a>
          </h2>
        </div>
        <p className="text-lg font-medium text-gray-900">
          ${product.price} {product.unit}
        </p>
      </div>
      {renderQuantityControls(product)}
    </div>
  );
}

export default Product;
