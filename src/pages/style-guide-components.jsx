import React from 'react';
import SiteLink from '../components/SiteLink/SiteLink';

import Head from '../components/Head/Head';
import Button from '../components/Button/Button';
import CarouselArrow from '../components/SVG/CarouselArrow';

import * as StyleGuideStyles from './style-guide.module.scss';
import * as StyleGuideComponentsStyles from './style-guide-components.module.scss';

const StyleGuideComponents = ({ location }) => {
  const metaContent = {
    title: 'Components | Style Guide'
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
          {/* Button component */}
          <section id="buttons">
            <h3>Buttons</h3>
            <div className={StyleGuideComponentsStyles.component}>
              <div className={StyleGuideComponentsStyles.componentVariation}>
                <h4>Primary button</h4>
                <Button
                  urlIsRelativePath
                  href={`${location.pathname}#buttons`}
                  buttonStyle="primary"
                  text="Download Info Package"
                />
              </div>
              <div className={StyleGuideComponentsStyles.componentVariation}>
                <h4>Secondary button</h4>
                <Button
                  urlIsRelativePath
                  href={`${location.pathname}#buttons`}
                  buttonStyle="secondary"
                  text="Download Syllabus"
                />
              </div>
              <div className={StyleGuideComponentsStyles.componentVariation}>
                <h4>Secondary Violet button</h4>
                <Button
                  urlIsRelativePath
                  href={`${location.pathname}#buttons`}
                  buttonStyle="secondaryviolet"
                  text="Apply Now"
                />
              </div>
              <div
                className={`${StyleGuideComponentsStyles.componentVariation} ${StyleGuideComponentsStyles.darkBackground}`}
              >
                <h4>Secondary White button</h4>
                <Button
                  urlIsRelativePath
                  href={`${location.pathname}#buttons`}
                  buttonStyle="secondarywhite"
                  text="Meet Our Graduates"
                />
              </div>
              <div
                className={`${StyleGuideComponentsStyles.componentVariation} ${StyleGuideComponentsStyles.darkBackground}`}
              >
                <h4>Tertiary button</h4>
                <Button
                  urlIsRelativePath
                  href={`${location.pathname}#buttons`}
                  buttonStyle="tertiary"
                  text="Get started for free"
                />
              </div>
              <div className={StyleGuideComponentsStyles.componentVariation}>
                <h4>Submit button</h4>
                <Button type="submit" buttonStyle="submit" text="Request city" />
              </div>
            </div>
            <pre className={StyleGuideStyles.codeExample}>
              <code>
                {`
{/* === BUTTONS === */}
{/* primary */}
<Button
  urlIsRelativePath
  href="${location.pathname}#buttons"
  buttonStyle="primary"
  text="Download Info Package"
/>

{/* secondary */}
<Button
  urlIsRelativePath
  href="${location.pathname}#buttons"
  buttonStyle="secondary"
  text="Download Syllabus"
/>

{/* secondaryviolet */}
<Button
  urlIsRelativePath
  href="${location.pathname}#buttons"
  buttonStyle="secondaryviolet"
  text="Apply Now"
/>

{/* secondarywhite */}
<Button
  urlIsRelativePath
  href="${location.pathname}#buttons"
  buttonStyle="secondarywhite"
  text="Meet Our Graduates"
/>

{/* tertiary */}
<Button
  urlIsRelativePath
  href="${location.pathname}#buttons"
  buttonStyle="tertiary"
  text="Get started for free"
/>

{/* submit */}
<Button 
  type="submit" 
  buttonStyle="submit" 
  text="Request city" 
/>
                  `}
              </code>
            </pre>
          </section>
          {/* Carousel Arrow component */}
          <section>
            <h3>Carousel Arrows</h3>
            <div className={StyleGuideComponentsStyles.component}>
              <div className={StyleGuideComponentsStyles.componentVariation}>
                <h4>Primary arrow</h4>
                <CarouselArrow type="primary" direction="previous" />
                <CarouselArrow type="primary" direction="next" />
              </div>
              <div className={StyleGuideComponentsStyles.componentVariation}>
                <h4>Primary Violet arrow</h4>
                <CarouselArrow type="primaryviolet" direction="previous" />
                <CarouselArrow type="primaryviolet" direction="next" />
              </div>
              <div
                className={`${StyleGuideComponentsStyles.componentVariation} ${StyleGuideComponentsStyles.darkBackground}`}
              >
                <h4>Secondary arrow</h4>
                <CarouselArrow type="secondary" direction="previous" />
                <CarouselArrow type="secondary" direction="next" />
              </div>
              <div
                className={`${StyleGuideComponentsStyles.componentVariation} ${StyleGuideComponentsStyles.darkBackground}`}
              >
                <h4>Transparent Background</h4>
                <CarouselArrow type="secondary" direction="previous" transparentBackground />
                <CarouselArrow type="secondary" direction="next" transparentBackground />
                <CarouselArrow type="primaryviolet" direction="previous" transparentBackground />
                <CarouselArrow type="primaryviolet" direction="next" transparentBackground />
              </div>
            </div>
            <pre className={StyleGuideStyles.codeExample}>
              <code>
                {`
{/* === CAROUSEL ARROWS === */}

{/* Direction of Arrow */}
{/* previous */}
<CarouselArrow 
  direction="previous"
  type="primary"
/>

{/* next */}
<CarouselArrow 
  direction="next"
  type="primaryviolet"
/>

{/* Type of Arrow */}
{/* primary */}
<CarouselArrow 
  direction="next"
  type="primary"
/>

{/* primaryviolet */}
<CarouselArrow 
  direction="next"
  type="primaryviolet"
/>

{/* secondary */}
<CarouselArrow 
  direction="next"
  type="primaryviolet"
/>

{/* Optional Prop: transparentBackground */}
<CarouselArrow 
  direction="next"
  type="secondary"
  transparentBackground
/>
                  `}
              </code>
            </pre>
          </section>
        </main>
      </div>
    </>
  );
};

export default StyleGuideComponents;
