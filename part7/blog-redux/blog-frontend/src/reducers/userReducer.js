import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users.js";

const initialState = {
  userList: null,
  isInitialised: false,
  matchedUser: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers(state, action) {
      state.userList = action.payload;
      state.isInitialised = true;
    },
    setMatchedUser(state, action) {
      state.matchedUser = action.payload;
    },
  },
});

export const initialiseUsers = () => {
  return async (dispatch) => {
    const users = await userService.getUsers();
    dispatch(setUsers(users));
  };
};

export const matchUser = (id) => {
  return async (dispatch) => {
    const user = await userService.getUser(id);
    dispatch(setMatchedUser(user));
  };
};

export const { setUsers, setMatchedUser } = userSlice.actions;

export default userSlice.reducer;
