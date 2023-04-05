import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

import Button from '../Button/Button';

import { abbreviatedMonthAndDay, monthAndDay, standardDate, year } from '../../helpers/formatters';

import calendar from '../../assets/images/bootcamp/icon-details-duration.svg';
import pin from '../../assets/images/bootcamp/icon-details-place.svg';
import sun from '../../assets/images/bootcamp/icon-details-days.svg';
import clock from '../../assets/images/bootcamp/icon-details-time.svg';

import * as BootcampSessionCardStyles from './BootcampSessionCard.module.scss';

const BootcampSessionCard = ({ session }) => {
  const { customBannerText, isSoldOut, isAlmostFull } = session;

  const bannerText =
    customBannerText || (isSoldOut && 'Sold Out!') || (isAlmostFull && 'Almost Full!');
  const bannerClasses =
    (isSoldOut && BootcampSessionCardStyles.soldOut) ||
    (isAlmostFull && BootcampSessionCardStyles.almostFull);

  const [applyNowText, setApplyNowText] = useState('Apply Now');
  useEffect(() => {
    if (
      session.applicationDeadline &&
      DateTime.fromISO(session.applicationDeadline) > DateTime.local()
    ) {
      setApplyNowText(`Apply by ${abbreviatedMonthAndDay(session.applicationDeadline)}`);
    }
  }, [session.applicationDeadline]);

  const matchingYears = year(session.startDate) === year(session.endDate);

  return (
    <div className={BootcampSessionCardStyles.card}>
      <div
        className={`${BootcampSessionCardStyles.sessionDates} ${
          bannerText ? BootcampSessionCardStyles.withBanner : ''
        }`}
      >
        {bannerText && (
          <span className={`${BootcampSessionCardStyles.banner} ${bannerClasses}`}>
            {bannerText}
          </span>
        )}
        <h3>
          {matchingYears ? monthAndDay(session.startDate) : standardDate(session.startDate)} -{' '}
          <span>{standardDate(session.endDate)}</span>
        </h3>
        <p className={BootcampSessionCardStyles.locationType}>{session.locationType}</p>
      </div>
      <div className={BootcampSessionCardStyles.sessionDetails}>
        <ul>
          <li>
            <img
              className={BootcampSessionCardStyles.icon}
              src={calendar}
              alt="Session schedule format"
            />
            {session.numberOfWeeks} Weeks {session.timeCommitment}
          </li>
          <li>
            <img className={BootcampSessionCardStyles.icon} src={sun} alt="Session days" />
            {session.classDays}
          </li>
          <li>
            <img className={BootcampSessionCardStyles.icon} src={clock} alt="Session times" />
            {session.timeFrame} EST
          </li>
          {session.locationType === 'In Person' && (
            <li>
              <img
                className={BootcampSessionCardStyles.icon}
                src={pin}
                alt="Session in-person location"
              />
              {session.inPersonAddress}
            </li>
          )}
        </ul>
      </div>
      <div className={BootcampSessionCardStyles.applyButtonWrapper}>
        {!isSoldOut && (
          <Button
            urlIsRelativePath
            href="/apply"
            text={applyNowText}
            buttonStyle="secondary"
            className="upcoming-session-cta"
          />
        )}
      </div>
    </div>
  );
};

export default BootcampSessionCard;
