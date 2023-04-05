import React from 'react';
import { graphql } from 'gatsby';

import sluggify from '../helpers/sluggify';

import Layout from '../components/Layout/Layout';
import Head from '../components/Head/Head';
import StandardHero from '../components/StandardHero/StandardHero';
import ProductCard from '../components/CoursesComponents/ProductCard';
import CommonPageSections from '../components/CommonPageSections/CommonPageSections';

import * as OurCoursesStyles from './our-courses.module.scss';

const OurCourses = ({ data, location }) => {
  const { pageContent } = data;
  const { metaContent } = pageContent;

  const productClassNames = ['sand', 'evergreen', 'coral'];
  const orderedProductCardCycle = ((max) => {
    let count = 0;
    // eslint-disable-next-line no-plusplus
    return () => count++ % max;
  })(3);

  return (
    <Layout pageSlug={pageContent.slug}>
      <Head metaContent={metaContent} pagePath={location.pathname} />

      <StandardHero
        heroContent={pageContent.heroContent}
        background="whiteNoRip"
        largeHeading
        extraWide
        className={OurCoursesStyles.hero}
      />
      {pageContent.sections.map(
        (section, index, array) =>
          (section.style === 'our-courses-product-list' && (
            <section
              key={section.id}
              id={sluggify(section.heading)}
              className={`grid-wrapper ${OurCoursesStyles.courses}`}
            >
              <div className={OurCoursesStyles.textWrapper}>
                <h2 className={OurCoursesStyles.sectionHeading}>{section.heading}</h2>
                <p
                  className={OurCoursesStyles.sectionDescription}
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: section.description.childMarkdownRemark.rawMarkdownBody
                  }}
                />
              </div>
              <ul className={OurCoursesStyles.productCardList}>
                {section.content.map((product) => (
                  <li className={OurCoursesStyles.productCard} key={product.id}>
                    <ProductCard
                      product={product}
                      type={productClassNames[orderedProductCardCycle()]}
                    />
                  </li>
                ))}
              </ul>
            </section>
          )) || (
            <CommonPageSections
              key={section.id}
              section={section}
              pageStyles={OurCoursesStyles}
              id={section.customAnchor}
              halfGridWidth={index + 1 !== array.length}
            />
          )
      )}
    </Layout>
  );
};

export default OurCourses;

export const query = graphql`
  query {
    pageContent: contentfulPageGeneric(slug: { eq: "our-courses" }) {
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
        heading
        customAnchor
        description {
          childMarkdownRemark {
            rawMarkdownBody
          }
        }
        style
        content {
          ... on ContentfulProduct {
            id
            name
            description {
              childMarkdownRemark {
                rawMarkdownBody
              }
            }
            slug
            type
            skillLevel
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
            successConsultants {
              id
              name
              headshot {
                gatsbyImageData(width: 250, layout: CONSTRAINED, quality: 100)
              }
            }
          }
        }
        ctaButton {
          url
          text
          isUrlRelativePath
          openInNewTab
          useSnowplowTracking
        }
      }
    }
  }
`;
