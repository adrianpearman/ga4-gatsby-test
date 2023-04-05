import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import SiteLink from '../SiteLink/SiteLink';
import Button from '../Button/Button';
import CircleHeadshot from '../CircleHeadshot/CircleHeadshot';

import { monthAndDay, weekDay } from '../../helpers/formatters';
import fallbackLogo from '../../assets/images/events/author-instructor-defaultcircle-juno.png';

import * as WorkshopCardStyles from './WorkshopCard.module.scss';

const Workshops = ({
  title,
  description,
  date,
  time,
  eventType,
  location,
  image,
  registrationLink,
  buttonText,
  instructor,
  cardStyle = 'primary',
  recording = false
}) => {
  const eventDay = weekDay(date);
  const eventDate = monthAndDay(date);
  const { headshot } = instructor;

  const setSkillLevel = (typeSkillLevel) => {
    if (typeSkillLevel === 'Beginner') {
      return 'Perfect for Beginners';
    }
    if (typeSkillLevel === 'Intermediate') {
      return 'Intermediate Level';
    }
    if (typeSkillLevel === 'Level Up') {
      return 'Start Levelling Up';
    }
    return 'Perfect for Beginners';
  };

  const setGroupName = (type) => {
    if (type.name === 'Unique') {
      return '';
    }
    if (type.associatedProduct) {
      return `Free ${type.associatedProduct.name} ${type.format}`;
    }
    return `Free  ${type.format}`;
  };

  const findSlug = (instructorName) => {
    if (instructorName === 'The Juno Team') {
      return '';
    }
    return instructorName
      .toLowerCase()
      .trim()
      .replace(/[^\w ]+/g, '')
      .replace(/\s+/g, '-');
  };

  return (
    <section className={`${WorkshopCardStyles.card} ${WorkshopCardStyles[cardStyle]}`}>
      <div className={WorkshopCardStyles.dateTime}>
        {recording ? (
          <h4 className={WorkshopCardStyles.date}>Watch Online At Any Time</h4>
        ) : (
          <h4 className={WorkshopCardStyles.date}>
            <span>{eventDay}</span>
            {eventDate}
          </h4>
        )}
        <div className={WorkshopCardStyles.timeAddress}>
          {time && <p>{time}</p>}
          {location && <p>{location}</p>}
        </div>
        <div className={WorkshopCardStyles.instructorBlock}>
          {headshot ? (
            <CircleHeadshot
              imageData={headshot.gatsbyImageData}
              altText={instructor.name === 'The Juno Team' ? 'Juno Logo' : instructor.name}
              size="75px"
              className={WorkshopCardStyles.instructorPhoto}
            />
          ) : (
            <div className={WorkshopCardStyles.instructorPhoto}>
              <img src={fallbackLogo} alt="Juno Logo" />
            </div>
          )}
          <div>
            <p className={WorkshopCardStyles.superTitle}>Instructed By</p>
            <SiteLink to={`/company/${findSlug(instructor.name)}`}>{instructor.name}</SiteLink>
          </div>
        </div>
      </div>
      <div className={WorkshopCardStyles.image}>
        <GatsbyImage image={image.gatsbyImageData} alt={image.description} />
      </div>
      <div className={WorkshopCardStyles.descriptionBlock}>
        {setGroupName(eventType) && (
          <p className={WorkshopCardStyles.superTitle}>{setGroupName(eventType)}</p>
        )}
        <h3 className={WorkshopCardStyles.title}>{title}</h3>
        {description && (
          <p
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: description.childMarkdownRemark.rawMarkdownBody
            }}
          />
        )}
        {registrationLink && (
          <Button
            urlIsRelativePath={false}
            href={registrationLink}
            text={buttonText}
            openInNewTab
            useSnowplowTracking
            buttonStyle="secondary"
          />
        )}
      </div>
      <div className={`${WorkshopCardStyles.category} ${WorkshopCardStyles[cardStyle]}`}>
        {setSkillLevel(eventType.skillLevel) && <p>{setSkillLevel(eventType.skillLevel)}</p>}
      </div>
    </section>
  );
};

export default Workshops;
