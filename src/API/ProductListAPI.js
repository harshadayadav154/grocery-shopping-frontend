import axios from "axios";

import { API_BASE_URL } from "./constant";

export function fetchProducts() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch products");
      }
      resolve({ data: response.data });
    } catch (error) {
      console.error("Error fetching products:", error);
      reject(error);
    }
  });
}

export function fetchCategories() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/categories`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch categories");
      }
      resolve({ data: response.data });
    } catch (error) {
      console.error("Error fetching categories:", error);
      reject(error);
    }
  });
}
