/* eslint-disable react/no-danger */
import React from 'react';

import Stamp from '../Stamp/Stamp';
import OuterStamp from '../../assets/images/about/stamp-innovative-educationmodel-outer.svg';
import InnerStamp from '../../assets/images/about/stamp-innovative-educationmodel-innerfixed.svg';

import * as heroStyles from './Hero.module.scss';
import Button from '../Button/Button';

const Hero = ({ heroData, asideContent }) => {
  return (
    <section className={`grid-wrapper ${heroStyles.hero}`}>
      <div className={heroStyles.titleBlock}>
        <h6 className={heroStyles.surTitle}>{heroData.h1Heading}</h6>
        <h1 className={heroStyles.sectionTitle}>{heroData.mainVisualHeading}</h1>
      </div>

      <div className={heroStyles.stampWrapper}>
        <Stamp OuterStamp={OuterStamp} InnerStamp={InnerStamp} />
      </div>

      <div
        className={heroStyles.introCopy}
        dangerouslySetInnerHTML={{
          __html: heroData.introParagraph.childMarkdownRemark.html
        }}
      />

      {heroData.ctaButtons && (
        <Button
          urlIsRelativePath={heroData.ctaButtons[0].isUrlRelativePath}
          href={heroData.ctaButtons[0].url}
          text={heroData.ctaButtons[0].text}
          openInNewTab={heroData.ctaButtons[0].openInNewTab}
          useSnowplowTracking={heroData.ctaButtons[0].useSnowplowTracking}
          buttonStyle="primary"
          className={heroStyles.button}
          id="about-page-hero"
        />
      )}

      {asideContent && (
        <div
          className={heroStyles.heroSidebar}
          dangerouslySetInnerHTML={{
            __html: asideContent.description.childMarkdownRemark.html
          }}
        />
      )}
    </section>
  );
};

export default Hero;
