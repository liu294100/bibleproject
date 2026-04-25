'use client';

import React from 'react';
import { ArrowUp, Mail, Printer } from 'lucide-react';

interface ShareButtonsProps {
  pageTitle: string;
  printTargetId?: string;
  printDocumentTitle?: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({
  pageTitle,
  printTargetId,
  printDocumentTitle,
}) => {
  const handlePrint = () => {
    const target = printTargetId ? document.getElementById(printTargetId) : null;

    if (!target) {
      window.print();
      return;
    }

    const printWindow = window.open('', '_blank', 'noopener,noreferrer,width=960,height=720');
    if (!printWindow) {
      window.print();
      return;
    }

    const title = printDocumentTitle || pageTitle;
    const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
      .map((node) => node.outerHTML)
      .join('\n');

    printWindow.document.open();
    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="zh-CN">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>${title}</title>
          ${styles}
          <style>
            body {
              margin: 0;
              padding: 32px 24px;
              color: #1f2937;
              background: #ffffff;
              font-family: "Noto Serif SC", "Songti SC", "SimSun", serif;
            }
            .print-sheet {
              max-width: 840px;
              margin: 0 auto;
            }
            .print-sheet h1 {
              margin: 0 0 20px;
              font-size: 28px;
              line-height: 1.25;
            }
            .print-sheet .reader-heading {
              display: block;
              margin-bottom: 20px;
            }
            .print-sheet .reader-heading p {
              display: none;
            }
            .print-sheet .textBody,
            .print-sheet .reader-body {
              display: block;
            }
            .print-sheet .reader-verse,
            .print-sheet p {
              font-size: 16px;
              line-height: 1.9;
              margin: 0 0 12px;
            }
            .print-sheet .verse {
              color: #b1343c;
              font-weight: 700;
              margin-right: 8px;
            }
            .print-sheet .word {
              color: #a31d1d;
            }
          </style>
        </head>
        <body>
          <main class="print-sheet">
            <h1>${title}</h1>
            ${target.innerHTML}
          </main>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();

    const executePrint = () => {
      printWindow.print();
      printWindow.close();
    };

    if (printWindow.document.readyState === 'complete') {
      executePrint();
    } else {
      printWindow.onload = executePrint;
    }
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
        <button type="button" title="打印或导出 PDF" aria-label="打印或导出 PDF" onClick={handlePrint}>
          <Printer size={18} strokeWidth={2} />
        </button>
      </span>
      <span className="fa-stack">
        <button type="button" title="通过邮件分享" aria-label="通过邮件分享" onClick={handleEmailShare}>
          <Mail size={18} strokeWidth={2} />
        </button>
      </span>
      <span className="fa-stack">
        <button type="button" title="回到顶部" aria-label="回到顶部" onClick={handleScrollToTop}>
          <ArrowUp size={18} strokeWidth={2} />
        </button>
      </span>
    </div>
  );
};

export default ShareButtons;
