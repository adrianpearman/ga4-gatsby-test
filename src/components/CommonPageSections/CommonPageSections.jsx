/* eslint-disable react/no-danger */
import React from 'react';
import sluggify from '../../helpers/sluggify';
import CarouselSlider from '../CarouselSlider/CarouselSlider';
import CompanyLogos from '../CompanyLogos/CompanyLogos';
import StudentSuccessBanner from '../StudentSuccessBanner/StudentSuccessBanner';

import * as CommonPageSectionsStyles from './CommonPageSections.module.scss';

const CommonPageSections = ({ section, pageStyles, id, ...props }) => {
  const sectionId = id || section.customAnchor || sluggify(section.heading || '') || section.style;

  switch (section.style) {
    case 'student-success-banner': {
      return (
        <section id={sectionId} className={`grid-wrapper ${pageStyles.StudentSuccessBanner}`}>
          <StudentSuccessBanner
            bannerContent={section.content[0]}
            parentStyles={`${pageStyles.successBanner}`}
            halfGridWidth={props.halfGridWidth}
          />
        </section>
      );
    }
    case 'student-success-banner-calendly': {
      return (
        <section
          id={section.customAnchor}
          className={`grid-wrapper ${pageStyles.StudentSuccessBanner}`}
        >
          <StudentSuccessBanner
            bannerContent={section.content[0]}
            parentStyles={`${pageStyles.successBanner}`}
            halfGridWidth={props.halfGridWidth}
            showCalendlyEmbed
            calendlyButtonId={section.customAnchor}
          />
        </section>
      );
    }
    case 'carousel-content-blocks': {
      return (
        <section
          id={sectionId}
          className={`grid-wrapper ${CommonPageSectionsStyles.carouselSection} ${CommonPageSectionsStyles.contentBlock} ${pageStyles.carouselSection} ${props.genericPageClassName}`}
        >
          {section.heading && (
            <h2 className={CommonPageSectionsStyles.sectionHeading}>{section.heading}</h2>
          )}
          {section.description && (
            <p
              className={CommonPageSectionsStyles.sectionDescription}
              dangerouslySetInnerHTML={{
                __html:
                  section.description.childMarkdownRemark.rawMarkdownBody ||
                  section.description.childMarkdownRemark.html
              }}
            />
          )}
          <CarouselSlider
            sliderCards={section.content}
            cardType="contentBlock"
            numberOfPreviewsVisible={2}
            parentClass={`${pageStyles.contentBlockCarousel} ${CommonPageSectionsStyles.carousel}`}
          />
        </section>
      );
    }
    case 'carousel-testimonial-standard': {
      return (
        <section
          id={sectionId}
          className={`grid-wrapper ${CommonPageSectionsStyles.carouselSection} ${CommonPageSectionsStyles.testimonial} ${pageStyles.carouselSection}`}
        >
          {section.heading && (
            <h2 className={CommonPageSectionsStyles.sectionHeading}>{section.heading}</h2>
          )}
          {section.description && (
            <p
              className={CommonPageSectionsStyles.sectionDescription}
              dangerouslySetInnerHTML={{
                __html:
                  section.description.childMarkdownRemark.rawMarkdownBody ||
                  section.description.childMarkdownRemark.html
              }}
            />
          )}
          <CarouselSlider
            sliderCards={section.content}
            cardType={props.simpleByline ? 'testimonialShort' : 'testimonialStandard'}
            numberOfPreviewsVisible={2}
            parentClass={`${pageStyles.testimonialCarousel} ${CommonPageSectionsStyles.carousel}`}
          />
        </section>
      );
    }
    case 'corporate-logos': {
      return (
        <CompanyLogos
          className={pageStyles.logosSection}
          sectionHeading={section.heading}
          allLogos={section.content}
          numFirstVisible={props.numFirstVisible || 16}
          id={sectionId}
        />
      );
    }
    default:
      return null;
  }
};

export default CommonPageSections;
