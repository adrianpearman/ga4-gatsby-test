/* eslint-disable react/no-danger */
import React from 'react';

import CircleHeadshot from '../CircleHeadshot/CircleHeadshot';

import * as SmallCardStyles from './ReviewsGridSmallCard.module.scss';

const ReviewsGridSmallCard = ({ review }) => {
  const { headshot } = review.person;

  const reviewerName = review.person.name.split(' ');

  return (
    <li className={SmallCardStyles.reviewCard}>
      <div className={SmallCardStyles.head}>
        {review.reviewLinkUrl && (
          <a href={review.reviewLinkUrl} target="_blank" rel="noopener noreferrer">
            Read full review on {review.reviewLinkSource}
          </a>
        )}
      </div>
      <div className={SmallCardStyles.quotation}>
        <p
          dangerouslySetInnerHTML={{
            __html: review.quotation.childMarkdownRemark.rawMarkdownBody
          }}
        />
      </div>
      <div className={SmallCardStyles.reviewerContainer}>
        {headshot && (
          <CircleHeadshot
            imageData={headshot.gatsbyImageData}
            altText={review.person.name}
            size="70px"
            className={SmallCardStyles.reviewerHeadshot}
          />
        )}
        <div>
          <div className={SmallCardStyles.reviewerName}>
            <p className={SmallCardStyles.name}>{reviewerName[0]}</p>
            <p className={SmallCardStyles.name}>
              {reviewerName[1]} {reviewerName[2]}
            </p>
          </div>
          <div className={SmallCardStyles.reviewerCareer}>
            {review.courseTaken && (
              <div className={SmallCardStyles.reviewerCourses}>
                <h6 className={SmallCardStyles.courseSubhead}>Course taken</h6>
                <p>{review.courseTaken}</p>
              </div>
            )}
            {review.person.jobCurrent && (
              <div className={SmallCardStyles.reviewerCareerDetails}>
                <h6 className={SmallCardStyles.courseSubhead}>Currently</h6>
                <p>
                  {review.person.jobCurrent} at{' '}
                  {review.person.jobCurrentCompanyLink ? (
                    <a href={review.person.jobCurrentCompanyLink}>
                      {review.person.jobCurrentCompany}
                    </a>
                  ) : (
                    `${review.person.jobCurrentCompany}`
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default ReviewsGridSmallCard;
