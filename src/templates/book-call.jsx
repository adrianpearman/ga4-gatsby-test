import React from 'react';
import { graphql } from 'gatsby';
import { InlineWidget } from 'react-calendly';

import Layout from '../components/Layout/Layout';
import Head from '../components/Head/Head';
import CircleHeadshot from '../components/CircleHeadshot/CircleHeadshot';

import * as BookCallStyles from './book-call.module.scss';

const widgetPageSettings = {
  hideEventTypeDetails: true,
  primaryColor: 'ea593e',
  textColor: '221c38'
};

const BookCall = ({ data, location }) => {
  const { slug, metaContent, heroContent } = data.pageContent;

  return (
    <Layout pageSlug={slug}>
      <Head metaContent={metaContent} pagePath={location.pathname} />
      <section className={`grid-wrapper ${BookCallStyles.hero}`}>
        <article className={BookCallStyles.textContainer}>
          <div className={BookCallStyles.headshotOverlap}>
            {heroContent.imageGrid.map((headshot) => (
              <CircleHeadshot
                key={headshot.id}
                imageData={headshot.gatsbyImageData}
                altText={headshot.description}
                size="70px"
                className={BookCallStyles.headshot}
              />
            ))}
          </div>
          <h1>{heroContent.h1Heading}</h1>
          <h2>{heroContent.subheading.subheading}</h2>
          <div
            className={BookCallStyles.introParagraph}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: heroContent.introParagraph.childMarkdownRemark.html
            }}
          />
        </article>
        <div className={BookCallStyles.calendlyContainer}>
          <InlineWidget
            url="https://calendly.com/juno-college/website-book-phone-call-embed"
            pageSettings={widgetPageSettings}
          />
        </div>
      </section>
    </Layout>
  );
};

export default BookCall;

export const bookCallQuery = graphql`
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
        subheading {
          subheading
        }
        introParagraph {
          childMarkdownRemark {
            html
          }
        }
        imageGrid {
          id
          description
          gatsbyImageData(width: 100, layout: CONSTRAINED)
        }
      }
    }
  }
`;
