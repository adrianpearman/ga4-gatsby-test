/* eslint-disable react/no-danger */
import React, { useEffect, useState, Fragment } from 'react';
import { graphql } from 'gatsby';
import { DateTime } from 'luxon';
import 'intersection-observer';
import { useInView } from 'react-intersection-observer';
import SiteLink from '../components/SiteLink/SiteLink';

import Layout from '../components/Layout/Layout';
import Head from '../components/Head/Head';
import StandardHero from '../components/StandardHero/StandardHero';
import StandardPageSection from '../components/StandardPageSection/StandardPageSection';
import CircleHeadshot from '../components/CircleHeadshot/CircleHeadshot';
import CalendlyEmbedDrawer from '../components/CalendlyEmbedDrawer/CalendlyEmbedDrawer';
import CommonPageSections from '../components/CommonPageSections/CommonPageSections';

import { compareStartDatesAsc, excludePastStartDates } from '../helpers/filtersorters';
import { monthAndDay, standardDate } from '../helpers/formatters';

import InnerStamp from '../assets/images/stamps/career-pathway-stamp-inner.svg';
import OuterStamp from '../assets/images/stamps/career-pathway-stamp-outer.svg';
import YellowRocket from '../assets/images/icons/juno-yellow-rocket-icon.svg';
import RedRocket from '../assets/images/icons/juno-red-rocket-icon.svg';
import rightArrowRed from '../assets/images/icons/arrow-link-linkred.svg';
import rightArrowMint from '../assets/images/link-arrow/arrow-link-mint.svg';

import * as CareerPathwaysStyles from './career-pathways.module.scss';

