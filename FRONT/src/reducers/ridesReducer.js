import {
  ADD__USER__TO__RIDE, REMOVE__USER__FROM__RIDE, ADD__NEW__MESSAGE, DELETE__RIDE, SAVE__ALL__RIDES
} from '../actions/rides';

const ridesInitialState = {
  // get all rides from the api within an area
  // ? how to do this with leaflet and SQL ?by city ? by coordinate ?
  allRides: [],
  currentRide: {
    ride_id: 3,
    title: "Dans le coin",
    description: "un petit tour de quartier pour se rencontrer et y a une fontaine sympa",
    start_coordinate: [
      2.29,
      49.9,
    ],
    end_coordinate: [
      2.310084,
      49.877443,
    ],
    starting_time: "2021-09-29T17:37:25.631Z",
    duration: {
      minutes: 15,
    },
    max_number_dogs: 50,
    tag_label: "grand air",
    host_id: 99,
    host_first_name: "Toto",
    messages: [
      {
        sent: "2021-09-23T13:26:00.470745+02:00",
        message: "bien sûr!",
        sender_id: 1,
        sender_photo: "img1.jpg",
        sender_last_name: "Le fou de ouf",
        sender_first_name: "Toto"
      },
      {
        sent: "2021-09-23T13:26:00.470745+02:00",
        message: "Excellent, on pourra aller lentement, je crois que Lassie a mal",
        sender_id: 2,
        sender_photo: "img2.jpg",
        sender_last_name: "Cooper",
        sender_first_name: "Sheldon"
      },
      {
        sent: "2021-09-23T13:26:00.470745+02:00",
        message: "Oui bien motivé, le toutou a son écharpe",
        sender_id: 3,
        sender_photo: "img3.jpg",
        sender_last_name: "Holmes",
        sender_first_name: "Sherlock"
      },
      {
        sent: "2021-09-23T13:26:00.470745+02:00",
        message: "Salut vous etes prêts ?",
        sender_id: 1,
        sender_photo: "img1.jpg",
        sender_last_name: "Le fou de ouf",
        sender_first_name: "Toto"
      }
    ],
    participants: [
      {
        dogs: [
          {
            dog_id: 1,
            dog_photo: "img10.jpg",
            dog_surname: "Plutôt",
            dog_photo_id: 7
          },
          {
            dog_id: 2,
            dog_photo: "img11.jpg",
            dog_surname: "Plutôt",
            dog_photo_id: 8
          }
        ],
        participant_id: 1,
        participant_photo: "img2.jpg",
        participant_last_name: "Cooper",
        participant_first_name: "Sheldon"
      },
      {
        dogs: [
          {
            dog_id: 10,
            dog_photo: "img12.jpg",
            dog_surname: "Rox Attak",
            dog_photo_id: 9
          },
          {
            dog_id: 11,
            dog_photo: "img14.jpg",
            dog_surname: "Rox Attak",
            dog_photo_id: 11
          },
          {
            dog_id: 12,
            dog_photo: "img9.jpg",
            dog_surname: "Rox Attak",
            dog_photo_id: 6
          }
        ],
        participant_id: 13,
        participant_photo: "img3.jpg",
        participant_last_name: "Holmes",
        participant_first_name: "Sherlock"
      },
      {
        dogs: [
          {
            dog_id: 21,
            dog_photo: "img13.jpg",
            dog_surname: "Snoopie",
            dog_photo_id: 10
          },
          {
            dog_id: 22,
            dog_photo: "img4.jpg",
            dog_surname: "Snoopie",
            dog_photo_id: 1
          },
          {
            dog_id: 23,
            dog_photo: "img5.jpg",
            dog_surname: "Snoopie",
            dog_photo_id: 2
          },
          {
            dog_id: 24,
            dog_photo: "img6.jpg",
            dog_surname: "Lassie",
            dog_photo_id: 3
          },
          {
            dog_id: 25,
            dog_photo: "img7.jpg",
            dog_surname: "Lassie",
            dog_photo_id: 4
          },
          {
            dog_id: 26,
            dog_photo: "img8.jpg",
            dog_surname: "Lassie",
            dog_photo_id: 5
          }
        ],
        participant_id: 27,
        participant_photo: "img1.jpg",
        participant_last_name: "Le fou de ouf",
        participant_first_name: "Toto"
      }
    ]
  },
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
    default:
      return state;
  }
};

export default ridesReducer;
