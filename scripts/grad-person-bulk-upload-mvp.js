/* eslint-disable no-console */
const { createClient } = require('contentful-management');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const { parse } = require('csv-parse');

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

const sluggify = (string) => {
  return string
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/\s+/g, '-');
};

// unique, hardcoded variables for the script to run. needs to be updated for each new batch of grads
const gradListSheetPath = path.resolve('scripts', 'wd-cohort-39-info.csv');
const gradHeadshotsDirectoryPath = path.resolve('scripts', 'wd-cohort-39-headshots');
const allHeadshotFileNames = fs.readdirSync(gradHeadshotsDirectoryPath);
const filteredHeadshotFileNames = allHeadshotFileNames.filter(
  (fileName) => fileName !== '.DS_Store'
);
const cohortNumber = 39;
const graduationDate = '2022-04-01';
const bootcampGraduatedFrom = 'Web Development Bootcamp';

async function uploadAssetToContentful(fullName, headshotFile) {
  const filePath = path.resolve(gradHeadshotsDirectoryPath, headshotFile);
  const readStream = fs.createReadStream(filePath, { encoding: null });

  const { environment } = await getContentfulData();

  const assetUpload = await environment
    .createAssetFromFiles({
      fields: {
        title: {
          'en-US': fullName
        },
        description: {
          'en-US': `Headshot of ${fullName} from ${bootcampGraduatedFrom} Cohort ${cohortNumber}`
        },
        file: {
          'en-US': {
            contentType: 'image/jpeg',
            fileName: headshotFile,
            file: readStream
          }
        }
      }
    })
    .then((createdAsset) => {
      console.log('created asset', createdAsset, createdAsset.fields.file['en-US']);
      return createdAsset.processForAllLocales().then((processedAsset) => {
        console.log('publishing asset');
        return processedAsset.publish();
      });
    })
    .catch((error) => console.error(error));

  return assetUpload;
}

// loop through all headshots & upload first before moving on to creating person entry
async function allNewContentfulAssets() {
  console.group('uploading all headshots to contentful...');
  const gradsToHeadshotIdMap = new Map();

  // eslint-disable-next-line no-restricted-syntax
  for (const headshotFileName of filteredHeadshotFileNames) {
    const gradName = headshotFileName.replace(/\.[^.]*$/, '');
    console.log(`uploading ${gradName} headshot...`);
    // eslint-disable-next-line no-await-in-loop
    const newAsset = await uploadAssetToContentful(gradName, headshotFileName);
    gradsToHeadshotIdMap.set(gradName, newAsset.sys.id);
  }

  console.log('all headshots uploaded!');
  console.groupEnd();
  return gradsToHeadshotIdMap;
}

// 2. create template object of the Contentful person object (complete with default values and properties to update with unique data)
const createContentfulEntryObject = (personData, headshotId) => {
  console.group(`creating ${personData.fullName} person entry...`);

  const ctaLink = personData.loomUrl || personData.website || '';
  const ctaText =
    (personData.loomUrl && 'View Project Demo') || (personData.website && 'View Portfolio') || '';

  const newGradObject = {
    name: { 'en-US': personData.fullName },
    pronouns: { 'en-US': personData.pronouns },
    staff: { 'en-US': false },
    instructorBootcamp: { 'en-US': false },
    instructorPT: { 'en-US': false },
    operations: { 'en-US': false },
    student: { 'en-US': true },
    alumnus: { 'en-US': true },
    cohortNumber: { 'en-US': cohortNumber },
    bootcampGraduatedFrom: { 'en-US': bootcampGraduatedFrom },
    graduationDate: { 'en-US': graduationDate },
    availableForHire: { 'en-US': true },
    freelancer: { 'en-US': false },
    previousEducation: { 'en-US': personData.prevEdu || '' },
    jobBeforeJuno: { 'en-US': personData.prevOccup || '' },
    studentBio: { 'en-US': personData.studentBio || '' },
    email: { 'en-US': personData.email || '' },
    website: { 'en-US': personData.website || '' },
    github: { 'en-US': personData.github || '' },
    twitter: { 'en-US': personData.twitter || '' },
    linkedin: { 'en-US': personData.linkedin || '' },
    ctaText: { 'en-US': ctaText },
    ctaLink: { 'en-US': ctaLink }
  };

  if (headshotId) {
    console.log(`Found headshot file id: ${headshotId}`);
    newGradObject.headshot = {
      'en-US': {
        sys: {
          id: headshotId,
          linkType: 'Asset',
          type: 'Link'
        }
      }
    };
  } else {
    console.log('no headshot found, skipping');
  }

  console.groupEnd();
  return newGradObject;
};

async function uploadPersonEntries(personEntries) {
  console.group(`uploading all grads to Contentful`);
  try {
    const { environment } = await getContentfulData();

    // eslint-disable-next-line no-restricted-syntax
    for (const person of personEntries) {
      // eslint-disable-next-line no-await-in-loop
      await environment.createEntry('person', { fields: person });
      console.log(`Uploaded ${person.name['en-US']} to Contentful`);
    }
    console.log('uploading complete');
  } catch (error) {
    console.error(error);
  }
  console.groupEnd();
}

// load and parse CSV file of new grads
async function openCsvFileStream() {
  const gradNameToHeadshotIdMap = await allNewContentfulAssets();
  const results = [];
  const csvParser = parse({ columns: true });
  fs.createReadStream(gradListSheetPath)
    .pipe(csvParser)
    .on('data', (grad) => {
      // as each line of data streams in from the CSV file, create a new Person entry object
      const personEntry = createContentfulEntryObject(
        grad,
        gradNameToHeadshotIdMap.get(sluggify(grad.fullName))
      );
      results.push(personEntry);
      console.log('person entry added to results', personEntry);
    })
    .on('end', () => {
      console.log('csv data stream complete');
      uploadPersonEntries(results);
    });
}

openCsvFileStream();
