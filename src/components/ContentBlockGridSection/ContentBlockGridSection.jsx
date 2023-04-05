/* eslint-disable react/no-danger */
import React from 'react';

import * as ContentBlockGridSectionStyles from './ContentBlockGridSection.module.scss';

const ContentBlockGridSection = ({ section, id, className, includeRip }) => {
  const oddNumberBlocks = section.content.length % 2;

  return (
    <section
      id={id}
      className={`grid-wrapper ${className} ${ContentBlockGridSectionStyles.section} ${
        includeRip ? ContentBlockGridSectionStyles.includeRip : ''
      }`}
    >
      <div className={ContentBlockGridSectionStyles.textWrapper}>
        {section.heading && (
          <h2 className={ContentBlockGridSectionStyles.sectionHeading}>{section.heading}</h2>
        )}
        {section.description && (
          <p
            className={ContentBlockGridSectionStyles.sectionDescription}
            dangerouslySetInnerHTML={{
              __html: section.description?.childMarkdownRemark?.rawMarkdownBody || ''
            }}
          />
        )}
      </div>
      <div
        className={`${ContentBlockGridSectionStyles.cardWrapper} ${
          oddNumberBlocks ? ContentBlockGridSectionStyles.oddNumberBlocks : ''
        }`}
      >
        {section.content.map((block) => (
          <article key={block.id} className={ContentBlockGridSectionStyles.card}>
            {block.title && (
              <h3 className={ContentBlockGridSectionStyles.subheading}>{block.title}</h3>
            )}
            {block.bodyText && (
              <p
                dangerouslySetInnerHTML={{
                  __html: block.bodyText?.childMarkdownRemark?.rawMarkdownBody || ''
                }}
              />
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default ContentBlockGridSection;
