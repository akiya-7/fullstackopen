import { userLogout } from "../reducers/currentUserReducer.js";

const UserGreeting = (currentUser) => {
  return (
    <p>
      Hello {currentUser.name}!
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
