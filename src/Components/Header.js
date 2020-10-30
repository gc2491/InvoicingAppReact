import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../actions/auth";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { defaultTheme } from "../Constants/colorSchemes";
import appSettings from "../appSettings.json";

const Header = ({ auth: { username }, signOut }) => {
  return (
    <Navbar
      style={navbarStyle}
      collapseOnSelect={true}
      expand="md"
      variant="dark"
      className="pageWidth"
    >
      <Navbar.Brand>
        <Link style={brandStyle} to="/">
          {appSettings.ShortName}
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle
        style={{ marginRight: "2rem" }}
        aria-controls="responsive-navbar-nav"
      />
      <Navbar.Collapse
        style={{ backgroundColor: defaultTheme.color2, borderRadius: "5px" }}
        id="responsive-navbar-nav"
      >
        <Nav className="mr-auto">
          <Link style={linkStyle} to="/fatture">
            Fatture
          </Link>
          <Link style={linkStyle} to="/scadenze">
            Scadenze
          </Link>
          <Link style={linkStyle} to="/clifor">
            Cli/For
          </Link>
          <Link style={linkStyle} to="/queries">
            Queries
          </Link>
        </Nav>
        <Link style={linkStyle} to="/profilo">
          {username}
        </Link>
        <Link
          style={signOutStyle}
          onClick={() => {
            signOut();
            window.location.reload(true);
          }}
          to="#"
        >
          Esci
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

Header.propTypes = {
  signOut: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { signOut })(Header);

let brandStyle = {
  margin: "10px",
  padding: "5px 20px",
  borderRight: "1px solid lightblue",
  color: defaultTheme.color4,
  textDecoration: "none",
  fontSize: "1.5rem",
};

let linkStyle = {
  margin: "0.25rem",
  padding: "5px 10px",
  border: "1px solid " + defaultTheme.color4,
  borderRadius: "5px",
  color: defaultTheme.color4,
  textDecoration: "none",
  display: "inline-block",
};

let signOutStyle = {
  margin: "0.25rem",
  marginRight: "2rem",
  padding: "5px 10px",
  border: "1px solid " + defaultTheme.color4,
  borderRadius: "5px",
  color: defaultTheme.color4,
  textDecoration: "none",
  display: "inline-block",
};

const navbarStyle = {
  height: "6.5%",
  minHeight: "64px",
  padding: "0",
  backgroundColor: defaultTheme.color2,
  margin: "auto",
};

