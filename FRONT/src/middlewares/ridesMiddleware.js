/* eslint-disable linebreak-style */
import { axiosInstance } from '../services/axios';
import {
  GET__ALL__RIDES, GET__ONE__RIDE__BY__ID, saveAllRides, saveOneRide,
} from '../actions/rides';

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
