import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useMatch } from "react-router-dom";
import Login from "./components/Login";
import AlertMessage from "./components/AlertMessage";
import UserGreeting from "./components/UserGreeting.jsx";
import Users from "./views/Users.jsx";
import Blogs from "./views/Blogs.jsx";
import DetailedBlog from "./views/DetailedBlog.jsx";
import DetailedUser from "./views/DetailedUser.jsx";
import { useEffect } from "react";
import { userAuthentication } from "./reducers/currentUserReducer.js";
import { initialiseBlogs, matchBlog } from "./reducers/blogReducer.js";
import { initialiseUsers, matchUser } from "./reducers/userReducer.js";

const App = () => {
  const dispatch = useDispatch();

  const blogsInitialised = useSelector((state) => state.blog.isInitialised);
  const usersInitialised = useSelector((state) => state.user.isInitialised);

  const blogMatch = useMatch("/blogs/:id");
  const userMatch = useMatch("/users/:id");

  const currentUser = useSelector((state) => state.currentUser.user);

  useEffect(() => {
    dispatch(userAuthentication());
    dispatch(initialiseBlogs());
    dispatch(initialiseUsers());
  }, []);

  if (!blogsInitialised || !usersInitialised) return <div>Loading...</div>;

  const blog = blogMatch ? dispatch(matchBlog(blogMatch.params.id)) : null;

  const user = userMatch ? dispatch(matchUser(userMatch.params.id)) : null;

  if (!currentUser)
    return (
      <>
        <h2>Log in to application</h2>
        <AlertMessage />
        <Login />
      </>
    );

  return (
    <>
      <h2>blogs</h2>
      <UserGreeting />
      <AlertMessage />

      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/users" element={<Users />} />
        <Route
          path="/blogs/:id"
          element={
            blog ? <DetailedBlog blog={blog} /> : <div>Blog not found!</div>
          }
        />
        <Route
          path="/users/:id"
          element={
            user ? <DetailedUser users={user} /> : <div>Blog Not Found</div>
          }
        />
      </Routes>
    </>
  );
};

export default App;
