import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import * as ImageCarouselStyles from './ImageCarousel.module.scss';
import CarouselArrow from '../SVG/CarouselArrow';
import useItemSwitcher from '../../hooks/useItemSwitcher';

const ImageCarousel = ({ images, className }) => {
  const {
    current: currentImage,
    next: nextImage,
    previous: previousImage,
    currentIndex: currentImageIndex
  } = useItemSwitcher(images);

  return (
    <div
      className={`grid-wrapper ${ImageCarouselStyles.carousel} ${className || ''}`}
      style={{ background: 'transparent' }}
    >
      <div className={ImageCarouselStyles.campusImage}>
        {images.length > 1 && (
          <div className={ImageCarouselStyles.carouselButtons}>
            <p>
              {currentImageIndex + 1} of {images.length}
            </p>
            <button type="button" onClick={previousImage} aria-label="Show the previous image">
              <CarouselArrow direction="previous" type="secondary" transparentBackground />
            </button>
            <button
              type="button"
              onClick={nextImage}
              className={ImageCarouselStyles.nextArrow}
              aria-label="Show the next image"
            >
              <CarouselArrow direction="next" type="secondary" transparentBackground />
            </button>
          </div>
        )}
        <GatsbyImage image={currentImage.gatsbyImageData} alt={currentImage.description} />
      </div>
    </div>
  );
};

export default ImageCarousel;
