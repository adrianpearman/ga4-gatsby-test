/* eslint-disable react/no-danger */
import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import '../styles/normalize.scss';
import '../styles/typography.scss';
import '../styles/global.scss';
import '../styles/animations.scss';

import Button from '../components/Button/Button';
import CarouselSlider from '../components/CarouselSlider/CarouselSlider';
import CircleHeadshot from '../components/CircleHeadshot/CircleHeadshot';
import CompanyLogos from '../components/CompanyLogos/CompanyLogos';
import Head from '../components/Head/Head';
import Layout from '../components/Layout/Layout';
import ListWithImagesSection from '../components/ListWithImagesSection/ListWithImagesSection';
import PhotoDivider from '../components/PhotoDivider/PhotoDivider';
import SiteLink from '../components/SiteLink/SiteLink';
import StandardHero from '../components/StandardHero/StandardHero';
import StudentSuccessBanner from '../components/StudentSuccessBanner/StudentSuccessBanner';

import * as HomeStyles from './index.module.scss';

const Home = ({ data, location }) => {
  const { pageDetails, allInstructorsQuery } = data;
  const { slug, metaContent, heroContent, sections } = pageDetails;
  const allInstructors = allInstructorsQuery.edges.map((edge) => edge.node);

  return (
    <Layout pageSlug={slug}>
      <Head metaContent={metaContent} pagePath={location.pathname} />
      <StandardHero
        heroContent={heroContent}
        background="junoSeaGlass"
        largeHeading
        className={HomeStyles.hero}
      />
      {sections.map((section) => {
        if (section.style === 'homepage-success-rates') {
          return (
            <section key={section.id} className={`grid-wrapper ${HomeStyles.gradSuccessSection}`}>
              <h2 className="section-heading-simple">{section.heading}</h2>
              <div
                className={HomeStyles.contentWrapper}
                dangerouslySetInnerHTML={{
                  __html: section.description.childMarkdownRemark.html
                }}
              />
              <Button
                text={section.ctaButton.text}
                href={section.ctaButton.url}
                urlIsRelativePath={section.ctaButton.isUrlRelativePath}
                openInNewTab={section.ctaButton.openInNewTab}
                useSnowplowTracking={section.ctaButton.useSnowplowTracking}
                buttonStyle="primary"
                className={HomeStyles.cta}
              />
            </section>
          );
        }
        if (section.style === 'photo-divider') {
          return (
            <PhotoDivider
              key={section.id}
              images={section.imageGrid}
              className={HomeStyles.photoDivider}
            />
          );
        }
        if (section.style === 'homepage-reviews') {
          return (
            <section className={`grid-wrapper ${HomeStyles.reviews}`} key={section.id}>
              <h2 className="section-heading-simple">{section.heading}</h2>
              <CarouselSlider
                sliderCards={section.content}
                cardType="testimonialStandard"
                numberOfPreviewsVisible={2}
                parentClass={HomeStyles.reviewsCarousel}
              />
              <SiteLink
                to={section.ctaButton.url}
                className={`link-arrow ${HomeStyles.reviewsCta}`}
              >
                {section.ctaButton.text}
              </SiteLink>
            </section>
          );
        }
        if (section.style === 'homepage-career-support') {
          const [asideContent] = section.content;
          return (
            <section key={section.id} className={`grid-wrapper ${HomeStyles.careerSupportSection}`}>
              <div className={HomeStyles.contentWrapper}>
                <h2 className="section-heading">{section.heading}</h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: section.description.childMarkdownRemark.html
                  }}
                />
              </div>
              <GatsbyImage
                image={section.image.gatsbyImageData}
                alt={section.image.description}
                className={HomeStyles.image}
                loading="lazy"
              />
              <div className={HomeStyles.asideWrapper}>
                <aside>
                  <p>
                    <span className={HomeStyles.rating}>{asideContent.title}</span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: asideContent.bodyText.childMarkdownRemark.rawMarkdownBody
                      }}
                    />
                  </p>
                </aside>
              </div>
              <Button
                href={section.ctaButton.url}
                text={section.ctaButton.text}
                urlIsRelativePath={section.ctaButton.isUrlRelativePath}
                useSnowplowTracking={section.ctaButton.useSnowplowTracking}
                openInNewTab={section.ctaButton.openInNewTab}
                buttonStyle="primary"
                className={HomeStyles.cta}
              />
            </section>
          );
        }
        if (section.style === 'corporate-logos') {
          return (
            <CompanyLogos
              key={section.id}
              allLogos={section.content}
              sectionHeading={section.heading}
              numFirstVisible={12}
              className={HomeStyles.logos}
            />
          );
        }
        if (section.style === 'homepage-financing') {
          return (
            <section key={section.id} className={`grid-wrapper ${HomeStyles.financingOptions}`}>
              <h2 className="section-heading">{section.heading}</h2>
              <p
                className={HomeStyles.sectionDescription}
                dangerouslySetInnerHTML={{
                  __html: section.description.childMarkdownRemark.rawMarkdownBody
                }}
              />
              <ul className={HomeStyles.optionsList}>
                {section.content.map((card) => (
                  <li className={HomeStyles.option} key={card.id}>
                    <h3 className="section-subheading">{card.title}</h3>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: card.bodyText.childMarkdownRemark.rawMarkdownBody
                      }}
                    />
                  </li>
                ))}
              </ul>
              <Button
                href={section.ctaButton.url}
                text={section.ctaButton.text}
                urlIsRelativePath={section.ctaButton.isUrlRelativePath}
                openInNewTab={section.ctaButton.openInNewTab}
                useSnowplowTracking={section.ctaButton.useSnowplowTracking}
                buttonStyle="primary"
                className={HomeStyles.cta}
              />
            </section>
          );
        }
        if (section.style === 'homepage-instructors') {
          return (
            <section className={`grid-wrapper ${HomeStyles.instructorsSection}`} key={section.id}>
              <div className={HomeStyles.contentWrapper}>
                <h2 className="section-heading">{section.heading}</h2>
                <p
                  className={HomeStyles.sectionDescription}
                  dangerouslySetInnerHTML={{
                    __html: section.description.childMarkdownRemark.rawMarkdownBody
                  }}
                />
                <ul className={HomeStyles.allScores}>
                  {section.content.map((score) => (
                    <li className={HomeStyles.csatScore} key={score.id}>
                      <p>
                        <span className={HomeStyles.percentage}>{score.title}</span>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: score.bodyText.childMarkdownRemark.rawMarkdownBody
                          }}
                        />
                      </p>
                    </li>
                  ))}
                </ul>
                <Button
                  text={section.ctaButton.text}
                  href={section.ctaButton.url}
                  urlIsRelativePath={section.ctaButton.isUrlRelativePath}
                  openInNewTab={section.ctaButton.openInNewTab}
                  useSnowplowTracking={section.ctaButton.useSnowplowTracking}
                  buttonStyle="primary"
                  className={HomeStyles.cta}
                />
              </div>
              <ul className={HomeStyles.instructorGrid}>
                {allInstructors.slice(0, 36).map((instructor) => (
                  <li className={HomeStyles.instructor} key={instructor.id}>
                    <CircleHeadshot
                      imageData={instructor.headshot.gatsbyImageData}
                      altText={instructor.name}
                      className={HomeStyles.headshot}
                    />
                  </li>
                ))}
              </ul>
            </section>
          );
        }
        if (section.style === 'list-with-image-grid') {
          return (
            <ListWithImagesSection
              key={section.id}
              section={section}
              className={HomeStyles.communitySection}
            />
          );
        }
        if (section.style === 'student-success-banner-calendly') {
          return (
            <section key={section.id}>
              <StudentSuccessBanner
                bannerContent={section.content[0]}
                showCalendlyEmbed
                calendlyButtonId="end-of-page"
              />
            </section>
          );
        }
        return null;
      })}
    </Layout>
  );
};

