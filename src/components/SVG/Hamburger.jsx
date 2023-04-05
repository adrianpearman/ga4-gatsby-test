import React from 'react';

import * as HamburgerStyles from './Hamburger.module.scss';

const Hamburger = ({ parentStyles, transformToX = false }) => (
  <svg
    id="elements"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 44 44"
    className={`${transformToX ? HamburgerStyles.transform : ''} ${parentStyles}`}
  >
    <title>nav-hamburger-icon</title>
    <line className={HamburgerStyles.line1} x1="10" y1="14.68" x2="34" y2="14.68" />
    <line className={HamburgerStyles.line2} x1="10" y1="22" x2="34" y2="22" />
    <line className={HamburgerStyles.line3} x1="10" y1="29.32" x2="34" y2="29.32" />
  </svg>
);

export default Hamburger;
