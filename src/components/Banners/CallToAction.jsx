import React from 'react';

import Button from '../Button/Button';

import * as CtaStyles from './CallToAction.module.scss';

const CallToAction = ({ heading, button, purpleBg }) => {
  return (
    <div className={`${purpleBg ? CtaStyles.ctaPurple : CtaStyles.cta} grid-wrapper`}>
      <div className={CtaStyles.ctaContainer}>
        <h2>{heading}</h2>
        <Button
          urlIsRelativePath={button.isUrlRelativePath}
          buttonStyle="primary"
          href={button.url}
          text={button.text}
          openInNewTab={button.openInNewTab}
          useSnowplowTracking={button.useSnowplowTracking}
        />
      </div>
    </div>
  );
};

export default CallToAction;
