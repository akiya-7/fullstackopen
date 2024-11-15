import { useState } from "react";
import { newBlog } from "../reducers/blogReducer.js";
import { displayAlert } from "../reducers/alertReducer.js";
import { userLogout } from "../reducers/currentUserReducer.js";
import { useDispatch, useSelector } from "react-redux";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const currentUser = useSelector((state) => state.currentUser.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title: title, author: author, url: url };
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
    <form onSubmit={handleSubmit}>
      <p>
        Title:{" "}
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />{" "}
        <br />
        Author:{" "}
        <input
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />{" "}
        <br />
        URL:{" "}
        <input
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />{" "}
        <br />
        <button type="submit">Create</button>
      </p>
    </form>
  );
};

export default AddBlog;
