/* eslint-disable linebreak-style */
import axios from 'axios';
import { connectUser, LOGIN__USER, failedToConnect } from '../actions/users';

const signinMiddleware = (store) => (next) => (action) => {
  const axiosInstance = axios.create({
    baseURL: 'http://107.22.144.90/api',
    headers: {
      'Access-Control-Allow-Origin': '*',
      authorization: `${store.getState().user.token}`,
    },
  });

  switch (action.type) {
    case LOGIN__USER: {
      const { email, password } = action.data;

      axiosInstance.post('/login', {
        email,
        password,
      })
        .then((response) => {
          console.log('user connect : ', response);
          store.dispatch(connectUser(response.data.authorization, response.data));
        }).catch((error) => {
          console.error(error.reponse.data);
          store.dispatch(failedToConnect());
        });
      break;
    }
    default:
      next(action);
  }
};

export default signinMiddleware;
