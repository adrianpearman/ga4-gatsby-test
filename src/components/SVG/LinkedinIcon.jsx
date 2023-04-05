import React from 'react';

const LinkedinIcon = ({ className = '', title = 'LinkedIn icon', uniqueId = '' }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="28"
      viewBox="0 0 20 28"
      aria-labelledby={`${uniqueId}-linkedin-icon-title`}
      role="img"
    >
      <title id={`${uniqueId}-linkedin-icon-title`}>{title}</title>
      <path
        className="cls-1"
        d="M16.78,6H3.22A1.15,1.15,0,0,0,2.05,7.18v13.6a1.16,1.16,0,0,0,1.17,1.15H16.78A1.15,1.15,0,0,0,18,20.79h0V7.18A1.15,1.15,0,0,0,16.78,6Zm-10,13.54H4.41V12H6.77ZM5.58,11a1.37,1.37,0,1,1,1-.4A1.38,1.38,0,0,1,5.58,11Zm10,8.62H13.25V15.87c0-.87,0-2-1.23-2s-1.42,1-1.42,2v3.75H8.24V12H10.5v1.06h0a2.52,2.52,0,0,1,2.27-1.2c2.39,0,2.83,1.59,2.83,3.61Z"
      />
    </svg>
  );
};

export default LinkedinIcon;
