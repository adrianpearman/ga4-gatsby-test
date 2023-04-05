import React from 'react';

import * as FiveStarsStyles from './FiveStars.module.scss';

const FiveStars = ({
  toggleFadeTransitions,
  className,
  enableTransitions = false,
  pageLoadDelay = false
}) => {
  // values that vary background dots order, one for each star
  const bgDotsTranslateXValues = [8.66, 11.99, 15.31, 18.63, 21.95];

  const kickOffAnimations = toggleFadeTransitions
    ? FiveStarsStyles.fadeInStars
    : FiveStarsStyles.fadeOutStars;

  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="-8 0 290 50">
      <defs>
        {bgDotsTranslateXValues.map((xValue, index) => (
          <pattern
            key={xValue}
            id={`_6_lpi_30_2-${index * 2 + 1}`}
            data-name="6 lpi 30% 2"
            width="4"
            height="4"
            patternTransform={`translate(${xValue} 12.11) scale(1.04)`}
            patternUnits="userSpaceOnUse"
            viewBox="0 0 4 4"
          >
            <rect className={FiveStarsStyles.interiorStarBg} width="4" height="4" />
            <rect className={FiveStarsStyles.interiorDots} x="2.5" y="2.51" width="1" height="1" />
            <rect className={FiveStarsStyles.interiorDots} x="0.5" y="0.49" width="1" height="1" />
          </pattern>
        ))}
      </defs>
      <g
        className={`${enableTransitions ? kickOffAnimations : ''} ${
          pageLoadDelay ? FiveStarsStyles.pageLoadDelay : ''
        }`}
      >
        <polygon
          className={FiveStarsStyles.star1}
          points="27.38 0.85 33.37 19.3 52.77 19.3 37.08 30.7 43.07 49.15 27.38 37.75 11.69 49.15 17.68 30.7 1.99 19.3 21.39 19.3 27.38 0.85"
        />
        <polygon
          className={FiveStarsStyles.star2}
          points="81.94 0.85 87.93 19.3 107.33 19.3 91.64 30.7 97.63 49.15 81.94 37.75 66.25 49.15 72.24 30.7 56.55 19.3 75.95 19.3 81.94 0.85"
        />
        <polygon
          className={FiveStarsStyles.star3}
          points="136.5 0.85 142.49 19.3 161.89 19.3 146.2 30.7 152.19 49.15 136.5 37.75 120.81 49.15 126.8 30.7 111.11 19.3 130.51 19.3 136.5 0.85"
        />
        <polygon
          className={FiveStarsStyles.star4}
          points="191.06 0.85 197.05 19.3 216.45 19.3 200.76 30.7 206.75 49.15 191.06 37.75 175.37 49.15 181.36 30.7 165.67 19.3 185.07 19.3 191.06 0.85"
        />
        <polygon
          className={FiveStarsStyles.star5}
          points="245.62 0.85 251.61 19.3 271.01 19.3 255.32 30.7 261.31 49.15 245.62 37.75 229.93 49.15 235.92 30.7 220.23 19.3 239.63 19.3 245.62 0.85"
        />
      </g>
    </svg>
  );
};

export default FiveStars;
