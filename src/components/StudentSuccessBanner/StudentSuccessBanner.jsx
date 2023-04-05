import React from 'react';

import Button from '../Button/Button';
import CircleHeadshot from '../CircleHeadshot/CircleHeadshot';
import CalendlyEmbedDrawer from '../CalendlyEmbedDrawer/CalendlyEmbedDrawer';

import * as StudentSuccessBannerStyles from './StudentSuccessBanner.module.scss';

const StudentSuccessBanner = ({
  bannerContent,
  parentStyles,
  calendlyButtonId,
  preLoadCalendly,
  halfGridWidth = false,
  showCalendlyEmbed = false
}) => {
  const { successConsultants, heading, text, ctaButton } = bannerContent;

  return (
    <div
      className={`${StudentSuccessBannerStyles.banner} ${parentStyles} ${
        showCalendlyEmbed ? StudentSuccessBannerStyles.withCalendly : ''
      } ${
        halfGridWidth ? StudentSuccessBannerStyles.halfWidth : StudentSuccessBannerStyles.fullWidth
      }`}
    >
      {successConsultants && (
        <div
          className={`${StudentSuccessBannerStyles.portraits} ${
            StudentSuccessBannerStyles[`totalPortraits${successConsultants.length}`]
          }`}
        >
          {successConsultants.map((person, index) => {
            return (
              <CircleHeadshot
                key={person.id}
                imageData={person.headshot.gatsbyImageData}
                altText={person.name}
                className={`${StudentSuccessBannerStyles.person} ${
                  StudentSuccessBannerStyles[`person${index + 1}`]
                }`}
              />
            );
          })}
        </div>
      )}

      {heading && <h3 className={StudentSuccessBannerStyles.heading}>{heading}</h3>}
      <p
        className={StudentSuccessBannerStyles.description}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: text.childMarkdownRemark.rawMarkdownBody
        }}
      />
      {showCalendlyEmbed ? (
        <CalendlyEmbedDrawer
          buttonId={calendlyButtonId}
          className={StudentSuccessBannerStyles.calendlyEmbed}
          uniqueButtonText={ctaButton?.text || ''}
          fullPageWidth={!halfGridWidth}
          preLoadCalendly={preLoadCalendly}
        />
      ) : (
        <Button
          urlIsRelativePath={ctaButton.isUrlRelativePath}
          href={ctaButton.url}
          text={ctaButton.text}
          openInNewTab={ctaButton.openInNewTab}
          useSnowplowTracking={ctaButton.useSnowplowTracking}
          buttonStyle="primary"
        />
      )}
    </div>
  );
};

export default StudentSuccessBanner;
