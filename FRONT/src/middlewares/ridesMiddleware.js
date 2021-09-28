/* eslint-disable linebreak-style */
import axios from 'axios';
import { GET__ALL__RIDES, saveAllRides } from '../actions/rides';

const axiosInstance = axios.create({
  baseURL: 'http://107.22.144.90/api',
});

const ridesMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case GET__ALL__RIDES:
      axiosInstance
        .get('/rides')
        .then(
          (response) => {
            store.dispatch(saveAllRides(response.data));
          },
        )
        .catch(
          (error) => console.log('erreur : ', error),
        );
      next(action);
      break;
    default:
      next(action);
      break;
  }
};

export default ridesMiddleware;
