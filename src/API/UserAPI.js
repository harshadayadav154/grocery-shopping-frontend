import axios from "axios";
import { API_BASE_URL } from "./constant";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/register`,
      userData
    );
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const getUser = async (userEmail) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/email=${userEmail}`);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
