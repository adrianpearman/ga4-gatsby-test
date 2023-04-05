/* eslint-disable react/no-danger */
import React from 'react';
import SiteLink from '../SiteLink/SiteLink';
import Button from '../Button/Button';

import * as JobStyles from './Jobs.module.scss';
import sluggify from '../../helpers/sluggify';

const Jobs = ({ jobs, positionsTitle, positionsBanner }) => {
  // create a Map of the postings based on which department they are associated with
  const departmentsToJobPostingMap = jobs.reduce((map, item) => {
    if (item.department) {
      return map.set(item.department, [...(map.get(item.department) || []), item]);
    }
    return map.set('general', [...(map.get('general') || []), item]);
  }, new Map());

  // "general" type postings always first, followed by departments in alphabetical order
  const sortedJobPostings = Array.from(departmentsToJobPostingMap).sort((postingA, postingB) => {
    if (postingA[0] === 'general') {
      return -1;
    }
    if (postingB[0] === 'general') {
      return 1;
    }
    return postingA[0] > postingB[0] ? 1 : -1;
  });

  return (
    <section
      className={`grid-wrapper ${JobStyles.positions}`}
      name="openpositions"
      id="openpositions"
    >
      <h2 className={JobStyles.positionsTitle}>{positionsTitle}</h2>

      {jobs.length ? (
        <>
          {sortedJobPostings.map(([department, postings]) => (
            <section key={sluggify(department)} className={JobStyles.department}>
              {department !== 'general' && <h3>{department} Team</h3>}
              <ul>
                {postings.map((posting) => (
                  <li key={posting.id} className={JobStyles.jobCard}>
                    <h4 className={JobStyles.jobTitle}>
                      <SiteLink to={`/careers/${posting.slug}/`} className={JobStyles.jobTitleLink}>
                        {posting.jobTitle}
                      </SiteLink>
                    </h4>
                    <p className={JobStyles.jobLocation}>{posting.jobLocation}</p>
                    {posting.jobTimeline && (
                      <p className={JobStyles.jobTimeline}>{posting.jobTimeline}</p>
                    )}
                    <Button
                      text="See full position"
                      buttonStyle="secondary"
                      urlIsRelativePath
                      href={`/careers/${posting.slug}`}
                      className={JobStyles.jobLink}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </>
      ) : (
        <p className={JobStyles.noJobs}>
          Sorry, there are no positions open at the moment. Please check back soon!
        </p>
      )}

      <div
        className={JobStyles.positionsBanner}
        dangerouslySetInnerHTML={{
          __html: positionsBanner
        }}
      />
    </section>
  );
};

export default Jobs;
