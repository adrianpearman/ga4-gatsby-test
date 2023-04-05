import React from 'react';
import SiteLink from '../SiteLink/SiteLink';

import * as RelatedStyles from './RelatedPosts.module.scss';

const RelatedPosts = ({ posts }) => {
  return (
    <div className={RelatedStyles.related}>
      <h2 className={`${RelatedStyles.title} related-posts`}>Related posts</h2>
      {posts.map((post) => (
        <div key={post.id} className={RelatedStyles.postBlock}>
          {post.blogCategory === 'Juno News' && (
            <p className={RelatedStyles.date}>
              {post.blogCategory}: {post.postDate}
            </p>
          )}
          <SiteLink className={RelatedStyles.relatedTitle} to={`/blog/${post.slug}/`}>
            {post.mainVisualHeading}
          </SiteLink>
        </div>
      ))}
    </div>
  );
};

export default RelatedPosts;
