import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

import usePaginator from '../../hooks/usePaginator';

import * as CompanyLogosStyles from './CompanyLogos.module.scss';

const CompanyLogos = ({ className, allLogos, sectionHeading, numFirstVisible = 14, id = '' }) => {
  const showAll = allLogos.length - numFirstVisible;
  const [visibleLogos, loadMore, hasMoreItems] = usePaginator(allLogos, numFirstVisible, showAll);

  const renderLogoImage = (logo) => {
    if (logo.file.gatsbyImageData) {
      return <GatsbyImage image={logo.file.gatsbyImageData} alt={logo.company} loading="lazy" />;
    }
    return <img src={logo.file.url} alt={logo.company} loading="lazy" />;
  };

  return (
    <section id={id} className={`${CompanyLogosStyles.companyLogos} grid-wrapper ${className}`}>
      {sectionHeading && <h3>{sectionHeading}</h3>}

      <ul className={CompanyLogosStyles.logoWrapper}>
        {visibleLogos.map((logo) => {
          return (
            <li key={logo.id} className={CompanyLogosStyles.individualCompany}>
              {logo.companyURL ? (
                <a href={logo.companyURL} target="_blank" rel="noopener noreferrer">
                  {renderLogoImage(logo)}
                </a>
              ) : (
                <>{renderLogoImage(logo)}</>
              )}
            </li>
          );
        })}
      </ul>
      {hasMoreItems && (
        <div className={CompanyLogosStyles.loadMore}>
          <button type="button" onClick={loadMore}>
            See more
          </button>
        </div>
      )}
    </section>
  );
};

export default CompanyLogos;
