import { userLogout } from "../reducers/currentUserReducer.js";
import Toggleable from "../components/Toggleable.jsx";
import AddBlog from "../components/AddBlog.jsx";
import BlogList from "../components/BlogList.jsx";
import { newBlog } from "../reducers/blogReducer.js";
import { displayAlert } from "../reducers/alertReducer.js";
import { useDispatch } from "react-redux";
import { useRef } from "react";

const Blogs = (currentUser) => {
  const dispatch = useDispatch();
  const addBlogRef = useRef();

  const handleNewBlog = async (blog) => {
    try {
      dispatch(newBlog(blog, currentUser));
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
      <Toggleable buttonLabel="New Blog" ref={addBlogRef}>
        <AddBlog onNewBlog={handleNewBlog} />
      </Toggleable>

      <BlogList user={currentUser} />
    </div>
  );
};

export default Blogs;
