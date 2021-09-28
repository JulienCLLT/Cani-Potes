/* eslint-disable linebreak-style */

import axios from 'axios';
import { USER_SIGNUP, DOG_SIGN_UP } from '../actions/signup';

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

    // case DOG_SIGN_UP: {
    //   const {
    //     surname, breed_id, birthday, sterilization, behavior_id, dog_owner_id,
    //   } = action.dogForm;

    //   axiosInstance.post('/profile/:id.profile/dogs/:id.dog', {
    //     surname, breed_id, birthday, sterilization, behavior_id, dog_owner_id,
    //   })
    //     .then((response) => {
    //       console.log(response.data);
    //       next(action);
    //     }).catch((error) => {
    //       console.log(error);
    //     });
    //   break;
    // }
    default:
      next(action);
  }
};

export default signupMiddleware;
