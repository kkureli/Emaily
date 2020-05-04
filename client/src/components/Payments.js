import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { handleToken } from "../actions/actions";

class Payments extends Component {
  render() {
    return (
      <>
        <StripeCheckout
          name="Emaily"
          description="$5 for 5 email credits"
          amount={500}
          token={(token) => this.props.handleToken(token)}
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
        >
          <Button variant="success">Add Credits</Button>
        </StripeCheckout>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleToken: (token) => dispatch(handleToken(token)),
  };
};

export default connect(null, mapDispatchToProps)(Payments);
