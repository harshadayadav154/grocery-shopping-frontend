import { createSlice } from "@reduxjs/toolkit";

// Importing API calls
import { registerUser, loginUser, getUser } from "../API/UserAPI";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    user: null,
    error: null,
    redirectToPage: null, // state to save the page to redirect after login
  },
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setRedirectToPage: (state, action) => {
      state.redirectToPage = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.redirectToPage = null; // Clear the redirectToPage state on logout
    },
  },
});

export const { setUser, setError, setRedirectToPage, clearError, logout } =
  userSlice.actions;

export const register = (userData) => async (dispatch) => {
  try {
    console.log("userData", userData);
    const response = await registerUser(userData);
    localStorage.setItem("user", response.userData._id);
    dispatch(setUser(userData));
  } catch (error) {
    if (error === "User already exists") {
      dispatch(setError("User already registered. Please log in."));
    } else {
      dispatch(setError(error));
    }
  }
};

export const login = (userData) => async (dispatch, getState) => {
  try {
    const userDetails = localStorage.getItem("User");
    if (userDetails) {
      const response = await loginUser(userDetails.email);
      dispatch(setUser(response.user));
    } else {
      const response = await loginUser(userData);
      dispatch(setUser(response.user));
      localStorage.setItem("User", response.user.email);
    }
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;
      dispatch(setError(errorMessage));
    } else {
      // Handle other types of errors, such as network errors
      dispatch(setError(error));
    }
  }
};

export const getUserDetails = (userEmail) => async (dispatch, getState) => {
  try {
    const response = await getUser(userEmail);
    dispatch(setUser(response));
  } catch (error) {
    dispatch(setError(error));
  }
};

export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectUser = (state) => state.user.user;
export const selectError = (state) => state.user.error;
export const selectRedirectToPage = (state) => state.user.redirectToPage;

export default userSlice.reducer;
