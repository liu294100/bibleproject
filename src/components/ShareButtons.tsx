'use client';

import React from 'react';

interface ShareButtonsProps {
  pageTitle: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ pageTitle }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleEmailShare = () => {
    const emailSubject = encodeURIComponent(pageTitle);
    const emailBody = encodeURIComponent(`I thought you might be interested in this page: ${pageTitle}\n\n${window.location.href}`);
    window.location.href = `mailto:?subject=${emailSubject}&body=${emailBody}`;
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="shareright ym-noprint spacingdiv">
      <span className="fa-stack">
        <a title="Click to print this page" onClick={handlePrint} style={{ cursor: 'pointer' }}>
          <i className="fas fa-print"></i>
        </a>
      </span>
      <span className="fa-stack">
        <a title="Click to share this page via email" onClick={handleEmailShare} style={{ cursor: 'pointer' }}>
          <i className="fas fa-envelope"></i>
        </a>
      </span>
      <span className="fa-stack">
        <a title="Go to top of page" onClick={handleScrollToTop} style={{ cursor: 'pointer' }}>
          <i className="fas fa-arrow-up"></i>
        </a>
      </span>
    </div>
  );
};

export default ShareButtons;
