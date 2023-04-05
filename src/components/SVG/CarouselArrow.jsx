import React from 'react';

import * as CarouselArrowStyles from './CarouselArrowStyles.module.scss';

const CarouselArrow = ({ direction, type, transparentBackground }) => (
  <svg
    className={`${CarouselArrowStyles[type]} ${CarouselArrowStyles.general}`}
    id="elements"
    xmlns="http://www.w3.org/2000/svg"
    width="60"
    height="60"
    viewBox="0 0 60 60"
  >
    <rect
      width="60"
      height="60"
      className={`${CarouselArrowStyles.rect} ${
        transparentBackground ? CarouselArrowStyles.transparentBackground : ''
      }`}
    />
    {direction === 'next' && (
      <>
        <polyline
          className={CarouselArrowStyles.polyline}
          points="32.42 20.03 42.39 30 32.42 39.97"
          // stylings
          fill="none"
          stroke="#fff"
          strokeMiterlimit="10"
          strokeWidth="2px"
        />
        <line
          className={CarouselArrowStyles.line}
          x1="15.68"
          y1="30"
          x2="42.39"
          y2="30"
          // stylings
          fill="none"
          stroke="#fff"
          strokeMiterlimit="10"
          strokeWidth="2px"
        />
      </>
    )}
    {direction === 'previous' && (
      <>
        <polyline
          className={CarouselArrowStyles.polyline}
          points="27.58 39.97 17.61 30 27.58 20.03"
          fill="none"
          stroke="#fff"
          strokeMiterlimit="10"
          strokeWidth="2px"
        />
        <line
          className={CarouselArrowStyles.line}
          x1="44.32"
          y1="30"
          x2="17.61"
          y2="30"
          fill="none"
          stroke="#fff"
          strokeMiterlimit="10"
          strokeWidth="2px"
        />
      </>
    )}
  </svg>
);

export default CarouselArrow;
