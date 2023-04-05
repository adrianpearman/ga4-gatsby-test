/* eslint-disable react/no-danger */
import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';
import SiteLink from '../components/SiteLink/SiteLink';

import Layout from '../components/Layout/Layout';
import Head from '../components/Head/Head';
import Button from '../components/Button/Button';
import FormEmbed from '../components/FormEmbed/FormEmbed';

import CarouselArrow from '../components/SVG/CarouselArrow';
import TwitterIcon from '../components/SVG/TwitterIcon';
import LinkedinIcon from '../components/SVG/LinkedinIcon';
import FacebookIcon from '../components/SVG/FacebookIcon';

import * as PostStyles from './blog-post-partner.module.scss';

const BlogPartnerTemplate = ({ pageContext, data, location }) => {
  const { slug, totalPosts } = pageContext;
  const { postContent, pageTemplate } = data;

  const { metaContent } = postContent;

  return (
    <Layout
      pageSlug={postContent.embeddedForm?.type !== 'dataNewsletter' ? postContent.slug : null}
    >
      <Head metaContent={metaContent} pagePath={location.pathname}>
        {postContent.showOnlyAsPreview && <meta name="robots" content="noindex" />}
      </Head>

      <section className={`grid-wrapper ${PostStyles.hero}`}>
        <GatsbyImage
          image={postContent.featuredImage.gatsbyImageData}
          className={PostStyles.heroImage}
          alt={
            postContent.featuredImage.description
              ? postContent.featuredImage.description
              : postContent.featuredImage.title
          }
        />

        {totalPosts >= 5 && (
          <SiteLink to="/case-studies/" className={PostStyles.back}>
            <CarouselArrow direction="previous" type="secondary" transparentBackground />
            Back to Case Studies
          </SiteLink>
        )}

        <div className={PostStyles.titleContainer}>
          {postContent.h1Heading === postContent.mainVisualHeading ? (
            <h1 className={`${PostStyles.postTitle} title-blog-full`}>{postContent.h1Heading}</h1>
          ) : (
            <>
              <h1 className={PostStyles.seoHeading}>{postContent.h1Heading}</h1>
              <h2 className={`${PostStyles.postTitle} title-blog-full`}>
                {postContent.mainVisualHeading}
              </h2>
            </>
          )}
        </div>

        {postContent.secondaryImage && (
          <div className={PostStyles.secondaryImageContainer}>
            <GatsbyImage
              image={postContent.secondaryImage.gatsbyImageData}
              alt={
                postContent.secondaryImage.description
                  ? postContent.secondaryImage.description
                  : postContent.secondaryImage.title
              }
              className={PostStyles.subjectImage}
            />
          </div>
        )}

        <div className={PostStyles.introContainer}>
          <div className={PostStyles.metaContainer}>
            <p className={PostStyles.metaText}>
              {postContent.blogPost.childMarkdownRemark.timeToRead} min read
            </p>
            <div className={PostStyles.shareBlock}>
              <p className={PostStyles.metaText}>Share this post</p>
              <ul className={PostStyles.socialLinks}>
                <li>
                  <TwitterShareButton
                    url={`https://junocollege.com${slug}`}
                    title={`${postContent.mainVisualHeading} via @junocollege`}
                  >
                    <TwitterIcon className={PostStyles.socialIcon} />
                  </TwitterShareButton>
                </li>
                <li>
                  <LinkedinShareButton url={`https://junocollege.com${slug}`}>
                    <LinkedinIcon className={PostStyles.socialIcon} />
                  </LinkedinShareButton>
                </li>
                <li>
                  <FacebookShareButton
                    url={`https://junocollege.com${slug}`}
                    quote={`${postContent.mainVisualHeading} via Juno College`}
                  >
                    <FacebookIcon className={PostStyles.socialIcon} />
                  </FacebookShareButton>
                </li>
              </ul>
            </div>
          </div>

          {postContent.postIntro && (
            <div
              className={PostStyles.introText}
              dangerouslySetInnerHTML={{
                __html: postContent.postIntro.childMarkdownRemark.html
              }}
            />
          )}
        </div>

        <div className={PostStyles.categoryContainer}>
          <p>{postContent.alternateTemplate}</p>
        </div>
      </section>

      {postContent.postIntro && (
        <section className={`grid-wrapper ${PostStyles.about}`}>
          <div className={PostStyles.aboutBackground} />
          {postContent.hiringPartnerImage && (
            <div className={PostStyles.hiringPartnerImage}>
              <GatsbyImage
                image={postContent.hiringPartnerImage.gatsbyImageData}
                alt={
                  postContent.hiringPartnerImage.description
                    ? postContent.hiringPartnerImage.description
                    : postContent.hiringPartnerImage.title
                }
              />
            </div>
          )}
          <div className={PostStyles.aboutContent}>
            <div className={PostStyles.infoBoxHeaderRow}>
              <h2 className={PostStyles.infoBoxHeader}>About {postContent.hiringPartnerName}</h2>
              <a
                href={postContent.hiringPartnerUrl}
                className="link-arrow link-arrow-red"
                target="_blank"
                rel="noopener noreferrer"
              >
                View website
              </a>
            </div>
            <ul>
              {postContent.hiringPartnerStatus && (
                <li>
                  <h6>Company Details</h6>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: postContent.hiringPartnerStatus.childMarkdownRemark.rawMarkdownBody
                    }}
                  />
                </li>
              )}
              {postContent.hiringPartnerFoundedDate && (
                <li>
                  <h6>Date Founded</h6>
                  <p>{postContent.hiringPartnerFoundedDate}</p>
                </li>
              )}
              {postContent.hiringPartnerLocations && (
                <li>
                  <h6>Locations</h6>
                  <p>{postContent.hiringPartnerLocations}</p>
                </li>
              )}
            </ul>
          </div>
        </section>
      )}

      <section
        className={`grid-wrapper ${PostStyles.partnerPost} ${
          postContent.postIntro ? '' : PostStyles.noIntro
        }`}
      >
        <div className={PostStyles.shareLinksVertical}>
          <p>
            &mdash; Share:{' '}
            <TwitterShareButton
              url={`https://junocollege.com${slug}/`}
              title={`${postContent.mainVisualHeading} via @JunoCollege`}
            >
              <span className={PostStyles.shareButtonText}>Twitter</span>{' '}
            </TwitterShareButton>
            &mdash;{' '}
            <LinkedinShareButton url={`https://junocollege.com${slug}/`}>
              <span className={PostStyles.shareButtonText}>LinkedIn</span>{' '}
            </LinkedinShareButton>
            &mdash;{' '}
            <FacebookShareButton
              url={`https://junocollege.com${slug}/`}
              quote={`${postContent.mainVisualHeading} via @JunoCollege`}
            >
              <span className={PostStyles.shareButtonText}>Facebook</span>{' '}
            </FacebookShareButton>
          </p>
        </div>

        <article className={PostStyles.post}>
          <div
            className={PostStyles.content}
            dangerouslySetInnerHTML={{
              __html: postContent.blogPost.childMarkdownRemark.html
            }}
          />

          {postContent.embeddedForm && (
            <FormEmbed
              content={postContent.embeddedForm}
              className={PostStyles.embeddedForm}
              location={location}
            />
          )}
        </article>
      </section>

      <section className={`grid-wrapper ${PostStyles.learnMore}`}>
        <div className={PostStyles.learnMoreContent}>
          <h2 className={PostStyles.learnMoreSubhead}>{pageTemplate.bannerTitle}</h2>
          <Button
            urlIsRelativePath={false}
            href={pageTemplate.bannerLinkUrl}
            buttonStyle="secondarywhite"
            text={pageTemplate.bannerLinkText}
          />
        </div>
      </section>
    </Layout>
  );
};

