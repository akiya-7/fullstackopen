import { userLogout } from "../reducers/currentUserReducer.js";
import { useDispatch, useSelector } from "react-redux";

const UserGreeting = () => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.currentUser.user.name);

  return (
    <>
      Hello {name}!
      <button
        id="logout"
        onClick={() => {
          dispatch(userLogout());
        }}
      >
        Logout
      </button>
    </>
  );
};

export default UserGreeting;
