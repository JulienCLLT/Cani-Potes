/* eslint-disable linebreak-style */
import React from 'react';

import './loader.scss';

const Loader = () => {
  const cells = [1, 2, 3, 4];
  const cols = [1, 2, 3, 4];

  return (
    <div className="mosaic">
      <h2>Chargement ...</h2>
      <div className="mosaic-loader">
        {
          cells.map((cell, cellIndex) => (
            cols.map((col, colIndex) => (
              <div key={cols[colIndex]} className={`cell d-${cellIndex + colIndex}`} />
            ))
          ))
        }
      </div>
    </div>
  );
};

export default Loader;
