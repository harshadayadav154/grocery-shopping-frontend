import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid"; // Import ChevronUpIcon

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
  const categories = useSelector(selectProducts);
  const status = useSelector(selectProductsStatus);
  const [sortBy, setSortBy] = useState(""); // State to store sorting option
  const [sortOrder, setSortOrder] = useState("asc"); // State to store sorting order

  const sortOptions = [
    { name: "Name", value: "name" },
    { name: "Price", value: "price" },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProductsAsync());
    }
  }, [status, dispatch]);

  const handleSortChange = (value) => {
    if (value === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(value);
      setSortOrder("asc");
    }
  };

  const sortedProducts = categories.reduce((accumulator, category) => {
    return accumulator.concat(category.products);
  }, []);

  if (sortBy === "price") {
    sortedProducts.sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
  } else if (sortBy === "name") {
    sortedProducts.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  }

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex items-baseline justify-between ">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            All Products
          </h2>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="group inline-flex justify-center text-md font-medium text-gray-700 hover:text-gray-900">
                Sort
                {sortBy && (
                  <Fragment>
                    {sortOrder === "asc" ? (
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <ChevronUpIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    )}
                  </Fragment>
                )}
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {sortOptions.map((option) => (
                    <Menu.Item key={option.name}>
                      {({ active }) => (
                        <div className="flex items-baseline justify-flex-start ">
                          <button
                            onClick={() => handleSortChange(option.value)}
                            className={classNames(
                              sortBy === option.value
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            {option.name}
                          </button>
                        </div>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {sortedProducts.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
