/* eslint-disable react/no-danger */
import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

import * as numbersStyles from './ByTheNumbers.module.scss';

const ByTheNumbers = ({ numbersData }) => {
  return (
    <section className={`grid-wrapper ${numbersStyles.numbers}`}>
      <h6 className={numbersStyles.sectionTitle}>{numbersData.heading}</h6>
      <div className={numbersStyles.statContainer}>
        {numbersData.content.map((stat) => {
          return (
            <div className={numbersStyles.stat} key={stat.id}>
              <h1>{stat.title}</h1>
              <p
                dangerouslySetInnerHTML={{
                  __html: stat.bodyText.childMarkdownRemark.html
                }}
              />
            </div>
          );
        })}
      </div>
      <div className={numbersStyles.infoContainer}>
        <div
          className={numbersStyles.info}
          dangerouslySetInnerHTML={{
            __html: numbersData.description.childMarkdownRemark.html
          }}
        />
        <GatsbyImage
          image={numbersData.image.gatsbyImageData}
          className={numbersStyles.infoImage}
          alt={numbersData.image.description || ''}
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default ByTheNumbers;
