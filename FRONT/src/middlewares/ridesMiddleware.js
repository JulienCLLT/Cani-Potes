import axios from 'axios';
import { GET__ALL__RIDES, saveAllRides } from '../actions/rides';

const axiosInstance = axios.create({
  baseURL: 'https://canipotes.herokuapp.com/api',
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
