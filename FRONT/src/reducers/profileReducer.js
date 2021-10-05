/* eslint-disable linebreak-style */
import { GET__PROFILE__IS__LOADING, SAVE__PROFILE__IN__STATE, LOGOUT__USER, DELETE__DOG } from '../actions/users';

const profileInitialState = {
  member_id: 0,
  first_name: '',
  last_name: '',
  photo: '',
  zip_code: 12345,
  dogs: [],
  birthday: '',
  isLoading: false,
  profileIsUser: false,
};

const profileReducer = (state = profileInitialState, action = {}) => {
  switch (action.type) {
    case GET__PROFILE__IS__LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case SAVE__PROFILE__IN__STATE:
      action.profile.dogs.forEach((dog) => {
        if (dog.dog_photo === null) {
          dog.dog_photo = [];
        }
      });
      return {
        ...state,
        ...action.profile,
        isLoading: false,
        profileIsUser: action.member_id === action.userId,
      };
    case LOGOUT__USER:
      return {
        ...profileInitialState,
      };
    case DELETE__DOG:
      return {
        ...state,
        dogs: state.dogs.filter((dog) => dog.dog_id !== action.dogId),
      };
    default:
      return state;
  }
};

export default profileReducer;
