import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs.js";
import { displayAlert } from "./alertReducer.js";

const initialState = [];

const blogSlice = createSlice({
  name: "blog",
  initialState: initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog,
      );
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
  },
});

export const initialiseBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const newBlog = (blog, user) => {
  return async (dispatch) => {
    try {
      const res = await blogService.newBlog(blog, {
        headers: { Authorization: `Bearer ${user}` },
      });
      const newBlog = await blogService.getBlog(res.id);
      dispatch(addBlog(newBlog));
      dispatch(displayAlert(`A new blog ${res.title} added!`, "success"));
    } catch (e) {
      console.log(e);
    }
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const res = await blogService.likeBlog(blog);
    const likedBlog = await blogService.getBlog(res.id);
    dispatch(updateBlog(likedBlog));
    dispatch(displayAlert(`You liked '${likedBlog.title}!'`, "success"));
  };
};

export const deleteBlog = (blog, token) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(blog, token);
      dispatch(removeBlog(blog.id));
      dispatch(displayAlert(`Blog ${blog.title} deleted...`, "success"));
    } catch (error) {
      console.log(error);
    }
  };
};

export const { setBlogs, addBlog, updateBlog, removeBlog } = blogSlice.actions;

export default blogSlice.reducer;
