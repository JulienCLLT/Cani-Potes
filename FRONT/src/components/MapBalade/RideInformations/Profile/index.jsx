import React from 'react';

import './profile.scss';

// import img
import user from '../../../../assets/img/profile-simulation/user.jpg'; // assets/img/profile-simulation/user.jpg
import dog from '../../../../assets/img/profile-simulation/dog-one.jpg';

// import icon
import race from '../../../../assets/img/profile-simulation/race.svg';
import sociable from '../../../../assets/img/profile-simulation/sociable.svg';

const Profile = () => (
  <div className="profile">

    <div className="profile__picture">

      <div className="profile__picture__user">
        <img src={user} alt="user picture" /> {/* mettre en alt le nom du user ? */}
        <h3 className="profile__picture__user__name">Noémie</h3> {/* mettre dynamiquement les noms */}
      </div>

      <div className="profile__picture__dog">

        <img src={dog} alt="dog picture" /> {/* mettre en alt nom du chien ? */}

        <div className="icon"><img src={race} alt="dog icon" /></div>
        <span>Race</span>
        <div className="icon"><img src={sociable} alt="happy icon" /></div>
        <span>Comportement</span>

      </div>
    </div>
  </div>
);

export default Profile;
