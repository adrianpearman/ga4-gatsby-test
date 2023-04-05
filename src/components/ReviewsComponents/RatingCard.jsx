import React from 'react';

import * as CardStyles from './RatingCard.module.scss';

const RatingCard = ({ rating }) => {
  const { siteUrl, submitAReviewUrl, numberOfReviews, averageRating, logo } = rating;

  return (
    <div className={CardStyles.ratingCard}>
      <h3 className={CardStyles.ratingNumber}>{averageRating}</h3>
      <a
        className={`link-arrow link-arrow-red ${CardStyles.readReviewLink}`}
        href={siteUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {numberOfReviews} reviews
      </a>
      <img src={logo.file.url} alt={logo.description} className={CardStyles.logo} />
      <a
        href={submitAReviewUrl}
        className={CardStyles.submitReviewLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        Submit a review
      </a>
    </div>
  );
};

export default RatingCard;
