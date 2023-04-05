import React, { useEffect, useRef, useState } from 'react';
import { scroller } from 'react-scroll';

import Button from '../Button/Button';
import Hamburger from '../SVG/Hamburger';
import SnowplowHiddenFormInputs from '../SnowplowHiddenFormInputs/SnowplowHiddenFormInputs';
import LastTouchHiddenFormInputs from '../LastTouchHiddenFormInputs/LastTouchHiddenFormInputs';

import trackSnowplowEmail from '../../helpers/trackSnowplowEmail';

import * as FullScreenPopUpStyles from './FullScreenPopUp.module.scss';
import * as GeneralFormStyles from '../../styles/forms.module.scss';
import SiteLink from '../SiteLink/SiteLink';

const FullScreenPopUp = ({ location, triggerPopUp }) => {
  const [modalState, setModalState] = useState('doNotLoad');
  const [pardotRedirectStatus, setPardotRedirectStatus] = useState('');
  const [popUpPreviouslySeen, setPopUpPreviouslySeen] = useState();
  useEffect(() => {
    if (location.search) {
      const redirectUrlQueryParams = new URLSearchParams(location.search);
      setPardotRedirectStatus(redirectUrlQueryParams.get('submission'));
    }
    if (typeof window !== 'undefined' && window) {
      const { sessionStorage } = window;

      const prevFullScreensSeen = sessionStorage.getItem('fsAmtSeen') || 0;
      const previousPage = sessionStorage.getItem('previousPage') || '';

      if (parseInt(prevFullScreensSeen, 10) >= 2 || previousPage === location.pathname) {
        setPopUpPreviouslySeen(true);
        return;
      }

      const currentFullScreensSeen = parseInt(prevFullScreensSeen, 10) + 1;
      sessionStorage.setItem('fsAmtSeen', currentFullScreensSeen);
      sessionStorage.setItem('previousPage', location.pathname);
      setPopUpPreviouslySeen(false);
    }
  }, [location.search, location.pathname]);

  useEffect(() => {
    if (triggerPopUp && !popUpPreviouslySeen) {
      setModalState('visible');
    }
    if (pardotRedirectStatus) {
      setModalState('visible');
    }
  }, [triggerPopUp, pardotRedirectStatus, popUpPreviouslySeen]);

  useEffect(() => {
    if (pardotRedirectStatus && modalState === 'visible') {
      scroller.scrollTo('modalTrigger', {
        offset: -200,
        duration: 500,
        delay: 1000,
        smooth: true
      });
    }
  }, [pardotRedirectStatus, modalState]);

  const returnToUrl = `https://junocollege.com/${location.pathname}`;
  const encodedSuccessUrl = encodeURIComponent(`${returnToUrl}?submission=success`);
  const encodedErrorUrl = encodeURIComponent(`${returnToUrl}?submission=fail`);
  const formEl = useRef();

  const [emailInputValue, setEmailInputValue] = useState('');
  const handleEmailInputChange = (e) => {
    setEmailInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (emailInputValue) {
      trackSnowplowEmail(emailInputValue);
    }

    formEl.current.submit();
  };

  return (
    <div
      className={`${FullScreenPopUpStyles.modalBackground} ${FullScreenPopUpStyles[modalState]} ${
        pardotRedirectStatus && modalState === 'visible' ? FullScreenPopUpStyles.fastLoad : ''
      }`}
    >
      <button
        type="button"
        aria-label="Close pop-up"
        tabIndex={0}
        className={FullScreenPopUpStyles.backgroundButton}
        onClick={() => setModalState('hidden')}
      />
      <div className={FullScreenPopUpStyles.modal}>
        <button
          type="button"
          className={FullScreenPopUpStyles.closeModal}
          aria-label="Close pop-up"
          onClick={() => setModalState('hidden')}
        >
          <Hamburger transformToX parentStyles={FullScreenPopUpStyles.svg} />
        </button>
        {!pardotRedirectStatus && (
          <>
            <h2 className={FullScreenPopUpStyles.heading}>
              Join &#39;I Want it Data Way&#39; today!
            </h2>
            <p className={FullScreenPopUpStyles.subheading}>
              Free updates in your inbox twice a month
            </p>
            <p className={FullScreenPopUpStyles.description}>
              Stay informed with new blogs about the data analytics world, including info about
              skills you need to learn, what a day in the life looks like, and what employers are
              looking for.
            </p>
            <form
              ref={formEl}
              method="POST"
              onSubmit={(e) => handleSubmit(e)}
              action={`https://go.junocollege.com/l/427982/2022-02-22/2mdbsh?success_location=${encodedSuccessUrl}&error_location=${encodedErrorUrl}`}
              className={FullScreenPopUpStyles.signUpForm}
            >
              <fieldset
                className={`${GeneralFormStyles.question} ${GeneralFormStyles.contactInfo} ${FullScreenPopUpStyles.fieldset}`}
              >
                <legend className="sr-only">Contact Information</legend>
                <label htmlFor="firstName">
                  <span className={GeneralFormStyles.required}>First Name</span>
                  <input type="text" id="firstName" name="firstName" required />
                </label>
                <label htmlFor="lastName">
                  <span className={GeneralFormStyles.required}>Last Name</span>
                  <input type="text" id="lastName" name="lastName" required />
                </label>
                <label htmlFor="email" className={FullScreenPopUpStyles.fullWidth}>
                  <span className={GeneralFormStyles.required}>Email Address</span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={emailInputValue}
                    onChange={(e) => handleEmailInputChange(e)}
                    required
                  />
                </label>
                <label htmlFor="phone" className={FullScreenPopUpStyles.fullWidth}>
                  <span className={GeneralFormStyles.required}>Phone Number</span>
                  <input type="tel" id="phone" name="phone" required />
                </label>
              </fieldset>
              <SnowplowHiddenFormInputs />
              <LastTouchHiddenFormInputs />
              <Button
                id="data-newsletter-pop-up-modal"
                type="submit"
                text="Sign Up Now"
                buttonStyle="primary"
                className={FullScreenPopUpStyles.submitButton}
              />
            </form>
          </>
        )}
        {pardotRedirectStatus === 'success' && (
          <>
            <h2 className={FullScreenPopUpStyles.heading}>You&apos;re all set!</h2>
            <p className={FullScreenPopUpStyles.description}>
              Thanks for signing up! You&apos;ll now be in the loop with our newest articles about
              all things data analytics. In the meantime, feel free to check out{' '}
              <SiteLink to="/blog/">our blog</SiteLink> for more free resources.
            </p>
          </>
        )}
        {pardotRedirectStatus === 'fail' && (
          <>
            <h2 className={FullScreenPopUpStyles.heading}>Whoops, something has gone wrong!</h2>
            <p className={FullScreenPopUpStyles.description}>
              Please email <a href="mailto:info@junocollege.com">info@junocollege.com</a> for help,
              or try submitting the form again.
            </p>
            <Button
              type="button"
              text="Try Again"
              buttonStyle="primary"
              onClick={() => setPardotRedirectStatus('')}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default FullScreenPopUp;
