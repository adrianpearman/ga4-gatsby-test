import React from 'react';

import ExternalLinkIcon from '../SVG/ExternalLinkIcon';
import TwitterIcon from '../SVG/TwitterIcon';
import LinkedinIcon from '../SVG/LinkedinIcon';
import GithubIcon from '../SVG/GithubIcon';
import CircleHeadshot from '../CircleHeadshot/CircleHeadshot';

import * as AlumniCardStyles from './AlumniCard.module.scss';
import sluggify from '../../helpers/sluggify';

const AlumniCard = ({ alumnus, type }) => {
  let gradQuotes = [];
  if (alumnus.testimonial) {
    gradQuotes = alumnus.testimonial.filter((testimonial) => testimonial.type === 'graduation');
  }

  const formattedSocialLinks = [];

  if (alumnus.website) {
    formattedSocialLinks.push({
      title: 'portfolio site',
      url: alumnus.website,
      Icon: ExternalLinkIcon
    });
  }
  if (alumnus.twitter) {
    formattedSocialLinks.push({
      title: 'twitter profile',
      url: `https://twitter.com/${alumnus.twitter}`,
      Icon: TwitterIcon
    });
  }
  if (alumnus.linkedin) {
    formattedSocialLinks.push({
      title: 'linkedin profile',
      url: alumnus.linkedin,
      Icon: LinkedinIcon
    });
  }
  if (alumnus.github) {
    formattedSocialLinks.push({
      title: 'github profile',
      url: `https://github.com/${alumnus.github}`,
      Icon: GithubIcon
    });
  }

  return (
    <li className={AlumniCardStyles.card}>
      <div className={AlumniCardStyles.alumniInfo}>
        {/* Nameplate common to all alumni cards */}
        <div className={AlumniCardStyles.nameplate}>
          {alumnus.headshot && (
            <CircleHeadshot
              imageData={alumnus.headshot.gatsbyImageData}
              altText={alumnus.name}
              size="65px"
              className={AlumniCardStyles.headshot}
            />
          )}
          <div className={AlumniCardStyles.name}>
            <h3>{alumnus.name}</h3>
            {alumnus.cohortNumber && (
              <p className={AlumniCardStyles.season}>
                {type === 'all' ? `${alumnus.bootcampGraduatedFrom}: ` : ''}Cohort{' '}
                {alumnus.cohortNumber}
              </p>
            )}
          </div>
        </div>

        {/* Card content for alumni listed under all grads */}
        {type === 'all' && (
          <>
            {gradQuotes.length > 0 && (
              <p className={AlumniCardStyles.quote}>{gradQuotes[0].quotation.quotation.trim()}</p>
            )}
            {alumnus.jobBeforeJuno && (
              <div className={AlumniCardStyles.beforeJuno}>
                <h4>Before Juno</h4>
                <p>{alumnus.jobBeforeJuno}</p>
              </div>
            )}
            {alumnus.jobCurrent && (
              <div className={AlumniCardStyles.currently}>
                <h4>Currently</h4>
                <p>{alumnus.jobCurrent}</p>
                {alumnus.jobCurrentCompany && alumnus.jobCurrentCompanyLink && (
                  <a href={alumnus.jobCurrentCompanyLink} target="_blank" rel="noopener noreferrer">
                    {alumnus.jobCurrentCompany}
                  </a>
                )}
              </div>
            )}
            {alumnus.jobCurrent === null && alumnus.jobAfterHY && (
              <>
                <h4>Job after Juno</h4>
                <p>{alumnus.jobAfterHY}</p>
              </>
            )}
          </>
        )}
      </div>

      {/* Social Icon bar, far right of the card */}
      {formattedSocialLinks.length ? (
        <ul className={AlumniCardStyles.social}>
          {formattedSocialLinks.map((link, index) => {
            const { title, url, Icon } = link;
            return (
              <li key={`${url + index}`}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <Icon title={`${alumnus.name} ${title}`} uniqueId={sluggify(alumnus.name)} />
                </a>
              </li>
            );
          })}
        </ul>
      ) : (
        ''
      )}
    </li>
  );
};

export default AlumniCard;
