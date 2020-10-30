import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import AdminProfile from "./User/AdminProfile";
import UserProfile from "./User/UserProfile";

const Profile = ({ role }) => {
  return (
    <Fragment>{role === "admin" ? <AdminProfile /> : <UserProfile />}</Fragment>
  );
};

const mapStateToProps = (state) => ({
  role: state.auth.role,
});

Profile.propTypes = {
  role: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Profile);
