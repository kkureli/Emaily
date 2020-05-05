import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import { withRouter } from "react-router-dom";
function SurveyFormReview({ onCancel, formValues, submitSurvey, history }) {
  return (
    <div>
      <h5>Please Confirm your entries</h5>
      <div>
        <div className="mt-3">
          <label>Survey Title:</label>
          <div>{formValues.title}</div>
        </div>
        <div className="mt-3">
          <label>Subject Line:</label>
          <div>{formValues.subject}</div>
        </div>
        <div className="mt-3">
          <label>Email Body:</label>
          <div>{formValues.body}</div>
        </div>
        <div className="mt-3">
          <label>Recipient List:</label>
          <div>{formValues.recipients}</div>
        </div>
      </div>
      <button onClick={onCancel} type="button" className="btn btn-primary mt-3">
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        type="button"
        className="btn btn-warning mt-3 ml-3"
      >
        Send Survey
      </button>
    </div>
  );
}

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
