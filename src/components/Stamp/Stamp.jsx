import React from 'react';

import * as StampStyles from './Stamp.module.scss';

const Stamp = ({ OuterStamp, InnerStamp, className }) => {
  return (
    <div className={`${StampStyles.stamp} ${className}`}>
      <div className={StampStyles.innerImage} style={{ backgroundImage: `url(${InnerStamp})` }}>
        <div className={StampStyles.outerImage} style={{ backgroundImage: `url(${OuterStamp})` }} />
      </div>
    </div>
  );
};

export default Stamp;
