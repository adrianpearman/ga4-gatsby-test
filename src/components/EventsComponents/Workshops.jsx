import React from 'react';
import WorkshopCard from './WorkshopCard';
import * as WorkshopsStyles from './Workshops.module.scss';

const Workshops = ({ allTorontoWorkshops, coding101Recording }) => {
  return (
    <section className={`grid-wrapper ${WorkshopsStyles.workshops}`}>
      {allTorontoWorkshops ? (
        allTorontoWorkshops.map((workshop) => {
          return (
            <WorkshopCard
              key={workshop.id}
              title={workshop.uniqueName || workshop.type.name}
              description={workshop.uniqueDescription || workshop.type.description}
              date={workshop.date}
              time={workshop.timeFrame}
              eventType={workshop.type}
              location={workshop.location}
              registrationLink={workshop.registrationLink}
              buttonText={workshop.type.sharedCtaText}
              image={workshop.uniqueImage || workshop.type.defaultImage}
              instructor={workshop.instructor}
            />
          );
        })
      ) : (
        <div className={WorkshopsStyles.noEvents}>
          <h2 className={WorkshopsStyles.title}>Sorry!</h2>
          <p>There are no upcoming workshops right now. Please check back soon!</p>
        </div>
      )}
      <WorkshopCard
        title={coding101Recording.uniqueName}
        description={coding101Recording.uniqueDescription}
        date={coding101Recording.date}
        time="While our Live Online events offer the best interactive experience, this event is also available in a recorded format if you can't find a time that works for you."
        eventType={coding101Recording.type}
        registrationLink={coding101Recording.registrationLink}
        buttonText="Watch Recording Now"
        image={coding101Recording.uniqueImage || coding101Recording.type.defaultImage}
        instructor={coding101Recording.instructor}
        cardStyle="recording"
        recording
      />
    </section>
  );
};

export default Workshops;
