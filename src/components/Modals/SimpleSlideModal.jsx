import React, { useState, useEffect } from 'react';

import Hamburger from '../SVG/Hamburger';
import Button from '../Button/Button';

import * as SlideModalStyles from './SlideModalStyles.module.scss';

const SimpleSlideModal = ({ content }) => {
  const { heading, subheading, trackingId, ctaText, ctaLink } = content;
  const appendedTrackingId = `${trackingId}-modal`;

  const [modalPosition, setModalPosition] = useState('doNotLoad');

  useEffect(() => {
    if (typeof window !== 'undefined' && window) {
      const { sessionStorage } = window;

      const prevModalsSeen = sessionStorage.getItem('amtSeen') || 0;
      const modalId = sessionStorage.getItem('modalId') || '';

      if (parseInt(prevModalsSeen, 10) >= 2 || modalId === trackingId) {
        return;
      }

      const currentModalsSeen = parseInt(prevModalsSeen, 10) + 1;
      sessionStorage.setItem('amtSeen', currentModalsSeen);
      sessionStorage.setItem('modalId', trackingId);
      setModalPosition('visible');
    }
  }, []);

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
      <p className={SlideModalStyles.heading}>{heading}</p>
      {subheading && <p className={SlideModalStyles.subheading}>{subheading}</p>}
      <Button
        id={appendedTrackingId}
        urlIsRelativePath={false}
        text={ctaText}
        href={`${ctaLink}?modal_id=${appendedTrackingId}`}
        openInNewTab
        useSnowplowTracking
        buttonStyle="primary"
        className={SlideModalStyles.cta}
      />
    </div>
  );
};

export default SimpleSlideModal;
