import { Link } from "react-router-dom";
import UserGreeting from "./UserGreeting.jsx";

const NavBar = () => {
  const style = {
    padding: 10,
    background: "#b4b4b4",
  };

  return (
    <div key={"nav-bar"} style={style}>
      <Link to={"/"} style={{ padding: 10 }}>
        Blogs
      </Link>
      <Link to={"/users"} style={{ padding: 10, paddingRight: 20 }}>
        Users
      </Link>
      <UserGreeting />
    </div>
  );
};

export default NavBar;
