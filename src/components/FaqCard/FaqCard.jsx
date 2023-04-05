import React, { useState } from 'react';
import PlusAndMinus from '../SVG/PlusAndMinus';

import * as FaqCardStyles from './FaqCard.module.scss';

const FaqCard = ({ faq }) => {
  const [answerIsOpened, setAnswerIsOpened] = useState(false);

  const handleToggleButtonClick = () => {
    setAnswerIsOpened(!answerIsOpened);
  };

  return (
    <div className={FaqCardStyles.fullCard}>
      <button
        type="button"
        className={FaqCardStyles.toggleAnswerButton}
        onClick={() => handleToggleButtonClick()}
        aria-label={`${answerIsOpened ? 'Hide' : 'Show'} the answer to this question`}
      >
        <h3 className={FaqCardStyles.question}>{faq.question}</h3>
        <PlusAndMinus parentClass={FaqCardStyles.toggleIcon} minus={answerIsOpened} />
      </button>
      <div
        className={`${FaqCardStyles.answerWrapper} ${
          answerIsOpened ? FaqCardStyles.answerOpened : ''
        }`}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: faq.answer.childMarkdownRemark.html
        }}
      />
    </div>
  );
};

export default FaqCard;