const CareerPathways = ({ data, location }) => {
  const { pathwayQuery } = data;
  const { slug, metaContent, heroContent, sections } = pathwayQuery.pageDetails;

  const stepDescriptionsSection = sections.find(
    (section) => section.style === 'career-pathway-step-descriptions'
  );
  const allStepHeadings = stepDescriptionsSection.content.slice(1).map((step) => step.title);

  const allPathwayProducts = sections.find(
    (section) => section.style === 'career-pathway-upcoming-pathways'
  ).content;

  const reduceDependentToSingleSession = (feederSession, dependentProducts) => {
    const dependentsWithSingleSession = [];
    dependentProducts.forEach((dependent, index) => {
      const correctPathwaySessionsOnly = dependent.sessions.filter((session) => {
        if (dependent.type === 'bootcamp') {
          return session.timeCommitment !== 'Part-Time';
        }
        return true;
      });

      const newDependent = {
        type: dependent.type
      };
      if (index === 0) {
        const [firstSession] = correctPathwaySessionsOnly.filter(
          (session) => feederSession.endDate < session.startDate
        );

        newDependent.session = firstSession;
      } else {
        const [firstSession] = correctPathwaySessionsOnly.filter(
          (session) => dependentsWithSingleSession[index - 1].session.endDate < session.startDate
        );

        newDependent.session = firstSession;
      }

      dependentsWithSingleSession.push(newDependent);
    });

    return dependentsWithSingleSession;
  };

  const createPathwayMap = (feederSession, dependentProducts) => {
    const matchingDependents = reduceDependentToSingleSession(feederSession, dependentProducts);

    let incompletePathway = false;
    matchingDependents.forEach((dependent) => {
      if (!dependent.session) {
        incompletePathway = true;
      }
    });
    if (incompletePathway) {
      return null;
    }

    const { careerLabsStartDate } = matchingDependents.find(
      (dependent) => dependent.type === 'bootcamp'
    ).session;

    const completePathwayMap = new Map();

    completePathwayMap.set('id', feederSession.id).set('feederCourseDates', {
      start: feederSession.startDate,
      end: feederSession.endDate
    });

    matchingDependents.forEach((dependent, index) => {
      if (dependent.type === 'course') {
        completePathwayMap.set(`dependentCourse${index + 1}`, {
          start: dependent.session.startDate,
          end: dependent.session.endDate
        });
      }
      if (dependent.type === 'bootcamp') {
        completePathwayMap.set('bootcampDates', {
          start: dependent.session.startDate,
          end: dependent.session.endDate
        });
      }
    });

    completePathwayMap
      .set('careerSupportStart', {
        start: careerLabsStartDate
      })
      .set('jobSearch', {
        end: DateTime.fromISO(careerLabsStartDate).plus({ days: 180 })
      });

    return completePathwayMap;
  };

  const [upcomingPathways, setUpcomingPathways] = useState([]);
  const [highlightedPathwayDate, setHighlightedPathwayDate] = useState('');
  useEffect(() => {
    // Separate out feeder product from dependencies & filter for upcoming part time sessions
    // Limit upcoming feeder sessions to 2
    const upcomingFeederSessions = allPathwayProducts[0].session
      .filter(excludePastStartDates)
      .filter((session) => session.timeCommitment === 'Part-Time')
      .sort(compareStartDatesAsc)
      .slice(0, 2);

    // filter dependent product sessions for upcoming (sometimes part time) sessions
    const allDependentProducts = allPathwayProducts.slice(1).map((product) => {
      const dependent = {
        type: product.type,
        sessions: product.session.filter(excludePastStartDates).sort(compareStartDatesAsc)
      };
      if (product.type === 'course') {
        dependent.sessions = product.session
          .filter(excludePastStartDates)
          .filter((session) => session.timeCommitment === 'Part-Time')
          .sort(compareStartDatesAsc);
      }
      return dependent;
    });

    // Generate pathways based on feeder session end date & save to a list
    const upcomingPathwayMaps = upcomingFeederSessions
      .map((session) => createPathwayMap(session, allDependentProducts))
      .filter((pathway) => pathway);

    setUpcomingPathways(upcomingPathwayMaps);
    if (upcomingPathwayMaps.length) {
      setHighlightedPathwayDate(upcomingPathwayMaps[0].get('feederCourseDates').start);
    }
  }, [allPathwayProducts]);

  // rocket animation
  const [allSystemsGo, setAllSystemsGo] = useState(false);
  const [iginitionStart, setIgnitionStart] = useState(false);
  const [resetRocket, setResetRocket] = useState(false);
  const [step4Ref, stepInView] = useInView({
    rootMargin: '0px 0px -200px 0px'
  });
  useEffect(() => {
    if (stepInView && !resetRocket) {
      setAllSystemsGo(true);
    }
    if (!stepInView && iginitionStart) {
      setResetRocket(true);
      setAllSystemsGo(false);
      setIgnitionStart(false);
    }
  }, [stepInView, iginitionStart, resetRocket]);

  // Function that creates html for each pathway value
  const createPathwayHtml = (key, dates) => {
    if (key === 'careerSupportStart') {
      return `Your job search starts <span>${standardDate(dates.start)}</span>`;
    }
    if (key === 'jobSearch') {
      return `
        Our goal is to help you find a job within 180 days
        <span>
          (${dates.end.toFormat('LLL d, yyyy')})
        </span>`;
    }
    return `<span
      class="${highlightedPathwayDate === dates.start ? CareerPathwaysStyles.highlight : ''}"
    >
      ${monthAndDay(dates.start)} -
    </span>${' '}
    ${standardDate(dates.end)}`;
  };

  return (
    <Layout pageSlug={slug}>
      <Head metaContent={metaContent} pagePath={location.pathname} />
      <StandardHero
        heroContent={heroContent}
        stamp={{ outerStamp: OuterStamp, innerStamp: InnerStamp }}
        largeHeading
      />

      {sections.map((section, sectionIndex, array) => {
        if (section.style === 'standard-page-section') {
          return (
            <StandardPageSection
              key={section.id}
              section={section}
              id="developer"
              className={CareerPathwaysStyles.dailyLifeSection}
              withImageCaption
            />
          );
        }
        if (section.style === 'career-pathway-step-descriptions') {
          return (
            <section
              key={section.id}
              id="steps"
              className={`${CareerPathwaysStyles.pathwaySection} ${
                !upcomingPathways.length ? CareerPathwaysStyles.noUpcomingPathways : ''
              } grid-wrapper`}
            >
              <h2 className={CareerPathwaysStyles.sectionHeading}>{section.heading}</h2>
              <p
                className={CareerPathwaysStyles.sectionDescription}
                dangerouslySetInnerHTML={{
                  __html: section.description.childMarkdownRemark.rawMarkdownBody
                }}
              />
              <ul className={CareerPathwaysStyles.pathwaySteps}>
                {section.content.map((step, index) => (
                  <li
                    ref={index === 4 ? step4Ref : null}
                    className={CareerPathwaysStyles.step}
                    key={step.id}
                  >
                    <div className={CareerPathwaysStyles.headings}>
                      <h3>{index === 0 ? 'Before diving in...' : `Step ${index}`}</h3>
                      <h4>{step.title}</h4>
                      {index === section.content.length - 1 && (
                        <img
                          className={`${CareerPathwaysStyles.yellowRocket} 
                    ${allSystemsGo ? CareerPathwaysStyles.enginesGo : ''} ${
                            iginitionStart ? CareerPathwaysStyles.liftOff : ''
                          }`}
                          onAnimationEnd={() => setIgnitionStart(true)}
                          src={YellowRocket}
                          alt=""
                        />
                      )}
                      {step.button ? (
                        <SiteLink className="link-arrow link-arrow-white" to={step.button.url}>
                          {step.button.text}
                        </SiteLink>
                      ) : (
                        step.relatedContent && (
                          <SiteLink
                            className="link-arrow link-arrow-white"
                            to={`/${step.relatedContent?.type}/${step.relatedContent?.slug}/`}
                          >
                            Learn more
                          </SiteLink>
                        )
                      )}
                    </div>
                    <div
                      className={CareerPathwaysStyles.details}
                      dangerouslySetInnerHTML={{
                        __html: step.bodyText.childMarkdownRemark.html
                      }}
                    />
                  </li>
                ))}
              </ul>
              {!upcomingPathways.length ? (
                <CalendlyEmbedDrawer
                  buttonId="step-descriptions"
                  uniqueButtonText="Book a Call to Learn More"
                  className={CareerPathwaysStyles.calendlyEmbed}
                  fullPageWidth
                  darkHideButton
                />
              ) : null}
            </section>
          );
        }
        if (section.style === 'career-pathway-upcoming-pathways' && upcomingPathways.length) {
          return (
            <section
              key={section.id}
              id="dates"
              className={`${CareerPathwaysStyles.nextPathwaySection} grid-wrapper`}
            >
              <h2 className={CareerPathwaysStyles.sectionHeading}>
                {section.heading}
                <span className={CareerPathwaysStyles.highlight}>
                  {monthAndDay(highlightedPathwayDate)}
                </span>
              </h2>
              <ul
                className={`${CareerPathwaysStyles.careerPathway} ${
                  CareerPathwaysStyles.headings
                } ${allStepHeadings.length === 5 ? CareerPathwaysStyles.extraWide : ''}`}
              >
                {allStepHeadings.map((heading, index) => (
                  <Fragment key={heading}>
                    <li
                      className={`${CareerPathwaysStyles.pathwayHeading} ${
                        heading === 'JavaScript Course' ? CareerPathwaysStyles.javascript : ''
                      }`}
                    >
                      {index + 1 !== allStepHeadings.length ? (
                        <div className={CareerPathwaysStyles.stepNumber}>{index + 1}</div>
                      ) : (
                        <img
                          className={CareerPathwaysStyles.redRocket}
                          src={RedRocket}
                          alt="Icon for final step in pathway."
                        />
                      )}
                      <h3>{heading}</h3>
                    </li>
                    {index + 1 !== allStepHeadings.length && (
                      <li className={CareerPathwaysStyles.arrow} aria-hidden>
                        <img src={rightArrowRed} alt="" />
                      </li>
                    )}
                  </Fragment>
                ))}
              </ul>
              {upcomingPathways.map((completedPathway) => (
                <ul
                  key={completedPathway.get('id')}
                  className={`${CareerPathwaysStyles.careerPathway} ${
                    allStepHeadings.length === 5 ? CareerPathwaysStyles.extraWide : ''
                  }`}
                >
                  {Array.from(completedPathway)
                    .slice(1)
                    .map((pathwayValue, index, allPathwayValues) => {
                      const [key, dates] = pathwayValue;
                      return (
                        <Fragment key={key}>
                          <li
                            className={`${CareerPathwaysStyles.pathwayItem} ${
                              allStepHeadings[index] === 'JavaScript Course'
                                ? CareerPathwaysStyles.javascript
                                : ''
                            }`}
                          >
                            <div
                              className={`${CareerPathwaysStyles.pathwayHeading} ${CareerPathwaysStyles.mobileHeading}`}
                            >
                              {index !== allPathwayValues.length - 1 ? (
                                <div className={CareerPathwaysStyles.stepNumber}>{index + 1}</div>
                              ) : (
                                <img
                                  className={CareerPathwaysStyles.redRocket}
                                  src={RedRocket}
                                  alt="Icon for final step in pathway."
                                />
                              )}
                              <h3>{allStepHeadings[index]}</h3>
                            </div>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: createPathwayHtml(key, dates)
                              }}
                            />
                          </li>
                          {index !== allPathwayValues.length - 1 && (
                            <li className={CareerPathwaysStyles.arrow} aria-hidden>
                              <img src={rightArrowMint} alt="" />
                            </li>
                          )}
                        </Fragment>
                      );
                    })}
                </ul>
              ))}
              <p
                className={CareerPathwaysStyles.needHelpText}
                dangerouslySetInnerHTML={{
                  __html: section.description.childMarkdownRemark.rawMarkdownBody
                }}
              />
              <CalendlyEmbedDrawer
                buttonId="upcoming-pathways"
                className={CareerPathwaysStyles.calendlyEmbed}
                fullPageWidth
                darkHideButton
              />
            </section>
          );
        }
        if (section.style === 'career-pathway-meet-our-grads') {
          return (
            <section
              key={section.id}
              id="grads"
              className={`${CareerPathwaysStyles.meetGradsSection} grid-wrapper`}
            >
              <h2 className={CareerPathwaysStyles.sectionHeading}>{section.heading}</h2>
              <p
                className={CareerPathwaysStyles.sectionDescription}
                dangerouslySetInnerHTML={{
                  __html: section.description.childMarkdownRemark.rawMarkdownBody
                }}
              />
              <ul className={CareerPathwaysStyles.gradStories}>
                {section.content.map((story) => (
                  <li key={story.id} className={CareerPathwaysStyles.storyCard}>
                    <CircleHeadshot
                      imageData={story.subject.headshot.gatsbyImageData}
                      altText={`Headshot of ${story.subject.name}`}
                      size="90px"
                      className={CareerPathwaysStyles.headshot}
                    />
                    <h3>{story.alternateTitle}</h3>
                    <p>
                      {story.subject.name}, {story.subject.jobCurrent} at{' '}
                      {story.subject.jobCurrentCompany}
                    </p>
                    <SiteLink to={`/blog/${story.slug}/`}>Read more</SiteLink>
                  </li>
                ))}
              </ul>
            </section>
          );
        }
        return (
          <CommonPageSections
            key={section.id}
            section={section}
            pageStyles={CareerPathwaysStyles}
            id={section.customAnchor}
            halfGridWidth={sectionIndex + 1 !== array.length}
          />
        );
      })}
    </Layout>
  );
};

