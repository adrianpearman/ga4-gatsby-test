import React, { useEffect, useState } from 'react';

import BootcampSessionCard from '../SessionCards/BootcampSessionCard';
import { compareStartDatesAsc, excludePastStartDates } from '../../helpers/filtersorters';

import * as UpcomingSessionsSectionStyles from './UpcomingSessionsSection.module.scss';

const UpcomingSessionsSection = ({ title, description, sessions, id = '' }) => {
  const [upcomingSessions, setUpcomingSessions] = useState([]);

  useEffect(() => {
    setUpcomingSessions(
      sessions.filter(excludePastStartDates).sort(compareStartDatesAsc).slice(0, 6)
    );
  }, [sessions]);

  return (
    <section className={`${UpcomingSessionsSectionStyles.datesCost} grid-wrapper`} id={id}>
      <h2 className={UpcomingSessionsSectionStyles.title}>{title}</h2>
      <p
        className={`${UpcomingSessionsSectionStyles.description} ${
          upcomingSessions.length === 0 ? UpcomingSessionsSectionStyles.noSessions : ''
        }`}
      >
        {upcomingSessions.length ? description : 'There are no sessions currently available.'}
      </p>

      {/* SESSION SCHEDULE LOOP */}
      <ul className={UpcomingSessionsSectionStyles.sessionsList}>
        {upcomingSessions.map((session) => (
          <li key={session.id}>
            <BootcampSessionCard session={session} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UpcomingSessionsSection;
