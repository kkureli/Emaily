import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchSurveys } from "../actions/actions";
import { connect } from "react-redux";
import SurveyCards from "./SurveyCards";

function Dashboard(props) {
  useEffect(() => {
    props && props.fetchSurveys();
  }, []);

  return (
    <div className="mt-3">
      <h4>Dashboard - My Surveys</h4>
      <SurveyCards></SurveyCards>
      <Link to="/surveys/new">
        <div style={{ position: "fixed", bottom: "40px", right: "70px" }}>
          <img src={require("./icons8-plus-64.png")} alt="" srcset="" />
        </div>
      </Link>
    </div>
  );
}

// const mapStateToProps = ({ surveys }) => {
//   return { surveys };
// };
const mapDispatchToProps = (dispatch) => {
  return {
    fetchSurveys: () => dispatch(fetchSurveys()),
  };
};

export default connect(null, mapDispatchToProps)(Dashboard);
