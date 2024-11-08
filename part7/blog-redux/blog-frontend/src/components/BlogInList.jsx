import { Link } from "react-router-dom";

const BlogInList = ({ blog }) => {
  const styles = {
    blogStyle: {
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 2,
      border: "solid",
      borderWidth: 1,
      marginBottom: 5,
    },
  };

  return (
    <div style={styles.blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </div>
  );
};

export default BlogInList;
