import React from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import moment from "moment";

function SurveyCards({ surveys }) {
  return (
    <Row>
      {surveys &&
        surveys.map((survey) => {
          return (
            <Col className="mt-3" style={{ display: "flex" }}>
              <Card
                bg="info"
                text="white"
                style={{ width: "18rem", display: "flex" }}
              >
                <Card.Body>
                  <Card.Title>Title: {survey.title}</Card.Title>
                  <Card.Text>Subject: {survey.subject}</Card.Text>
                  <Card.Text>Yes: {survey.yes}</Card.Text>
                  <Card.Text>No: {survey.no}</Card.Text>
                  <Card.Text>Date: {survey.dateSent.slice(0, 10)}</Card.Text>
                  <Card.Text>
                    Recipients:
                    {survey &&
                      survey.recipients.map((recipient) => {
                        return recipient.email;
                      })}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
    </Row>
  );
}

const mapStateToProps = ({ surveys }) => {
  return { surveys };
};

export default connect(mapStateToProps, null)(SurveyCards);
