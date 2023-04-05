/* eslint-disable react/no-danger */
import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import SiteLink from '../components/SiteLink/SiteLink';

import Layout from '../components/Layout/Layout';
import Head from '../components/Head/Head';
import Button from '../components/Button/Button';
import ValueCard from '../components/CareersComponents/ValueCard';
import Jobs from '../components/CareersComponents/Jobs';

import internalScrollToAnchor from '../helpers/internalScrollToAnchor';

import twitter from '../assets/images/icons/social-1twitter-30x44-white.svg';
import linkedin from '../assets/images/icons/social-2linkedin-30x44-white.svg';
import facebook from '../assets/images/icons/social-3facebook-30x44-white.svg';
import instagram from '../assets/images/icons/social-4instagram-30x44-white.svg';
import github from '../assets/images/icons/social-5github-30x44-white.svg';

import * as CareersStyles from './careers.module.scss';

const Careers = ({ location, data }) => {
  const { pageContent, availableJobsQuery } = data;
  const { slug, metaContent, heroContent, sections } = pageContent;
  const availableJobs = availableJobsQuery.edges.map((edge) => edge.node);

  const callOutCycle = ((max) => {
    let count = 0;
    // eslint-disable-next-line no-plusplus
    return () => count++ % max;
  })(2);

  const socialLinks = [
    {
      text: 'Twitter',
      url: 'https://go.junocollege.com/website-twitter',
      icon: twitter
    },
    {
      text: 'LinkedIn',
      url: 'https://go.junocollege.com/website-linked',
      icon: linkedin
    },
    {
      text: 'Facebook',
      url: 'https://go.junocollege.com/website-facebook',
      icon: facebook
    },
    {
      text: 'Instagram',
      url: 'https://go.junocollege.com/website-instagram',
      icon: instagram
    },
    {
      text: 'GitHub',
      url: 'https://github.com/HackerYou',
      icon: github
    }
  ];

  return (
    <Layout showFixedApplyNowButton={false} pageSlug={slug}>
      <Head metaContent={metaContent} pagePath={location.pathname} />
      <section className={`grid-wrapper ${CareersStyles.hero}`}>
        <GatsbyImage
          image={heroContent.image.gatsbyImageData}
          className={CareersStyles.heroImage}
          alt={heroContent.image.description}
          loading="eager"
        />
        <div className={CareersStyles.heroText}>
          <h1 className={CareersStyles.pageTitle}>{heroContent.h1Heading}</h1>
          <p
            dangerouslySetInnerHTML={{
              __html: heroContent.subheading.childMarkdownRemark.rawMarkdownBody
            }}
          />
          <Button
            text="See open positions"
            buttonStyle="secondarywhite"
            urlIsRelativePath={false}
            href="#openpositions"
            onClick={(event) => internalScrollToAnchor(event, 'openpositions', -100)}
          />
        </div>
      </section>

      {sections.map((section) => {
        if (section.style === 'careers-our-values') {
          return (
            <section key={section.id} className={`grid-wrapper ${CareersStyles.values}`}>
              <h2 className={CareersStyles.valuesTitle}>{section.heading}</h2>
              <div className={CareersStyles.valuesGrid}>
                {section.content.map((value) => {
                  return <ValueCard value={value} key={value.id} />;
                })}
              </div>
            </section>
          );
        }

        if (section.style === 'careers-call-out') {
          const calloutOrder = callOutCycle() + 1;
          const [pullQuote] = section.content;
          return (
            <Fragment key={section.id}>
              <section className={`grid-wrapper ${CareersStyles.quotes}`}>
                <div
                  className={
                    calloutOrder % 2 === 1 ? CareersStyles.calloutEven : CareersStyles.calloutOdd
                  }
                >
                  <p>{section.heading}</p>
                  {calloutOrder === 1 && (
                    <ul className={CareersStyles.socialLinks}>
                      {socialLinks.map((link) => (
                        <li key={link.url}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit Juno College on ${link.text}.`}
                          >
                            <img src={link.icon} alt="" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                  {calloutOrder === 2 && (
                    <SiteLink
                      className={`link-arrow link-arrow-custard ${CareersStyles.companyLink}`}
                      to="/company/"
                    >
                      Meet the Team
                    </SiteLink>
                  )}
                </div>
                <GatsbyImage
                  image={section.image.gatsbyImageData}
                  alt={section.image.description}
                  className={
                    calloutOrder % 2 === 1
                      ? CareersStyles.calloutEvenImage
                      : CareersStyles.calloutOddImage
                  }
                  loading="lazy"
                />
              </section>
              {pullQuote && (
                <section className={`grid-wrapper ${CareersStyles.quotes}`}>
                  <blockquote className={CareersStyles.pullQuote}>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: pullQuote.quotation.childMarkdownRemark.rawMarkdownBody
                      }}
                    />
                    <cite>
                      {pullQuote.person.name}, {pullQuote.person.jobCurrent}
                    </cite>
                  </blockquote>
                </section>
              )}
            </Fragment>
          );
        }

        if (section.style === 'careers-perks-benefits') {
          const [bottomImageDesktop, bottomImageMobile] = section.imageGrid;
          const asideContent = section.content[section.content.length - 1];
          return (
            <Fragment key={section.id}>
              <section className={`grid-wrapper ${CareersStyles.gallery}`}>
                <GatsbyImage
                  image={section.image.gatsbyImageData}
                  className={CareersStyles.galleryImage}
                  alt={section.image.description}
                  loading="lazy"
                />
              </section>
              <section className={`grid-wrapper ${CareersStyles.perks}`}>
                <h2 className={CareersStyles.perksSubhead}>{section.heading}</h2>
                <div className={CareersStyles.perksGrid}>
                  {section.content.slice(0, -1).map((perk) => (
                    <ValueCard key={perk.id} value={perk} perksSection />
                  ))}
                </div>
                <aside>
                  <h4 className={CareersStyles.perksSidebarSubhead}>{asideContent.title}</h4>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: asideContent.bodyText.childMarkdownRemark.html
                    }}
                  />
                </aside>
                <GatsbyImage
                  image={bottomImageDesktop.gatsbyImageData}
                  className={CareersStyles.perksImageTwoDesktop}
                  alt={bottomImageDesktop.description}
                  loading="lazy"
                />
                <GatsbyImage
                  image={bottomImageMobile.gatsbyImageData}
                  className={CareersStyles.perksImageTwoMobile}
                  alt={bottomImageMobile.description}
                  loading="lazy"
                />
              </section>
            </Fragment>
          );
        }

        if (section.style === 'careers-open-positions') {
          return (
            <Jobs
              key={section.id}
              jobs={availableJobs}
              positionsTitle={section.heading}
              positionsBanner={section.description.childMarkdownRemark.html}
            />
          );
        }
        return null;
      })}
    </Layout>
  );
};

export default Careers;

export const query = graphql`
  query {
    pageContent: contentfulPageGeneric(slug: { eq: "careers" }) {
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
          childMarkdownRemark {
            rawMarkdownBody
          }
        }
        image {
          gatsbyImageData(layout: FULL_WIDTH, quality: 90)
          description
        }
      }
      sections {
        id
        heading
        style
        customAnchor
        description {
          childMarkdownRemark {
            html
          }
        }
        image {
          gatsbyImageData(width: 1400, quality: 80)
          description
        }
        imageGrid {
          id
          description
          gatsbyImageData(width: 1310, quality: 80)
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
          }
          ... on ContentfulTestimonial {
            quotation {
              childMarkdownRemark {
                rawMarkdownBody
              }
            }
            person {
              name
              jobCurrent
            }
          }
        }
      }
    }
    availableJobsQuery: allContentfulBlogPost(
      filter: {
        alternateTemplate: { eq: "Career Posting" }
        positionFilled: { eq: false }
        showOnlyAsPreview: { eq: false }
      }
      sort: { jobTitle: ASC }
    ) {
      edges {
        node {
          id
          slug
          postDate(formatString: "MMMM D, YYYY")
          jobTitle
          department
          jobLocation
          jobTimeline
        }
      }
    }
  }
`;

// export const query2 = graphql`
//   query {
//     pageContent: contentfulPageGeneric(slug: { eq: "careers" }) {
//       slug
//       metaContent {
//         title
//         description {
//           description
//         }
//         image {
//           gatsbyImageData(layout: FULL_WIDTH)
//         }
//       }
//       heroContent {
//         h1Heading
//         subheading {
//           childMarkdownRemark {
//             rawMarkdownBody
//           }
//         }
//         image {
//           gatsbyImageData(layout: FULL_WIDTH, quality: 90)
//           description
//         }
//       }
//       sections {
//         id
//         heading
//         style
//         customAnchor
//         description {
//           childMarkdownRemark {
//             html
//           }
//         }
//         image {
//           gatsbyImageData(width: 1400, quality: 80)
//           description
//         }
//         imageGrid {
//           id
//           description
//           gatsbyImageData(width: 1310, quality: 80)
//         }
//         content {
//           ... on ContentfulContentBlock {
//             id
//             title
//             bodyText {
//               childMarkdownRemark {
//                 rawMarkdownBody
//                 html
//               }
//             }
//           }
//           ... on ContentfulTestimonial {
//             quotation {
//               childMarkdownRemark {
//                 rawMarkdownBody
//               }
//             }
//             person {
//               name
//               jobCurrent
//             }
//           }
//         }
//       }
//     }
//     availableJobsQuery: allContentfulBlogPost(
//       filter: {
//         alternateTemplate: { eq: "Career Posting" }
//         positionFilled: { eq: false }
//         showOnlyAsPreview: { eq: false }
//       }
//       sort: { fields: jobTitle }
//     ) {
//       edges {
//         node {
//           id
//           slug
//           postDate(formatString: "MMMM D, YYYY")
//           jobTitle
//           department
//           jobLocation
//           jobTimeline
//         }
//       }
//     }
//   }
// `;
