import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// before beeing able to ask to db real url, simulating
import user from '../../assets/img/profile-simulation/user.jpg';
import dog from '../../assets/img/profile-simulation/dog-one.jpg';

import './RideDetails.scss';

const RideDetails = () => {
  const { id } = useParams();
  // get id in pathname and ask db for ride details

  const { register, handleSubmit } = useForm();

  const [isChatOpen, setIsChatOpen] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };

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
          <p>Description de la balade qui dit que c'est franchement une chouette balade</p>
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
              <NavLink
                className="ride-details__current-user__avatar"
                to="/profile/:id"
                exact
              >
                <img src={user} alt="user" />
                <span>Susie Q</span>
              </NavLink>
              <div className="ride-details__current-user__dogs">
                <img src={dog} alt="dog" />
                <span>Lassie</span>
              </div>
            </div>
            {/* second registered user */}
            <div className="ride-details__current-user">
              <NavLink
                className="ride-details__current-user__avatar"
                to="/profile/:id"
                exact
              >
                <img src={user} alt="user" />
                <span>Johann H</span>
              </NavLink>
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
            <NavLink
              className="ride-details__users__creator__avatar"
              to="/profile/:id"
              exact
            >
              <p>Créateur</p>
              <img src={user} alt="user" />
              <span>Sandy K</span>
            </NavLink>
          </div>
        </div>

      </section>

      <button
        type="button"
        className={isChatOpen ? 'ride-details__toggle rotate' : 'ride-details__toggle'}
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <span>^</span>
      </button>
      {isChatOpen && (
        <section className="ride-details__chat">

          <div className="ride-details__messages-container">
              <div className="ride-details__messages-container__message">
                <p>Johann H <span>Il y a 2h</span></p>
                <span>Alors vous êtes prêtes ?</span>
              </div>
              <div className="ride-details__messages-container__message my-message">
                <p>JSandy K <span>Il y a 1h</span></p>
                <span>Super ouais, j'ai hâte ! Et toi Susie ?</span>
              </div>
              <div className="ride-details__messages-container__message">
                <p>Susie Q<span>Il y a 38min</span></p>
                <span>Oh oui alors !</span>
              </div>
            </div>
          <div className="ride-details__new-message">
            <form onSubmit={handleSubmit(onSubmit)} className="ride-details__form">
              <input
                id="text"
                name="text"
                type="text"
                placeholder="Nouveau message"
                {...register('text', { required: true })}
              />
              <button type="submit">Envoyer</button>
            </form>
          </div>

        </section>
      )}
    </div>
  );
};

export default RideDetails;
