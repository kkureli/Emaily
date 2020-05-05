import React from "react";
import Form from "react-bootstrap/Form";
function SurveyField({ input, meta: { error, touched } }) {
  return (
    <div className="mb-3">
      <Form.Control {...input} />
      <div className="text-danger">{touched && error}</div>
    </div>
  );
}

export default SurveyField;
