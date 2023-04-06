require('dotenv').config({
  path: `.env`
});

// idea for dynamic plugin details coming from here: https://github.com/gatsbyjs/gatsby/issues/16756
const context = process.env.CONTEXT;

module.exports = {
  siteMetadata: {
    title: `Juno College`,
    description: `Juno College of Technology helps talented developers find success in careers they love through community-oriented classroom training and personalized support.`,
    siteUrl: `https://junocollege.com`
  },
  trailingSlash: 'always',
  plugins: [
    // {
    //   resolve: `gatsby-plugin-google-tagmanager`,
    //   options: {
    //     id: process.env.TAGMANAGER_ID,
    //     includeInDevelopment: true,
    //     defaultDataLayer: {
    //       branch: process.env.BRANCH
    //     },
    //     gtmAuth:
    //       context === 'dev' || context === 'deploy-preview'
    //         ? process.env.TAGMANAGER_QA_AUTH
    //         : process.env.TAGMANAGER_AUTH,
    //     gtmPreview:
    //       context === 'dev' || context === 'deploy-preview'
    //         ? process.env.TAGMANAGER_QA_PREVIEW
    //         : process.env.TAGMANAGER_PREVIEW,
    //     enableWebVitalsTracking: true
    //   }
    // },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          // 'YOUR GA-TRACKING_ID' // Google Analytics / GA
          'G-3MYGM3GZ1J'
        ],
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true
        }
      }
    },
    `gatsby-plugin-react-helmet-async`,
    `gatsby-plugin-catch-links`,
    // `gatsby-plugin-loadable-components-ssr`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`webp`, `auto`],
          quality: 90,
          breakpoints: [414, 749, 1029, 1450],
          placeholder: 'blurred'
        }
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images/`
      }
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: process.env.CONTENTFUL_HOST
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Juno College of Technology`,
        short_name: `Juno College`,
        description: `Juno College of Technology helps talented developers find success in careers they love through community-oriented classroom training and personalized support.`,
        icon: `./src/assets/images/favicons/android-chrome-512x512.png`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#4a455c`,
        display: `standalone`
      }
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        additionalData: `
          @import 'variables.scss';
          @import 'mixins.scss';
          @import 'functions.scss';
        `,
        sassOptions: {
          includePaths: ['./src/styles/']
        }
      }
    },
    `gatsby-transformer-remark`,
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        excludes: [
          'https://junocollege.com/purchase-thank-you/',
          'https://junocollege.com/registration-confirmed/',
          'https://junocollege.com/style-guide-colors/',
          'https://junocollege.com/style-guide-components/',
          'https://junocollege.com/style-guide-typography/',
          'https://junocollege.com/style-guide/',
          'https://junocollege.com/styleguide-all-sections/',
          'https://junocollege.com/styleguide-curated/',
          'https://junocollege.com/styleguide-simple/',
          'https://junocollege.com/bootcamp-apply-thanks/',
          'https://junocollege.com/blog/styleguide-generic-blog-post/',
          'https://junocollege.com/blog/styleguide-generic-student-story/',
          'https://junocollege.com/case-studies/styleguide-generic-partner-spotlight/',
          'https://junocollege.com/apply-thanks/'
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://junocollege.com',
        sitemap: 'https://junocollege.com/sitemap.xml',
        policy: [{ userAgent: '*', allow: ['*.jpg', '*.png', '*.js', '*.css'] }]
      }
    },
    // unregister the gatsby-plugin-offline service worker
    // it keeps causing blank pages for some reason
    `gatsby-plugin-remove-serviceworker`
  ]
};
