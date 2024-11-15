import { useSelector } from "react-redux";

const DetailedUser = () => {
  const user = useSelector((state) => state.user.matchedUser);

  if (!user) return <p>There is no user :(</p>;

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added Blogs:</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default DetailedUser;
