import React, { Fragment } from "react";
import { connect } from "react-redux";

import Signup from "../Auth/SignUp";
import UpdateSecurity from "../Auth/UpdateSecurity";

const AdminProfile = () => {
  return (
    <Fragment>
      <UpdateSecurity />
      <Signup />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  role: state.auth.role,
});

export default connect(mapStateToProps, null)(AdminProfile);
