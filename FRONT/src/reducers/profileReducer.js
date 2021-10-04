/* eslint-disable linebreak-style */
import { GET__PROFILE__IS__LOADING, SAVE__PROFILE__IN__STATE, LOGOUT__USER, ADD_DOG_TO_PROFILE } from '../actions/users';

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
    case ADD_DOG_TO_PROFILE:
      return {
        ...state,
        dogs: [
          ...state.dogs,
          {
            ...action.dog,
          },
        ],
      };
    default:
      return state;
  }
};

export default profileReducer;
