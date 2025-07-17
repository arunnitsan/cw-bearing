import React, { useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Script from "next/script";
import Head from "next/head";
import { Container, Row } from "react-bootstrap";
import Routes, { getRoute } from "../utils/Routes";
import getAPIData from "../utils/API";
import smoothScroll from "../utils/smoothScroll";
import { isGerman } from "../utils/checkLanguage";
import ContentType from "../utils/ContentType";
import PageWrapper from "../components/PageWrapper";
import GlobalContext from "../context/GlobalContext";
import Configurator from "../components/Configurator";
import SuccessModal from "../components/SuccessModal/SuccessModal";
import DraftModeBanner from "../components/DraftModeBanner";
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// import useTranslation from 'next-i18next';

const Page = ({
  pageData,
  pageMenuItems,
  siteEnData,
  siteDeData,
  siteUsData,
  siteItData,
  siteFrData,
  sitePlData,
}) => {
  const router = useRouter();
  const {
    configurator,
    handleConfigurator,
    configuratorData,
    setConfiguratorData,
    successModal,
    handleMenuItems,
    handleCopyright,
    handleSocialMedia,
    setDeMenuData,
    setEnMenuData,
    setUsMenuData,
    setItMenuData,
    setFrMenuData,
    setPlMenuData,
  } = useContext(GlobalContext);
  let siteLanguage,
    pageTitle,
    generalMetaDescription,
    generalMetaKeywords,
    ogImage,
    twitterImage,
    twitterTitle,
    twitterDescription,
    ogDescription;
  if (pageData && !pageData.error) {
    siteLanguage = pageData.data.i18n[0].twoLetterIsoCode;
    pageTitle = pageData.data.page.title;
    generalMetaDescription =
      pageData.data.page.constants.ns_seo.seo_meta_description.value;
    generalMetaKeywords =
      pageData.data.page.constants.ns_seo.seo_meta_keywords.value;
    ogImage = pageData.data?.meta?.ogImage?.publicUrl;
    twitterImage = pageData.data?.meta.twitterImage?.publicUrl;
    twitterTitle = pageData.data?.meta?.twitterTitle;
    twitterDescription = pageData?.data?.meta?.twitterDescription;
    ogDescription = pageData.data?.meta?.ogDescription;
  }

  useEffect(() => {
    setTimeout(() => {
      smoothScroll();
    }, 1500);
  });

  useEffect(() => {
    (async function () {
      let res;
      if (router.locale === "de") {
        res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}product-configurator`
        );
      } else {
        res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}${router.locale}/product-configurator`
        );
      }
      setConfiguratorData({
        ...configuratorData,
        sendButton: res.data.content?.colPos0[0].content.data.send_button,
      });
    })();

    if (typeof window !== "undefined") {
      const language =
        window.navigator.userLanguage || window.navigator.language;
      // if (localStorage.getItem("locale")) {
      //   if (localStorage.getItem("locale") === router.locale) return;
      //   router.push(
      //     `${router.asPath}`,
      //     getRoute({
      //       lang: localStorage.getItem("locale"),
      //       langPages: pageData.data.languages,
      //       defaultLocale: "de",
      //     }),
      //     {
      //       locale: localStorage.getItem("locale"),
      //     }
      //   );
      // } else if (router.locale === language) {
      //   return;
      // } else if (router.locale !== language) {
      //   if (isGerman(language)) {
      //     router.push(
      //       `${router.asPath}`,
      //       getRoute({
      //         lang: "de",
      //         langPages: pageData.data.languages,
      //         defaultLocale: "de",
      //       }),
      //       {
      //         locale: "de",
      //       }
      //     );
      //   } else {
      //     router.push(
      //       `${router.asPath}`,
      //       getRoute({
      //         lang: "en",
      //         langPages: pageData.data.languages,
      //         defaultLocale: "de",
      //       }),
      //       {
      //         locale: "en",
      //       }
      //     );
      //   }
      // }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("click", (event) => {
      if (event.target.tagName.toLowerCase() === "a") {
        let href = event.target.href;
        if (href.includes("variant1") || href.includes("variant2")) {
          event.preventDefault();
          handleConfigurator({
            ...configurator,
            isVisible: true,
            data: {
              step: href.includes("#variant1") ? 1 : 3,
            },
          });
        }
      }
    });
  }, []);

  useEffect(() => {
    if (pageData && pageData.error) return;
    const ns_seo = pageData.data.page.constants.ns_seo;
    const ns_basetheme = pageData.data.page.constants.ns_basetheme;
    let spreadSocialMedia;
    if (ns_seo) {
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
  }, []);

  useEffect(() => {
    let timer = setInterval(scrollToEl, 500);

    function scrollToEl() {
      const target = router.asPath.split("#")[1];
      const targetEl = document.getElementById(`${target}`);
      if (!targetEl) return;
      const offsetTop =
        window.pageYOffset + targetEl.getBoundingClientRect().top;
      scroll({
        top: offsetTop,
        behavior: "smooth",
      });
      clearInterval(timer);
    }

    setTimeout(() => {
      timer && clearInterval(timer);
    }, 3000);
  }, [pageData]);

  useEffect(() => {
    setEnMenuData(siteEnData);
    setDeMenuData(siteDeData);
    setUsMenuData(siteUsData);
    setItMenuData(siteItData);
    setFrMenuData(siteFrData);
    setPlMenuData(sitePlData);
    handleMenuItems(pageMenuItems);
  }, [pageMenuItems]);

  return (
    <>
      <DraftModeBanner />
      <PageWrapper>
        <Head>
          {siteLanguage && <meta name="language" content={siteLanguage} />}
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="format-detection" content="telephone=no" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no, viewport-fit=cover"
          />
          {generalMetaDescription && (
            <meta name="description" content={generalMetaDescription} />
          )}
          {generalMetaKeywords && (
            <meta name="keywords" content={generalMetaKeywords} />
          )}
          <title>{pageTitle && `${pageTitle} | `} CW Bearing</title>
          <meta name="theme-color" content="#2012e6" />
          <link
            rel="icon"
            type="image/png"
            href="/images/favicon_package/favicon-16x16.png"
          />
          {ogDescription && (
            <meta property="og:description" content={ogDescription}></meta>
          )}
          {ogImage && <meta property="og:image" content={ogImage}></meta>}
          {ogImage && <meta property="og:image:width" content="800"></meta>}
          {ogImage && <meta property="og:image:height" content="600"></meta>}
          <meta property="og:type" content="website"></meta>
          <meta name="twitter:card" content="summary_large_image"></meta>
          {twitterTitle && (
            <meta name="twitter:title" content={twitterTitle}></meta>
          )}
          {twitterDescription && (
            <meta
              name="twitter:description"
              content={twitterDescription}
            ></meta>
          )}
          {twitterImage && (
            <meta name="twitter:image" content={twitterImage}></meta>
          )}

          {/* {router.locale === "de" && (
            <script
              async
              type="text/javascript"
              src="https://userlike-cdn-widgets.s3-eu-west-1.amazonaws.com/a805f53a53f8473ea7e06bd768d86504f78b13b43177489396baddf8a99d9ee6.js"
            ></script>
          )}
          {router.locale === "en" && (
            <script
              async
              type="text/javascript"
              src="https://userlike-cdn-widgets.s3-eu-west-1.amazonaws.com/a805f53a53f8473ea7e06bd768d86504f78b13b43177489396baddf8a99d9ee6.js"
            ></script>
          )} */}

          {/* <script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="066c2f59-a1cf-4a05-acd8-2424f005a608" type="text/javascript" async></script> */}

          {/* <script type="text/plain" data-cookieconsent="marketing" async src="https://userlike-cdn-widgets.s3-eu-west-1.amazonaws.com/a805f53a53f8473ea7e06bd768d86504f78b13b43177489396baddf8a99d9ee6.js"></script> */}
        </Head>
        {!pageData && <div>Loading...</div>}

        {pageData && pageData.error && (
          <div
            className="content-section pt-11 pb-7 pt-lg-30 pb-lg-28 bg-default-6"
            id="notfound"
          >
            <Container>
              <Row className="justify-content-center notfound">
                <div className="col-xl-6 col-lg-8 col-sm-10">
                  <div className="section-title text-center mt-12 mt-lg-20 mb-12 mb-lg-23">
                    <div className="notfound-404"></div>
                    <h1 className="title mb-6">500</h1>
                    <h2>Oops! Server Not Connected</h2>
                    <p className="gr-text-8 px-lg-7 px-xl-0">
                      Error: Not able to connect your TYPO3 CMS!
                    </p>
                  </div>
                </div>
              </Row>
            </Container>
          </div>
        )}

        {pageData && !pageData.error && (
          <main>
            {pageData &&
            Object.values(pageData.data.content).length &&
            pageData.data &&
            pageData.data.content.colPos0 ? (
              <ContentType pageContentProps={pageData.data.content.colPos0} />
            ) : (
              <></>
            )}
          </main>
        )}

        {configurator.isVisible && <Configurator />}

        {successModal && <SuccessModal />}
      </PageWrapper>




        <Script
        id="Cookiebot"
        src="https://consent.cookiebot.com/uc.js"
        data-cbid="066c2f59-a1cf-4a05-acd8-2424f005a608"
        type="text/javascript"
        async
      ></Script>
      <Script
        type="text/plain"
        data-cookieconsent="marketing"
        async
        src="https://userlike-cdn-widgets.s3-eu-west-1.amazonaws.com/a805f53a53f8473ea7e06bd768d86504f78b13b43177489396baddf8a99d9ee6.js"
      ></Script>
    </>
  );
};

