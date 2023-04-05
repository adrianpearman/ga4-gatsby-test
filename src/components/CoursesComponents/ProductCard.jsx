import React from 'react';
import SiteLink from '../SiteLink/SiteLink';

import * as ProductCardStyles from './ProductCard.module.scss';

const ProductCard = ({ product, type = 'sand' }) => {
  return (
    <div className={`${ProductCardStyles.productCard} ${ProductCardStyles[type]}`}>
      <h3 className={ProductCardStyles.title}>{product.name}</h3>
      {product.type === 'course' && (
        <p className={ProductCardStyles.skillLevel}>
          {product.skillLevel === 'Beginner'
            ? `${product.skillLevel}-friendly`
            : `${product.skillLevel} level`}
        </p>
      )}
      <p
        className={ProductCardStyles.description}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: product.description.childMarkdownRemark.rawMarkdownBody
        }}
      />
      <SiteLink to={`/${product.type}/${product.slug}/`} className="link-arrow">
        Learn more
      </SiteLink>
    </div>
  );
};

export default ProductCard;
