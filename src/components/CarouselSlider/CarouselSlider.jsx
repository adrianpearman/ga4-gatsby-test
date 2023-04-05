import React, { useRef, useState } from 'react';
import useItemSwitcher from '../../hooks/useItemSwitcher';

import ProjectCard from '../CarouselCards/ProjectCard';
import TestimonialStandardCard from '../CarouselCards/TestimonialStandardCard';
import ContentBlockCard from '../CarouselCards/ContentBlockCard';

import Chevron from '../SVG/Chevron';

import * as CarouselSliderStyles from './CarouselSlider.module.scss';

const CarouselSlider = ({ sliderCards, cardType, numberOfPreviewsVisible, parentClass }) => {
  const {
    current: currentCard,
    next: nextCard,
    previous: previousCard,
    itemRange,
    currentRangeIndex
  } = useItemSwitcher(sliderCards, numberOfPreviewsVisible);

  const visibleCards = numberOfPreviewsVisible > 0 ? itemRange : [currentCard];

  const allCardsRef = useRef(null);

  const rangeIndexClasses = {
    [currentRangeIndex - 1]: CarouselSliderStyles.previousCard,
    [currentRangeIndex]: CarouselSliderStyles.currentCard,
    [currentRangeIndex + 1]: CarouselSliderStyles.nextCard
  };

  const [itemOffset, setItemOffset] = useState('');

  const handleTransitionEnd = (event) => {
    if (event.target !== allCardsRef.current) {
      return;
    }

    if (itemOffset === 'next') {
      nextCard();
    } else if (itemOffset === 'prev') {
      previousCard();
    }
    setItemOffset('');
  };

  return (
    <div
      className={`${CarouselSliderStyles[cardType]} ${CarouselSliderStyles.fullCarousel} ${
        itemOffset ? `${CarouselSliderStyles.offset} ${CarouselSliderStyles[itemOffset]}` : ''
      } ${parentClass}`}
    >
      {sliderCards.length > 1 ? (
        <div className={CarouselSliderStyles.buttonContainer}>
          <button
            type="button"
            className={CarouselSliderStyles.previousButton}
            onClick={() => setItemOffset('prev')}
          >
            <Chevron parentStyles={CarouselSliderStyles.icon} />
          </button>
          <button
            type="button"
            className={CarouselSliderStyles.nextButton}
            onClick={() => setItemOffset('next')}
          >
            <Chevron parentStyles={CarouselSliderStyles.icon} />
          </button>
        </div>
      ) : null}

      <ul
        className={CarouselSliderStyles.allCards}
        onTransitionEnd={handleTransitionEnd}
        ref={allCardsRef}
      >
        {visibleCards.map((card, index) => (
          <li
            key={`${card.id}${sliderCards.length < itemRange.length ? index : ''}`}
            className={`${CarouselSliderStyles.card} ${
              rangeIndexClasses[index] ? rangeIndexClasses[index] : ''
            }`}
          >
            {cardType === 'testimonialShort' && (
              <TestimonialStandardCard card={card} simpleByline />
            )}
            {cardType === 'testimonialStandard' && <TestimonialStandardCard card={card} />}
            {cardType === 'project' && (
              <ProjectCard card={card} isCurrentCard={currentRangeIndex === index} />
            )}
            {cardType === 'contentBlock' && (
              <ContentBlockCard card={card} isCurrentCard={currentRangeIndex === index} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarouselSlider;
