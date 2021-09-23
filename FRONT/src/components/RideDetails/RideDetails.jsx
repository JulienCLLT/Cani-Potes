import React from 'react';
import { useParams } from 'react-router-dom';

// before beeing able to ask to db real url, simulating
import user from '../../assets/img/profile-simulation/user.jpg';
import dog from '../../assets/img/profile-simulation/dog-one.jpg';

import './RideDetails.scss';

const RideDetails = () => {
  const { id } = useParams();
  // get id in pathname and ask db for ride details

  return (
    <div className="ride-details">
      <h1 className="ride-details__title">Détails d'une balade</h1>
      <section className="ride-details__infos">
        <div className="ride-details__infos__map">
          <div className="ride-details__leaflet">
            LEAFLET PROJECTION
          </div>
          <h2>Titre de la balade</h2>
          <span>8 / 10 chiens</span>
        </div>
        <div className="ride-details__infos__description">
          <p>Départ le jeudi 17 janvier 2038 à 18h45</p>
          <p>Durée : 37min</p>
          <p>Description de la balade Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad maiores doloribus quas eligendi amet recusandae, tempora, enim fugit id ut vitae, rerum dolores!</p>
        </div>
      </section>

      <section className="ride-details__users">
        <div className="ride-details__users__infos">
          <span>3 Cani Potes</span>
          <button type="button">S'inscrire</button>
        </div>

        <div className="ride-details__container">
          <div className="ride-details__users__registered">
            {/* first registered user */}
            <div className="ride-details__current-user">
              <div className="ride-details__current-user__avatar">
                <img src={user} alt="user" />
                <span>Susie Q</span>
              </div>
              <div className="ride-details__current-user__dogs">
                <img src={dog} alt="dog" />
                <span>Lassie</span>
              </div>
            </div>
            {/* second registered user */}
            <div className="ride-details__current-user">
              <div className="ride-details__current-user__avatar">
                <img src={user} alt="user" />
                <span>Johann H</span>
              </div>
              <div className="ride-details__current-user__dogs">
                <img src={dog} alt="dog" />
                <span>Chippie</span>
              </div>
              <div className="ride-details__current-user__dogs">
                <img src={dog} alt="dog" />
                <span>Foufou</span>
              </div>
            </div>
          </div>

          <div className="ride-details__users__creator">
            <div className="ride-details__users__creator__avatar">
              <img src={user} alt="user" />
              <span>Sandy</span>
              
            </div>
          </div>
        </div>

      </section>

      <section lassName="ride-details__messages">

      </section>
    </div>
  );
};

export default RideDetails;
