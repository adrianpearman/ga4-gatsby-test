const path = require('path');
const { DateTime } = require('luxon');

async function createBlogPostPages(graphql, createPage, reporter) {
  const BlogPostTemplate = path.resolve('src/templates/blog-post.jsx');
  const BlogJourneyTemplate = path.resolve('src/templates/blog-post-journey.jsx');
  const BlogPartnerTemplate = path.resolve('src/templates/blog-post-partner.jsx');

  const result = await graphql(
    `
      query {
        allContentfulBlogPost {
          edges {
            node {
              id
              slug
              alternateTemplate
            }
          }
        }
      }
    `
  );

  // Handle query errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return false;
  }

  const blogPostsQuery = result.data.allContentfulBlogPost;
  const allBlogPosts = blogPostsQuery.edges.map((edge) => edge.node);

  // Provide count of Case Studies posts
  const caseStudiesPosts = allBlogPosts.filter(
    (post) => post.alternateTemplate === 'Partner Spotlight'
  );

  // Create pages for each blog post
  allBlogPosts.forEach((post) => {
    const { id, slug, alternateTemplate } = post;
    if (alternateTemplate === 'Student Journey') {
      createPage({
        path: `/blog/${slug}/`,
        component: BlogJourneyTemplate,
        id,
        context: {
          slug: `/blog/${slug}/`,
          id
        }
      });
    } else if (alternateTemplate === 'Partner Spotlight') {
      createPage({
        path: `/case-studies/${slug}/`,
        component: BlogPartnerTemplate,
        id,
        context: {
          slug: `/case-studies/${slug}/`,
          totalPosts: caseStudiesPosts.length,
          id
        }
      });
    } else if (alternateTemplate === 'Career Posting') {
      createPage({
        path: `/careers/${slug}/`,
        component: BlogPostTemplate,
        id,
        context: {
          slug: `/careers/${slug}/`,
          id
        }
      });
    } else {
      createPage({
        path: `/blog/${slug}/`,
        component: BlogPostTemplate,
        id,
        context: {
          slug: `/blog/${slug}/`,
          id
        }
      });
    }
  });
  return true;
}

async function createBlogCategoryPages(graphql, createPage, reporter) {
  const BlogCategoryTemplate = path.resolve('src/templates/blog-category.jsx');

  const result = await graphql(
    `
      query {
        allContentfulBlogCategoryName {
          edges {
            node {
              id
              categoryName
            }
          }
        }
      }
    `
  );

  // Handle query errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return false;
  }

  const { allContentfulBlogCategoryName: categoriesQueryResult } = result.data;
  const categories = categoriesQueryResult.edges.map((edge) => edge.node);

  categories.forEach((category) => {
    const { id, categoryName } = category;
    const slug = categoryName
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/\s+/g, '-');
    createPage({
      path: `/${slug}/`,
      component: BlogCategoryTemplate,
      id,
      context: {
        id,
        slug: `/${slug}/`
      }
    });
  });
  return true;
}

async function createBlogPage(graphql, createPage) {
  const BlogTemplate = path.resolve('src/templates/blog.jsx');

  createPage({
    path: `/blog/`,
    component: BlogTemplate,
    id: 'mainblogpage',
    context: {
      slug: `/blog/`,
      filter: 'allPosts'
    }
  });

  createPage({
    path: `/case-studies/`,
    component: BlogTemplate,
    id: 'casestudiespage',
    context: {
      slug: `/case-studies/`,
      filter: 'Partner Spotlight'
    }
  });

  return true;
}

async function createCoursePages(graphql, createPage, reporter) {
  const CourseDetailsTemplate = path.resolve('src/templates/course-details.jsx');

  const result = await graphql(
    `
      query {
        courseQuery: allContentfulProduct(filter: { type: { eq: "course" } }) {
          edges {
            node {
              name
              id
              slug
            }
          }
        }
      }
    `
  );

  // Handle query errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return false;
  }

  const courseQueryResults = result.data.courseQuery;
  const courses = courseQueryResults.edges.map((edge) => edge.node);

  courses.forEach((course) => {
    const { slug } = course;
    createPage({
      path: `/course/${slug}/`,
      component: CourseDetailsTemplate,
      id: course.id,
      context: {
        id: course.id,
        inPersonId: `in-person-${slug}`
      }
    });
  });

  return true;
}

