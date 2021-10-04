/* eslint-disable linebreak-style */
import { LOGOUT__USER, FAILED__TO__CONNECT, CONNECT__USER } from '../actions/users';
import { ADD_DOG_TO_USER } from '../actions/signup';

const userInitialState = {
  id: 0,
  first_name: '',
  position: [],
  dogs: [],
  token: '',
  isLogged: false,
  failedToConnect: false,
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
    default:
      return state;
  }
};

export default userReducer;
