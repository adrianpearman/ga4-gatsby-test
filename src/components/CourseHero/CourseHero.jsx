import React, { useRef, useState, useEffect } from 'react';

import Button from '../Button/Button';

import * as GeneralFormStyles from '../../styles/forms.module.scss';
import * as HeroStyles from './CourseHero.module.scss';

import violetPinIcon from '../../assets/images/course-details/heroIconPin.svg';
import violetClockIcon from '../../assets/images/course-details/heroIconClock.svg';
import whiteClockIcon from '../../assets/images/course-details/heroIconClockWhite.svg';
import { monthAndDay } from '../../helpers/formatters';
import SiteLink from '../SiteLink/SiteLink';
import SnowplowHiddenFormInputs from '../SnowplowHiddenFormInputs/SnowplowHiddenFormInputs';
import LastTouchHiddenFormInputs from '../LastTouchHiddenFormInputs/LastTouchHiddenFormInputs';
import trackSnowplowEmail from '../../helpers/trackSnowplowEmail';

const submitPaths = {
  'web-development': 'https://go.junocollege.com/l/427982/2022-12-07/3jxkzf',
  'ux-design': 'https://go.junocollege.com/l/427982/2022-12-07/3jxlgm',
  'data-analytics': 'https://go.junocollege.com/l/427982/2022-12-07/3jxlgj',
  javascript: 'https://go.junocollege.com/l/427982/2022-12-07/3jxlg7'
};

const CourseHero = ({
  heroContent,
  locationPin,
  timePin,
  backgroundColor,
  subheading,
  upcomingSessions,
  registerHandler,
  registerDisabled,
  location,
  slug
}) => {
  const heroStyle = backgroundColor ? 'heroContent'.concat(backgroundColor) : 'heroContentBackup';

  const [success, setSuccess] = useState(false);

  const formEl = useRef();

  useEffect(() => {
    if (location.search) {
      const searchParams = new URLSearchParams(location.search);
      setSuccess(searchParams.get('success'));
    }
  }, [location.search]);

  const nextSession = upcomingSessions[0];

  const handleSubmit = (e) => {
    e.preventDefault();

    // eslint-disable-next-line camelcase
    const { email, first_name } = Object.fromEntries(new FormData(e.target));

    if (email) {
      trackSnowplowEmail(email);
    }

    if (typeof window !== 'undefined' && window) {
      window.sessionStorage.setItem('firstName', first_name);
    }

    formEl.current.submit();
  };

  const nextSessionCallout = () => {
    return (
      <div className={HeroStyles.nextCourse}>
        <div className={HeroStyles.nextCourseDate}>
          <p className={HeroStyles.nextCourseStarts}>Next Course Starts</p>
          <p className={HeroStyles.nextCourseStartDate}>{monthAndDay(nextSession.startDate)}</p>
          <p className={`${HeroStyles.iconText} ${HeroStyles.nextCourseIcon}`}>
            <span>
              <img src={whiteClockIcon} alt="" /> {nextSession.timeFrame} EST
            </span>
          </p>
        </div>

        <div className={HeroStyles.nextCourseCta}>
          <p className={HeroStyles.nextCourseEnroll}>
            <Button
              className={HeroStyles.downloadCta}
              buttonStyle="primary"
              text="Enrol now"
              disabled={registerDisabled}
              href={nextSession.allowOnlinePurchase ? null : '#dates'}
              onClick={
                nextSession.allowOnlinePurchase
                  ? () => {
                      registerHandler(nextSession.purchaseSessionCode, slug);
                    }
                  : null
              }
            />
          </p>
          <p className={HeroStyles.nextCourseBrowse}>
            <a href="#dates" className="link-arrow link-arrow-red">
              Browse more start dates
            </a>
          </p>
        </div>
      </div>
    );
  };

  return (
    <section>
      <div className={`${HeroStyles.heroContent} ${HeroStyles[heroStyle]} grid-wrapper`}>
        <div className={`${HeroStyles.heroText}`}>
          <h1 className={HeroStyles.seoHeading}>{heroContent.h1Heading}</h1>
          <h2 className={HeroStyles.header}>{heroContent.mainVisualHeading}</h2>
          <p className={HeroStyles.iconText}>
            {subheading || (
              <>
                <span>
                  <img src={violetPinIcon} alt="" />
                  {locationPin}
                </span>{' '}
                <span>
                  <img src={violetClockIcon} alt="" /> {timePin}
                </span>
              </>
            )}
          </p>
          <p
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: heroContent.introParagraph.childMarkdownRemark.rawMarkdownBody
            }}
          />
          <hr className={HeroStyles.divider} />
          <p>
            <strong>Download the course package to discover:</strong>
          </p>

          <ul className={HeroStyles.downloadPerks}>
            <li>Financing Options</li>
            <li>Course Syllabus</li>
            <li>Course Projects</li>
          </ul>
          <div className={HeroStyles.hideOnMobile}>{nextSession && nextSessionCallout()}</div>
        </div>

        <div className={`${HeroStyles.heroFormWrapper}`}>
          <div className={`${HeroStyles.heroForm}`}>
            {success ? (
              <h3 className={`${HeroStyles.successState}`}>
                Thank you! Your course package is on the way to your inbox.
              </h3>
            ) : (
              <form action={submitPaths[slug]} method="POST" ref={formEl} onSubmit={handleSubmit}>
                <fieldset
                  className={`${GeneralFormStyles.question} ${GeneralFormStyles.contactInfo} ${HeroStyles.fieldset}`}
                >
                  <label htmlFor="firstName">
                    <span className={GeneralFormStyles.required}>First name</span>
                    <input type="text" id="firstName" name="first_name" required />
                  </label>

                  <label htmlFor="lastName">
                    <span className={GeneralFormStyles.required}>Last name</span>
                    <input type="text" id="lastName" name="last_name" required />
                  </label>

                  <label htmlFor="email" className={HeroStyles.fullLabel}>
                    <span className={GeneralFormStyles.required}>Email</span>
                    <input type="email" id="email" name="email" required />
                  </label>

                  <label htmlFor="phone" className={HeroStyles.fullLabel}>
                    <span>Phone number (optional)</span>
                    <input type="phone" id="phone" name="phone" />
                  </label>

                  <label
                    htmlFor="agreeToJoinNewsletter"
                    className={`${GeneralFormStyles.agreements} ${HeroStyles.agreement} ${HeroStyles.fullLabel}`}
                  >
                    <input
                      type="checkbox"
                      id="agreeToJoinNewsletter"
                      name="agree_to_join_newsletter"
                      value="true"
                      required
                    />
                    <span
                      className={`${GeneralFormStyles.customCheckbox} ${GeneralFormStyles.required}`}
                    >
                      By clicking Download Course Package, you&apos;re accepting our{' '}
                      <SiteLink to="/terms-conditions/">Terms &amp; Conditions</SiteLink>.
                    </span>
                  </label>

                  <SnowplowHiddenFormInputs />
                  <LastTouchHiddenFormInputs />

                  <Button
                    className={HeroStyles.downloadCta}
                    buttonStyle="primary"
                    type="submit"
                    text="Download Course Package"
                  />
                </fieldset>
              </form>
            )}
          </div>
        </div>

        <div className={`${HeroStyles.heroText} ${HeroStyles.showOnMobile}`}>
          {nextSession && nextSessionCallout()}
        </div>
      </div>
    </section>
  );
};

export default CourseHero;
