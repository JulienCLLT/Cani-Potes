/* eslint-disable linebreak-style */
import { LOGOUT__USER, FAILED__TO__CONNECT, CONNECT__USER, ADD__RIDES__TO__USER, DELETE__DOG, SAVE__USER__DOGS__IN__STATE } from '../actions/users';
import { ADD_DOG_TO_USER } from '../actions/signup';
import { DELETE__DOG__PHOTO } from './../actions/users';

const userInitialState = {
  id: 0,
  first_name: '',
  position: [],
  dogs: [],
  token: '',
  isLogged: false,
  failedToConnect: false,
  rides: [],
};

const userReducer = (state = userInitialState, action = {}) => {
  switch (action.type) {
    case CONNECT__USER:
      return {
        ...state,
        id: action.user.id,
        first_name: action.user.first_name,
        position: action.user.position,
        rideId: action.user.ride_id,
        token: action.token,
        isLogged: true,
      };
    case FAILED__TO__CONNECT:
      return {
        ...state,
        failedToConnect: true,
      };
    case SAVE__USER__DOGS__IN__STATE:
      return {
        ...state,
        dogs: [
          ...action.dogs.dogs,
        ],
      };
    case ADD_DOG_TO_USER:
      return {
        ...state,
        dogs: [
          ...state.dogs,
          {
            ...action.dog,
          },
        ],
      };
    case LOGOUT__USER:
      return {
        ...userInitialState,
      };
    case ADD__RIDES__TO__USER:
      return {
        ...state,
        rides: action.rides,
      };
    // case DELETE__DOG__PHOTO:
    //   return {
    //     ...state,
    //     dogs: 
    //   };
    case DELETE__DOG:
      return {
        ...state,
        dogs: state.dogs.filter((dog) => dog.dog_id !== action.dogId),
      };
    default:
      return state;
  }
};

export default userReducer;
