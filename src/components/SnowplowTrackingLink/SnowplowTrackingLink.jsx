/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import useSnowplowDomainUserId from '../../hooks/useSnowplowDomainUserId';

const SimpleAnchor = (props) => {
  const { href, className, children } = props;
  return (
    <a {...props} href={href} className={className}>
      {children}
    </a>
  );
};

function useSnowplowTrackedHref(href) {
  const domainUserId = useSnowplowDomainUserId();

  if (!/^https?:\/\//i.test(href)) {
    // if the link doesn't start with `http/https`, do nothing.
    return href;
  }

  const url = new URL(href);
  if (domainUserId) {
    url.searchParams.append('utm_term', domainUserId);
  }
  return url.toString();
}

const withSnowplowTracking = (Component) => {
  // HOC that adds '?utm-term=[domainUserId]' to any components href attribute
  const WrappedComponent = (props) => {
    let { href } = props;
    href = useSnowplowTrackedHref(href);

    return <Component {...props} href={href} />;
  };
  return WrappedComponent;
};
const withSnowplowTrackingIfCalendly = (Component) => {
  // HOC that only adds Snowplow tracking if a components href is a calendly link
  const WrappedComponent = (props) => {
    const { href } = props;
    const isCalendlyLink = href.toLowerCase().startsWith('https://calendly.com');
    if (isCalendlyLink) {
      const TrackingComponent = withSnowplowTracking(Component);
      return <TrackingComponent {...props} target="_blank" rel="noopener noreferrer" />;
    }
    return <Component {...props} />;
  };
  return WrappedComponent;
};

const SnowplowTrackingAnchor = withSnowplowTracking(SimpleAnchor);
const SnowplowTrackingIfCalendlyAnchor = withSnowplowTrackingIfCalendly(SimpleAnchor);

export { SnowplowTrackingAnchor, SnowplowTrackingIfCalendlyAnchor, useSnowplowTrackedHref };
