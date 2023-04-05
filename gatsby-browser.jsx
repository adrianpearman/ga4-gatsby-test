import React from 'react';
import { Script } from 'gatsby';

export const wrapRootElement = ({ element }) => {
  return (
    <>
      <Script
        key="snowplow"
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            ;(function(p,l,o,w,i,n,g){if(!p[i]){p.GlobalSnowplowNamespace=p.GlobalSnowplowNamespace||[];
            p.GlobalSnowplowNamespace.push(i);p[i]=function(){(p[i].q=p[i].q||[]).push(arguments)
            };p[i].q=p[i].q||[];n=l.createElement(o);g=l.getElementsByTagName(o)[0];n.async=1;
            n.src=w;g.parentNode.insertBefore(n,g)}}(window,document,'script','//d1fc8wv8zag5ca.cloudfront.net/2.5.3/sp.js','snowplow'));
            window.snowplow('newTracker', 'cf', 'events.fivetran.com/snowplow/innate_expelled', { // Initialize a tracker
              appId: 'juno-website',
              cookieDomain: null
            });
            `
        }}
      />
      {element}
    </>
  );
};
/* eslint-disable no-unused-expressions */
// Listen to all route updates and track all page views:
// Source: https://www.gatsbyjs.org/packages/gatsby-plugin-segment-js/#track-pageviews
// eslint-disable-next-line no-unused-vars
export const onRouteUpdate = ({ location, prevLocation }) => {
  if (!prevLocation) {
    let i = 0;
    const checkingForSnowplowFunction = setInterval(() => {
      if (i === 10) {
        clearInterval(checkingForSnowplowFunction);
        return;
      }
      if (window.snowplow) {
        window.snowplow('trackPageView');
        clearInterval(checkingForSnowplowFunction);
        return;
      }
      i += 1;
    }, 1000);
  } else {
    window.snowplow && window.snowplow('trackPageView');
  }
};
