import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import * as CONSTS from "../../utils/consts";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

const NavbarComponent = (props) => {
  console.log(props);
  const { user, handleLogout } = props;
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Link to="/">React-Bootstrap</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* No hay inicio de sesion */}
        {!user && (
          <>
            <Link to="/auth/signup">
              <Button type="primary">SignUp</Button>
            </Link>
            <Link to="/auth/login">
              <Button>Login</Button>
            </Link>
          </>
        )}

        {/* Si hay sesion */}
        {user && (
          <>
            <Link to="">
              {user?.username} {user?.email}
              <img src={user?.url} className="avatar" alt="a" />
            </Link>
            {user.role === "admin" && <Link to="/admin">Admin</Link>}
            <Button onClick={handleLogout}>LogOut</Button>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