async function createBootcampPages(graphql, createPage, reporter) {
  const BootcampDetailsTemplate = path.resolve('src/templates/bootcamp-details.jsx');

  const result = await graphql(
    `
      query {
        bootcampQuery: allContentfulProduct(filter: { type: { eq: "bootcamp" } }) {
          edges {
            node {
              name
              id
              slug
            }
          }
        }
      }
    `
  );

  // Handle query errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return false;
  }

  const bootcampQueryResults = result.data.bootcampQuery;
  const bootcamps = bootcampQueryResults.edges.map((edge) => edge.node);

  bootcamps.forEach((bootcamp) => {
    const { slug } = bootcamp;
    createPage({
      path: `/bootcamp/${slug}/`,
      component: BootcampDetailsTemplate,
      id: bootcamp.id,
      context: {
        id: bootcamp.id
      }
    });
  });

  return true;
}

async function createEmployeePages(graphql, createPage, reporter) {
  const EmployeeTemplate = path.resolve('src/templates/employee-bio.jsx');

  const result = await graphql(
    `
      query {
        staff: allContentfulPerson(filter: { staff: { eq: true } }) {
          edges {
            node {
              id
              name
              bio {
                bio
              }
            }
          }
        }
        ptStaff: allContentfulPerson(filter: { instructorPT: { eq: true } }) {
          edges {
            node {
              id
              name
              bio {
                bio
              }
            }
          }
        }
      }
    `
  );

  // Handle query errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return false;
  }

  const { staff: staffMembersQueryResult, ptStaff: ptStaffMembersQueryResult } = result.data;

  const staffMembers = staffMembersQueryResult.edges.map((edge) => edge.node);
  const partTimeStaffMembers = ptStaffMembersQueryResult.edges.map((edge) => edge.node);

  // creates pages for staff
  staffMembers.forEach((staff) => {
    const slug = staff.name
      .toLowerCase()
      .trim()
      .replace(/[^\w ]+/g, '')
      .replace(/\s+/g, '-');
    if (staff.bio != null) {
      if (staff.bio.bio.trim() !== '') {
        createPage({
          path: `/company/${slug}/`,
          component: EmployeeTemplate,
          id: staff.id,
          context: {
            id: staff.id
          }
        });
      }
    }
  });

  // creates pages for part-time staff
  partTimeStaffMembers.forEach((staff) => {
    const slug = staff.name
      .toLowerCase()
      .trim()
      .replace(/[^\w ]+/g, '')
      .replace(/\s+/g, '-');
    if (staff.bio != null) {
      if (staff.bio.bio.trim() !== '') {
        createPage({
          path: `/company/${slug}/`,
          component: EmployeeTemplate,
          id: staff.id,
          context: {
            id: staff.id
          }
        });
      }
    }
  });
  return true;
}

async function createLegalesePages(graphql, createPage, reporter) {
  const LegaleseTemplate = path.resolve('src/templates/legalese.jsx');

  const result = await graphql(
    `
      query {
        legaleseQueryResult: allContentfulPageGeneric(
          filter: { templateName: { eq: "legalese" } }
        ) {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `
  );

  // Handle query errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return false;
  }

  const { legaleseQueryResult } = result.data;

  const legaleseDocuments = legaleseQueryResult.edges.map((edge) => edge.node);

  legaleseDocuments.forEach((document) => {
    createPage({
      path: `/${document.slug}/`,
      component: LegaleseTemplate,
      id: document.id,
      context: {
        id: document.id
      }
    });
  });

  return true;
}

async function createGradShowcasePages(graphql, createPage, reporter) {
  const GradShowcaseTemplate = path.resolve('src/templates/grad-showcase.jsx');

  const result = await graphql(
    `
      query {
        pageQuery: allContentfulPageGeneric(filter: { templateName: { regex: "/graduates/gi" } }) {
          edges {
            node {
              id
              slug
              templateName
            }
          }
        }
      }
    `
  );

  // Handle query errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return false;
  }

  const gradShowcaseResults = result.data.pageQuery;
  const showcases = gradShowcaseResults.edges.map((edge) => edge.node);

  const matchingBootcamps = {
    'web-developer-graduates': 'Web Development Bootcamp',
    'data-analyst-graduates': 'Data Analytics Bootcamp'
  };

  showcases.forEach((showcase) => {
    const { slug, templateName } = showcase;
    // eslint-disable-next-line radix
    const cohortNumber = parseInt(slug.replace(/cohort-/gi, ''));
    createPage({
      path: `/${templateName}/${slug}/`,
      component: GradShowcaseTemplate,
      id: showcase.id,
      context: {
        id: showcase.id,
        cohortNumber,
        associatedProductName: matchingBootcamps[templateName]
      }
    });
  });

  return true;
}

