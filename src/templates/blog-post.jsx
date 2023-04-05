/* eslint-disable react/no-danger */
import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';
import SiteLink from '../components/SiteLink/SiteLink';

import Layout from '../components/Layout/Layout';
import Head from '../components/Head/Head';
import RelatedPosts from '../components/RelatedPosts/RelatedPosts';
import GetStartedForFree from '../components/GetStartedForFree/GetStartedForFree';
import FormEmbed from '../components/FormEmbed/FormEmbed';

import TwitterIcon from '../components/SVG/TwitterIcon';
import LinkedinIcon from '../components/SVG/LinkedinIcon';
import FacebookIcon from '../components/SVG/FacebookIcon';

import * as PostStyles from './blog-post.module.scss';
import CarouselArrow from '../components/SVG/CarouselArrow';
import sluggify from '../helpers/sluggify';
import CircleHeadshot from '../components/CircleHeadshot/CircleHeadshot';

const BlogTemplate = ({ pageContext, data, location }) => {
  const { slug } = pageContext;

  const { postContent, allBlogCategoriesQuery } = data;

  const allBlogCategoryNames = allBlogCategoriesQuery.edges.map((edge) => edge.node.categoryName);
  const blogCategoryNameIsLive = allBlogCategoryNames.includes(postContent.blogCategory);

  const findBlogCategoryLink = (category) => {
    if (postContent.alternateTemplate === 'Career Posting') {
      return 'careers#openpositions';
    }
    if (blogCategoryNameIsLive) {
      return sluggify(category);
    }
    return 'blog';
  };

  let backLinkPath;
  let backLinkText;

  if (postContent.alternateTemplate === 'Career Posting') {
    backLinkPath = 'careers#openpositions';
    backLinkText = 'Back to Careers';
  } else if (postContent.showOnlyAsPreview) {
    backLinkPath = 'ajsdhfiauebicoisaoiweoinsksallsjkd-blog-preview';
    backLinkText = 'Back to Previews';
  } else if (postContent.blogCategory) {
    backLinkPath = findBlogCategoryLink(postContent.blogCategory);
    backLinkText = `Back to ${blogCategoryNameIsLive ? postContent.blogCategory : 'Blog'}`;
  } else {
    backLinkPath = 'blog';
    backLinkText = 'Back to Blog';
  }

  const blogCategoryText =
    (postContent.alternateTemplate === 'Career Posting' && 'Career Posting') ||
    (blogCategoryNameIsLive && postContent.blogCategory) ||
    'Blog';

  const positionFilledText = postContent.positionFilled ? '[POSITION FILLED]' : '';

  const { title, description, image } = postContent.metaContent;

  const adjustedMetaContent = {
    title: `${positionFilledText} ${title}`,
    description,
    image
  };

  return (
    <Layout
      showFixedApplyNowButton={postContent.alternateTemplate !== 'Career Posting'}
      pageSlug={postContent.embeddedForm?.type !== 'dataNewsletter' ? postContent.slug : null}
    >
      <Head metaContent={adjustedMetaContent} pagePath={location.pathname}>
        {postContent.showOnlyAsPreview && <meta name="robots" content="noindex" />}
      </Head>
      <section className={`grid-wrapper ${PostStyles.intro}`}>
        <SiteLink to={`/${backLinkPath}/`} className={PostStyles.back}>
          <CarouselArrow direction="previous" type="secondary" transparentBackground />
          {backLinkText}
        </SiteLink>
        {postContent.h1Heading === postContent.mainVisualHeading ? (
          <h1 className={`${PostStyles.postTitle} title-blog-full`}>
            {positionFilledText} {postContent.h1Heading}
          </h1>
        ) : (
          <>
            <h1 className={PostStyles.seoHeading}>{postContent.h1Heading}</h1>
            <h2 className={`${PostStyles.postTitle} title-blog-full`}>
              {positionFilledText} {postContent.mainVisualHeading}
            </h2>
          </>
        )}
      </section>

      <section className={`grid-wrapper ${PostStyles.post}`}>
        <GatsbyImage
          image={postContent.featuredImage.gatsbyImageData}
          className={PostStyles.featureImage}
          alt={
            postContent.featuredImage.description
              ? postContent.featuredImage.description
              : postContent.featuredImage.title
          }
          objectFit="contain"
        />
        <article>
          <div className={PostStyles.metaBlock}>
            {postContent.blogCategory === 'Juno News' && (
              <p className={PostStyles.date}>{postContent.postDate}</p>
            )}
            <p className={PostStyles.author}>
              {blogCategoryNameIsLive && `Blog — `}
              <SiteLink to={`/${findBlogCategoryLink(postContent.blogCategory)}/`}>
                {blogCategoryText}
              </SiteLink>{' '}
              &mdash; {positionFilledText} {postContent.h1Heading}
            </p>
            <p className={PostStyles.readTime}>
              {postContent.blogPost.childMarkdownRemark.timeToRead} min read
            </p>
          </div>

          <div className={PostStyles.authorBlock}>
            {postContent.author.headshot && (
              <CircleHeadshot
                imageData={postContent.author.headshot.gatsbyImageData}
                altText={
                  postContent.author.headshot.description
                    ? postContent.author.headshot.description
                    : postContent.author.headshot.title
                }
                className={PostStyles.authorImage}
              />
            )}
            <div>
              <p className={PostStyles.author}>By {postContent.author.name}</p>
              <p className={PostStyles.author}>
                {postContent.author.jobCurrent && postContent.author.jobCurrent}
              </p>
              <p className={PostStyles.author}>
                {postContent.author.jobCurrentCompany && postContent.author.jobCurrentCompany}
              </p>
            </div>
          </div>

          <div className={PostStyles.shareBlock}>
            &nbsp;
            <p className={PostStyles.author}>Share this post</p>
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

        <div className={PostStyles.shareLinksVertical}>
          <p>
            &mdash; Share:{' '}
            <TwitterShareButton
              url={`https://junocollege.com${slug}/`}
              title={`${postContent.mainVisualHeading} via @JunoCollege`}
            >
              Twitter{' '}
            </TwitterShareButton>
            &mdash;{' '}
            <LinkedinShareButton url={`https://junocollege.com${slug}/`}>
              LinkedIn{' '}
            </LinkedinShareButton>
            &mdash;{' '}
            <FacebookShareButton
              url={`https://junocollege.com${slug}/`}
              quote={`${postContent.mainVisualHeading} via @JunoCollege`}
            >
              Facebook{' '}
            </FacebookShareButton>
          </p>
        </div>

        {postContent.relatedPosts && <RelatedPosts posts={postContent.relatedPosts} />}
      </section>

      <GetStartedForFree />
    </Layout>
  );
};

export default BlogTemplate;

export const query = graphql`
  query ($id: String!) {
    postContent: contentfulBlogPost(id: { eq: $id }) {
      slug
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
        gatsbyImageData(width: 810, layout: FULL_WIDTH)
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
          gatsbyImageData(width: 85, layout: CONSTRAINED, quality: 100)
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
        postIntro
      }
      relatedPosts {
        id
        slug
        mainVisualHeading
        blogCategory
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
    allBlogCategoriesQuery: allContentfulBlogCategoryName {
      edges {
        node {
          categoryName
        }
      }
    }
  }
`;
