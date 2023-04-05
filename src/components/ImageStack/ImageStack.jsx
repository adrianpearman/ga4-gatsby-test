/* eslint-disable react/no-array-index-key */
import React from 'react';
import 'intersection-observer';
import { useInView } from 'react-intersection-observer';
import { getSrc } from 'gatsby-plugin-image';

import * as StackStyles from './ImageStack.module.scss';

const ImageStack = ({ images }) => {
  // This component expects 'images' to be an array of Contentful image objects, each containing a description for the alt text
  // and a fluid object with the src inside

  const { ref, inView } = useInView({
    threshold: 0.9,
    rootMargin: '250px 0px 0px 0px'
  });

  return (
    <div ref={ref} className={StackStyles.stackContainer}>
      {images.map((image, i) => {
        return (
          <img
            className={
              inView
                ? `${StackStyles.stackImage} stack-image-${i}`
                : `${StackStyles.stackImage} stack-image-start-${i}`
            }
            src={getSrc(image)}
            alt={image.description}
            style={{ zIndex: images.length - i }}
            key={`image-${i}`}
          />
        );
      })}
    </div>
  );
};

export default ImageStack;
