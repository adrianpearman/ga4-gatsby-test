import React from 'react';
import { GatsbyImage } from "gatsby-plugin-image";

import * as ContentBlockCardStyles from './ContentBlockCard.module.scss';

const ProjectCard = ({ card, isCurrentCard }) => {
  return (
    <div className={ContentBlockCardStyles.contentBlockCard}>
      <div className={ContentBlockCardStyles.imageWrapper}>
        <GatsbyImage image={card.asset.gatsbyImageData} alt={card.asset.description} />
      </div>
      <div className={ContentBlockCardStyles.textWrapper}>
        <h3 className={ContentBlockCardStyles.title}>{card.title}</h3>
        <p
          className={ContentBlockCardStyles.description}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: card.bodyText.childMarkdownRemark.rawMarkdownBody
          }}
        />
        {card.button && (
          // eslint-disable-next-line react/jsx-no-target-blank
          <a
            href={card.button.url}
            target={card.button.openInNewTab ? '_blank' : ''}
            rel={card.button.openInNewTab ? 'noopener noreferrer' : ''}
            aria-label={isCurrentCard ? 'View this project' : 'This link is currently deactivated'}
            className={`link-arrow ${ContentBlockCardStyles.cta} ${
              isCurrentCard ? '' : ContentBlockCardStyles.deactivated
            }`}
            tabIndex={isCurrentCard ? 0 : -1}
          >
            {card.button.text}
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
