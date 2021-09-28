/* eslint-disable linebreak-style */

import axios from 'axios';
import { USER_SIGNUP } from '../actions/signup';

const axiosInstance = axios.create({
  baseURL: 'http://107.22.144.90/api',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

const signupMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case USER_SIGNUP: {
      const {
        first_name, last_name, email, password, birthday_user, zip_code,
      } = action.userForm;

      axiosInstance.post('/subscribe', {
        email,
        first_name,
        last_name,
        zip_code,
        password,
        birthday: birthday_user,
      })
        .then((response) => {
          console.log(response.data);
          next(action);
        }).catch((error) => {
          console.log(error);
        });
      break;
    }
    default:
      next(action);
  }
};

export default signupMiddleware;
