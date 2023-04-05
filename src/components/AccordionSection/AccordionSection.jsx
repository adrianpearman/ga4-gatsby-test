/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import Button from '../Button/Button';
import PlusAndMinus from '../SVG/PlusAndMinus';

import * as AccordionSectionStyles from './AccordionSection.module.scss';

const AccordionSection = ({ section, className, id, backgroundStyle, faq = false }) => {
  const includesBottomCta = section.style.includes('with-cta');
  const [bottomCta] = section.content.slice(-1);

  const [openedAccordions, setOpenedAccordions] = useState([]);

  const handleToggleButtonClick = (accordionId) => {
    if (openedAccordions.includes(accordionId)) {
      const updatedAccordionList = openedAccordions.filter((openedId) => openedId !== accordionId);
      setOpenedAccordions(updatedAccordionList);
    } else {
      const updatedAccordionList = [...openedAccordions, accordionId];
      setOpenedAccordions(updatedAccordionList);
    }
  };

  const faqCards = faq && section.content[0].faq;

  const accordionList =
    faqCards ||
    section.content.filter((content) => content.__typename === 'ContentfulContentBlock');

  return (
    <section
      id={id}
      className={`grid-wrapper ${className} ${AccordionSectionStyles.section} ${AccordionSectionStyles[backgroundStyle]}`}
    >
      <div className={AccordionSectionStyles.mainContent}>
        {section.heading && (
          <h2 className={AccordionSectionStyles.sectionHeading}>{section.heading}</h2>
        )}
        <p
          className={AccordionSectionStyles.sectionDescription}
          dangerouslySetInnerHTML={{
            __html: section.description?.childMarkdownRemark?.rawMarkdownBody || ''
          }}
        />
        {accordionList.map((accordion, index, array) => {
          if (includesBottomCta && index === array.length - 1) {
            return null;
          }
          const accordionTitle = accordion.title || accordion.question || '';
          const accordionContent = accordion.bodyText || accordion.answer || '';
          return (
            <article key={accordion.id} className={AccordionSectionStyles.accordion}>
              <button
                type="button"
                className={AccordionSectionStyles.accordionHeading}
                onClick={() => handleToggleButtonClick(accordion.id)}
              >
                {accordionTitle && <h3>{accordionTitle}</h3>}
                <PlusAndMinus
                  parentClass={AccordionSectionStyles.toggleIcon}
                  minus={openedAccordions.includes(accordion.id)}
                />
              </button>
              {openedAccordions.includes(accordion.id) && (
                <div
                  className={AccordionSectionStyles.accordionContent}
                  dangerouslySetInnerHTML={{
                    __html: accordionContent?.childMarkdownRemark?.html || ''
                  }}
                />
              )}
            </article>
          );
        })}
      </div>
      {includesBottomCta && (
        <div className={AccordionSectionStyles.bottomCta}>
          {bottomCta.title && <h3>{bottomCta.title}</h3>}
          <p
            dangerouslySetInnerHTML={{
              __html: bottomCta.bodyText?.childMarkdownRemark?.rawMarkdownBody || ''
            }}
          />
          {bottomCta.button && (
            <Button
              text={bottomCta.button.text}
              href={bottomCta.button.url}
              openInNewTab={bottomCta.button.openInNewTab}
              useSnowplowTracking={bottomCta.button.useSnowplowTracking}
              urlIsRelativePath={bottomCta.button.isUrlRelativePath}
              buttonStyle="primary"
              className={AccordionSectionStyles.button}
            />
          )}
        </div>
      )}
    </section>
  );
};

export default AccordionSection;
