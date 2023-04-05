/* eslint-disable react/no-danger */
import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import 'intersection-observer';
import { useInView } from 'react-intersection-observer';

import Button from '../Button/Button';

import * as ListWithImagesSectionStyle from './ListWithImagesSection.module.scss';

const ListWithImagesSection = ({ section, id, className, buttonId }) => {
  const [imageGridRef, gridInView] = useInView({
    rootMargin: '0px 0px -275px 0px',
    triggerOnce: true
  });

  const lastImageInGrid = section.imageGrid.length - 1;

  return (
    <section id={id} className={`grid-wrapper ${className} ${ListWithImagesSectionStyle.section}`}>
      <div className={ListWithImagesSectionStyle.textWrapper}>
        {section.heading && (
          <h2 className={ListWithImagesSectionStyle.sectionHeading}>{section.heading}</h2>
        )}
        {section.description && (
          <div
            dangerouslySetInnerHTML={{
              __html: section.description.childMarkdownRemark.html
            }}
          />
        )}
        {section.content && (
          <ul>
            {section.content.map((block) => (
              <li key={block.id}>
                <h3 className={ListWithImagesSectionStyle.sectionSubheading}>{block.title}</h3>
                <div
                  className={ListWithImagesSectionStyle.description}
                  dangerouslySetInnerHTML={{
                    __html: block.bodyText?.childMarkdownRemark?.html || ''
                  }}
                />
                {block.button && (
                  <a
                    className={`link-arrow ${ListWithImagesSectionStyle.cta}`}
                    href={block.button.url}
                  >
                    {block.button.text}
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
        {section.ctaButton && (
          <Button
            urlIsRelativePath={section.ctaButton.isUrlRelativePath}
            href={section.ctaButton.url}
            text={section.ctaButton.text}
            openInNewTab={section.ctaButton.openInNewTab}
            useSnowplowTracking={section.ctaButton.useSnowplowTracking}
            buttonStyle="primary"
            id={buttonId}
          />
        )}
      </div>
      <div ref={imageGridRef} className={ListWithImagesSectionStyle.imageGrid}>
        {section.imageGrid.map((image, index) => (
          <div
            key={image.id}
            className={`${ListWithImagesSectionStyle.gridImage} ${
              ListWithImagesSectionStyle[`image${index + 1}`]
            } ${gridInView ? ListWithImagesSectionStyle.fadeIn : ''}`}
          >
            <GatsbyImage
              image={image.gatsbyImageData}
              alt={image.description}
              className={ListWithImagesSectionStyle.gatsbyImage}
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <div className={ListWithImagesSectionStyle.mobileImageBottomDivider}>
        <GatsbyImage
          image={section.imageGrid[lastImageInGrid].gatsbyImageData}
          alt={section.imageGrid[lastImageInGrid].description}
          className={ListWithImagesSectionStyle.mobileBottomImages}
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default ListWithImagesSection;
