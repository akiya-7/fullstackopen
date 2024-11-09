import { Link } from "react-router-dom";
import UserGreeting from "./UserGreeting.jsx";

const NavBar = () => {
  const style = {
    padding: 10,
    background: "#b4b4b4",
  };

  return (
    <div key={"nav-bar"} style={style}>
      <Link to={"/"}>Blogs</Link>
      <Link to={"/users"} style={{ padding: 20 }}>
        Users
      </Link>
      <UserGreeting style={{ paddingLeft: 20 }} />
    </div>
  );
};

export default NavBar;
