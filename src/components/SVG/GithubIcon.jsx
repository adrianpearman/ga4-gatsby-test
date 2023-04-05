import React from 'react';

const GithubIcon = ({ className = '', title = 'Github icon', uniqueId = '' }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="28"
      viewBox="0 0 20 28"
      aria-labelledby={`${uniqueId}-github-icon-title`}
      role="img"
    >
      <title id={`${uniqueId}-github-icon-title`}>{title}</title>
      <path
        className="cls-1"
        d="M10,5.31A8.91,8.91,0,0,0,7.18,22.67c.45.09.61-.19.61-.43s0-.77,0-1.51c-2.48.54-3-1.2-3-1.2a2.42,2.42,0,0,0-1-1.3c-.81-.55.06-.54.06-.54a1.89,1.89,0,0,1,1.37.92,1.89,1.89,0,0,0,2.59.74,1.9,1.9,0,0,1,.56-1.19c-2-.23-4-1-4-4.41a3.45,3.45,0,0,1,.91-2.39A3.22,3.22,0,0,1,5.32,9s.75-.24,2.45.91a8.44,8.44,0,0,1,4.46,0C13.93,8.77,14.68,9,14.68,9a3.22,3.22,0,0,1,.09,2.35,3.45,3.45,0,0,1,.91,2.39c0,3.43-2.08,4.18-4.06,4.4a2.14,2.14,0,0,1,.6,1.65c0,1.19,0,2.15,0,2.44s.16.52.61.43A8.91,8.91,0,0,0,10,5.31Z"
      />
    </svg>
  );
};

export default GithubIcon;
