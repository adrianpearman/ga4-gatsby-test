import React from 'react';
import SiteLink from '../SiteLink/SiteLink';
import { useSnowplowTrackedHref } from '../SnowplowTrackingLink/SnowplowTrackingLink';

import * as ButtonStyles from './Button.module.scss';

const Button = ({
  href,
  text,
  urlIsRelativePath,
  openInNewTab,
  useSnowplowTracking,
  buttonStyle,
  className = '',
  type,
  id = null,
  onFocus,
  onClick,
  ref = null,
  disabled = false
}) => {
  const snowplowTrackedHref = useSnowplowTrackedHref(href);

  const allowButtonWrap = text.length >= 32;

  if (type === 'submit') {
    return (
      <button
        id={id}
        className={`btn ${ButtonStyles[buttonStyle]} ${className} ${
          allowButtonWrap ? 'allow-wrap' : ''
        }`}
        type="submit"
        onClick={onClick}
        onFocus={onFocus}
        disabled={disabled}
      >
        {text}
      </button>
    );
  }

  if (type === 'button') {
    return (
      <button
        id={id}
        className={`btn ${ButtonStyles[buttonStyle]} ${className} ${
          allowButtonWrap ? 'allow-wrap' : ''
        }`}
        type="button"
        onClick={onClick}
        onFocus={onFocus}
        disabled={disabled}
        ref={ref}
      >
        {text}
      </button>
    );
  }

  if (urlIsRelativePath) {
    return (
      <SiteLink
        id={id}
        className={`btn ${ButtonStyles[buttonStyle]} ${className} ${
          allowButtonWrap ? 'allow-wrap' : ''
        }`}
        to={href}
        onClick={onClick}
        onFocus={onFocus}
      >
        {text}
      </SiteLink>
    );
  }

  if (!urlIsRelativePath) {
    return (
      <a
        id={id}
        className={`btn ${ButtonStyles[buttonStyle]} ${className} ${
          allowButtonWrap ? 'allow-wrap' : ''
        }`}
        href={useSnowplowTracking ? snowplowTrackedHref : href}
        onClick={onClick}
        onFocus={onFocus}
        target={openInNewTab ? '_blank' : ''}
        rel="noopener noreferrer"
      >
        {text}
      </a>
    );
  }

  return null;
};

export default Button;
