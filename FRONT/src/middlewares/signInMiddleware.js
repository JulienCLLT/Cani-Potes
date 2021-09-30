/* eslint-disable linebreak-style */
import { axiosInstance } from '../services/axios';
import { connectUser, LOGIN__USER, failedToConnect } from '../actions/users';

const signinMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case LOGIN__USER: {
      const { email, password } = action.data;

      axiosInstance.post('/login', {
        email,
        password,
      })
        .then((response) => {
          console.log('user connect : ', response);
          // wait for user from db
          store.dispatch(connectUser(response.data.authozization));
        }).catch((error) => {
          console.error(error);
          store.dispatch(failedToConnect());
        });
      break;
    }
    default:
      next(action);
  }
};

export default signinMiddleware;
