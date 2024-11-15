import { userLogin } from "../reducers/currentUserReducer.js";
import { useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";

const Login = ({}) => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    dispatch(userLogin({ username, password }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className={"mb-3"} controlId="username">
        <Form.Label column={"sm"}>username:</Form.Label>
        <Form.Control type="text" name="username" />
      </Form.Group>

      <Form.Group className={"mb-3"} controlId="password">
        <Form.Label column={"sm"}>password:</Form.Label>
        <Form.Control type="password" name="password" />
      </Form.Group>
      <Button variant={"primary"} type="submit">
        log in
      </Button>
    </Form>
  );
};

export default Login;
