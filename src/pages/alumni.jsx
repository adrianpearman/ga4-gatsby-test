import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout/Layout';
import Head from '../components/Head/Head';
import Button from '../components/Button/Button';
import CircleHeadshot from '../components/CircleHeadshot/CircleHeadshot';
import AlumniCard from '../components/AlumniCard/AlumniCard';

import { getDateDescComparer, getFutureDateExcluder } from '../helpers/filtersorters';
import useItemSwitcher from '../hooks/useItemSwitcher';
import usePaginator from '../hooks/usePaginator';

import CarouselArrow from '../components/SVG/CarouselArrow';

import * as AlumniStyles from './alumni.module.scss';

const Alumni = ({ data, location }) => {
  const { allStudentsQuery, allRecentHiresQuery, pageContent, allShowcasesQuery } = data;
  const { slug, metaContent, heroContent } = pageContent;
  const [heroButton] = heroContent.ctaButtons;

  const [allPastGraduatedStudents, setAllPastGraduatedStudents] = useState([]);

  useEffect(() => {
    // Do the categorizing in a useEffect call so that the server-side rendered version is _always_
    // in-sync with the data that the client-side version thinks.
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const sortedStudents = allStudentsQuery.edges
      .map((edge) => edge.node)
      .filter(
        (student) => Date.parse(student.graduationDate) < today || student.graduationDate === null
      );

    setAllPastGraduatedStudents(sortedStudents);
  }, [allStudentsQuery.edges]);

  const transformCohortNumber = (grad) => {
    // ensures DA Bootcamp grads are in step with the Web Dev grads
    return grad.bootcampGraduatedFrom === 'Data Analytics Bootcamp'
      ? grad.cohortNumber + 36
      : grad.cohortNumber;
  };
  // alumni is all the grads without the grads that have "Available for Hire" checked in Contentful
  const alumniExcludingForHire = allPastGraduatedStudents
    .filter((grad) => !grad.availableForHire && grad.jobCurrent)
    .sort((gradA, gradB) => transformCohortNumber(gradA) < transformCohortNumber(gradB));

  // pagination functionality for alumni cards
  const [alumniCards, loadMore, hasMoreItems] = usePaginator(alumniExcludingForHire, 24, 24);

  // handles all recently hired grads for the carousel
  const [recentHires, setRecentHires] = useState([]);
  useEffect(() => {
    const mostRecentHires = allRecentHiresQuery.edges
      .map((edge) => edge.node)
      .filter(getFutureDateExcluder((student) => student.jobStartDate))
      .sort(getDateDescComparer((student) => student.jobStartDate))
      .slice(0, 15);

    setRecentHires(mostRecentHires);
  }, [allRecentHiresQuery.edges]);
  const {
    current: currentGrad,
    next: nextGrad,
    previous: previousGrad
  } = useItemSwitcher(recentHires);

  // find slug for graduate showcase banner
  const allShowcasePages = allShowcasesQuery.edges.map((edge) => edge.node);
  const webDeveloperShowcasePages = allShowcasePages.filter(
    (showcase) => showcase.templateName === 'web-developer-graduates'
  );
  const dataAnalystShowcasePages = allShowcasePages.filter(
    (showcase) => showcase.templateName === 'data-analyst-graduates'
  );

  return (
    <Layout pageSlug={slug}>
      <Head metaContent={metaContent} pagePath={location.pathname} />
      <section className={`${AlumniStyles.hero} grid-wrapper`}>
        <h1 className={`${AlumniStyles.title} title-background`}>{heroContent.h1Heading}</h1>
        <p
          className={AlumniStyles.description}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: heroContent.introParagraph.childMarkdownRemark.rawMarkdownBody
          }}
        />
        <div className={AlumniStyles.buttonWrap}>
          <Button
            urlIsRelativePath={heroButton.isUrlRelativePath}
            href={heroButton.url}
            text={heroButton.text}
            openInNewTab={heroButton.openInNewTab}
            useSnowplowTracking={heroButton.useSnowplowTracking}
            buttonStyle="primary"
          />
        </div>
        {/* Recently Hired carousel */}
        {currentGrad && (
          <aside className={AlumniStyles.hired}>
            <div className={AlumniStyles.hiredTop}>
              <h3>Recently Hired</h3>
              <div className={AlumniStyles.nav}>
                <button
                  type="button"
                  onClick={previousGrad}
                  aria-label="Show the previous hired grad"
                >
                  <CarouselArrow direction="previous" type="secondary" transparentBackground />
                </button>
                <button
                  type="button"
                  onClick={nextGrad}
                  className={AlumniStyles.nextArrow}
                  aria-label="Show the next hired grad"
                >
                  <CarouselArrow direction="next" type="secondary" transparentBackground />
                </button>
              </div>
            </div>
            <div className={AlumniStyles.hiredBottom}>
              {currentGrad.headshot && (
                <CircleHeadshot
                  imageData={currentGrad.headshot.gatsbyImageData}
                  altText={currentGrad.name}
                  size="65px"
                  className={AlumniStyles.recentlyHiredHeadshot}
                />
              )}
              <div className={AlumniStyles.hiredInfo}>
                <h3>{currentGrad.name}</h3>
                {currentGrad.cohortNumber ? (
                  <p className={AlumniStyles.cohort}>
                    {currentGrad.bootcampGraduatedFrom}: Cohort {currentGrad.cohortNumber}
                  </p>
                ) : (
                  <p>Bootcamp Grad</p>
                )}
                <p className={AlumniStyles.jobTitle}>{currentGrad.jobCurrent}</p>
                <a href={currentGrad.jobCurrentCompanyLink}>{currentGrad.jobCurrentCompany}</a>
              </div>
            </div>
          </aside>
        )}
      </section>

      <section name="alumni" id="alumni" className={`grid-wrapper ${AlumniStyles.alumniCards}`}>
        <div className={AlumniStyles.filterBar}>
          <p className="filter-btn active">
            All Grads
            <span className={AlumniStyles.filterBarCounter}>{alumniExcludingForHire.length}</span>
          </p>
        </div>

        <div className={AlumniStyles.gradShowcaseBanner}>
          <h2>Looking for your team&rsquo;s next superstar?</h2>
          <p>Meet our latest Bootcamp graduates and explore their impressive work here.</p>
          <Button
            urlIsRelativePath
            text="View Web Development Grads"
            href={`/web-developer-graduates/${webDeveloperShowcasePages[0].slug}`}
            buttonStyle="primary"
          />
          {dataAnalystShowcasePages.length ? (
            <Button
              urlIsRelativePath
              text="View Data Analytics Grads"
              href={`/data-analyst-graduates/${dataAnalystShowcasePages[0].slug}`}
              buttonStyle="primary"
              className={AlumniStyles.showcaseButton}
            />
          ) : null}
        </div>

        <ul className={`${AlumniStyles.alumniCardsWrapper} all`}>
          {alumniCards.length > 0 && (
            <>
              {alumniCards.map((alum) => {
                return <AlumniCard key={alum.contentful_id} alumnus={alum} type="all" />;
              })}
            </>
          )}
        </ul>

        {/* Load more */}
        {hasMoreItems && (
          <div className={AlumniStyles.loadMore}>
            <button type="button" onClick={loadMore} className={AlumniStyles.loadMoreButton}>
              Load more students
            </button>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Alumni;

export const query = graphql`
  query {
    allStudentsQuery: allContentfulPerson(
      filter: { alumnus: { eq: true } }
      sort: [{ cohortNumber: DESC }, { name: ASC }]
    ) {
      edges {
        node {
          contentful_id
          name
          studentBio {
            studentBio
          }
          ctaText
          ctaLink
          headshot {
            gatsbyImageData(width: 75, layout: CONSTRAINED, quality: 90)
          }
          cohortNumber
          freelancer
          availableForHire
          bootcampGraduatedFrom
          graduationDate
          jobBeforeJuno
          jobAfterHY
          jobCurrent
          jobCurrentCompany
          jobCurrentCompanyLink
          website
          twitter
          linkedin
          github
          testimonial {
            type
            quotation {
              quotation
            }
          }
        }
      }
    }
    allRecentHiresQuery: allContentfulPerson(
      filter: { alumnus: { eq: true }, jobStartDate: { gt: "2019" } }
      sort: { jobStartDate: DESC }
      limit: 80
    ) {
      edges {
        node {
          alumnus
          name
          studentBio {
            studentBio
          }
          ctaText
          ctaLink
          cohortNumber
          bootcampGraduatedFrom
          jobStartDate
          jobCurrent
          jobCurrentCompany
          jobCurrentCompanyLink
          testimonial {
            type
            quotation {
              quotation
            }
          }
          headshot {
            gatsbyImageData(width: 75, layout: CONSTRAINED, quality: 90)
          }
        }
      }
    }
    pageContent: contentfulPageGeneric(slug: { eq: "alumni" }) {
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
        ctaButtons {
          text
          url
          isUrlRelativePath
          openInNewTab
          useSnowplowTracking
        }
      }
    }
    allShowcasesQuery: allContentfulPageGeneric(
      filter: { templateName: { regex: "/graduates/gi" } }
      sort: { slug: DESC }
    ) {
      edges {
        node {
          slug
          templateName
        }
      }
    }
  }
`;

// export const query2 = graphql`
//   query {
//     allStudentsQuery: allContentfulPerson(
//       filter: { alumnus: { eq: true } }
//       sort: { fields: [cohortNumber, name], order: [DESC, ASC] }
//     ) {
//       edges {
//         node {
//           contentful_id
//           name
//           studentBio {
//             studentBio
//           }
//           ctaText
//           ctaLink
//           headshot {
//             gatsbyImageData(width: 75, layout: CONSTRAINED, quality: 90)
//           }
//           cohortNumber
//           freelancer
//           availableForHire
//           bootcampGraduatedFrom
//           graduationDate
//           jobBeforeJuno
//           jobAfterHY
//           jobCurrent
//           jobCurrentCompany
//           jobCurrentCompanyLink
//           website
//           twitter
//           linkedin
//           github
//           testimonial {
//             type
//             quotation {
//               quotation
//             }
//           }
//         }
//       }
//     }
//     allRecentHiresQuery: allContentfulPerson(
//       filter: { alumnus: { eq: true }, jobStartDate: { gt: "2019" } }
//       sort: { order: DESC, fields: jobStartDate }
//       limit: 80
//     ) {
//       edges {
//         node {
//           alumnus
//           name
//           studentBio {
//             studentBio
//           }
//           ctaText
//           ctaLink
//           cohortNumber
//           bootcampGraduatedFrom
//           jobStartDate
//           jobCurrent
//           jobCurrentCompany
//           jobCurrentCompanyLink
//           testimonial {
//             type
//             quotation {
//               quotation
//             }
//           }
//           headshot {
//             gatsbyImageData(width: 75, layout: CONSTRAINED, quality: 90)
//           }
//         }
//       }
//     }
//     pageContent: contentfulPageGeneric(slug: { eq: "alumni" }) {
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
//         introParagraph {
//           childMarkdownRemark {
//             rawMarkdownBody
//           }
//         }
//         ctaButtons {
//           text
//           url
//           isUrlRelativePath
//           openInNewTab
//           useSnowplowTracking
//         }
//       }
//     }
//     allShowcasesQuery: allContentfulPageGeneric(
//       filter: { templateName: { regex: "/graduates/gi" } }
//       sort: { fields: slug, order: DESC }
//     ) {
//       edges {
//         node {
//           slug
//           templateName
//         }
//       }
//     }
//   }
// `;
