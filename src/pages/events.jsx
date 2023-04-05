import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout/Layout';
import Head from '../components/Head/Head';
import StandardHero from '../components/StandardHero/StandardHero';
import Workshops from '../components/EventsComponents/Workshops';
import CampusGallery from '../components/EventsComponents/CampusGallery';

import { excludePastStartDates } from '../helpers/filtersorters';

const Events = ({ data, location }) => {
  const { pageDetails, allWorkshops } = data;
  const { metaContent } = pageDetails;
  const campusGallerySection = pageDetails.sections.find(
    (section) => section.style === 'events-image-with-aside'
  );

  const [sortedWorkshops, setSortedWorkshops] = useState([]);
  useEffect(() => {
    const orderedWorkshops = allWorkshops.edges
      .map((event) => event.node)
      .filter(excludePastStartDates);

    setSortedWorkshops(orderedWorkshops);
  }, [allWorkshops]);

  const [recording] = allWorkshops.edges
    .map((event) => event.node)
    .filter((event) => event.id === '72e2b70b-3949-574d-a624-7a48cd5ca0f6');

  return (
    <Layout pageSlug={pageDetails.slug}>
      <Head metaContent={metaContent} pagePath={location.pathname} />
      <StandardHero
        heroContent={pageDetails.heroContent}
        background="whiteNoRip"
        largeHeading
        extraWide
        buttonId="events-page-hero"
      />
      <Workshops allTorontoWorkshops={sortedWorkshops} coding101Recording={recording} />
      {campusGallerySection && (
        <CampusGallery
          title={campusGallerySection.heading}
          description={campusGallerySection.description.description}
          button={campusGallerySection.ctaButton}
        />
      )}
    </Layout>
  );
};

export default Events;

export const query = graphql`
  query {
    pageDetails: contentfulPageGeneric(slug: { eq: "events" }) {
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
        ctaButtons {
          id
          isUrlRelativePath
          url
          text
          openInNewTab
          useSnowplowTracking
        }
      }
      sections {
        style
        heading
        description {
          description
        }
        ctaButton {
          text
          url
          isUrlRelativePath
          openInNewTab
          useSnowplowTracking
        }
      }
    }
    allWorkshops: allContentfulEventSession(
      filter: { type: { price: { eq: 0 } } }
      sort: { date: ASC }
    ) {
      edges {
        node {
          id
          registrationLink
          date
          timeFrame
          location
          instructor {
            name
            headshot {
              gatsbyImageData(width: 150, layout: CONSTRAINED)
            }
          }
          type {
            name
            format
            description {
              childMarkdownRemark {
                rawMarkdownBody
              }
            }
            sharedCtaText
            skillLevel
            associatedProduct {
              name
            }
            defaultImage {
              gatsbyImageData
              description
            }
          }
          uniqueName
          uniqueDescription {
            childMarkdownRemark {
              rawMarkdownBody
            }
          }
          uniqueImage {
            gatsbyImageData
            description
          }
        }
      }
    }
  }
`;

// export const query2 = graphql`
//   {
//     pageDetails: contentfulPageGeneric(slug: { eq: "events" }) {
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
//         mainVisualHeading
//         introParagraph {
//           childMarkdownRemark {
//             html
//           }
//         }
//         ctaButtons {
//           id
//           isUrlRelativePath
//           url
//           text
//           openInNewTab
//           useSnowplowTracking
//         }
//       }
//       sections {
//         style
//         heading
//         description {
//           description
//         }
//         ctaButton {
//           text
//           url
//           isUrlRelativePath
//           openInNewTab
//           useSnowplowTracking
//         }
//       }
//     }
//     allWorkshops: allContentfulEventSession(
//       filter: { type: { price: { eq: 0 } } }
//       sort: { fields: date, order: ASC }
//     ) {
//       edges {
//         node {
//           id
//           registrationLink
//           date
//           timeFrame
//           location
//           instructor {
//             name
//             headshot {
//               gatsbyImageData(width: 150, layout: CONSTRAINED)
//             }
//           }
//           type {
//             name
//             format
//             description {
//               childMarkdownRemark {
//                 rawMarkdownBody
//               }
//             }
//             sharedCtaText
//             skillLevel
//             associatedProduct {
//               name
//             }
//             defaultImage {
//               gatsbyImageData
//               description
//             }
//           }
//           uniqueName
//           uniqueDescription {
//             childMarkdownRemark {
//               rawMarkdownBody
//             }
//           }
//           uniqueImage {
//             gatsbyImageData
//             description
//           }
//         }
//       }
//     }
//   }
// `;
