/* eslint-disable react/no-danger */
import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout/Layout';
import Head from '../components/Head/Head';

import * as LegaleseStyles from './legalese.module.scss';

const Legalese = ({ data, location }) => {
  const { pageContent } = data;
  const { slug, metaContent, heroContent, sections } = pageContent;

  return (
    <Layout pageSlug={slug}>
      <Head metaContent={metaContent} pagePath={location.pathname} />
      <section className={`${LegaleseStyles.container} ${LegaleseStyles.hero} grid-wrapper`}>
        <div className={LegaleseStyles.titleContainer}>
          <p className={LegaleseStyles.smallTitle}>{heroContent.h1Heading}</p>
          <h1 className={LegaleseStyles.title}>{heroContent.mainVisualHeading}</h1>
        </div>
        <div className={LegaleseStyles.contactBox}>
          <p
            dangerouslySetInnerHTML={{
              __html: heroContent.introParagraph.childMarkdownRemark.rawMarkdownBody
            }}
          />
        </div>
      </section>

      <section
        className={`${LegaleseStyles.container} ${LegaleseStyles.contentContainer} grid-wrapper`}
      >
        {sections.map((section) => (
          <div
            key={section.id}
            className={LegaleseStyles.content}
            dangerouslySetInnerHTML={{
              __html: section.description.childMarkdownRemark.html
            }}
          />
        ))}
      </section>
    </Layout>
  );
};

export default Legalese;

export const query = graphql`
  query($id: String!) {
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
            rawMarkdownBody
          }
        }
      }
      sections {
        id
        heading
        description {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`;
