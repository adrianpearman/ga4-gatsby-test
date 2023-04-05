import React from 'react';

import * as PlusAndMinusStyles from './PlusAndMinus.module.scss';

const PlusAndMinus = ({ parentClass, minus = false }) => {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      width="44"
      height="44"
      viewBox="0 0 44 44"
      className={`${PlusAndMinusStyles.icon} ${
        minus ? PlusAndMinusStyles.minus : ''
      } ${parentClass}`}
    >
      <line x1="22" y1="10" x2="22" y2="34" />
      <line x1="34" y1="22" x2="10" y2="22" />
    </svg>
  );
};

export default PlusAndMinus;
