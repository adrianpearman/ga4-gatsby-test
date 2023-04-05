import React from 'react';
import SiteLink from '../SiteLink/SiteLink';

import ExternalLinkIcon from '../SVG/ExternalLinkIcon';
import TwitterIcon from '../SVG/TwitterIcon';
import LinkedinIcon from '../SVG/LinkedinIcon';
import GithubIcon from '../SVG/GithubIcon';
import CircleHeadshot from '../CircleHeadshot/CircleHeadshot';

import * as InstructorCardStyles from './InstructorCard.module.scss';
import sluggify from '../../helpers/sluggify';

const InstructorCard = (props) => {
  const { instructor, whiteBackground } = props;

  const nameSlug = instructor.name
    .toLowerCase()
    .trim()
    .replace(/[^\w ]+/g, '')
    .replace(/\s+/g, '-');

  // Some employees had an empty space in their bio which shows nothing
  // This conditional makes sure those bio's don't show up
  let staffBio;
  if (instructor.bio != null) {
    staffBio = instructor.bio.bio.trim();
  }

  return (
    <div
      className={`${InstructorCardStyles.card} ${
        whiteBackground ? InstructorCardStyles.cardWhite : undefined
      }`}
    >
      {instructor.headshot && (
        <CircleHeadshot
          imageData={instructor.headshot.gatsbyImageData}
          altText={instructor.name}
          size="100px"
          className={InstructorCardStyles.headshot}
        />
      )}

      <div className={InstructorCardStyles.instructorDetails}>
        <div>
          <h3 className={InstructorCardStyles.instructorName}>{instructor.name}</h3>
          {instructor.pronouns && (
            <p className={InstructorCardStyles.pronouns}>{instructor.pronouns}</p>
          )}
          {instructor.jobCurrentCompany && instructor.jobCurrentCompanyLink ? (
            <p className={InstructorCardStyles.instructorJob}>
              {instructor.jobCurrent} at{' '}
              <a href={instructor.jobCurrentCompanyLink} target="_blank" rel="noopener noreferrer">
                {instructor.jobCurrentCompany}
              </a>
            </p>
          ) : (
            <p className={InstructorCardStyles.instructorJob}>{instructor.jobCurrent}</p>
          )}
          {staffBio && (
            <SiteLink to={`/company/${nameSlug}/`} className="link-arrow">
              View full bio
            </SiteLink>
          )}
        </div>
        <div className={InstructorCardStyles.instructorLinks}>
          {instructor.website && (
            <a href={instructor.website} target="_blank" rel="noopener noreferrer">
              <ExternalLinkIcon
                className={InstructorCardStyles.socialIcon}
                title={`${instructor.name} portfolio site`}
                uniqueId={sluggify(instructor.name)}
              />
            </a>
          )}
          {instructor.twitter && (
            <a
              href={`https://twitter.com/${instructor.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon
                className={InstructorCardStyles.socialIcon}
                title={`${instructor.name} twitter profile`}
                uniqueId={sluggify(instructor.name)}
              />
            </a>
          )}
          {instructor.linkedin && (
            <a href={instructor.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedinIcon
                className={InstructorCardStyles.socialIcon}
                title={`${instructor.name} linkedin profile`}
                uniqueId={sluggify(instructor.name)}
              />
            </a>
          )}
          {instructor.github && (
            <a
              href={`https://github.com/${instructor.github}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon
                className={InstructorCardStyles.socialIcon}
                title={`${instructor.name} github profile`}
                uniqueId={sluggify(instructor.name)}
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;
