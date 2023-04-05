/* eslint-disable react/no-danger */
import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import Head from '../components/Head/Head';
import Layout from '../components/Layout/Layout';

import * as CourseRetirementStyles from './course-retirement.module.scss';
import Button from '../components/Button/Button';

const CourseRetirement = ({ data, location }) => {
  const { pageDetails } = data;
  const { slug, metaContent, heroContent } = pageDetails;

  return (
    <Layout pageSlug={slug}>
      <Head metaContent={metaContent} pagePath={location.pathname} />
      <section className={`grid-wrapper ${CourseRetirementStyles.hero}`}>
        <div className={CourseRetirementStyles.contentSection}>
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
          <Button
            urlIsRelativePath={heroContent.ctaButtons[0].isUrlRelativePath}
            href={heroContent.ctaButtons[0].url}
            text={heroContent.ctaButtons[0].text}
            openInNewTab={heroContent.ctaButtons[0].openInNewTab}
            useSnowplowTracking={heroContent.ctaButtons[0].useSnowplowTracking}
            buttonStyle="primary"
            className={CourseRetirementStyles.heroCta}
          />
        </div>
        <GatsbyImage
          image={heroContent.image.gatsbyImageData}
          alt={heroContent.image.description}
          className={CourseRetirementStyles.heroImage}
        />
      </section>
    </Layout>
  );
};

export default CourseRetirement;

export const query = graphql`
  query {
    pageDetails: contentfulPageGeneric(slug: { eq: "course-retirement" }) {
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
        ctaButtons {
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
