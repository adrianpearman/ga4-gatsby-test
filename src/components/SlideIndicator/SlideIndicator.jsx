import React from 'react';

import * as IndicatorStyles from './SlideIndicator.module.scss';

const SlideIndicator = (props) => {
  const { currentSlide, totalSlides } = props;

  const addMarkers = (total) => {
    const markers = [];
    for (let i = 1; i <= total; i += 1) {
      if (i === total) {
        markers.push(
          <div
            className={`${IndicatorStyles.innerStep} ${
              currentSlide >= i && IndicatorStyles.currentStep
            }`}
            key={`step-${i}`}
          >
            <p className={IndicatorStyles.number}>✓</p>
          </div>
        );
      } else {
        markers.push(
          <div
            className={`${IndicatorStyles.innerStep} ${
              currentSlide >= i && IndicatorStyles.currentStep
            }`}
            key={`step-${i}`}
          >
            <p className={IndicatorStyles.number}>{i}</p>
          </div>
        );
      }
    }
    return markers;
  };

  return (
    <div
      className={`${IndicatorStyles.applyStepsWrapper} ${IndicatorStyles.show} ${
        totalSlides === 3 ? IndicatorStyles.two : IndicatorStyles.six
      }`}
    >
      <div className={IndicatorStyles.applyStepsInner}>{addMarkers(totalSlides)}</div>
    </div>
  );
};

export default SlideIndicator;
