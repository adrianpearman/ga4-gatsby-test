import React, { useState, useEffect } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import 'intersection-observer';
import { useInView } from 'react-intersection-observer';
import SiteLink from '../SiteLink/SiteLink';

import SiteNav from '../SiteNav/SiteNav';
import JunoBrandIcon from '../SVG/JunoBrandIcon';
import Button from '../Button/Button';

import * as HeaderStyles from './Header.module.scss';

const Header = ({ hideFixedNav, showFixedApplyNowButton = true }) => {
  const { subMenuQuery } = useStaticQuery(graphql`
    query {
      subMenuQuery: allContentfulSubMenu {
        edges {
          node {
            id
            parentHeading
            marketingSentence {
              marketingSentence
            }
            marketingArrowLink {
              text
              url
            }
            productList {
              id
              name
              slug
              topic
              menuDisplayName
              type
            }
            allPageLinks {
              id
              text
              url
            }
          }
        }
      }
    }
  `);
  const allSubMenus = subMenuQuery.edges.map((edge) => edge.node);

  const [headerRef, headerInView] = useInView({
    rootMargin: '300px 0px 0px 0px',
    initialInView: true
  });

  const [fixedNavRendered, setFixedNavRendered] = useState(false);
  const [fadingAnimation, setFadingAnimation] = useState('');

  useEffect(() => {
    if (hideFixedNav) {
      // for cases where the fixed-nav is hidden for part of the page like on /faq, need the fadeOut animation
      setFadingAnimation('fadeOut');
      return;
    }

    if (!headerInView) {
      setFixedNavRendered(true);
      setFadingAnimation('fadeIn');
    } else {
      setFadingAnimation('fadeOut');
    }
  }, [headerInView, hideFixedNav]);

  return (
    <header ref={headerRef} className="grid-wrapper">
      <SiteNav allSubMenus={allSubMenus} updateSideMenuIcon={!headerInView} />

      {fixedNavRendered && (
        <div
          className={`${HeaderStyles.fixedNav} ${HeaderStyles[fadingAnimation]}`}
          onAnimationEnd={() => {
            if (fadingAnimation === 'fadeOut') {
              setFixedNavRendered(false);
            }
          }}
        >
          <SiteLink to="/">
            <JunoBrandIcon />
          </SiteLink>
          {showFixedApplyNowButton && (
            <Button
              buttonStyle="primary"
              text="Apply Now"
              urlIsRelativePath
              href="/apply"
              id="fixed-nav-cta"
            />
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
