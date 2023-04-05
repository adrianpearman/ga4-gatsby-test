import React from 'react';
import SiteLink from '../components/SiteLink/SiteLink';

import Head from '../components/Head/Head';

import * as StyleGuideStyles from './style-guide.module.scss';
import * as StyleGuideTypographyStyles from './style-guide-typography.module.scss';

const StyleGuideTypography = ({ location }) => {
  const metaContent = {
    title: 'Typography | Style Guide'
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
          <h2>Typography</h2>
          <section>
            <h3>Headings</h3>
            <h4>Elements</h4>
            {/* h1 */}
            <div className={StyleGuideTypographyStyles.container}>
              <div className={StyleGuideTypographyStyles.element}>
                <code className={StyleGuideStyles.codeInline}>h1</code>
              </div>
              <div className={StyleGuideTypographyStyles.example}>
                <span className={StyleGuideTypographyStyles.h1}>Heading 1</span>
              </div>
            </div>
            {/* h2 */}
            <div className={StyleGuideTypographyStyles.container}>
              <div className={StyleGuideTypographyStyles.element}>
                <code className={StyleGuideStyles.codeInline}>h2</code>
              </div>
              <div className={StyleGuideTypographyStyles.example}>
                <span className={StyleGuideTypographyStyles.h2}>Heading 2</span>
              </div>
            </div>
            {/* h3 */}
            <div className={StyleGuideTypographyStyles.container}>
              <div className={StyleGuideTypographyStyles.element}>
                <code className={StyleGuideStyles.codeInline}>h3</code>
              </div>
              <div className={StyleGuideTypographyStyles.example}>
                <span className={StyleGuideTypographyStyles.h3}>Heading 3</span>
              </div>
            </div>
            {/* h4 */}
            <div className={StyleGuideTypographyStyles.container}>
              <div className={StyleGuideTypographyStyles.element}>
                <code className={StyleGuideStyles.codeInline}>h4</code>
              </div>
              <div className={StyleGuideTypographyStyles.example}>
                <span className={StyleGuideTypographyStyles.h4}>Heading 4</span>
              </div>
            </div>
            {/* h5 */}
            <div className={StyleGuideTypographyStyles.container}>
              <div className={StyleGuideTypographyStyles.element}>
                <code className={StyleGuideStyles.codeInline}>h5</code>
              </div>
              <div className={StyleGuideTypographyStyles.example}>
                <span className={StyleGuideTypographyStyles.h5}>Heading 5</span>
              </div>
            </div>
            {/* h6 */}
            <div className={StyleGuideTypographyStyles.container}>
              <div className={StyleGuideTypographyStyles.element}>
                <code className={StyleGuideStyles.codeInline}>h6</code>
              </div>
              <div className={StyleGuideTypographyStyles.example}>
                <span className={StyleGuideTypographyStyles.h6}>Heading 6</span>
              </div>
            </div>
            <h4>Variations - class names</h4>
            {/* h1.sub-title */}
            <div className={StyleGuideTypographyStyles.container}>
              <div className={StyleGuideTypographyStyles.element}>
                <code className={StyleGuideStyles.codeInline}>h1.sub-title</code>
              </div>
              <div className={StyleGuideTypographyStyles.example}>
                <h1 className="sub-title">Part-Time Web Development Courses in Toronto</h1>
              </div>
            </div>
            {/* title-background */}
            <div className={StyleGuideTypographyStyles.container}>
              <div className={StyleGuideTypographyStyles.element}>
                <code className={StyleGuideStyles.codeInline}>.title-background</code>
              </div>
              <div className={StyleGuideTypographyStyles.example}>
                <span className="title-background">Our Alumni</span>
              </div>
            </div>
            {/* 
          .title-product
          .title-location */}
            <div className={StyleGuideTypographyStyles.container}>
              <div className={StyleGuideTypographyStyles.element}>
                <code className={StyleGuideStyles.codeInline}>.title-product</code>
                <code className={StyleGuideStyles.codeInline}>.title-location</code>
              </div>
              <div className={StyleGuideTypographyStyles.example}>
                <span className="title-product-name">Web Development</span>
                <span className="title-location">Toronto</span>
              </div>
            </div>

            {/* section-title-alternative */}
            <div className={StyleGuideTypographyStyles.container}>
              <div className={StyleGuideTypographyStyles.element}>
                <code className={StyleGuideStyles.codeInline}>.section-title-alternative</code>
              </div>
              <div className={StyleGuideTypographyStyles.example}>
                <span className="section-title-alternative">Dates and Costs</span>
              </div>
            </div>
            {/* title-student-name-story */}
            <div className={StyleGuideTypographyStyles.container}>
              <div className={StyleGuideTypographyStyles.element}>
                <code className={StyleGuideStyles.codeInline}>.title-student-name-story</code>
              </div>
              <div className={StyleGuideTypographyStyles.example}>
                <span className="title-student-name-story">Allison Wong-Baxter</span>
              </div>
            </div>
            {/* title-blog-full */}
            <div className={StyleGuideTypographyStyles.container}>
              <div className={StyleGuideTypographyStyles.element}>
                <code className={StyleGuideStyles.codeInline}>.title-blog-full</code>
              </div>
              <div className={StyleGuideTypographyStyles.example}>
                <span className="title-blog-full">
                  Paving the Way for Income Share Agreements in Canada
                </span>
              </div>
            </div>
          </section>
          <section>
            <h3>Body text</h3>
            <h4>Elements</h4>
            {/* blockquote */}
            <div className={StyleGuideTypographyStyles.container}>
              <div className={StyleGuideTypographyStyles.element}>
                <code className={StyleGuideStyles.codeInline}>blockquote</code>
              </div>
              <div className={StyleGuideTypographyStyles.example}>
                <blockquote>
                  To me, what we are doing at Juno is only worthwhile if it’s innovative. If I’m not
                  {` `}
                  free{` `}
                  to implement the latest innovations, technologies, learnings from research, and
                  best
                  {` `}
                  practices at Juno, I’m just not interested.”
                </blockquote>
              </div>
            </div>
            {/* p */}
            <div className={StyleGuideTypographyStyles.container}>
              <div className={StyleGuideTypographyStyles.element}>
                <code className={StyleGuideStyles.codeInline}>p</code>
              </div>
              <div className={StyleGuideTypographyStyles.example}>
                <span className={StyleGuideTypographyStyles.p}>
                  {' '}
                  At Juno, we craft custom learning journeys that accelerate careers. We’ll tailor a
                  learning path for you based on your interests, talents, resources and goals – and
                  that training continues until you land a job making $50K a year or more. It
                  doesn’t matter whether that takes weeks, months or years, we’re with you until
                  you’re employed. And until we make good on our promise, you’ll only pay us $1. We
                  know, we know – finally, a school that gets it.{' '}
                </span>
              </div>
            </div>
            <div className={StyleGuideTypographyStyles.container}>
              <div className={StyleGuideTypographyStyles.element}>
                <code className={StyleGuideStyles.codeInline}>a</code>
              </div>
              <div className={StyleGuideTypographyStyles.example}>
                <a href={location.pathname} className={StyleGuideTypographyStyles.link}>
                  View full bio
                </a>
              </div>
            </div>
            <h4>Variations - class names</h4>
            {/* .stat-individual */}
            <div className={StyleGuideTypographyStyles.container}>
              <div className={StyleGuideTypographyStyles.element}>
                <code className={StyleGuideStyles.codeInline}>.stat-individual</code>
              </div>
              <div className={StyleGuideTypographyStyles.example}>
                <span className="stat-individual">11,594</span>
              </div>
            </div>
            {/* .related-posts */}
            <div className={StyleGuideTypographyStyles.container}>
              <div className={StyleGuideTypographyStyles.element}>
                <code className={StyleGuideStyles.codeInline}>.related-posts</code>
              </div>
              <div className={StyleGuideTypographyStyles.example}>
                <span className="related-posts">Related posts</span>
              </div>
            </div>
            {/* .show-more-related */}
            <div className={StyleGuideTypographyStyles.container}>
              <div className={StyleGuideTypographyStyles.element}>
                <code className={StyleGuideStyles.codeInline}>.show-more-related</code>
              </div>
              <div className={StyleGuideTypographyStyles.example}>
                <span className="show-more-related">Load more posts</span>
              </div>
            </div>
            {/* .show-more-related-alternative */}
            <div className={StyleGuideTypographyStyles.container}>
              <div className={StyleGuideTypographyStyles.element}>
                <code className={StyleGuideStyles.codeInline}>.show-more-related-alternative</code>
              </div>
              <div className={StyleGuideTypographyStyles.example}>
                <span className="show-more-related-alternative">Load more posts</span>
              </div>
            </div>
          </section>
          <section id="decorative">
            <h3>Decorative</h3>
            <h4>Class names</h4>
            {/* .filter-btn */}
            <div className={StyleGuideTypographyStyles.container}>
              <div className={StyleGuideTypographyStyles.element}>
                <code className={StyleGuideStyles.codeInline}>.filter-btn</code>
              </div>
              <div className={StyleGuideTypographyStyles.example}>
                <span className="filter-btn">All Posts</span>
              </div>
            </div>
            {/* .filter-btn active */}
            <div className={StyleGuideTypographyStyles.container}>
              <div className={StyleGuideTypographyStyles.element}>
                <code className={StyleGuideStyles.codeInline}>.filter-btn.active</code>
              </div>
              <div className={StyleGuideTypographyStyles.example}>
                <a href={`${location.pathname}#decorative`} className="filter-btn active">
                  All Posts
                </a>
              </div>
            </div>
            {/* .link-arrow .link-arrow-colour */}
            <div className={StyleGuideTypographyStyles.container}>
              <div className={StyleGuideTypographyStyles.element}>
                <code className={StyleGuideStyles.codeInline}>.link-arrow</code>
              </div>
              <div className={StyleGuideTypographyStyles.example}>
                <a href={`${location.pathname}#decorative`} className="link-arrow">
                  Book a campus tour
                </a>
              </div>
            </div>
            <div className={StyleGuideTypographyStyles.container}>
              <div className={StyleGuideTypographyStyles.element}>
                <code className={StyleGuideStyles.codeInline}>.link-arrow .link-arrow-custard</code>
              </div>
              <div className={StyleGuideTypographyStyles.example}>
                <a
                  href={`${location.pathname}#decorative`}
                  className="link-arrow link-arrow-custard"
                >
                  This text will likely also be custard
                </a>
              </div>
            </div>
            <div className={StyleGuideTypographyStyles.container}>
              <div className={StyleGuideTypographyStyles.element}>
                <code className={StyleGuideStyles.codeInline}>.link-arrow .link-arrow-white</code>
              </div>
              <div className={StyleGuideTypographyStyles.example}>
                <a href={`${location.pathname}#decorative`} className="link-arrow link-arrow-white">
                  Trust me theres an arrow here
                </a>
              </div>
            </div>
          </section>
          <section>
            <h3>Transitions</h3>
            <p className={StyleGuideTypographyStyles.helpText}>
              Examples of our different transition timings. Hover over demonstrations to see timing
              in action.
            </p>
            <div className={StyleGuideTypographyStyles.container}>
              <div className={StyleGuideTypographyStyles.element}>
                <h4>Variable Name</h4>
              </div>
              <div className={StyleGuideTypographyStyles.example}>
                <h4>Demonstration</h4>
              </div>
            </div>
            <div className={StyleGuideTypographyStyles.container}>
              <div className={StyleGuideTypographyStyles.element}>
                <code className={StyleGuideStyles.codeInline}>$default-duration</code>
              </div>
              <div className={StyleGuideTypographyStyles.example}>
                <p
                  className={`${StyleGuideTypographyStyles.transitionExample} ${StyleGuideTypographyStyles.common}`}
                >
                  0.3s
                </p>
              </div>
            </div>
            <div className={StyleGuideTypographyStyles.container}>
              <div className={StyleGuideTypographyStyles.element}>
                <code className={StyleGuideStyles.codeInline}>$fast-duration</code>
              </div>
              <div className={StyleGuideTypographyStyles.example}>
                <p
                  className={`${StyleGuideTypographyStyles.transitionExample} ${StyleGuideTypographyStyles.fast}`}
                >
                  0.2s
                </p>
              </div>
            </div>
            <div className={StyleGuideTypographyStyles.container}>
              <div className={StyleGuideTypographyStyles.element}>
                <code className={StyleGuideStyles.codeInline}>$slow-duration</code>
              </div>
              <div className={StyleGuideTypographyStyles.example}>
                <p
                  className={`${StyleGuideTypographyStyles.transitionExample} ${StyleGuideTypographyStyles.slow}`}
                >
                  0.4s
                </p>
              </div>
            </div>
            <div className={StyleGuideTypographyStyles.container}>
              <div className={StyleGuideTypographyStyles.element}>
                <code className={StyleGuideStyles.codeInline}>$slowest-duration</code>
              </div>
              <div className={StyleGuideTypographyStyles.example}>
                <p
                  className={`${StyleGuideTypographyStyles.transitionExample} ${StyleGuideTypographyStyles.nav}`}
                >
                  0.6s
                </p>
              </div>
            </div>
          </section>
          <section id="anchorbuttons">
            <h3>Anchors styled as Buttons</h3>
            <p className={StyleGuideTypographyStyles.helpText}>
              These classes are meant to be used in Markdown fields. If you need to code in a
              button, use the Button component.
            </p>
            <div className={StyleGuideTypographyStyles.container}>
              <div className={StyleGuideTypographyStyles.element}>
                <h4>Class Names</h4>
              </div>
              <div className={StyleGuideTypographyStyles.element}>
                <h4>HTML Copy</h4>
              </div>
              <div className={StyleGuideTypographyStyles.example}>
                <h4>Example</h4>
              </div>
            </div>
            <div className={StyleGuideTypographyStyles.container}>
              <div className={StyleGuideTypographyStyles.element}>
                <code className={StyleGuideStyles.codeInline}>.btn</code>
              </div>
              <div className={StyleGuideTypographyStyles.element}>
                <code
                  className={StyleGuideStyles.codeInline}
                >{`<a href="https://junocollege.com${location.pathname}" class="btn">Anchor link text</a>`}</code>
              </div>
              <div className={StyleGuideTypographyStyles.example}>
                <a
                  href={`${location.pathname}#anchorbuttons`}
                  className={`btn ${StyleGuideTypographyStyles.btn}`}
                >
                  custom button (border not included)
                </a>
              </div>
            </div>
            <div className={StyleGuideTypographyStyles.container}>
              <div className={StyleGuideTypographyStyles.element}>
                <code className={StyleGuideStyles.codeInline}>.btn .redbg-white</code>
              </div>
              <div className={StyleGuideTypographyStyles.element}>
                <code
                  className={StyleGuideStyles.codeInline}
                >{`<a href="https://junocollege.com${location.pathname}" class="btn redbg-white">Anchor link text</a>`}</code>
              </div>
              <div className={StyleGuideTypographyStyles.example}>
                <a className="btn redbg-white" href="#anchorbuttons">
                  Red background, white text
                </a>
              </div>
            </div>
            <div className={StyleGuideTypographyStyles.container}>
              <div className={StyleGuideTypographyStyles.element}>
                <code className={StyleGuideStyles.codeInline}>.btn .transparent-red</code>
              </div>
              <div className={StyleGuideTypographyStyles.element}>
                <code
                  className={StyleGuideStyles.codeInline}
                >{`<a href="https://junocollege.com${location.pathname}" class="btn transparent-red">Anchor link text</a>`}</code>
              </div>
              <div className={StyleGuideTypographyStyles.example}>
                <a className="btn transparent-red" href="#anchorbuttons">
                  Transparent background, red text
                </a>
              </div>
            </div>
            <div className={StyleGuideTypographyStyles.container}>
              <div className={StyleGuideTypographyStyles.element}>
                <code className={StyleGuideStyles.codeInline}>.btn .transparent-violet</code>
              </div>
              <div className={StyleGuideTypographyStyles.element}>
                <code
                  className={StyleGuideStyles.codeInline}
                >{`<a href="https://junocollege.com${location.pathname}" class="btn transparent-violet">Anchor link text</a>`}</code>
              </div>
              <div className={StyleGuideTypographyStyles.example}>
                <a className="btn transparent-violet" href="#anchorbuttons">
                  Transparent background, violet text
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default StyleGuideTypography;
