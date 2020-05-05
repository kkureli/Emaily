import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
class SurveyForm extends Component {
  renderFields() {
    return (
      <div className="mt-3">
        <div>
          <label>Survey Title</label>
          <div>
            <Field type="text" name="title" component={SurveyField} />
          </div>
        </div>
        <div>
          <label>Subject Line</label>
          <div>
            <Field type="text" name="subject" component={SurveyField} />
          </div>
        </div>
        <div>
          <label>Email Body</label>
          <div>
            <Field type="text" name="body" component={SurveyField} />
          </div>
        </div>
        <div>
          <label>Recipient List</label>
          <div>
            <Field type="text" name="recipients" component={SurveyField} />
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <Container>
        <div>
          <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
            {this.renderFields()}
            <div className="mt-3">
              <Link to="/surveys">
                <button type="submit" className="btn btn-danger mr-3">
                  Cancel
                </button>
              </Link>
              <button type="submit" className="btn btn-primary">
                Next
              </button>
            </div>
          </form>
        </div>
      </Container>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "You must provide a title";
  }
  if (!values.subject) {
    errors.subject = "You must provide a subject";
  }
  if (!values.body) {
    errors.body = "You must provide a body";
  }
  if (!values.recipients) {
    errors.recipients = "You must provide emails";
  }

  errors.recipients = validateEmails(values.recipients || "");

  return errors;
}

export default reduxForm({
  validate: validate,
  form: "surveyForm",
  destroyOnUnmount: false,
})(SurveyForm);
