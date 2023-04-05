import React from 'react';
import SiteLink from '../components/SiteLink/SiteLink';

import Head from '../components/Head/Head';

import * as StyleGuideStyles from './style-guide.module.scss';

const StyleGuide = () => {
  const metaContent = {
    title: 'Style Guide'
  };

  return (
    <>
      <Head metaContent={metaContent}>
        <meta name="robots" content="noindex" />
      </Head>
      <div className={StyleGuideStyles.wrapper}>
        <header className={StyleGuideStyles.header}>
          <h1>Style guide</h1>
          <nav>
            <ul className={StyleGuideStyles.nav}>
              <li>
                <SiteLink className={StyleGuideStyles.navLink} to="/style-guide/">
                  Using the style guide
                </SiteLink>
              </li>
              <li>
                <SiteLink className={StyleGuideStyles.navLink} to="/style-guide-colors/">
                  Colours
                </SiteLink>
              </li>
              <li>
                <SiteLink className={StyleGuideStyles.navLink} to="/style-guide-typography/">
                  Typography
                </SiteLink>
              </li>
              <li>
                <SiteLink className={StyleGuideStyles.navLink} to="/style-guide-components/">
                  Components
                </SiteLink>
              </li>
            </ul>
          </nav>
        </header>
        <main className={StyleGuideStyles.content}>
          <h2>Using the style guide</h2>
          <section>
            <h3>Referencing style guide</h3>
            <p>
              This is our design reference for juno.com. There are guidelines for colors, typography
              and components. Use the navigation at the top to find documentation for each category.
            </p>
          </section>
          <section>
            <h3>Referencing specific page templates</h3>
            <p>
              A list of blog post templates that show how typography is rendered for each type of
              post.
            </p>
            <ul className={StyleGuideStyles.blogLinks}>
              <li>
                <SiteLink to="/blog/styleguide-generic-blog-post/">General Blog Post</SiteLink>
              </li>
              <li>
                <SiteLink to="/blog/styleguide-generic-student-story/">Student Story</SiteLink>
              </li>
              <li>
                <SiteLink to="/case-studies/styleguide-generic-partner-spotlight/">
                  Partner Spotlight
                </SiteLink>
              </li>
            </ul>
            <p>
              A list of example generic page templates to be used as reference when creating new
              generic pages on the site. Each component in these pages has a corresponding
              Contentful type and can be easily inserted into other site pages.
            </p>
            <ul className={StyleGuideStyles.blogLinks}>
              <li>
                <SiteLink to="/styleguide-all-sections/">Generic Page: All Sections</SiteLink>
              </li>
              <li>
                <SiteLink to="/styleguide-curated/">Generic Page: Curated</SiteLink>
              </li>
              <li>
                <SiteLink to="/styleguide-simple/">Generic Page: Simple</SiteLink>
              </li>
            </ul>
          </section>
          <section>
            <h3>Adding to the style guide</h3>
            <h4>Colours</h4>
            <p>
              Every colour used on juno.com should be stored as a Sass variable and declared in{' '}
              <code className={StyleGuideStyles.codeInline}>variables.scss</code> found in the{' '}
              <code className={StyleGuideStyles.codeInline}>styles</code> directory. The style guide
              will provide a visual representaion of each color, its corresponding variable name,
              and hex code.
            </p>
            <p>
              To add a new colour, add an array containing both the variable name and hex code to
              the <code className={StyleGuideStyles.codeInline}>colorPalette</code> declared at the
              top of the <code className={StyleGuideStyles.codeInline}>style-guide-colors.js</code>{' '}
              file, found in the <code className={StyleGuideStyles.codeInline}>pages</code>{' '}
              directory.
            </p>
            <h4>Typography</h4>
            <p>
              Documentation on commonly used typography styles should be added to the{' '}
              <code className={StyleGuideStyles.codeInline}>style-guide-typography.js</code> file.
              Any additional commonly used typography styles can be declared in{' '}
              <code className={StyleGuideStyles.codeInline}>typography.scss</code> found in the{' '}
              <code className={StyleGuideStyles.codeInline}>styles</code> directory. Some base{' '}
              stylings have already been provided for certain elements (e.g.
              <code className={StyleGuideStyles.codeInline}>h1-h6</code>,{' '}
              <code className={StyleGuideStyles.codeInline}>a</code>,{' '}
              <code className={StyleGuideStyles.codeInline}>blockquote</code>, etc). However,
              ultimately all typography styles should follow the{' '}
              <a
                className={StyleGuideStyles.linkDoc}
                href="https://drive.google.com/drive/folders/1yICdEdtJ2oBMo8sGmoRmbuDhBqckjkWu?usp=sharing"
              >
                documents provided by Studio Function
              </a>
              .
            </p>
            <p>
              Note: Letter spacing document in Block 1 and 2 are incorrect. Please refer to{' '}
              <a
                className={StyleGuideStyles.linkDoc}
                href="https://drive.google.com/open?id=1PHFZT72JnjaS60bOXh056HZ7BFWODOna"
              >
                this annotated legend
              </a>{' '}
              for re-calculated letter spacing values. There is note about this error in the Block 2
              design directory. You can find it in{' '}
              <code className={StyleGuideStyles.codeInline}>
                06 Type Styles 2/_New Type Details.txt
              </code>
            </p>
            <h4>Components</h4>
            <p>
              Documentation on how to use components should be added to{' '}
              <code className={StyleGuideStyles.codeInline}>style-guide-components.js</code> file,
              found in the <code className={StyleGuideStyles.codeInline}>pages</code> directory.
              Each component section will include a visual and code example.
            </p>
            <p>When adding information on a new component, please use the following template:</p>
            <pre className={StyleGuideStyles.codeExample}>
              <code>
                {`
                  <section>
                    <h3>Component name</h3>
                    <div className={StyleGuideComponentsStyles.component}>
                      {/*if component has variations, put here*/}
                      <div className={StyleGuideComponentsStyles.componentVariation}>
                        <h4>Variation name</h4>
                          {/* component */}
                      </div>
                      <pre className={StyleGuideStyles.codeExample}>
                        <code>
                          {/* provide code examples wrapped in template literals*/}
                        </code>
                      </pre>
                    </div>
                  </section>
              `}
              </code>
            </pre>
          </section>
        </main>
      </div>
    </>
  );
};

export default StyleGuide;
