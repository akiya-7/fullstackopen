import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs.js";

const initialState = [];

const blogSlice = createSlice({
  name: "blog",
  initialState: initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const initialiseBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};
export const { setBlogs } = blogSlice.actions;

export default blogSlice.reducer;
