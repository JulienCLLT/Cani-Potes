/* eslint-disable linebreak-style */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import './profile.scss';

const Profile = ({ participants, host_id }) => {
  participants.sort((a, b) => {
    if (a.participant_id === host_id) {
      return -1;
    }
    return 0;
  });

  return (
    <div className="profile">

      <section>
        {
          participants.map((participant) => (
            <article className="profile__article" key={`participant${participant.participant_id}`}>

              <Link to={`/profile/${participant.participant_id}`}>
                <div className="profile__article__avatar">
                  <div className="profile__article__avatar-image">
                    <img
                      src={participant.participant_photo}
                      alt={participant.participant_first_name}
                    />
                  </div>
                  <div>
                    <span>{participant.participant_first_name}</span>
                  </div>
                </div>
              </Link>
              <div className="profile__article__dogs">
                {
                  participant.dogs && participant.dogs.map((dog, index) => {
                    if (index < 2) {
                      return (
                        <div className="profile__article__dogs-container" key={`participant${participant.participant_id}dog${dog.dog_id}`}>
                          <div className="profile__article__dogs-image">
                            {dog.dog_photo && (
                              <img src={`http://107.22.144.90/dog_resized/${dog.dog_photo[0].photo_url}`} alt={dog.dog_surname} />
                            )}
                          </div>
                          <div>
                            <span>{dog.dog_surname}</span>
                          </div>
                        </div>
                      );
                    }
                    if (index === participant.dogs.length - 1) {
                      return (
                        <span>{participant.dogs.length - 2} chien{participant.dogs.length - 2 > 1 && 's'} de plus</span>
                      );
                    }
                  })
                }
              </div>
            </article>
          ))
        }
      </section>
    </div>
  );
};

Profile.propTypes = {
  participants: PropTypes.arrayOf(
    PropTypes.shape({
      dogs: PropTypes.arrayOf(
        PropTypes.shape({
          dog_id: PropTypes.number.isRequired,
          dog_age: PropTypes.string.isRequired,
          dog_breed: PropTypes.string.isRequired,
          dog_photo: PropTypes.arrayOf(
            PropTypes.shape({
              photo_id: PropTypes.number.isRequired,
              photo_url: PropTypes.string.isRequired,
            }),
          ).isRequired,
          dog_gender: PropTypes.string.isRequired,
          dog_weight: PropTypes.number.isRequired,
          dog_surname: PropTypes.string.isRequired,
          dog_behavior: PropTypes.string.isRequired,
          dog_description: PropTypes.string.isRequired,
          dog_sterilization: PropTypes.bool.isRequired,
        }),
      ).isRequired,
      participant_id: PropTypes.number.isRequired,
      participant_photo: PropTypes.string,
      participant_first_name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  host_id: PropTypes.number.isRequired,
};

export default Profile;
