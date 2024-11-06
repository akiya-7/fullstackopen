import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import BlogList from "./components/BlogList.jsx";
import Login from "./components/Login";
import AddBlog from "./components/AddBlog";
import AlertMessage from "./components/AlertMessage";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { displayAlert } from "./reducers/alertReducer.js";
import { initialiseBlogs } from "./reducers/blogReducer.js";

const App = () => {
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialiseBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (loginDetails) => {
    const user = await loginService.login(loginDetails);
    if (user.error) {
      dispatch(displayAlert(user.error, "error"));
      return;
    }
    window.localStorage.setItem("loggedUser", JSON.stringify(user));
    setUser(user);
    blogService.setToken(user.token);
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedUser");
    dispatch(displayAlert(`Successfully logged out.`, "success"));
  };

  if (user === null)
    return (
      <>
        <h2>Log in to application</h2>
        <AlertMessage />
        <Login onLogin={handleLogin} />
      </>
    );

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
        Hello {user.name}!{" "}
        <button
          id="logout"
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
        </button>
      </p>

      <AddBlog onNewBlog={handleNewBlog} />
      <BlogList />
    </div>
  );
};

export default App;
