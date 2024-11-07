import { useState } from "react";
import { userLogin } from "../reducers/userReducer.js";
import { useDispatch } from "react-redux";

const Login = ({}) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const clearFields = () => {
    setUsername("");
    setPassword("");
  };

  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin({ username: username, password: password }));
    clearFields();
  };

  return (
    <form id="login-form" onSubmit={handleSubmit}>
      <p>
        username:{" "}
        <input
          id="username"
          type="text"
          value={username}
          onChange={handleUsernameInput}
          required
        />{" "}
        <br />
        password:{" "}
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={handlePasswordInput}
        />
      </p>
      <button type="submit">log in</button>
    </form>
  );
};

export default Login;
