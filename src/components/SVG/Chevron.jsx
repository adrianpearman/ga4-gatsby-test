import React from 'react';

const Chevron = ({ parentStyles, onClick }) => (
  <svg
    id="elements"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    className={parentStyles}
    onClick={onClick}
  >
    <title>nav-menu-tipdown</title>
    <polyline
      points="17.58 5.81 10 13.47 2.42 5.81"
      fill="none"
      strokeMiterlimit="10"
      strokeWidth="2px"
      stroke="#ea593e"
    />
  </svg>
);

export default Chevron;
