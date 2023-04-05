/* eslint-disable react/no-danger */
import React, { useState, useEffect } from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import 'intersection-observer';
import { useInView } from 'react-intersection-observer';

import Button from '../Button/Button';
import Stamp from '../Stamp/Stamp';

import internalScrollToAnchor from '../../helpers/internalScrollToAnchor';
import sluggify from '../../helpers/sluggify';

import * as StandardHeroStyles from './StandardHero.module.scss';

const StandardHero = ({
  heroContent,
  className,
  children,
  background = 'defaultColor',
  stamp = null,
  largeHeading = false,
  allCapsSubheading = false,
  extraWide = false,
  decorativeToc = false,
  buttonId = ''
}) => {
  const {
    h1Heading,
    mainVisualHeading,
    subheading,
    introParagraph,
    ctaButtons,
    image,
    tableOfContents
  } = heroContent;

  const hasCtaButtons = ctaButtons?.length > 0;
  let rightSideContent = null;
  if (stamp) {
    rightSideContent = 'withStamp';
  }
  if (tableOfContents) {
    rightSideContent = 'withToc';
  }
  // edge case for the decorative ToC on the Why Choose Juno page
  if (tableOfContents && decorativeToc) {
    rightSideContent = 'withDecorativeToc';
  }
  if (image) {
    rightSideContent = 'withSideImage';
  }

  const [heroRef, heroInView] = useInView({
    triggerOnce: true
  });
  const [decorativeSlideTransition, setDecorativeSlideTransition] = useState('slideOut');
  useEffect(() => {
    if (heroInView) {
      setDecorativeSlideTransition('slideIn');
    }
  }, [heroInView]);

  const childIsJumpButton = children && children.props.id === 'jump-button';

  const bothHeadings = h1Heading && mainVisualHeading;

  return (
    <section
      ref={heroRef}
      className={`grid-wrapper ${StandardHeroStyles.hero} ${className || ''} ${
        StandardHeroStyles[background]
      } ${rightSideContent ? StandardHeroStyles[rightSideContent] : ''} ${
        extraWide ? StandardHeroStyles.extraWide : ''
      }`}
    >
      <div className={StandardHeroStyles.textWrapper}>
        {bothHeadings ? (
          <>
            <h1 className={StandardHeroStyles.h1Heading}>{h1Heading}</h1>
            <h2
              className={`${StandardHeroStyles.mainVisualHeading} ${
                largeHeading ? StandardHeroStyles.largeHeading : ''
              }`}
              dangerouslySetInnerHTML={{
                __html: mainVisualHeading
              }}
            />
          </>
        ) : (
          <h1
            className={`${StandardHeroStyles.mainVisualHeading} ${
              largeHeading ? StandardHeroStyles.largeHeading : ''
            }`}
          >
            {h1Heading || mainVisualHeading}
          </h1>
        )}
        {subheading && (
          <p
            className={`${StandardHeroStyles.subheading} ${
              allCapsSubheading ? StandardHeroStyles.allCaps : ''
            }`}
            dangerouslySetInnerHTML={{
              __html:
                subheading.childMarkdownRemark.rawMarkdownBody ||
                subheading.childMarkdownRemark.html
            }}
          />
        )}
        {introParagraph && (
          <div
            className={StandardHeroStyles.introParagraph}
            dangerouslySetInnerHTML={{
              __html:
                introParagraph.childMarkdownRemark.rawMarkdownBody ||
                introParagraph.childMarkdownRemark.html
            }}
          />
        )}
        {hasCtaButtons && !childIsJumpButton && (
          <div className={StandardHeroStyles.buttonsWrapper}>
            {ctaButtons.map((button, index) => (
              <Button
                key={button.id}
                urlIsRelativePath={button.isUrlRelativePath}
                href={button.url}
                text={button.text}
                id={buttonId || null}
                openInNewTab={button.openInNewTab}
                useSnowplowTracking={button.useSnowplowTracking}
                buttonStyle={index === 0 ? 'primary' : 'secondaryviolet'}
              />
            ))}
          </div>
        )}
        {childIsJumpButton && children}
      </div>
      {stamp && (
        <Stamp
          OuterStamp={stamp.outerStamp}
          InnerStamp={stamp.innerStamp}
          className={StandardHeroStyles.stamp}
        />
      )}
      {image && (
        <GatsbyImage
          image={image.gatsbyImageData}
          alt={image.description || ''}
          className={StandardHeroStyles.sideImage}
          loading="eager"
        />
      )}
      {tableOfContents && (
        <div
          className={`${StandardHeroStyles.tableOfContents} ${
            decorativeToc ? StandardHeroStyles.decorative : ''
          } ${StandardHeroStyles[decorativeSlideTransition]}`}
        >
          <h3>Jump to one of the links below to get started:</h3>
          <ul>
            {tableOfContents.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.customAnchor || sluggify(link.heading)}`}
                  onClick={(event) => {
                    internalScrollToAnchor(event, link.customAnchor || sluggify(link.heading));
                  }}
                >
                  {link.heading}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default StandardHero;
