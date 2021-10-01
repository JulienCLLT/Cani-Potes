/* eslint-disable linebreak-style */
import axios from 'axios';
import { GET__ONE__USER__BY__ID, saveProfileInState, UPDATE__USER } from '../actions/users';

const userMiddleware = (store) => (next) => (action) => {
  const axiosInstance = axios.create({
    baseURL: 'http://107.22.144.90/api',
    headers: {
      'Access-Control-Allow-Origin': '*',
      authorization: `${store.getState().user.token}`,
    },
  });

  switch (action.type) {
    case GET__ONE__USER__BY__ID:
      axiosInstance
        .get(`/social/profile/${action.id}`)
        .then((response) => {
          console.warn(response)
          const { data: profile } = response;
          if (profile.dogs === null) {
            profile.dogs = [];
          }
          store.dispatch(saveProfileInState(profile));
        })
        .catch((error) => {
          console.error("Can't get profile : ", error.response.data);
        });
      break;
    case UPDATE__USER: {
      const {
        firstName, lastName, zipcode, photoUser,
      } = action.user;
      const formData = new FormData();

      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('zipcode', zipcode);
      formData.append('photo', photoUser);

      axiosInstance
        .patch('/account/edit')
        .then((response) => {
          console.log("User updated : ", response.data);
          next(action);
        })
        .catch((error) => console.error('Cannot update user : ', error.response.message));
      break;
    }
    default:
      next(action);
  }
};

export default userMiddleware;
