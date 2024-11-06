import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: "", type: "" };

const alertSlice = createSlice({
  name: "alert",
  initialState: initialState,
  reducers: {
    newAlert(state, action) {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearAlert(state) {
      state.message = null;
      state.type = null;
    },
  },
});

export const displayAlert = (message, type, duration = 5) => {
  return async (dispatch) => {
    dispatch(newAlert({ message, type }));
    setTimeout(() => {
      dispatch(clearAlert());
    }, duration * 1000);
  };
};

export const { newAlert, clearAlert } = alertSlice.actions;

export default alertSlice.reducer;
