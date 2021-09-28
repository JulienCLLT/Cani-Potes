/* eslint-disable linebreak-style */
import React from 'react';
import { useSelector } from 'react-redux';

const Board = () => {
  const photo = useSelector((state) => state.user.photo);
  return (
    <div className="board">
      <h2>Tableau de bord</h2>
    </div>
  );
};

export default Board;
