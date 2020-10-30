import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";

import appSettings from "../appSettings.json";

const Home = () => {
  return <Redirect to="/fatture" />;

  return (
    <Fragment>
      <h2>{appSettings.Name}</h2>
    </Fragment>
  );
};

export default Home;
