/* eslint-disable linebreak-style */
import { NEXT_SIGNUP_FORM_STEP, PREVIOUS_SIGNUP_FORM_STEP } from '../actions/signup';

const initialState = {

  // signup informations bdd
  // user
  email: '',
  password: '',
  password_confirmation: '',
  first_name: '',
  last_name: '',
  photo: '',
  zip_code: '',
  // dog
  surname: '',
  breed_id: '',
  weight: undefined,
  gender_id: undefined,
  birthday: '', // AAAA-MM-DD in bdd
  sterilization: false, // boolean in bdd
  behavior: '', // behavior_id in bdd

  // for timeline
  isUserFormComplete: false,
  isDogFormComplete: false,
  // valider, en cours, masquer

  // for continue and previous button
  formStep: 1,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    // case 'SET_FIELD':
    //   return {
    //     ...state,
    //     [action.fieldName]: action.value,
    //   };
    case NEXT_SIGNUP_FORM_STEP:
      return {
        ...state,
        formStep: state.formStep + 1,
      };

    case PREVIOUS_SIGNUP_FORM_STEP:
      return {
        ...state,
        formStep: state.formStep - 1,
      };
    default:
      return state;
  }
};
export default reducer;
