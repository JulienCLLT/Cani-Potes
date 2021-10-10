/* eslint-disable linebreak-style */
import { GET__RIDES__WITH__USER__IN, LOGOUT__USER } from '../actions/users';
import {
  ADD__USER__TO__RIDE, USER__QUIT__RIDE, ADD__MESSAGE__IN__STATE,
  DELETE__RIDE__IN__STATE, SAVE__ALL__RIDES, SAVE__ONE__RIDE, GET__RIDE__IS__LOADING,
  FAILED_TO_CREATE_RIDE, KICK__USER__FROM__RIDE, CREATE_RIDE, SET__ERROR__MSG,
} from '../actions/rides';

const ridesInitialState = {
  allRides: [],
  currentRide: {
    isLoading: true,
    ride_id: 0,
    title: '',
    description: '',
    start_coordinate: [
      0,
      0,
    ],
    end_coordinate: [
      0,
      0,
    ],
    starting_time: '', // translate into le 15 sept 2021 à 18h30
    duration: {
      minutes: 0,
    },
    max_number_dogs: 0,
    tag_label: '',
    host_id: 0,
    host_first_name: '',
    messages: [
      {
        message_id: 1,
        sent: '', // translate into il y a ... min / heures / jours
        message: '',
        sender_id: 0,
        sender_photo: '',
        sender_first_name: '',
      },
    ],
    participants: [
      {
        dogs: [
          {
            dog_photo: [
              {
                photo_id: 0,
                photo_url: '',
              },
            ],
            dog_id: 0,
            dog_surname: '',
            dog_behavior: '',
            dog_breed: '',
            dog_gender: '',
            dog_weight: '',
            dog_age: 0, // number of months
            dog_sterilization: false,
            dog_description: '',
          },
        ],
        participant_id: 0,
        participant_photo: '',
        participant_first_name: '',
      },
    ],
  },
  failedToCreateRide: false,
  rideIsCreated: false,
  errorMessage: '',
};

const ridesReducer = (state = ridesInitialState, action = {}) => {
  switch (action.type) {
    case SAVE__ALL__RIDES:
      return {
        ...state,
        allRides: action.allRides,
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
    case USER__QUIT__RIDE:
      return {
        ...state,
        currentRide: {
          ...state.currentRide,
          participants: [
            ...state.currentRide.participants.filter(
              (participant) => participant.participant_id !== action.userId,
            ),
          ],
        },
      };
    case ADD__MESSAGE__IN__STATE: {
      const sender = state.currentRide.participants.find(
        (participant) => participant.participant_id === action.message.sender_id,
      );

      return {
        ...state,
        currentRide: {
          ...state.currentRide,
          messages: [
            ...state.currentRide.messages,
            {
              message_id: action.message.id,
              sent: action.message.sent,
              message: action.message.message,
              sender_id: action.message.sender_id,
              sender_photo: sender.participant_photo,
              sender_first_name: sender.participant_first_name,
            },
          ],
        },
      };
    }
    case DELETE__RIDE__IN__STATE:
      return {
        ...state,
        allRides: state.allRides.filter((ride) => ride.ride_id !== action.id),
        currentRide: {
          ...ridesInitialState.currentRide,
        },
      };
    case SAVE__ONE__RIDE:
      action.ride.participants.forEach((participant) => {
        if (participant.dogs === null) {
          participant.dogs = [];
        }
      });
      if (action.ride.duration === null) {
        action.ride.duration = {
          minutes: undefined,
        };
      }
      if (action.ride.messages === null) {
        return {
          ...state,
          currentRide: {
            ...action.ride,
            messages: [],
            isLoading: false,
          },
          errorMessage: '',
        };
      }
      return {
        ...state,
        currentRide: {
          ...action.ride,
          isLoading: false,
        },
        errorMessage: '',
      };
    case SET__ERROR__MSG:
      return {
        ...state,
        errorMessage: action.errorMsg,
      };
    case GET__RIDE__IS__LOADING:
      return {
        ...state,
        currentRide: {
          ...state.currentRide,
          isLoading: true,
        },
      };
    case FAILED_TO_CREATE_RIDE:
      return {
        ...state,
        failedToCreateRide: true,
        errorMessage: action.errorMessage,
      };
    case KICK__USER__FROM__RIDE:
      return {
        ...state,
        currentRide: {
          ...state.currentRide,
          participants: state.currentRide.participants.filter(
            (participant) => participant.participant_id !== action.userId,
          ),
        },
      };
    case CREATE_RIDE:
      return {
        ...state,
        rideIsCreated: true,
      };
    case GET__RIDES__WITH__USER__IN:
      // when redirect on /board, clean state to be able to go back on /ride/create
      return {
        ...state,
        rideIsCreated: false,
      };
    case LOGOUT__USER:
      return {
        ...ridesInitialState,
      };
    default:
      return state;
  }
};

export default ridesReducer;
