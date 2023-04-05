import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { scroller } from 'react-scroll';

import Button from '../Button/Button';

import * as HeroStyles from './Hero.module.scss';

import whitePinIcon from '../../assets/images/bootcamp/hero-icon-pin.svg';
import whiteClockIcon from '../../assets/images/bootcamp/hero-icon-clock.svg';
import violetPinIcon from '../../assets/images/course-details/heroIconPin.svg';
import violetClockIcon from '../../assets/images/course-details/heroIconClock.svg';
import reviewsIcon from '../../assets/images/course-details/heroIconReviews.png';
import handsonIcon from '../../assets/images/course-details/heroIconHandson.png';
import projectsIcon from '../../assets/images/course-details/heroIconProjects.png';
import expertsIcon from '../../assets/images/course-details/heroIconExperts.png';
import { monthAndDay } from '../../helpers/formatters';

const Hero = ({
  heroContent,
  locationPin,
  timePin,
  backgroundColor,
  subheading,
  upcomingSessions,
  bootcamp = true
}) => {
  const heroStyle = backgroundColor ? 'heroContent'.concat(backgroundColor) : 'heroContentBackup';

  const scrollToAnchor = (e, target) => {
    e.preventDefault();
    scroller.scrollTo(target, {
      offset: -100,
      duration: 800,
      delay: 0,
      smooth: true
    });
  };

  return (
    <section className="grid-wrapper">
      <div className={HeroStyles.heroImage}>
        <GatsbyImage
          image={heroContent.image.gatsbyImageData}
          alt={heroContent.image.description}
          loading="eager"
        />
      </div>
      <div className={`${HeroStyles.heroContent} ${HeroStyles[heroStyle]}`}>
        <h1 className={HeroStyles.seoHeading}>{heroContent.h1Heading}</h1>
        <h2 className={HeroStyles.header}>{heroContent.mainVisualHeading}</h2>
        <p className={HeroStyles.iconText}>
          {subheading || (
            <>
              <span>
                <img src={bootcamp ? whitePinIcon : violetPinIcon} alt="" />
                {locationPin}
              </span>{' '}
              <span>
                <img src={bootcamp ? whiteClockIcon : violetClockIcon} alt="" />{' '}
                {upcomingSessions.length
                  ? `Next course starts ${monthAndDay(upcomingSessions[0].startDate)}!`
                  : timePin}
              </span>
            </>
          )}
        </p>
        <p
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: heroContent.introParagraph.childMarkdownRemark.rawMarkdownBody
          }}
        />
        <div className={HeroStyles.heroButtonContainer}>
          {heroContent.ctaButtons !== null ? (
            heroContent.ctaButtons.map((button, index) => {
              return (
                <Button
                  key={button.id}
                  urlIsRelativePath={button.isUrlRelativePath}
                  href={button.url}
                  text={button.text}
                  openInNewTab={button.openInNewTab}
                  useSnowplowTracking={button.useSnowplowTracking}
                  buttonStyle={index === 0 ? 'primary' : 'secondaryviolet'}
                />
              );
            })
          ) : (
            <Button
              urlIsRelativePath
              href="/apply"
              buttonStyle="secondaryviolet"
              text="Apply Now"
            />
          )}
        </div>
      </div>
      {!bootcamp && (
        <div className={HeroStyles.heroNav}>
          <ul>
            <li>
              <a
                href="#learn"
                onClick={(event) => {
                  scrollToAnchor(event, 'learn');
                }}
              >
                <div className={HeroStyles.navIcon}>
                  <img src={handsonIcon} alt="Nav Intro section icon" />
                </div>
                Hands-On Project-Based Learning
              </a>
            </li>
            <li>
              <a
                href="#reviews"
                onClick={(event) => {
                  scrollToAnchor(event, 'reviews');
                }}
              >
                <div className={HeroStyles.navIcon}>
                  <img src={reviewsIcon} alt="Nav Reviews section icon" />
                </div>
                600+ 5-Star Reviews from Happy Alumni
              </a>
            </li>
            <li>
              <a
                href="#projects"
                onClick={(event) => {
                  scrollToAnchor(event, 'projects');
                }}
              >
                <div className={HeroStyles.navIcon}>
                  <img src={projectsIcon} alt="Nav Projects section icon" />
                </div>
                Portfolio-Worthy Projects Built to Impress
              </a>
            </li>
            <li>
              <a
                href="#course-package"
                onClick={(event) => {
                  scrollToAnchor(event, 'course-package');
                }}
              >
                <div className={HeroStyles.navIcon}>
                  <img src={expertsIcon} alt="Nav Course package section icon" />
                </div>
                Content Created by Industry Experts
              </a>
            </li>
          </ul>
        </div>
      )}
    </section>
  );
};

export default Hero;
