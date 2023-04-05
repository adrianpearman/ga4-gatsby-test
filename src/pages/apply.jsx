/* eslint-disable react/no-danger */
import { graphql } from 'gatsby';
import React, { useRef, useState, Fragment } from 'react';
import { scroller } from 'react-scroll';

import Head from '../components/Head/Head';
import Layout from '../components/Layout/Layout';
import Button from '../components/Button/Button';
import RequiredOptInFormInputs from '../components/RequiredOptInFormInputs/RequiredOptInFormInputs';
import SnowplowHiddenFormInputs from '../components/SnowplowHiddenFormInputs/SnowplowHiddenFormInputs';
import LastTouchHiddenFormInputs from '../components/LastTouchHiddenFormInputs/LastTouchHiddenFormInputs';

import trackSnowplowEmail from '../helpers/trackSnowplowEmail';
import {
  createInputStateDefaults,
  handleInvalidSubmit,
  hasAtLeastOneOptionChecked,
  trackInputValueChanges,
  validateCheckboxChange
} from '../helpers/formHelpers';

import personWithMonitorIcon from '../assets/images/icons/person-with-monitor-jred.svg';
import browserWindowIcon from '../assets/images/icons/browser-window-jred.svg';
import gradCapIcon from '../assets/images/icons/grad-cap-jred.svg';
import rightArrow from '../assets/images/icons/arrow-link-linkred.svg';

import * as ApplicationStyles from './apply.module.scss';
import * as GeneralFormStyles from '../styles/forms.module.scss';

