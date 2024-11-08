import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, likeBlog } from "../reducers/blogReducer.js";

const Blog = ({ blog }) => {
  const [detailVisibility, setDetailVisibility] = useState(false);
  const currentUser = useSelector((state) => state.currentUser.user);
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const fullDetails = { display: detailVisibility ? "block" : "none" };
  const noDetails = { display: detailVisibility ? "none" : "block" };

  const toggleDetailVisibility = () => {
    setDetailVisibility(!detailVisibility);
  };

  const handleDelete = (blog) => {
    const confirmMessage = `Remove blog: ${blog.title} by ${blog.author}`;
    if (confirm(confirmMessage)) dispatch(deleteBlog(blog));
  };

  return (
    <div style={blogStyle}>
      <div style={noDetails}>
        {blog.title} {blog.author}
        <button onClick={toggleDetailVisibility}>view</button>
      </div>

      <div style={fullDetails}>
        {blog.title} {blog.author}
        <button onClick={toggleDetailVisibility}>hide</button>
        <br />
        {blog.url}
        <br />
        Likes: {blog.likes}
        <button onClick={() => dispatch(likeBlog(blog))}>like</button>
        <br />
        User: {blog.user.name}
        <br />
        {blog.user.name === currentUser.name ? (
          <button onClick={() => handleDelete(blog)}>delete</button>
        ) : null}
      </div>
    </div>
  );
};

export default Blog;
