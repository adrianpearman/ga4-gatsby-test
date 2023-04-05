import React from 'react';
import 'intersection-observer';
import { InView } from 'react-intersection-observer';

import JunoBrandIcon from '../SVG/JunoBrandIcon';

import * as NavStyles from './SideNav.module.scss';

const SideBar = ({ linkText, linkTargets, onLinkClick, onInViewChange }) => {
  return (
    <InView threshold={0.8} onChange={(inView) => onInViewChange(inView)}>
      {({ ref }) => (
        <nav ref={ref} className={NavStyles.sideNav}>
          <p className={NavStyles.jumpTo}>Jump to FAQ topic</p>
          <JunoBrandIcon className={NavStyles.brandIcon} />
          <ul>
            {linkTargets.map((target, i) => {
              return (
                <li key={`faqLink-${target.toLowerCase().replace(/\s+/g, '-')}`}>
                  <a
                    className={NavStyles.sideLink}
                    href={`#${target.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={(e) => onLinkClick(e, target.toLowerCase().replace(/\s+/g, '-'))}
                  >
                    {linkText[i]}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </InView>
  );
};

export default SideBar;
