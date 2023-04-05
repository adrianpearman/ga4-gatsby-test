/* eslint-disable react/no-danger */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { graphql } from 'gatsby';
import { DateTime } from 'luxon';
import SiteLink from '../components/SiteLink/SiteLink';

import Layout from '../components/Layout/Layout';
import Head from '../components/Head/Head';
import CourseHero from '../components/CourseHero/CourseHero';
import UpcomingEventModal from '../components/Modals/UpcomingEventModal';
import StudentSuccessBanner from '../components/StudentSuccessBanner/StudentSuccessBanner';
import CareerPathwayPreview from '../components/CareerPathwayPreview/CareerPathwayPreview';
import CarouselSlider from '../components/CarouselSlider/CarouselSlider';
import FaqCard from '../components/FaqCard/FaqCard';
import CourseSessionCard from '../components/SessionCards/CourseSessionCard';
import Button from '../components/Button/Button';

import { getStripePromise, useStripeSessionPurchase } from '../helpers/stripeSessionPurchase';
import {
  compareStartDatesAsc,
  compareStartDatesDesc,
  excludePastStartDates
} from '../helpers/filtersorters';
import { canadianCurrencyFormatter } from '../helpers/formatters';

import * as CourseDetailsStyles from './course-details.module.scss';

const stripePromise = getStripePromise();

