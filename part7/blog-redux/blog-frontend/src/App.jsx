import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogList from "./components/BlogList.jsx";
import Login from "./components/Login";
import AddBlog from "./components/AddBlog";
import AlertMessage from "./components/AlertMessage";
import Toggleable from "./components/Toggleable.jsx";
import { displayAlert } from "./reducers/alertReducer.js";
import { newBlog } from "./reducers/blogReducer.js";
import { userLogout } from "./reducers/userReducer.js";

const App = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const addBlogRef = useRef();

  if (!user)
    return (
      <>
        <h2>Log in to application</h2>
        <AlertMessage />
        <Login />
      </>
    );

  const handleNewBlog = async (blog) => {
    try {
      dispatch(newBlog(blog, user));
    } catch (error) {
      console.log(error);
      dispatch(displayAlert(error.response, "error"));
      if (error.response.data.error === "token has expired") {
        dispatch(userLogout());
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
            dispatch(userLogout());
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
