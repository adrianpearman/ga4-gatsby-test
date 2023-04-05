import React from 'react';

const TwitterIcon = ({ className = '', title = 'Twitter icon', uniqueId = '' }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="28"
      viewBox="0 0 20 28"
      aria-labelledby={`${uniqueId}-twitter-icon-title`}
      role="img"
    >
      <title id={`${uniqueId}-twitter-icon-title`}>{title}</title>
      <path
        className="cls-1"
        d="M17.55,10.12v.47A11.08,11.08,0,0,1,6.43,21.7,11.56,11.56,0,0,1,.45,20h.94a7.38,7.38,0,0,0,4.8-1.64,3.8,3.8,0,0,1-3.63-2.69c.24,0,.47.12.71.12a3.14,3.14,0,0,0,1.05-.12,4,4,0,0,1-3.16-3.86h0a3.3,3.3,0,0,0,1.75.47A4.29,4.29,0,0,1,1.27,9a4,4,0,0,1,.59-2,10.94,10.94,0,0,0,8.08,4.1,2.24,2.24,0,0,1-.12-.94,3.9,3.9,0,0,1,3.87-3.86A3.56,3.56,0,0,1,16.5,7.55,5.68,5.68,0,0,0,19,6.61,3.92,3.92,0,0,1,17.2,8.72a11.34,11.34,0,0,0,2.35-.59A7.88,7.88,0,0,1,17.55,10.12Z"
      />
    </svg>
  );
};

export default TwitterIcon;
