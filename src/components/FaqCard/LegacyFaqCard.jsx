import React from 'react';
import * as LegacyFaqCardStyles from './LegacyFaqCard.module.scss';

class LegacyFaqCard extends React.Component {
  toggleFaq = (e, id) => {
    e.preventDefault();
    this[`answer-${id}`].classList.toggle(`${LegacyFaqCardStyles.answerClosed}`);
    this[`toggle-${id}`].classList.toggle(`${LegacyFaqCardStyles.buttonClose}`);
  };

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const { question, answer, id } = this.props.data;
    const { closedDrawers } = this.props;
    return (
      <div
        className={`${LegacyFaqCardStyles.individualFaq} ${
          closedDrawers && LegacyFaqCardStyles.closedDrawersStyle
        }`}
        key={id}
      >
        <p className={LegacyFaqCardStyles.faqQuestion}>{question}</p>
        <button
          ref={(button) => {
            this[`toggle-${id}`] = button;
          }}
          type="button"
          className={LegacyFaqCardStyles.buttonToggle}
          aria-label="Show answer"
          onClick={(e) => this.toggleFaq(e, id)}
        />
        <div
          ref={(div) => {
            this[`answer-${id}`] = div;
          }}
          className={`${LegacyFaqCardStyles.faqAnswer} ${LegacyFaqCardStyles.answerClosed}`}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: answer.childMarkdownRemark.html
          }}
        />
      </div>
    );
  }
}
export default LegacyFaqCard;
