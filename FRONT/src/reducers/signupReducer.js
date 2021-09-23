/* eslint-disable linebreak-style */
import { CLICK_CONTINUE_USER, CLICK_CONTINUE_DOG } from '../actions/signup';

const initialState = {

  // signup informations bdd
  // user
  email: '',
  password: '',
  password_confirmation: '',
  first_name: '',
  last_name: '',
  photo: '',
  zipcode: '',
  // dog
  surname: '',
  breed_id: '',
  weight: '',
  gender_id: '',
  birthday: '', // AAAA-MM-DD in bdd
  sterilization: '', // boolean in bdd
  behavior: '', // behavior_id in bdd

  // for timeline
  isUserFormComplete: false,
  isDogFormComplete: false,
  // valider, en cours, masquer

  // for continue button
  isUserFormHide: false,
  isDogFormHide: true,
  isEndFormHide: true,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    // case 'SET_FIELD':
    //   return {
    //     ...state,
    //     [action.fieldName]: action.value,
    //   };
    case CLICK_CONTINUE_USER:
      return {
        ...state,
        isUserFormHide: true,
        isDogFormHide: false,
      };

    case CLICK_CONTINUE_DOG:
      return {
        ...state,
        isDogFormHide: true,
        isEndFormHide: false,
      };
    default:
      return state;
  }
};
export default reducer;
