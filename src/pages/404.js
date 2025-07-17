import React, { useContext,useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";
import getAPIData from "../utils/API";
import { isGerman } from "../utils/checkLanguage";
import GlobalContext from "../context/GlobalContext";
// import enData from "../assets/translations/en.json";
// import deData from "../assets/translations/de.json";
// import itData from "../assets/translations/it.json";
// import { useTranslation } from "./i18n/client";
import { useTranslation } from "../components/i18n/client";
import { useRouter } from "next/router";

const Custom404 = ({ pageData, pageMenuItems }) => {

  const router = useRouter();
  const {t} = useTranslation(router.locale);
  const siteLanguage = pageData.data.i18n[0].twoLetterIsoCode;
  const { handleMenuItems, handleCopyright, handleSocialMedia } =
    useContext(GlobalContext);

  // const [configData, setConfigData] = useState(
  //   // siteLanguage === "de" ? deData : enData
  //   siteLanguage === "de" ? deData : siteLanguage === "it" ? itData : enData
  // );

  React.useEffect(() => {
    handleMenuItems(pageMenuItems);
  }, [pageMenuItems]);

  // React.useEffect(() => {
  //   setConfigData(siteLanguage === "de" ? deData : enData);
  // }, [siteLanguage]);

  React.useEffect(() => {
    const ns_seo = pageData.data.page.constants.ns_seo;
    const ns_basetheme = pageData.data.page.constants.ns_basetheme;
    let spreadSocialMedia;
    if (ns_seo && ns_basetheme) {
      spreadSocialMedia = {
        linkedin: ns_seo.seo_linkedin_link,
        facebook: ns_seo.seo_facebook_link,
        xing: ns_seo.seo_xing_link,
        twitter: ns_seo.seo_twitter_link,
      };
    }
    handleCopyright(ns_basetheme.copyright);
    handleSocialMedia({
      ...spreadSocialMedia,
    });
  }, [pageData]);

  return (
    <React.Fragment>
      <Head>
        {siteLanguage && <meta name="language" content={siteLanguage} />}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no, viewport-fit=cover"
        />
        <title>{t('data.pageNotFoundErrMsg')}</title>
        <meta name="theme-color" content="#2012e6" />
        <link
          rel="icon"
          type="image/png"
          href="/images/favicon_package/favicon-16x16.png"
        />
        {/* <script
          async
          type="text/javascript"
          src="https://userlike-cdn-widgets.s3-eu-west-1.amazonaws.com/a805f53a53f8473ea7e06bd768d86504f78b13b43177489396baddf8a99d9ee6.js"
        ></script> */}

        

        <script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="066c2f59-a1cf-4a05-acd8-2424f005a608" type="text/javascript" async></script>


      </Head>
      <div
        className="content-section pt-11 pb-7 pt-lg-30 pb-lg-28 bg-default-6 lg:min-h-vh-100 align-items-center d-flex"
        id="notfound"
      >
        <Container>
          <Row className="justify-content-center notfound">
            <div className="col-xl-6 col-lg-8 col-sm-10">
              <div className="section-title text-center mt-12 mt-lg-20 mb-12 mb-lg-23">
                <div className="notfound-404"></div>
                <h1 className="title mb-6">404</h1>
                <h2>{t('data.pageNotFound')}</h2>
                <p className="gr-text-8 px-lg-7 px-xl-0">
                  {t('data.sorryMsg')}
                </p>
                <Link href="/" className="back-to-home">
                  <img
                    src="/images/png/arrowhead-left-blue.svg"
                    alt="Arrow"
                  />
                  {t('data.backToHomeText')}
                </Link>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export const getStaticProps = async (context) => {
  let pageData = await getAPIData("");

  const menuItems = await getAPIData(
    !isGerman(context.locale) ? `${context.locale}/` : ""
  );

  return {
    props: {
      pageData,
      pageMenuItems: menuItems.data.page,
    },
  };
};

export default Custom404;
