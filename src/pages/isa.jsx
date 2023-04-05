/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { scroller } from 'react-scroll';
import { GatsbyImage } from 'gatsby-plugin-image';

import Layout from '../components/Layout/Layout';
import Button from '../components/Button/Button';

import Head from '../components/Head/Head';
import SnowplowHiddenFormInputs from '../components/SnowplowHiddenFormInputs/SnowplowHiddenFormInputs';

import * as PayStyles from './isa.module.scss';
import trackSnowplowEmail from '../helpers/trackSnowplowEmail';

const Isa = ({ data, location }) => {
  const { slug, metaContent, heroContent, sections } = data.pageContent;

  const [userEmail, setUserEmail] = useState('');

  const handleSubmit = () => {
    if (userEmail) {
      trackSnowplowEmail(userEmail);
    }
  };

  const scrollToAnchor = (e, target) => {
    e.preventDefault();
    scroller.scrollTo(target, {
      offset: -100,
      duration: 800,
      delay: 0,
      smooth: true
    });
  };

  return (
    <Layout pageSlug={slug}>
      <Head metaContent={metaContent} pagePath={location.pathname} />
      <section className={`grid-wrapper ${PayStyles.hero}`}>
        <div className={PayStyles.heroInfo}>
          <h1 className={PayStyles.seoHeading}>{heroContent.h1Heading}</h1>
          <h2
            dangerouslySetInnerHTML={{
              __html: heroContent.mainVisualHeading
            }}
          />
          <h3
            dangerouslySetInnerHTML={{
              __html: heroContent.subheading.childMarkdownRemark.rawMarkdownBody
            }}
          />
          <p>{heroContent.introParagraph.introParagraph}</p>

          {heroContent.ctaButtons.length <= 1 && (
            <button
              type="button"
              className={`btn ${PayStyles.packageForm}`}
              onClick={(event) => {
                scrollToAnchor(event, 'info-package');
              }}
            >
              Download Info Package
            </button>
          )}

          {heroContent.ctaButtons.map((button) => (
            <Button
              key={button.id}
              urlIsRelativePath={button.isUrlRelativePath}
              openInNewTab={button.openInNewTab}
              useSnowplowTracking={button.useSnowplowTracking}
              text={button.text}
              href={button.url}
              buttonStyle="secondaryviolet"
            />
          ))}
        </div>
        <div className={PayStyles.heroRight}>
          <GatsbyImage
            image={heroContent.image.gatsbyImageData}
            alt={heroContent.image.description}
          />
          <p>Limited ISA seats available to Canadian Citizens and Permanent Residents only.</p>
        </div>
      </section>

      {sections.map((section) => {
        if (section.style === 'isa-benefits') {
          return (
            <section key={section.id} className={`grid-wrapper ${PayStyles.info}`}>
              <div className={PayStyles.infos}>
                {section.content.map((card) => {
                  return (
                    <div key={card.id}>
                      <h2>{card.title}</h2>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: card.bodyText.childMarkdownRemark.rawMarkdownBody
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className={PayStyles.infoButtonWrapper}>
                <Button
                  urlIsRelativePath={section.ctaButton.isUrlRelativePath}
                  openInNewTab={section.ctaButton.openInNewTab}
                  useSnowplowTracking={section.ctaButton.useSnowplowTracking}
                  text={section.ctaButton.text}
                  href={section.ctaButton.url}
                  buttonStyle="secondary"
                />
              </div>
            </section>
          );
        }
        if (section.style === 'isa-why-juno') {
          const [sidebar] = section.content;
          return (
            <section key={section.id} className={`grid-wrapper ${PayStyles.process}`}>
              <div className={PayStyles.processInfo}>
                <h2>{section.heading}</h2>
                <div
                  className={PayStyles.processExample}
                  dangerouslySetInnerHTML={{
                    __html: section.description.childMarkdownRemark.html
                  }}
                />
              </div>
              <div className={PayStyles.processDownload}>
                <h3>{sidebar.title}</h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: sidebar.bodyText.childMarkdownRemark.rawMarkdownBody
                  }}
                />
                <Button
                  urlIsRelativePath={sidebar.button.isUrlRelativePath}
                  openInNewTab={sidebar.button.openInNewTab}
                  useSnowplowTracking={sidebar.button.useSnowplowTracking}
                  text={sidebar.button.text}
                  href={sidebar.button.url}
                  buttonStyle="secondary"
                />
              </div>
            </section>
          );
        }
        if (section.style === 'isa-form-content') {
          return (
            <section key={section.id} className={`grid-wrapper ${PayStyles.isa}`}>
              <div className={PayStyles.isaInfo}>
                <h2>{section.heading}</h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: section.description.childMarkdownRemark.rawMarkdownBody
                  }}
                />
                <form
                  id="info-package"
                  action="https://go.junocollege.com/l/427982/2020-04-22/2k9tc2"
                  method="post"
                  onSubmit={handleSubmit}
                >
                  <label htmlFor="first-name">
                    <span className="sr-only">First Name</span>
                    <input
                      type="text"
                      id="first-name"
                      name="first-name"
                      placeholder="First Name*"
                      required
                    />
                  </label>
                  <label htmlFor="last-name">
                    <span className="sr-only">Last Name</span>
                    <input
                      type="text"
                      id="last-name"
                      name="last-name"
                      placeholder="Last Name*"
                      required
                    />
                  </label>
                  <label htmlFor="email">
                    <span className="sr-only">Email Address</span>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email Address*"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      required
                    />
                  </label>
                  <label htmlFor="city">
                    <span className="sr-only">City</span>
                    <input type="city" id="city" name="city" placeholder="City*" required />
                  </label>
                  <label htmlFor="phone">
                    <span className="sr-only">Phone Number</span>
                    <input type="tel" id="phone" name="phone" placeholder="Phone Number" />
                  </label>
                  <p className={PayStyles.smallNote}>
                    By submitting this form, you&rsquo;re subscribing to our newsletter and will be
                    the first to hear about community events and news. You may opt out at any time.
                  </p>
                  <input
                    type="submit"
                    value="Download Info Package"
                    id="isa-download-info-package"
                  />
                  <SnowplowHiddenFormInputs />
                </form>
              </div>
              <picture className={PayStyles.packageImageWrapper}>
                <GatsbyImage
                  image={section.image.gatsbyImageData}
                  alt={section.image.description}
                />
              </picture>
            </section>
          );
        }
        return null;
      })}
    </Layout>
  );
};

export default Isa;

export const queryIsa = graphql`
  query pageIsa {
    pageContent: contentfulPageGeneric(slug: { eq: "isa" }) {
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
          subheading
          childMarkdownRemark {
            html
            rawMarkdownBody
          }
        }
        introParagraph {
          introParagraph
        }
        image {
          description
          gatsbyImageData(width: 910, layout: CONSTRAINED)
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
        id
        style
        heading
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
          description
          gatsbyImageData(width: 910, layout: CONSTRAINED)
        }
        content {
          ... on ContentfulContentBlock {
            id
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
          }
        }
      }
    }
  }
`;
