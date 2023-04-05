import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout/Layout';
import Head from '../components/Head/Head';
import Hero from '../components/CompanyComponents/Hero';
import ByTheNumbers from '../components/CompanyComponents/ByTheNumbers';
import Team from '../components/CompanyComponents/Team';
import GetStartedForFree from '../components/GetStartedForFree/GetStartedForFree';
import ImageCarousel from '../components/ImageCarousel/ImageCarousel';

import * as CompanyStyles from './company.module.scss';

const Company = ({ data, location }) => {
  const { pageContext } = data;
  const { slug, metaContent, heroContent, sections } = pageContext;

  const heroAsideContent = sections.find((section) => section.style === 'company-hero-aside');

  return (
    <Layout pageSlug={slug}>
      <Head metaContent={metaContent} pagePath={location.pathname} />
      <Hero heroData={heroContent} asideContent={heroAsideContent} />
      {sections.map(
        (section) =>
          (section.style === 'company-image-carousel' && (
            <section key={section.id} className={`grid-wrapper ${CompanyStyles.carouselSection}`}>
              <ImageCarousel images={section.imageGrid} className={CompanyStyles.carousel} />
              <aside className={CompanyStyles.featuredImageCaption}>
                <h2>{section.heading}</h2>
                <p
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: section.description.childMarkdownRemark.rawMarkdownBody
                  }}
                />
              </aside>
            </section>
          )) ||
          (section.style === 'company-by-the-numbers' && (
            <ByTheNumbers key={section.id} numbersData={section} />
          )) ||
          (section.style === 'company-team' && (
            <Team
              key={section.id}
              teamSectionText={section.description.childMarkdownRemark.rawMarkdownBody}
              teamSectionTitle={section.heading}
              teamMembers={section.content}
            />
          ))
      )}
      <GetStartedForFree backgroundStyle="seaGlass" />
    </Layout>
  );
};

export default Company;

export const companyQuery = graphql`
  query companyQuery {
    pageContext: contentfulPageGeneric(slug: { eq: "company" }) {
      slug
      metaContent {
        title
        description {
          description
        }
        image {
          gatsbyImageData(layout: FULL_WIDTH, quality: 100)
        }
      }
      heroContent {
        h1Heading
        mainVisualHeading
        introParagraph {
          introParagraph
          childMarkdownRemark {
            rawMarkdownBody
            html
          }
        }
        ctaButtons {
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
          description
          childMarkdownRemark {
            html
            rawMarkdownBody
          }
        }
        image {
          gatsbyImageData(width: 400, quality: 80)
        }
        imageGrid {
          id
          description
          gatsbyImageData(width: 1260, quality: 80)
        }
        content {
          ... on ContentfulContentBlock {
            id
            title
            bodyText {
              childMarkdownRemark {
                html
              }
            }
          }
          ... on ContentfulPerson {
            name
            pronouns
            id
            website
            github
            linkedin
            twitter
            jobCurrent
            jobCurrentCompany
            jobCurrentCompanyLink
            instructorBootcamp
            instructorPT
            operations
            staff
            bio {
              bio
            }
            headshot {
              gatsbyImageData(width: 110, layout: CONSTRAINED, quality: 100)
            }
          }
        }
      }
    }
  }
`;
