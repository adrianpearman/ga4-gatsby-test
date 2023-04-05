/* eslint-disable react/no-danger */
import React, { Fragment, useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import 'intersection-observer';
import { useInView } from 'react-intersection-observer';

import Layout from '../components/Layout/Layout';
import Head from '../components/Head/Head';
import UpcomingEventModal from '../components/Modals/UpcomingEventModal';
import StandardHero from '../components/StandardHero/StandardHero';
import RatingGroup from '../components/RatingGroup/RatingGroup';
import CareerPathwayPreview from '../components/CareerPathwayPreview/CareerPathwayPreview';
import CarouselSlider from '../components/CarouselSlider/CarouselSlider';
import Button from '../components/Button/Button';
import Prerequisites from '../components/LegacyBootcampComponents/Prerequisites';
import UpcomingSessionsSection from '../components/UpcomingSessions/UpcomingSessionsSection';
import CompanyLogos from '../components/CompanyLogos/CompanyLogos';
import FaqCard from '../components/FaqCard/FaqCard';

import { compareStartDatesDesc, excludePastStartDates } from '../helpers/filtersorters';

import rightArrow from '../assets/images/icons/arrow-link-linkred.svg';
import browserWindowIcon from '../assets/images/icons/browser-window-jred.svg';
import personWithMonitorIcon from '../assets/images/icons/person-with-monitor-jred.svg';
import starRibbonIcon from '../assets/images/icons/star-ribbon-jred.svg';
import gradCapIcon from '../assets/images/icons/grad-cap-jred.svg';

import * as BootcampDetailsStyles from './bootcamp-details.module.scss';

const BootcampDetails = ({ data, location }) => {
  const { bootcamp, freeUpcomingEventsQuery } = data;
  const { pageDetails } = bootcamp;

  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const allFreeUpcomingEvents = freeUpcomingEventsQuery.edges.map((edge) => edge.node);

    if (allFreeUpcomingEvents.length) {
      const filteredEvents = allFreeUpcomingEvents
        .filter(
          (event) =>
            event.uniqueAssociatedProduct?.name === bootcamp.name ||
            event.type.associatedProduct?.name === bootcamp.name
        )
        .filter(excludePastStartDates)
        .sort(compareStartDatesDesc);
      setUpcomingEvents(filteredEvents);
    }
  }, [freeUpcomingEventsQuery, bootcamp.name]);

  const [imageGridRef, gridInView] = useInView({
    rootMargin: '0px 0px -275px 0px',
    triggerOnce: true
  });

  const lastWhyJunoGridImage = pageDetails.whyJunoImageGrid.length - 1;

  const { metaContent } = pageDetails;

  return (
    <Layout>
      <Head metaContent={metaContent} pagePath={location.pathname} />
      {upcomingEvents.length ? (
        <UpcomingEventModal
          nextEvent={upcomingEvents[0]}
          product={bootcamp}
          productSlug={bootcamp.slug}
        />
      ) : null}
      <StandardHero
        heroContent={pageDetails.heroContent}
        background={pageDetails.heroBackgroundColor}
        allCapsSubheading
        largeHeading
      />
      <section className={`${BootcampDetailsStyles.reviews} grid-wrapper`}>
        <p className={BootcampDetailsStyles.headline}>{pageDetails.ratingsHeadline}</p>
        <CarouselSlider
          sliderCards={bootcamp.testimonials}
          cardType="testimonialStandard"
          numberOfPreviewsVisible={2}
          parentClass={BootcampDetailsStyles.reviewCarousel}
        />
        {pageDetails.ratings && <RatingGroup ratingCards={pageDetails.ratings} />}
      </section>
      <section className={`${BootcampDetailsStyles.overview} grid-wrapper`} id="overview">
        <div className={BootcampDetailsStyles.textContainer}>
          <h3 className={BootcampDetailsStyles.sectionHeading}>
            {pageDetails.overviewContent.title}
          </h3>
          <p
            className={BootcampDetailsStyles.sectionDescription}
            dangerouslySetInnerHTML={{
              __html: pageDetails.overviewContent.bodyText.childMarkdownRemark.rawMarkdownBody
            }}
          />
        </div>
        <figure className={BootcampDetailsStyles.imageContainer}>
          <GatsbyImage
            image={pageDetails.overviewContent.asset.gatsbyImageData}
            alt={pageDetails.overviewContent.asset.description}
          />
        </figure>
        <aside className={BootcampDetailsStyles.overviewAside}>
          <h4 className={BootcampDetailsStyles.sectionSubheading}>
            {pageDetails.overviewAsideHeading}
          </h4>
          <ul
            dangerouslySetInnerHTML={{
              __html: pageDetails.overviewAsideContent.childMarkdownRemark.html
            }}
          />
        </aside>
      </section>
      {pageDetails.careerPathwaySection && (
        <CareerPathwayPreview
          pathwayContent={pageDetails.careerPathwaySection}
          highlightProductName={bootcamp.name}
        />
      )}

      <section
        className={`${BootcampDetailsStyles.careerSupport} grid-wrapper`}
        id="career-support"
      >
        <ul className={BootcampDetailsStyles.photoReel}>
          {pageDetails.careerSupportPhotoReel.map((photo) => (
            <li className={BootcampDetailsStyles.photo} key={photo.id}>
              <GatsbyImage image={photo.gatsbyImageData} alt={photo.description} loading="lazy" />
            </li>
          ))}
        </ul>
        <div className={BootcampDetailsStyles.mainContent}>
          <h3 className={BootcampDetailsStyles.sectionHeading}>
            {pageDetails.careerSupportHeading}
          </h3>
          <div
            className={BootcampDetailsStyles.descriptionAndList}
            dangerouslySetInnerHTML={{
              __html: pageDetails.careerSupportContent.childMarkdownRemark.html
            }}
          />
          <div className={BootcampDetailsStyles.mobileDividerPhoto}>
            <GatsbyImage
              image={pageDetails.careerSupportPhotoReel[0].gatsbyImageData}
              alt={pageDetails.careerSupportPhotoReel[0].description}
              loading="lazy"
            />
          </div>
          <aside className={BootcampDetailsStyles.asideContent}>
            <ul
              dangerouslySetInnerHTML={{
                __html: pageDetails.careerSupportAsideContent.childMarkdownRemark.html
              }}
            />
            <Button
              urlIsRelativePath={pageDetails.careerSupportAsideButton.isUrlRelativePath}
              href={pageDetails.careerSupportAsideButton.url}
              text={pageDetails.careerSupportAsideButton.text}
              openInNewTab={pageDetails.careerSupportAsideButton.openInNewTab}
              useSnowplowTracking={pageDetails.careerSupportAsideButton.useSnowplowTracking}
              buttonStyle="secondary"
            />
            {pageDetails.careerSupportAsideDisclaimer && (
              <p className={BootcampDetailsStyles.disclaimer}>
                {pageDetails.careerSupportAsideDisclaimer}
              </p>
            )}
          </aside>
        </div>
        {pageDetails.companyLogos && (
          <CompanyLogos
            className={BootcampDetailsStyles.companyLogoDrawer}
            sectionHeading={pageDetails.companyLogosHeading}
            allLogos={pageDetails.companyLogos}
            numFirstVisible={16}
          />
        )}
      </section>
      <section className={`grid-wrapper ${BootcampDetailsStyles.curriculum}`} id="curriculum">
        <h3 className={BootcampDetailsStyles.sectionHeading}>{pageDetails.curriculumHeading}</h3>
        <p
          className={BootcampDetailsStyles.sectionDescription}
          dangerouslySetInnerHTML={{
            __html: pageDetails.curriculumDescription.childMarkdownRemark.rawMarkdownBody
          }}
        />
        <div className={BootcampDetailsStyles.listSection}>
          {pageDetails.curriculumLists.map((list) => (
            <div className={BootcampDetailsStyles.list} key={list.id}>
              <h4 className={BootcampDetailsStyles.sectionSubheading}>{list.title}</h4>
              <ul
                dangerouslySetInnerHTML={{
                  __html: list.bodyText.childMarkdownRemark.html
                }}
              />
            </div>
          ))}
        </div>
        <div className={BootcampDetailsStyles.cta}>
          <Button
            urlIsRelativePath={pageDetails.curriculumButton.isUrlRelativePath}
            href={pageDetails.curriculumButton.url}
            text={pageDetails.curriculumButton.text}
            openInNewTab={pageDetails.curriculumButton.openInNewTab}
            useSnowplowTracking={pageDetails.curriculumButton.useSnowplowTracking}
            buttonStyle="primary"
          />
        </div>
      </section>
      {bootcamp.projects && (
        <section className={`${BootcampDetailsStyles.projects} grid-wrapper`} id="projects">
          <h3 className={BootcampDetailsStyles.sectionHeading}>{pageDetails.projectsHeading}</h3>
          <p
            className={BootcampDetailsStyles.description}
            dangerouslySetInnerHTML={{
              __html: pageDetails.projectsIntroduction.childMarkdownRemark.rawMarkdownBody
            }}
          />
          <CarouselSlider
            sliderCards={bootcamp.projects}
            cardType="project"
            numberOfPreviewsVisible={2}
            parentClass={BootcampDetailsStyles.projectCarousel}
          />
        </section>
      )}
      <section className={`${BootcampDetailsStyles.whyJuno} grid-wrapper`} id="why-juno">
        <div className={BootcampDetailsStyles.textContent}>
          <h3 className={BootcampDetailsStyles.sectionHeading}>{pageDetails.whyJunoHeading}</h3>
          <ul>
            {pageDetails.whyJunoReasons.map((reason) => (
              <li key={reason.id}>
                <h4 className={BootcampDetailsStyles.sectionSubheading}>{reason.title}</h4>
                <p
                  className={BootcampDetailsStyles.description}
                  dangerouslySetInnerHTML={{
                    __html: reason.bodyText.childMarkdownRemark.rawMarkdownBody
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
        <div ref={imageGridRef} className={BootcampDetailsStyles.imageGrid}>
          {pageDetails.whyJunoImageGrid.map((photo, index) => (
            <div
              key={photo.id}
              className={`${BootcampDetailsStyles.gridImage} ${
                BootcampDetailsStyles[`image${index + 1}`]
              } ${gridInView ? BootcampDetailsStyles.fadeIn : ''}`}
            >
              <GatsbyImage
                image={photo.gatsbyImageData}
                alt={photo.description}
                className={BootcampDetailsStyles.imageWrapper}
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <div className={BootcampDetailsStyles.mobileImageBottomDivider}>
          <GatsbyImage
            image={pageDetails.whyJunoImageGrid[lastWhyJunoGridImage].gatsbyImageData}
            alt={pageDetails.whyJunoImageGrid[lastWhyJunoGridImage].description}
            className={BootcampDetailsStyles.mobileBottom}
            loading="lazy"
          />
        </div>
      </section>
      <section className={`${BootcampDetailsStyles.financingOptions} grid-wrapper`} id="financing">
        <h3 className={BootcampDetailsStyles.sectionHeading}>{pageDetails.financingHeading}</h3>
        <p
          className={BootcampDetailsStyles.sectionDescription}
          dangerouslySetInnerHTML={{
            __html: pageDetails.financingOptionsDescription.childMarkdownRemark.rawMarkdownBody
          }}
        />
        <ul className={BootcampDetailsStyles.optionsList}>
          {pageDetails.financingBlocks.map((block) => (
            <li key={block.id} className={BootcampDetailsStyles.option}>
              <h4 className={BootcampDetailsStyles.sectionSubheading}>{block.title}</h4>
              <p
                dangerouslySetInnerHTML={{
                  __html: block.bodyText.childMarkdownRemark.rawMarkdownBody
                }}
              />
            </li>
          ))}
        </ul>
      </section>
      <section className={`${BootcampDetailsStyles.howToApply} grid-wrapper`} id="admissions">
        <h3 className={BootcampDetailsStyles.sectionHeading}>
          {pageDetails.applicationProcessHeading}
        </h3>
        <p
          className={BootcampDetailsStyles.sectionDescription}
          dangerouslySetInnerHTML={{
            __html: pageDetails.applicationProcessDescription.childMarkdownRemark.rawMarkdownBody
          }}
        />
        <ul className={BootcampDetailsStyles.applicationProcess}>
          {[browserWindowIcon, personWithMonitorIcon, starRibbonIcon, gradCapIcon].map(
            (icon, index) => (
              <Fragment key={pageDetails.applicationSteps[index]}>
                <li className={BootcampDetailsStyles.step}>
                  <div className={BootcampDetailsStyles.iconWrapper}>
                    <img src={icon} alt={`Icon for step ${index + 1}`} loading="lazy" />
                  </div>
                  {pageDetails.applicationSteps[index]}
                </li>
                {index < pageDetails.applicationSteps.length - 1 && (
                  <li className={BootcampDetailsStyles.rightArrow}>
                    <img src={rightArrow} alt="" loading="lazy" />
                  </li>
                )}
              </Fragment>
            )
          )}
        </ul>
        <div className={BootcampDetailsStyles.cta}>
          <Button
            urlIsRelativePath={pageDetails.applicationProcessButton.isUrlRelativePath}
            href={pageDetails.applicationProcessButton.url}
            text={pageDetails.applicationProcessButton.text}
            openInNewTab={pageDetails.applicationProcessButton.openInNewTab}
            useSnowplowTracking={pageDetails.applicationProcessButton.useSnowplowTracking}
            buttonStyle="primary"
          />
        </div>
      </section>
      <Prerequisites
        heading={pageDetails.prerequisitesHeading}
        mainContent={pageDetails.prerequisitesMainContent.childMarkdownRemark.html}
        asideContent={pageDetails.prerequisitesAsideList.childMarkdownRemark.html}
        id="prerequisites"
      />
      {bootcamp.session && (
        <UpcomingSessionsSection
          title={pageDetails.upcomingSessionsHeading}
          description={pageDetails.upcomingSessionsTagline}
          disclaimer={pageDetails.upcomingSessionsDisclaimer}
          sessions={bootcamp.session}
          id="dates"
        />
      )}
      <section className={`${BootcampDetailsStyles.faqs} grid-wrapper`} id="faqs">
        <h3 className={BootcampDetailsStyles.sectionHeading}>FAQs</h3>
        <ul className={BootcampDetailsStyles.faqBlocks}>
          {bootcamp.frequentlyAskedQuestions.map((faq) => (
            <li key={faq.id}>
              <FaqCard faq={faq} />
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default BootcampDetails;

export const query = graphql`
  query ($id: String!) {
    bootcamp: contentfulProduct(id: { eq: $id }) {
      name
      slug
      skillLevel
      advertisedPrice
      type
      projects {
        studentName
        byline
        projectTitle
        projectUrl
        projectDescription {
          projectDescription
        }
        id
        projectImage {
          gatsbyImageData(width: 420, quality: 80, layout: CONSTRAINED)
        }
        projectImageThumbnail {
          gatsbyImageData(width: 420, quality: 80, layout: CONSTRAINED)
        }
      }
      session {
        id
        startDate
        endDate
        applicationDeadline
        isAlmostFull
        isSoldOut
        timeCommitment
        numberOfWeeks
        classDays
        timeFrame
        locationType
        inPersonAddress
        customBannerText
        allowOnlinePurchase
        purchaseSessionCode
      }
      testimonials {
        id
        type
        courseTaken
        quotation {
          childMarkdownRemark {
            rawMarkdownBody
          }
        }
        person {
          name
          jobBeforeJuno
          jobCurrent
          jobCurrentCompany
          jobCurrentCompanyLink
          jobAfterHY
          headshot {
            gatsbyImageData(width: 110, layout: CONSTRAINED)
          }
        }
      }
      frequentlyAskedQuestions {
        id
        question
        answer {
          childMarkdownRemark {
            html
          }
        }
      }
      pageDetails {
        ... on ContentfulBootcampDetails {
          metaContent {
            title
            description {
              description
            }
            image {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
          heroContent {
            h1Heading
            mainVisualHeading
            subheading {
              childMarkdownRemark {
                rawMarkdownBody
              }
            }
            introParagraph {
              childMarkdownRemark {
                html
              }
            }
            image {
              description
              gatsbyImageData(width: 450, layout: CONSTRAINED, quality: 100)
            }
            ctaButtons {
              id
              text
              url
              isUrlRelativePath
              openInNewTab
              useSnowplowTracking
            }
          }
          heroBackgroundColor
          ratingsHeadline
          ratings {
            id
            averageRating
            siteName
            siteUrl
            logo {
              description
              file {
                url
              }
            }
          }
          overviewContent {
            title
            bodyText {
              childMarkdownRemark {
                rawMarkdownBody
              }
            }
            asset {
              description
              gatsbyImageData(width: 670, quality: 90, layout: CONSTRAINED)
            }
          }
          overviewAsideHeading
          overviewAsideContent {
            childMarkdownRemark {
              html
            }
          }
          careerPathwaySection {
            heading
            description {
              childMarkdownRemark {
                rawMarkdownBody
              }
            }
            content {
              ... on ContentfulContentBlock {
                id
                title
                bodyText {
                  childMarkdownRemark {
                    rawMarkdownBody
                  }
                }
                relatedContent {
                  ... on ContentfulProduct {
                    name
                    slug
                  }
                }
              }
            }
            ctaButton {
              text
              url
              isUrlRelativePath
              openInNewTab
              useSnowplowTracking
            }
          }
          careerSupportPhotoReel {
            id
            description
            gatsbyImageData(quality: 100, width: 740, layout: CONSTRAINED)
          }
          careerSupportHeading
          careerSupportContent {
            childMarkdownRemark {
              html
            }
          }
          careerSupportAsideContent {
            childMarkdownRemark {
              html
            }
          }
          careerSupportAsideButton {
            text
            url
            isUrlRelativePath
            openInNewTab
            useSnowplowTracking
          }
          careerSupportAsideDisclaimer
          companyLogosHeading
          companyLogos {
            id
            company
            companyURL
            file {
              gatsbyImageData(width: 110, layout: CONSTRAINED, quality: 100)
              url
            }
          }
          curriculumHeading
          curriculumDescription {
            childMarkdownRemark {
              rawMarkdownBody
            }
          }
          curriculumLists {
            id
            title
            bodyText {
              childMarkdownRemark {
                html
              }
            }
          }
          curriculumButton {
            text
            url
            isUrlRelativePath
            openInNewTab
            useSnowplowTracking
          }
          projectsHeading
          projectsIntroduction {
            childMarkdownRemark {
              rawMarkdownBody
            }
          }
          whyJunoImageGrid {
            id
            description
            gatsbyImageData(width: 500, layout: CONSTRAINED, quality: 100)
          }
          whyJunoHeading
          whyJunoReasons {
            id
            title
            bodyText {
              childMarkdownRemark {
                rawMarkdownBody
              }
            }
          }
          financingHeading
          financingOptionsDescription {
            childMarkdownRemark {
              rawMarkdownBody
            }
          }
          financingBlocks {
            id
            title
            bodyText {
              childMarkdownRemark {
                rawMarkdownBody
              }
            }
          }
          applicationProcessHeading
          applicationProcessDescription {
            childMarkdownRemark {
              rawMarkdownBody
            }
          }
          applicationSteps
          applicationProcessButton {
            text
            url
            isUrlRelativePath
            openInNewTab
            useSnowplowTracking
          }
          prerequisitesHeading
          prerequisitesMainContent {
            prerequisitesMainContent
            childMarkdownRemark {
              html
            }
          }
          prerequisitesAsideList {
            prerequisitesAsideList
            childMarkdownRemark {
              html
            }
          }
          upcomingSessionsHeading
          upcomingSessionsTagline
          upcomingSessionsDisclaimer {
            childMarkdownRemark {
              rawMarkdownBody
            }
          }
        }
      }
    }
    freeUpcomingEventsQuery: allContentfulEventSession(
      filter: { type: { price: { eq: 0 } } }
      sort: { date: ASC }
    ) {
      edges {
        node {
          date
          registrationLink
          secondaryRegistrationLink
          uniqueName
          uniqueAssociatedProduct {
            name
          }
          type {
            format
            sharedCtaText
            associatedProduct {
              name
            }
          }
        }
      }
    }
  }
`;
