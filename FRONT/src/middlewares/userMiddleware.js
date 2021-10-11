/* eslint-disable linebreak-style */
import axios from 'axios';
import {
  GET__ONE__USER__BY__ID, UPDATE__USER, GET__RIDES__WITH__USER__IN,
  DELETE__DOG, DELETE__USER, UPDATE__DOG, DELETE__DOG__PHOTO,
  logoutUser, saveProfileInState, addRidesToUser, renderAgain, updateUserCoord,
} from '../actions/users';
import { dburlWithApi } from '../utils/dburl';

const userMiddleware = (store) => (next) => (action) => {
  const axiosInstance = axios.create({
    baseURL: dburlWithApi,
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
          const { data: profile } = response;
          if (profile.dogs === null) {
            profile.dogs = [];
          }

          const userId = store.getState().user.id;

          store.dispatch(saveProfileInState(profile, userId));
          console.log('User send by db : ', response);
        })
        .catch((error) => {
          if (error.response.data.name === 'TokenExpiredError') {
            localStorage.removeItem('user');
            store.dispatch(logoutUser());
          }
          console.error("Can't get profile : ", error.response.data);
        });
      break;
    case UPDATE__DOG: {
      const {
        surname, behavior, breed, gender, weight, age, sterilization, description, photoDog,
      } = action.updatedDog;

      const formData = new FormData();

      formData.append('surname', surname);
      formData.append('breed_id', breed);
      formData.append('weight', weight);
      formData.append('gender_id', gender);
      if (age) formData.append('birthday', age);
      formData.append('sterilization', sterilization);
      formData.append('description', description);
      formData.append('behavior_id', behavior);
      if (photoDog) formData.append('photo', photoDog);

      axios({
        method: 'PATCH',
        url: `${dburlWithApi}/profile/${action.userId}/dogs/${action.dogId}`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `${store.getState().user.token}`,
        },
      })
        .then((response) => {
          store.dispatch(renderAgain());
          next(action);
          console.log('Dog updated successfully : ', response);
        })
        .catch((error) => {
          if (error.response.data.name === 'TokenExpiredError') {
            localStorage.removeItem('user');
            store.dispatch(logoutUser());
          }
          console.error('Failed to update dog : ', error.response.data);
        });
      break;
    }
    case UPDATE__USER: {
      const {
        firstName, lastName, zipcode, photoUser,
      } = action.user;

      const formData = new FormData();

      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('zip_code', zipcode);
      if (photoUser) formData.append('photo', photoUser);

      axios({
        method: 'PATCH',
        url: `${dburlWithApi}/account/edit`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `${store.getState().user.token}`,
        },
      })
        .then((response) => {
          console.warn('michel');
          store.dispatch(updateUserCoord(response.data.gps));
          store.dispatch(renderAgain());
          next(action);
          console.log('User updated : ', response.data);
        })
        .catch((error) => {
          if (error.response.data.name === 'TokenExpiredError') {
            localStorage.removeItem('user');
            store.dispatch(logoutUser());
          }
          console.error('Cannot update user : ', error.response.message);
        });
      break;
    }
    case GET__RIDES__WITH__USER__IN: {
      axiosInstance
        .get('/ride')
        .then((response) => {
          store.dispatch(addRidesToUser(response.data));
          next(action);
          console.log('User participates to these rides : ', response);
        })
        .catch((error) => {
          if (error.response.data.name === 'TokenExpiredError') {
            localStorage.removeItem('user');
            store.dispatch(logoutUser());
          }
          console.error("Can't get rides within the user : ", error.response.data);
        });
      break;
    }
    case DELETE__DOG__PHOTO:
      axiosInstance
        .delete(`/profile/${action.userId}/dogs/${action.dogId}/photo/${action.photoId}`)
        .then((response) => {
          store.dispatch(renderAgain());
          console.log('Photo deleted successfully : ', response);
        })
        .catch((error) => {
          if (error.response.data.name === 'TokenExpiredError') {
            localStorage.removeItem('user');
            store.dispatch(logoutUser());
          }
          console.error('Unable to delete photo : ', error.response.data);
        });
      break;
    case DELETE__DOG:
      axiosInstance
        .delete(`profile/${action.userId}/dogs/${action.dogId}`)
        .then((response) => {
          store.dispatch(renderAgain());
          next(action);
          console.log('Dog deleted successfully : ', response);
        })
        .catch((error) => {
          if (error.response.data.name === 'TokenExpiredError') {
            localStorage.removeItem('user');
            store.dispatch(logoutUser());
          }
          console.error('Failed to delete dog : ', error.response.data);
        });
      break;
    case DELETE__USER:
      axiosInstance
        .delete('/account/delete')
        .then((response) => {
          store.dispatch(logoutUser());
          console.log('User deleted successfully : ', response);
        })
        .catch((error) => {
          if (error.response.data.name === 'TokenExpiredError') {
            localStorage.removeItem('user');
            store.dispatch(logoutUser());
          }
          console.error('Failed to delete account : ', error.response.data);
        });
      break;
    default:
      next(action);
  }
};

export default userMiddleware;
