import React from 'react';

import CircleHeadshot from '../CircleHeadshot/CircleHeadshot';

import * as FeatureCardStyles from './ReviewsGridFeatureCard.module.scss';

const ReviewsGridFeatureCard = ({ review }) => {
  const { headshot } = review.person;

  return (
    <li className={`grid-wrapper ${FeatureCardStyles.reviewCardFeature}`}>
      <div className={FeatureCardStyles.reviewContent}>
        {headshot && (
          <CircleHeadshot
            imageData={headshot.gatsbyImageData}
            altText={review.person.name}
            size="150px"
          />
        )}

        <div
          className={`${FeatureCardStyles.quotation} ${
            headshot ? '' : FeatureCardStyles.noHeadshot
          }`}
        >
          <p
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: review.quotation.childMarkdownRemark.rawMarkdownBody
            }}
          />
        </div>

        <div
          className={`${FeatureCardStyles.reviewerContainer} ${
            headshot ? '' : FeatureCardStyles.noHeadshot
          }`}
        >
          <div className={FeatureCardStyles.reviewerName}>
            <p className={FeatureCardStyles.name}>{review.person.name}</p>
          </div>
          <div className={FeatureCardStyles.reviewerCareer}>
            {review.courseTaken && (
              <div className={FeatureCardStyles.reviewerCourses}>
                <h6 className={FeatureCardStyles.courseSubhead}>Course taken</h6>
                <p>{review.courseTaken}</p>
              </div>
            )}
            {review.person.jobCurrent && (
              <div className={FeatureCardStyles.reviewerCareerDetails}>
                <h6 className={FeatureCardStyles.courseSubhead}>Currently</h6>
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

export default ReviewsGridFeatureCard;
