import React, { useContext, useState, useRef } from "react";
import Link from "next/link";
import MainMenuModal from "./MainMenuModal";
import GlobalContext from "../../context/GlobalContext";
import { useCleanupAttributes } from "../../utils/useHydrationFix";

const Header = () => {
  const [show, setShow] = useState(false);
  const { isBigHeader = false, menuItems } = useContext(GlobalContext);
  const [searchOverlayShow, setSearchOverlayShow] = useState(false);
  const headerRef = useRef(null);
  const containerRef = useRef(null);
  const innerRef = useRef(null);
  const rightRef = useRef(null);

  // Clean up attributes on all header elements
  useCleanupAttributes(headerRef);
  useCleanupAttributes(containerRef);
  useCleanupAttributes(innerRef);
  useCleanupAttributes(rightRef);
  const handleClose = () => {
    setShow(false);
    if (searchOverlayShow) {
      setSearchOverlayShow(false);
    }
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <header
        ref={headerRef}
        className={`${isBigHeader ? "header-big" : ""} header-aurora-outer`}
        suppressHydrationWarning
      >
        {!isBigHeader && (
          <>
            <div className="aurora-inner-4" suppressHydrationWarning></div>
            <div className="aurora-inner-5" suppressHydrationWarning></div>
          </>
        )}
        <div ref={containerRef} className="header-container container-md" suppressHydrationWarning>
          <div ref={innerRef} className="header-inner" suppressHydrationWarning>
            <Link href={"/"} className="logo">
              <img src="/images/png/logo.svg" alt="Logo" />
            </Link>
            <div ref={rightRef} className="header-right" suppressHydrationWarning>
              <nav>
                <ul>
                  {Object.keys(menuItems).length
                    ? menuItems.mainNavigation.map((link, id) => {
                      const uid = link.data.uid;
                      return (
                        <li
                          key={link.link}
                          className={`${uid === 140 || uid === 23 || uid === 128
                              ? "d-none"
                              : ""
                            }`}
                        >
                          <Link href={`${link.link}`}>
                            {link.title}
                          </Link>
                        </li>
                      );
                    })
                    : ""}
                </ul>
              </nav>
              <div className="menu-box" onClick={handleShow}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <MainMenuModal
        menuItems={menuItems}
        show={show}
        handleClose={handleClose}
        searchOverlayShow={searchOverlayShow}
        setSearchOverlayShow={setSearchOverlayShow}
      />
    </>
  );
};

export default Header;
