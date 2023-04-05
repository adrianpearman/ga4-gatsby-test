import React, { Fragment } from 'react';
import SiteLink from '../components/SiteLink/SiteLink';

import Head from '../components/Head/Head';
import sluggify from '../helpers/sluggify';

import * as StyleGuideStyles from './style-guide.module.scss';
import * as StyleGuideColorsStyles from './style-guide-colors.module.scss';

const colorPalette = [
  ['$white', '#fff'],
  ['$juno-red', '#ea593e'],
  ['$juno-link-red', '#d64c31'],
  ['$juno-coral', '#ed725b'],
  ['$juno-burnt-orange', '#d86227'],
  ['$juno-violet-grey', '#4a455c'],
  ['$juno-dark-violet', '#221c38'],
  ['$juno-mauve', '#84707f'],
  ['$juno-mauve-blue', '#7c7d98', 'tint(25%) - #9d9eb2'],
  ['$juno-evergreen', '#105754'],
  ['$juno-sea-glass', '#deebe7', 'tint(40%) - #ebf3f1'],
  ['$juno-pale-mint', '#bdddd8'],
  ['$juno-pale-mint-2', '#b6d9d4'],
  ['$juno-blue-sky', '#cfdde7', 'tint(70%) - #f1f5f8'],
  ['$juno-blue-sky-2', '#c7d5df', 'tint(50%) - #e3eaef', 'tint(60%) - #e9eef2'],
  ['$juno-periwinkle', '#96a1be', 'tint(70%) - #e0e3ec'],
  ['$juno-mustard', '#daad46'],
  ['$juno-tumeric', '#e59c2e'],
  ['$juno-yellow-peach', '#efd397', 'tint(60%) - #f9edd5'],
  ['$juno-almond', '#e9c9af'],
  ['$juno-almond-2', '#edd7c8', 'tint(80%) - #edd7c8'],
  ['$juno-peach', '#e7b38a'],
  ['$juno-custard', '#ffcdaf'],
  ['$juno-custard-2', '#ffdbc4'],
  ['$juno-sand', '#f5dfd0', 'tint(30%) - #f8e9de'],
  ['$juno-light-sand', '#fbf7f4']
];

const StyleGuideColors = () => {
  const metaContent = {
    title: 'Colours | Style Guide'
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
          <h2>Colors</h2>
          <section className={StyleGuideColorsStyles.colors}>
            <h3>Color palette</h3>
            {colorPalette.map((listOfColors) => (
              <div className={StyleGuideColorsStyles.colorBlock} key={listOfColors[0]}>
                <div
                  className={StyleGuideColorsStyles.colorSample}
                  style={{ background: listOfColors[1] }}
                />
                <div className={StyleGuideColorsStyles.colorLabel}>
                  {listOfColors.map((color) => (
                    <Fragment key={sluggify(color)}>{color && <code>{color}</code>}</Fragment>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </main>
      </div>
    </>
  );
};

export default StyleGuideColors;
