import React from 'react';

const ExternalLinkIcon = ({ className = '', title = 'External Link icon', uniqueId = '' }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="28"
      viewBox="0 0 20 28"
      aria-labelledby={`${uniqueId}-external-link-icon-title`}
      role="img"
    >
      <title id={`${uniqueId}-external-link-icon-title`}>{title}</title>
      <path
        className="cls-1"
        d="M13.77,22.49H4.25A2.74,2.74,0,0,1,1.5,19.73V10.21A2.75,2.75,0,0,1,4.25,7.46H8v2H4.25a.75.75,0,0,0-.75.75v9.52a.75.75,0,0,0,.76.76h9.51a.74.74,0,0,0,.75-.75V16h2v3.71A2.75,2.75,0,0,1,13.77,22.49Zm-4.5-6.37L7.86,14.71l7.23-7.23H10.64v-2H18.5v7.86h-2V8.89Z"
      />
    </svg>
  );
};

export default ExternalLinkIcon;
