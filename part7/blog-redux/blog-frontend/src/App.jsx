import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import AddBlog from "./components/AddBlog";
import AlertMessage from "./components/AlertMessage";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

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

  const displayAlert = (alertMessage, alertType) => {
    setAlertMessage(alertMessage);
    setAlertType(alertType);
    setTimeout(() => {
      setAlertMessage(null);
    }, 5000);
  };

  const handleLogin = async (loginDetails) => {
    const user = await loginService.login(loginDetails);
    if (user.error) {
      displayAlert(user.error, "error");
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
        <AlertMessage type={alertType} message={alertMessage} />
        <Login onLogin={handleLogin} />
      </>
    );

  const handleNewBlog = async (newBlog) => {
    try {
      const response = await blogService.postBlog(newBlog, {
        headers: { Authorization: `Bearer ${user}` },
      });
      displayAlert(`A new blog ${response.title} added!`, "success");
    } catch (error) {
      displayAlert(error, "error");
    } finally {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      <AlertMessage type={alertType} message={alertMessage} />
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
