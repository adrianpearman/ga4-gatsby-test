import React, { useState } from 'react';
import InstructorCard from '../InstructorCard/InstructorCard';
import * as teamStyles from './Team.module.scss';

const Team = ({ teamMembers, teamSectionTitle, teamSectionText }) => {
  const orderedTeamMembers = teamMembers.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });
  const allStaff = orderedTeamMembers.filter((teamMember) => teamMember.staff);
  const bootcampStaff = orderedTeamMembers.filter((teamMember) => teamMember.instructorBootcamp);
  const partTimeStaff = orderedTeamMembers.filter((teamMember) => teamMember.instructorPT);
  const operationsStaff = orderedTeamMembers.filter((teamMember) => teamMember.operations);

  const allFilters = {
    all: {
      name: 'all',
      buttonText: 'All team members',
      total: allStaff.length
    },
    bootcamp: {
      name: 'bootcamp',
      buttonText: 'Bootcamp team',
      total: bootcampStaff.length
    },
    partTime: {
      name: 'partTime',
      buttonText: 'Part-time instructors',
      total: partTimeStaff.length
    },
    ops: {
      name: 'ops',
      buttonText: 'Operations team',
      total: operationsStaff.length
    }
  };

  const [staffList, setStaffList] = useState(allStaff);
  const [currentView, setCurrentView] = useState('all');

  const handleClick = (filterName) => {
    if (filterName === 'all') {
      setStaffList(allStaff);
    }
    if (filterName === 'bootcamp') {
      setStaffList(bootcampStaff);
    }
    if (filterName === 'partTime') {
      setStaffList(partTimeStaff);
    }
    if (filterName === 'ops') {
      setStaffList(operationsStaff);
    }
    setCurrentView(filterName);
  };

  return (
    <section id="juno-team" className={`grid-wrapper ${teamStyles.team}`}>
      <h2 className={teamStyles.sectionTitle}>{teamSectionTitle}</h2>
      <p
        className={teamStyles.introText}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: teamSectionText
        }}
      />

      <div className={teamStyles.filters}>
        {Object.keys(allFilters).map((filterKey) => {
          const matchingFilter = allFilters[filterKey];
          return (
            <button
              key={filterKey}
              type="button"
              className={`filter-btn ${currentView === matchingFilter.name ? 'active' : ''} `}
              onClick={() => handleClick(matchingFilter.name)}
            >
              {matchingFilter.buttonText}{' '}
              <span className={teamStyles.filterCount}>{matchingFilter.total}</span>
            </button>
          );
        })}
      </div>

      <div className={teamStyles.staffContainer}>
        {staffList.map((staff) => (
          <InstructorCard key={staff.id} instructor={staff} whiteBackground />
        ))}
        <div className={teamStyles.careers}>
          <div className={teamStyles.careersYou}>&lt;!--You?--&gt;</div>
          <div className={teamStyles.careersLinks}>
            <h3>Interested in joining us?</h3>
            <a
              className="link-arrow link-arrow-white"
              href="https://hackeryou.com/careers"
              target="_blank"
              rel="noopener noreferrer"
            >
              See open positions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
