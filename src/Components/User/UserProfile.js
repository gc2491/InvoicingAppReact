import React, { Fragment } from "react";
import { connect } from "react-redux";

import UpdateSecurity from "../Auth/UpdateSecurity";

const UserProfile = () => {
  return (
    <Fragment>
      <UpdateSecurity />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  role: state.auth.role,
});

export default connect(mapStateToProps, null)(UserProfile);
