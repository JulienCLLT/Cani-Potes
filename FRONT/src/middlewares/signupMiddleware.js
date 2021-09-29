/* eslint-disable linebreak-style */

import { axiosInstance } from '../services/axios';
import {
  USER_SIGNUP, DOG_SIGN_UP, GET_DOG_BREEDS_AND_BEHAVIORS,
  saveDogBreedsAndBehaviors, failedToSignup, nextSignupFormStep,
} from '../actions/signup';

import { connectUser } from '../actions/users';

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
          console.log('response', response);
          // wait for user from db
          store.dispatch(connectUser(response.data.authozization));
          store.dispatch(nextSignupFormStep());
        }).catch((error) => {
          store.dispatch(failedToSignup(error.response.data));
          console.log('error', error.response.data);
        });
      next(action);
      break;
    }

    case DOG_SIGN_UP: {
      const {
        surname, breed, weight, sexe, birthday, sterilization, behavior, photo, dog_owner_id,
      } = action.dogForm;

      axiosInstance.post('/profile/:id.profile/dogs/:id.dog', {
        surname,
        breed_id: breed,
        weight,
        gender_id: Number(sexe),
        birthday,
        sterilization: Boolean(sterilization),
        behavior_id: Number(behavior),
        photo,
        dog_owner_id, //  manque le json
      })
        .then((response) => {
          console.log(response.data);
          // wait for user from db
          store.dispatch(connectUser(response.data.authozization));
          store.dispatch(nextSignupFormStep());
          next(action);
        }).catch((error) => {
          console.log(error);
        });
      break;
    }

    case GET_DOG_BREEDS_AND_BEHAVIORS: {
      axiosInstance.get('/characteristic')
        .then((response) => {
          console.log('response.data', response.data);
          store.dispatch(saveDogBreedsAndBehaviors(response.data));
        }).catch((error) => console.log('get dog breeds and behaviors error', error));
      next(action);
      break;
    }
    default:
      next(action);
  }
};

export default signupMiddleware;
