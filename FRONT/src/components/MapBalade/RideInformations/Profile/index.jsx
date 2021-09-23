/* eslint-disable linebreak-style */
// eslint-disable-next-line no-unused-vars
import React from 'react';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';

import './profile.scss';

// import img
import user from '../../../../assets/img/profile-simulation/user.jpg';
import dog from '../../../../assets/img/profile-simulation/dog-one.jpg';

// import icon
import race from '../../../../assets/img/profile-simulation/race.svg';
import sociable from '../../../../assets/img/profile-simulation/sociable.svg';

const Profile = () => {
//   const id = useSlector((state) => state.reducer.id);
  const a = 1;
  return (
    <div className="profile">

      <div className="profile__user">
        <img src={user} alt="user picture" /> {/* mettre en alt le nom du user ? */}
        <h3 className="profile__user__name">Noémie</h3> {/* mettre dynamiquement les noms */}
      </div>

      <div className="profile__dog">
        <img src={dog} alt="dog picture" /> {/* mettre en alt nom du chien */}
        <p className="profile__dog__icon"><img src={race} alt="dog icon" />Race</p>{/* mettre en alt la race du chien ? */}
        <p className="profile__dog__icon"><img src={sociable} alt="happy icon" />Comportement</p> {/* mettre en alt le comportement du chien ? */}
      </div>

      {/* <Link to={`/profile/${id}`} className="profile_see">Voir le profil</Link> */}
    </div>
  );
};

export default Profile;
