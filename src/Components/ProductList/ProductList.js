// Importing components
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Importing UI components
import Product from "../UI/Product";
import CartButton from "../UI/CartButton";

// Importing from redux
import { addItem, removeItem } from "../../redux/CartSlice";
import {
  fetchProductsAsync,
  selectProducts,
  selectProductsStatus,
} from "../../redux/ProductListSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const status = useSelector(selectProductsStatus);

  const [showQuantityControls, setShowQuantityControls] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProductsAsync());
    }
  }, [status, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addItem({ product }));
    setShowQuantityControls(true); // Show quantity controls when adding to cart
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeItem({ product, quantity: 1 }));
  };

  const cartItems = useSelector((state) => state.cart.items || {});

  const renderQuantityControls = (product) => {
    const { _id } = product;
    const quantity = cartItems[_id] ? cartItems[_id].quantity : 0;
    if (quantity > 0) {
      return (
        <>
          {showQuantityControls && (
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
          )}
        </>
      );
    } else {
      return <CartButton product={product} onClickHandler={handleAddToCart} />;
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          All Products
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((category) =>
            category.products.map((product) => (
              <Product
                key={product.id}
                product={product}
                renderQuantityControls={renderQuantityControls}
                handleAddToCart={handleAddToCart}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
