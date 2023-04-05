/* eslint-disable no-console */
const { createClient } = require('contentful-management');
const dotenv = require('dotenv');

const result = dotenv.config({ path: '.env' });

if (result.error) {
  throw result.error;
}

const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN
});

async function getContentfulData() {
  const contentfulData = {};
  try {
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment('master');

    contentfulData.space = space;
    contentfulData.environment = environment;
  } catch (error) {
    console.error(error);
  }
  return contentfulData;
}
// helper function to filter all event types by specific name
const filterTypesByName = (types, name) => {
  return types.filter((type) => type.fields.name['en-US'] === name);
};
// function to find the right Event Type to match the event entry
const findMatchingEventType = (eventFields, allTypes) => {
  const eventName = eventFields.eventName['en-US'].trim().toLowerCase();

  if (eventName.includes('ask an expert')) {
    console.log(`${eventName}. Event Type: Ask an Expert`);
    return filterTypesByName(allTypes, 'Ask an Expert');
  }

  if (eventName.includes('instructor')) {
    console.log(`${eventName}. Event Type: Meet your Instructor`);
    return filterTypesByName(allTypes, 'Meet your Instructor');
  }

  if (
    eventName === 'coding 101 workshop' ||
    eventName === 'introduction to html' ||
    eventName === 'web dev 101' ||
    eventName === 'web dev webinar'
  ) {
    console.log(`${eventName}. Event Type: Coding 101`);
    return filterTypesByName(allTypes, 'Coding 101');
  }

  if (
    eventName === 'data 101 workshop' ||
    eventName === 'introduction to sql' ||
    eventName.includes('explore data analytics')
  ) {
    console.log(`${eventName}. Event Type: Introduction to SQL`);
    return filterTypesByName(allTypes, 'Introduction to SQL');
  }

  if (eventName === 'coding bootcamp q&a') {
    console.log(`${eventName}. Event Type: Coding Bootcamp Q&A`);
    return filterTypesByName(allTypes, 'Coding Bootcamp Q&A');
  }

  if (eventName === 'data analytics bootcamp q&a') {
    console.log(`${eventName}. Event Type: Data Analytics Bootcamp Q&A`);
    return filterTypesByName(allTypes, 'Data Analytics Bootcamp Q&A');
  }

  if (eventName.includes('101') && !eventName.includes('workshop')) {
    console.log(`${eventName}. Event Type: Product Info Session`);
    return filterTypesByName(allTypes, 'Product Info Session');
  }
  if (eventName.includes('explore') || eventName.includes('info session')) {
    console.log(`${eventName}. Event Type: Product Info Session`);
    return filterTypesByName(allTypes, 'Product Info Session');
  }

  console.log(`${eventName}. Event Type: Unique`);
  return filterTypesByName(allTypes, 'Unique');
};

const findLocation = (eventAddress) => {
  if (!eventAddress) {
    console.log('No Address => 485 Queen St. West');
    return { 'en-US': '485 Queen St. West' };
  }
  const address = eventAddress['en-US'];

  if (address.includes('483')) {
    console.log(`${address} => 483 Queen St. West`);
    return { 'en-US': '483 Queen St. West' };
  }
  if (address.includes('485')) {
    console.log(`${address} => 485 Queen St. West`);
    return { 'en-US': '485 Queen St. West' };
  }

  console.log(`${address} => Live Online`);
  return { 'en-US': 'Live Online' };
};

// function(s) to build the new Event Session entry with correct info based on existing data & event type
const createEventSessionEntry = (event, allTypes) => {
  const eventFields = event.fields;
  console.log(`Previous event entry fields: ${eventFields}`);
  const [matchingEventType] = findMatchingEventType(eventFields, allTypes);

  const dateNoTime = eventFields.eventDate['en-US'].slice(0, -6);
  console.log(`Date without the time: ${dateNoTime}`);

  const newEntry = {
    registrationLink: eventFields.eventLink || { 'en-US': 'No Registration Link' },
    date: { 'en-US': dateNoTime },
    timeFrame: eventFields.eventTime || { 'en-US': 'No Time Frame' },
    location: findLocation(eventFields.eventAddress),
    type: {
      'en-US': { sys: { type: 'Link', linkType: 'Entry', id: matchingEventType.sys.id } }
    },
    instructor: eventFields.eventInstructor || {
      'en-US': { sys: { type: 'Link', linkType: 'Entry', id: '5Qz4FrIGRTAJeLuuXxDbTm' } }
    },
    // optional fields
    secondaryRegistrationLink: eventFields.secondaryLink || null,
    uniqueName: eventFields.eventName || null,
    uniqueDescription: eventFields.eventDescription || null,
    uniqueImage: eventFields.eventImage || null,
    uniqueAssociatedProduct: eventFields.associatedProduct || null
  };

  console.log(`Created new event session entry: ${newEntry.uniqueName['en-US']}`);
  console.log(newEntry);

  return newEntry;
};

// pull all Events & Event Types
async function getAllEventsAndTypes() {
  const { environment } = await getContentfulData();

  const allContentfulEvents = await environment.getEntries({
    content_type: 'event',
    limit: 200
  });
  const allContentfulEventTypes = await environment.getEntries({
    content_type: 'eventType'
  });

  const archivedEventsExcluded = allContentfulEvents.items.filter((event) => !event.sys.archivedAt);

  return {
    allEvents: archivedEventsExcluded,
    allEventTypes: allContentfulEventTypes.items
  };
}

// publish the new Event Session entry
async function createNewEventSessions() {
  try {
    const { environment } = await getContentfulData();
    const { allEvents, allEventTypes } = await getAllEventsAndTypes();

    const orderedAllEvents = [...allEvents].reverse();

    console.log('uploading all event session entries...');
    // eslint-disable-next-line no-restricted-syntax
    for (const event of orderedAllEvents) {
      const newSessionFields = createEventSessionEntry(event, allEventTypes);

      // eslint-disable-next-line no-await-in-loop
      await environment
        .createEntry('eventSession', { fields: newSessionFields })
        .then((entry) => entry.publish());
    }
    console.log('uploading complete');
  } catch (error) {
    console.error(error);
  }
}

createNewEventSessions();
