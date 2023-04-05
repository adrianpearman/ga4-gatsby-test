/* eslint-disable react/no-danger */
import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

import * as StandardPageSectionStyles from './StandardPageSection.module.scss';
import Button from '../Button/Button';

const StandardPageSection = ({ section, id, className, withImageCaption }) => {
  const withImage = section.image || null;
  const withAside = section.content && section.content[0].__typename === 'ContentfulContentBlock';

  return (
    <section
      id={id}
      className={` ${className} ${StandardPageSectionStyles.standardSection} ${
        withAside ? StandardPageSectionStyles.withAside : ''
      } ${withImage ? StandardPageSectionStyles.withImage : ''} grid-wrapper`}
    >
      <div className={StandardPageSectionStyles.textWrapper}>
        {section.heading && (
          <h2 className={StandardPageSectionStyles.sectionHeading}>{section.heading}</h2>
        )}
        {section.description && (
          <p
            className={StandardPageSectionStyles.sectionDescription}
            dangerouslySetInnerHTML={{
              __html: section.description.childMarkdownRemark.rawMarkdownBody
            }}
          />
        )}
        {section.ctaButton && (
          <Button
            urlIsRelativePath={section.ctaButton.isUrlRelativePath}
            text={section.ctaButton.text}
            href={section.ctaButton.url}
            openInNewTab={section.ctaButton.openInNewTab}
            useSnowplowTracking={section.ctaButton.useSnowplowTracking}
            buttonStyle="primary"
            className={StandardPageSectionStyles.button}
          />
        )}
      </div>
      {withImage && (
        <figure>
          <GatsbyImage image={section.image.gatsbyImageData} alt={section.image.description} />
          {withImageCaption && <figcaption>{section.image.description}</figcaption>}
        </figure>
      )}
      {withAside && (
        <aside
          dangerouslySetInnerHTML={{
            __html: section.content[0].bodyText.childMarkdownRemark.html
          }}
        />
      )}
    </section>
  );
};

export default StandardPageSection;
