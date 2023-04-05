/* eslint-disable react/no-danger */
import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import Head from '../components/Head/Head';
import Layout from '../components/Layout/Layout';
import Button from '../components/Button/Button';
import AccordionSection from '../components/AccordionSection/AccordionSection';
import CommonPageSections from '../components/CommonPageSections/CommonPageSections';

import internalScrollToAnchor from '../helpers/internalScrollToAnchor';

import * as ScholarshipStyles from './scholarship.module.scss';

const Scholarship = ({ data, location }) => {
  const { pageDetails } = data;
  const { slug, metaContent, heroContent, sections } = pageDetails;

  const removeScholarshipFromId = (id) => {
    return id.replace(/scholarship-/g, '');
  };

  return (
    <Layout pageSlug={slug}>
      <Head metaContent={metaContent} pagePath={location.pathname} />
      <section
        className={`grid-wrapper ${ScholarshipStyles.scholarships} ${ScholarshipStyles.hero}`}
      >
        <div className={ScholarshipStyles.heroInfo}>
          <h1>{heroContent.h1Heading}</h1>
          <p
            dangerouslySetInnerHTML={{
              __html: heroContent.introParagraph.childMarkdownRemark.rawMarkdownBody
            }}
          />
        </div>
        <ul className={ScholarshipStyles.heroLinks}>
          <li>Jump to funding option</li>
          {sections
            .filter((section) => !section.style.includes('student-success-banner'))
            .map((section) => (
              <li key={section.id}>
                <a
                  href={`#${removeScholarshipFromId(section.style)}`}
                  onClick={(event) => {
                    internalScrollToAnchor(event, removeScholarshipFromId(section.style));
                  }}
                >
                  {section.heading}
                </a>
              </li>
            ))}
        </ul>
        <GatsbyImage
          image={heroContent.image.gatsbyImageData}
          className={ScholarshipStyles.heroImage}
          alt={heroContent.image.description}
        />
      </section>

      {sections.map((section, index, array) => {
        const sectionId = removeScholarshipFromId(section.style);
        if (section.style === 'scholarship-isa-info-section') {
          const [isaSidebar, packageDownloadSidebar] = section.content;
          return (
            <section
              key={section.id}
              id={sectionId}
              className={`grid-wrapper ${ScholarshipStyles.scholarships} ${ScholarshipStyles.isa}`}
            >
              <div className={ScholarshipStyles.isaIntro}>
                <h2>{section.heading}</h2>
                <div
                  className={ScholarshipStyles.sectionDescription}
                  dangerouslySetInnerHTML={{
                    __html: section.description.childMarkdownRemark.html
                  }}
                />
                <Button
                  urlIsRelativePath={section.ctaButton.isUrlRelativePath}
                  href={section.ctaButton.url}
                  text={section.ctaButton.text}
                  openInNewTab={section.ctaButton.openInNewTab}
                  useSnowplowTracking={section.ctaButton.useSnowplowTracking}
                  buttonStyle="secondary"
                />
              </div>
              <aside
                className={`${ScholarshipStyles.isaRight} ${ScholarshipStyles.sidebar} ${ScholarshipStyles.sidebarInfoContainer}`}
              >
                <h3 className={ScholarshipStyles.sidebarTitle}>{isaSidebar.title}</h3>
                <ul
                  className={ScholarshipStyles.sidebarLinks}
                  dangerouslySetInnerHTML={{
                    __html: isaSidebar.bodyText.childMarkdownRemark.html
                  }}
                />
              </aside>
              <aside
                className={`${ScholarshipStyles.byTheNumbers} ${ScholarshipStyles.sidebar} ${ScholarshipStyles.sidebarInfoContainer}`}
              >
                <h3 className={ScholarshipStyles.sidebarTitle}>{packageDownloadSidebar.title}</h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: packageDownloadSidebar.bodyText.childMarkdownRemark.rawMarkdownBody
                  }}
                />
                <Button
                  urlIsRelativePath={packageDownloadSidebar.button.isUrlRelativePath}
                  href={packageDownloadSidebar.button.url}
                  text={packageDownloadSidebar.button.text}
                  openInNewTab={packageDownloadSidebar.button.openInNewTab}
                  useSnowplowTracking={packageDownloadSidebar.button.useSnowplowTracking}
                  buttonStyle="secondary"
                />
                <div className={ScholarshipStyles.imageStackContainer}>
                  <GatsbyImage
                    image={packageDownloadSidebar.asset.gatsbyImageData}
                    alt={packageDownloadSidebar.asset.description}
                  />
                </div>
              </aside>
            </section>
          );
        }
        if (section.style === 'scholarship-transforming-tech') {
          const [sidebar] = section.content;
          return (
            <section
              key={section.id}
              id={sectionId}
              className={`grid-wrapper ${ScholarshipStyles.scholarships} ${ScholarshipStyles.needScholarships}`}
            >
              <div className={ScholarshipStyles.needScholarshipsLeft}>
                <h2>{section.heading}</h2>
                <div
                  className={ScholarshipStyles.sectionDescription}
                  dangerouslySetInnerHTML={{
                    __html: section.description.childMarkdownRemark.html
                  }}
                />
                <Button
                  urlIsRelativePath={section.ctaButton.isUrlRelativePath}
                  href={section.ctaButton.url}
                  text={section.ctaButton.text}
                  openInNewTab={section.ctaButton.openInNewTab}
                  useSnowplowTracking={section.ctaButton.useSnowplowTracking}
                  buttonStyle="secondary"
                />
              </div>
              <aside
                className={`${ScholarshipStyles.needScholarshipsRight} ${ScholarshipStyles.sidebar}`}
              >
                <GatsbyImage
                  image={sidebar.asset.gatsbyImageData}
                  className={ScholarshipStyles.sidebarHeaderImage}
                  alt={sidebar.asset.description}
                />
                <div className={ScholarshipStyles.sidebarInfoContainer}>
                  <h3 className={ScholarshipStyles.sidebarTitle}>{sidebar.title}</h3>
                  <ul
                    className={ScholarshipStyles.sidebarLinks}
                    dangerouslySetInnerHTML={{
                      __html: sidebar.bodyText.childMarkdownRemark.html
                    }}
                  />
                </div>
              </aside>
            </section>
          );
        }
        if (section.style === 'scholarship-other-options') {
          const [sidebar] = section.content;
          return (
            <section
              key={section.id}
              id={sectionId}
              className={`grid-wrapper ${ScholarshipStyles.scholarships} ${ScholarshipStyles.otherScholarships}`}
            >
              <div className={ScholarshipStyles.otherScholarshipsLeft}>
                <h2>{section.heading}</h2>
                <div
                  className={ScholarshipStyles.sectionDescription}
                  dangerouslySetInnerHTML={{
                    __html: section.description.childMarkdownRemark.html
                  }}
                />
              </div>
              <aside
                className={`${ScholarshipStyles.otherScholarshipsRight} ${ScholarshipStyles.sidebar}`}
              >
                <GatsbyImage
                  image={sidebar.asset.gatsbyImageData}
                  alt={sidebar.asset.description}
                  className={ScholarshipStyles.sidebarHeaderImage}
                />
                <div className={ScholarshipStyles.sidebarInfoContainer}>
                  <h3 className={ScholarshipStyles.sidebarTitle}>{sidebar.title}</h3>
                  <ul
                    className={ScholarshipStyles.sidebarLinks}
                    dangerouslySetInnerHTML={{
                      __html: sidebar.bodyText.childMarkdownRemark.html
                    }}
                  />
                </div>
              </aside>
            </section>
          );
        }
        if (section.style === 'scholarship-financeit') {
          const [sidebar] = section.content;
          return (
            <section
              key={section.id}
              id={sectionId}
              className={`grid-wrapper ${ScholarshipStyles.scholarships} ${ScholarshipStyles.grant}`}
            >
              <div className={ScholarshipStyles.grantLeft}>
                <h2>{section.heading}</h2>
                <div
                  className={ScholarshipStyles.sectionDescription}
                  dangerouslySetInnerHTML={{
                    __html: section.description.childMarkdownRemark.html
                  }}
                />
              </div>
              <aside
                className={`${ScholarshipStyles.grantRight} ${ScholarshipStyles.sidebar} ${ScholarshipStyles.sidebarInfoContainer}`}
              >
                <h3>{sidebar.title}</h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: sidebar.bodyText.childMarkdownRemark.rawMarkdownBody
                  }}
                />
                <Button
                  urlIsRelativePath={sidebar.button.isUrlRelativePath}
                  href={sidebar.button.url}
                  text={sidebar.button.text}
                  openInNewTab={sidebar.button.openInNewTab}
                  useSnowplowTracking={sidebar.button.useSnowplowTracking}
                  buttonStyle="secondary"
                />
                <div className={ScholarshipStyles.imageStackContainer}>
                  <GatsbyImage
                    image={sidebar.asset.gatsbyImageData}
                    alt={sidebar.asset.description}
                  />
                </div>
              </aside>
            </section>
          );
        }
        if (section.style === 'accordion-section') {
          return (
            <AccordionSection
              key={section.id}
              section={section}
              id={sectionId}
              className={ScholarshipStyles.faqs}
              backgroundStyle="white"
              faq
            />
          );
        }
        return (
          <CommonPageSections
            key={section.id}
            section={section}
            pageStyles={ScholarshipStyles}
            id={section.customAnchor}
            halfGridWidth={index + 1 !== array.length}
          />
        );
      })}
    </Layout>
  );
};

export default Scholarship;

export const query = graphql`
  query {
    pageDetails: contentfulPageGeneric(slug: { eq: "scholarship" }) {
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
        introParagraph {
          childMarkdownRemark {
            rawMarkdownBody
          }
        }
        image {
          description
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
      sections {
        id
        style
        heading
        customAnchor
        description {
          childMarkdownRemark {
            rawMarkdownBody
            html
          }
        }
        ctaButton {
          text
          url
          isUrlRelativePath
          openInNewTab
          useSnowplowTracking
        }
        content {
          ... on ContentfulContentBlock {
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
            asset {
              description
              gatsbyImageData(width: 700, layout: CONSTRAINED)
            }
          }
          ... on ContentfulFaqCategory {
            faq {
              id
              question
              answer {
                childMarkdownRemark {
                  html
                }
              }
            }
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
      }
    }
  }
`;
