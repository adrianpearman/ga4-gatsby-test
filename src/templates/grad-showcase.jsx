/* eslint-disable react/no-danger */
import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import Layout from '../components/Layout/Layout';
import Head from '../components/Head/Head';
import Button from '../components/Button/Button';

import * as GradShowcaseStyles from './grad-showcase.module.scss';
import AlumniCard from '../components/AlumniCard/AlumniCard';

const GradShowcase = ({ pageContext, data, location }) => {
  const { showcasePageQuery, gradsQuery } = data;
  const { cohortNumber, associatedProductName } = pageContext;

  const { slug, sections } = showcasePageQuery;
  const projectVideoSection = sections.find(
    (section) => section.style === 'grad-showcase-projects-video'
  );

  const allGrads = gradsQuery.edges.map((edge) => edge.node);

  const isEvenCohortNumber = cohortNumber % 2 === 0;

  const metaContent = {
    title: `Cohort ${cohortNumber} Graduate Showcase: ${associatedProductName}`,
    description: `Meet Juno's Latest ${associatedProductName} Graduates from Cohort ${cohortNumber}`
  };

  return (
    <Layout pageSlug={slug}>
      <Head metaContent={metaContent} pagePath={location.pathname} />
      <section
        className={`grid-wrapper ${GradShowcaseStyles.hero} ${
          isEvenCohortNumber ? GradShowcaseStyles.blue : GradShowcaseStyles.green
        }`}
      >
        <h1>Meet Juno&rsquo;s Latest {associatedProductName} Graduates</h1>
        <h2 className={GradShowcaseStyles.subheading}>Cohort {cohortNumber} Graduate Showcase</h2>
        <p className={GradShowcaseStyles.introParagraph}>
          Juno&rsquo;s {associatedProductName} Graduates are technically proficient, passionate
          about their craft, and ready to contribute to your team from day one.
        </p>
      </section>
      {sections.map((section) => {
        if (section.style === 'grad-showcase-projects-video') {
          return (
            <section
              key={section.id}
              className={`grid-wrapper ${GradShowcaseStyles.featuredProjects}`}
            >
              <div
                className={GradShowcaseStyles.videoContainer}
                dangerouslySetInnerHTML={{
                  __html: section.description.childMarkdownRemark.html
                }}
              />
              {section.content ? (
                <>
                  <h2 className={GradShowcaseStyles.projectsListHeading}>
                    {section.content[0].title}
                  </h2>
                  <ul
                    className={GradShowcaseStyles.projectsList}
                    dangerouslySetInnerHTML={{
                      __html: section.content[0].bodyText.childMarkdownRemark.rawMarkdownBody
                    }}
                  />
                </>
              ) : null}
            </section>
          );
        }
        if (section.style === 'grad-showcase-grads-list') {
          return (
            <section
              key={section.id}
              className={`grid-wrapper ${GradShowcaseStyles.grads} ${
                projectVideoSection ? '' : GradShowcaseStyles.noVideo
              }`}
            >
              {projectVideoSection && (
                <h2 className={GradShowcaseStyles.sectionHeading}>Meet Our Graduates</h2>
              )}
              <ul className={GradShowcaseStyles.gradsList}>
                {allGrads.map((grad) => (
                  <AlumniCard alumnus={grad} type="availableForHire" key={grad.id} />
                ))}
              </ul>
            </section>
          );
        }
        if (section.style === 'grad-showcase-career-services-banner') {
          return (
            <section
              key={section.id}
              className={`grid-wrapper ${GradShowcaseStyles.careerServicesBanner}`}
            >
              <div className={GradShowcaseStyles.bannerContent}>
                <h2 className={GradShowcaseStyles.sectionHeading}>{section.content[0].title}</h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: section.content[0].bodyText.childMarkdownRemark.rawMarkdownBody
                  }}
                />
                <Button
                  urlIsRelativePath={section.content[0].button.isUrlRelativePath}
                  href={section.content[0].button.url}
                  text={section.content[0].button.text}
                  openInNewTab={section.content[0].button.openInNewTab}
                  useSnowplowTracking={section.content[0].button.useSnowplowTracking}
                  buttonStyle="primary"
                />
              </div>
              <GatsbyImage
                image={section.content[0].asset.gatsbyImageData}
                className={GradShowcaseStyles.bannerImage}
                alt={section.content[0].asset.description}
              />
            </section>
          );
        }
        return null;
      })}
    </Layout>
  );
};

export default GradShowcase;

export const query = graphql`
  query ($id: String!, $cohortNumber: Int!, $associatedProductName: String!) {
    showcasePageQuery: contentfulPageGeneric(id: { eq: $id }) {
      slug
      sections {
        id
        style
        heading
        description {
          childMarkdownRemark {
            html
          }
        }
        content {
          ... on ContentfulContentBlock {
            title
            bodyText {
              childMarkdownRemark {
                rawMarkdownBody
              }
            }
            button {
              text
              url
              isUrlRelativePath
              openInNewTab
              useSnowplowTracking
            }
            asset {
              description
              gatsbyImageData(width: 500, layout: CONSTRAINED, quality: 100)
            }
          }
        }
      }
    }
    gradsQuery: allContentfulPerson(
      filter: {
        cohortNumber: { eq: $cohortNumber }
        bootcampGraduatedFrom: { eq: $associatedProductName }
      }
      sort: { name: ASC }
    ) {
      edges {
        node {
          id
          name
          headshot {
            gatsbyImageData(width: 250, layout: CONSTRAINED)
          }
          availableForHire
          website
          linkedin
          github
          ctaLink
          ctaText
        }
      }
    }
  }
`;
