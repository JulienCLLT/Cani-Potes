/* eslint-disable linebreak-style */
const ridesInitialState = {
  // get all rides from the api within an area
  // ? how to do this with leaflet and SQL ?by city ? by coordinate ?
  allRides: [
    {
      ride_id: 1,
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
      max_number_dogs: 5,
      tag_label: "grand air",
      host_id: 1,
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
              dog_id: 3,
              dog_photo: "img10.jpg",
              dog_surname: "Plutôt",
              dog_photo_id: 7
            },
            {
              dog_id: 3,
              dog_photo: "img11.jpg",
              dog_surname: "Plutôt",
              dog_photo_id: 8
            }
          ],
          participant_id: 2,
          participant_photo: "img2.jpg",
          participant_last_name: "Cooper",
          participant_first_name: "Sheldon"
        },
        {
          dogs: [
            {
              dog_id: 4,
              dog_photo: "img12.jpg",
              dog_surname: "Rox Attak",
              dog_photo_id: 9
            },
            {
              dog_id: 4,
              dog_photo: "img14.jpg",
              dog_surname: "Rox Attak",
              dog_photo_id: 11
            },
            {
              dog_id: 4,
              dog_photo: "img9.jpg",
              dog_surname: "Rox Attak",
              dog_photo_id: 6
            }
          ],
          participant_id: 3,
          participant_photo: "img3.jpg",
          participant_last_name: "Holmes",
          participant_first_name: "Sherlock"
        },
        {
          dogs: [
            {
              dog_id: 1,
              dog_photo: "img13.jpg",
              dog_surname: "Snoopie",
              dog_photo_id: 10
            },
            {
              dog_id: 1,
              dog_photo: "img4.jpg",
              dog_surname: "Snoopie",
              dog_photo_id: 1
            },
            {
              dog_id: 1,
              dog_photo: "img5.jpg",
              dog_surname: "Snoopie",
              dog_photo_id: 2
            },
            {
              dog_id: 2,
              dog_photo: "img6.jpg",
              dog_surname: "Lassie",
              dog_photo_id: 3
            },
            {
              dog_id: 2,
              dog_photo: "img7.jpg",
              dog_surname: "Lassie",
              dog_photo_id: 4
            },
            {
              dog_id: 2,
              dog_photo: "img8.jpg",
              dog_surname: "Lassie",
              dog_photo_id: 5
            }
          ],
          participant_id: 1,
          participant_photo: "img1.jpg",
          participant_last_name: "Le fou de ouf",
          participant_first_name: "Toto"
        }
      ]
    },
    {
      ride_id: 2,
      title: "Cool ici",
      description: "On va rire car mon chien est vraiment foufou",
      start_coordinate: [
        3.29,
        48.9
      ],
      end_coordinate: [
        3.290084,
        48.897443
      ],
      starting_time: "2021-10-14T17:37:25.631Z",
      duration: {
        minutes: 35
      },
      max_number_dogs: 4,
      tag_label: "sortie de quartier",
      host_id: 3,
      host_first_name: "Sherlock",
      messages: [
        {
          sent: null,
          message: null,
          sender_id: null,
          sender_photo: null,
          sender_last_name: null,
          sender_first_name: null
        }
      ],
      participants: [
        {
          dogs: [
            {
              dog_id: 4,
              dog_photo: "img12.jpg",
              dog_surname: "Rox Attak",
              dog_photo_id: 9
            },
            {
              dog_id: 4,
              dog_photo: "img14.jpg",
              dog_surname: "Rox Attak",
              dog_photo_id: 11
            },
            {
              dog_id: 4,
              dog_photo: "img9.jpg",
              dog_surname: "Rox Attak",
              dog_photo_id: 6
            }
          ],
          participant_id: 3,
          participant_photo: "img3.jpg",
          participant_last_name: "Holmes",
          participant_first_name: "Sherlock"
        }
      ]
    }
  ],
  currentRide: {
    ride_id: 1,
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
    max_number_dogs: 5,
    tag_label: "grand air",
    host_id: 1,
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
            dog_id: 3,
            dog_photo: "img10.jpg",
            dog_surname: "Plutôt",
            dog_photo_id: 7
          },
          {
            dog_id: 3,
            dog_photo: "img11.jpg",
            dog_surname: "Plutôt",
            dog_photo_id: 8
          }
        ],
        participant_id: 2,
        participant_photo: "img2.jpg",
        participant_last_name: "Cooper",
        participant_first_name: "Sheldon"
      },
      {
        dogs: [
          {
            dog_id: 4,
            dog_photo: "img12.jpg",
            dog_surname: "Rox Attak",
            dog_photo_id: 9
          },
          {
            dog_id: 4,
            dog_photo: "img14.jpg",
            dog_surname: "Rox Attak",
            dog_photo_id: 11
          },
          {
            dog_id: 4,
            dog_photo: "img9.jpg",
            dog_surname: "Rox Attak",
            dog_photo_id: 6
          }
        ],
        participant_id: 3,
        participant_photo: "img3.jpg",
        participant_last_name: "Holmes",
        participant_first_name: "Sherlock"
      },
      {
        dogs: [
          {
            dog_id: 1,
            dog_photo: "img13.jpg",
            dog_surname: "Snoopie",
            dog_photo_id: 10
          },
          {
            dog_id: 1,
            dog_photo: "img4.jpg",
            dog_surname: "Snoopie",
            dog_photo_id: 1
          },
          {
            dog_id: 1,
            dog_photo: "img5.jpg",
            dog_surname: "Snoopie",
            dog_photo_id: 2
          },
          {
            dog_id: 2,
            dog_photo: "img6.jpg",
            dog_surname: "Lassie",
            dog_photo_id: 3
          },
          {
            dog_id: 2,
            dog_photo: "img7.jpg",
            dog_surname: "Lassie",
            dog_photo_id: 4
          },
          {
            dog_id: 2,
            dog_photo: "img8.jpg",
            dog_surname: "Lassie",
            dog_photo_id: 5
          }
        ],
        participant_id: 1,
        participant_photo: "img1.jpg",
        participant_last_name: "Le fou de ouf",
        participant_first_name: "Toto"
      }
    ]
  },
};

const ridesReducer = (state = ridesInitialState, action = {}) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default ridesReducer;