const CourseDetails = ({ data, location }) => {
  const { course, freeUpcomingEventsQuery, inPersonSessionsQuery } = data;
  const { pageDetails, slug } = course;

  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const allFreeUpcomingEvents = freeUpcomingEventsQuery.edges.map((edge) => edge.node);

    if (allFreeUpcomingEvents.length) {
      const filteredEvents = allFreeUpcomingEvents
        .filter(
          (event) =>
            event.uniqueAssociatedProduct?.name === course.name ||
            event.type.associatedProduct?.name === course.name
        )
        .filter(excludePastStartDates)
        .sort(compareStartDatesDesc);
      setUpcomingEvents(filteredEvents);
    }
  }, [freeUpcomingEventsQuery, course.name]);

  const dateDifferenceFromNow = (comparisonDate) => {
    const now = DateTime.now().setZone('America/Toronto');
    const startDate = DateTime.fromISO(comparisonDate, { zone: 'America/Toronto' });

    const diff = startDate.diff(now, ['days']).toObject();
    return diff;
  };

  const [upcomingSessions, setUpcomingSessions] = useState([]);

  useEffect(() => {
    const saturdayRegex = /(saturday)/gi;
    const sundayRegex = /(sunday)/gi;

    if (!course.session) {
      return;
    }

    const inPersonSessions = inPersonSessionsQuery?.session ?? [];
    const courseSessions = [...course.session, ...inPersonSessions];

    const filteredNextSixSessions = courseSessions
      .filter(excludePastStartDates)
      .sort(compareStartDatesAsc)
      .slice(0, 6);

    // currently only looking for weekend sessions & accelerated 2-week sessions
    const nearlyStartedSessionsRemoved = filteredNextSixSessions.filter((session) => {
      const { startDate, classDays, timeCommitment } = session;
      const dateDifference = dateDifferenceFromNow(startDate);

      if (timeCommitment === 'Full-Time' && dateDifference.days <= 3) {
        return false;
      }
      if (classDays.match(saturdayRegex) && dateDifference.days <= 2) {
        return false;
      }
      if (classDays.match(sundayRegex) && dateDifference.days <= 3) {
        return false;
      }

      return true;
    });

    setUpcomingSessions(nearlyStartedSessionsRemoved);
  }, [course.session, inPersonSessionsQuery?.session]);

  const [purchaseErrorModal, purchaseInProgress, purchaseSession] =
    useStripeSessionPurchase(stripePromise);

  const { metaContent } = pageDetails;

  return (
    <Layout>
      <Head metaContent={metaContent} pagePath={location.pathname} />
      {upcomingEvents.length ? (
        <UpcomingEventModal
          nextEvent={upcomingEvents[0]}
          product={course}
          productSlug={course.slug}
        />
      ) : null}

      <CourseHero
        heroContent={pageDetails.heroContent}
        upcomingSessions={upcomingSessions}
        location={location}
        locationPin={pageDetails.location}
        timePin={pageDetails.timeCommitment}
        backgroundColor={pageDetails.heroBackgroundColor}
        registerHandler={purchaseSession}
        registerDisabled={purchaseInProgress}
        slug={slug}
      />

      <section id="learn" className={`grid-wrapper ${CourseDetailsStyles.syllabus}`}>
        <h2>{pageDetails.courseOverviewHeading}</h2>
        <div
          className={CourseDetailsStyles.syllabusTopics}
          dangerouslySetInnerHTML={{
            __html: pageDetails.courseOverviewContent.childMarkdownRemark.rawMarkdownBody
          }}
        />
        <aside>
          <div className={CourseDetailsStyles.syllabusPhoto}>
            <GatsbyImage
              image={pageDetails.coursePackageAside.asset.gatsbyImageData}
              alt={pageDetails.coursePackageAside.asset.description}
            />
          </div>
          <div className={CourseDetailsStyles.syllabusPackageText}>
            <h4>{pageDetails.coursePackageAside.title}</h4>
            <p
              dangerouslySetInnerHTML={{
                __html: pageDetails.coursePackageAside.bodyText.childMarkdownRemark.rawMarkdownBody
              }}
            />
            <Button
              urlIsRelativePath={pageDetails.coursePackageAside.button.isUrlRelativePath}
              href={pageDetails.coursePackageAside.button.url}
              text={pageDetails.coursePackageAside.button.text}
              openInNewTab={pageDetails.coursePackageAside.button.openInNewTab}
              useSnowplowTracking={pageDetails.coursePackageAside.button.useSnowplowTracking}
              buttonStyle="secondary"
            />
          </div>
        </aside>
      </section>

      {pageDetails.careerPathwaySection && (
        <CareerPathwayPreview
          pathwayContent={pageDetails.careerPathwaySection}
          highlightProductName={`${course.name} Course`}
          className={CourseDetailsStyles.careerPathway}
        />
      )}

      {pageDetails.studentSuccessBanner && (
        <section className={`${CourseDetailsStyles.banner} grid-wrapper`}>
          <StudentSuccessBanner
            bannerContent={pageDetails.studentSuccessBanner}
            calendlyButtonId="test-button"
            showCalendlyEmbed
            halfGridWidth
          />
        </section>
      )}

      {course.projects && course.projects.length > 0 ? (
        <section className={`grid-wrapper ${CourseDetailsStyles.projects}`}>
          <h2 className={CourseDetailsStyles.sectionHeading}>{pageDetails.projectsHeading}</h2>
          {pageDetails.projectsDescription && (
            <p
              className={CourseDetailsStyles.description}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: pageDetails.projectsDescription.childMarkdownRemark.rawMarkdownBody
              }}
            />
          )}
          <CarouselSlider
            sliderCards={course.projects}
            cardType="project"
            numberOfPreviewsVisible={course.projects.length > 1 ? 2 : 0}
            parentClass={CourseDetailsStyles.projectCarousel}
          />
        </section>
      ) : null}

      <section id="dates" className={`grid-wrapper ${CourseDetailsStyles.cost}`}>
        <h2>{pageDetails.sessionPricingHeading}</h2>
        {pageDetails.timeCommitmentDetails.map((item) => {
          return (
            <div
              key={item.id}
              className={
                item.title === 'Accelerated'
                  ? CourseDetailsStyles.acceleratedDetails
                  : CourseDetailsStyles.partTimeDetails
              }
            >
              <h3 className={CourseDetailsStyles.courseDetailsSurtitle}>{item.title}</h3>
              <div
                className={CourseDetailsStyles.courseDescription}
                dangerouslySetInnerHTML={{
                  __html: item.bodyText.childMarkdownRemark.html
                }}
              />
            </div>
          );
        })}
      </section>

      <section className={`grid-wrapper ${CourseDetailsStyles.sessions}`}>
        {upcomingSessions.length ? (
          upcomingSessions.map((session) => {
            const { allowOnlinePurchase } = session;
            return (
              <CourseSessionCard
                data={session}
                timeCommitment={session.timeCommitment}
                key={session.id}
                registerHandler={
                  allowOnlinePurchase
                    ? () => {
                        purchaseSession(session.purchaseSessionCode, slug);
                      }
                    : null
                }
                registerDisabled={purchaseInProgress}
                signupLinkText={allowOnlinePurchase ? 'Enrol Now' : 'Get Started'}
              />
            );
          })
        ) : (
          <div className={CourseDetailsStyles.sessionsNone}>
            <h3>There are currently no courses scheduled. Please check back soon!</h3>
          </div>
        )}
        <h3 className={CourseDetailsStyles.pricingSubhead}>Pricing</h3>
        <div className={CourseDetailsStyles.priceContainer}>
          {course.advertisedPrice === 995 ? (
            <div>
              <p className={CourseDetailsStyles.coursePrice}>
                <s>{canadianCurrencyFormatter(2000, false)}</s>{' '}
                <span>{canadianCurrencyFormatter(995, false)} + HST*</span>
              </p>
              <div className={CourseDetailsStyles.priceDescription}>
                <p>
                  *Get 50% off all our March/April courses! For more funding options, check out our
                  Financing Guide.
                </p>
                <p>
                  <a
                    href="https://go.junocollege.com/how-to-pay-for-tech-education"
                    className="btn redbg-white allow-wrap"
                  >
                    Download Financing Guide
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <div>
              <p className={CourseDetailsStyles.coursePrice}>
                {canadianCurrencyFormatter(course.advertisedPrice, false)} CAD + HST
              </p>
              <div
                className={CourseDetailsStyles.priceDescription}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: pageDetails.priceDescription.childMarkdownRemark.html
                }}
              />
            </div>
          )}
        </div>
        {pageDetails.pricingAsideLinks && pageDetails.pricingAsideLinks.length > 0 && (
          <div className={CourseDetailsStyles.linkContainer}>
            <h4 className={CourseDetailsStyles.linkSubhead}>{pageDetails.pricingAsideHeading}</h4>
            {pageDetails.pricingAsideLinks.map((link) => (
              <SiteLink key={link.id} to={link.url}>
                {link.text}
              </SiteLink>
            ))}
          </div>
        )}
      </section>

      {course.testimonials && course.testimonials.length > 0 ? (
        <section id="reviews" className={`${CourseDetailsStyles.reviewSection} grid-wrapper`}>
          {pageDetails.reviewsSectionHeading && (
            <p className={CourseDetailsStyles.headline}>{pageDetails.reviewsSectionHeading}</p>
          )}
          <CarouselSlider
            sliderCards={course.testimonials}
            cardType="testimonialStandard"
            numberOfPreviewsVisible={2}
            parentClass={CourseDetailsStyles.reviewCarousel}
          />
        </section>
      ) : null}

      <section
        id="course-package"
        className={`grid-wrapper ${CourseDetailsStyles.studentExperience} ${
          !course.frequentlyAskedQuestions || course.frequentlyAskedQuestions.length === 0
            ? CourseDetailsStyles.studentExperiencePlain
            : null
        }`}
      >
        <div className={CourseDetailsStyles.studentExperienceContainer}>
          <h2>{pageDetails.coursePackageDownloadSection.title}</h2>
          <div
            className={CourseDetailsStyles.studentExperienceContent}
            dangerouslySetInnerHTML={{
              __html: pageDetails.coursePackageDownloadSection.bodyText.childMarkdownRemark.html
            }}
          />
          <Button
            urlIsRelativePath={pageDetails.coursePackageDownloadSection.button.isUrlRelativePath}
            href={pageDetails.coursePackageDownloadSection.button.url}
            text={pageDetails.coursePackageDownloadSection.button.text}
            openInNewTab={pageDetails.coursePackageDownloadSection.button.openInNewTab}
            useSnowplowTracking={
              pageDetails.coursePackageDownloadSection.button.useSnowplowTracking
            }
            buttonStyle="primary"
          />
        </div>
        <div className={CourseDetailsStyles.studentExperienceImage}>
          <GatsbyImage
            image={pageDetails.coursePackageDownloadSection.asset.gatsbyImageData}
            alt={
              pageDetails.coursePackageDownloadSection.asset.description ||
              'Student Experience Package'
            }
            loading="lazy"
          />
        </div>
      </section>

      {course.frequentlyAskedQuestions && course.frequentlyAskedQuestions.length > 0 && (
        <section id="FAQs" className={`grid-wrapper ${CourseDetailsStyles.courseFaq}`}>
          <h2 className={CourseDetailsStyles.sectionHeading}>{course.name} FAQs</h2>
          <ul className={CourseDetailsStyles.faqBlocks}>
            {course.frequentlyAskedQuestions.map((faq) => (
              <li key={faq.id}>
                <FaqCard faq={faq} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {purchaseErrorModal}
    </Layout>
  );
};
export default CourseDetails;

export const sessionFragment = graphql`
  fragment SessionInfo on ContentfulProduct {
    session {
      id
      startDate
      endDate
      isAlmostFull
      isSoldOut
      timeCommitment
      classDays
      timeFrame
      locationType
      inPersonAddress
      customBannerText
      allowOnlinePurchase
      purchaseSessionCode
      instructor {
        name
        bio {
          bio
        }
        headshot {
          gatsbyImageData(width: 100, layout: CONSTRAINED)
        }
      }
    }
  }
`;

export const query = graphql`
  query ($id: String!, $inPersonId: String!) {
    course: contentfulProduct(id: { eq: $id }) {
      name
      slug
      type
      skillLevel
      advertisedPrice
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
          gatsbyImageData(width: 600, layout: CONSTRAINED)
        }
      }
      ...SessionInfo
      testimonials {
        id
        quotation {
          childMarkdownRemark {
            rawMarkdownBody
          }
        }
        courseTaken
        person {
          name
          headshot {
            gatsbyImageData(width: 300, layout: CONSTRAINED)
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
        ... on ContentfulCourseDetails {
          id
          metaContent {
            title
            description {
              description
            }
            image {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
          headerButton {
            text
            url
            isUrlRelativePath
            openInNewTab
            useSnowplowTracking
          }
          heroContent {
            h1Heading
            mainVisualHeading
            introParagraph {
              childMarkdownRemark {
                rawMarkdownBody
              }
            }
            image {
              description
              gatsbyImageData(layout: FULL_WIDTH)
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
          location
          timeCommitment
          heroBackgroundColor
          courseOverviewHeading
          courseOverviewContent {
            childMarkdownRemark {
              rawMarkdownBody
            }
          }
          coursePackageAside {
            title
            bodyText {
              childMarkdownRemark {
                rawMarkdownBody
              }
            }
            asset {
              description
              gatsbyImageData(width: 520, layout: CONSTRAINED)
            }
            button {
              id
              text
              url
              isUrlRelativePath
              openInNewTab
              useSnowplowTracking
            }
          }
          studentSuccessBanner {
            heading
            text {
              childMarkdownRemark {
                rawMarkdownBody
              }
            }
            ctaButton {
              text
              url
              isUrlRelativePath
              openInNewTab
              useSnowplowTracking
            }
            successConsultants {
              id
              name
              headshot {
                gatsbyImageData(width: 250, layout: CONSTRAINED, quality: 100)
              }
            }
          }
          projectsHeading
          projectsDescription {
            childMarkdownRemark {
              rawMarkdownBody
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
          sessionPricingHeading
          timeCommitmentDetails {
            id
            title
            bodyText {
              childMarkdownRemark {
                html
              }
            }
            button {
              id
              text
              url
              isUrlRelativePath
              openInNewTab
              useSnowplowTracking
            }
          }
          sessionSignupLink {
            id
            text
            url
            isUrlRelativePath
            openInNewTab
            useSnowplowTracking
          }
          priceDescription {
            priceDescription
            childMarkdownRemark {
              rawMarkdownBody
              html
            }
          }
          pricingAsideHeading
          pricingAsideLinks {
            id
            text
            url
          }
          reviewsSectionHeading
          coursePackageDownloadSection {
            title
            bodyText {
              childMarkdownRemark {
                html
              }
            }
            asset {
              description
              gatsbyImageData(width: 520, layout: CONSTRAINED)
            }
            button {
              text
              url
              isUrlRelativePath
              openInNewTab
              useSnowplowTracking
            }
          }
        }
      }
    }
    inPersonSessionsQuery: contentfulProduct(slug: { eq: $inPersonId }) {
      ...SessionInfo
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
