import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="ym-noprint">
      <div className="ym-wrapper">
        <div className="ym-wbox">
          <p className="alignCenter">
            {/* Wordproject® 是 <a href="https://www.abiblica.org/index.html">国际圣经组织</a> 的注册名，是一个非营利性的组织，在中国澳门特别行政区注册. */}
          </p>
          <p className="alignCenter">
            {/* <Link href="/contact/new/index.htm">联系我们</Link> | <Link href="/contact/new/disclaim.htm">免责声明</Link> |
            <Link href="/contact/new/state.htm">信仰说明</Link> |
            <Link href="/contact/new/mstate.htm">天职说明</Link> | */}
            <Link href="/contact/new/copyrights.htm">版权声明</Link>
            CopyRight Apollo‘s project® 2025
          </p>

          <div className="centered spacingdiv">
            <span className="fa-stack">
              <a title="Follow us on Youtube" href="https://www.youtube.com/@wordproaction3358/shorts" target="_blank">
                <i className="fab fa-youtube"></i>
              </a>
            </span>

            <span className="fa-stack">
              <a title="Download NEW App from Playstore" href="https://play.google.com/store/apps/details?id=org.wordproject.app&hl=en" target="_blank">
                <i className="fab fa-google-play"></i>
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
