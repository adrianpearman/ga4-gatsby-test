import React, { useState } from 'react';
import ReviewsGridSmallCard from './ReviewsGridSmallCard';
import ReviewsGridFeatureCard from './ReviewsGridFeatureCard';

import * as ReviewsGridStyles from './ReviewsGrid.module.scss';

const ReviewsGrid = ({ reviews }) => {
  const [page, setPage] = useState(0);
  const limit = page * 10 + 10;
  const reviewSubset = reviews.slice(0, limit);

  const loadMore = () => {
    setPage(page + 1);
  };

  return (
    <section className="grid-wrapper">
      <ul className={ReviewsGridStyles.reviewGrid}>
        {reviewSubset.map((review) => {
          return (
            <React.Fragment key={review.id}>
              {review.person && (
                <>
                  {review.featuredReview ? (
                    <ReviewsGridFeatureCard review={review} />
                  ) : (
                    <ReviewsGridSmallCard review={review} />
                  )}
                </>
              )}
            </React.Fragment>
          );
        })}
      </ul>
      {limit < reviews.length && (
        <div className={ReviewsGridStyles.loadMore}>
          <button type="button" onClick={loadMore} className={ReviewsGridStyles.loadMoreButton}>
            Load more
          </button>
        </div>
      )}
    </section>
  );
};

export default ReviewsGrid;
