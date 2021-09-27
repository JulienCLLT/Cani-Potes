import axios from 'axios';
import { connectUser, LOGIN__USER } from '../actions/users';

const axiosInstance = axios.create({
  baseURL: 'http://107.22.144.90/api',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

const signinMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case LOGIN__USER: {
      const { email, password } = action.data;

      axiosInstance.post('/login', {
        email,
        password,
      })
        .then((response) => {
          // const req = new XMLHttpRequest()
          // req.open('GET', document.location, false);
          // req.send(null);
          // const headers = req.getAllResponseHeaders().toLowerCase();
          // console.log(headers);
          console.log(response.headers);
          // console.log(axiosInstance());
          // store.dispatch(connectUser());
        }).catch((error) => {
          console.error(error);
        });
      break;
    }
    default:
      next(action);
  }
};

export default signinMiddleware;
