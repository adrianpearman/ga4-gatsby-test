/* eslint-disable no-plusplus */
import { useState } from 'react';

function useItemSwitcher(items, beforeAndAfter = 0, loop = true) {
  const [currentIndex, setCurrentItem] = useState(0);
  const current = items[currentIndex];

  const next = () => {
    let nextView = currentIndex + 1;
    if (nextView >= items.length) {
      if (!loop) {
        return;
      }
      nextView = 0;
    }
    setCurrentItem(nextView);
  };

  const previous = () => {
    let previousView = currentIndex - 1;
    if (previousView < 0) {
      if (!loop) {
        return;
      }
      previousView = items.length - 1;
    }
    setCurrentItem(previousView);
  };

  const before = [];
  const after = [];
  let beforeIndex = currentIndex;
  let afterIndex = currentIndex;

  for (let count = 1; count <= beforeAndAfter; count++) {
    beforeIndex--;
    afterIndex++;

    if (beforeIndex < 0 && loop) {
      beforeIndex = items.length - 1;
    }

    if (beforeIndex >= 0) {
      before.push(items[beforeIndex]);
    }

    if (afterIndex >= items.length && loop) {
      afterIndex = 0;
    }

    if (afterIndex < items.length) {
      after.push(items[afterIndex]);
    }
  }

  before.reverse();

  return {
    current,
    next,
    previous,
    currentIndex,
    before,
    after,
    itemRange: [...before, current, ...after],
    currentRangeIndex: before.length
  };
}

export default useItemSwitcher;
