/* eslint-disable linebreak-style */
import axios from 'axios';
import {
  GET__ALL__RIDES, GET__ONE__RIDE__BY__ID, saveAllRides, saveOneRide,
} from '../actions/rides';

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
    case GET__ONE__RIDE__BY__ID:
      axiosInstance
        .get(`/ride/${action.id}`)
        .then(
          (response) => {
            console.log(response);
            store.dispatch(saveOneRide(response.data[0]));
          },
        )
        .catch(
          (error) => console.log('erreur : ', error),
        );
      break;
    default:
      next(action);
      break;
  }
};

export default ridesMiddleware;
