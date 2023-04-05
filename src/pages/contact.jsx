/* eslint-disable react/no-danger */
import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import SiteLink from '../components/SiteLink/SiteLink';

import Head from '../components/Head/Head';
import Layout from '../components/Layout/Layout';
import Button from '../components/Button/Button';

import * as ContactStyles from './contact.module.scss';

const Contact = ({ data, location }) => {
  const { pageContent } = data;
  const { slug, metaContent, heroContent, sections } = pageContent;

  const allContactLinks = sections.find((section) => section.style === 'contact-link-list');
  const generalLinks = allContactLinks?.content.filter((link) => !link.asset);
  const socialMediaLinks = allContactLinks?.content.filter((link) => link.asset);

  const campuses = sections.find((section) => section.style === 'contact-campuses');

  return (
    <Layout pageSlug={slug}>
      <Head metaContent={metaContent} pagePath={location.pathname} />
      <section className="grid-wrapper">
        <h1 className={ContactStyles.heroTitle}>{heroContent.h1Heading}</h1>
        <div className={ContactStyles.infoBlock}>
          <p
            className={ContactStyles.description}
            dangerouslySetInnerHTML={{
              __html: heroContent.introParagraph.childMarkdownRemark.rawMarkdownBody
            }}
          />
          {allContactLinks && (
            <>
              <ul className={ContactStyles.contact}>
                {generalLinks.map((link) => (
                  <li key={link.id}>
                    <h2>{link.title}</h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: link.bodyText.childMarkdownRemark.rawMarkdownBody
                      }}
                    />
                  </li>
                ))}
              </ul>
              <div className={ContactStyles.social}>
                <h2>Connect with @junocollege</h2>
                <ul>
                  {socialMediaLinks.map((link) => {
                    return (
                      <li key={link.id}>
                        <img src={link.asset.file.url} alt={`${link.title} Icon`} />
                        <a href={link.bodyText.bodyText} target="_blank" rel="noopener noreferrer">
                          {link.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
          )}
        </div>
        {campuses && (
          <div className={ContactStyles.heroLocationBlock}>
            <a
              href="https://goo.gl/maps/pBgvnq96dks46hC27"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GatsbyImage
                image={campuses.image.gatsbyImageData}
                alt={campuses.image.description || 'Map of Juno College from Google Maps.'}
              />
            </a>
            <div className={ContactStyles.locationInfo}>
              <h3>{campuses.heading}</h3>
              <address
                dangerouslySetInnerHTML={{
                  __html: campuses.description.childMarkdownRemark.html
                }}
              />
              <Button
                urlIsRelativePath={campuses.ctaButton.isUrlRelativePath}
                href={campuses.ctaButton.url}
                text={campuses.ctaButton.text}
                openInNewTab={campuses.ctaButton.openInNewTab}
                useSnowplowTracking={campuses.ctaButton.useSnowplowTracking}
                buttonStyle="secondarywhite"
              />
            </div>
          </div>
        )}
      </section>

      {campuses && (
        <section className={`${ContactStyles.campuses} grid-wrapper`}>
          <div className={ContactStyles.titleBlock}>
            <h2 className={ContactStyles.title}>Our Locations</h2>
            <SiteLink className={ContactStyles.campusesAll} to="/campuses/">
              View our campuses
            </SiteLink>
          </div>

          <div className={ContactStyles.locations}>
            {campuses.content.map((campus) => {
              return (
                <div className={ContactStyles.locationBlock} key={campus.id}>
                  <a href={campus.mapLink} target="_blank" rel="noopener noreferrer">
                    <GatsbyImage
                      image={campus.campusImage.gatsbyImageData}
                      alt={`${campus.streetAddress}, ${campus.campusCaption}`}
                    />
                  </a>
                  <div className={ContactStyles.locationInfo}>
                    <h3>{campus.campusName}</h3>
                    <p>{campus.streetAddress}</p>
                    <p>{`${campus.streetAddressSecondary} – Buzz #${campus.buzzNumber}`}</p>
                    <p>{`${campus.city}, ${campus.campusProvince} ${campus.postalCode}`}</p>
                    <a
                      className="btn"
                      href={campus.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {campus.mapLinkText}
                    </a>
                    <SiteLink
                      className={`${ContactStyles.learnMoreLink} link-arrow`}
                      to={campus.learnMoreLink}
                    >
                      {campus.learnMoreText}
                    </SiteLink>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Contact;

export const queryContactUs = graphql`
  query contactUs {
    pageContent: contentfulPageGeneric(slug: { eq: "contact" }) {
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
          childMarkdownRemark {
            rawMarkdownBody
          }
        }
      }
      sections {
        id
        style
        heading
        description {
          childMarkdownRemark {
            rawMarkdownBody
            html
          }
        }
        content {
          ... on ContentfulContentBlock {
            id
            title
            bodyText {
              bodyText
              childMarkdownRemark {
                rawMarkdownBody
              }
            }
            asset {
              file {
                url
              }
            }
          }
          ... on ContentfulCampus {
            id
            bulletPoints {
              bulletPoints
              childMarkdownRemark {
                rawMarkdownBody
              }
            }
            campusOverview {
              campusOverview
              childMarkdownRemark {
                rawMarkdownBody
              }
            }
            featuredImages {
              description
              gatsbyImageData(layout: FULL_WIDTH)
            }
            mapImage {
              description
              gatsbyImageData
            }
            buzzNumber
            campusImage {
              gatsbyImageData(layout: FULL_WIDTH)
            }
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
            boldColour
            softColour
          }
        }
        image {
          description
          gatsbyImageData(layout: FULL_WIDTH)
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
