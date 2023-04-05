import React, { useState } from 'react';
import SiteLink from '../SiteLink/SiteLink';
import Button from '../Button/Button';

import close from '../../assets/images/web-development-course/close-modal.svg';
import logo from '../../assets/images/icons/juno-logo-formerly-hackeryou.svg';
import burgerMenu from '../../assets/images/nav/nav-hamburger-icon-dark.svg';

import * as headerWebdevStyles from './HeaderWebDev.module.scss';

const HeaderWebDev = ({ scrollToAnchor }) => {
  const [modal, setModal] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setModal(true);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setModal(false);
  };

  return (
    <header className={`${headerWebdevStyles.header} grid-wrapper`}>
      {modal && (
        <div className={headerWebdevStyles.modal}>
          <button className={headerWebdevStyles.close} type="button" onClick={closeModal}>
            <img src={close} alt="" />
          </button>
          <ul>
            <li>
              <SiteLink to="/">Home</SiteLink>
            </li>
            <li>
              <SiteLink to="/blog/">Blog</SiteLink>
            </li>
            <li>
              <SiteLink to="/our-courses/">All Courses</SiteLink>
            </li>
            <li>
              <SiteLink to="/student-stories/">Success Stories</SiteLink>
            </li>
            <li>
              <SiteLink to="/contact/">Contact</SiteLink>
            </li>
          </ul>
        </div>
      )}
      <nav className={headerWebdevStyles.nav}>
        <div className={headerWebdevStyles.headerLeft}>
          <SiteLink to="/">
            <img className={headerWebdevStyles.logo} src={logo} alt="" />
          </SiteLink>
          <ul className={headerWebdevStyles.headerLinks}>
            <li>
              <a
                href="#what"
                onClick={(event) => {
                  scrollToAnchor(event, 'what');
                }}
              >
                The Course
              </a>
            </li>
            <li>
              <a
                href="#how"
                onClick={(event) => {
                  scrollToAnchor(event, 'how');
                }}
              >
                How it Works
              </a>
            </li>
            <li>
              <a
                href="#reviews"
                onClick={(event) => {
                  scrollToAnchor(event, 'reviews');
                }}
              >
                Reviews
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={(event) => {
                  scrollToAnchor(event, 'about');
                }}
              >
                About Juno
              </a>
            </li>
            <li>
              <a
                href="#datescosts"
                onClick={(event) => {
                  scrollToAnchor(event, 'datescosts');
                }}
              >
                Dates &amp; Costs
              </a>
            </li>
          </ul>
        </div>

        <div className={headerWebdevStyles.headerRight}>
          <Button
            type="button"
            buttonStyle="primary"
            text="Find a Session"
            onClick={(event) => {
              scrollToAnchor(event, 'sessions');
            }}
          />
          <button
            onClick={openModal}
            aria-label="Access menu."
            className={headerWebdevStyles.menuButton}
            type="button"
          >
            <img className={headerWebdevStyles.menuSvg} src={burgerMenu} alt="" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default HeaderWebDev;
