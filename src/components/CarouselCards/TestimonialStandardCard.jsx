/* eslint-disable react/no-danger */
import React from 'react';

import CircleHeadshot from '../CircleHeadshot/CircleHeadshot';

import * as TestimonialStandardCardStyles from './TestimonialStandardCard.module.scss';

const TestimonialStandardCard = ({ card, simpleByline = false, className = '' }) => {
  const { headshot } = card.person;

  const renderCurrentJobHtml = () => {
    const currentJob = card.person.jobCurrent || '';
    const currentCompany = card.person.jobCurrentCompany || '';
    const currentCompanyWithLink = card.person.jobCurrentCompanyLink ? (
      <a href={card.person.jobCurrentCompanyLink} target="_blank" rel="noopener noreferrer">
        {card.person.jobCurrentCompany}
      </a>
    ) : (
      currentCompany
    );

    return (
      <p>
        {currentJob}
        {currentCompanyWithLink && ` at `}
        {currentCompanyWithLink && currentCompanyWithLink}
      </p>
    );
  };

  const renderSecondaryByline = () => {
    if (simpleByline) {
      return renderCurrentJobHtml();
    }

    if (card.person.jobCurrent) {
      return (
        <>
          {card.person.jobBeforeJuno && (
            <div className={TestimonialStandardCardStyles.jobBeforeJuno}>
              <p className={TestimonialStandardCardStyles.heading}>Before Juno</p>
              <p>{card.person.jobBeforeJuno}</p>
            </div>
          )}
          <div className={TestimonialStandardCardStyles.jobAfterJuno}>
            <p className={TestimonialStandardCardStyles.heading}>After Juno</p>
            {renderCurrentJobHtml()}
          </div>
        </>
      );
    }

    if (card.courseTaken) {
      return (
        <div className={TestimonialStandardCardStyles.jobAfterJuno}>
          <p className={TestimonialStandardCardStyles.heading}>Course Taken:</p>
          <p>{card.courseTaken}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={`${TestimonialStandardCardStyles.standardCard} ${className}`}>
      {headshot && (
        <CircleHeadshot
          imageData={headshot.gatsbyImageData}
          altText={card.person.name}
          className={TestimonialStandardCardStyles.headshot}
        />
      )}
      <div
        className={`${TestimonialStandardCardStyles.textContainer} ${
          !headshot ? TestimonialStandardCardStyles.noHeadshot : ''
        }`}
      >
        <p
          className={TestimonialStandardCardStyles.quote}
          dangerouslySetInnerHTML={{
            __html: card.quotation.childMarkdownRemark.rawMarkdownBody
          }}
        />
        <p
          className={`${TestimonialStandardCardStyles.person} ${
            simpleByline ? TestimonialStandardCardStyles.simpleCard : ''
          }`}
        >
          {card.person.name}
        </p>
        {renderSecondaryByline()}
      </div>
    </div>
  );
};

export default TestimonialStandardCard;
