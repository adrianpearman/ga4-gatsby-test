/* eslint-disable react/no-danger */
import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';
import SiteLink from '../components/SiteLink/SiteLink';

import Layout from '../components/Layout/Layout';
import Head from '../components/Head/Head';
import Button from '../components/Button/Button';
import CarouselArrow from '../components/SVG/CarouselArrow';
import FormEmbed from '../components/FormEmbed/FormEmbed';
import CarouselSlider from '../components/CarouselSlider/CarouselSlider';

import TwitterIcon from '../components/SVG/TwitterIcon';
import LinkedinIcon from '../components/SVG/LinkedinIcon';
import FacebookIcon from '../components/SVG/FacebookIcon';

import * as PostStyles from './blog-post-journey.module.scss';

const BlogJourneyTemplate = ({ pageContext, data, location }) => {
  const { slug } = pageContext;
  const { postContent, reviews, pageTemplate } = data;

  const splitName = postContent.subject.name.split(' ');
  const firstName = splitName[0];

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
          alt={postContent.featuredImage.description}
        />

        <SiteLink to="/student-stories/" className={PostStyles.back}>
          <CarouselArrow direction="previous" type="secondary" transparentBackground />
          Back to Student Stories
        </SiteLink>

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

        {postContent.subject && (
          <div className={PostStyles.headshotContainer}>
            {postContent.subject.headshot && (
              <GatsbyImage
                image={postContent.subject.headshot.gatsbyImageData}
                alt={
                  postContent.subject.headshot.description
                    ? postContent.subject.headshot.description
                    : postContent.subject.headshot.title
                }
                className={PostStyles.authorImage}
              />
            )}
          </div>
        )}

        <div className={PostStyles.introContainer}>
          <div className={PostStyles.metaContainer}>
            <p className={PostStyles.metaText}>
              {postContent.blogPost.childMarkdownRemark.timeToRead} min read
            </p>
            <p className={PostStyles.metaText}>Written by {postContent.author.name}</p>
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
          <p>{postContent.blogCategory}</p>
        </div>
      </section>

      {postContent.postIntro && (
        <section className={`grid-wrapper ${PostStyles.about}`}>
          <div className={PostStyles.aboutBackground} />
          {postContent.secondaryImage && (
            <div className={PostStyles.studentImage}>
              <GatsbyImage
                image={postContent.secondaryImage.gatsbyImageData}
                alt={
                  postContent.secondaryImage.description
                    ? postContent.secondaryImage.description
                    : postContent.secondaryImage.title
                }
                className={PostStyles.authorImage}
              />
            </div>
          )}
          <div className={PostStyles.aboutContent}>
            <h2 className={PostStyles.studentName}>About {firstName}’s Journey</h2>
            <ul>
              {postContent.subject.previousEducation && (
                <li>
                  <h6>Previous Education</h6>
                  <p>{postContent.subject.previousEducation}</p>
                </li>
              )}
              {postContent.subject.jobBeforeJuno && (
                <li>
                  <h6>Before Juno</h6>
                  <p>{postContent.subject.jobBeforeJuno}</p>
                </li>
              )}
              {postContent.subject.jobAfterHY && (
                <li>
                  <h6>After Juno</h6>
                  <div>
                    <p>{postContent.subject.jobAfterHY}</p>
                  </div>
                </li>
              )}
              {postContent.subject.jobCurrent && (
                <li>
                  <h6>Currently</h6>
                  <div>
                    <p>{postContent.subject.jobCurrent}</p>
                    {postContent.subject.jobCurrentCompany &&
                      postContent.subject.jobCurrentCompanyLink && (
                        <p>
                          <a href={postContent.subject.jobCurrentCompanyLink}>
                            {postContent.subject.jobCurrentCompany}
                          </a>
                        </p>
                      )}
                  </div>
                </li>
              )}
            </ul>
          </div>
        </section>
      )}

      <section
        className={`grid-wrapper ${PostStyles.journeyPost} ${
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

        <article
          dangerouslySetInnerHTML={{
            __html: postContent.blogPost.childMarkdownRemark.html
          }}
        />
      </section>

      {postContent.postConclusion && (
        <section className={`grid-wrapper ${PostStyles.journeyPost} ${PostStyles.conclusion}`}>
          <article>
            <div
              className={PostStyles.conclusion}
              dangerouslySetInnerHTML={{
                __html: postContent.postConclusion.childMarkdownRemark.html
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
      )}

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

      <section className={`grid-wrapper ${PostStyles.reviewCarousel}`}>
        <CarouselSlider
          sliderCards={reviews.testimonials}
          cardType="testimonialStandard"
          numberOfPreviewsVisible={2}
        />
      </section>
    </Layout>
  );
};

export default BlogJourneyTemplate;

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
          gatsbyImageData
        }
      }
      subject {
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
        project {
          projectTitle
          projectDescription {
            childMarkdownRemark {
              rawMarkdownBody
            }
          }
          projectUrl
          projectImageThumbnail {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        headshot {
          title
          description
          gatsbyImageData(width: 85, layout: FULL_WIDTH, quality: 100)
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
        childMarkdownRemark {
          html
        }
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
      tags
    }
    reviews: contentfulProduct(contentful_id: { eq: "1DcicqeC3TPJsJ4xZlDoYN" }) {
      testimonials {
        id
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
          jobAfterHY
          headshot {
            gatsbyImageData(width: 300, layout: CONSTRAINED)
          }
        }
      }
    }
    pageTemplate: contentfulBlogTemplateContent {
      bannerTitle
      bannerLinkText
      bannerLinkUrl
    }
  }
`;
