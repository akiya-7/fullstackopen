import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./reducers/alertReducer.js";
import blogReducer from "./reducers/blogReducer.js";
import currentUserReducer from "./reducers/currentUserReducer.js";
import userReducer from "./reducers/userReducer.js";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    blog: blogReducer,
    currentUser: currentUserReducer,
    user: userReducer,
  },
});
