import { createSlice } from "@reduxjs/toolkit";
import { displayAlert } from "./alertReducer.js";
import loginService from "../services/login.js";
import blogService from "../services/blogs.js";

const initialState =
  JSON.parse(window.localStorage.getItem("loggedUser")) || null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    clearUser: () => {
      return null;
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

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
