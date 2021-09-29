
const  ride = {
  ride_id: 3,
  title: 'Dans le coin',
  description: 'un petit tour de quartier pour se rencontrer et y a une fontaine sympa',
  start_coordinate: [
    2.29,
    49.9,
  ],
  end_coordinate: [
    2.310084,
    49.877443,
  ],
  starting_time: '2021-09-29T17:37:25.631Z', // traduire en le 15 sept 2021 à 18h30
  duration: {
    minutes: 15,
  },
  max_number_dogs: 50,
  tag_label: 'grand air',
  host_id: 99,
  host_first_name: 'Toto',
  messages: [
    {
      sent: '2021-09-23T13:26:00.470745+02:00', // modif pour donne cb de min ou heure ou jour
      message: 'bien sûr!',
      sender_id: 1,
      sender_photo: 'img1.jpg',
      sender_first_name: 'Toto',
    },
    {
      sent: '2021-09-23T13:26:00.470745+02:00',
      message: 'Excellent, on pourra aller lentement, je crois que Lassie a mal',
      sender_id: 2,
      sender_photo: 'img2.jpg',
      sender_first_name: 'Sheldon',
    },
    {
      sent: '2021-09-23T13:26:00.470745+02:00',
      message: 'Oui bien motivé, le toutou a son écharpe',
      sender_id: 3,
      sender_photo: 'img3.jpg',
      sender_first_name: 'Sherlock',
    },
    {
      sent: '2021-09-23T13:26:00.470745+02:00',
      message: 'Salut vous etes prêts ?',
      sender_id: 1,
      sender_photo: 'img1.jpg',
      sender_first_name: 'Toto',
    },
  ],
  participants: [
    {
      dogs: [
        {
          dog_photo: [
            {
              photo_id: 1,
              photo_url: "img12.jpg"
            }
          ],
          dog_id: 101,
          dog_surname: "Riri",
          dog_behavior: "foufou",
          dog_breed: "caniche",
          dog_gender: "male",
          dog_waight: "27",
          dog_age: 27, // convertion en integer de nombre de mois
          dog_sterilization: true,
          dog_description: "Il est gentil mais faut pas l'emmerder"
        },
      ],
      participant_id: 1,
      participant_photo: 'img2.jpg',
      participant_first_name: 'Sheldon',
    },
  ],
};