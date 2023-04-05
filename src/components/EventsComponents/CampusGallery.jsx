import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

import Button from '../Button/Button';
import Stamp from '../Stamp/Stamp';

import stampInner from '../../assets/images/events/stamp-formerlyhackeryou-innerfixed.svg';
import stampOuter from '../../assets/images/events/stamp-formerlyhackeryou-outer.svg';

import * as CampusGalleryStyles from './CampusGallery.module.scss';

const CampusGallery = ({ title, description, button }) => {
  return (
    <div className={`${CampusGalleryStyles.wrapper} grid-wrapper`}>
      {/* HERO CAMPUS IMAGES */}
      <figure className={CampusGalleryStyles.imageContainer}>
        <StaticImage
          src="../../assets/images/events/campustour-4.jpg"
          className={CampusGalleryStyles.image}
          alt="A gallery of the Juno College of Technology space."
          loading="lazy"
        />

        <StaticImage
          src="../../assets/images/events/campustour-4-square.jpg"
          className={CampusGalleryStyles.imageSquare}
          alt="A gallery of the Juno College of Technology space."
          loading="lazy"
        />

        {/* STAMP */}
        <div className={CampusGalleryStyles.stampWrapper}>
          <Stamp OuterStamp={stampOuter} InnerStamp={stampInner} />
        </div>
      </figure>

      {/* VISIT OUR CAMPUS */}
      <div className={CampusGalleryStyles.visit}>
        <h3>{title}</h3>
        <p>{description}</p>
        <Button
          urlIsRelativePath={button.isUrlRelativePath}
          href={button.url}
          text={button.text}
          openInNewTab={button.openInNewTab}
          useSnowplowTracking={button.useSnowplowTracking}
          buttonStyle="secondary"
          id="events-page-image"
        />
      </div>
    </div>
  );
};

export default CampusGallery;
