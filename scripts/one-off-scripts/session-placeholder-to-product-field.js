const { createClient } = require('contentful-management');
const dotenv = require('dotenv');

const result = dotenv.config({ path: '.env' });

if (result.error) {
  throw result.error;
}

const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN
});

function checkForPageBootcampReference(sessionPlaceholderField, pageBootcampId, productBootcampId) {
  if (sessionPlaceholderField['en-US'].sys.id === pageBootcampId) {
    console.log('Found a bootcamp!');
    return { 'en-US': { sys: { type: 'Link', linkType: 'Entry', id: productBootcampId } } };
  }
  return sessionPlaceholderField;
}

async function updateSessionEntries() {
  try {
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment('master');

    const pageBootcampEntry = await environment.getEntries({
      content_type: 'pageBootcamp'
    });
    const pageBootcampId = pageBootcampEntry.items[0].sys.id;
    const productEntry = await environment.getEntries({
      content_type: 'product'
    });
    const bootcampProduct = productEntry.items.filter(
      (product) => product.fields.type['en-US'] === 'Bootcamp'
    );

    const sessionEntries = await environment.getEntries({
      content_type: 'session',
      limit: 200,
      order: 'sys.createdAt'
    });
    const archivedSessionsExcluded = sessionEntries.items.filter((item) => !item.sys.archivedAt);

    // eslint-disable-next-line no-restricted-syntax
    for (const session of archivedSessionsExcluded) {
      if (session.fields.placeholderProductField) {
        session.fields.product = checkForPageBootcampReference(
          session.fields.placeholderProductField,
          pageBootcampId,
          bootcampProduct[0].sys.id
        );
      }
      // eslint-disable-next-line no-await-in-loop
      await session.update();
      console.log(`Updated ${session.fields.sessionCode['en-US']} with new field`);
    }
  } catch (error) {
    console.error(error);
  }
}

updateSessionEntries();
