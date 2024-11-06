import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import BlogList from "./components/BlogList.jsx";
import Login from "./components/Login";
import AddBlog from "./components/AddBlog";
import AlertMessage from "./components/AlertMessage";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { displayAlert } from "./reducers/alertReducer.js";
import { initialiseBlogs } from "./reducers/blogReducer.js";
import Blog from "./components/Blog.jsx";
import Toggleable from "./components/Toggleable.jsx";

const App = () => {
  const dispatch = useDispatch();
  const addBlogRef = useRef();

  useEffect(() => {
    dispatch(initialiseBlogs());
  }, [dispatch]);

  /* const handleLogin = async (loginDetails) => {
    const user = await loginService.login(loginDetails);
    if (user.error) {
      dispatch(displayAlert(user.error, "error"));
      return;
    }
    window.localStorage.setItem("loggedUser", JSON.stringify(user));
    setUser(user);
    blogService.setToken(user.token);
  };*/

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedUser");
    dispatch(displayAlert(`Successfully logged out.`, "success"));
  };

  /*if (user === null)
    return (
      <>
        <h2>Log in to application</h2>
        <AlertMessage />
        <Login onLogin={handleLogin} />
      </>
    );*/

  const handleNewBlog = async (newBlog) => {
    try {
      const response = await blogService.postBlog(newBlog, {
        headers: { Authorization: `Bearer ${user}` },
      });
      dispatch(displayAlert(`A new blog ${response.title} added!`, "success"));
    } catch (error) {
      dispatch(displayAlert(error.response.data.error, "error"));
    } finally {
      dispatch(initialiseBlogs());
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      <AlertMessage />
      <p>
        Hello {/*user.name*/}!{" "}
        <button
          id="logout"
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
        </button>
      </p>

      <Toggleable buttonLabel="New Blog" ref={addBlogRef}>
        <AddBlog onNewBlog={handleNewBlog} />
      </Toggleable>

      <BlogList />
    </div>
  );
};

export default App;
