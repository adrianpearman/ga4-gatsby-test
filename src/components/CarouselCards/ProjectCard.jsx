import React from 'react';
import { GatsbyImage } from "gatsby-plugin-image";

import rightArrow from '../../assets/images/icons/arrow-link-linkred.svg';

import * as ProjectCardStyles from './ProjectCard.module.scss';

const ProjectCard = ({ card, isCurrentCard }) => {
  return (
    <div className={ProjectCardStyles.projectCard}>
      <div className={ProjectCardStyles.imageWrapper}>
        {card.projectImageThumbnail ? (
          <GatsbyImage image={card.projectImageThumbnail.gatsbyImageData} alt={card.projectTitle} />
        ) : (
          <GatsbyImage image={card.projectImage.gatsbyImageData} alt={card.projectTitle} />
        )}
      </div>
      <div className={ProjectCardStyles.textWrapper}>
        <h4 className={ProjectCardStyles.title}>{card.projectTitle}</h4>
        {card.projectUrl && (
          <a
            href={card.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={isCurrentCard ? 'View this project' : 'This link is currently deactivated'}
            className={`${ProjectCardStyles.projectLink} ${
              isCurrentCard ? '' : ProjectCardStyles.deactivated
            }`}
            tabIndex={isCurrentCard ? 0 : -1}
          >
            View Live <img src={rightArrow} alt="" />
          </a>
        )}
        <p className={ProjectCardStyles.description}>
          {card.projectDescription.projectDescription}
        </p>
        <p className={ProjectCardStyles.byline}>
          {card.byline ? card.byline : `Built by ${card.studentName}`}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
