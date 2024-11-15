import { Link } from "react-router-dom";
import { Button, Nav, Navbar, NavItem } from "react-bootstrap";
import { userLogout } from "../reducers/currentUserReducer.js";
import { useDispatch, useSelector } from "react-redux";

const NavBar = () => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.currentUser.user.name);

  return (
    <Navbar collapseOnSelect className={"bg-body-tertiary"} expand="lg">
      <Navbar.Brand>Blogs</Navbar.Brand>
      <Nav>
        <NavItem className={"d-lg-none"}>
          <Navbar.Text>Hello {name}!</Navbar.Text>
          <Button
            variant="link"
            onClick={() => {
              dispatch(userLogout());
            }}
          >
            Logout
          </Button>
        </NavItem>
      </Nav>
      <Navbar.Toggle aria-controls={"responsive-navbar-nav"} />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto" variant={"underline"} defaultActiveKey={"/"}>
          <Nav.Item>
            <Nav.Link as={Link} to={"/"}>
              Blogs
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to={"/users"}>
              Users
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <NavItem className={"d-none d-lg-block"}>
          <Navbar.Text>Hello {name}!</Navbar.Text>
          <Button
            variant="link"
            onClick={() => {
              dispatch(userLogout());
            }}
          >
            Logout
          </Button>
        </NavItem>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
