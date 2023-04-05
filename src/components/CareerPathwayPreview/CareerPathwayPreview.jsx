/* eslint-disable react/no-danger */
import React, { Fragment } from 'react';

import Button from '../Button/Button';

import rocket from '../../assets/images/icons/juno-red-rocket-icon.svg';
import rightArrow from '../../assets/images/icons/arrow-link-linkred.svg';

import * as CareerPathwayPreviewStyles from './CareerPathwayPreview.module.scss';

const CareerPathwayPreview = ({ pathwayContent, highlightProductName, className }) => {
  return (
    <section
      className={`${CareerPathwayPreviewStyles.careerPathway} ${className} grid-wrapper`}
      id="career-pathway"
    >
      <h3 className={CareerPathwayPreviewStyles.sectionHeading}>{pathwayContent.heading}</h3>
      <p
        className={CareerPathwayPreviewStyles.tagline}
        dangerouslySetInnerHTML={{
          __html: pathwayContent.description.childMarkdownRemark.rawMarkdownBody
        }}
      />
      <ul className={CareerPathwayPreviewStyles.fullPathway}>
        {pathwayContent.content.map((step, index, pathwayContentArray) => (
          <Fragment key={step.id}>
            <li
              className={`${CareerPathwayPreviewStyles.pathwayStep} ${
                highlightProductName === step.title ? CareerPathwayPreviewStyles.highlight : ''
              }`}
            >
              {index + 1 === pathwayContentArray.length ? (
                <img
                  className={CareerPathwayPreviewStyles.rocket}
                  src={rocket}
                  alt=""
                  loading="lazy"
                />
              ) : (
                <div className={CareerPathwayPreviewStyles.stepNumber}>
                  <p>{index + 1}</p>
                </div>
              )}
              <h4
                className={CareerPathwayPreviewStyles.sectionSubheading}
                dangerouslySetInnerHTML={{
                  __html: step.title
                }}
              />
              <p
                className={CareerPathwayPreviewStyles.description}
                dangerouslySetInnerHTML={{
                  __html: step.bodyText.childMarkdownRemark.rawMarkdownBody
                }}
              />
            </li>
            {index + 1 < pathwayContentArray.length && (
              <li className={CareerPathwayPreviewStyles.arrow}>
                <img src={rightArrow} alt="" loading="lazy" />
              </li>
            )}
          </Fragment>
        ))}
      </ul>
      {pathwayContent.ctaButton.text !== 'No Button' && (
        <div className={CareerPathwayPreviewStyles.pathwayButton}>
          <Button
            urlIsRelativePath={pathwayContent.ctaButton.isUrlRelativePath}
            href={pathwayContent.ctaButton.url}
            text={pathwayContent.ctaButton.text}
            openInNewTab={pathwayContent.ctaButton.openInNewTab}
            useSnowplowTracking={pathwayContent.ctaButton.useSnowplowTracking}
            buttonStyle="secondary"
          />
        </div>
      )}
    </section>
  );
};

export default CareerPathwayPreview;
