/* eslint-disable linebreak-style */
import axios from 'axios';
import {
  connectUser, LOGIN__USER, failedToConnect, saveUserDogsInState,
} from '../actions/users';
import { dburlWithApi } from '../utils/dburl';

const signinMiddleware = (store) => (next) => (action) => {
  const axiosInstance = axios.create({
    baseURL: dburlWithApi,
    headers: {
      'Access-Control-Allow-Origin': '*',
      authorization: `${store.getState().user.token}`,
    },
  });

  switch (action.type) {
    case LOGIN__USER: {
      const { email, password } = action.data;

      axiosInstance.post('/login/', {
        email,
        password,
      })
        .then((response) => {
          console.log('user connect : ', response);
          // get user's dogs with another request
          axios({
            method: 'GET',
            url: `${dburlWithApi}/social/profile/${response.data.id}`,
            headers: {
              'Access-Control-Allow-Origin': '*',
              authorization: `${response.data.authorization}`,
            },
          })
            .then((responseDogs) => {
              store.dispatch(connectUser(response.data.authorization, response.data));
              store.dispatch(saveUserDogsInState(responseDogs.data.dogs));

              localStorage.setItem('user', JSON.stringify({
                id: response.data.id,
                first_name: response.data.first_name,
                position: response.data.position,
                dogs: responseDogs.data.dogs,
                token: response.data.authorization,
                isLogged: true,
                failedToConnect: false,
                ride_id: response.data.ride_id,
                rides: [],
                renderAgain: false,
              }));

              console.log('User send by db : ', response);
            })
            .catch((errorDogs) => {
              console.error(errorDogs.response.data);
            });
        }).catch((error) => {
          store.dispatch(failedToConnect());
          console.error(error.response.data);
        });
      break;
    }
    default:
      next(action);
  }
};

export default signinMiddleware;
