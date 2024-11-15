import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs.js";
import { displayAlert } from "./alertReducer.js";
import { userLogout } from "./currentUserReducer.js";

const initialState = {
  blogList: null,
  isInitialised: false,
  matchedBlog: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState: initialState,
  reducers: {
    setBlogs(state, action) {
      state.blogList = action.payload;
      state.isInitialised = true;
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      const blogList = state.blogList.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog,
      );
      const matchedBlog = blogList.find((blog) => blog.id === updatedBlog.id);

      state.blogList = blogList;
      state.matchedBlog = matchedBlog;
    },
    removeBlog(state, action) {
      state.blogList.filter((blog) => blog.id !== action.payload);
    },
    addBlog(state, action) {
      state.blogList.push(action.payload);
    },
    setMatchBlog(state, action) {
      state.matchedBlog = action.payload;
    },
  },
});

export const initialiseBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const newBlog = (blog) => {
  return async (dispatch) => {
    try {
      const res = await blogService.newBlog(blog);
      const newBlog = await blogService.getBlog(res.id);
      dispatch(addBlog(newBlog));
      dispatch(displayAlert(`A new blog ${res.title} added!`, "success"));
    } catch (e) {
      console.log(e);
      dispatch(userLogout());
      dispatch(
        displayAlert(`Session has expired! Please log in again.`, "error"),
      );
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

export const newComment = (comment, blog, user) => {
  return async (dispatch) => {
    await blogService.addComment(comment, blog, user);
    const commentedBlog = await blogService.getBlog(blog.id);
    console.log(commentedBlog);
    dispatch(updateBlog(commentedBlog));
    dispatch(displayAlert(`Comment has been added!`, "success"));
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(blog);
      dispatch(removeBlog(blog.id));
      dispatch(displayAlert(`Blog '${blog.title}' deleted...`, "success"));
    } catch (error) {
      console.log(error);
    }
  };
};

export const matchBlog = (id) => {
  return async (dispatch) => {
    if (id === null) {
      dispatch(setMatchBlog(null));
      return;
    }

    const blog = await blogService.getBlog(id);
    dispatch(setMatchBlog(blog));
  };
};

export const { setBlogs, addBlog, updateBlog, removeBlog, setMatchBlog } =
  blogSlice.actions;

export default blogSlice.reducer;
