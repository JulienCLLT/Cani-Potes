/* eslint-disable linebreak-style */
import { GET__PROFILE__IS__LOADING, SAVE__PROFILE__IN__STATE } from '../actions/users';

const profileInitialState = {
  membre_id: 0,
  first_name: '',
  last_name: '',
  photo: '',
  zip_code: 12345,
  dogs: [],
  birthday: '',
  isLoading: false,
};

const profileReducer = (state = profileInitialState, action = {}) => {
  switch (action.type) {
    case GET__PROFILE__IS__LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case SAVE__PROFILE__IN__STATE:
      return {
        ...state,
        ...action.profile,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default profileReducer;
