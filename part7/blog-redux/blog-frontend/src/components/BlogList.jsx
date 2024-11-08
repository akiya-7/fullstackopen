import { useSelector } from "react-redux";
import BlogInList from "./BlogInList.jsx";

const BlogList = () => {
  const blogs = useSelector((state) => state.blog.blogList);

  if (!blogs) return <div>Loading...</div>;

  return (
    <div id="blog-list">
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <BlogInList key={blog.id} blog={blog} />
        ))}
    </div>
  );
};

export default BlogList;
