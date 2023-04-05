/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import { InlineWidget } from 'react-calendly';

import Layout from '../components/Layout/Layout';
import Head from '../components/Head/Head';
import Button from '../components/Button/Button';
import ConfettiAnimation from '../components/ConfettiAnimation/ConfettiAnimation';

import * as ThankYouStyles from './thank-you.module.scss';
import CircleHeadshot from '../components/CircleHeadshot/CircleHeadshot';

const widgetPageSettings = {
  hideEventTypeDetails: true,
  primaryColor: 'ea593e',
  textColor: '221c38'
};

const ThankYou = ({ data, pageContext, location }) => {
  const { slug, metaContent, heroContent, sections } = data.pageContent;
  const { backgroundColor } = pageContext;

  const [prefilledUserName, setPrefilledUserName] = useState('{}');
  useEffect(() => {
    if (typeof window !== 'undefined' && window) {
      setPrefilledUserName(window.sessionStorage.getItem('firstName'));
    }
  }, []);

  const calendlySection =
    sections && sections.find((section) => section.style === 'thank-you-calendly-embed');

  return (
    <Layout pageSlug={slug}>
      <Head metaContent={metaContent} pagePath={location.pathname}>
        <meta name="robots" content="noindex" />
      </Head>
      <section className={`grid-wrapper ${ThankYouStyles.hero} ${ThankYouStyles[backgroundColor]}`}>
        <ConfettiAnimation />
        <h1>{heroContent.h1Heading}</h1>
        {heroContent.subheading && (
          <p className={ThankYouStyles.subheading}>
            {heroContent.subheading.subheading}
            {prefilledUserName && `, ${prefilledUserName}`}!
          </p>
        )}
        <div
          className={ThankYouStyles.sectionContent}
          dangerouslySetInnerHTML={{
            __html: heroContent.introParagraph.childMarkdownRemark.html
          }}
        />
        {heroContent.ctaButtons && (
          <div className={ThankYouStyles.buttonWrapper}>
            {heroContent.ctaButtons.map((button) => (
              <Button
                key={button.id}
                urlIsRelativePath={button.isUrlRelativePath}
                text={button.text}
                href={button.url}
                openInNewTab={button.openInNewTab}
                useSnowplowTracking={button.useSnowplowTracking}
                buttonStyle="primary"
              />
            ))}
          </div>
        )}
        {calendlySection && (
          <div className={ThankYouStyles.calendlySection}>
            <div className={ThankYouStyles.headshotOverlap}>
              {calendlySection.imageGrid.map((headshot) => (
                <CircleHeadshot
                  key={headshot.id}
                  imageData={headshot.gatsbyImageData}
                  altText={headshot.description}
                  size="95px"
                  className={ThankYouStyles.headshot}
                />
              ))}
            </div>
            <div className={ThankYouStyles.calendlyContainer}>
              <InlineWidget
                url="https://calendly.com/juno-college/website-book-phone-call-embed"
                pageSettings={widgetPageSettings}
              />
            </div>

            <div
              className={ThankYouStyles.sectionContent}
              dangerouslySetInnerHTML={{
                __html: calendlySection.description.childMarkdownRemark.html
              }}
            />
          </div>
        )}
      </section>
    </Layout>
  );
};

export default ThankYou;

export const queryApplyThanks = graphql`
  query ($id: String!) {
    pageContent: contentfulPageGeneric(id: { eq: $id }) {
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
          subheading
        }
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
      }
      sections {
        style
        description {
          childMarkdownRemark {
            html
          }
        }
        imageGrid {
          id
          gatsbyImageData(width: 100, quality: 90)
          description
        }
      }
    }
  }
`;
