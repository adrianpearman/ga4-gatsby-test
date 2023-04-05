import React, { useState } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout/Layout';
import Head from '../components/Head/Head';
import Button from '../components/Button/Button';
import CallToAction from '../components/Banners/CallToAction';
import IsaCalculatorTableRow from '../components/IsaCalculatorTableRow/IsaCalculatorTableRow';
import { canadianCurrencyFormatter } from '../helpers/formatters';

import * as IsaCalculatorStyles from './isa-calculator.module.scss';

const IsaCalculator = ({ data, location }) => {
  const { slug, metaContent, heroContent, sections } = data.pageContent;

  const bootcampPrice = 13_995;
  const [upfrontPaymentInput, setUpfrontPaymentInput] = useState('');
  const [upfrontPaymentValueError, setUpfrontPaymentValueError] = useState();
  const [upfrontPayments, setUpfrontPayments] = useState([bootcampPrice, 6000, 1]);

  const handleChange = (event) => {
    const { value } = event.target;

    if (/^[0-9]+$/.test(value) || value === '') {
      setUpfrontPaymentInput(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (upfrontPaymentInput >= 1 && upfrontPaymentInput <= bootcampPrice) {
      setUpfrontPayments([...upfrontPayments, Number(upfrontPaymentInput)]);
      setUpfrontPaymentValueError(false);
    } else {
      setUpfrontPaymentValueError(true);
    }
  };

  return (
    <Layout pageSlug={slug}>
      <Head metaContent={metaContent} pagePath={location.pathname} />
      <div className={`grid-wrapper ${IsaCalculatorStyles.isaWrapper}`}>
        <section className={IsaCalculatorStyles.isa}>
          <div className={IsaCalculatorStyles.info}>
            <h1>{heroContent.h1Heading}</h1>
            <h2>{heroContent.mainVisualHeading}</h2>
            <p>{heroContent.introParagraph.introParagraph}</p>
            {heroContent.ctaButtons.map((button) => {
              return (
                <Button
                  key={button.id}
                  urlIsRelativePath={button.isUrlRelativePath}
                  text={button.text}
                  href={button.url}
                  openInNewTab={button.openInNewTab}
                  useSnowplowTracking={button.useSnowplowTracking}
                  buttonStyle="secondary"
                />
              );
            })}
          </div>
          <div className={IsaCalculatorStyles.calculator}>
            <table>
              <thead>
                <tr>
                  <th>Upfront Payment</th>
                  <th>ISA Required</th>
                  <th>Total Investment</th>
                </tr>
              </thead>
              <tbody>
                {upfrontPayments.map((payment, index) => (
                  <IsaCalculatorTableRow
                    upfrontPayment={payment}
                    maxUpfrontAmount={bootcampPrice}
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                  />
                ))}
              </tbody>
            </table>

            <form action="" onSubmit={handleSubmit}>
              <input
                type="text"
                pattern="[0-9]*"
                className={IsaCalculatorStyles.amount}
                placeholder="Enter upfront payment"
                onChange={handleChange}
                value={upfrontPaymentInput}
                name="amount"
              />
              <input
                type="submit"
                className={IsaCalculatorStyles.submit}
                value="Calculate Total Investment"
                name="submit"
              />
            </form>
            {upfrontPaymentValueError && (
              <p className={IsaCalculatorStyles.error}>
                Please enter a value between $1 and{' '}
                {`${canadianCurrencyFormatter(bootcampPrice, false)}!`}
              </p>
            )}
          </div>
        </section>
        {sections.map(
          (section) =>
            (section.style === 'isa-calc-faqs' && (
              <section key={section.id} className={IsaCalculatorStyles.faq}>
                <h2>{section.heading}</h2>
                <ul>
                  {section.content.map((question) => {
                    return (
                      <li key={question.id}>
                        <h3>{question.question}</h3>
                        <div
                          // eslint-disable-next-line react/no-danger
                          dangerouslySetInnerHTML={{
                            __html: question.answer.childMarkdownRemark.html
                          }}
                        />
                      </li>
                    );
                  })}
                </ul>
              </section>
            )) ||
            (section.style === 'isa-calc-banner' && (
              <CallToAction
                key={section.id}
                heading={section.heading}
                button={section.ctaButton}
                purpleBg
              />
            ))
        )}
      </div>
    </Layout>
  );
};

export default IsaCalculator;

export const queryIsaCalculator = graphql`
  query isaCalculator {
    pageContent: contentfulPageGeneric(slug: { eq: "isa-calculator" }) {
      slug
      metaContent {
        title
        description {
          description
        }
        image {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
      heroContent {
        h1Heading
        mainVisualHeading
        introParagraph {
          introParagraph
        }
        ctaButtons {
          id
          text
          url
          isUrlRelativePath
          openInNewTab
          useSnowplowTracking
        }
      }
      sections {
        id
        style
        heading
        description {
          childMarkdownRemark {
            rawMarkdownBody
          }
        }
        ctaButton {
          text
          url
          isUrlRelativePath
          openInNewTab
          useSnowplowTracking
        }
        content {
          ... on ContentfulFaq {
            id
            question
            answer {
              childMarkdownRemark {
                html
                rawMarkdownBody
              }
            }
          }
        }
      }
    }
  }
`;
