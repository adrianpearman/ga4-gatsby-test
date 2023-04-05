import React from 'react';
import { InlineWidget, useCalendlyEventListener } from 'react-calendly';

// settings moved outside component to prevent InlineWidget component from re-rendering on state changes
const widgetPageSettings = {
  hideEventTypeDetails: true,
  primaryColor: 'ea593e',
  textColor: '221c38'
};

const CalendlyWidget = ({ buttonId, handleEventScheduled }) => {
  let calendlyUrl = 'https://calendly.com/juno-college/website-book-phone-call-embed';

  if (buttonId === 'corporate-training-calendly') {
    calendlyUrl = 'https://calendly.com/juno-college/website-corporate-training';
  }

  useCalendlyEventListener({
    onEventScheduled: handleEventScheduled
  });

  return <InlineWidget url={calendlyUrl} pageSettings={widgetPageSettings} />;
};

export default CalendlyWidget;
