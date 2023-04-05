import React from 'react';
import SiteLink from '../SiteLink/SiteLink';

import * as GeneralFormStyles from '../../styles/forms.module.scss';

const RequiredOptInFormInputs = ({ onChange, formErrors }) => {
  return (
    <>
      <label htmlFor="doNotEmail" className={GeneralFormStyles.agreements}>
        <input
          type="checkbox"
          id="doNotEmail"
          name="doNotEmail"
          value="false"
          required
          onChange={onChange}
        />
        <span className={`${GeneralFormStyles.customCheckbox}  ${GeneralFormStyles.required}`}>
          I agree to receive email communications from Juno College of Technology. You can
          unsubscribe at any time.
        </span>
        <span
          className={`${GeneralFormStyles.errorMessage} ${
            formErrors.includes('doNotEmail') ? GeneralFormStyles.showError : ''
          }`}
          aria-hidden={!formErrors.includes('doNotEmail')}
        >
          I’m sorry, you must sign up for email communication in order to get in touch with us. If
          you don’t want to submit your information here, you can also contact us by emailing{' '}
          <a href="mailto:info@junocollege.com">info@junocollege.com</a>.
        </span>
      </label>

      <label htmlFor="privacy_policy" className={GeneralFormStyles.agreements}>
        <input
          type="checkbox"
          id="privacy_policy"
          name="privacy_policy"
          value="true"
          required
          onChange={onChange}
        />
        <span className={`${GeneralFormStyles.customCheckbox} ${GeneralFormStyles.required}`}>
          Check here if you agree to submit your information to Juno College of Technology. Your
          data will be collected in accordance with our{' '}
          <SiteLink to="/privacy-policy/">Privacy Policy</SiteLink>.
        </span>
        <span
          className={`${GeneralFormStyles.errorMessage} ${
            formErrors.includes('privacy_policy') ? GeneralFormStyles.showError : ''
          }`}
          aria-hidden={!formErrors.includes('privacy_policy')}
        >
          I&apos;m sorry, you must agree to our privacy policy to continue. If you don’t want to
          submit your information here, you can also contact us by emailing{' '}
          <a href="mailto:info@junocollege.com">info@junocollege.com</a>.
        </span>
      </label>
    </>
  );
};

export default RequiredOptInFormInputs;
