import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, likeBlog } from "../reducers/blogReducer.js";
import AddComment from "../components/AddComment";

const DetailedBlog = () => {
  const currentUser = useSelector((state) => state.currentUser.user);
  const blog = useSelector((state) => state.blog.matchedBlog);

  const dispatch = useDispatch();

  const styles = {
    blogStyle: {
      paddingBottom: 10,
      paddingLeft: 2,
      border: "solid",
      borderWidth: 1,
      marginBottom: 5,
    },
  };

  if (!blog) return <div>Blog doesn't exist!</div>;

  const handleDelete = (blog) => {
    const confirmMessage = `Remove blog: ${blog.title} by ${blog.author}`;
    if (confirm(confirmMessage)) dispatch(deleteBlog(blog));
  };

  return (
    <div style={styles.blogStyle}>
      <div>
        <h2>{blog.title}</h2>
        <a href={blog.url}>{blog.url}</a>
        <br />
        Likes: {blog.likes}
        <button onClick={() => dispatch(likeBlog(blog))}>like</button>
        <br />
        Added by {blog.user.name}
        <br />
        {blog.user.name === currentUser.name ? (
          <button onClick={() => handleDelete(blog)}>delete</button>
        ) : null}
      </div>
      <div>
        <h3>Comments</h3>
        <AddComment blog={blog} />
        {blog.comments.length !== 0 ? (
          <ul>
            {blog.comments.map((comment) => {
              return <li key={comment.id}>{comment.content}</li>;
            })}
          </ul>
        ) : (
          <p>This post has no comments...</p>
        )}
      </div>
    </div>
  );
};
export default DetailedBlog;
