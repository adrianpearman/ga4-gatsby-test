/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { scroller } from 'react-scroll';

import Layout from '../components/Layout/Layout';
import Head from '../components/Head/Head';
import SideNav from '../components/SideNav/SideNav';
import LegacyFaqCard from '../components/FaqCard/LegacyFaqCard';

import * as faqStyles from './faq.module.scss';
import sluggify from '../helpers/sluggify';

const Faq = ({ data, location }) => {
  const { slug, metaContent, heroContent, sections } = data.contentfulPageGeneric;

  const allFaqCategories = sections.find((section) => section.style === 'faq-categories').content;
  const categoryNames = allFaqCategories.map((faqCategory) => {
    return faqCategory.faqCategoryName;
  });
  const linkTargets = allFaqCategories.map((faqCategory) => {
    return sluggify(faqCategory.faqCategoryName);
  });

  const handleSideLink = (e, target) => {
    e.preventDefault();
    scroller.scrollTo(target, {
      duration: 800,
      delay: 0,
      smooth: true
    });
  };

  const [fixedNavHidden, setFixedNavHidden] = useState(true);

  const handleLogoSideNavIntersection = (inView) => {
    if (inView) {
      setFixedNavHidden(true);
    } else {
      setFixedNavHidden(false);
    }
  };

  return (
    <Layout hideFixedNav={fixedNavHidden} pageSlug={slug}>
      <Head metaContent={metaContent} pagePath={location.pathname} />
      <div className={faqStyles.mainTopBanner}>
        <div className="grid-wrapper">
          <div className={faqStyles.strapline}>
            <p>{heroContent.h1Heading}</p>
          </div>
          <h1 className={`title-faq ${faqStyles.title}`}>{heroContent.mainVisualHeading}</h1>
          <div
            className={faqStyles.topContact}
            dangerouslySetInnerHTML={{
              __html: heroContent.introParagraph.childMarkdownRemark.html
            }}
          />
        </div>
      </div>

      {sections.map(
        (section) =>
          (section.style === 'faq-categories' && (
            <div className="grid-wrapper" key={section.id}>
              <SideNav
                linkText={categoryNames}
                linkTargets={linkTargets}
                onInViewChange={handleLogoSideNavIntersection}
                onLinkClick={handleSideLink}
              />

              {section.content.map((faqCategory) => {
                const faqSlug = sluggify(faqCategory.faqCategoryName);
                return (
                  <section
                    key={`section-${faqSlug}`}
                    className={`${faqStyles.categorySection} grid-wrapper`}
                    id={faqSlug}
                  >
                    <h2
                      className={faqStyles.categoryName}
                      data-category={faqCategory.faqCategoryName}
                    >
                      {faqCategory.faqCategoryName} FAQs
                    </h2>
                    {faqCategory.faq.map((question) => {
                      return (
                        <LegacyFaqCard data={question} key={`question-${question.contentful_id}`} />
                      );
                    })}
                  </section>
                );
              })}
            </div>
          )) ||
          (section.style === 'faq-banner' && (
            <div className="grid-wrapper" key={section.id}>
              <div
                className={faqStyles.bottomContact}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: section.description.childMarkdownRemark.html
                }}
              />
            </div>
          ))
      )}
    </Layout>
  );
};

export default Faq;

export const data = graphql`
  query {
    contentfulPageGeneric(slug: { eq: "faq" }) {
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
        style
        description {
          childMarkdownRemark {
            rawMarkdownBody
            html
          }
        }
        content {
          ... on ContentfulFaqCategory {
            faqCategoryName
            faq {
              contentful_id
              question
              answer {
                childMarkdownRemark {
                  html
                }
              }
            }
          }
        }
      }
    }
  }
`;
