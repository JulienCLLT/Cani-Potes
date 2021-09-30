/* eslint-disable linebreak-style */
import { LOGOUT__USER, FAILED__TO__CONNECT, CONNECT__USER } from '../actions/users';

const userInitialState = {
  id: 1,
  first_name: '',
  position: [43.5667, 4.0833],
  dogs: [
    {
      dog_id: 101,
      dog_photo: "img12.jpg",
      dog_surname: "Riri",
      dog_photo_id: 9,
    },
    {
      dog_id: 102,
      dog_photo: "img14.jpg",
      dog_surname: "Fifi",
      dog_photo_id: 11,
    },
  ],
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
    case LOGOUT__USER:
      return {
        ...userInitialState,
      };
    default:
      return state;
  }
};

export default userReducer;
