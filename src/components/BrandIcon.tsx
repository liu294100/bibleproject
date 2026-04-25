'use client';

type BrandName = 'youtube' | 'googleplay' | 'appstore' | 'facebook' | 'tiktok' | 'x' | 'instagram';

const iconClassName = 'h-[18px] w-[18px]';

const BrandIcon = ({ name }: { name: BrandName }) => {
  switch (name) {
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={iconClassName}>
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.6 15.7V8.3l6.4 3.7-6.4 3.7Z" />
        </svg>
      );
    case 'googleplay':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={iconClassName}>
          <path d="M3 2.8c0-.6.7-1 1.2-.6l10.7 10.1L4.3 22.3A.8.8 0 0 1 3 21.7V2.8Zm13 8.6 2.8-2.7-11-6.2 8.2 9Zm3.9 2.2-2.9-1.7-8.1 8.1 10.8-6a.8.8 0 0 0 .2-.4ZM8.8 3.8l8 8-8 8-4.2-4 5.4-4-5.4-4 4.2-4Z" />
        </svg>
      );
    case 'appstore':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={iconClassName}>
          <path d="M16.7 12.7c0-2 1.6-3 1.7-3.1-1-1.5-2.6-1.7-3.2-1.7-1.4-.2-2.7.8-3.4.8-.7 0-1.7-.8-2.8-.8-1.5 0-2.8.8-3.6 2-.8 1.3-1 3.1-.2 4.8.8 1.8 2 3.8 3.5 3.7.7 0 1.3-.5 2.4-.5 1 0 1.6.5 2.5.5 1.6 0 2.6-1.8 3.4-3.6-.1 0-2.3-.9-2.3-3.1Zm-2.3-7.1c.6-.7 1.1-1.7 1-2.6-.9 0-2 .6-2.6 1.3-.6.6-1.1 1.6-1 2.5 1 .1 2-.5 2.6-1.2Z" />
        </svg>
      );
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={iconClassName}>
          <path d="M13.3 21v-7.7h2.6l.4-3h-3V8.4c0-.9.3-1.5 1.6-1.5H16V4.2c-.2 0-1.2-.2-2.3-.2-2.3 0-3.9 1.4-3.9 4v2.3H7.2v3h2.6V21h3.5Z" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={iconClassName}>
          <path d="M14.8 3c.4 2 1.6 3.2 3.6 3.5v2.7c-1.4.1-2.6-.3-3.6-1V15a5 5 0 1 1-5-5c.3 0 .7 0 1 .1v2.8a2.3 2.3 0 0 0-1-.2A2.3 2.3 0 1 0 12 15V3h2.8Z" />
        </svg>
      );
    case 'x':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={iconClassName}>
          <path d="M18.9 3H21l-6.6 7.5L22 21h-6l-4.7-6.2L5.8 21H3.7l7-8L2 3h6.2l4.3 5.8L18.9 3Zm-1 16.2h1.2L7.4 4.7H6.1l11.8 14.5Z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={iconClassName}>
          <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 1.8A3.7 3.7 0 0 0 3.8 7.5v9a3.7 3.7 0 0 0 3.7 3.7h9a3.7 3.7 0 0 0 3.7-3.7v-9a3.7 3.7 0 0 0-3.7-3.7h-9Zm9.4 1.4a1.1 1.1 0 1 1 0 2.1 1.1 1.1 0 0 1 0-2.1ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8A3.2 3.2 0 1 0 12 15a3.2 3.2 0 0 0 0-6.4Z" />
        </svg>
      );
    default:
      return null;
  }
};

export default BrandIcon;
