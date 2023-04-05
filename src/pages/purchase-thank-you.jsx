import React from 'react';
import SiteLink from '../components/SiteLink/SiteLink';

import Head from '../components/Head/Head';
import Layout from '../components/Layout/Layout';

import * as PurchaseThankYouStyles from './purchase-thank-you.module.scss';

const PurchaseThankyou = () => {
  const metaContent = {
    title: 'Thank you!'
  };

  return (
    <Layout>
      <Head metaContent={metaContent} />
      <section className={`grid-wrapper ${PurchaseThankYouStyles.intro}`}>
        <h1 className={PurchaseThankYouStyles.title}>Thank you!</h1>
      </section>
      <section className={`grid-wrapper ${PurchaseThankYouStyles.contentArea}`}>
        <div className={PurchaseThankYouStyles.messageAreaWrapper}>
          <div className={PurchaseThankYouStyles.messageArea} id="thankyou">
            <h2 className="congratulations">
              Hooray! You&apos;re now enrolled in Web Development at Juno!
            </h2>
            <h3 className="form-subhead">
              A member of the Juno Team will be in touch soon with course details.
            </h3>
            <div className={PurchaseThankYouStyles.applyCompleted}>
              <p className={PurchaseThankYouStyles.explanatoryText}>
                In the meantime, you can browse our{' '}
                <SiteLink to="/student-stories/">Student Stories</SiteLink> to read about some
                amazing developers who started right where you are before making a career change
                into tech. You can also follow us on{' '}
                <a href="https://twitter.com/junocollege" target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>{' '}
                or{' '}
                <a
                  href="https://www.instagram.com/junocollege/ "
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>{' '}
                to stay up to date on all the exciting things happening at Juno!
              </p>
              <p>We’re looking forward to meeting you!</p>
              <h3 className="form-subhead">More Questions?</h3>
              <p className={PurchaseThankYouStyles.explanatoryText}>
                Check out our <SiteLink to="/faq/">FAQ page</SiteLink> or contact us at{' '}
                <a href="mailto:info@junocollege.com">info@junocollege.com</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PurchaseThankyou;
