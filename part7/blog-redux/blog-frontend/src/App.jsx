import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Blog from "./components/Blog";
import Login from "./components/Login";
import AddBlog from "./components/AddBlog";
import AlertMessage from "./components/AlertMessage";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { displayAlert } from "./reducers/alertReducer.js";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

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
      blogService.getAll().then((blogs) => setBlogs(blogs));
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

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
