import { loadStripe } from '@stripe/stripe-js';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Button from '../components/Button/Button';
import * as stripeSessionPurchaseStyles from './stripe-session-purchase.module.scss';

function getStripePromise() {
  console.log(`Netlify Context: ${process.env.GATSBY_NETLIFY_CONTEXT}`);
  return loadStripe(
    process.env.GATSBY_NETLIFY_CONTEXT === 'development' ||
      process.env.GATSBY_NETLIFY_CONTEXT === 'deploy-preview'
      ? process.env.GATSBY_TESTING_STRIPE_PUBLISHABLE_KEY
      : process.env.GATSBY_STRIPE_PUBLISHABLE_KEY
  );
}

function useStripeSessionPurchase(stripePromise) {
  const [purchaseError, setPurchaseError] = useState();
  const [inProgress, setInProgress] = useState(false);

  const purchaseSession = useCallback(
    async function purchaseSession(code, source) {
      console.log(`Beginning purchase run for ${code}`);
      if (inProgress) {
        return;
      }
      setInProgress(true);
      setPurchaseError();

      // Get Stripe.js instance
      const stripe = await stripePromise;

      try {
        const request = await fetch('/.netlify/functions/create-checkout-session', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ purchaseSessionCode: code, source })
        });
        const response = await request.json();
        if (response.error) {
          console.log(response.error);
          switch (response.error.statusCode) {
            case 403:
              setPurchaseError({
                message: `Sorry, this session cannot be purchased at this time.`,
                error: response.error
              });
              break;
            case 404:
              setPurchaseError({
                message: `Sorry, the session details could not be found. Please try again later.`,
                error: response.error
              });
              break;
            case 500:
              setPurchaseError({
                message: `Sorry, this session is not configured correctly. Please try again later.`,
                error: response.error
              });
              break;
            default:
              setPurchaseError({
                message: `Sorry, an unexpected error occured when creating a new checkout session for this course session. Please try again later.`,
                error: response.error
              });
          }
        } else {
          const result = await stripe.redirectToCheckout({
            sessionId: response.sessionId
          });

          if (result.error) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer
            // using `result.error.message`.
            setPurchaseError({
              message: `Sorry, an unexpected error occured when redirecting you to the checkout form.`,
              error: result.error
            });
          }
        }
      } catch (error) {
        console.log(error);
        setPurchaseError({
          message: `Sorry, an unexpected error occured when redirecting you to the checkout form.`,
          error
        });
      }
      setInProgress(false);
    },
    [inProgress]
  );

  const purchaseErrorModal = (
    <StripeSessionPurchaseErrorModal error={purchaseError} clearError={() => setPurchaseError()} />
  );

  return [purchaseErrorModal, inProgress, purchaseSession];
}

const StripeSessionPurchaseErrorModal = ({ error, clearError }) => {
  const closeButtonElement = useRef(null);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        closeButtonElement.current.focus();
      }, 300);
    }
  }, [error, closeButtonElement]);

  return (
    <div
      className={`${stripeSessionPurchaseStyles.errorContainer} ${
        error ? stripeSessionPurchaseStyles.opened : ''
      }`}
      aria-hidden={!error}
      role="dialog"
      aria-labelledby="purchase-error-heading"
      aria-describedby="purcahse-error-description"
    >
      {error && (
        <div className={stripeSessionPurchaseStyles.error}>
          <h3 id="purchase-error-heading">Error</h3>
          <p id="purchase-error-description">
            {error.message} {error?.error?.statusCode && <code>({error.error.statusCode})</code>}
          </p>
          <Button
            type="button"
            text="Close"
            buttonStyle="secondary"
            onClick={clearError}
            elementRef={closeButtonElement}
          />
        </div>
      )}
    </div>
  );
};

export { getStripePromise, useStripeSessionPurchase };