async function createEventLandingPages(graphql, createPage, reporter) {
  const EventLandingPageTemplate = path.resolve('src/templates/event-landing-page.jsx');

  const result = await graphql(
    `
      query {
        pageQuery: allContentfulPageGeneric(
          filter: { templateName: { eq: "event-landing-page" } }
        ) {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `
  );

  // Handle query errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return false;
  }

  const genericPageQueryResults = result.data.pageQuery;
  const landingPages = genericPageQueryResults.edges.map((edge) => edge.node);

  landingPages.forEach((landingPage) => {
    const { id, slug } = landingPage;
    createPage({
      path: `/${slug}/`,
      component: EventLandingPageTemplate,
      id,
      context: {
        id
      }
    });
  });

  return true;
}

async function createCareerPathwaysPages(graphql, createPage, reporter) {
  const CareerPathwaysPageTemplate = path.resolve('src/templates/career-pathways.jsx');

  const result = await graphql(
    `
      query {
        pageQuery: allContentfulProduct(filter: { type: { eq: "career-pathway" } }) {
          edges {
            node {
              id
              slug
              type
            }
          }
        }
      }
    `
  );

  // Handle query errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return false;
  }

  const pathwaysEntries = result.data.pageQuery.edges.map((edge) => edge.node);

  pathwaysEntries.forEach((pathway) => {
    const { id, slug, type } = pathway;
    createPage({
      path: `/${type}/${slug}/`,
      component: CareerPathwaysPageTemplate,
      id,
      context: {
        id
      }
    });
  });

  return true;
}

async function createHireAGradPages(graphql, createPage, reporter) {
  const HireAGradPageTemplate = path.resolve('src/templates/hire-a-grad.jsx');

  const result = await graphql(
    `
      query {
        pageQuery: allContentfulPageGeneric(filter: { templateName: { eq: "hire-a-grad" } }) {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `
  );

  // Handle query errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return false;
  }

  const hireAGradEntries = result.data.pageQuery.edges.map((edge) => edge.node);

  hireAGradEntries.forEach((page) => {
    const { id, slug } = page;
    createPage({
      path: `/${slug}/`,
      component: HireAGradPageTemplate,
      id,
      context: {
        id
      }
    });
  });

  return true;
}

async function createThankYouPages(graphql, createPage, reporter) {
  const ThankYouPageTemplate = path.resolve('src/templates/thank-you.jsx');

  const result = await graphql(
    `
      query {
        pageQuery: allContentfulPageGeneric(
          filter: { templateName: { eq: "thank-you" } }
          sort: { slug: ASC }
        ) {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `
  );

  // Handle query errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return false;
  }

  const ThankYouPageEntries = result.data.pageQuery.edges.map((edge) => edge.node);

  ThankYouPageEntries.forEach((page, index) => {
    const { id, slug } = page;
    const backgroundColor = index % 2 === 0 ? 'almond' : 'seaGlass';

    createPage({
      path: `/${slug}/`,
      component: ThankYouPageTemplate,
      id,
      context: {
        id,
        backgroundColor
      }
    });
  });

  return true;
}

async function createBookCallPages(graphql, createPage, reporter) {
  const BookCallPageTemplate = path.resolve('src/templates/book-call.jsx');

  const result = await graphql(
    `
      query {
        pageQuery: allContentfulPageGeneric(
          filter: { templateName: { eq: "book-call" } }
          sort: { slug: ASC }
        ) {
          edges {
            node {
              id
              slug
              templateName
            }
          }
        }
      }
    `
  );

  // Handle query errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return false;
  }

  const BookCallPageEntries = result.data.pageQuery.edges.map((edge) => edge.node);

  BookCallPageEntries.forEach((page) => {
    const { id, slug, templateName } = page;

    createPage({
      path: `/${templateName}/${slug}/`,
      component: BookCallPageTemplate,
      id,
      context: {
        id
      }
    });
  });

  return true;
}