const Apply = ({ data, location }) => {
  const { slug, metaContent, heroContent, sections } = data.contentfulPageGeneric;
  const applicationSteps = sections.find(
    (section) => section.style === 'bootcamp-application-all-steps'
  );

  const contactFields = {
    heading: 'Contact Information',
    inputs: [
      { label: 'First Name', id: 'first_name', type: 'text' },
      { label: 'Last Name', id: 'last_name', type: 'text' },
      { label: 'Email Address', id: 'email', type: 'email' },
      { label: 'Phone Number', id: 'phone', type: 'tel' },
      { label: 'Country', id: 'country', type: 'text' },
      { label: 'Postal/Zip Code', id: 'zip', type: 'text' },
      {
        label: 'Pronouns (e.g. she/her, they/them, he/him)',
        id: 'pronouns',
        type: 'text',
        required: false
      },
      { label: 'LinkedIn Profile URL', id: 'LinkedIn_Profile', type: 'url', required: false }
    ]
  };

  const [contactFieldInputValues, setContactFieldInputValues] = useState(
    createInputStateDefaults(contactFields.inputs, 'id')
  );

  const formatPreference = {
    heading: 'What program format do you prefer?',
    pardotName: 'Format_Preference',
    type: 'radio',
    inputs: [
      {
        label: 'In-Person in Toronto',
        id: 'format_preference_in_person',
        value: 'In-Person in Toronto'
      },
      {
        label: 'Live Online',
        id: 'format_preference_online',
        value: 'Live Online'
      },
      {
        label: 'Either',
        id: 'format_preference_either',
        value: 'Either'
      }
    ]
  };

  const programInterest = {
    heading: 'Which of our programs are you interested in?',
    pardotName: 'Program_of_Interest',
    type: 'checkbox',
    inputs: [
      {
        label: 'Web Development Bootcamp - Full-Time',
        id: 'web_full_time'
      },
      {
        label: 'Web Development Bootcamp - Part-Time',
        id: 'web_part_time'
      },
      {
        label: 'Part-Time Web Development Course'
      },
      {
        label: 'Part-Time JavaScript Course',
        id: 'javascript'
      },
      {
        label: 'Part-Time UX Design Course',
        id: 'ux_design'
      },
      {
        label: 'Part-Time Data Analytics Course',
        id: 'data_analytics'
      },
      {
        label: 'Not Sure Yet',
        id: 'not_sure'
      }
    ]
  };
  const [programInterestValues, setProgramInterestValues] = useState(
    createInputStateDefaults(programInterest.inputs, 'id')
  );

  const textareaQuestions = [
    {
      heading: 'Which sessions or dates are you interested in? It’s fine if you’re not sure yet!',
      pardotName: 'When_are_you_looking_to_get_started'
    },
    {
      heading:
        'Tell us a bit about yourself! Please include your academic/employment history, if applicable — it’s okay if you took a winding path! Most of our students have. We want to hear about it!',
      pardotName: 'personalInfo'
    },
    {
      heading: 'Why are you interested in attending Juno, and what are you looking to accomplish?',
      pardotName: 'Juno_Applicant_Goals'
    },
    {
      heading: 'Is there anything else you’d like our Admissions Team to know?',
      pardotName: 'anythingElse',
      required: false
    },
    {
      heading: 'How did you hear about Juno?',
      pardotName: 'How_did_you_hear_about_Juno',
      required: false
    }
  ];

  const formEl = useRef();

  const [questionsWithErrors, setQuestionsWithErrors] = useState([]);

  const scrollToFirstError = (firstQuestion) => {
    scroller.scrollTo(firstQuestion, {
      duration: 800,
      delay: 0,
      smooth: true,
      offset: -25
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (contactFieldInputValues.email) {
      trackSnowplowEmail(contactFieldInputValues.email);
    }

    if (typeof window !== 'undefined' && window) {
      window.sessionStorage.setItem('firstName', contactFieldInputValues.first_name);
    }

    let validationErrors = false;
    const listOfErrors = [];
    if (!hasAtLeastOneOptionChecked(programInterestValues)) {
      listOfErrors.push(programInterest.pardotName);
      validationErrors = true;
    }
    setQuestionsWithErrors(listOfErrors);

    if (validationErrors) {
      scrollToFirstError(listOfErrors[0]);
      return;
    }

    formEl.current.submit();
  };

  // handle form validation fail for privacy/email opt in questions
  const [formFailedSubmit, setFormFailedSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState([]);

  return (
    <Layout pageSlug={slug}>
      <Head metaContent={metaContent} pagePath={location.pathname} />
      <section className={`grid-wrapper ${ApplicationStyles.pageHeader}`}>
        <h1>{heroContent.h1Heading}</h1>
        <p
          className={ApplicationStyles.formIntro}
          dangerouslySetInnerHTML={{
            __html: heroContent.introParagraph.childMarkdownRemark.rawMarkdownBody
          }}
        />
        {applicationSteps && (
          <ul className={ApplicationStyles.process}>
            {[personWithMonitorIcon, browserWindowIcon, gradCapIcon].map((icon, index) => {
              const step = applicationSteps.content[index];
              return (
                <Fragment key={step.id}>
                  <li className={ApplicationStyles.processStep}>
                    <div className={ApplicationStyles.iconWrapper}>
                      <img src={icon} alt={`Icon for step ${index + 1}`} />
                    </div>
                    <h2>{step.title}</h2>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: step.bodyText.childMarkdownRemark.rawMarkdownBody
                      }}
                    />
                  </li>
                  {index < applicationSteps.content.length - 1 && (
                    <li className={ApplicationStyles.arrow}>
                      <img src={rightArrow} alt="" />
                    </li>
                  )}
                </Fragment>
              );
            })}
          </ul>
        )}
      </section>
      <section className={`grid-wrapper ${ApplicationStyles.formDesign}`}>
        <form
          action="https://go.junocollege.com/l/427982/2021-05-19/2l4wbq"
          method="POST"
          ref={formEl}
          onSubmit={(e) => handleSubmit(e)}
          onInvalid={(e) => handleInvalidSubmit(e, setFormFailedSubmit, formErrors, setFormErrors)}
        >
          <fieldset className={`${GeneralFormStyles.question} ${GeneralFormStyles.contactInfo}`}>
            <legend className="sr-only">{contactFields.heading}</legend>
            {contactFields.inputs.map((input) => (
              <label key={input.id} htmlFor={input.id}>
                <span className={(input.required ?? true) && GeneralFormStyles.required}>
                  {input.label}
                </span>
                <input
                  type={input.type}
                  id={input.id}
                  name={input.id}
                  required={input.required ?? true}
                  value={contactFieldInputValues[input.id]}
                  onChange={(e) =>
                    trackInputValueChanges(
                      e,
                      contactFieldInputValues,
                      setContactFieldInputValues,
                      e.target.name,
                      e.target.value
                    )
                  }
                />
              </label>
            ))}
          </fieldset>

          <fieldset className={GeneralFormStyles.question}>
            <legend className={GeneralFormStyles.required}>{formatPreference.heading}</legend>
            {formatPreference.inputs.map((input) => (
              <label htmlFor={input.id} key={input.id}>
                <input
                  type={formatPreference.type}
                  id={input.id}
                  name={formatPreference.pardotName}
                  value={input.value}
                  required
                />
                <span className={GeneralFormStyles.customCheckbox}>{input.label}</span>
              </label>
            ))}
          </fieldset>

          <fieldset
            className={`${GeneralFormStyles.question} ${
              questionsWithErrors.includes(programInterest.pardotName) &&
              !hasAtLeastOneOptionChecked(programInterestValues)
                ? GeneralFormStyles.error
                : ''
            }`}
            id={programInterest.pardotName}
          >
            <legend className={GeneralFormStyles.required}>{programInterest.heading}</legend>
            {questionsWithErrors.includes(programInterest.pardotName) && (
              <p className="sr-only">Please check at least one option</p>
            )}
            {programInterest.inputs.map((input) => (
              <label htmlFor={input.id} key={input.id}>
                <input
                  type={programInterest.type}
                  id={input.id}
                  name={programInterest.pardotName}
                  value={input.label}
                  onChange={(e) =>
                    trackInputValueChanges(
                      e,
                      programInterestValues,
                      setProgramInterestValues,
                      e.target.id,
                      e.target.id,
                      true
                    )
                  }
                />
                <span className={GeneralFormStyles.customCheckbox}>{input.label}</span>
              </label>
            ))}
          </fieldset>

          {textareaQuestions.map((question) => (
            <label
              htmlFor={question.pardotName}
              key={question.pardotName}
              className={GeneralFormStyles.longTextResponse}
            >
              <span
                className={`${GeneralFormStyles.longTextQuestion} ${
                  (question.required ?? true) && GeneralFormStyles.required
                }`}
              >
                {question.heading}
              </span>
              {question.examples && (
                <ul className={GeneralFormStyles.questionExamples}>
                  {question.examples.map((example) => (
                    <li key={example.replace(/\s/g, '')}>{example}</li>
                  ))}
                </ul>
              )}
              <textarea
                name={question.pardotName}
                id={question.pardotName}
                required={question.required ?? true}
              />
            </label>
          ))}

          <div className={GeneralFormStyles.formEnd}>
            <RequiredOptInFormInputs
              onChange={(e) =>
                validateCheckboxChange(e, formFailedSubmit, formErrors, setFormErrors)
              }
              formErrors={formErrors}
            />
            <SnowplowHiddenFormInputs />
            <LastTouchHiddenFormInputs />

            <Button
              type="submit"
              text="Submit Application"
              buttonStyle="primary"
              className={GeneralFormStyles.submitButton}
            />
          </div>
        </form>
      </section>
    </Layout>
  );
};

export default Apply;

export const queryBootcampApply = graphql`
  query bootcampApply {
    contentfulPageGeneric(slug: { eq: "bootcamp-apply" }) {
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
        introParagraph {
          childMarkdownRemark {
            rawMarkdownBody
          }
        }
      }
      sections {
        style
        heading
        content {
          ... on ContentfulContentBlock {
            id
            title
            bodyText {
              childMarkdownRemark {
                rawMarkdownBody
              }
            }
          }
        }
      }
    }
  }
`;
