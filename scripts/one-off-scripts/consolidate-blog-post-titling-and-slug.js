/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
const { createClient } = require('contentful-management');
const dotenv = require('dotenv');

const sluggify = (string) => {
  return string
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/\s+/g, '-');
};

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

    const blogPostEntries = await environment.getEntries({
      content_type: 'blogPost',
      limit: 400
    });
    const heroContentEntries = await environment.getEntries({
      content_type: 'heroContentBlock',
      limit: 200
    });

    contentfulData.space = space;
    contentfulData.environment = environment;
    contentfulData.blogPostEntries = blogPostEntries;
    contentfulData.heroContentEntries = heroContentEntries;
  } catch (error) {
    console.error(error);
  }
  return contentfulData;
}

async function createBlogMetaEntry(blogPostFields, environment) {
  console.group('running createBlogMetaEntry...');
  const newFields = {
    title: blogPostFields.metaTitle || blogPostFields.title,
    description: blogPostFields.metaDescription ||
      blogPostFields.postSummary || { 'en-US': blogPostFields.blogPost['en-US'].slice(0, 190) },
    image: blogPostFields.featuredImage
  };
  console.log('with new fields', newFields, newFields.image['en-US']);

  const newEntryCreated = await environment.createEntry('metaContentBlock', { fields: newFields });
  const newEntryPublished = await newEntryCreated.publish();

  console.log('with reference id', newEntryPublished.sys.id);
  console.log('createBlogMetaEntry complete.');
  console.groupEnd();
  return newEntryPublished.sys.id;
}

async function buildUpdatedPostObject(postData, heroEntries, environment) {
  console.group('running buildUpdatedPostObject...');
  const updatedPost = postData;

  let matchingHeroEntry = null;
  if (updatedPost.fields.heroContent) {
    console.log('found hero entry match');
    matchingHeroEntry = heroEntries.find(
      (entry) => entry.sys.id === updatedPost.fields.heroContent['en-US'].sys.id
    );
    console.log(`Hero Entry ID: ${matchingHeroEntry.sys.id}`);
  } else {
    console.log('did not find matching hero entry', matchingHeroEntry);
  }

  let newMetaEntryId = null;
  if (!updatedPost.fields.metaContent) {
    newMetaEntryId = await createBlogMetaEntry(updatedPost.fields, environment);
  }

  const categories = ['Juno News', 'Tech Tips', 'Career Tips', 'Student Stories', 'None'];
  let blogCategoryField = { 'en-US': 'None' };
  if (updatedPost.fields.blogCategory) {
    blogCategoryField = categories.includes(updatedPost.fields.blogCategory['en-US'])
      ? updatedPost.fields.blogCategory
      : { 'en-US': 'None' };
  }

  updatedPost.fields.contentfulTitle = updatedPost.fields.title;
  updatedPost.fields.slug = updatedPost.fields.slug || {
    'en-US': sluggify(updatedPost.fields.title['en-US'])
  };
  updatedPost.fields.h1Heading = matchingHeroEntry?.fields.h1Heading || updatedPost.fields.title;
  updatedPost.fields.mainVisualHeading =
    matchingHeroEntry?.fields.mainVisualHeading ||
    updatedPost.fields.changeableTitle ||
    updatedPost.fields.title;
  updatedPost.fields.metaContent = updatedPost.fields.metaContent || {
    'en-US': {
      sys: {
        type: 'Link',
        linkType: 'Entry',
        id: newMetaEntryId
      }
    }
  };
  updatedPost.fields.blogCategory = blogCategoryField;

  console.log('buildUpdatedPostObject complete');
  console.groupEnd();
  return updatedPost;
}

async function updatePostEntries() {
  try {
    const { environment, heroContentEntries, blogPostEntries } = await getContentfulData();

    const archivedPostsExcluded = blogPostEntries.items.filter((post) => !post.sys.archivedAt);

    // eslint-disable-next-line no-restricted-syntax
    for (const blogPost of archivedPostsExcluded) {
      console.group('running loop of blogPosts & updating...');
      const newPost = await buildUpdatedPostObject(blogPost, heroContentEntries.items, environment);

      console.log('updated fields', newPost.fields);
      const updatedPost = await newPost.update();
      await updatedPost.publish();
      console.log(`Post ${updatedPost.fields.title['en-US']}(${updatedPost.sys.id}) published`);
      console.groupEnd();
    }

    console.log('All blog posts updated.');
  } catch (error) {
    console.error(error);
  }
}

updatePostEntries();
