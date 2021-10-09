/* eslint-disable linebreak-style */
import axios from 'axios';
import { connectUser, LOGIN__USER, failedToConnect } from '../actions/users';
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
          store.dispatch(connectUser(response.data.authorization, response.data));

          localStorage.setItem('user', JSON.stringify({
            id: response.data.id,
            first_name: response.data.first_name,
            position: response.data.position,
            token: response.data.authorization,
            isLogged: true,
            failedToConnect: false,
            ride_id: response.data.ride_id,
            rides: [],
            renderAgain: false,
          }));

          console.log('user connect : ', response);
        }).catch((error) => {
          store.dispatch(failedToConnect());
          console.error(error.reponse.data);
        });
      break;
    }
    default:
      next(action);
  }
};

export default signinMiddleware;
