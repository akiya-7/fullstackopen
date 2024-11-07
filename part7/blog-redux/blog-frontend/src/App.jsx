import { useSelector } from "react-redux";
import Login from "./components/Login";
import AlertMessage from "./components/AlertMessage";
import Users from "./views/Users.jsx";
import { Route, Routes } from "react-router-dom";
import Blogs from "./views/Blogs.jsx";
import UserGreeting from "./components/UserGreeting.jsx";

const App = () => {
  const currentUser = useSelector((state) => state.currentUser);

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
      <UserGreeting {...currentUser} />
      <AlertMessage />

      <Routes>
        <Route path="/" element={<Blogs currentUser />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </>
  );
};

export default App;
