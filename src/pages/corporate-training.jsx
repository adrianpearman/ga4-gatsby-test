/* eslint-disable react/no-danger */
import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import 'intersection-observer';
import { useInView } from 'react-intersection-observer';
import SiteLink from '../components/SiteLink/SiteLink';

import Layout from '../components/Layout/Layout';
import Head from '../components/Head/Head';
import StandardHero from '../components/StandardHero/StandardHero';
import Button from '../components/Button/Button';
import CarouselSlider from '../components/CarouselSlider/CarouselSlider';
import StudentSuccessBanner from '../components/StudentSuccessBanner/StudentSuccessBanner';

import { standardDate } from '../helpers/formatters';
import { compareStartDatesAsc, excludePastStartDates } from '../helpers/filtersorters';
import scrollToAnchor from '../helpers/internalScrollToAnchor';

import * as CorporateTrainingStyles from './corporate-training.module.scss';

const CorporateTraining = ({ data, location }) => {
  const { pageContent } = data;
  const { slug, metaContent, heroContent, sections } = pageContent;

  const foundTestimonialSection = sections.find(
    (section) => section.style === 'carousel-testimonial-standard'
  );

  const successBannerSection = sections.find(
    (section) => section.style === 'student-success-banner-calendly'
  );

  const partTimeOnly = (array) => {
    return array.filter((session) => session.timeCommitment === 'Part-Time');
  };

  const [calendlyVisible, setCalendlyVisible] = useState(false);
  const [carouselRef, carouselInView] = useInView();
  const handleJumpButtonClick = (e) => {
    setCalendlyVisible(true);
    scrollToAnchor(e, successBannerSection?.customAnchor, 50);
  };

  useEffect(() => {
    if (carouselInView) {
      setCalendlyVisible(false);
    }
  }, [carouselInView]);

  return (
    <Layout pageSlug={slug}>
      <Head metaContent={metaContent} pagePath={location.pathname} />
      <StandardHero
        heroContent={heroContent}
        background="junoYellowPeach"
        calendlyEmbed
        buttonId="corporate-training-hero"
      >
        {successBannerSection && (
          <Button
            type="button"
            text="Get Started"
            buttonStyle="primary"
            id="jump-button"
            onClick={(e) => handleJumpButtonClick(e)}
          />
        )}
      </StandardHero>

      {sections.map((section) => {
        if (section.style === 'carousel-testimonial-standard') {
          return (
            <section
              ref={carouselRef}
              key={section.id}
              className={`${CorporateTrainingStyles.testimonials} grid-wrapper`}
            >
              {section.heading && <h2>{section.heading}</h2>}
              <CarouselSlider
                sliderCards={section.content}
                cardType="testimonialShort"
                numberOfPreviewsVisible={2}
                parentClass={CorporateTrainingStyles.carousel}
                parentSlug="corporate-training"
              />
            </section>
          );
        }

        if (section.style === 'corporate-training-our-courses') {
          return (
            <section
              key={section.id}
              className={`grid-wrapper ${CorporateTrainingStyles.courses} ${
                foundTestimonialSection ? '' : CorporateTrainingStyles.noCarousel
              }`}
            >
              <h2 className={CorporateTrainingStyles.title}>{section.heading}</h2>
              <p
                className={CorporateTrainingStyles.subtitle}
                dangerouslySetInnerHTML={{
                  __html: section.description.childMarkdownRemark.rawMarkdownBody
                }}
              />
              <div className={CorporateTrainingStyles.productCardsWrapper}>
                {section.content.map((card) => {
                  if (card.__typename === 'ContentfulProduct') {
                    const partTimeSessions = partTimeOnly(card.session);
                    const nextSession = partTimeSessions
                      .filter(excludePastStartDates)
                      .sort(compareStartDatesAsc);
                    const session = nextSession[0];
                    return (
                      <article className={CorporateTrainingStyles.product} key={card.id}>
                        <div className={CorporateTrainingStyles.productInfo}>
                          <h3>
                            <SiteLink
                              to={`/course/${card.slug}/`}
                              className={`link-arrow ${CorporateTrainingStyles.productLink}`}
                            >
                              {card.name}
                            </SiteLink>
                          </h3>
                          <p>{card.corporateDescription.corporateDescription}</p>
                        </div>
                        <div className={CorporateTrainingStyles.upcomingSession}>
                          {nextSession.length ? (
                            <>
                              <p
                                className={CorporateTrainingStyles.nextSession}
                              >{`Next session starts ${standardDate(session.startDate)}.`}</p>
                              <p>{`${session.classDays}, ${session.timeFrame} EST, ${session.numberOfWeeks} Weeks ${session.timeCommitment}`}</p>
                            </>
                          ) : (
                            <p className={CorporateTrainingStyles.noSessions}>
                              There are currently no course sessions scheduled.
                            </p>
                          )}
                        </div>
                      </article>
                    );
                  }
                  if (card.__typename === 'ContentfulContentBlock') {
                    return (
                      <article className={`${CorporateTrainingStyles.product}`} key={card.id}>
                        <div className={CorporateTrainingStyles.productInfo}>
                          <h3>{card.title}</h3>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: card.bodyText.childMarkdownRemark.rawMarkdownBody
                            }}
                          />
                          <Button
                            key={card.button.id}
                            urlIsRelativePath={card.button.isUrlRelativePath}
                            openInNewTab={card.button.openInNewTab}
                            href={card.button.url}
                            text={card.button.text}
                            useSnowplowTracking={card.button.useSnowplowTracking}
                            buttonStyle="primary"
                          />
                        </div>
                      </article>
                    );
                  }

                  return null;
                })}
              </div>
            </section>
          );
        }

        if (section.style === 'corporate-training-upskill') {
          return (
            <section key={section.id} className={`grid-wrapper ${CorporateTrainingStyles.upskill}`}>
              <h1 className={CorporateTrainingStyles.title}>{section.heading}</h1>
              <ul className={CorporateTrainingStyles.skills}>
                {section.content.map((card) => (
                  <li key={card.id} className={CorporateTrainingStyles.skill}>
                    <h3>{card.title}</h3>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: card.bodyText.childMarkdownRemark.rawMarkdownBody
                      }}
                    />
                  </li>
                ))}
              </ul>
            </section>
          );
        }

        if (section.style === 'student-success-banner-calendly') {
          return (
            <section key={section.id} id={section.customAnchor}>
              <StudentSuccessBanner
                bannerContent={section.content[0]}
                showCalendlyEmbed
                calendlyButtonId={section.customAnchor}
                preLoadCalendly={calendlyVisible}
              />
            </section>
          );
        }
        return null;
      })}
    </Layout>
  );
};

