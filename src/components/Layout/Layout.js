"use client";
import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import Header from "../Header";
import Footer from "../Footer";

const Layout = ({ children, pageContext, pageData }) => {
  // const [visibleLoader, setVisibleLoader] = useState(true);

  useEffect(() => {
    AOS.init({ once: true });
    // setVisibleLoader(false);
  }, []);

  // Navbar style based on scroll
  const eleRef = useRef();

  if (pageContext.layout === "bare") {
    return (
      <div data-theme-mode-panel-active data-theme="light">
        <div className="site-wrapper overflow-hidden" ref={eleRef}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <>
      <div data-theme-mode-panel-active data-theme="light">
        <div className="site-wrapper overflow-hidden" ref={eleRef}>
          <Header />
          {children}
          <Footer pageData={pageData} />
        </div>
      </div>
    </>
  );
};

export default Layout;
