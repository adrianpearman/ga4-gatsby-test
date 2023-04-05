import React, { useState } from 'react';

import * as VCardStyles from './ValueCard.module.scss';
import PlusAndMinus from '../SVG/PlusAndMinus';

const ValueCard = ({ value, perksSection }) => {
  const [isClosed, setIsClosed] = useState(true);

  return (
    <div className={perksSection ? VCardStyles.perksCard : VCardStyles.valueCard}>
      <div className={VCardStyles.titleRow}>
        <h3 className={perksSection ? VCardStyles.perkSubhead : VCardStyles.valueSubhead}>
          {value.title}
        </h3>
        <button type="button" className={VCardStyles.toggle} onClick={() => setIsClosed(!isClosed)}>
          <PlusAndMinus minus={!isClosed} />
        </button>
      </div>
      <p
        className={isClosed ? VCardStyles.hide : ''}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: value.bodyText.childMarkdownRemark.rawMarkdownBody
        }}
      />
    </div>
  );
};

export default ValueCard;
