import React from 'react';
import { Link } from 'gatsby';

const SiteLink = ({ to, id, className, onFocus, onClick, children }) => {
  const urlRegex = /(www)|(http)/gi;
  const isExternalUrl = to.match(urlRegex);

  const paramsRegex = /(\?|#)/gi;
  let incomingLink = to;
  let urlParams = '';

  if (to.match(paramsRegex)) {
    // find the index of either a '?' or '#' character and log the number. '?' will typically come before '#' which is why it is ordered first in the conditional (in case a link has both)
    const sliceIndex =
      (to.indexOf('?') !== -1 && to.indexOf('?')) || (to.indexOf('#') !== -1 && to.indexOf('#'));
    incomingLink = to.slice(0, sliceIndex);
    urlParams = to.slice(sliceIndex);
  }
  if (incomingLink.charAt(0) !== '/') {
    incomingLink = `/${incomingLink}`;
  }
  if (incomingLink.charAt(incomingLink.length - 1) !== '/') {
    incomingLink = `${incomingLink}/`;
  }

  return (
    <>
      {isExternalUrl ? (
        <a id={id} href={to} className={className} onFocus={onFocus} onClick={onClick}>
          {children}
        </a>
      ) : (
        <Link
          id={id || undefined}
          to={`${incomingLink}${urlParams}`}
          className={className}
          onFocus={onFocus}
          onClick={onClick}
        >
          {children}
        </Link>
      )}
    </>
  );
};

export default SiteLink;
