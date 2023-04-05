/* eslint-disable react/no-danger */
import { graphql } from 'gatsby';
import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import SiteLink from '../components/SiteLink/SiteLink';

import Layout from '../components/Layout/Layout';
import Head from '../components/Head/Head';
import StandardHero from '../components/StandardHero/StandardHero';
import StandardPageSection from '../components/StandardPageSection/StandardPageSection';
import ColumnedListSection from '../components/ColumnedListSection/ColumnedListSection';
import ContentBlockGridSection from '../components/ContentBlockGridSection/ContentBlockGridSection';
import Button from '../components/Button/Button';
import CarouselArrow from '../components/SVG/CarouselArrow';
import CommonPageSections from '../components/CommonPageSections/CommonPageSections';

import usePaginator from '../hooks/usePaginator';

import * as HireAGradStyles from './hire-a-grad.module.scss';

const HireAGrad = ({ data, location }) => {
  const { pageContent } = data;
  const { slug, metaContent, heroContent, sections } = pageContent;

  const successStoriesSection = sections.find(
    (section) => section.style === 'hire-a-grad-success-stories'
  );
  const blogPostPath = (post) => {
    if (post.alternateTemplate === 'Career Posting') {
      return `/careers/${post.slug}/`;
    }
    if (post.alternateTemplate === 'Partner Spotlight') {
      return `/case-studies/${post.slug}/`;
    }
    return `/blog/${post.slug}/`;
  };

  const [successStories, loadMore, hasMoreItems] = usePaginator(
    successStoriesSection?.content || [],
    3,
    3
  );

  return (
    <Layout pageSlug={slug}>
      <Head metaContent={metaContent} pagePath={location.pathname} />
      <StandardHero heroContent={heroContent} background="junoBlueSky" />
      {sections.map((section) => {
        if (section.style === 'hire-a-grad-success-stories') {
          return (
            <section
              key={section.id}
              className={`grid-wrapper ${HireAGradStyles.relevantBlogPosts}`}
            >
              {section.heading && (
                <h3 className={HireAGradStyles.sectionHeading}>{section.heading}</h3>
              )}
              <ul className={HireAGradStyles.blogPreviews}>
                {successStories.map((card) => (
                  <li key={card.id} className={HireAGradStyles.previewCard}>
                    <GatsbyImage
                      image={card.featuredImage.gatsbyImageData}
                      alt={card.featuredImage.description}
                      className={HireAGradStyles.cardImage}
                    />
                    <div className={HireAGradStyles.cardInfo}>
                      <h4 className={HireAGradStyles.blogTitle}>
                        <SiteLink to={blogPostPath(card)}>{card.mainVisualHeading}</SiteLink>
                        {card.alternateTemplate === 'Partner Spotlight' && (
                          <span className={HireAGradStyles.partnerName}>
                            with {card.hiringPartnerName}
                          </span>
                        )}
                      </h4>
                      <SiteLink className={HireAGradStyles.readMore} to={blogPostPath(card)}>
                        Read More{' '}
                        <CarouselArrow direction="next" type="primary" transparentBackground />
                      </SiteLink>
                    </div>
                  </li>
                ))}
              </ul>
              {hasMoreItems && (
                <button className={HireAGradStyles.loadMoreButton} type="button" onClick={loadMore}>
                  Load More
                </button>
              )}
            </section>
          );
        }
        if (section.style === 'columned-list-section') {
          return (
            <ColumnedListSection
              key={section.id}
              section={section}
              className={HireAGradStyles.skillsNeed}
            />
          );
        }
        if (section.style === 'content-block-grid') {
          return <ContentBlockGridSection key={section.id} section={section} includeRip />;
        }
        if (section.style === 'standard-page-section') {
          return (
            <StandardPageSection
              key={section.id}
              section={section}
              className={HireAGradStyles.customPlacements}
            />
          );
        }
        if (section.style === 'hire-a-grad-meet-our-grads') {
          return (
            <section key={section.id} className={`grid-wrapper ${HireAGradStyles.meetGrads}`}>
              <h3>{section.heading}</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: section.description.childMarkdownRemark.rawMarkdownBody
                }}
              />
              <Button
                urlIsRelativePath={section.ctaButton.isUrlRelativePath}
                text={section.ctaButton.text}
                href={section.ctaButton.url}
                openInNewTab={section.ctaButton.openInNewTab}
                useSnowplowTracking={section.ctaButton.useSnowplowTracking}
                buttonStyle="secondarywhite"
                className={HireAGradStyles.sectionButton}
              />
            </section>
          );
        }
        return (
          <CommonPageSections
            key={section.id}
            section={section}
            pageStyles={HireAGradStyles}
            id={section.customAnchor}
            simpleByline
          />
        );
      })}
    </Layout>
  );
};

export default HireAGrad;

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
        mainVisualHeading
        introParagraph {
          childMarkdownRemark {
            html
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
        description {
          childMarkdownRemark {
            rawMarkdownBody
            html
          }
        }
        image {
          description
          gatsbyImageData(width: 700, layout: CONSTRAINED, quality: 100)
        }
        ctaButton {
          text
          url
          isUrlRelativePath
          openInNewTab
          useSnowplowTracking
        }
        content {
          ... on ContentfulTestimonial {
            id
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
          ... on ContentfulLogo {
            id
            company
            companyURL
            file {
              gatsbyImageData(width: 110, layout: CONSTRAINED)
            }
          }
          ... on ContentfulBlogPost {
            id
            slug
            mainVisualHeading
            alternateTemplate
            hiringPartnerName
            featuredImage {
              title
              description
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
          ... on ContentfulContentBlock {
            id
            title
            bodyText {
              childMarkdownRemark {
                rawMarkdownBody
              }
            }
          }
        }
      }
    }
  }
`;
