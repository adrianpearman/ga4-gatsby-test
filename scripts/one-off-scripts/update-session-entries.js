const { createClient } = require('contentful-management');
const dotenv = require('dotenv');

const result = dotenv.config({ path: '.env' });

if (result.error) {
  throw result.error;
}

const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN
});

function createProgramIdToProgramNameMap(programs) {
  return new Map(
    programs
      .filter((program) => !program.sys.archivedAt)
      .map((program) => [program.sys.id, program.fields.programName['en-US']])
  );
}

function createProductIdToNameMap(products) {
  return new Map(
    products
      .filter((product) => !product.sys.archivedAt)
      .map((product) => [product.fields.name['en-US'], product.sys.id])
  );
}

function createNewProductLinkObject(sessions, programMap, productMap) {
  const sessionProgramId = sessions.product['en-US'].sys.id;
  const matchedProgramName = programMap.get(sessionProgramId);
  const newProductId = productMap.get(matchedProgramName);

  return { 'en-US': { sys: { type: 'Link', linkType: 'Entry', id: newProductId } } };
}

async function updateSessionEntries() {
  try {
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment('master');

    const programEntries = await environment.getEntries({
      content_type: 'program'
    });
    const courseProductEntries = await environment.getEntries({
      content_type: 'product'
    });

    const programIdToProgramNameMap = createProgramIdToProgramNameMap(programEntries.items);
    const productIdToNameMap = createProductIdToNameMap(courseProductEntries.items);

    const sessionEntries = await environment.getEntries({
      content_type: 'session',
      limit: 200,
      order: 'sys.createdAt'
    });
    const archivedSessionsExcluded = sessionEntries.items.filter((item) => !item.sys.archivedAt);

    // eslint-disable-next-line no-restricted-syntax
    for (const session of archivedSessionsExcluded) {
      if (session.fields.product) {
        session.fields.placeholderProductField = createNewProductLinkObject(
          session.fields,
          programIdToProgramNameMap,
          productIdToNameMap
        );
        // wait for the previous object to update before moving on to the next object
        // eslint-disable-next-line no-await-in-loop
        await session.update();
        console.log(`Updated ${session.fields.sessionCode['en-US']} with new field`);
      }
    }
  } catch (error) {
    console.error(error);
  }
}
updateSessionEntries();
