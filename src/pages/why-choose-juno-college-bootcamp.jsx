/* eslint-disable react/no-danger */
import React from 'react';
import { graphql } from 'gatsby';
import { getSrc } from 'gatsby-plugin-image';
import 'intersection-observer';
import { useInView } from 'react-intersection-observer';

import Head from '../components/Head/Head';
import Layout from '../components/Layout/Layout';
import StandardHero from '../components/StandardHero/StandardHero';
import StudentSuccessBanner from '../components/StudentSuccessBanner/StudentSuccessBanner';
import TestimonialStandardCard from '../components/CarouselCards/TestimonialStandardCard';
import CircleHeadshot from '../components/CircleHeadshot/CircleHeadshot';
import CompanyLogos from '../components/CompanyLogos/CompanyLogos';
import JunoLogo from '../components/SVG/JunoLogo';
import RatingGroup from '../components/RatingGroup/RatingGroup';
import AccordionSection from '../components/AccordionSection/AccordionSection';

import * as WhyChooseJunoStyles from './why-choose-juno-college-bootcamp.module.scss';

const WhyChooseJuno = ({ data, location }) => {
  const { pageContent, allInstructorsQuery } = data;
  const { slug, metaContent, heroContent, sections } = pageContent;

  const allInstructors = allInstructorsQuery.edges.map((edge) => edge.node);

  const renderQuoteSpotlight = (testimonial, section) => {
    return (
      <div
        className={WhyChooseJunoStyles.quoteWrapper}
        style={{ backgroundImage: `url(${getSrc(section.image)})` }}
      >
        <TestimonialStandardCard
          card={testimonial}
          className={WhyChooseJunoStyles.quoteCard}
          simpleByline
        />
      </div>
    );
  };

  const findContentByTypename = (contentList, typename) => {
    const foundEntry = contentList.find((content) => content.__typename === typename);
    return foundEntry || null;
  };
  const filterContentByTypename = (contentList, typename) => {
    const filteredEntries = contentList.filter((content) => content.__typename === typename);
    return filteredEntries || null;
  };

  const [instructorsRef, instructorsInView] = useInView({
    rootMargin: '0px 0px -300px 0px'
  });
  const [careerSupportRef, careerSupportInView] = useInView({
    rootMargin: '0px 0px -450px 0px'
  });

  return (
    <Layout pageSlug={slug}>
      <Head metaContent={metaContent} pagePath={location.pathname} />
      {heroContent && (
        <StandardHero
          heroContent={heroContent}
          background="whiteNoRip"
          className={WhyChooseJunoStyles.hero}
          decorativeToc
        />
      )}
      {sections.map((section) => {
        if (section.style === 'why-juno-grad-success') {
          const tableContent = findContentByTypename(section.content, 'ContentfulTable');
          const testimonial = findContentByTypename(section.content, 'ContentfulTestimonial');
          const logoContent = findContentByTypename(section.content, 'ContentfulPageSection');

          return (
            <section
              key={section.id}
              id={section.customAnchor}
              className={`grid-wrapper ${WhyChooseJunoStyles.gradSuccess}`}
            >
              <h2 className={WhyChooseJunoStyles.sectionHeading}>{section.heading}</h2>
              <p
                className={WhyChooseJunoStyles.sectionDescription}
                dangerouslySetInnerHTML={{
                  __html: section.description.childMarkdownRemark.rawMarkdownBody
                }}
              />
              {tableContent && (
                <div className={WhyChooseJunoStyles.comparisonTable}>
                  <p
                    className={WhyChooseJunoStyles.sectionDescription}
                    dangerouslySetInnerHTML={{
                      __html: tableContent.introduction.childMarkdownRemark.rawMarkdownBody
                    }}
                  />
                  <table>
                    {tableContent.table.tableData.map((row, rowIndex, tableDataArray) => {
                      if (rowIndex === 0) {
                        return (
                          <thead key={`table${rowIndex + 1}`}>
                            <tr>
                              {row.map((cellData, i) => (
                                <th
                                  key={`row${i + 1}`}
                                  className={WhyChooseJunoStyles[`column${i + 1}`]}
                                >
                                  {cellData === 'Juno College' ? (
                                    <JunoLogo
                                      showHackerYou={false}
                                      parentStyles={WhyChooseJunoStyles.junoLogo}
                                    />
                                  ) : (
                                    cellData
                                  )}
                                </th>
                              ))}
                            </tr>
                          </thead>
                        );
                      }
                      return (
                        <tbody key={`table${rowIndex + 1}`}>
                          <tr>
                            {row.map((cellData, cellIndex) => (
                              <td
                                key={`row${cellIndex + 1}`}
                                className={WhyChooseJunoStyles[`column${cellIndex + 1}`]}
                              >
                                {tableDataArray[0][cellIndex] && (
                                  <span className={WhyChooseJunoStyles.mobileCellHeading}>
                                    {tableDataArray[0][cellIndex]}:{' '}
                                  </span>
                                )}
                                <span>{cellData}</span>
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                  <div
                    className={WhyChooseJunoStyles.source}
                    dangerouslySetInnerHTML={{
                      __html: tableContent.sourceCredit.childMarkdownRemark.html
                    }}
                  />
                </div>
              )}
              {testimonial && renderQuoteSpotlight(testimonial, section)}
              {logoContent && (
                <div className={WhyChooseJunoStyles.logos}>
                  <CompanyLogos
                    allLogos={logoContent.content}
                    sectionHeading={logoContent.heading}
                    className={WhyChooseJunoStyles.logoComponent}
                  />
                </div>
              )}
            </section>
          );
        }

        if (section.style === 'why-juno-instructors') {
          const csatScores = filterContentByTypename(section.content, 'ContentfulContentBlock');
          const testimonial = findContentByTypename(section.content, 'ContentfulTestimonial');
          const ratingCards = filterContentByTypename(section.content, 'ContentfulRatingCard');

          return (
            <section
              key={section.id}
              id={section.customAnchor}
              className={`grid-wrapper ${WhyChooseJunoStyles.instructorSection}`}
            >
              <div className={WhyChooseJunoStyles.contentWrapper}>
                <h2 className={WhyChooseJunoStyles.sectionHeading}>{section.heading}</h2>
                <p
                  className={WhyChooseJunoStyles.sectionDescription}
                  dangerouslySetInnerHTML={{
                    __html: section.description.childMarkdownRemark.rawMarkdownBody
                  }}
                />
                <div ref={instructorsRef} className={WhyChooseJunoStyles.allScores}>
                  {csatScores.map((score) => (
                    <div key={score.id} className={WhyChooseJunoStyles.csatScore}>
                      <p>
                        <span
                          className={`${WhyChooseJunoStyles.percentage} ${
                            instructorsInView ? 'fading-in' : 'fading-out'
                          }`}
                        >
                          {score.title}
                        </span>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: score.bodyText.childMarkdownRemark.rawMarkdownBody
                          }}
                        />
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <ul className={WhyChooseJunoStyles.instructorGrid}>
                {allInstructors.slice(0, 36).map((instructor) => {
                  return (
                    <li key={instructor.id} className={WhyChooseJunoStyles.instructor}>
                      <CircleHeadshot
                        imageData={instructor.headshot.gatsbyImageData}
                        altText={instructor.name}
                        className={WhyChooseJunoStyles.headshot}
                      />
                    </li>
                  );
                })}
              </ul>
              {testimonial && renderQuoteSpotlight(testimonial, section)}
              {ratingCards && (
                <div className={WhyChooseJunoStyles.ratings}>
                  <RatingGroup
                    ratingCards={ratingCards}
                    className={WhyChooseJunoStyles.ratingGroup}
                  />
                </div>
              )}
            </section>
          );
        }

        if (section.style === 'why-juno-career-support') {
          const aside = findContentByTypename(section.content, 'ContentfulContentBlock');
          const testimonial = findContentByTypename(section.content, 'ContentfulTestimonial');
          return (
            <section
              key={section.id}
              id={section.customAnchor}
              className={`grid-wrapper ${WhyChooseJunoStyles.careerSupport}`}
            >
              <div className={WhyChooseJunoStyles.contentWrapper}>
                <h2 className={WhyChooseJunoStyles.sectionHeading}>{section.heading}</h2>
                <div
                  className={WhyChooseJunoStyles.sectionDescription}
                  dangerouslySetInnerHTML={{
                    __html: section.description.childMarkdownRemark.html
                  }}
                />
              </div>
              {aside && (
                <aside
                  ref={careerSupportRef}
                  className={`${WhyChooseJunoStyles.asideContent} ${
                    careerSupportInView
                      ? WhyChooseJunoStyles.fadeInNumbers
                      : WhyChooseJunoStyles.fadeOutNumbers
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: aside.bodyText.childMarkdownRemark.html
                  }}
                />
              )}
              {testimonial && renderQuoteSpotlight(testimonial, section)}
            </section>
          );
        }

        if (section.style === 'why-juno-community') {
          const testimonial = findContentByTypename(section.content, 'ContentfulTestimonial');
          return (
            <section
              key={section.id}
              id={section.customAnchor}
              className={`grid-wrapper ${WhyChooseJunoStyles.communitySection}`}
            >
              <AccordionSection
                section={section}
                className={WhyChooseJunoStyles.accordionSection}
              />
              {testimonial && renderQuoteSpotlight(testimonial, section)}
            </section>
          );
        }

        if (section.style === 'simple-banner') {
          return (
            <section
              key={section.id}
              className={`${WhyChooseJunoStyles.simpleBanner} grid-wrapper`}
            >
              <h2 className={WhyChooseJunoStyles.sectionHeading}>{section.heading}</h2>
              <p
                className={WhyChooseJunoStyles.ctaButtons}
                dangerouslySetInnerHTML={{
                  __html: section.description.childMarkdownRemark.rawMarkdownBody
                }}
              />
            </section>
          );
        }

        if (section.style === 'student-success-banner-calendly') {
          return (
            <section key={section.id} id={section.customAnchor} className="grid-wrapper">
              <StudentSuccessBanner
                bannerContent={section.content[0]}
                calendlyButtonId={section.customAnchor}
                showCalendlyEmbed
              />
            </section>
          );
        }

        return null;
      })}
    </Layout>
  );
};

export default WhyChooseJuno;

export const query = graphql`
  query {
    pageContent: contentfulPageGeneric(slug: { eq: "why-choose-juno-college-bootcamp" }) {
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
        introParagraph {
          childMarkdownRemark {
            html
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
            html
          }
        }
        image {
          description
          gatsbyImageData(layout: FULL_WIDTH)
        }
        content {
          ... on ContentfulTable {
            __typename
            introduction {
              childMarkdownRemark {
                rawMarkdownBody
              }
            }
            table {
              tableData
            }
            sourceCredit {
              childMarkdownRemark {
                html
              }
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
              jobCurrent
              jobCurrentCompany
              jobCurrentCompanyLink
              headshot {
                gatsbyImageData(width: 300, layout: CONSTRAINED)
              }
            }
          }
          ... on ContentfulPageSection {
            __typename
            heading
            style
            content {
              ... on ContentfulLogo {
                __typename
                id
                company
                companyURL
                file {
                  gatsbyImageData(width: 160, layout: CONSTRAINED)
                  url
                }
              }
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
          }
          ... on ContentfulRatingCard {
            __typename
            id
            averageRating
            siteName
            siteUrl
            logo {
              description
              file {
                url
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
    allInstructorsQuery: allContentfulPerson(
      filter: { isInstructor: { eq: true } }
      sort: { name: ASC }
    ) {
      edges {
        node {
          id
          name
          headshot {
            gatsbyImageData(width: 250, layout: CONSTRAINED)
          }
        }
      }
    }
  }
`;
