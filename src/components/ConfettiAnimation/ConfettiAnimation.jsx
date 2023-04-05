import React, { useCallback, useEffect, useState } from 'react';
import Confetti from 'react-confetti';

// make sure to give the parent element position: relative
import * as ConfettiAnimationStyles from './ConfettiAnimation.module.scss';

const ConfettiAnimation = ({ parentClass = '', loopDuration = 4000 }) => {
  const calculateWidth = (windowWidth) => {
    if (windowWidth > 1415) {
      return 1400;
    }
    return windowWidth - 15;
  };

  const [canvasSize, setCanvasSize] = useState({});

  const containerDimensions = useCallback((node) => {
    if (node !== null) {
      setCanvasSize({
        width: node.offsetWidth,
        height: node.offsetHeight
      });
    }
  }, []);

  useEffect(() => {
    const handleWindowResize = () => {
      setCanvasSize({
        width: calculateWidth(window.innerWidth),
        height: window.innerHeight
      });
    };
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [containerDimensions]);

  // let the animation run for a set duration before stopping
  const [loopAnimation, setLoopAnimation] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoopAnimation(false);
    }, loopDuration);
  }, [loopDuration]);

  return (
    <div
      ref={containerDimensions}
      className={`${ConfettiAnimationStyles.confettiContainer} ${parentClass}`}
    >
      <Confetti
        width={canvasSize.width}
        height={canvasSize.height}
        colors={[
          '#ea593e',
          '#84707f',
          '#b6d9d4',
          '#c7d5df',
          '#96a1be',
          '#e59c2e',
          '#ffcdaf',
          '#ea593e'
        ]}
        recycle={loopAnimation}
        numberOfPieces={75}
      />
    </div>
  );
};

export default ConfettiAnimation;
