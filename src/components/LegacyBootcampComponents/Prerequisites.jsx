/* eslint-disable react/no-danger */
import React from 'react';

import * as PrerequisiteStyles from './Prerequisites.module.scss';
import sidebarIcon from '../../assets/images/bootcamp/cta-immersive-whatwelookfor.svg';

const Prerequisites = ({ heading, mainContent, asideContent, id = '' }) => {
  return (
    <section className={`grid-wrapper ${PrerequisiteStyles.prereq}`} id={id}>
      <div className={PrerequisiteStyles.content}>
        <h3 className={PrerequisiteStyles.title}>{heading}</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: mainContent
          }}
        />
      </div>

      <aside className={PrerequisiteStyles.sidebar}>
        <div className={PrerequisiteStyles.sidebarIcon}>
          <img src={sidebarIcon} alt="" />
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: asideContent
          }}
        />
      </aside>
    </section>
  );
};

export default Prerequisites;
