import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import Landing from "../components/Landing";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import { fetchUser } from "../actions/actions";

const App = (props) => {
  useEffect(() => {
    props.fetchUser();
  }, [props]);

  return (
    <Container>
      <BrowserRouter>
        <Header></Header>
        <Route exact path="/" component={Landing}></Route>
        {/* <Route exact path="/" component={Landing}></Route>
        <Route exact path="/surveys" component={Dashboard}></Route>
        <Route path="/surveys/new" component={SurveyNew}></Route> */}
      </BrowserRouter>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
  };
};

export default connect(null, mapDispatchToProps)(App);
