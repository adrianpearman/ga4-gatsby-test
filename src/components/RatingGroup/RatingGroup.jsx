import React from 'react';
import 'intersection-observer';
import { useInView } from 'react-intersection-observer';

import FiveStars from '../SVG/FiveStars';

import * as RatingGroupStyles from './RatingGroup.module.scss';

const RatingGroup = ({ ratingCards, className = '' }) => {
  const [ratingGroupRef, ratingsInView] = useInView({
    rootMargin: '-125px 0px -125px 0px'
  });

  return (
    <ul ref={ratingGroupRef} className={`${RatingGroupStyles.ratingGroup} ${className}`}>
      {ratingCards.map((rating) => (
        <li className={RatingGroupStyles.rating} key={rating.id}>
          <p className={RatingGroupStyles.ratingNumber}>{rating.averageRating}</p>
          <FiveStars
            enableTransitions
            toggleFadeTransitions={ratingsInView}
            className={RatingGroupStyles.stars}
          />
          <img
            className={RatingGroupStyles.logo}
            src={rating.logo.file.url}
            alt={rating.logo.description}
            width="80"
            height="55"
          />
        </li>
      ))}
    </ul>
  );
};

export default RatingGroup;
