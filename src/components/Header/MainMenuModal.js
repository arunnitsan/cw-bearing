import { useRef, useEffect, useState, useTransition } from "react";
import Link from "next/link";
import AOS from "aos";
import { useRouter } from "next/router";
import AuroraInner from "../Shared/AuroraInner";
import SearchOverlay from "./SearchOverlay";
import { useTranslation } from "../i18n/client";

const MainMenuModal = ({
  menuItems,
  show,
  handleClose,
  searchOverlayShow,
  setSearchOverlayShow,
}) => {
  const router = useRouter();
  const { t } = useTranslation(router.locale);
  const [nestedShow, setNestedShow] = useState(false);
  const [activeLink, setActiveLink] = useState(false);
  const [subMenu, setSubMenu] = useState([]);
  const [subMenuLabel, setSubMenuLabel] = useState(null);
  const [subActiveLink, setSubActiveLink] = useState(false);
  const [thirdNestedShow, setThirdNestedShow] = useState(false);
  const [thirdMenu, setThirdMenu] = useState([]);
  const [thirdMenuLabel, setThirdMenuLabel] = useState(null);

  // old code for menu

  // useEffect(() => {
  //   const currRoute = router.asPath.substring(1).split("/");
  //   if (currRoute && currRoute.length && currRoute[0]) {
  //     if (menuItems.mainNavigation || menuItems.subNavigation) {
  //       menuItems.mainNavigation.map((mainNav) => {
  //         if (
  //           mainNav.data.slug.substring(1).replaceAll("-", " ") ===
  //           currRoute[0].toLowerCase().replaceAll("-", " ")
  //         ) {
  //           if (currRoute[1]) {
  //             setActiveLink(mainNav.title);
  //             setSubMenuLabel(mainNav);
  //             setNestedShow(true);
  //             if (mainNav.children) {
  //               setSubMenu(mainNav.children);
  //               mainNav.children.map((mChild) => {
  //                 if (
  //                   mChild.data.slug
  //                     .substring(1)
  //                     .replaceAll("-", " ")
  //                     .split("/")[1] ===
  //                   currRoute[1].toLowerCase().replaceAll("-", " ")
  //                 ) {
  //                   if (currRoute[2]) {
  //                     setSubActiveLink(mChild.title);
  //                     setThirdNestedShow(true);
  //                     setThirdMenu(mChild.children ? mChild.children : []);
  //                     setThirdMenuLabel(mChild ? mChild : null);
  //                   }
  //                 }
  //               });
  //             }
  //           }
  //           return;
  //         }
  //       });
  //       menuItems.subNavigation.map((subNav) => {
  //         if (
  //           subNav.data.slug.substring(1).replaceAll("-", " ") ===
  //           currRoute[0].toLowerCase().replaceAll("-", " ")
  //         ) {
  //           if (currRoute[1]) {
  //             setActiveLink(subNav.title);
  //             setSubMenuLabel(subNav);
  //             setNestedShow(true);
  //             if (subNav.children) {
  //               setSubMenu(subNav.children);
  //               subNav.children.map((mChild) => {
  //                 if (
  //                   mChild.data.slug
  //                     .substring(1)
  //                     .replaceAll("-", " ")
  //                     .split("/")[1] ===
  //                   currRoute[1].toLowerCase().replaceAll("-", " ")
  //                 ) {
  //                   if (currRoute[2]) {
  //                     setSubActiveLink(mChild.title);
  //                     setThirdNestedShow(mChild.data.doktype !== 3 ? true : false);
  //                     setThirdMenu(mChild.children ? mChild.children : []);
  //                     setThirdMenuLabel(mChild ? mChild : null);
  //                   }
  //                 }
  //               });
  //             }
  //           }
  //           return;
  //         }
  //       });
  //     }
  //   }
  // }, [menuItems]);

  useEffect(() => {
    AOS.refresh();
  }, [activeLink, subActiveLink]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (show) {
        document.querySelector("html").classList.add("has-offcanvas");
        document.body.classList.add("has-offcanvas");
      } else {
        document.querySelector("html").classList.remove("has-offcanvas");
        document.body.classList.remove("has-offcanvas");
      }
    }
  }, [show]);

  const hideSearchOverlay = () => {
    setSearchOverlayShow(false);
  };

  const handleLinkClick = (link, menu) => {
    setActiveLink(link.title);
    setNestedShow(true);
    setSubMenuLabel(link);
    if (menu && menu.length) {
      setSubMenu(menu);
    } else {
      setSubMenu([]);
    }
    setSubActiveLink(false);
    setThirdNestedShow(false);
    setThirdMenu([]);
    setThirdMenuLabel(null);
  };

  const renderMenuLinks = () => {
    if (Object.keys(menuItems).length && menuItems.mainNavigation.length) {
      return menuItems.mainNavigation.map((link, id) => {
        return (
          <li
            key={link.title + id}
            className={`${
              show
                ? nestedShow
                  ? ""
                  : "animate__animated animate__fadeInLeft animate__fast"
                : ""
            } menu-link`}
          >
            <>
              {link.children && link.children.length ? (
                <div
                  className={`${
                    activeLink === link.title ? "active-menu" : ""
                  } ${
                    link.data.uid === 140 ||
                    link.data.uid === 23 ||
                    link.data.uid === 128
                      ? "d-none"
                      : ""
                  } ${
                    link.active === 1 && link.current === 1 ? "active" : ""
                  } menu-link-w-arrow`}
                  onClick={() => handleLinkClick(link, link.children)}
                >
                  <span className="link-name">{link.title}</span>
                  <span className="icon-in">
                    <img
                      src="/images/png/arrowhead-right-white.svg"
                      alt="Arrow Right"
                      className="none-active"
                    />
                    <img
                      src="/images/png/arrowhead-right-brown.svg"
                      className="hover-active"
                      alt="Arrow Right"
                    />
                  </span>
                </div>
              ) : (
                //       <Link href={`${link.data.slug}`} className={`${activeLink === link.title ? "active" : ""}
                // ${link.data.uid === 140 || link.data.uid === 23 || link.data.uid === 128 ? "d-none" : ""} menu-link-w-arrow`}
                //         onClick={() => {
                //           // setActiveLink(!activeLink);
                //           setActiveLink(link.title);
                //           setNestedShow(false);
                //           setSubMenuLabel("");
                //           setSubMenu([]);
                //           handleClose();
                //         }}
                //       >

                <Link
                  href={`${link.link}`}
                  className={`${
                    link.active === 1 && link.current === 1 ? "active" : ""
                  } 
					${
            link.data.uid === 140 ||
            link.data.uid === 23 ||
            link.data.uid === 128
              ? "d-none"
              : ""
          } menu-link-w-arrow`}
                  onClick={() => {
                    // setActiveLink(!activeLink);
                    setActiveLink(link.title);
                    setNestedShow(false);
                    setSubMenuLabel("");
                    setSubMenu([]);
                    handleClose();
                  }}
                >
                  <span className="link-name">{link.title}</span>
                </Link>
              )}
            </>
          </li>
        );
      });
    }
  };

  const renderMetaLinks = () => {
    if (Object.keys(menuItems).length && menuItems.subNavigation.length) {
      return menuItems.subNavigation.map((link, id) => {
        return (
          <li
            key={link.title + id}
            className={`${
              show
                ? nestedShow
                  ? ""
                  : "animate__animated animate__fadeInLeft animate__fast"
                : ""
            } menu-link`}
          >
            <>
              {link.children && link.children.length ? (
                <div
                  className={`${activeLink === link.title ? "active" : ""} ${
                    link.data.uid === 140 ||
                    link.data.uid === 23 ||
                    link.data.uid === 128
                      ? "d-none"
                      : ""
                  } menu-link-w-arrow`}
                  onClick={() => handleLinkClick(link, link.children)}
                >
                  <span className="link-name">{link.title}</span>
                  <span className="icon-in">
                    <img
                      src="/images/png/arrowhead-right-gray.svg"
                      alt="Arrow Right"
                    />
                  </span>
                </div>
              ) : (
                <Link
                  href={`${link.data.slug}`}
                  className={`${activeLink === link.title ? "active" : ""} 
					${
            link.data.uid === 140 ||
            link.data.uid === 23 ||
            link.data.uid === 128
              ? "d-none"
              : ""
          } menu-link-w-arrow`}
                  onClick={() => {
                    setActiveLink(!activeLink);
                    setNestedShow(false);
                    setSubMenuLabel("");
                    setSubMenu([]);
                    handleClose();
                  }}
                >
                  <span className="link-name">{link.title}</span>
                </Link>
              )}
            </>
          </li>
        );
      });
    }
  };

  return (
    <div
      className={`drawer ${searchOverlayShow ? "overflow-hidden" : ""} ${
        !show ? "hidden" : ""
      }`}
    >
      <AuroraInner />
      <div className="modal-inner">
        <div className="modal-wrapper">
          <div className="actions-bar">
            {nestedShow && (
              <div
                className="back-to-main-menu"
                data-aos="fade-left"
                onClick={() => {
                  if (thirdNestedShow) {
                    setThirdNestedShow(false);
                  } else {
                    setNestedShow(false);
                  }
                }}
              >
                <img
                  src="/images/png/arrow-white-right-over.svg"
                  alt="Arrow Right"
                />{" "}
                {t("data.goBackText")}
              </div>
            )}
            <span className="search" onClick={() => setSearchOverlayShow(true)}>
              <img src="/images/png/search.svg" alt="search" />
            </span>
            <div
              className="close"
              onClick={() => {
                handleClose();
              }}
            ></div>
          </div>
          <div
            className={`modal-links-box ${
              searchOverlayShow
                ? "animate__animated animate__fadeOut animate__faster"
                : ""
            }`}
          >
            <div
              className={`${
                activeLink && subMenu && subMenu.length ? "ml-active" : ""
              } modal-left`}
            >
              <ul className="menu-links">{renderMenuLinks()}</ul>
              <ul className="meta-links">{renderMetaLinks()}</ul>
            </div>
            <NestedMenu
              nestedShow={nestedShow}
              label={subMenuLabel}
              subMenu={subMenu}
              handleClose={handleClose}
              subActiveLink={subActiveLink}
              setSubActiveLink={setSubActiveLink}
              thirdNestedShow={thirdNestedShow}
              thirdMenuLabel={thirdMenuLabel}
              thirdMenu={thirdMenu}
              setThirdNestedShow={setThirdNestedShow}
              setThirdMenuLabel={setThirdMenuLabel}
              setThirdMenu={setThirdMenu}
            />
          </div>
        </div>
      </div>
      {searchOverlayShow && (
        <SearchOverlay
          searchOverlayShow={searchOverlayShow}
          hideSearchOverlay={hideSearchOverlay}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

const NestedMenu = ({
  nestedShow,
  label,
  subMenu,
  handleClose,
  subActiveLink,
  thirdNestedShow,
  thirdMenuLabel,
  thirdMenu,
  setSubActiveLink,
  setThirdNestedShow,
  setThirdMenuLabel,
  setThirdMenu,
}) => {
  const handleLinkClick = (link, menu) => {
    setSubActiveLink(link.title);
    setThirdNestedShow(true);
    setThirdMenuLabel(link);
    if (menu && menu.length) {
      setThirdMenu(menu);
    } else {
      setThirdMenu([]);
    }
  };

  return (
    <div
      className={`nested-drawer ${subActiveLink ? "sm-nested-drawer" : ""} ${
        nestedShow ? "" : "hidden"
      }`}
    >
      <AuroraInner />
      <div className="modal-inner">
        <span
          className="br-left"
          data-aos="fade-left"
          data-aos-delay="300"
        ></span>
        {label && !thirdNestedShow ? (
          <h3>
            <Link href={`${label.data.slug}`} onClick={handleClose}>
              {label.title}
            </Link>
          </h3>
        ) : (
          ""
        )}
        <ul className="sub-menu-list">
          {subMenu.map((s) => {
            return (
              <li
                data-aos="fade-left"
                data-aos-delay="300"
                data-aos-offset="-100"
                data-aos-duration="800"
                key={s.title}
              >
                {s.data.doktype !== 3 ? (
                  s.children && s.children.length ? (
                    <div
                      className={`${
                        subActiveLink === s.title ? "active " : ""
                      }${
                        s.data.uid === 140 ||
                        s.data.uid === 23 ||
                        s.data.uid === 128
                          ? "d-none "
                          : ""
                      }menu-link-w-arrow`}
                      onClick={() => handleLinkClick(s, s.children)}
                    >
                      <span className="link-name">{s.title}</span>
                      <span className="icon-in">
                        <img
                          src="/images/png/arrowhead-right-white.svg"
                          alt="Arrow Right"
                          className="none-active"
                        />
                        <img
                          src="/images/png/arrowhead-right-brown.svg"
                          className="hover-active"
                          alt="Arrow Right"
                        />
                      </span>
                    </div>
                  ) : (
                    // <Link href={`${s.data.slug}`} className={`${ s.data.uid === 140 || s.data.uid === 23 || s.data.uid === 128 ? "d-none" : ""}`} onClick={handleClose}>
                    //     {s.title}
                    // </Link>
                    <Link
                      href={`${s.link}`}
                      className={`${
                        s.data.uid === 140 ||
                        s.data.uid === 23 ||
                        s.data.uid === 128
                          ? "d-none"
                          : ""
                      }`}
                      onClick={handleClose}
                    >
                      {s.title}
                    </Link>
                  )
                ) : (
                  <Link
                    href={`${s.link}`}
                    className={`${
                      s.data.uid === 140 ||
                      s.data.uid === 23 ||
                      s.data.uid === 128
                        ? "d-none"
                        : ""
                    }`}
                    onClick={handleClose}
                  >
                    {s.title}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <ThirdNestedMenu
        nestedShow={thirdNestedShow}
        label={thirdMenuLabel}
        subMenu={thirdMenu}
        handleClose={handleClose}
      />
    </div>
  );
};

const ThirdNestedMenu = ({ nestedShow, label, subMenu, handleClose }) => {
  return (
    <div className={`third-nested-drawer ${nestedShow ? "" : "hidden"}`}>
      <AuroraInner />
      <div className="third-modal-inner">
        <span
          className="br-left"
          data-aos="fade-left"
          data-aos-delay="300"
        ></span>
        {label && (
          <h3>
            <Link href={`${label.data.slug}`} onClick={handleClose}>
              {label.title}
            </Link>
          </h3>
        )}
        <ul className="third-sub-menu-list">
          {subMenu.map((s) => {
            return (
              <li
                data-aos="fade-left"
                data-aos-delay="300"
                key={s.title}
                className={`${
                  s.data.uid === 140 || s.data.uid === 23 || s.data.uid === 128
                    ? "d-none"
                    : ""
                }`}
              >
                <Link href={`${s.data.slug}`} onClick={handleClose}>
                  {s.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MainMenuModal;
