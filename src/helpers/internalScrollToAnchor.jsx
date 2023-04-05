import { scroller } from 'react-scroll';

const scrollToAnchor = (e, target, offset = 0) => {
  e.preventDefault();
  scroller.scrollTo(target, {
    offset,
    duration: 800,
    delay: 0,
    smooth: true
  });
};

export default scrollToAnchor;
