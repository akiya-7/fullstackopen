import alertReducer from "./reducers/alertReducer.js";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
  },
});
