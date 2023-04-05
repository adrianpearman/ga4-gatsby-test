import React, { useEffect, useState } from 'react';

const LastTouchHiddenFormInputs = () => {
  const [utmValues, setUtmValues] = useState({
    source: '',
    medium: '',
    campaign: ''
  });
  // If user comes to form from an ad, pull the last touch query parameters from the URL
  useEffect(() => {
    const getParameterByName = (queryString, name) => {
      // eslint-disable-next-line no-useless-escape
      const escapedName = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      const queryParamPattern = new RegExp(`[\\?&]${escapedName}=([^&#]*)`);
      const results = queryParamPattern.exec(queryString);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };
    setUtmValues({
      source: getParameterByName(window.location.search, 'utm_source'),
      medium: getParameterByName(window.location.search, 'utm_medium'),
      campaign: getParameterByName(window.location.search, 'utm_campaign')
    });
  }, []);

  return (
    <>
      <input
        type="hidden"
        name="last_touch_source"
        id="last_touch_source"
        value={utmValues.source}
      />
      <input
        type="hidden"
        name="last_touch_medium"
        id="last_touch_medium"
        value={utmValues.medium}
      />
      <input
        type="hidden"
        name="last_touch_campaign"
        id="last_touch_campaign"
        value={utmValues.campaign}
      />
    </>
  );
};

export default LastTouchHiddenFormInputs;
