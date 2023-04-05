/* eslint-disable react/no-danger */
import React from 'react';
import { graphql } from 'gatsby';
import { scroller } from 'react-scroll';
import { getSrc } from 'gatsby-plugin-image';

import Layout from '../components/Layout/Layout';
import Head from '../components/Head/Head';
import ImageCarousel from '../components/ImageCarousel/ImageCarousel';

import * as CampusesStyles from './campuses.module.scss';
import camelCase from '../helpers/camelCase';

const Campuses = ({ data, location }) => {
  const { pageContent } = data;
  const { slug, metaContent, heroContent, sections } = pageContent;

  const allCampuses = sections.find((section) => section.style === 'campus-all-campuses');

  const scrollToAnchor = (e, target) => {
    e.preventDefault();
    scroller.scrollTo(target, {
      offset: -100,
      duration: 800,
      delay: 0,
      smooth: true
    });
  };

  return (
    <Layout pageSlug={slug}>
      <Head metaContent={metaContent} pagePath={location.pathname} />
      <section className={`grid-wrapper ${CampusesStyles.hero}`}>
        <div className={CampusesStyles.mainContent}>
          <h1 className={CampusesStyles.title}>{heroContent.h1Heading}</h1>
          <p
            dangerouslySetInnerHTML={{
              __html: heroContent.introParagraph.childMarkdownRemark.rawMarkdownBody
            }}
          />
        </div>
        {allCampuses && (
          <div className={CampusesStyles.sidebar}>
            <h2 className={CampusesStyles.sidebarTitle}>Jump to campus</h2>
            <ul>
              {allCampuses.content.map((campus) => (
                <li key={campus.id}>
                  <a
                    href={`#${camelCase(campus.campusName)}`}
                    onClick={(e) => scrollToAnchor(e, camelCase(campus.campusName))}
                  >
                    {campus.campusName}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
      {allCampuses && (
        <section className={CampusesStyles.campuses} id="campuses">
          {allCampuses.content.map((campus) => (
            <article
              key={campus.id}
              className={CampusesStyles.individualCampus}
              id={camelCase(campus.campusName)}
            >
              <ImageCarousel images={campus.featuredImages} />
              <div className={`${CampusesStyles.campusContent} grid-wrapper`}>
                <aside style={{ backgroundImage: `url(${getSrc(campus.mapImage)})` }}>
                  <div className={CampusesStyles.campusCaption}>
                    <p>
                      {campus.streetAddress} &ndash; <span>{campus.campusType}</span>
                    </p>
                    <p>{campus.campusCaption}</p>
                  </div>
                </aside>
                <div className={CampusesStyles.campusBreakdown}>
                  <h2>{campus.campusName}</h2>
                  <address className={CampusesStyles.campusLocation}>
                    <p>{campus.streetAddress}</p>
                    {campus.streetAddressSecondary && (
                      <p>
                        {campus.streetAddressSecondary}
                        {campus.buzzNumber && <span> &ndash; Buzz #{campus.buzzNumber}</span>}
                      </p>
                    )}
                    <p>
                      {campus.city}, {campus.campusProvince} {campus.postalCode}
                    </p>
                  </address>
                  <div className={CampusesStyles.locationalLinks}>
                    <a href={campus.mapLink} target="_blank" rel="noopener noreferrer">
                      {campus.mapLinkText}
                    </a>
                    <a href={campus.tourLink} target="_blank" rel="noopener noreferrer">
                      {campus.tourLinkText}
                    </a>
                  </div>
                  <div className={CampusesStyles.campusOverview}>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: campus.campusOverview.childMarkdownRemark.rawMarkdownBody
                      }}
                    />

                    <ul
                      className={CampusesStyles.bulletPoints}
                      dangerouslySetInnerHTML={{
                        __html: campus.bulletPoints.childMarkdownRemark.rawMarkdownBody
                      }}
                    />
                    <a href={campus.learnMoreLink} className="link-arrow">
                      {campus.learnMoreText}
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </Layout>
  );
};

export default Campuses;

export const query = graphql`
  query {
    pageContent: contentfulPageGeneric(slug: { eq: "campuses" }) {
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
          childMarkdownRemark {
            rawMarkdownBody
          }
        }
      }
      sections {
        style
        content {
          ... on ContentfulCampus {
            id
            bulletPoints {
              childMarkdownRemark {
                rawMarkdownBody
              }
            }
            campusOverview {
              childMarkdownRemark {
                rawMarkdownBody
              }
            }
            featuredImages {
              description
              gatsbyImageData
            }
            mapImage {
              description
              gatsbyImageData
            }
            buzzNumber
            campusCaption
            campusName
            campusType
            city
            campusProvince
            comingSoon
            learnMoreLink
            learnMoreText
            mapLink
            mapLinkText
            postalCode
            streetAddress
            streetAddressSecondary
            tourLink
            tourLinkText
          }
        }
      }
    }
  }
`;
