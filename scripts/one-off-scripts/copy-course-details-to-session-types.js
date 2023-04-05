// import { createClient } from 'contentful-management';
const { createClient } = require('contentful-management');
const { DateTime } = require('luxon');
const dotenv = require('dotenv');

// parse '.env' and push entries into 'process.env'
// .env variables will now look to the .env file in the root of your current location when running this script in the command line
const result = dotenv.config({ path: '.env' });

if (result.error) {
  // don't proceed if there was an error loading env vars
  throw result.error;
}

const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN
});

const findTimeCommitment = (entryItem) => {
  const fullTime = { 'en-US': 'Full-Time' };
  const partTime = { 'en-US': 'Part-Time' };

  if (entryItem.fields.isBootcamp && entryItem.fields.isBootcamp['en-US']) {
    return fullTime;
  }
  if (
    entryItem.fields.sessionDuration &&
    entryItem.fields.sessionDuration['en-US'] === '2 Weeks Accelerated'
  ) {
    return fullTime;
  }
  return partTime;
};

const calculateNumberOfWeeks = (startDate, endDate) => {
  const start = DateTime.fromISO(startDate);
  const end = DateTime.fromISO(endDate);
  const numberOfWeeks = end.diff(start, 'weeks');
  const value = Math.round(numberOfWeeks.values.weeks) + 1;
  return value;
};

const calculateNumberOfClasses = (numOfWeeks, classDays) => {
  const fiveDays = /(-)\W+/g;
  const twoDays = /(&)\W+/g;

  if (fiveDays.test(classDays)) {
    const value = numOfWeeks * 5;
    return { 'en-US': value };
  }
  if (twoDays.test(classDays)) {
    const value = numOfWeeks * 2;
    return { 'en-US': value };
  }
  const value = numOfWeeks;
  return { 'en-US': value };
};

const findInPersonAddress = (addressItem) => {
  const regex3 = /(483)+/g;
  const regex5 = /(485)+/g;
  if (regex3.test(addressItem)) {
    return { 'en-US': '483 Queen St W' };
  }
  if (regex5.test(addressItem)) {
    return { 'en-US': '485 Queen St W' };
  }
  return { 'en-US': '483 Queen St W' };
};

const findLocationType = (entryItem) => {
  if (entryItem.fields.location['en-US'] === 'Live Online') {
    return { 'en-US': 'Live Online' };
  }
  return { 'en-US': 'In Person' };
};

const findInstructor = (instructor) => {
  const instructorObject = instructor['en-US'][0];
  return { 'en-US': instructorObject };
};

const findTimeFrame = (field) => {
  if (
    field['en-US'] === '6:30pm - 9:30pm' ||
    field['en-US'] === '9:00am - 5:00pm' ||
    field['en-US'] === '10:00am - 6:00pm' ||
    field['en-US'] === '10:00am - 5:30pm' ||
    field['en-US'] === '10:00am - 4:00pm'
  ) {
    return field;
  }
  if (
    field['en-CA'] === '6:30pm - 9:30pm' ||
    field['en-CA'] === '9:00am - 5:00pm' ||
    field['en-CA'] === '10:00am - 6:00pm' ||
    field['en-CA'] === '10:00am - 5:30pm' ||
    field['en-CA'] === '10:00am - 4:00pm'
  ) {
    return field;
  }
  return { 'en-US': 'Bad Data' };
};

const findClassDays = (field) => {
  if (
    field['en-US'] === 'Monday - Friday' ||
    field['en-US'] === 'Mondays & Wednesdays' ||
    field['en-US'] === 'Tuesdays & Thursdays' ||
    field['en-US'] === 'Saturdays' ||
    field['en-US'] === 'Sundays' ||
    field['en-US'] === 'Saturdays & Sundays'
  ) {
    return field;
  }
  if (
    field['en-CA'] === 'Monday - Friday' ||
    field['en-CA'] === 'Mondays & Wednesdays' ||
    field['en-CA'] === 'Tuesdays & Thursdays' ||
    field['en-CA'] === 'Saturdays' ||
    field['en-CA'] === 'Sundays' ||
    field['en-CA'] === 'Saturdays & Sundays'
  ) {
    return field;
  }
  return { 'en-US': 'Bad Data' };
};

client.getSpace(process.env.CONTENTFUL_SPACE_ID).then((space) => {
  space.getEnvironment('master').then((environment) => {
    // get all entries from the juno space's master environment
    environment
      .getEntries({ content_type: 'course', limit: 200, order: 'sys.createdAt' })
      .then((entries) => {
        // loop through each item inside the filtered items
        entries.items.forEach((item, i) => {
          setTimeout(() => {
            console.log(`${i}. Created entry ${item.fields.courseCode['en-US']}`);
            // for each item, create an object with the corresponding fields for the new content type
            const newEntry = {
              fields: {
                sessionCode: item.fields.courseCode,
                product: item.fields.programType,
                startDate: item.fields.startDate,
                endDate: item.fields.endDate,
                timeCommitment: findTimeCommitment(item),
                timeFrame: findTimeFrame(item.fields.courseTimes),
                classDays: findClassDays(item.fields.courseDays),
                numberOfWeeks: {
                  'en-US': calculateNumberOfWeeks(
                    item.fields.startDate['en-US'],
                    item.fields.endDate['en-US']
                  )
                },
                numberOfClasses: calculateNumberOfClasses(
                  calculateNumberOfWeeks(
                    item.fields.startDate['en-US'],
                    item.fields.endDate['en-US']
                  ),
                  item.fields.courseDays['en-US']
                ),
                instructor: findInstructor(item.fields.courseInstructor),
                locationType: item.fields.sessionLocationType || findLocationType(item),
                inPersonAddress: findInPersonAddress(item.fields.location['en-US']),
                allowOnlinePurchase: item.fields.allowOnlinePurchase || { 'en-US': false },
                purchaseSessionCode: item.fields.purchaseSessionCode,
                purchaseCost: item.fields.purchaseCost,
                isAlmostFull: item.fields.isAlmostFull || { 'en-US': false },
                isSoldOut: item.fields.isSoldOut || { 'en-US': false }
              }
            };
            // This is the trigger code to update Contentful with new entries.
            // create a new entry to the current environment under the new content type
            environment
              .createEntry('session', newEntry)
              .then((entry) => {
                // publish that new entry immediately after creating it
                entry.publish();
              })
              .catch(console.error);
          }, i * 500);
        });
      });
  });
});