export default Home;

export const query = graphql`
  query {
    pageDetails: contentfulPageGeneric(slug: { eq: "home-page" }) {
      slug
      metaContent {
        title
        description {
          description
        }
        image {
          gatsbyImageData(layout: CONSTRAINED, width: 670, quality: 100)
        }
      }
      heroContent {
        h1Heading
        introParagraph {
          childMarkdownRemark {
            html
          }
        }
        ctaButtons {
          id
          text
          url
          isUrlRelativePath
          openInNewTab
          useSnowplowTracking
        }
        image {
          gatsbyImageData(layout: CONSTRAINED, width: 600, quality: 90)
        }
      }
      sections {
        id
        heading
        style
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
        image {
          file {
            url
          }
          description
          gatsbyImageData(quality: 100, width: 670, layout: CONSTRAINED)
        }
        imageGrid {
          id
          description
          gatsbyImageData(width: 700, layout: CONSTRAINED, quality: 100)
        }
        content {
          ... on ContentfulTestimonial {
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
              jobBeforeJuno
              jobCurrent
              jobCurrentCompany
              jobCurrentCompanyLink
              headshot {
                gatsbyImageData(width: 300, layout: CONSTRAINED, quality: 90)
              }
            }
          }
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
          }
          ... on ContentfulLogo {
            id
            company
            companyURL
            file {
              url
              gatsbyImageData(width: 170, layout: CONSTRAINED, quality: 80)
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
            gatsbyImageData(width: 250, layout: CONSTRAINED, quality: 80)
          }
        }
      }
    }
  }
`;