export const getStaticPaths = async (context) => {
  const paths = await Routes();
  return {
    paths: paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async (context) => {
  try {
    // Check if draft mode is enabled via query parameter
    const isDraftMode = context.preview || context.draftMode ||
                       (context.params && context.params.draft === 'true');

    const paramSlug = context.params.slug;
    var newsData = await getAPIData("news/detail/" + paramSlug, isDraftMode);
    if (!newsData.error) {
      var pageData = newsData;
    } else {
      var slug;
      if (paramSlug && paramSlug.length > 2) {
        slug = paramSlug.toString().replace(/,/g, "/");
      } else if (paramSlug && paramSlug.length > 1) {
        slug = paramSlug.toString().replace(",", "/");
      } else if (!paramSlug) {
        slug = "";
      } else {
        slug = paramSlug[0];
      }
      const url = !isGerman(context.locale) ? `${context.locale}/${slug}` : slug;
      var pageData = await getAPIData(url, isDraftMode);
    }

    // If pageData has an error, return notFound to trigger 404
    if (pageData && pageData.error) {
      return {
        notFound: true,
      };
    }

    const menuItems = await getAPIData(
      !isGerman(context.locale) ? `${context.locale}/` : "",
      isDraftMode
    );
    const enData = await getAPIData("en", isDraftMode);
    const usData = await getAPIData("us", isDraftMode);
    const deData = await getAPIData("", isDraftMode);
    const itData = await getAPIData("it", isDraftMode);
    const frData = await getAPIData("fr", isDraftMode);
    const plData = await getAPIData("pl", isDraftMode);

    return {
      props: {
        pageData,
        pageMenuItems: menuItems.data.page,
        siteEnData: enData.data.page,
        siteUsData: usData.data.page,
        siteDeData: deData.data.page,
        siteItData: itData.data.page,
        siteFrData: frData.data.page,
        sitePlData: plData.data.page,
      },
      // Enable ISR - revalidate every 60 seconds (1 minute)
      revalidate: 60,
    };
  } catch (error) {
    // If any error occurs during data fetching, return notFound
    console.error('Error in getStaticProps:', error);
    return {
      notFound: true,
    };
  }
};

export default Page;