export default BlogPartnerTemplate;

export const query = graphql`
  query ($id: String!) {
    postContent: contentfulBlogPost(id: { eq: $id }) {
      h1Heading
      mainVisualHeading
      metaContent {
        title
        description {
          description
        }
        image {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
      id
      featuredImage {
        title
        description
        gatsbyImageData(layout: FULL_WIDTH)
      }
      secondaryImage {
        title
        description
        gatsbyImageData(width: 850, layout: CONSTRAINED)
      }
      alternateTemplate
      author {
        alumnus
        name
        jobBeforeJuno
        jobAfterHY
        jobCurrent
        jobCurrent
        jobCurrentCompany
        jobCurrentCompanyLink
        previousEducation
        linkedin
        github
        twitter
        website
        headshot {
          title
          description
          gatsbyImageData(width: 450, layout: CONSTRAINED)
        }
      }
      blogCategory
      blogColourTheme
      featuredPost
      blogPost {
        childMarkdownRemark {
          excerpt(pruneLength: 150)
          timeToRead
          html
        }
      }
      postConclusion {
        postConclusion
      }
      postDate(formatString: "MMMM DD, YYYY")
      postIntro {
        childMarkdownRemark {
          html
        }
      }
      relatedPosts {
        id
        slug
        mainVisualHeading
        postDate(formatString: "MMMM DD, YYYY")
      }
      showOnlyAsPreview
      positionFilled
      embeddedForm {
        type
        formHandlerLink
        heading
        description {
          childMarkdownRemark {
            rawMarkdownBody
          }
        }
        submitButtonText
        successMessage {
          childMarkdownRemark {
            html
          }
        }
      }
      hiringPartnerName
      hiringPartnerUrl
      hiringPartnerFoundedDate
      hiringPartnerLocations
      hiringPartnerStatus {
        childMarkdownRemark {
          rawMarkdownBody
        }
      }
      hiringPartnerImage {
        title
        description
        gatsbyImageData(width: 850, layout: CONSTRAINED)
      }
      tags
    }
    pageTemplate: contentfulBlogTemplateContent {
      bannerTitle
      bannerLinkText
      bannerLinkUrl
    }
  }
`;
