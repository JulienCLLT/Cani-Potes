/* eslint-disable linebreak-style */
import { axiosInstance } from '../services/axios';
import {
  GET__ALL__RIDES, GET__ONE__RIDE__BY__ID, DELETE__RIDE, ADD__USER__TO__RIDE,
  saveAllRides, saveOneRide, deleteRideInState,
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
            console.log(response);
            store.dispatch(saveOneRide(response.data[0]));
          },
        )
        .catch(
          (error) => console.log('erreur : ', error),
        );
      break;
    case ADD__USER__TO__RIDE:
      axiosInstance
        .post(`/ride/${action.rideId}/participation`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("Can't join the ride : ", error);
        });
      break;
    case DELETE__RIDE:
      axiosInstance
        .delete(`/ride/${action.id}`)
        .then(
          (response) => {
            console.log('Ride deleted successfully : ', response);
            store.dispatch(deleteRideInState(action.id));
          },
        )
        .catch(
          (error) => console.error("Can't delete ride : ", error),
        );
      break;
    default:
      next(action);
      break;
  }
};

export default ridesMiddleware;
