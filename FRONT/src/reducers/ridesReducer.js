/* eslint-disable linebreak-style */
import {
  ADD__USER__TO__RIDE, REMOVE__USER__FROM__RIDE, ADD__NEW__MESSAGE,
  DELETE__RIDE, SAVE__ALL__RIDES, SAVE__ONE__RIDE,
} from '../actions/rides';

const ridesInitialState = {
  // get all rides from the api within an area
  // ? how to do this with leaflet and SQL ?by city ? by coordinate ?
  allRides: [],
  currentRide: undefined,
};

const ridesReducer = (state = ridesInitialState, action = {}) => {
  switch (action.type) {
    case SAVE__ALL__RIDES:
      return {
        ...state,
        allRides: [
          ...action.allRides,
        ],
      };
    case ADD__USER__TO__RIDE:
      return {
        ...state,
        currentRide: {
          ...state.currentRide,
          participants: [
            ...state.currentRide.participants,
            {
              participant_id: action.participant_id,
              participant_first_name: action.participant_first_name,
              participant_last_name: action.participant_last_name,
              participant_photo: action.participant_photo,
              dogs: action.dogs,
            },
          ],
        },
      };
    case REMOVE__USER__FROM__RIDE:
      return {
        ...state,
        currentRide: {
          ...state.currentRide,
          participants: [
            ...state.currentRide.participants.filter(
              (participant) => participant.participant_id !== action.id,
            ),
          ],
        },
      };
    case ADD__NEW__MESSAGE:
      return {
        ...state,
        currentRide: {
          ...state.currentRide,
          messages: [
            ...state.currentRide.messages,
            {
              sent: new Date().toISOString(),
              message: action.message,
              sender_id: action.sender_id,
              sender_photo: action.sender_photo,
              sender_first_name: action.sender_first_name,
              sender_last_name: action.sender_last_name,
            },
          ],
        },
      };
    case DELETE__RIDE:
      return {
        ...state,
        allRides: state.allRides.map((ride) => ride.ride_id !== action.id),
        currentRide: {
          ...ridesInitialState.currentRide,
        },
      };
    case SAVE__ONE__RIDE:
      return {
        ...state,
        currentRide: action.ride,
      }
    default:
      return state;
  }
};

export default ridesReducer;
