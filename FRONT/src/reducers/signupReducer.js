/* eslint-disable linebreak-style */
import { NEXT_SIGNUP_FORM_STEP, SAVE_DOG_BREEDS_AND_BEHAVIORS, FAILED_TO_SIGNUP } from '../actions/signup';

const initialState = {

  // to have beahaviors and breeds
  behaviors: [],
  breeds: [],

  // for continue and previous button
  formStep: 2,

  // to display db errors when submit form
  failedToSignup: false,
  errorMessage: '',

};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case NEXT_SIGNUP_FORM_STEP:
      return {
        ...state,
        formStep: state.formStep + 1,
        failedToSignup: false,
        errorMessage: '',
      };

    case SAVE_DOG_BREEDS_AND_BEHAVIORS:
      return {
        ...state,
        behaviors: action.allBehaviorsAndBreeds.behaviors,
        breeds: action.allBehaviorsAndBreeds.breeds,
      };

    case FAILED_TO_SIGNUP:
      return {
        ...state,
        failedToSignup: true,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};
export default reducer;
