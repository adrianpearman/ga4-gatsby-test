import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import Stamp from '../Stamp/Stamp';
import SiteLink from '../SiteLink/SiteLink';

import * as BlogCardStyles from './BlogCard.module.scss';
import camelCase from '../../helpers/camelCase';
import OuterStamp from '../../assets/images/stamps/stamp-blog-featured-outer.svg';
import InnerStamp from '../../assets/images/stamps/stamp-blog-featured-innerfixed.svg';
import CircleHeadshot from '../CircleHeadshot/CircleHeadshot';

const BlogCard = ({ post, slug, isFeatured, isBlogIndex }) => {
  let cardColour = '';
  let arrowColour = '';
  if (post.blogColourTheme) {
    cardColour = camelCase(post.blogColourTheme);
    if (cardColour === 'junoRed' || cardColour === 'evergreen' || cardColour === 'violetGray')
      arrowColour = 'link-arrow-white';
  }

  const postPath = () => {
    let path;
    if (post.alternateTemplate === 'Career Posting') {
      path = `/careers/${slug}/`;
    } else if (post.alternateTemplate === 'Partner Spotlight') {
      path = `/case-studies/${slug}/`;
    } else {
      path = `/blog/${slug}/`;
    }
    return path;
  };

  return (
    <div
      className={`${
        post.featuredPost === true && isFeatured ? BlogCardStyles.cardFeatured : BlogCardStyles.card
      } ${BlogCardStyles[cardColour]}`}
    >
      <GatsbyImage
        image={post.featuredImage.gatsbyImageData}
        className={BlogCardStyles.featuredImage}
        alt={
          post.featuredImage.description ? post.featuredImage.description : post.featuredImage.title
        }
        loading={isFeatured ? 'eager' : 'lazy'}
      />
      <div className={BlogCardStyles.cardColour} />

      <div className={BlogCardStyles.content}>
        <div>
          <SiteLink className={`blog-post-title blog-post-title-${cardColour}`} to={postPath()}>
            {post.mainVisualHeading}
          </SiteLink>
          <SiteLink
            className={`${BlogCardStyles.readMore} link-arrow ${arrowColour}`}
            to={postPath()}
          >
            Read more
          </SiteLink>
        </div>

        <div className={BlogCardStyles.authorBlock}>
          {post.author.headshot && (
            <CircleHeadshot
              imageData={post.author.headshot.gatsbyImageData}
              altText={
                post.author.headshot.description
                  ? post.author.headshot.description
                  : post.author.headshot.title
              }
              size="50px"
              className={BlogCardStyles.authorImage}
            />
          )}
          <div>
            {post.blogCategory === 'Juno News' && (
              <p className={BlogCardStyles.author}>Juno News: {post.postDate}</p>
            )}
            <p className={BlogCardStyles.author}>By {post.author.name}</p>
          </div>
        </div>
        {post.featuredPost === true && isFeatured && (
          <div className={BlogCardStyles.stampWrapper}>
            <Stamp OuterStamp={OuterStamp} InnerStamp={InnerStamp} />
          </div>
        )}
      </div>

      {isBlogIndex && (
        <div className={BlogCardStyles.category}>
          {post.blogCategory && <p>{post.blogCategory}</p>}
        </div>
      )}
    </div>
  );
};

export default BlogCard;
