import React from 'react';
import { graphql } from 'gatsby';

import Head from '../components/Head/Head';
import Layout from '../components/Layout/Layout';
import notFoundIcon from '../assets/images/notFound/404-missingicon.svg';

import * as NotFoundStyles from './404.module.scss';

const NotFound = ({ data }) => {
  const { pageContent } = data;
  const metaContent = {
    title: '404 - Page Not Found'
  };

  return (
    <Layout>
      <Head metaContent={metaContent} />
      <section>
        <div className={`grid-wrapper ${NotFoundStyles.top}`}>
          <div className={NotFoundStyles.notFoundIcon}>
            <img src={notFoundIcon} alt="" />
          </div>
          <div className={NotFoundStyles.content}>
            <h1 className={NotFoundStyles.surTitle}>{pageContent.heroContent.h1Heading}</h1>
            <p
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: pageContent.heroContent.subheading.childMarkdownRemark.rawMarkdownBody
              }}
            />
          </div>
        </div>

        <div className={`grid-wrapper ${NotFoundStyles.bottom}`}>
          <h2 className={NotFoundStyles.title}>{pageContent.heroContent.mainVisualHeading}</h2>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;

export const query = graphql`
  query {
    pageContent: contentfulPageGeneric(slug: { eq: "page-not-found" }) {
      heroContent {
        h1Heading
        mainVisualHeading
        subheading {
          childMarkdownRemark {
            rawMarkdownBody
          }
        }
      }
    }
  }
`;
