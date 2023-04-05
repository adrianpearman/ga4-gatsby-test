import React, { useState } from 'react';
import SiteLink from '../SiteLink/SiteLink';

import * as SiteNavStyles from './SiteNav.module.scss';

import Button from '../Button/Button';
import Chevron from '../SVG/Chevron';
import SubMenu from '../SubMenu/SubMenu';
import Hamburger from '../SVG/Hamburger';

import junoLogo from '../../assets/images/icons/juno-logo-formerly-hackeryou.svg';

const SiteNav = ({ allSubMenus, updateSideMenuIcon }) => {
  const subMenuHeadingMap = allSubMenus.reduce(
    (map, subMenu) => map.set(subMenu.parentHeading, subMenu),
    new Map()
  );

  const [openedSubMenu, setOpenedSubMenu] = useState('');

  const handleMenuItemClick = (menuItemHeading) => {
    if (openedSubMenu === menuItemHeading) {
      setOpenedSubMenu('');
    } else {
      setOpenedSubMenu(menuItemHeading);
    }
  };

  const [mobileMenuOpened, setMobileMenuOpened] = useState(false);

  const handleSideMenuButtonClick = () => {
    if (mobileMenuOpened) {
      setMobileMenuOpened(false);
      setOpenedSubMenu('');
    } else {
      setMobileMenuOpened(true);
    }
  };

  const handleLinkClick = () => {
    setMobileMenuOpened(false);
    setOpenedSubMenu('');
  };

  return (
    <nav className={SiteNavStyles.nav} id="nav-header">
      <SiteLink to="/">
        <img
          className={SiteNavStyles.junoLogo}
          src={junoLogo}
          alt="Juno College of Technology home page"
          loading="eager"
        />
      </SiteLink>

      {/* Tablet/Mobile Only, hamburger button */}
      <button
        type="button"
        className={`${SiteNavStyles.sideMenuButton} ${
          updateSideMenuIcon ? SiteNavStyles.scrolledDown : ''
        }`}
        onClick={() => handleSideMenuButtonClick()}
        aria-label={`${mobileMenuOpened ? 'Close' : 'Open'} mobile menu`}
      >
        <Hamburger parentStyles={SiteNavStyles.sideMenuIcon} transformToX={mobileMenuOpened} />
      </button>

      {/* List of top level nav headings. */}
      <ul
        className={`${SiteNavStyles.navMenu} ${
          mobileMenuOpened ? SiteNavStyles.sideMenuOpened : ''
        }`}
      >
        {/* Only visible on mobile-small, intended to replace logo hidden by menu when opened */}
        <li className={SiteNavStyles.mobileSmallLogo}>
          <SiteLink to="/" onClick={() => handleLinkClick()}>
            <img src={junoLogo} alt="Juno College of Technology home page" loading="eager" />
          </SiteLink>
        </li>
        <li className={`${SiteNavStyles.freeEvents} ${SiteNavStyles.menuItem}`}>
          <SiteLink to="/events/" onClick={() => handleLinkClick()}>
            Free Events
          </SiteLink>
        </li>
        {['Courses', 'Bootcamps', 'About', 'For Companies'].map((menuItem) => {
          const subMenu = subMenuHeadingMap.get(menuItem);
          return (
            <li
              key={subMenu.id}
              className={`${SiteNavStyles.menuItem} ${
                openedSubMenu === menuItem ? SiteNavStyles.opened : ''
              }`}
            >
              <button
                type="button"
                className={`${SiteNavStyles.menuItemHeading} ${
                  openedSubMenu === menuItem ? SiteNavStyles.clicked : ''
                }`}
                onClick={() => handleMenuItemClick(subMenu.parentHeading)}
                aria-label={`${
                  openedSubMenu === menuItem ? 'Close' : 'Open'
                } the ${menuItem} sub menu.`}
              >
                {subMenu.parentHeading}
              </button>

              {/* Only visible on tablet/mobile */}
              <Chevron
                parentStyles={`${SiteNavStyles.menuToggleIcon} ${
                  openedSubMenu === subMenu.parentHeading ? SiteNavStyles.menuToggleIconClicked : ''
                }`}
                onClick={() => handleMenuItemClick(subMenu.parentHeading)}
              />
              <SubMenu
                menuInfo={subMenu}
                openedSubMenu={openedSubMenu}
                mobileMenuOpened={mobileMenuOpened}
                handleLinkClick={() => handleLinkClick()}
              />
            </li>
          );
        })}

        {/* Button will either go directly to an application page if directed, or open the application modal */}
        <li className={SiteNavStyles.applyNow}>
          <Button
            id="static-nav-cta"
            buttonStyle="primary"
            text="Apply Now"
            urlIsRelativePath
            href="/apply"
            onClick={() => handleLinkClick()}
            onFocus={() => setOpenedSubMenu('')}
          />
        </li>
      </ul>

      {/* Large semi-opaque bar that appears to the left of the tablet menu */}
      <button
        type="button"
        className={`${SiteNavStyles.fadeOutSite} ${mobileMenuOpened ? SiteNavStyles.visible : ''}`}
        onClick={() => handleSideMenuButtonClick()}
        aria-label="Close the menu and return to the site"
      />
    </nav>
  );
};

export default SiteNav;
