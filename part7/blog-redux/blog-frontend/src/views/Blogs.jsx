import Toggleable from "../components/Toggleable.jsx";
import AddBlog from "../components/AddBlog.jsx";
import BlogList from "../components/BlogList.jsx";
import { useRef } from "react";

const Blogs = (blogs) => {
  const addBlogRef = useRef();

  return (
    <div>
      <Toggleable buttonLabel="New Blog" ref={addBlogRef}>
        <AddBlog />
      </Toggleable>

      <BlogList blogs={blogs} />
    </div>
  );
};

export default Blogs;
