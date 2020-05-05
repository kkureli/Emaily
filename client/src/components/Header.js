import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Payments from "./Payments";

const Header = ({ auth }) => {
  const renderContent = () => {
    switch (auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a className="text-light" href="/auth/google">
              Login with Google
            </a>
          </li>
        );
      default:
        return (
          <>
            <li className="mr-4">
              <Payments></Payments>
            </li>
            <li style={{ paddingTop: "5px" }} className="text-light">
              Credits: {auth.credits}
            </li>
            <li style={{ paddingTop: "5px" }}>
              <a className="text-light ml-3" href="/api/logout">
                Logout
              </a>
            </li>
          </>
        );
    }
  };

  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand>
          <NavLink className="text-light" to={auth ? "/surveys" : "/"}>
            Emaily
          </NavLink>
        </Navbar.Brand>
        <Nav className="ml-auto">{renderContent()}</Nav>
      </Navbar>
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, null)(Header);
