import React from 'react';

import Button from '../../Button/Button';
import CircleHeadshot from '../../CircleHeadshot/CircleHeadshot';

import dateIcon from '../../../assets/images/web-development-course/icon-details-duration.svg';
import locationIcon from '../../../assets/images/web-development-course/icon-details-place.svg';
import timeIcon from '../../../assets/images/web-development-course/icon-details-time.svg';

import { standardDate } from '../../../helpers/formatters';

import * as SessionStyles from './Session.module.scss';

const Session = ({
  classDays,
  timeFrame,
  startDate,
  locationType,
  instructor,
  allowOnlinePurchase,
  registerHandler,
  purchaseInProgress,
  first = false
}) => {
  return (
    <div className={`${SessionStyles.session} ${first ? SessionStyles.first : ''}`}>
      <div className={SessionStyles.actionArea}>
        <h3>{`${first ? 'Next ' : ''}Session Starts`}</h3>
        <h2>{classDays}</h2>

        {allowOnlinePurchase && (
          <Button
            type="button"
            buttonStyle="primary"
            text="Enrol Now"
            onClick={registerHandler}
            disabled={purchaseInProgress}
          />
        )}
      </div>
      <div className={SessionStyles.sessionDetails}>
        <ul className={SessionStyles.scheduling}>
          <li>
            <img src={dateIcon} alt="" />{' '}
            <p>
              {classDays}
              <span>{standardDate(startDate)}</span>
            </p>
          </li>
          <li>
            <img src={timeIcon} alt="" />{' '}
            <p>
              {timeFrame} EST <span>4 weeks part-time</span>
            </p>
          </li>
          <li>
            <img src={locationIcon} alt="" /> <p>{locationType}</p>
          </li>
        </ul>
        <div className={SessionStyles.instructor}>
          <CircleHeadshot
            imageData={instructor.headshot.gatsbyImageData}
            altText={instructor.name}
            size="87px"
            className={SessionStyles.headshot}
          />
          <p>Instructed by {instructor.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Session;
