/* eslint-disable linebreak-style */
import axios from 'axios';
import {
  USER_SIGNUP, DOG_SIGN_UP, GET_DOG_BREEDS_AND_BEHAVIORS,
  saveDogBreedsAndBehaviors, failedToSignup, nextSignupFormStep, addDogToUser,
} from '../actions/signup';

import { connectUser, logoutUser } from '../actions/users';
import { dburlWithApi } from '../utils/dburl';

const signupMiddleware = (store) => (next) => (action) => {
  const axiosInstance = axios.create({
    baseURL: dburlWithApi,
    headers: {
      'Access-Control-Allow-Origin': '*',
      authorization: `${store.getState().user.token}`,
    },
  });

  switch (action.type) {
    case USER_SIGNUP: {
      const {
        first_name, last_name, email, password, birthday_user, zip_code, photo,
      } = action.userForm;

      const formData = new FormData();

      formData.append('first_name', first_name);
      formData.append('last_name', last_name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('birthday', birthday_user);
      formData.append('zip_code', zip_code);
      if (photo[0]) formData.append('photo', photo[0]);

      axios({
        method: 'POST',
        url: `${dburlWithApi}/subscribe`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `${store.getState().user.token}`,
        },
      })
        .then((response) => {
          store.dispatch(connectUser(response.data.authorization, response.data));
          store.dispatch(nextSignupFormStep());
          console.log('response', response);
        }).catch((error) => {
          store.dispatch(failedToSignup(error.response.data));
          console.error('error', error.response.data);
        });
      next(action);
      break;
    }

    case DOG_SIGN_UP: {
      const {
        surname, breed, weight, sexe, birthday, sterilization, behavior,
        photo_dog, dog_owner_id, description,
      } = action.dogForm;

      const formData = new FormData();

      formData.append('photo', photo_dog[0]);
      formData.append('surname', surname);
      formData.append('breed_id', breed);
      formData.append('weight', weight);
      formData.append('gender_id', sexe);
      formData.append('birthday', birthday);
      formData.append('sterilization', sterilization);
      formData.append('behavior_id', behavior);
      formData.append('dog_owner_id', dog_owner_id);
      formData.append('description', description);

      axios({
        method: 'POST',
        url: `${dburlWithApi}/profile/${store.getState().user.id}/dogs`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `${store.getState().user.token}`,
        },
      })
        .then((response) => {
          store.dispatch(addDogToUser(response.data));
          store.dispatch(nextSignupFormStep());
          next(action);
          console.log(response.data);
        }).catch((error) => {
          if (error.response.data.name === 'TokenExpiredError') {
            localStorage.removeItem('user');
            store.dispatch(logoutUser());
          }
          console.error(error.response.data);
        });
      break;
    }

    case GET_DOG_BREEDS_AND_BEHAVIORS: {
      axiosInstance.get('/characteristic')
        .then((response) => {
          store.dispatch(saveDogBreedsAndBehaviors(response.data));
        })
        .catch((error) => console.error('get dog breeds and behaviors error', error.response.data));
      next(action);
      break;
    }
    default:
      next(action);
  }
};

export default signupMiddleware;
