// Import Axios or your preferred HTTP client library
import axios from "axios";
import { API_BASE_URL } from "./constant";

// Example function to create an order
export const createOrder = async (orderData) => {
  try {
    // Make POST request to your backend API endpoint
    const response = await axios.post(`${API_BASE_URL}/order`, orderData);
    return response.data; // Return response data
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
