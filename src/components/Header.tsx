import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="ym-noprint">
      <div id="mytop" className="ym-wrapper">
        <div className="ym-wbox" style={{ backgroundColor: "#b1343c", padding: "0.5rem 1rem" }}>
          <span className="wp">
            <strong><Link className="wplink" href="/">Apo </Link></strong>
            <Link className="wplink" href="/"><em>Project</em></Link>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
