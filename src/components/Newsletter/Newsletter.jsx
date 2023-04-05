import React, { useState } from 'react';
import axios from 'axios';
import Qs from 'qs';
import TagManager from 'react-gtm-module';
import SiteLink from '../SiteLink/SiteLink';

import Button from '../Button/Button';
import trackSnowplowEmail from '../../helpers/trackSnowplowEmail';
import * as NewsletterStyles from './Newsletter.module.scss';
import useSnowplowUserFingerprint from '../../hooks/useSnowplowUserFingerprint';
import useSnowplowDomainUserId from '../../hooks/useSnowplowDomainUserId';

const regex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Newsletter = ({ inline = false }) => {
  const [userEmail, setUserEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const userFingerprint = useSnowplowUserFingerprint();
  const domainUserId = useSnowplowDomainUserId();

  const handleSubmit = (event) => {
    event.preventDefault();

    // when email address is valid, send email to pardot
    if (userEmail !== '' && regex.test(userEmail)) {
      axios({
        url: 'https://proxy.hackeryou.com',
        dataResponse: 'json',
        paramsSerializer(params) {
          return Qs.stringify(params, { arrayFormat: 'brackets' });
        },
        params: {
          reqUrl: 'https://go.hackeryou.com/l/427982/2018-11-01/27g8x4',
          params: {
            email: userEmail,
            SnowplowUserFingerprint: userFingerprint,
            SnowplowDomainUserId: domainUserId
          }
        }
      }).then(() => {
        setSubscribed(true);
        setUserEmail('');
        TagManager.dataLayer({
          dataLayer: {
            event: 'Email Subscribe'
          }
        });
      });

      // also track email through Snowplow's analytics
      trackSnowplowEmail(userEmail);
    }
  };

  return (
    <div className={inline ? NewsletterStyles.newsletterInline : NewsletterStyles.newsletter}>
      {!inline && <h2>Join our mailing list</h2>}
      <form onSubmit={handleSubmit}>
        <p className={NewsletterStyles.subscribed}>{subscribed && `You are now subscribed!`}</p>
        <label htmlFor="email" aria-label="email">
          <input
            type="email"
            name="email"
            placeholder="Your email address"
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
          />
        </label>
        <Button type="submit" buttonStyle="submit" text="Subscribe" />
      </form>
      <p>
        Stay up-to-date on upcoming courses and events. You can unsubscribe at any time. See our{' '}
        <SiteLink to="/privacy-policy/">privacy policy</SiteLink>.
      </p>
    </div>
  );
};

export default Newsletter;
