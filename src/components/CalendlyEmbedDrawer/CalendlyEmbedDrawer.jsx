import React, { useState, useEffect } from 'react';
import loadable from '@loadable/component';

import Button from '../Button/Button';
import Hamburger from '../SVG/Hamburger';

import * as CalendlyEmbedDrawerStyles from './CalendlyEmbedDrawer.module.scss';

const CalendlyWidget = loadable(() => import('./CalendlyWidget'));

const CalendlyEmbedDrawer = ({
  buttonId,
  className,
  uniqueButtonText,
  fullPageWidth,
  darkHideButton = false,
  preLoadCalendly = false
}) => {
  const [calendlySectionOpened, setCalendlySectionOpened] = useState(false);
  const [calendlyWidgetLoaded, setCalendlyWidgetLoaded] = useState(false);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);

  useEffect(() => {
    if (preLoadCalendly) {
      setCalendlySectionOpened(true);
    }
  }, [preLoadCalendly]);

  const handleEventScheduled = () => {
    setSuccessMessageVisible(true);
  };

  const handleCalendlyTransitionEnd = () => {
    if (!successMessageVisible) {
      setCalendlyWidgetLoaded(true);
    }
  };

  const handleHideCalendlyWidget = () => {
    setCalendlySectionOpened(false);
    if (successMessageVisible) {
      setSuccessMessageVisible(false);
    }
  };

  return (
    <div
      className={`${CalendlyEmbedDrawerStyles.widgetWrapper} ${className} ${
        fullPageWidth ? CalendlyEmbedDrawerStyles.fullPageWidth : ''
      }`}
    >
      <div
        className={`${CalendlyEmbedDrawerStyles.calendlyEmbed} ${
          calendlySectionOpened ? CalendlyEmbedDrawerStyles.expandTransition : ''
        } ${calendlyWidgetLoaded ? CalendlyEmbedDrawerStyles.fadeInTransition : ''} ${
          successMessageVisible ? CalendlyEmbedDrawerStyles.shortenContainer : ''
        }`}
        onTransitionEnd={(event) => handleCalendlyTransitionEnd(event)}
      >
        {calendlySectionOpened && (
          <CalendlyWidget buttonId={buttonId} handleEventScheduled={handleEventScheduled} />
        )}
      </div>
      {calendlySectionOpened ? (
        <button
          type="button"
          aria-label="Close calendly window"
          onClick={() => handleHideCalendlyWidget()}
          className={`${CalendlyEmbedDrawerStyles.hideButton} ${
            darkHideButton ? CalendlyEmbedDrawerStyles.dark : ''
          }`}
        >
          <Hamburger transformToX parentStyles={CalendlyEmbedDrawerStyles.svg} />
        </button>
      ) : (
        <Button
          type="button"
          text={uniqueButtonText || 'Book a Call'}
          onClick={() => setCalendlySectionOpened(true)}
          buttonStyle="primary"
          id={`${buttonId}-bac-banner`}
        />
      )}
    </div>
  );
};

export default CalendlyEmbedDrawer;
