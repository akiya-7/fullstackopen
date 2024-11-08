import { createSlice } from "@reduxjs/toolkit";
import { displayAlert } from "./alertReducer.js";
import loginService from "../services/login.js";
import blogService from "../services/blogs.js";

const initialState = {
  user: JSON.parse(window.localStorage.getItem("loggedUser")) || null,
  cached: !!JSON.parse(window.localStorage.getItem("loggedUser")),
};

const currentUserSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.cached = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.cached = null;
    },
  },
});

export const userLogin = (details) => {
  return async (dispatch) => {
    const user = await loginService.login(details);

    if (user.error) {
      dispatch(displayAlert(user.error, "error"));
      return;
    }

    window.localStorage.setItem("loggedUser", JSON.stringify(user));
    dispatch(setUser(user));
    await blogService.setToken(user.token);
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    dispatch(clearUser());
    window.localStorage.removeItem("loggedUser");
    blogService.setToken(null);
  };
};

export const userAuthentication = () => {
  return async (dispatch) => {
    if (initialState.cached) {
      dispatch(setUser(initialState.user));
      await blogService.setToken(initialState.user.token);
    }
  };
};

export const { setUser, clearUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
