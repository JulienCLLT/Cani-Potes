/* eslint-disable linebreak-style */
import { LOGIN__USER, LOGOUT__USER } from '../actions/users';

const userInitialState = {
  id: '',
  first_name: '',
  last_name: '',
  photo: '',
  dogs: [],
  isLogged: false,
};

const userReducer = (state = userInitialState, action = {}) => {
  switch (action.type) {
    case LOGIN__USER:
      // before we can check in db, just simuling connection
      return {
        ...state,
        isLogged: true,
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
