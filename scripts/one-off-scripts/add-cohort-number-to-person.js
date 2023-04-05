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
// 2019 and previous, only 4 cohorts per year based on the Season
// 2020 and above, we have multiple cohorts per year BUT we do have a graduation date for these folks, so we can use that for the Cohort number

// Cohort numbers increment in multiples of 4 based on year and season until 2020
// Winter = 1, Spring = 2, Summer = 3, Fall = 4
// 2015 - 2019, season + 4.
// 2014 = 0, 2015 = 1, 2016 = 2. Times year number by 4 and add to season number
const seasonValue = {
  winter: 1,
  spring: 2,
  summer: 3,
  fall: 4
};
const calculateCohortNumberFromSeason = (season, year) => {
  return (year - 2014) * 4 + seasonValue[season];
};
// 2020 and beyond, just do a map of Cohort grad dates & associated numbers, easier than programmatically. It's only 7 cohorts.
const graduationDateToCohortNumberMap = new Map();
[
  '2020-04-10',
  '2020-05-15',
  '2020-07-13',
  '2020-08-31',
  '2020-10-19',
  '2021-01-04',
  '2021-03-29',
  '2021-05-03'
].forEach((date, index) => graduationDateToCohortNumberMap.set(date, 25 + index));

// All exceptions get a Cohort 0 number and then we can go through and look at them separately

// so the basic version is:
// 1. <= 2019, look to Season to get Cohort Number
// 2. >= 2020, look to graduation date to get Cohort Number
// 3. Could just hardcode cohort numbers, but ideally we have some sort of programmatic way to find the Cohort number. Some sort of function.
// 4. Identify a bootcamp grad based on Student: Yes, Alumnus: Yes. Fallback is if they have a Cohort Season & Year value.
//    maybe instead it should be Alumnus: Yes && with a cohort year/season

const getCohortNumber = (season, year, graduationDate) => {
  if (year <= 2019) {
    return calculateCohortNumberFromSeason(season.toLowerCase(), year);
  }
  if (year >= 2020) {
    return graduationDateToCohortNumberMap.get(graduationDate);
  }
  return 0;
};

async function updatePersonEntries() {
  try {
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment('master');

    const allPersonEntries = [];
    let moreResults = true;
    let batchCount = 0;
    const limit = 100;

    while (moreResults) {
      const skip = limit * batchCount;
      // eslint-disable-next-line no-plusplus
      batchCount++;

      console.log(`Fetching person entry pages. Page: ${batchCount}`);
      // eslint-disable-next-line no-await-in-loop
      const personEntriesBatch = await environment.getEntries({
        content_type: 'person',
        limit,
        skip
      });
      allPersonEntries.push(...personEntriesBatch.items);

      console.log(`Entries fetched ${allPersonEntries.length}/${personEntriesBatch.total}`);

      // check to see if skip exceeds totalItems, then moreResults = false OR if we receive no items from the call
      if (skip > personEntriesBatch.total || personEntriesBatch.items.length === 0) {
        moreResults = false;
      }
    }

    const filteredPersonEntries = allPersonEntries
      .filter((entry) => !entry.sys.archivedAt)
      .filter(
        (entry) =>
          (entry.fields.alumnus && entry.fields.alumnus['en-US']) ||
          (entry.fields.student && entry.fields.student['en-US'])
      );
    console.log(`Filtered out ${allPersonEntries.length - filteredPersonEntries.length} entries.`);

    // eslint-disable-next-line no-restricted-syntax
    for (const person of filteredPersonEntries) {
      if (!person.fields.cohortNumber) {
        const cohortNumber = getCohortNumber(
          person.fields.cohortSeason?.['en-US'],
          person.fields.cohortYear?.['en-US'],
          person.fields.graduationDate?.['en-US']
        );

        console.log(`Setting person id ${person.sys.id} cohortNumber to ${cohortNumber}`);

        person.fields.cohortNumber = { 'en-US': cohortNumber };
      }
      if (!person.fields.bootcampGraduatedFrom && person.fields.cohortNumber['en-US'] !== 0) {
        console.log(
          `Setting person id ${person.sys.id} bootcampGraduateFrom to Web Development Bootcamp`
        );
        person.fields.bootcampGraduatedFrom = { 'en-US': 'Web Development Bootcamp' };
      }
      // eslint-disable-next-line no-await-in-loop
      await person.update();
      console.log(`Updated Person ${person.sys.id} entry with new cohort number`);
    }
    console.log(`Completed update of ${filteredPersonEntries.length} Person entries`);
  } catch (error) {
    console.error(error);
  }
}

updatePersonEntries();
