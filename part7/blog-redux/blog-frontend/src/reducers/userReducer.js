import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users.js";

const initialState = null;
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const initialiseUsers = () => {
  return async (dispatch) => {
    const users = await userService.getUsers();
    dispatch(setUsers(users));
  };
};

export const { setUsers } = userSlice.actions;

export default userSlice.reducer;
