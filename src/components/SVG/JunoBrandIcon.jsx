import React from 'react';

import * as JunoBrandIconStyles from './JunoBrandIcon.module.scss';

const JunoBrandIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="70"
    height="70"
    viewBox="0 0 70 70"
    className={className}
    role="img"
    aria-labelledby="juno-logo-title"
  >
    <title id="juno-logo-title">Juno College of Technology home</title>
    <g id="elements">
      <path
        className={JunoBrandIconStyles.junoPolygon}
        d="M0,70H70V0H0Zm66.26-3.74H3.74V3.74H66.26Z"
      />
      <polygon
        className={JunoBrandIconStyles.junoPolygon}
        points="18.41 18.44 15.66 21.19 26.12 31.66 15.66 42.12 18.41 44.87 31.62 31.66 18.41 18.44"
      />
      <rect
        className={JunoBrandIconStyles.junoPolygon}
        x="30.49"
        y="45.49"
        width="20.61"
        height="3.89"
      />
    </g>
  </svg>
);

export default JunoBrandIcon;
