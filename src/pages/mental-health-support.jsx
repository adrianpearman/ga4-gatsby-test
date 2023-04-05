/* eslint-disable react/no-danger */
import React from 'react';
import { graphql } from 'gatsby';

import Head from '../components/Head/Head';
import Layout from '../components/Layout/Layout';
import StandardHero from '../components/StandardHero/StandardHero';
import StandardPageSection from '../components/StandardPageSection/StandardPageSection';
import AccordionSection from '../components/AccordionSection/AccordionSection';
import CommonPageSections from '../components/CommonPageSections/CommonPageSections';

import sluggify from '../helpers/sluggify';

import * as MentalHealthSupportStyles from './mental-health-support.module.scss';

const MentalHealthSupport = ({ data, location }) => {
  const { slug, metaContent, heroContent, sections } = data.pageContent;

  const sectionBackgrounds = ['seaGlass', 'yellowPeach', 'blueSky'];
  const accordionSectionCycle = ((max) => {
    let count = 0;
    // eslint-disable-next-line no-plusplus
    return () => count++ % max;
  })(3);

  return (
    <Layout pageSlug={slug}>
      <Head metaContent={metaContent} pagePath={location.pathname} />
      <StandardHero heroContent={heroContent} background="junoLightSand" />
      {sections.map((section, index, array) => {
        if (section.style === 'standard-page-section') {
          return (
            <StandardPageSection
              key={section.id}
              section={section}
              className={MentalHealthSupportStyles.primer}
            />
          );
        }
        if (section.style.includes('accordion')) {
          return (
            <AccordionSection
              key={section.id}
              section={section}
              id={section.customAnchor || sluggify(section.heading)}
              backgroundStyle={sectionBackgrounds[accordionSectionCycle()]}
              className={MentalHealthSupportStyles.accordionSection}
            />
          );
        }
        return (
          <CommonPageSections
            key={section.id}
            section={section}
            pageStyles={MentalHealthSupportStyles}
            id={section.customAnchor}
            halfGridWidth={index + 1 !== array.length}
          />
        );
      })}
    </Layout>
  );
};

export default MentalHealthSupport;

export const query = graphql`
  query {
    pageContent: contentfulPageGeneric(slug: { eq: "mental-health-support" }) {
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
        subheading {
          childMarkdownRemark {
            rawMarkdownBody
          }
        }
        tableOfContents {
          id
          heading
          customAnchor
        }
      }
      sections {
        id
        style
        customAnchor
        heading
        description {
          childMarkdownRemark {
            rawMarkdownBody
          }
        }
        image {
          description
          gatsbyImageData(width: 510, layout: CONSTRAINED)
        }
        content {
          ... on ContentfulContentBlock {
            __typename
            id
            title
            bodyText {
              childMarkdownRemark {
                rawMarkdownBody
                html
              }
            }
            button {
              text
              url
              isUrlRelativePath
              openInNewTab
              useSnowplowTracking
            }
          }
          ... on ContentfulStudentSuccessBanner {
            __typename
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
      }
    }
  }
`;
