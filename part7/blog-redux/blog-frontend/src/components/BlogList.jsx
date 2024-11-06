import { useSelector } from "react-redux";
import Blog from "./Blog.jsx";
import blogService from "../services/blogs.js";
import { useEffect, useState } from "react";

const BlogList = () => {
  const blogs = useSelector((state) => state.blog);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  if (!blogs) {
    return <div>Loading...</div>;
  }

  console.log(blogs);

  return (
    <div id="blog-list">
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  );
};

export default BlogList;
