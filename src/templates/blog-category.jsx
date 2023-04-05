import React from 'react';
import { graphql } from 'gatsby';
import SiteLink from '../components/SiteLink/SiteLink';

import Layout from '../components/Layout/Layout';
import Head from '../components/Head/Head';
import BlogCard from '../components/BlogCard/BlogCard';
import CarouselArrow from '../components/SVG/CarouselArrow';

import sluggify from '../helpers/sluggify';
import usePaginator from '../hooks/usePaginator';

import * as BlogStyles from './blog-category.module.scss';

const BlogCategory = ({ data, location }) => {
  const { categoryContent, allBlogPostsQuery, allBlogCategoriesQuery } = data;
  const filteredPosts = allBlogPostsQuery.edges
    .map((edge) => edge.node)
    .filter((post) => post.blogCategory === categoryContent.categoryName);

  const allBlogCategories = allBlogCategoriesQuery.edges.map((edge) => edge.node);

  const [postings, loadsMore, hasMoreItems] = usePaginator(filteredPosts, 10, 9);

  const metaContent = {
    title: categoryContent.categoryMetaTitle
  };

  return (
    <Layout>
      <Head metaContent={metaContent} pagePath={location.pathname} />
      <section className={`grid-wrapper ${BlogStyles.introCategory}`}>
        <div className={BlogStyles.titleBlock}>
          <h1 className={BlogStyles.titleFilter}>{categoryContent.categoryName}</h1>
          <p
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: categoryContent.categoryDescription.childMarkdownRemark.rawMarkdownBody
            }}
          />
        </div>
        <div className={BlogStyles.categories}>
          <h6 className={BlogStyles.explore}>Explore categories</h6>
          <ul className={BlogStyles.categoriesList}>
            <li>
              <SiteLink className={`filter-btn-alt ${BlogStyles.categoryLink}`} to="/blog/">
                All Posts
              </SiteLink>
            </li>
            {allBlogCategories.map((category) => (
              <li key={category.id}>
                <SiteLink
                  className={`filter-btn-alt ${BlogStyles.categoryLink} ${
                    categoryContent.categoryName === category.categoryName ? 'active' : ''
                  }`}
                  to={`/${sluggify(category.categoryName)}/`}
                >
                  {category.categoryName}
                </SiteLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="grid-wrapper">
        <section className={BlogStyles.blogRoll}>
          <section className={BlogStyles.linkContainer}>
            <SiteLink className={`filter-btn ${BlogStyles.backToAll}`} to="/blog/">
              <CarouselArrow direction="previous" type="secondary" transparentBackground />
              Back to all posts
            </SiteLink>
          </section>
          {postings.map((post) => (
            <BlogCard key={post.id} post={post} slug={post.slug} isFeatured={false} isBlogIndex />
          ))}
          {hasMoreItems && (
            <div className={BlogStyles.loadMore}>
              <button type="button" onClick={loadsMore} className={BlogStyles.loadMoreButton}>
                Load more posts
              </button>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default BlogCategory;

export const query = graphql`
  query ($id: String!) {
    categoryContent: contentfulBlogCategoryName(id: { eq: $id }) {
      categoryName
      categoryMetaTitle
      categoryDescription {
        childMarkdownRemark {
          rawMarkdownBody
        }
      }
    }
    allBlogPostsQuery: allContentfulBlogPost(
      sort: { postDate: DESC }
      filter: { showOnlyAsPreview: { eq: false } }
    ) {
      edges {
        node {
          id
          slug
          mainVisualHeading
          author {
            name
            headshot {
              title
              description
              gatsbyImageData(width: 100, layout: CONSTRAINED)
            }
          }
          blogCategory
          blogColourTheme
          featuredPost
          postDate(formatString: "MMMM DD, YYYY")
          featuredImage {
            title
            description
            gatsbyImageData(layout: FULL_WIDTH, quality: 100)
          }
        }
      }
    }
    allBlogCategoriesQuery: allContentfulBlogCategoryName {
      edges {
        node {
          id
          categoryName
        }
      }
    }
  }
`;
