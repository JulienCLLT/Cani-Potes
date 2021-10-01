/* eslint-disable linebreak-style */
import axios from 'axios';
import {
  USER_SIGNUP, DOG_SIGN_UP, GET_DOG_BREEDS_AND_BEHAVIORS,
  saveDogBreedsAndBehaviors, failedToSignup, nextSignupFormStep,
} from '../actions/signup';

import { connectUser } from '../actions/users';

const signupMiddleware = (store) => (next) => (action) => {
  const axiosInstance = axios.create({
    baseURL: 'http://107.22.144.90/api',
    headers: {
      'Access-Control-Allow-Origin': '*',
      authorization: `${store.getState().user.token}`,
    },
  });

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
          store.dispatch(connectUser(response.data.authorization, response.data));
          store.dispatch(nextSignupFormStep());
        }).catch((error) => {
          store.dispatch(failedToSignup(error.response.data));
          console.error('error', error.response.data);
        });
      next(action);
      break;
    }

    case DOG_SIGN_UP: {
      const {
        surname, breed, weight, sexe, birthday, sterilization, behavior, photo, dog_owner_id,
      } = action.dogForm;

      // transform data into formData to be able to use mutler
      const formData = new FormData();

      formData.append('photo', photo);
      formData.append('surname', surname);
      formData.append('breed', breed);
      formData.append('weight', weight);
      formData.append('gender', sexe);
      formData.append('birthday', birthday);
      formData.append('sterilization', sterilization);
      formData.append('behavior', behavior);
      formData.append('dog_owner_id', dog_owner_id);

      // axiosInstance.post('/profile/:id.profile/dogs', {
      //   surname,
      //   breed_id: breed,
      //   weight,
      //   gender_id: Number(sexe),
      //   birthday,
      //   sterilization: Boolean(sterilization),
      //   behavior_id: Number(behavior),
      //   photo,
      //   dog_owner_id, //  manque le json
      // })
      axios({
        method: 'POST',
        url: `/profile/${store.getState().user.id}/dogs`,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((response) => {
          console.log(response.data);
          store.dispatch(connectUser(response.data.authozization));
          store.dispatch(nextSignupFormStep());
          next(action);
        }).catch((error) => {
          console.error(error.response.data);
        });
      break;
    }

    case GET_DOG_BREEDS_AND_BEHAVIORS: {
      axiosInstance.get('/characteristic')
        .then((response) => {
          store.dispatch(saveDogBreedsAndBehaviors(response.data));
        }).catch((error) => console.error('get dog breeds and behaviors error', error.response.data));
      next(action);
      break;
    }
    default:
      next(action);
  }
};

export default signupMiddleware;
