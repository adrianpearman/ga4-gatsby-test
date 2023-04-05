/* eslint-disable react/destructuring-assignment */
import React from 'react';
import SiteLink from '../SiteLink/SiteLink';
import CircleHeadshot from '../CircleHeadshot/CircleHeadshot';

import { monthAndDay, standardDate, dateRange, year } from '../../helpers/formatters';
import sluggify from '../../helpers/sluggify';

import * as CourseSessionCardStyles from './CourseSessionCard.module.scss';

const CourseSessionCard = ({
  data,
  timeCommitment,
  registerHandler,
  registerDisabled,
  signupLinkText,
  fullWidth
}) => {
  const {
    id,
    classDays,
    startDate,
    endDate,
    timeFrame,
    isSoldOut,
    isAlmostFull,
    locationType,
    inPersonAddress,
    instructor,
    customBannerText
  } = data;

  const signupCtaText = signupLinkText || 'Get Started';
  const bannerText =
    customBannerText || (isSoldOut && 'Sold Out!') || (isAlmostFull && 'Almost Full!');
  const bannerClasses = `${CourseSessionCardStyles.banner} ${
    isSoldOut ? CourseSessionCardStyles.bannerSoldOut : ''
  } ${isAlmostFull ? CourseSessionCardStyles.bannerAlmostFull : ''}`;

  const matchingYears = year(startDate) === year(endDate);

  const ctaClasses =
    signupCtaText === 'Enrol Now'
      ? `btn redbg-white ${CourseSessionCardStyles.purchaseButton}`
      : `btn-link link-arrow link-arrow-custard ${CourseSessionCardStyles.registerButton}`;

  return (
    <div
      key={id}
      className={`${CourseSessionCardStyles.singleSession} ${
        fullWidth ? CourseSessionCardStyles.fullWidth : undefined
      }`}
    >
      {bannerText && <span className={bannerClasses}>{bannerText}</span>}
      <div className={CourseSessionCardStyles.sessionDays}>
        <p className={CourseSessionCardStyles.timeCommitment}>
          {timeCommitment === 'Full-Time' ? 'Accelerated' : timeCommitment}
        </p>
        <p className={CourseSessionCardStyles.classDays}>{classDays}</p>
        {registerHandler ? (
          <button
            onClick={registerHandler}
            type="button"
            className={ctaClasses}
            disabled={!!registerDisabled}
          >
            {signupCtaText}
          </button>
        ) : (
          <SiteLink to="/apply/" className="link-arrow link-arrow-custard">
            {signupCtaText}
          </SiteLink>
        )}
      </div>
      <div className={CourseSessionCardStyles.sessionDetails}>
        <p className={CourseSessionCardStyles.classDates}>
          {dateRange(
            matchingYears ? monthAndDay(startDate) : standardDate(startDate),
            standardDate(endDate)
          )}
        </p>
        <p className={CourseSessionCardStyles.classTimes}>{timeFrame} EST</p>
        {locationType === 'In Person' ? (
          <p className={CourseSessionCardStyles.classAddress}>{inPersonAddress}, Toronto</p>
        ) : (
          <p className={CourseSessionCardStyles.classAddress}>{locationType}</p>
        )}
      </div>

      <div className={CourseSessionCardStyles.sessionInstructor}>
        {instructor.headshot && (
          <CircleHeadshot
            imageData={instructor.headshot.gatsbyImageData}
            alt={instructor.name}
            size="60px"
            className={CourseSessionCardStyles.sessionInstructorHeadshot}
          />
        )}
        <div className={CourseSessionCardStyles.sessionInstructorDetails}>
          <p>Instructed by</p>
          {instructor.bio ? (
            <p>
              <SiteLink to={`/company/${sluggify(instructor.name)}/`}>{instructor.name}</SiteLink>
            </p>
          ) : (
            <p>{instructor.name}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseSessionCard;