// export const query2 = graphql`
//   query {
//     pageDetails: contentfulPageGeneric(slug: { eq: "home-page" }) {
//       slug
//       metaContent {
//         title
//         description {
//           description
//         }
//         image {
//           gatsbyImageData(layout: CONSTRAINED, width: 670, quality: 100)
//         }
//       }
//       heroContent {
//         h1Heading
//         introParagraph {
//           childMarkdownRemark {
//             html
//           }
//         }
//         ctaButtons {
//           id
//           text
//           url
//           isUrlRelativePath
//           openInNewTab
//           useSnowplowTracking
//         }
//         image {
//           gatsbyImageData(layout: CONSTRAINED, width: 600, quality: 90)
//         }
//       }
//       sections {
//         id
//         heading
//         style
//         description {
//           childMarkdownRemark {
//             rawMarkdownBody
//             html
//           }
//         }
//         ctaButton {
//           text
//           url
//           isUrlRelativePath
//           openInNewTab
//           useSnowplowTracking
//         }
//         image {
//           file {
//             url
//           }
//           description
//           gatsbyImageData(quality: 100, width: 670, layout: CONSTRAINED)
//         }
//         imageGrid {
//           id
//           description
//           gatsbyImageData(width: 700, layout: CONSTRAINED, quality: 100)
//         }
//         content {
//           ... on ContentfulTestimonial {
//             id
//             type
//             courseTaken
//             quotation {
//               childMarkdownRemark {
//                 rawMarkdownBody
//               }
//             }
//             person {
//               name
//               jobBeforeJuno
//               jobCurrent
//               jobCurrentCompany
//               jobCurrentCompanyLink
//               headshot {
//                 gatsbyImageData(width: 300, layout: CONSTRAINED, quality: 90)
//               }
//             }
//           }
//           ... on ContentfulContentBlock {
//             id
//             title
//             bodyText {
//               childMarkdownRemark {
//                 rawMarkdownBody
//                 html
//               }
//             }
//             button {
//               text
//               url
//               isUrlRelativePath
//               openInNewTab
//               useSnowplowTracking
//             }
//           }
//           ... on ContentfulLogo {
//             id
//             company
//             companyURL
//             file {
//               url
//               gatsbyImageData(width: 170, layout: CONSTRAINED, quality: 80)
//             }
//           }
//           ... on ContentfulStudentSuccessBanner {
//             __typename
//             heading
//             text {
//               childMarkdownRemark {
//                 rawMarkdownBody
//               }
//             }
//             ctaButton {
//               text
//               url
//               isUrlRelativePath
//               openInNewTab
//               useSnowplowTracking
//             }
//             successConsultants {
//               id
//               name
//               headshot {
//                 gatsbyImageData(width: 250, layout: CONSTRAINED, quality: 100)
//               }
//             }
//           }
//         }
//       }
//     }
//     allInstructorsQuery: allContentfulPerson(
//       filter: { isInstructor: { eq: true } }
//       sort: { fields: name, order: ASC }
//     ) {
//       edges {
//         node {
//           id
//           name
//           headshot {
//             gatsbyImageData(width: 250, layout: CONSTRAINED, quality: 80)
//           }
//         }
//       }
//     }
//   }
// `;
