import React, { useContext, useState } from "react";
import Link from "next/link";
import MainMenuModal from "./MainMenuModal";
import GlobalContext from "../../context/GlobalContext";

const Header = () => {
  const [show, setShow] = useState(false);
  const { isBigHeader, menuItems } = useContext(GlobalContext);
  const [searchOverlayShow, setSearchOverlayShow] = useState(false);
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
        className={`${isBigHeader ? "header-big" : ""} header-aurora-outer`}
      >
        {!isBigHeader && (
          <>
            <div className="aurora-inner-4"></div>
            <div className="aurora-inner-5"></div>
          </>
        )}
        <div className="header-container container-md ">
          <div className="header-inner">
            <Link href={"/"} className="logo">
              <img src="/images/png/logo.svg" alt="Logo" />
            </Link>
            <div className="header-right">
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

Header.defaultProps = {
  isBigHeader: false,
};

export default Header;
