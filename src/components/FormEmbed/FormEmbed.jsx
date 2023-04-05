/* eslint-disable react/no-danger */
import React, { useState, useEffect, useRef } from 'react';
import { navigate } from 'gatsby';
import { scroller } from 'react-scroll';

import trackSnowplowEmail from '../../helpers/trackSnowplowEmail';

import Button from '../Button/Button';
import LastTouchHiddenFormInputs from '../LastTouchHiddenFormInputs/LastTouchHiddenFormInputs';
import SnowplowHiddenFormInputs from '../SnowplowHiddenFormInputs/SnowplowHiddenFormInputs';

import * as FormEmbedStyles from './FormEmbed.module.scss';
import * as GeneralFormStyles from '../../styles/forms.module.scss';

const FormEmbed = ({ content, className, location }) => {
  const formType = content.type;
  const returnToUrl = `https://junocollege.com/${location.pathname}`;
  const encodedSuccessUrl = encodeURIComponent(`${returnToUrl}?submission=success`);
  const encodedErrorUrl = encodeURIComponent(`${returnToUrl}?submission=fail`);

  const formEl = useRef();

  const [emailInputValue, setEmailInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (emailInputValue) {
      trackSnowplowEmail(emailInputValue);
    }

    formEl.current.submit();
  };

  const [pardotRedirectStatus, setPardotRedirectStatus] = useState('');
  useEffect(() => {
    if (location.search) {
      const redirectUrlQueryParams = new URLSearchParams(location.search);
      const redirectStatus = redirectUrlQueryParams.get('submission');
      if (redirectStatus) {
        setPardotRedirectStatus(redirectStatus);
        scroller.scrollTo(`${formType}Form`, {
          offset: 200,
          duration: 800,
          delay: 700,
          smooth: true
        });
      }
    }
  }, [location, formType]);

  const retryForm = () => {
    setPardotRedirectStatus('');
    navigate(`${location.pathname}#${formType}Form`);
  };

  return (
    <div className={`${FormEmbedStyles.formDesign} ${className}`} id={`${formType}Form`}>
      {pardotRedirectStatus ? (
        <>
          {pardotRedirectStatus === 'success' ? (
            <div
              dangerouslySetInnerHTML={{
                __html: content.successMessage.childMarkdownRemark.html
              }}
            />
          ) : (
            <>
              <h3>Whoops, something has gone wrong!</h3>
              <p>
                Please email <a href="mailto:info@junocollege.com">info@junocollege.com</a> for
                help, or try submitting the form again.
              </p>
              <Button
                type="button"
                text="Try Again"
                onClick={() => retryForm()}
                buttonStyle="primary"
                className={FormEmbedStyles.retryButton}
              />
            </>
          )}
        </>
      ) : (
        <>
          <h3>{content.heading}</h3>
          <p
            dangerouslySetInnerHTML={{
              __html: content.description.childMarkdownRemark.rawMarkdownBody
            }}
          />
          <form
            action={`${content.formHandlerLink}?success_location=${encodedSuccessUrl}&error_location=${encodedErrorUrl}`}
            method="POST"
            ref={formEl}
            id="formEmbed"
            onSubmit={(e) => handleSubmit(e)}
          >
            <fieldset className={`${GeneralFormStyles.question} ${GeneralFormStyles.contactInfo}`}>
              <legend className="sr-only">Contact Information</legend>
              <label htmlFor="firstName">
                <span className={GeneralFormStyles.required}>First Name</span>
                <input type="text" id="firstName" name="firstName" required />
              </label>
              <label htmlFor="lastName">
                <span className={GeneralFormStyles.required}>Last Name</span>
                <input type="text" id="lastName" name="lastName" required />
              </label>
              <label htmlFor="email">
                <span className={GeneralFormStyles.required}>Email Address</span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={emailInputValue}
                  onChange={(e) => setEmailInputValue(e.target.value)}
                  required
                />
              </label>
              {formType === 'dataNewsletter' && (
                <label htmlFor="phone">
                  <span className={GeneralFormStyles.required}>Phone</span>
                  <input type="tel" id="phone" name="phone" />
                </label>
              )}
            </fieldset>
            <div className={`${GeneralFormStyles.formEnd} ${FormEmbedStyles.formEndDesign}`}>
              <SnowplowHiddenFormInputs />
              <LastTouchHiddenFormInputs />

              <Button
                type="submit"
                text={content.submitButtonText}
                buttonStyle="primary"
                className={GeneralFormStyles.submitButton}
              />
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default FormEmbed;