export default CareerPathways;

export const query = graphql`
  query ($id: String!) {
    pathwayQuery: contentfulProduct(id: { eq: $id }) {
      pageDetails {
        ... on ContentfulPageGeneric {
          slug
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
            introParagraph {
              childMarkdownRemark {
                html
              }
            }
          }
          sections {
            id
            style
            heading
            customAnchor
            description {
              childMarkdownRemark {
                rawMarkdownBody
              }
            }
            image {
              description
              gatsbyImageData
            }
            ctaButton {
              text
              url
              isUrlRelativePath
              openInNewTab
              useSnowplowTracking
            }
            content {
              ... on ContentfulContentBlock {
                id
                title
                bodyText {
                  childMarkdownRemark {
                    rawMarkdownBody
                    html
                  }
                }
                button {
                  url
                  text
                }
                relatedContent {
                  ... on ContentfulPageGeneric {
                    slug
                  }
                  ... on ContentfulProduct {
                    slug
                    type
                    session {
                      id
                      timeCommitment
                      startDate
                      endDate
                      careerLabsStartDate
                    }
                  }
                }
              }
              ... on ContentfulProduct {
                id
                type
                session {
                  id
                  timeCommitment
                  startDate
                  endDate
                  careerLabsStartDate
                }
              }
              ... on ContentfulLogo {
                id
                company
                companyURL
                file {
                  gatsbyImageData(width: 170, layout: CONSTRAINED)
                }
              }
              ... on ContentfulBlogPost {
                id
                slug
                mainVisualHeading
                alternateTitle
                subject {
                  name
                  jobCurrent
                  jobCurrentCompany
                  headshot {
                    gatsbyImageData(width: 100, layout: CONSTRAINED, quality: 100)
                  }
                }
              }
              ... on ContentfulStudentSuccessBanner {
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
            }
          }
        }
      }
    }
  }
`;
