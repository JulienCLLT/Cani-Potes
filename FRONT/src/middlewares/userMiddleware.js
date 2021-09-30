/* eslint-disable linebreak-style */
import axios from 'axios';
import { GET__ONE__USER__BY__ID } from '../actions/users';

// const axiosInstance = axios.create({
//   baseURL: 'http://107.22.144.90/api',
//   headers: {
//     'Access-Control-Allow-Origin': '*',
//   },
// });

const userMiddleware = (store) => (next) => (action) => {
  const axiosInstance = axios.create({
    baseURL: 'http://107.22.144.90/api',
    headers: {
      'Access-Control-Allow-Origin': '*',
      authorization: `Bearer ${store.getState().user.token}`,
    },
  });

  switch (action.type) {
    case GET__ONE__USER__BY__ID:
      axiosInstance
        .get(`/social/profile/${action.id}`)
        .then((response) => {
          // todo wait for data from db
          console.log(response);
        })
        .catch((error) => {
          console.error("Can't get profile : ", error.response.data);
        });
      break;
    default:
      next(action);
  }
};

export default userMiddleware;
