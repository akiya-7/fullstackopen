import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useMatch } from "react-router-dom";
import NavBar from "./components/NavBar";
import AlertMessage from "./components/AlertMessage";
import Login from "./views/Login.jsx";
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
  const hasAlert = useSelector((state) => state.alert.message);

  useEffect(() => {
    dispatch(userAuthentication());
    dispatch(initialiseBlogs());
    dispatch(initialiseUsers());
  }, []);

  if (!blogsInitialised || !usersInitialised) return <div>Loading...</div>;

  blogMatch ? dispatch(matchBlog(blogMatch.params.id)) : null;
  userMatch ? dispatch(matchUser(userMatch.params.id)) : null;

  if (!currentUser)
    return (
      <div className={"container align-content-center"}>
        <h2>Log in to application</h2>
        <AlertMessage />
        <Login />
      </div>
    );

  return (
    <div className={"container"}>
      <NavBar />
      {hasAlert ? <AlertMessage /> : null}

      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/users" element={<Users />} />
        <Route path="/blogs/:id" element={<DetailedBlog />} />
        <Route path="/users/:id" element={<DetailedUser />} />
      </Routes>
    </div>
  );
};

export default App;
