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

async function mergeHeadshotImages() {
  try {
    const { environment } = await getContentfulData();

    const allPersonEntries = [];
    let moreResults = true;
    let batchCount = 0;
    const limit = 100;

    while (moreResults) {
      const skip = limit * batchCount;
      // eslint-disable-next-line no-plusplus
      console.log(`Fetching person entry pages. Page: ${batchCount}`);
      // eslint-disable-next-line no-await-in-loop
      const personEntriesBatch = await environment.getEntries({
        content_type: 'person',
        limit,
        skip,
        order: 'sys.createdAt'
      });
      allPersonEntries.push(...personEntriesBatch.items);

      console.log(`Entries fetched ${allPersonEntries.length}/${personEntriesBatch.total}`);

      // check to see if skip exceeds totalItems, then moreResults = false OR if we receive no items from the call
      if (skip > personEntriesBatch.total || personEntriesBatch.items.length === 0) {
        moreResults = false;
      }

      // eslint-disable-next-line no-plusplus
      batchCount++;
    }

    const allActivePersonEntries = allPersonEntries.filter((person) => !person.sys.archivedAt);

    // eslint-disable-next-line no-restricted-syntax
    for (const person of allActivePersonEntries) {
      const { fields } = person;
      console.log(person);

      console.group(`Updating headshot field of ${fields.name['en-US']}`);
      if (fields.headshotLegacy && !fields.headshotPortrait) {
        console.log('falling back to legacy headshot');
      }
      if (fields.headshotLegacy && fields.headshotPortrait) {
        console.log('both legacy & portrait available, using portrait image instead');
      }
      if (!fields.headshotLegacy && fields.headshotPortrait) {
        console.log('using just the portrait headshot');
      }
      if (!fields.headshotLegacy && !fields.headshotPortrait) {
        console.log('no headshot found, leaving blank!');
      }
      console.groupEnd();

      fields.headshot = fields.headshotPortrait || fields.headshotLegacy || null;

      // eslint-disable-next-line no-await-in-loop
      await person.update().then((newPerson) => newPerson.publish());
    }
  } catch (error) {
    console.error(error);
  }
}

mergeHeadshotImages();
