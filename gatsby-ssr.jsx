// eslint-disable-next-line no-unused-vars
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

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      key="lyon-light"
      rel="preload"
      href="/fonts/LyonDisplay-Light-Web.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />,
    <link
      key="lyon-regular"
      rel="preload"
      href="/fonts/LyonDisplay-Regular-Web.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />,
    <link
      key="neurial-italic"
      rel="preload"
      href="/fonts/NeurialGrotesk-Italic.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />,
    <link
      key="neurial-medium"
      rel="preload"
      href="/fonts/NeurialGrotesk-Medium.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />,
    <link
      key="neurial-regular"
      rel="preload"
      href="/fonts/NeurialGrotesk-Regular.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />
  ]);
};

export const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  const headComponents = getHeadComponents();
  // Sorting head elements so that any with the data-rh property are moved to the top. Fixes twitter issue where it can't find our meta tags because they come after the stylesheet.
  const sortedHead = headComponents.sort((a) => {
    // data-rh property is added by react-helmet and is how we're adding in our twitter meta tags
    if (a.props && a.props['data-rh']) {
      return 0;
    }
    return 1;
  });

  replaceHeadComponents(sortedHead);
};
