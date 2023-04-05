import React from 'react';
import { graphql } from 'gatsby';
import SiteLink from '../components/SiteLink/SiteLink';

import Layout from '../components/Layout/Layout';
import Head from '../components/Head/Head';
import BlogCard from '../components/BlogCard/BlogCard';

import * as BlogStyles from './blog.module.scss';
import usePaginator from '../hooks/usePaginator';
import sluggify from '../helpers/sluggify';

const Blog = ({ pageContext, data, location }) => {
  const { filter } = pageContext;
  const { allPostsQuery, blogCategoriesQuery } = data;

  const allBlogPosts = allPostsQuery.edges.map((edge) => edge.node);
  const filteredPosts = allBlogPosts.filter((post) => {
    if (filter === 'allPosts') {
      return (
        post.alternateTemplate !== 'Partner Spotlight' &&
        post.alternateTemplate !== 'Career Posting'
      );
    }
    return post.alternateTemplate === filter;
  });

  const allBlogCategories = blogCategoriesQuery.edges.map((edge) => edge.node);

  const isBlogIndex = pageContext.slug !== '/case-studies';

  const [posts, loadMore, hasMoreItems] = usePaginator(filteredPosts, 11, 9);

  const metaContent = {
    title: 'Tech News, Student Stories, & Course Information Blog',
    description:
      'Juno College of Technology helps people launch and grow their careers, offering courses and Bootcamps in Web Development, Data Analytics, UX Design, and JavaScript.'
  };

  return (
    <Layout>
      <Head metaContent={metaContent} pagePath={location.pathname} />
      <div className="grid-wrapper">
        <div className={BlogStyles.titleBlock}>
          <h1 className={BlogStyles.title}>{isBlogIndex ? 'Blog & News' : 'Case Studies'}</h1>
        </div>
        {isBlogIndex && (
          <div className={BlogStyles.categories}>
            <h6 className={BlogStyles.explore}>Explore categories</h6>
            <ul className={BlogStyles.categoriesList}>
              <li>
                <SiteLink className={`filter-btn active ${BlogStyles.categoryLink}`} to="/blog/">
                  All Posts
                </SiteLink>
              </li>
              {allBlogCategories.map((category) => {
                const slug = sluggify(category.categoryName);
                return (
                  <li key={category.id}>
                    <SiteLink className={`filter-btn ${BlogStyles.categoryLink}`} to={`/${slug}/`}>
                      {category.categoryName}{' '}
                    </SiteLink>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <section className={BlogStyles.blogRoll}>
          {posts.map((post) => {
            return post.featuredPost === true ? (
              <section className={BlogStyles.featureSection} key={post.id}>
                <BlogCard post={post} slug={post.slug} isFeatured isBlogIndex={isBlogIndex} />
              </section>
            ) : (
              <BlogCard
                key={post.id}
                post={post}
                slug={post.slug}
                isFeatured={false}
                isBlogIndex={isBlogIndex}
              />
            );
          })}
        </section>
        <section className={BlogStyles.blogRoll}>
          {hasMoreItems && (
            <div className={BlogStyles.loadMore}>
              <button type="button" onClick={loadMore} className={BlogStyles.loadMoreButton}>
                Load more posts
              </button>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default Blog;

export const query = graphql`
  query {
    allPostsQuery: allContentfulBlogPost(
      filter: { showOnlyAsPreview: { eq: false } }
      sort: [{ featuredPost: DESC }, { postDate: DESC }]
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
          alternateTemplate
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
    blogCategoriesQuery: allContentfulBlogCategoryName {
      edges {
        node {
          id
          categoryName
        }
      }
    }
  }
`;
