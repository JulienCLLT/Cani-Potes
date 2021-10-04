/* eslint-disable linebreak-style */
import axios from 'axios';
import {
  GET__ONE__USER__BY__ID, UPDATE__USER, GET__RIDES__WITH__USER__IN, DELETE__DOG, DELETE__USER,
  logoutUser, saveProfileInState, addRidesToUser,
} from '../actions/users';

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
          console.log('User send by db : ', response);
          const { data: profile } = response;
          if (profile.dogs === null) {
            profile.dogs = [];
          }

          const userId = store.getState().user.id;

          store.dispatch(saveProfileInState(profile, userId));
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
          console.log('User updated : ', response.data);
          next(action);
        })
        .catch((error) => console.error('Cannot update user : ', error.response.message));
      break;
    }
    case GET__RIDES__WITH__USER__IN: {
      axiosInstance
        .get('/ride')
        .then((response) => {
          console.log('User participates to these rides : ', response);
          store.dispatch(addRidesToUser(response.data));
        })
        .catch((error) => {
          console.error("Can't get rides within the user : ", error.response.data);
        });
      break;
    }
    case DELETE__DOG:
      axiosInstance
        .delete(`profile/${action.userId}/dogs/${action.dogId}`)
        .then((response) => {
          console.log('Dog deleted successfully : ', response);
          next(action);
        })
        .catch((error) => {
          console.error('Failed to delete dog : ', error.response.data);
        });
      break;
    case DELETE__USER:
      axiosInstance
        .delete('/account/delete')
        .then((response) => {
          console.log('User deleted successfully : ', response);
          store.dispatch(logoutUser());
        })
        .catch((error) => {
          console.error('Failed to delete account : ', error.response.data);
        });
      break;
    default:
      next(action);
  }
};

export default userMiddleware;
