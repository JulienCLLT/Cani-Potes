/* eslint-disable linebreak-style */

import React from 'react';
import { useSelector } from 'react-redux';

import './timeline.scss';

const Timeline = () => {
  const isDogFormComplete = useSelector((state) => state.signup.isDogFormComplete);
  const isUserFormComplete = useSelector((state) => state.signup.isUserFormComplete);

  return (
    <div className="timeline">
      {/* <div className={isUserFormComplete ? 'part-bullet part-bullet_complete' : 'part-bullet'} /> */}
      <div className="timeline__line-circle">
        <div className="timeline__line-circle__line" />
        <div className={isUserFormComplete ? 'timeline__line-circle__circle--complete' : 'timeline__line-circle__circle'} />{/* {isUserFormComplete ? '✓' : ''}</div> */}
        {/* <div className="timeline__line-circle__circle timeline__circle--valid" /> */}
        <div className="timeline__line-circle__circle timeline__circle--valid" />
        <div className="timeline__line-circle__circle timeline__circle--valid" />
      </div>
      <div className="timeline__title">
        <h2>Vous</h2>
        <h2>Mon chien</h2>
        <h2>Fin</h2>
      </div>
    </div>

  );
};

export default Timeline;
