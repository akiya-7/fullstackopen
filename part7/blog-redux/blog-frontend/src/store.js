import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./reducers/alertReducer.js";
import blogReducer from "./reducers/blogReducer.js";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    blog: blogReducer,
  },
});
