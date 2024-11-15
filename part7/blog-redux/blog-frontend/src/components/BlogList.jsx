import { useSelector } from "react-redux";
import BlogInList from "./BlogInList.jsx";
import { Table } from "react-bootstrap";

const BlogList = () => {
  const blogs = useSelector((state) => state.blog.blogList);

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes); // Sort blogs by likes in descending order
  const remainingBlogs = sortedBlogs.slice(3); // Get the remaining blogs after the first three

  return (
    <Table striped hover responsive>
      <tbody key={"blog-list"}>
        {remainingBlogs.map((blog) => (
          <BlogInList blog={blog} />
        ))}
      </tbody>
    </Table>
  );
};

export default BlogList;
