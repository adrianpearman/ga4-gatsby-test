import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import SiteLink from '../SiteLink/SiteLink';

import Button from '../Button/Button';
import { abbreviatedMonth, dayOfTheMonth } from '../../helpers/formatters';

import * as GetStartedForFreeStyles from './GetStartedForFree.module.scss';

const GetStartedForFree = ({ backgroundStyle = 'white' }) => {
  const { futureWorkshopsQuery } = useStaticQuery(graphql`
    query {
      futureWorkshopsQuery: allContentfulEventSession(
        filter: {
          type: { format: { eq: "Workshop" }, price: { eq: 0 }, skillLevel: { eq: "Beginner" } }
          isFuture: { eq: true }
        }
        sort: { date: ASC }
      ) {
        edges {
          node {
            id
            registrationLink
            date
            timeFrame
            location
            uniqueName
            uniqueImage {
              gatsbyImageData
              description
            }
            type {
              name
              price
              format
              sharedCtaText
              associatedProduct {
                name
              }
              defaultImage {
                gatsbyImageData(width: 660, layout: CONSTRAINED, quality: 100)
                description
              }
            }
          }
        }
      }
    }
  `);
  // const { futureWorkshopsQuery } = useStaticQuery(graphql`
  //   query {
  //     futureWorkshopsQuery: allContentfulEventSession(
  //       filter: {
  //         type: { format: { eq: "Workshop" }, price: { eq: 0 }, skillLevel: { eq: "Beginner" } }
  //         isFuture: { eq: true }
  //       }
  //       sort: { fields: date, order: ASC }
  //     ) {
  //       edges {
  //         node {
  //           id
  //           registrationLink
  //           date
  //           timeFrame
  //           location
  //           uniqueName
  //           uniqueImage {
  //             gatsbyImageData
  //             description
  //           }
  //           type {
  //             name
  //             price
  //             format
  //             sharedCtaText
  //             associatedProduct {
  //               name
  //             }
  //             defaultImage {
  //               gatsbyImageData(width: 660, layout: CONSTRAINED, quality: 100)
  //               description
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // `);
  const allFutureWorkshops = futureWorkshopsQuery.edges.map((edge) => edge.node);
  const firstTwoWorkshops = allFutureWorkshops.slice(0, 2);

  return (
    <section
      className={`grid-wrapper ${GetStartedForFreeStyles.start} ${GetStartedForFreeStyles[backgroundStyle]}`}
    >
      <div
        className={`${GetStartedForFreeStyles.info} ${
          firstTwoWorkshops.length ? '' : GetStartedForFreeStyles.noEvents
        }`}
      >
        <h2>Get started for free</h2>
        <p>Join our free monthly tech workshops and panel events!</p>
      </div>
      <div className={GetStartedForFreeStyles.workshops}>
        {firstTwoWorkshops.length > 0 ? (
          <>
            {firstTwoWorkshops.map((workshop) => {
              return (
                <div className={GetStartedForFreeStyles.workshopContainer} key={workshop.id}>
                  <div className={GetStartedForFreeStyles.workshop}>
                    <div className={GetStartedForFreeStyles.dateLocation}>
                      <div className={GetStartedForFreeStyles.date}>
                        <p>{abbreviatedMonth(workshop.date)}</p>
                        <p>{dayOfTheMonth(workshop.date)}</p>
                      </div>
                      <div className={GetStartedForFreeStyles.location}>
                        <p>
                          Free {workshop.type.associatedProduct.name} {workshop.type.format}
                        </p>
                        <p>
                          <span>{`${workshop.timeFrame} @ `}</span>
                          {workshop.location}
                        </p>
                      </div>
                    </div>
                    <h3 className={GetStartedForFreeStyles.eventName}>
                      {workshop.uniqueName || workshop.type.name}
                    </h3>
                    <Button
                      urlIsRelativePath={false}
                      href={workshop.registrationLink}
                      text={workshop.type.sharedCtaText}
                      openInNewTab
                      useSnowplowTracking
                      buttonStyle="secondary"
                      className={GetStartedForFreeStyles.eventButton}
                    />
                  </div>
                  <div className={GetStartedForFreeStyles.workshopBottom}>
                    <GatsbyImage
                      image={
                        workshop.uniqueImage?.gatsbyImageData ||
                        workshop.type.defaultImage?.gatsbyImageData
                      }
                      className={GetStartedForFreeStyles.image}
                      alt={
                        workshop.uniqueImage?.description || workshop.type.defaultImage?.description
                      }
                    />
                  </div>
                </div>
              );
            })}
          </>
        ) : null}
      </div>
      <div
        className={`${GetStartedForFreeStyles.loadMore} ${
          firstTwoWorkshops.length ? '' : GetStartedForFreeStyles.noEvents
        }`}
      >
        <SiteLink to="/events/">See all events</SiteLink>
      </div>
    </section>
  );
};

export default GetStartedForFree;
