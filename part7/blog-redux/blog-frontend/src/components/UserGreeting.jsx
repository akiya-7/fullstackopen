import { userLogout } from "../reducers/currentUserReducer.js";
import { useDispatch, useSelector } from "react-redux";

const UserGreeting = () => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.currentUser.user.name);

  return (
    <p>
      Hello {name}!
      <button
        id="logout"
        onClick={() => {
          dispatch(userLogout());
        }}
      >
        Logout
      </button>
    </p>
  );
};

export default UserGreeting;
