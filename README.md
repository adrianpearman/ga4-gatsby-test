# junocollege.com | [![Netlify Status](https://api.netlify.com/api/v1/badges/e59f7d0d-b918-47db-ab36-36d9236f88da/deploy-status)](https://app.netlify.com/sites/junocollege/deploys)

Company website for Juno College of Technology running on [Gatsby](https://www.gatsbyjs.org/),
[React](https://reactjs.org/), and [Node.js](https://nodejs.org/) with the
[Contentful](https://www.contentful.com/) CMS.

## Installation

```bash
git clone https://github.com/HackerYou/juno-website.git
cd juno-website
npm install
```

## Linting and Formatting

We're using ESLint on this project, following the
[Airbnb's JavaScript Style Guide](https://github.com/airbnb/javascript) as well as using
[jsx-a11y for accessibility](https://www.npmjs.com/package/eslint-plugin-jsx-a11y) linting. For code
formatting, we will be using [Prettier](https://prettier.io/).

### Setting up your IDE

Before contributing, please do the following to ensure your code adheres to our guidelines:

- install the ESLint extension for your IDE
- install the Prettier extension for your IDE
- Turn on the following in your IDE's settings
  - Format on save
  - Format on type
  - Autofix on save for ESLint
  - Enable ESLint
  - Single quotes for Prettier

### What to expect

Once you have set up your IDE, you can expect:

- On save and type, your code should format based on the prettier configurations
- There will be a red underline for any code that does not follow the rules set up for ESLint

### Modifying linting and formatting rules

To modify any linting rules, you can edit the
[`.eslintrc.js`](https://github.com/HackerYou/juno-website/blob/main/.eslintrc.js) file found in the
root of this project folder.

To modify any formatting rules, you can edit the
[`.prettierrc`](https://github.com/HackerYou/juno-website/blob/main/.prettierrc) file found in the
root of this project folder.

## Contributing

Please read through these sections before you start to work on a feature. They will provide insights
on how to effectively work and understand the code.

### Development Process

Follow the directions outlined in the
[Development Process](documentation/reference/development-process.md) reference documentation.

### Environment Variables and Contentful

In order for the project to run, you'll need to connect the Contentful environment variables. Run
`cp .env-template .env` which creates an `.env` file at the root of the project and copies the
contents of the `.env-template` back into the `.env` file. Do not delete the `.env-template`. Your
`.env` file will then be git-ignored by default and `gatsby-config.js` will now have access to your
environment variables once you add them in.

Values for the `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN` can be found in 1Password under
"Juno Contentful Development API Key"

### Branching

When working on a new feature, make a new branch for that feature and keep only relevant work
contained within that branch. For example if you are working on the header navigation and create a
branch for it, don't start working on an unrelated task in the same branch like updating blog
styles. Make separate branches for each issue/task defined in GitHub.

```bash
git pull origin main
git checkout -b some-feature-branch-name
```

### Netlify Dev

Netlify Dev allows you to run your project in an environment as close to the production environment
as possible.

1. `npm install netlify-cli -g`
1. [login](https://app.netlify.com/login/email) to Netlify and use the `webteam@hackeryou.com`
   email. Password is in 1pass.
1. `netlify login` will open up a webpage for your to authorize and connect the Netlify CLI to the
   Netlify web account.
1. `netlify dev` or `netlify dev --live`

After running `netlify dev`, Netlify will serve up a production server on `http://localhost:8888` in
parallel with Gatsby's development builds running on `http://localhost:8000` and
`http://localhost:8000/___graphql`. If you run `netlify dev --live` you'll still get the usual
Gatsby development builds, but also a **sharable** live production build url provided by Netlify.

The live sharable production build will be a great way to make sure you get things done correctly
pre pull request. If you want a quick audit of something you're working on before you submit a PR,
just share your link and get instant feedback from any of your teammates or designers. No need to
wait until a pull request is submitted to double check and fix small design issues in real time.
Code related discussions and audits will still be done during the regular pull request approval
stage, naturally.

If you use Netlify and/or Netlify Dev on your own personal websites then you'll need to make sure
you're logged out of Netlify on the web, as well as in the CLI using `netlify logout`. Then log into
the HackerYou/Juno Netlify web account, then proceed to run `netlify login` to connect and authorize
the CLI to the web account. You always need to make sure you're logged into the correct
corresponding Netlify account whenever developing with the Netlify CLI.

Read more about [Netlify Dev](https://www.netlify.com/products/dev/) and explore their
[docs](https://www.netlify.com/docs/) for further information.

### Styling

The `./src/styles/` folder will house all of our _global_ styles. We'll be making use of
component-scoped styles using [CSS Modules](https://using-gatsby-image.gatsbyjs.org/traced-svg/).
This will allow us to use clear and concise class names in our components.

Please declare variables in the `variables.scss` file only. The project variables, mixins, and
browser normalization styles are all being injected on build in the `gatsby-config.js` so that our
components CSS Modules have access to the variables and mixins we define. This also means we don't
have to import these files into every single page and component. The one caveat is that your editor
won't be able to suggest completions based off pre-defined variables and mixins.

#### Testing Stripe flows

Course purchases trigger a Stripe checkout flow. To test this out, set the `GATSBY_NETLIFY_CONTEXT`
.env variable to either `development` or `deploy-preview` and complete purchases using a
[Stripe test credit card](https://stripe.com/docs/testing).

#### Previewing unpublished content in Contentful

When you want to test out updated content in Contentful, but you aren't ready to publish, you can
use the
[Contentful preview API](https://www.contentful.com/developers/docs/references/content-preview-api/#/introduction/using-the-preview-api).
To use this, you need to update 3 env variables:

- CONTENTFUL_HOST='preview.contentful.com'
- CONTENTFUL_SPACE_ID - get this value from the
  [Contentful API keys page](https://app.contentful.com/spaces/tfvkuuj8nae0/api/keys)
- CONTENTFUL_ACCESS_TOKEN - get this value from the
  [Contentful API keys page](https://app.contentful.com/spaces/tfvkuuj8nae0/api/keys)

#### Colors

All of Juno's colour variations are stored in the `src/styles/variables.scss`.

In Viv & Franks design assets, they use a "tinting" of certain colours. We have a custom function to
handle this in `src/styles/functions.scss`.

For example if the design asset says the colour blue-sky-2 with a 25% tint. We'd write
`background: tint($juno-blue-sky-2, 75%);`. Always subtract the tint percentage they use by 100 to
get your tint percent. If they wanted a 45% tint, we'd put 65%. If they want a 15% tint, we'd put
85% etc.

#### The grid

Per Studio Function's designs, the site layout is based on a 36-column grid (on tablet –
`max-width: 1024px` – this drops to 24-column, and on mobile – `max-width: 640px` – it drops to
12-column) with a 1% gap between columns. There are also two extra columns: one at far left and far
right at 4% width, which, combined with the column gap, give the site 5% margins on either side.
This means the layouts can be constrained to a max-width of 1400px but still have consistent margins
on screens smaller than that, without having to add another wrapping div around everything, and
still easily allow some page elements to break out of the margins where the designs require it.

When building pages it's easiest to give each page section the global `.grid-wrapper` style (in
addition to any local component styles for colour, padding, etc) so that it inherits the global grid
and you can line things up more easily. For the most part page elements set in the grid should be
between grid-columns 2 and -2, to keep the side margins consistent. If a page or section design
requires a 'full-bleed' image, then that element can start at `grid-column-start: 1` (which starts
at the left edge of the viewport) and/or end at `grid-column-end: -1` (ends at the right edge of the
viewport).

### Gatsby Image

[Gatsby Image](https://www.gatsbyjs.org/packages/gatsby-image/) is a powerful tool for optimizing
images in a Gatsby site and it will provide us with many features to help with the overall
performance. Please read the [documentation](https://using-gatsby-image.gatsbyjs.org/) and look at
the [demo examples](https://using-gatsby-image.gatsbyjs.org/) to see the power of Gatsby Image in
action.

First we need to get our images into the GraphQL data layer.

```js
// gatsby-config.js
module.exports = {
  /* ... */
  plugins: [
    /* ... */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`
      }
    }
  ]
};
```

Then import `graphql` and `useStaticQuery` from Gatsby. Use `useStaticQuery` to pull the image from
GraphQL and render the image via the `<Img />` component. It has many different props you can pass
it to achieve different results. The two main options for how an image renders is `fluid` and
`fixed`. In this example we show only `fixed`, with our images being served in the newest `Webp`
format with the [Traced SVG](https://using-gatsby-image.gatsbyjs.org/traced-svg/) feature.

<!-- prettier-ignore-start -->
```js
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

const data = useStaticQuery(graphql`
  query {
    firstPic: file(relativePath: {eq: "example-photo.jpg"}) {
      childImageSharp {
        fixed(width: 200px, height:200px) {
          ...GatsbyImageSharpFixed_withWebp_tracedSVG
        }
      }
    }
  }
`)

const Home = () => {
  return (
    <Img
      fixed={data.firstPic.childImageSharp.fixed}
      alt="Alumni photo"
    />
  )
}
```
<!-- prettier-ignore-end -->

#### Caveats

When changing options on `useStaticQuery`, you'll need to restart the server to see the correct
changes.

When working with many images (over 20), it might not be best to have tons of separate image queries
cluttering up the code. We'll be looking into ways around this if/when we run into this issue.

### Submitting a PR

Once you're done developing on your feature branch you'll need to add, commit, and push those
changes to your feature branch on GitHub. Then you'll be creating a pull request for further review.
Please follow the
[Website Development Process](https://docs.google.com/document/d/19Vemtstg8R8cKc66sAzmBLzZPLnRiUKIhl68qTOHagU/edit#heading=h.iy5hx6ee19kk).

The moment pull requests are created, Netlify automatically goes through its checks and creates a
deploy preview for your reviewers to look at. This happens because of Netlify's
[Continuous Deployment](https://www.netlify.com/docs/continuous-deployment/) feature. You'll also be
notified about the deploy in the slack channel `#website-deploys`.

## Folder Structures & Naming Conventions

Everything we need is in the `src` folder. Here's a few structuring rules to follow while building
features on Juno's website.

- `assets` holds all external assets. Right now that's where the `fonts` and `images` live, but if
  we ever need to add different kinds of external assets, put them in there.
- `components` is for React components. Store each component file in a folder and use capital
  letters for the folders, javascript, and the sass files inside.
- `pages` folder is for new pages like "about us" or "contact". These will usually be accessible
  through Gatsby's `<Link to="/">` component.
- `styles` folder will be used for _global_ styles only (typography, browser normalization, mixins,
  etc).
- `templates` folder is for reusable templates. An example being a blog post, or a user profile,
  which will all have different information but use the same template.

## NPM Scripts

There's a list of NPM scripts in the `package.json` that will help with certain tasks. The ones to
take note of that you might not be familiar with:

- `npm run clean` will run two scripts that remove the `.cache` and `public` folders at the root of
  the project.
- `npm run check` will update all your packages to the latest **in the `package.json` only**. You'll
  then have to run `npm install` to get those updated packages installed.
- `npm run format` will run a prettier format on all of your `.js` and `.jsx` files inside of `src`.

### Snapshots

Some tests create files in a `__snapshots__` directory adjacent to the test scripts. These files
should be added to git as they get created & updated.

If you make changes that mean you need to update the snapshot, you can do this by running
`npm test -- -u`.
