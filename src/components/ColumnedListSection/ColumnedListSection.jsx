/* eslint-disable react/no-danger */
import React from 'react';

import * as ColumnedListSectionStyles from './ColumnedListSection.module.scss';

const ColumnedListSection = ({ section, id, className }) => {
  const regex = /<li>/g;
  const amtOfListItems = section.description.childMarkdownRemark.html.match(regex);
  const numOfColumns = amtOfListItems.length >= 6 ? 'threeColumns' : 'twoColumns';

  return (
    <section id={id} className={`grid-wrapper ${className} ${ColumnedListSectionStyles.section}`}>
      {section.heading && (
        <h2 className={ColumnedListSectionStyles.sectionHeading}>{section.heading}</h2>
      )}
      {section.description && (
        <div
          className={`${ColumnedListSectionStyles.sectionDescription} ${ColumnedListSectionStyles[numOfColumns]}`}
          dangerouslySetInnerHTML={{
            __html: section.description.childMarkdownRemark.html
          }}
        />
      )}
    </section>
  );
};

export default ColumnedListSection;
