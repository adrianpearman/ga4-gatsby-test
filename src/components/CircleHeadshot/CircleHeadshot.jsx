import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

import { headshot } from './CircleHeadshot.module.scss';

const CircleHeadshot = ({ imageData, altText, size, className }) => {
  return (
    <GatsbyImage
      image={imageData}
      alt={altText || ''}
      style={size && { width: size, height: size }}
      className={`${className || ''} ${headshot}`}
      objectPosition="top center"
      loading="lazy"
    />
  );
};

export default CircleHeadshot;
