import React from 'react';
import { GatsbyImage } from "gatsby-plugin-image";
import Newsletter from '../Newsletter/Newsletter';
import * as RequestYourCityStyles from './RequestYourCity.module.scss';

const RequestYourCity = ({ desktopImage, tabletImage, backgroundColor }) => {
  return (
    <section className={RequestYourCityStyles.requestYourCity}>
      <GatsbyImage
        image={desktopImage}
        alt=""
        role="presentation"
        className={RequestYourCityStyles.desktopImage} />

      <GatsbyImage
        image={tabletImage}
        alt=""
        role="presentation"
        className={RequestYourCityStyles.tabletImage} />

      <div className={RequestYourCityStyles.newsletterWrapper}>
        <Newsletter background={backgroundColor} />
      </div>
    </section>
  );
};

export default RequestYourCity;
