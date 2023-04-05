// const { createClient } = require('contentful-management');
// const dotenv = require('dotenv');
import { createClient } from 'contentful-management';
import dotenv from 'dotenv';

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
  console.log(contentfulData);
  return contentfulData;
}
// const environmentData = await getContentfulData();

module.exports = {
  getContentfulData
};
