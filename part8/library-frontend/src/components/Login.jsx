import { LOGIN } from "../queries.js";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";

const Login = ({ onLogin, show }) => {
  const [login, result] = useMutation(LOGIN);

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    await login({ variables: { username, password } });
  };

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      onLogin(token);
      localStorage.setItem("user-token", token);
    }
  }, [result.data]);

  if (!show) return null;

  return (
    <div>
      <h1>Login in:</h1>
      <form onSubmit={handleLogin}>
        <p>
          Username: <input type="text" id={"username"} />
          <br />
          Password: <input type={"password"} id={"password"} />
        </p>
        <button type={"submit"}>Submit</button>
      </form>
    </div>
  );
};

export default Login;
