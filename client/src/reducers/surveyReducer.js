import { FETCH_SURVEYS } from "../actions/actionTypes";

const surveyReducer = (state = null, action) => {
  console.log(action, "act");

  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;

    default:
      return state;
  }
};

export default surveyReducer;
