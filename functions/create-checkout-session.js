/*
 * This function creates a Stripe Checkout session and returns the session ID
 * for use with Stripe.js (specifically the redirectToCheckout method).
 *
 * @see https://stripe.com/docs/payments/checkout/one-time
 */
console.log(`Function environment context: ${process.env.CONTEXT}`);

const { DateTime } = require('luxon');

// eslint-disable-next-line import/no-unresolved
const stripe = require('stripe')(
  process.env.CONTEXT === 'dev' || process.env.CONTEXT === 'deploy-preview'
    ? process.env.TESTING_STRIPE_SECRET_KEY
    : process.env.STRIPE_SECRET_KEY
);

const contentfulClient = require('contentful').createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  host: process.env.CONTENTFUL_HOST
});

let baseUrl;
switch (process.env.CONTEXT) {
  case 'deploy-preview':
    baseUrl = process.env.DEPLOY_PRIME_URL || process.env.DEPLOY_URL;
    break;
  default:
    baseUrl = process.env.URL;
}

class ProductError extends Error {
  constructor(raw = {}) {
    super(raw.message);
    this.type = this.constructor.name;
    this.raw = raw;
    this.statusCode = raw.statusCode || 500;
    this.message = raw.message;
  }
}

// eslint-disable-next-line no-unused-vars
exports.handler = async (event, context) => {
  try {
    const { purchaseSessionCode, source } = JSON.parse(event.body);

    const sessionEntries = await contentfulClient.getEntries({
      'fields.purchaseSessionCode': purchaseSessionCode,
      content_type: 'session'
    });

    if (sessionEntries.total < 1) {
      throw new ProductError({
        statusCode: 404,
        message: `No matching session was found for session code ${purchaseSessionCode}`
      });
    }

    if (sessionEntries.total > 1) {
      throw new ProductError({
        statusCode: 404,
        message: `More than one session was found for session code ${purchaseSessionCode}`
      });
    }

    const session = sessionEntries.items[0].fields;
    const course = session.product.fields;
    const startDate = DateTime.fromISO(session.startDate).toLocaleString(DateTime.DATE_FULL);

    if (!session.allowOnlinePurchase) {
      throw new ProductError({
        statusCode: 403,
        message: `Session ${purchaseSessionCode} is not available for purchase online`
      });
    }

    if (!Number(session.purchaseCost)) {
      throw new ProductError({
        statusCode: 500,
        message: `Session ${purchaseSessionCode} doesn't have a valid purchase cost`
      });
    }

    if (session.isSoldOut) {
      throw new ProductError({
        statusCode: 403,
        message: `Session ${purchaseSessionCode} is sold out`
      });
    }

    const courseCostInCents = session.purchaseCost * 100;

    const taxAmountInCents = Math.round(courseCostInCents * 0.13);

    const cancelUrl = `${baseUrl}/course/${source}`;

    const getDescription = () => {
      const datesDescription = `Start Date: ${startDate}, ${session.classDays}, ${session.timeFrame}`;

      if (courseCostInCents === 99500) {
        return `Save 50% by purchasing this course today - regular price is $2000. ${datesDescription}`;
      }

      return datesDescription;
    };

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'cad',
            product_data: {
              name: course.name,
              description: getDescription()
            },
            unit_amount: courseCostInCents
          },
          quantity: 1
        },
        {
          price_data: {
            currency: 'cad',
            product_data: {
              name: 'HST (13%)'
            },
            unit_amount: taxAmountInCents
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      metadata: {
        purchaseSessionCode
      },
      success_url: `https://go.junocollege.com/purchase-thank-you`,
      cancel_url: cancelUrl
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: stripeSession.id, context: process.env.CONTEXT })
    };
  } catch (error) {
    console.log({ error });

    return {
      statusCode: error.code || 400,
      body: JSON.stringify({ error })
    };
  }
};
