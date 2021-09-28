/* eslint-disable linebreak-style */
import { NEXT_SIGNUP_FORM_STEP, SAVE_DOG_BREEDS_AND_BEHAVIORS } from '../actions/signup';

const initialState = {

  // to have beahaviors and breeds
  behaviors: [],
  breeds: [],

  // for continue and previous button
  formStep: 1,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case NEXT_SIGNUP_FORM_STEP:
      return {
        ...state,
        formStep: state.formStep + 1,
        isSubmitSuccessfull: false,
      };

    case SAVE_DOG_BREEDS_AND_BEHAVIORS:
      return {
        ...state,
        behaviors: action.allBehaviorsAndBreeds.behaviors,
        breeds: action.allBehaviorsAndBreeds.breeds,
      };
    default:
      return state;
  }
};
export default reducer;
