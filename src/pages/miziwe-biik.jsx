/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import Layout from '../components/Layout/Layout';
import Head from '../components/Head/Head';
import Button from '../components/Button/Button';
import JunoLogo from '../components/SVG/JunoLogo';
import CommonPageSections from '../components/CommonPageSections/CommonPageSections';

import { compareStartDatesAsc, excludePastStartDates } from '../helpers/filtersorters';
import { formatIsoDate } from '../helpers/formatters';
import camelCase from '../helpers/camelCase';

import MiziweBiikLogo from '../assets/images/logos/miziwe-biik.png';

import * as MiziweBiikStyles from './miziwe-biik.module.scss';

const MiziweBiik = ({ data, location }) => {
  const { slug, metaContent, heroContent, sections } = data.pageDetails;

  const upcomingSessionsSection = sections.find(
    (section) => section.style === 'miziwe-biik-upcoming-sessions'
  );

  const [upcomingSessions, setUpcomingSessions] = useState([]);
  useEffect(() => {
    const upcomingSessionsByProduct = upcomingSessionsSection.content.map((product) => {
      return product.session
        .filter(excludePastStartDates)
        .filter((session) => session.timeCommitment === 'Part-Time')
        .slice(0, 6);
    });

    setUpcomingSessions(upcomingSessionsByProduct.flat().sort(compareStartDatesAsc));
  }, [upcomingSessionsSection]);

  return (
    <Layout pageSlug={slug}>
      <Head metaContent={metaContent} pagePath={location.pathname} />
      <section className={`grid-wrapper ${MiziweBiikStyles.hero}`}>
        <div className={MiziweBiikStyles.contentSection}>
          <div className={MiziweBiikStyles.logos}>
            <JunoLogo />
            <a
              className={MiziweBiikStyles.miziweBiikLogo}
              href="https://miziwebiik.ca"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={MiziweBiikLogo} alt="Miziwe Biik Logo" />
            </a>
          </div>
          <h1>{heroContent.h1Heading}</h1>
          <h2
            dangerouslySetInnerHTML={{
              __html: heroContent.subheading.childMarkdownRemark.rawMarkdownBody
            }}
          />
          <p
            dangerouslySetInnerHTML={{
              __html: heroContent.introParagraph.childMarkdownRemark.rawMarkdownBody
            }}
          />
        </div>
        <GatsbyImage
          image={heroContent.image.gatsbyImageData}
          alt={heroContent.image.description}
          className={MiziweBiikStyles.heroImage}
        />
      </section>
      {sections.map((section, index, array) => {
        return (
          (section.style === 'miziwe-biik-about-juno' && (
            <section key={section.id} className={`${MiziweBiikStyles.aboutJuno} grid-wrapper`}>
              <GatsbyImage
                image={section.image.gatsbyImageData}
                alt={section.image.description}
                className={MiziweBiikStyles.imageWrapper}
              />
              <div className={MiziweBiikStyles.textWrapper}>
                <h2 className={MiziweBiikStyles.sectionHeading}>{section.heading}</h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: section.description.childMarkdownRemark.rawMarkdownBody
                  }}
                />
              </div>
            </section>
          )) ||
          (section.style === 'miziwe-biik-product-list' && (
            <section key={section.id} className={`${MiziweBiikStyles.products} grid-wrapper`}>
              {section.content.map((productBlock) => (
                <article className={MiziweBiikStyles.productCard} key={productBlock.id}>
                  <h2 className={MiziweBiikStyles.sectionHeading}>{productBlock.title}</h2>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: productBlock.bodyText.childMarkdownRemark.rawMarkdownBody
                    }}
                  />
                  <Button
                    urlIsRelativePath
                    href={`/${productBlock.relatedContent.type}/${productBlock.relatedContent.slug}`}
                    text="Learn More"
                    className={MiziweBiikStyles.learnMoreButton}
                    buttonStyle="secondary"
                  />
                </article>
              ))}
            </section>
          )) ||
          (section.style === 'miziwe-biik-upcoming-sessions' && (
            <section
              key={section.id}
              className={`${MiziweBiikStyles.upcomingSessions} grid-wrapper`}
            >
              <h2 className={MiziweBiikStyles.sectionHeading}>{section.heading}</h2>
              <ul className={MiziweBiikStyles.upcomingSessionsList}>
                {upcomingSessions.map((session) => (
                  <li
                    key={session.id}
                    className={`${MiziweBiikStyles.sessionCard} ${
                      MiziweBiikStyles[camelCase(session.product.name)]
                    }`}
                  >
                    <h3>{session.product.name}</h3>
                    <p className={MiziweBiikStyles.dates}>
                      {formatIsoDate(session.startDate, 'LLL d, yyyy')} -{' '}
                      {formatIsoDate(session.endDate, 'LLL d, yyyy')}
                    </p>
                    <p className={MiziweBiikStyles.details}>
                      {session.classDays}, {session.timeFrame},{' '}
                      <span>
                        {session.numberOfWeeks} Weeks {session.timeCommitment}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )) || (
            <CommonPageSections
              key={section.id}
              section={section}
              pageStyles={MiziweBiikStyles}
              id={section.customAnchor}
              halfGridWidth={index + 1 !== array.length}
            />
          )
        );
      })}
    </Layout>
  );
};

export default MiziweBiik;

export const query = graphql`
  query {
    pageDetails: contentfulPageGeneric(slug: { eq: "miziwe-biik" }) {
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
        subheading {
          childMarkdownRemark {
            rawMarkdownBody
          }
        }
        introParagraph {
          childMarkdownRemark {
            rawMarkdownBody
          }
        }
        image {
          description
          gatsbyImageData(width: 910, layout: CONSTRAINED)
        }
      }
      sections {
        id
        heading
        style
        description {
          childMarkdownRemark {
            rawMarkdownBody
          }
        }
        image {
          description
          gatsbyImageData(width: 700, layout: CONSTRAINED)
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
                type
                slug
              }
            }
          }
          ... on ContentfulTestimonial {
            id
            type
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
              jobAfterHY
              headshot {
                gatsbyImageData(width: 300, layout: CONSTRAINED)
              }
            }
          }
          ... on ContentfulProduct {
            session {
              id
              startDate
              endDate
              classDays
              timeFrame
              numberOfWeeks
              timeCommitment
              product {
                name
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
          }
        }
      }
    }
  }
`;
