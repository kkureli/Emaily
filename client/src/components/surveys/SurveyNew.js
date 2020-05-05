import React, { useState } from "react";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

function SurveyNew({ auth }) {
  const [formReview, setFormReview] = useState(false);

  const renderContent = () => {
    if (auth && auth.credits < 5) {
      return <h2>You need minimum 5 credits to create survey.</h2>;
    } else {
      if (formReview) {
        return (
          <SurveyFormReview
            onCancel={() => setFormReview(false)}
          ></SurveyFormReview>
        );
      }
      return (
        <SurveyForm onSurveySubmit={() => setFormReview(true)}></SurveyForm>
      );
    }
  };

  return <div>{renderContent()}</div>;
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

SurveyNew = connect(mapStateToProps, null)(SurveyNew);

export default reduxForm({
  form: "surveyForm",
})(SurveyNew);
