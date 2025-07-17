import React, { useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Dropdown } from "react-bootstrap";
import Link from "next/link";
import { triggerRouterChange } from "../../utils/triggerRouteChange";
import GlobalContext from "../../context/GlobalContext";
import AuroraInner from "../Shared/AuroraInner";
import { getRoute } from "../../utils/Routes";
import { useTranslation } from "../i18n/client";

const Footer = ({ pageData }) => {
  const router = useRouter();
  const { t } = useTranslation(router.locale);
  const {
    configuratorData,
    setConfiguratorData,
    socialMedia,
    copyright,
    menuItems,
    enMenuData,
    deMenuData,
  } = useContext(GlobalContext);

  const handleLanguageChange = async (val) => {
    localStorage.setItem("locale", val);
    router.push(
      `${router.asPath}`,
      getRoute({
        lang: val,
        langPages: pageData.data.i18n,
        defaultLocale: router.defaultLocale,
      }),
      {
        locale: val,
      }
    );

    let res;
    if (val === "de") {
      res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}product-configurator`
      );
    } else if (val === "us") {
      res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}product-configurator`
      );
    } else if (val === "it") {
      res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${val}/product-configurator`
      );
    } else if (val === "fr") {
      res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${val}/product-configurator`
      );
    } else {
      res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${val}/product-configurator`
      );
    }

    setConfiguratorData({
      ...configuratorData,
      sendButton: res.data.content.colPos0[0].content.data.send_button,
    });
  };

  return (
    <>
      <footer className="footer-aurora-outer">
        <AuroraInner />
        <div className="footer-container">
          {router.locale === "de" && (
            <ul className="social-links-list">
              {socialMedia.linkedin && (
                <li>
                  <a target="_blank" href={`${socialMedia.linkedin.value}`}>
                    <img src="/images/png/linked-in.svg" alt="linked-in" />
                    <img
                      src="/images/png/linked-in-hover.svg"
                      alt="linked-in"
                      className="social-image-hover"
                    />
                  </a>
                </li>
              )}
              {socialMedia.xing && (
                <li>
                  <a target="_blank" href={`${socialMedia.xing.value}`}>
                    <img src="/images/png/xing.svg" alt="xing" />
                    <img
                      src="/images/png/xing-over.svg"
                      alt="xing"
                      className="social-image-hover"
                    />
                  </a>
                </li>
              )}
              {socialMedia.facebook && (
                <li>
                  <a target="_blank" href={`${socialMedia.facebook.value}`}>
                    <img src="/images/png/facebook.svg" alt="facebook" />
                    <img
                      src="/images/png/facebook-over.svg"
                      alt="facebook"
                      className="social-image-hover"
                    />
                  </a>
                </li>
              )}
              {socialMedia.twitter && (
                <li>
                  <a target="_blank" href={`${socialMedia.twitter.value}`}>
                    <img src="/images/png/youtube.svg" alt="youtube" />
                    <img
                      src="/images/png/youtube-hover.svg"
                      alt="youtube"
                      className="social-image-hover"
                    />
                  </a>
                </li>
              )}
            </ul>
          )}
          {router.locale === "en" && (
            <ul className="social-links-list">
              {socialMedia.linkedin && (
                <li>
                  <a target="_blank" href={`${socialMedia.linkedin.value}`}>
                    <img src="/images/png/linked-in.svg" alt="linked-in" />
                    <img
                      src="/images/png/linked-in-hover.svg"
                      alt="linked-in"
                      className="social-image-hover"
                    />
                  </a>
                </li>
              )}
              {socialMedia.xing && (
                <li>
                  <a target="_blank" href={`${socialMedia.xing.value}`}>
                    <img src="/images/png/xing.svg" alt="xing" />
                    <img
                      src="/images/png/xing-over.svg"
                      alt="xing"
                      className="social-image-hover"
                    />
                  </a>
                </li>
              )}
              {socialMedia.facebook && (
                <li>
                  <a target="_blank" href={`${socialMedia.facebook.value}`}>
                    <img src="/images/png/facebook.svg" alt="facebook" />
                    <img
                      src="/images/png/facebook-over.svg"
                      alt="facebook"
                      className="social-image-hover"
                    />
                  </a>
                </li>
              )}
              {socialMedia.twitter && (
                <li>
                  <a target="_blank" href={`${socialMedia.twitter.value}`}>
                    <img src="/images/png/youtube.svg" alt="youtube" />
                    <img
                      src="/images/png/youtube-hover.svg"
                      alt="youtube"
                      className="social-image-hover"
                    />
                  </a>
                </li>
              )}
            </ul>
          )}
          {router.locale === "us" && (
            <ul className="social-links-list">
              {socialMedia.linkedin && (
                <li>
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/company/cw-bearing-usa-inc-/"
                  >
                    <img src="/images/png/linked-in.svg" alt="linked-in" />
                    <img
                      src="/images/png/linked-in-hover.svg"
                      alt="linked-in"
                      className="social-image-hover"
                    />
                  </a>
                </li>
              )}
              {socialMedia.twitter && (
                <li>
                  <a
                    target="_blank"
                    href="https://www.youtube.com/channel/UC1RLbqOA8dxFJ1dxI0hKpaw"
                  >
                    <img src="/images/png/youtube.svg" alt="youtube" />
                    <img
                      src="/images/png/youtube-hover.svg"
                      alt="youtube"
                      className="social-image-hover"
                    />
                  </a>
                </li>
              )}
            </ul>
          )}
          {router.locale === "it" && (
            <ul className="social-links-list">
              {socialMedia.linkedin && (
                <li>
                  <a target="_blank" href={`${socialMedia.linkedin.value}`}>
                    <img src="/images/png/linked-in.svg" alt="linked-in" />
                    <img
                      src="/images/png/linked-in-hover.svg"
                      alt="linked-in"
                      className="social-image-hover"
                    />
                  </a>
                </li>
              )}
              {socialMedia.xing && (
                <li>
                  <a target="_blank" href={`${socialMedia.xing.value}`}>
                    <img src="/images/png/xing.svg" alt="xing" />
                    <img
                      src="/images/png/xing-over.svg"
                      alt="xing"
                      className="social-image-hover"
                    />
                  </a>
                </li>
              )}
              {socialMedia.facebook && (
                <li>
                  <a target="_blank" href={`${socialMedia.facebook.value}`}>
                    <img src="/images/png/facebook.svg" alt="facebook" />
                    <img
                      src="/images/png/facebook-over.svg"
                      alt="facebook"
                      className="social-image-hover"
                    />
                  </a>
                </li>
              )}
              {socialMedia.twitter && (
                <li>
                  <a target="_blank" href={`${socialMedia.twitter.value}`}>
                    <img src="/images/png/youtube.svg" alt="youtube" />
                    <img
                      src="/images/png/youtube-hover.svg"
                      alt="youtube"
                      className="social-image-hover"
                    />
                  </a>
                </li>
              )}
            </ul>
          )}
          {router.locale === "fr" && (
            <ul className="social-links-list">
              {socialMedia.linkedin && (
                <li>
                  <a target="_blank" href={`${socialMedia.linkedin.value}`}>
                    <img src="/images/png/linked-in.svg" alt="linked-in" />
                    <img
                      src="/images/png/linked-in-hover.svg"
                      alt="linked-in"
                      className="social-image-hover"
                    />
                  </a>
                </li>
              )}
              {socialMedia.xing && (
                <li>
                  <a target="_blank" href={`${socialMedia.xing.value}`}>
                    <img src="/images/png/xing.svg" alt="xing" />
                    <img
                      src="/images/png/xing-over.svg"
                      alt="xing"
                      className="social-image-hover"
                    />
                  </a>
                </li>
              )}
              {socialMedia.facebook && (
                <li>
                  <a target="_blank" href={`${socialMedia.facebook.value}`}>
                    <img src="/images/png/facebook.svg" alt="facebook" />
                    <img
                      src="/images/png/facebook-over.svg"
                      alt="facebook"
                      className="social-image-hover"
                    />
                  </a>
                </li>
              )}
              {socialMedia.twitter && (
                <li>
                  <a target="_blank" href={`${socialMedia.twitter.value}`}>
                    <img src="/images/png/youtube.svg" alt="youtube" />
                    <img
                      src="/images/png/youtube-hover.svg"
                      alt="youtube"
                      className="social-image-hover"
                    />
                  </a>
                </li>
              )}
            </ul>
          )}
          {router.locale === "pl" && (
            <ul className="social-links-list">
              {socialMedia.linkedin && (
                <li>
                  <a target="_blank" href={`${socialMedia.linkedin.value}`}>
                    <img src="/images/png/linked-in.svg" alt="linked-in" />
                    <img
                      src="/images/png/linked-in-hover.svg"
                      alt="linked-in"
                      className="social-image-hover"
                    />
                  </a>
                </li>
              )}
              {socialMedia.xing && (
                <li>
                  <a target="_blank" href={`${socialMedia.xing.value}`}>
                    <img src="/images/png/xing.svg" alt="xing" />
                    <img
                      src="/images/png/xing-over.svg"
                      alt="xing"
                      className="social-image-hover"
                    />
                  </a>
                </li>
              )}
              {socialMedia.facebook && (
                <li>
                  <a target="_blank" href={`${socialMedia.facebook.value}`}>
                    <img src="/images/png/facebook.svg" alt="facebook" />
                    <img
                      src="/images/png/facebook-over.svg"
                      alt="facebook"
                      className="social-image-hover"
                    />
                  </a>
                </li>
              )}
              {socialMedia.twitter && (
                <li>
                  <a target="_blank" href={`${socialMedia.twitter.value}`}>
                    <img src="/images/png/youtube.svg" alt="youtube" />
                    <img
                      src="/images/png/youtube-hover.svg"
                      alt="youtube"
                      className="social-image-hover"
                    />
                  </a>
                </li>
              )}
            </ul>
          )}
          <ul className="main-links">
            {Object.keys(menuItems).length
              ? menuItems.mainNavigation.map((link, id) => (
                  <li key={link + id}>
                    <Link key={`${link.link + id}`} href={`${link.data.slug}`}>
                      {link.title}
                    </Link>
                  </li>
                ))
              : ""}
          </ul>
          <div className="sub-links-wrapper">
            <ul className="sub-links">
              {Object.keys(menuItems).length
                ? menuItems.FooterMenu.map((link, id) => (
                    <li key={link + id}>
                      <Link key={`${link.link + id}`} href={`${link.link}`}>
                        {link.title}
                      </Link>
                    </li>
                  ))
                : ""}
            </ul>
            <ul className="logo-inner">
              <li>
                <Dropdown drop="up">
                  <Dropdown.Toggle id="dropdown-basic">
                    <span className="icon-in">
                      <img src="/images/png/globus.svg" alt="Globus" />
                    </span>

                    {t("data.languageText")}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      // as="span"
                      // onClick={() => handleLanguageChange("de")}
                      as="a"
                      //   href="https://faf-cw-bearing-staging.vercel.app"  //staging
                      // href="http://de.localhost:3000" //local
                      href="https://www.cwbearing.de" //live
                    >
                      <span>DE</span>
                    </Dropdown.Item>
                    <Dropdown.Item
                      // as="span"
                      // onClick={() => handleLanguageChange("en")}
                      as="a"
                      //   href="https://faf-cw-bearing-staging.vercel.app/en" // staging
                      // href="http://de.localhost:3000/en" // local
                      href="https://www.cwbearing.de/en" //live
                    >
                      <span>EN</span>
                    </Dropdown.Item>
                    <Dropdown.Item
                      // as="span"
                      // onClick={() => handleLanguageChange("us")}s
                      as="a"
                      //   href="https://faf-cw-bearing-staging.vercel.app/us"  // staging
                      // href="http://us.localhost:3000" // local
                      href="https://www.cwbearing.com" //live
                    >
                      <span>US</span>
                    </Dropdown.Item>
                    <Dropdown.Item
                      // as="span"
                      // onClick={() => handleLanguageChange("us")}s
                      as="a"
                      //   href="https://faf-cw-bearing-staging.vercel.app/us" // staging
                      // href="http://localhost:3000/it" // local
                      href="https://www.cwbearing.de/it" //live
                    >
                      <span>IT</span>
                    </Dropdown.Item>
                    <Dropdown.Item
                      // as="span"
                      // onClick={() => handleLanguageChange("us")}s
                      as="a"
                      //   href="https://faf-cw-bearing-staging.vercel.app/us" // staging
                      // href="http://localhost:3000/fr" // local
                      href="https://www.cwbearing.de/fr" //live
                    >
                      <span>FR</span>
                    </Dropdown.Item>
                    <Dropdown.Item
                      // as="span"
                      // onClick={() => handleLanguageChange("us")}s
                      as="a"
                      //   href="https://faf-cw-bearing-staging.vercel.app/us" // staging
                      // href="http://localhost:3000/pl" // local
                      href="https://www.cwbearing.de/pl" //live
                    >
                      <span>PL</span>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              {copyright.value && (
                <li>
                  <span className="copyright-text">
                    &#169; {copyright.value}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
