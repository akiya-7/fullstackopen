import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { initialiseBlogs } from "../reducers/blogReducer.js";
import Blog from "./Blog.jsx";

const BlogList = ({}) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(initialiseBlogs());
  }, [dispatch]);

  if (!blogs) {
    return <div>Loading...</div>;
  }

  return (
    <div id="blog-list">
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  );
};

export default BlogList;