export default CorporateTraining;

export const query = graphql`
  query {
    pageContent: contentfulPageGeneric(slug: { eq: "corporate-training" }) {
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
        subheading {
          childMarkdownRemark {
            rawMarkdownBody
          }
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
      sections {
        id
        style
        heading
        customAnchor
        description {
          childMarkdownRemark {
            rawMarkdownBody
            html
          }
        }
        ctaButton {
          url
          text
          isUrlRelativePath
          openInNewTab
          useSnowplowTracking
        }
        content {
          ... on ContentfulTestimonial {
            __typename
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
              jobCurrent
              jobCurrentCompany
              jobCurrentCompanyLink
              headshot {
                gatsbyImageData(width: 300, layout: CONSTRAINED)
              }
            }
          }
          ... on ContentfulProduct {
            __typename
            id
            name
            corporateDescription {
              corporateDescription
            }
            slug
            session {
              id
              startDate
              classDays
              timeFrame
              timeCommitment
              numberOfWeeks
            }
          }
          ... on ContentfulContentBlock {
            __typename
            id
            title
            bodyText {
              childMarkdownRemark {
                rawMarkdownBody
              }
            }
            button {
              url
              text
              isUrlRelativePath
              openInNewTab
              useSnowplowTracking
            }
          }
          ... on ContentfulStudentSuccessBanner {
            __typename
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
`;
