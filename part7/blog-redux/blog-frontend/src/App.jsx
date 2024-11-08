import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Login";
import AlertMessage from "./components/AlertMessage";
import Users from "./views/Users.jsx";
import { Route, Routes } from "react-router-dom";
import Blogs from "./views/Blogs.jsx";
import UserGreeting from "./components/UserGreeting.jsx";
import { useEffect } from "react";
import { userAuthentication } from "./reducers/currentUserReducer.js";

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser.user);

  useEffect(() => {
    dispatch(userAuthentication());
  }, []);

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
      </Routes>
    </>
  );
};

export default App;
