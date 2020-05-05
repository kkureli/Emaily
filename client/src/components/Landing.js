import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
const Landing = ({ auth }) => {
  if (auth) {
    return <Redirect to={"/surveys"}></Redirect>;
  }
  return (
    <div className="text-center">
      <h1>Emaily!</h1>
      Collect feedback form from your users
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, null)(Landing);
