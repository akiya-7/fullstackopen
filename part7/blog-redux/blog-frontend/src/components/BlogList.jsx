import { useSelector } from "react-redux";

const BlogList = () => {
  const blogs = useSelector((state) => state.blog);

  if (!blogs) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {[...blogs].map((blog) => (
        <div key={blog.id}>
          {blog.title} {blog.author}
        </div>
      ))}
    </div>
  );
};

export default BlogList;
