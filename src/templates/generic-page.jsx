import React from 'react';
import { graphql } from 'gatsby';

import Head from '../components/Head/Head';
import Layout from '../components/Layout/Layout';
import StandardHero from '../components/StandardHero/StandardHero';
import StandardPageSection from '../components/StandardPageSection/StandardPageSection';
import AccordionSection from '../components/AccordionSection/AccordionSection';
import PhotoDivider from '../components/PhotoDivider/PhotoDivider';
import ColumnedListSection from '../components/ColumnedListSection/ColumnedListSection';
import ContentBlockGridSection from '../components/ContentBlockGridSection/ContentBlockGridSection';
import ListWithImagesSection from '../components/ListWithImagesSection/ListWithImagesSection';
import CommonPageSections from '../components/CommonPageSections/CommonPageSections';

import sluggify from '../helpers/sluggify';

import * as GenericPageStyles from './generic-page.module.scss';

const GenericPage = ({ data, location, pageContext }) => {
  const { slug, metaContent, heroContent, sections } = data.pageContent;
  const { styleguidePage, offset } = pageContext;

  const sectionBackgrounds = [
    ['junoBlueSky', 'junoSand', 'junoSeaGlass', 'junoLightSand'],
    ['junoSand', 'junoSeaGlass', 'junoLightSand', 'junoBlueSky'],
    ['junoSeaGlass', 'junoLightSand', 'junoBlueSky', 'junoSand']
  ];
  const sectionBackgroundCycle = ((max) => {
    let count = 0;
    // eslint-disable-next-line no-plusplus
    return () => count++ % max;
  })(4);

  const accordionBackgrounds = ['seaGlass', 'yellowPeach', 'blueSky'];
  const accordionSectionCycle = ((max) => {
    let count = 0;
    // eslint-disable-next-line no-plusplus
    return () => count++ % max;
  })(3);
  const allAccordionSections = sections.filter((section) => section.style.includes('accordion'));

  return (
    <Layout pageSlug={slug}>
      <Head metaContent={metaContent} pagePath={location.pathname}>
        {styleguidePage && <meta name="robots" content="noindex" />}
      </Head>
      {heroContent && (
        <StandardHero
          heroContent={heroContent}
          className={GenericPageStyles.hero}
          background={sectionBackgrounds[offset][sectionBackgroundCycle()]}
        />
      )}
      {sections.map((section, index, array) => {
        if (section.style === 'photo-divider') {
          return <PhotoDivider key={section.id} images={section.imageGrid} />;
        }

        if (section.style === 'standard-page-section') {
          return (
            <StandardPageSection
              key={section.id}
              section={section}
              id={section.customAnchor || sluggify(section.heading)}
              className={`${
                section.image && !section.content
                  ? GenericPageStyles[`${sectionBackgrounds[offset][sectionBackgroundCycle()]}`]
                  : ''
              } ${
                section.image &&
                section.content &&
                section.content[0].__typename === 'ContentfulContentBlock'
                  ? GenericPageStyles.sectionImageAside
                  : ''
              }`}
            />
          );
        }

        if (section.style.includes('accordion')) {
          const accordionPlacement = allAccordionSections.findIndex(
            (accSection) => accSection.id === section.id
          );
          return (
            <AccordionSection
              key={section.id}
              section={section}
              id={section.customAnchor || sluggify(section.heading)}
              className={accordionPlacement === 0 ? '' : GenericPageStyles.followingAccordions}
              backgroundStyle={accordionBackgrounds[accordionSectionCycle()]}
            />
          );
        }

        if (section.style === 'columned-list-section') {
          return (
            <ColumnedListSection
              key={section.id}
              section={section}
              id={section.customAnchor || sluggify(section.heading)}
              className={
                GenericPageStyles[`${sectionBackgrounds[offset][sectionBackgroundCycle()]}`]
              }
            />
          );
        }

        if (section.style === 'content-block-grid') {
          return (
            <ContentBlockGridSection
              key={section.id}
              section={section}
              id={section.customAnchor || sluggify(section.heading)}
              className={
                GenericPageStyles[`${sectionBackgrounds[offset][sectionBackgroundCycle()]}`]
              }
            />
          );
        }

        if (section.style === 'list-with-image-grid') {
          return (
            <ListWithImagesSection
              key={section.id}
              section={section}
              id={section.customAnchor || sluggify(section.heading)}
            />
          );
        }

        return (
          <CommonPageSections
            key={section.id}
            section={section}
            pageStyles={GenericPageStyles}
            id={section.customAnchor || null}
            halfGridWidth={index + 1 !== array.length}
            genericPageClassName={
              section.style === 'carousel-content-blocks'
                ? GenericPageStyles[`${sectionBackgrounds[offset][sectionBackgroundCycle()]}`]
                : null
            }
          />
        );
      })}
    </Layout>
  );
};

export default GenericPage;

export const query = graphql`
  query ($id: String!) {
    pageContent: contentfulPageGeneric(id: { eq: $id }) {
      slug
      templateName
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
        introParagraph {
          childMarkdownRemark {
            html
          }
        }
        image {
          description
          gatsbyImageData(layout: FULL_WIDTH)
        }
        ctaButtons {
          id
          text
          url
          isUrlRelativePath
          openInNewTab
          useSnowplowTracking
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
            html
          }
        }
        image {
          description
          gatsbyImageData(width: 520, layout: CONSTRAINED)
        }
        imageGrid {
          id
          description
          gatsbyImageData(width: 700, layout: CONSTRAINED)
        }
        ctaButton {
          text
          url
          isUrlRelativePath
          openInNewTab
          useSnowplowTracking
        }
        content {
          ... on ContentfulLogo {
            __typename
            id
            company
            companyURL
            file {
              gatsbyImageData(width: 130, layout: CONSTRAINED)
            }
          }
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
            asset {
              description
              gatsbyImageData(width: 500, layout: CONSTRAINED)
            }
            button {
              text
              url
              isUrlRelativePath
              openInNewTab
              useSnowplowTracking
            }
          }
          ... on ContentfulTestimonial {
            __typename
            id
            type
            courseTaken
            quotation {
              childMarkdownRemark {
                rawMarkdownBody
              }
            }
            person {
              name
              headshot {
                gatsbyImageData(width: 300, layout: CONSTRAINED)
              }
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
