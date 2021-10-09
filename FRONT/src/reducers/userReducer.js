/* eslint-disable linebreak-style */
import {
  LOGOUT__USER, FAILED__TO__CONNECT, CONNECT__USER, ADD__RIDES__TO__USER,
  DELETE__DOG, SAVE__USER__DOGS__IN__STATE, REINIT__RENDER__AGAIN, RENDER__AGAIN, UPDATE__USER,
} from '../actions/users';
import { ADD_DOG_TO_USER } from '../actions/signup';

const userInitialState = {
  id: 0,
  first_name: '',
  position: [],
  dogs: [],
  token: '',
  isLogged: false,
  failedToConnect: false,
  ride_id: [],
  rides: [],
  renderAgain: false,
};

const parsedUser = JSON.parse(localStorage.getItem('user'));

const userReducer = (state = parsedUser || userInitialState, action = {}) => {
  switch (action.type) {
    case CONNECT__USER:
      return {
        ...state,
        id: action.user.id,
        first_name: action.user.first_name,
        position: action.user.position,
        ride_id: action.user.ride_id,
        token: action.token,
        isLogged: true,
      };
    case UPDATE__USER:
      return {
        ...state,
        first_name: action.firstName,
        lastName: action.lastName,
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
    case RENDER__AGAIN:
      return {
        ...state,
        renderAgain: true,
      };
    case REINIT__RENDER__AGAIN:
      return {
        ...state,
        renderAgain: false,
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

export default userReducer;
