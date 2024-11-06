import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import BlogList from "./components/BlogList.jsx";
import Login from "./components/Login";
import AddBlog from "./components/AddBlog";
import AlertMessage from "./components/AlertMessage";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { displayAlert } from "./reducers/alertReducer.js";
import { newBlog } from "./reducers/blogReducer.js";
import Toggleable from "./components/Toggleable.jsx";

const App = () => {
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const addBlogRef = useRef();

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
  };

  if (user === null)
    return (
      <>
        <h2>Log in to application</h2>
        <AlertMessage />
        <Login onLogin={handleLogin} />
      </>
    );

  const handleNewBlog = async (blog) => {
    try {
      dispatch(newBlog(blog, user));
    } catch (error) {
      console.log(error);
      dispatch(displayAlert(error.response, "error"));
      if (error.response.data.error === "token has expired") {
        handleLogout();
      }
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      <AlertMessage />
      <p>
        Hello {user.name}!
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

      <BlogList user={user} />
    </div>
  );
};

export default App;
