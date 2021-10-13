/* eslint-disable linebreak-style */
import {
  NEXT_SIGNUP_FORM_STEP, SAVE_DOG_BREEDS_AND_BEHAVIORS, FAILED_TO_SIGNUP,
  FORMSTEP_SHOWS_DOGFORM, END_OF_SIGNUP, SHOW_DOGFORM,
} from '../actions/signup';
import { LOGOUT__USER } from '../actions/users';

const initialState = {

  // to have behaviors and breeds
  behaviors: [],
  breeds: [],

  // for continue and previous button
  formStep: 1,

  // to display db errors when submit form
  failedToSignup: false,

  // manage unable to redirect after ending signup process
  endSignUp: false,
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
    case FORMSTEP_SHOWS_DOGFORM:
      return {
        ...state,
        formStep: 2,
      };
    case END_OF_SIGNUP:
      return {
        ...state,
        endSignUp: true,
      };
    case SHOW_DOGFORM:
      return {
        ...state,
        formStep: 2,
      };
    case LOGOUT__USER:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
export default reducer;
