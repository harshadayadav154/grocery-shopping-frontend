// Importing components
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Importing UI components
import Product from "../UI/Product";

// Importing from redux

import {
  fetchProductsAsync,
  selectProducts,
  selectProductsStatus,
} from "../../redux/ProductListSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const status = useSelector(selectProductsStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProductsAsync());
    }
  }, [status, dispatch]);

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          All Products
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((category) =>
            category.products.map((product) => (
              <Product key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
