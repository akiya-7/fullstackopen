import { Link } from "react-router-dom";

const BlogInList = ({ blog }) => {
  return (
    <tr key={blog.id} className={"justify-content-end"}>
      <td style={{ width: "75%" }}>
        <Link className={"page-link"} to={`/blogs/${blog.id}`}>
          {blog.title}
        </Link>
      </td>
      <td style={{ textAlign: "center" }}>added by {blog.user.name}</td>
    </tr>
  );
};

export default BlogInList;
