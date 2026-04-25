import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import Breadcrumbs from "@/components/Breadcrumbs";
import { LocaleProvider } from "@/components/LocaleProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "圣经国际 - 读到的和听到的圣经在超过40种语言",
  description: "阅读和听圣经英语，葡萄牙语，中国语，西班牙语， 法语，德语，印地文，斯瓦希里语，土耳其语，波斯语，阿拉伯语，韩语，日语，印度尼西亚语，意大利语，和许多其他语言",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <LocaleProvider>
          <Header />
          <Navigation />
          <div className="site-utility-bar ym-noprint">
            <div className="ym-wrapper utility-inner">
              <Breadcrumbs />
              <ThemeToggle />
            </div>
          </div>
          <main id="main" className="ym-clearfix" role="main">
            <div className="ym-wrapper">
              <div className="ym-wbox">
                {children}
              </div>
            </div>
          </main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
