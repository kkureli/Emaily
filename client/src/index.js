import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import rootReducer from "./reducers/rootReducer";
// const store = createStore(() => [], {}, applyMiddleware()); //{} initial state icin empty object
const store = createStore(rootReducer, applyMiddleware(reduxThunk));
ReactDOM.render(
  <Provider store={store}>
    <App></App>
  </Provider>,
  document.querySelector("#root")
);
