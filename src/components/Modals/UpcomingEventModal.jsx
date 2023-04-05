import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';

import Hamburger from '../SVG/Hamburger';
import Button from '../Button/Button';

import { monthAndDay } from '../../helpers/formatters';

import * as SlideModalStyles from './SlideModalStyles.module.scss';

const UpcomingEventModal = ({ nextEvent, productSlug, product }) => {
  const { name } = product;

  const [modalPosition, setModalPosition] = useState('doNotLoad');
  useEffect(() => {
    if (typeof window !== 'undefined' && window) {
      const { sessionStorage } = window;

      const prevModalsSeen = sessionStorage.getItem('amtSeen') || 0;
      const modalId = sessionStorage.getItem('modalId') || '';

      if (parseInt(prevModalsSeen, 10) >= 2 || modalId === productSlug) {
        return;
      }

      const currentModalsSeen = parseInt(prevModalsSeen, 10) + 1;
      sessionStorage.setItem('amtSeen', currentModalsSeen);
      sessionStorage.setItem('modalId', productSlug);
      setModalPosition('visible');
    }
  }, []);

  const createDateString = (date) => {
    const upcomingEventDate = DateTime.fromISO(date);

    const relativeCalendarString = upcomingEventDate.toRelativeCalendar();

    if (relativeCalendarString === 'tomorrow' || relativeCalendarString === 'today') {
      return relativeCalendarString;
    }
    return monthAndDay(date);
  };

  return (
    <div className={`${SlideModalStyles.modal} ${SlideModalStyles[modalPosition]}`}>
      <button
        className={SlideModalStyles.closeButton}
        type="button"
        aria-label="Close pop-up"
        onClick={() => setModalPosition('hidden')}
      >
        <Hamburger transformToX parentStyles={SlideModalStyles.svg} />
      </button>
      <p className={SlideModalStyles.heading}>
        Free {name} {nextEvent.type.format === 'Unique' ? 'Event' : nextEvent.type.format}{' '}
        {nextEvent.type.format === 'Ask an Expert' ? 'Event' : ''}{' '}
        {createDateString(nextEvent.date)}!
      </p>
      <Button
        id={`${productSlug}-event-modal`}
        urlIsRelativePath={false}
        text={nextEvent.type.sharedCtaText || 'Register Now'}
        href={
          nextEvent.secondaryRegistrationLink
            ? nextEvent.secondaryRegistrationLink
            : nextEvent.registrationLink
        }
        openInNewTab
        useSnowplowTracking
        buttonStyle="primary"
        className={SlideModalStyles.cta}
      />
    </div>
  );
};

export default UpcomingEventModal;
