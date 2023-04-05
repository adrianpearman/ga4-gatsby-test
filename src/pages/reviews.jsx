/* eslint-disable react/no-danger */
import React from 'react';
import { graphql } from 'gatsby';
import { getSrc } from 'gatsby-plugin-image';
import 'intersection-observer';
import { useInView } from 'react-intersection-observer';

import Layout from '../components/Layout/Layout';
import Head from '../components/Head/Head';
import StandardHero from '../components/StandardHero/StandardHero';
import FiveStars from '../components/SVG/FiveStars';
import RatingCard from '../components/ReviewsComponents/RatingCard';
import ReviewsGrid from '../components/ReviewsComponents/ReviewsGrid';

import * as ReviewsStyles from './reviews.module.scss';

const Reviews = ({ location, data }) => {
  const { pageContent, allReviewsQuery } = data;
  const { slug, metaContent, heroContent, sections } = pageContent;
  const allReviews = allReviewsQuery.edges.map((edge) => edge.node);

  const ratingsSection = sections.find((section) => section.style === 'reviews-ratings') || null;

  const [heroRef, heroInView] = useInView();

  return (
    <Layout pageSlug={slug}>
      <Head metaContent={metaContent} pagePath={location.pathname} />
      <section ref={heroRef} className={`grid-wrapper ${ReviewsStyles.hero}`}>
        {heroContent && (
          <>
            <StandardHero
              heroContent={heroContent}
              background="junoRed"
              className={ReviewsStyles.introWrapper}
              extraWide
              largeHeading
            />
            <div className={ReviewsStyles.stars}>
              <FiveStars
                className={ReviewsStyles.starIcons}
                enableTransitions
                toggleFadeTransitions={heroInView}
                pageLoadDelay
              />
            </div>
          </>
        )}
        {ratingsSection && (
          <>
            <div className={ReviewsStyles.awards}>
              {ratingsSection.content
                .filter((content) => content.__typename === 'ContentfulLogo')
                .map((logo) => (
                  <div key={logo.id} className={ReviewsStyles.awardContainer}>
                    <a href={logo.companyURL} target="_blank" rel="noopener noreferrer">
                      <img src={getSrc(logo.file)} alt={logo.file.description} />
                    </a>
                  </div>
                ))}
            </div>
            <div className={ReviewsStyles.ratingsContainer}>
              {ratingsSection.content
                .filter((content) => content.__typename === 'ContentfulRatingCard')
                .map((rating) => (
                  <RatingCard key={rating.id} rating={rating} />
                ))}
            </div>
          </>
        )}
      </section>
      {allReviews.length ? <ReviewsGrid reviews={allReviews} /> : null}
    </Layout>
  );
};

export default Reviews;

export const query = graphql`
  query {
    pageContent: contentfulPageGeneric(slug: { eq: "reviews" }) {
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
        content {
          ... on ContentfulRatingCard {
            __typename
            id
            siteUrl
            submitAReviewUrl
            numberOfReviews
            averageRating
            logo {
              description
              file {
                url
              }
            }
          }
          ... on ContentfulLogo {
            __typename
            id
            companyURL
            file {
              description
              gatsbyImageData
            }
          }
        }
      }
    }
    allReviewsQuery: allContentfulTestimonial(
      filter: { showOnReviewsPage: { eq: true } }
      sort: { createdAt: DESC }
    ) {
      edges {
        node {
          id
          createdAt
          courseTaken
          quotation {
            childMarkdownRemark {
              rawMarkdownBody
            }
          }
          featuredReview
          reviewLinkUrl
          reviewLinkSource
          person {
            name
            jobCurrent
            jobCurrentCompany
            jobCurrentCompanyLink
            headshot {
              gatsbyImageData(width: 600, layout: CONSTRAINED, quality: 100)
            }
          }
        }
      }
    }
  }
`;
