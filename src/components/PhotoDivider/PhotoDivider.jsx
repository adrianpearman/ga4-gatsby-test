import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

import * as PhotoDividerStyles from './PhotoDivider.module.scss';

const PhotoDivider = ({ images, className }) => {
  return (
    <div
      className={`${PhotoDividerStyles.divider} ${
        PhotoDividerStyles[`totalImage${images.length}`]
      } ${className}`}
    >
      {images.map((image) => (
        <GatsbyImage
          image={image.gatsbyImageData}
          key={image.id}
          alt={image.description}
          className={PhotoDividerStyles.image}
          loading="lazy"
        />
      ))}
    </div>
  );
};

export default PhotoDivider;
