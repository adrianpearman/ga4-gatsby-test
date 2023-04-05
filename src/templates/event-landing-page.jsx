import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { scroller } from 'react-scroll';

import Layout from '../components/Layout/Layout';
import Head from '../components/Head/Head';
import Button from '../components/Button/Button';
import CarouselArrow from '../components/SVG/CarouselArrow';

import { longDate, monthAndDay } from '../helpers/formatters';
import useItemSwitcher from '../hooks/useItemSwitcher';
import { compareStartDatesAsc, excludePastStartDates } from '../helpers/filtersorters';

import * as EventLandingPageStyles from './event-landing-page.module.scss';

const EventLandingPage = ({ data, location }) => {
  const { pageContent } = data;

  const pageSectionsMap = new Map();
  pageContent.sections.forEach((section) => {
    pageSectionsMap.set(section.style, section);
  });

  const reviewsSection =
    pageSectionsMap.has('event-landing-page-reviews') &&
    pageSectionsMap.get('event-landing-page-reviews');
  const {
    current: currentTestimonial,
    next: nextTestimonial,
    previous: previousTestimonial
  } = useItemSwitcher(reviewsSection.content || '');

  const eventsSection =
    pageSectionsMap.has('event-landing-page-upcoming-events') &&
    pageSectionsMap.get('event-landing-page-upcoming-events');
  const [eventType] =
    pageSectionsMap.has('event-landing-page-upcoming-events') &&
    eventsSection.content.filter((content) => content.__typename === 'ContentfulEventType');
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const filteredEvents = eventType.event_session
      .filter(excludePastStartDates)
      .sort(compareStartDatesAsc);

    setUpcomingEvents(filteredEvents);
  }, [eventType]);

  function handleScroll() {
    scroller.scrollTo('sessions', {
      duration: 800,
      delay: 0,
      smooth: true
    });
  }

  const { metaContent } = pageContent;

  return (
    <Layout slug={pageContent.slug}>
      <Head metaContent={metaContent} pagePath={location.pathname} />
      <section className={`grid-wrapper ${EventLandingPageStyles.hero}`}>
        <h1>{pageContent.heroContent.h1Heading}</h1>
        <p>{pageContent.heroContent.introParagraph.introParagraph}</p>
        {upcomingEvents.length ? (
          <div className={EventLandingPageStyles.session}>
            <h2>Next Session</h2>
            <ul>
              <li>{upcomingEvents[0].uniqueName || eventType.name}</li>
              <li>{longDate(upcomingEvents[0].date)}</li>
              <li>{upcomingEvents[0].timeFrame}</li>
            </ul>

            <p>No coding skills needed!</p>
            <Button
              urlIsRelativePath={false}
              text={eventType.sharedCtaText || 'Register Now'}
              href={upcomingEvents[0].registrationLink}
              openInNewTab
              useSnowplowTracking
              buttonStyle="primary"
            />
            <button
              type="button"
              className={`link-arrow link-arrow-white ${EventLandingPageStyles.sessionLink}`}
              onClick={handleScroll}
            >
              Find another session
            </button>
          </div>
        ) : (
          <div className={EventLandingPageStyles.session}>
            <h2>Sorry!</h2>
            <p>There are no upcoming workshops right now. Please check back soon!</p>
          </div>
        )}
        <GatsbyImage
          image={pageContent.heroContent.image.gatsbyImageData}
          className={EventLandingPageStyles.heroComputer}
          alt={pageContent.heroContent.image.description}
        />
      </section>
      {pageContent.sections.map((section) => {
        return (
          (section.style === 'event-landing-page-reviews' && (
            <section className={`grid-wrapper ${EventLandingPageStyles.quotes}`} key={section.id}>
              <div className={EventLandingPageStyles.quote}>
                <p>{currentTestimonial.quotation.quotation}</p>
                <h2>{currentTestimonial.name}</h2>
                <div className={EventLandingPageStyles.carouselButtons}>
                  <button
                    type="button"
                    onClick={previousTestimonial}
                    aria-label="Show the previous student review"
                  >
                    <CarouselArrow direction="previous" type="primaryviolet" />
                  </button>
                  <button
                    type="button"
                    onClick={nextTestimonial}
                    aria-label="Show the next student review"
                  >
                    <CarouselArrow direction="next" type="primaryviolet" />
                  </button>
                </div>
              </div>
            </section>
          )) ||
          (section.style === 'event-landing-page-what-youll-learn' && (
            <section className={`grid-wrapper ${EventLandingPageStyles.learn}`} key={section.id}>
              <h2>{section.heading}</h2>
              <ul className={EventLandingPageStyles.learnings}>
                {section.content.map((block) => (
                  <li key={block.id}>
                    {block?.asset?.file && (
                      <img src={`https:${block.asset.file.url}`} alt="list bullet icon" />
                    )}
                    <div>
                      <h3>{block.title}</h3>
                      <p>{block.bodyText.bodyText}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )) ||
          (section.style === 'event-landing-page-upcoming-events' && (
            <section className={`grid-wrapper ${EventLandingPageStyles.sessions}`} key={section.id}>
              <h2 name="sessions">{section.heading}</h2>
              <ul className={EventLandingPageStyles.upcomingSessions}>
                {upcomingEvents.length ? (
                  <>
                    {upcomingEvents.map((event) => (
                      <li className={EventLandingPageStyles.session} key={event.id}>
                        <h3>{monthAndDay(event.date)}</h3>
                        <ul>
                          <li>{event.uniqueName || eventType.name}</li>
                          <li>{longDate(event.date)}</li>
                          <li>{event.timeFrame}</li>
                        </ul>

                        <Button
                          urlIsRelativePath={false}
                          text={eventType.sharedCtaText || 'Register Now'}
                          href={event.registrationLink}
                          openInNewTab
                          useSnowplowTracking
                          buttonStyle="primary"
                        />
                      </li>
                    ))}
                  </>
                ) : (
                  <li className={EventLandingPageStyles.session}>
                    <h2>Sorry!</h2>
                    <p>There are no upcoming workshops right now. Please check back soon!</p>
                  </li>
                )}
              </ul>
              <h3>{section.description.description}</h3>
              <a
                href={section.ctaButton.url}
                className={`link ${EventLandingPageStyles.upcomingSessionLink}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {section.ctaButton.text}
              </a>
            </section>
          ))
        );
      })}
    </Layout>
  );
};

export default EventLandingPage;

export const query = graphql`
  query ($id: String!) {
    pageContent: contentfulPageGeneric(id: { eq: $id }) {
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
        introParagraph {
          introParagraph
        }
        image {
          description
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
      sections {
        id
        heading
        style
        description {
          description
        }
        content {
          ... on ContentfulContentBlock {
            __typename
            id
            title
            bodyText {
              bodyText
            }
            asset {
              id
              file {
                url
              }
            }
          }
          ... on ContentfulTestimonial {
            __typename
            id
            name
            quotation {
              quotation
            }
          }
          ... on ContentfulEventType {
            __typename
            name
            sharedCtaText
            format
            event_session {
              id
              registrationLink
              uniqueName
              date
              location
              timeFrame
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
    }
  }
`;