async function createGenericPages(graphql, createPage, reporter) {
  const GenericPageTemplate = path.resolve('src/templates/generic-page.jsx');

  const result = await graphql(
    `
      query {
        pageQuery: allContentfulPageGeneric(
          filter: { templateName: { regex: "/generic-page/gi" } }
          sort: { createdAt: ASC }
        ) {
          edges {
            node {
              id
              slug
              templateName
            }
          }
        }
      }
    `
  );

  // Handle query errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return false;
  }

  const GenericPageEntries = result.data.pageQuery.edges.map((edge) => edge.node);

  GenericPageEntries.forEach((page, index) => {
    const { id, slug } = page;
    const styleguidePage = slug.includes('styleguide');
    const offset = index % 3;

    createPage({
      path: `/${slug}/`,
      component: GenericPageTemplate,
      id,
      context: {
        id,
        styleguidePage,
        offset
      }
    });
  });

  return true;
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  if (!(await createBlogPostPages(graphql, createPage, reporter))) {
    return;
  }

  if (!(await createBlogCategoryPages(graphql, createPage, reporter))) {
    return;
  }

  if (!(await createBlogPage(graphql, createPage))) {
    return;
  }

  if (!(await createCoursePages(graphql, createPage, reporter))) {
    return;
  }

  if (!(await createBootcampPages(graphql, createPage, reporter))) {
    return;
  }

  if (!(await createEmployeePages(graphql, createPage, reporter))) {
    return;
  }

  if (!(await createLegalesePages(graphql, createPage, reporter))) {
    return;
  }

  if (!(await createGradShowcasePages(graphql, createPage, reporter))) {
    return;
  }

  if (!(await createEventLandingPages(graphql, createPage, reporter))) {
    return;
  }

  if (!(await createCareerPathwaysPages(graphql, createPage, reporter))) {
    return;
  }

  if (!(await createHireAGradPages(graphql, createPage, reporter))) {
    return;
  }

  if (!(await createThankYouPages(graphql, createPage, reporter))) {
    return;
  }

  if (!(await createBookCallPages(graphql, createPage, reporter))) {
    return;
  }

  if (!(await createGenericPages(graphql, createPage, reporter))) {
    // eslint-disable-next-line no-useless-return
    return;
  }
};

// Updates webpack's config to ignore the scss module order warnings in development builds. Because we rely on SCSS modules, these order warnings aren't really a problem for us because class names are scoped to the module file. There are a lot of these warnings that clog up the development log which contains other important warnings, so I've ignored them.
// Note this is only for development builds, I do want these warnings present in Netlify build logs to ensure we have a record of them somewhere
// https://stackoverflow.com/questions/63124432/how-do-i-configure-mini-css-extract-plugin-in-gatsby
exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  if (stage === 'develop') {
    const config = getConfig();
    const miniCssExtractPlugin = config.plugins.find(
      (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin'
    );
    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true;
    }
    actions.replaceWebpackConfig(config);
  }
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  actions.createTypes([
    schema.buildObjectType({
      name: 'ContentfulSession',
      interfaces: ['Node'],
      fields: {
        // three optional fields that will break queries
        // if there are no contentful objects with values
        customBannerText: 'String',
        // supports filtering results to only future sessions
        isFuture: {
          type: 'Boolean!',
          resolve: (session) =>
            DateTime.fromISO(session.startDate, { zone: 'America/Toronto' }) > DateTime.local()
        }
      }
    }),
    schema.buildObjectType({
      name: 'ContentfulEventSession',
      interfaces: ['Node'],
      fields: {
        // supports filtering results to only future events
        isFuture: {
          type: 'Boolean!',
          resolve: (event) =>
            DateTime.fromISO(event.date, { zone: 'America/Toronto' }) > DateTime.local()
        }
      }
    }),
    schema.buildObjectType({
      name: 'ContentfulCourseDetails',
      interfaces: ['Node'],
      fields: {
        // one optional field that will break queries
        // if there are no contentful objects with values
        heroBgColor: 'String'
      }
    }),
    schema.buildObjectType({
      name: 'ContentfulProject',
      interfaces: ['Node'],
      fields: {
        // one optional field that will break queries
        // if there are no contentful objects with values
        studentName: 'String',
        byline: 'String'
      }
    }),
    schema.buildObjectType({
      name: 'ContentfulPerson',
      interfaces: ['Node'],
      fields: {
        // adds field to allow for filtering for all instructors
        isInstructor: {
          type: 'Boolean!',
          resolve: (person) => person.instructorBootcamp || person.instructorPT
        }
      }
    }),
    schema.buildObjectType({
      name: 'ContentfulBlogPost',
      interfaces: ['Node'],
      fields: {
        // Rewrite values for the featuredPost field so that null = false
        featuredPost: {
          type: 'Boolean',
          resolve: (blog) => blog.featuredPost || false
        },
        positionFilled: {
          type: 'Boolean',
          resolve: (blog) => blog.positionFilled || false
        },
        showOnlyAsPreview: {
          type: 'Boolean',
          resolve: (blog) => blog.showOnlyAsPreview || false
        }
      }
    })
  ]);
};
