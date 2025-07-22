import React, { useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Script from "next/script";
import Head from "next/head";
import { Container, Row } from "react-bootstrap";
import Routes, { getRoute } from "../utils/Routes";
import getAPIData from "../utils/API";
import smoothScroll, { cleanupSmoothScroll } from "../utils/smoothScroll";
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
  if (pageData && !pageData.error && pageData.data && pageData.data.i18n && pageData.data.i18n.length > 0) {
    siteLanguage = pageData.data.i18n[0].twoLetterIsoCode;
    pageTitle = pageData.data.page?.title;
    generalMetaDescription =
      pageData.data.page?.constants?.ns_seo?.seo_meta_description?.value;
    generalMetaKeywords =
      pageData.data.page?.constants?.ns_seo?.seo_meta_keywords?.value;
    ogImage = pageData.data?.meta?.ogImage?.publicUrl;
    twitterImage = pageData.data?.meta?.twitterImage?.publicUrl;
    twitterTitle = pageData.data?.meta?.twitterTitle;
    twitterDescription = pageData?.data?.meta?.twitterDescription;
    ogDescription = pageData.data?.meta?.ogDescription;
  }

  // Disable all scroll behavior for now to prevent unwanted scrolling
  // const handleSmoothScroll = useCallback(() => {
  //   // Only initialize smooth scroll for same-page navigation
  //   // Don't run on initial page load or cross-page navigation
  //   if (typeof window !== 'undefined' && window.location.hash) {
  //     setTimeout(() => {
  //       smoothScroll();
  //     }, 1500);
  //   }
  // }, []);

  // useEffect(() => {
  //   // Only run smooth scroll if there's a hash in the URL
  //   if (router.asPath.includes('#')) {
  //     handleSmoothScroll();
  //   }

  //   // Cleanup function to remove event listeners when component unmounts
  //   return () => {
  //     cleanupSmoothScroll();
  //   };
  // }, [handleSmoothScroll, router.asPath]);

  // Memoize the configurator data fetch
  const fetchConfiguratorData = useCallback(async () => {
    try {
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

      if (res.data?.content?.colPos0?.[0]?.content?.data?.send_button) {
        setConfiguratorData(prevData => ({
          ...prevData,
          sendButton: res.data.content.colPos0[0].content.data.send_button,
        }));
      }
    } catch (error) {
      console.error('Error fetching configurator data:', error);
    }
  }, [router.locale, setConfiguratorData]);

  useEffect(() => {
    fetchConfiguratorData();
  }, [fetchConfiguratorData]);

  // Memoize the click handler
  const handleClick = useCallback((event) => {
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
  }, [configurator, handleConfigurator]);

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [handleClick]);

  // Handle SEO and social media data
  useEffect(() => {
    if (!pageData || pageData.error || !pageData.data?.page?.constants) return;

    const ns_seo = pageData.data.page.constants.ns_seo;
    const ns_basetheme = pageData.data.page.constants.ns_basetheme;

    if (ns_seo) {
      const spreadSocialMedia = {
        linkedin: ns_seo.seo_linkedin_link,
        facebook: ns_seo.seo_facebook_link,
        xing: ns_seo.seo_xing_link,
        twitter: ns_seo.seo_twitter_link,
      };
      handleSocialMedia(spreadSocialMedia);
    }

    if (ns_basetheme?.copyright) {
      handleCopyright(ns_basetheme.copyright);
    }
  }, [pageData, handleSocialMedia, handleCopyright]);

  // Handle scroll to element - only for hash fragments
  // Disabled to prevent unwanted scrolling
  // const scrollToEl = useCallback(() => {
  //   const target = router.asPath.split("#")[1];
  //   if (!target) return;

  //   const targetEl = document.getElementById(target);
  //   if (!targetEl) return;

  //   // Only scroll if the element is not already in view
  //   const rect = targetEl.getBoundingClientRect();
  //   const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;

  //   if (isInView) return;

  //   const offsetTop = window.pageYOffset + rect.top;
  //   scroll({
  //     top: offsetTop,
  //     behavior: "smooth",
  //   });
  // }, [router.asPath]);

  // useEffect(() => {
  //   if (!pageData) return;

  //   // Only set up the interval if there's a hash fragment
  //   const target = router.asPath.split("#")[1];
  //   if (!target) return;

  //   // Additional check: only proceed if the target starts with 'c' (content sections)
  //   if (!/^c/.test(target)) return;

  //   let timer = setInterval(scrollToEl, 500);

  //   const cleanup = setTimeout(() => {
  //     if (timer) {
  //       clearInterval(timer);
  //     }
  //   }, 3000);

  //   return () => {
  //     if (timer) clearInterval(timer);
  //     clearTimeout(cleanup);
  //   };
  // }, [pageData, scrollToEl]);

  // Handle menu data updates
  useEffect(() => {
    if (pageMenuItems) {
      handleMenuItems(pageMenuItems);
    }
  }, [pageMenuItems, handleMenuItems]);

  // Handle site data updates separately to prevent unnecessary re-renders
  useEffect(() => {
    if (siteEnData) setEnMenuData(siteEnData);
  }, [siteEnData, setEnMenuData]);

  useEffect(() => {
    if (siteDeData) setDeMenuData(siteDeData);
  }, [siteDeData, setDeMenuData]);

  useEffect(() => {
    if (siteUsData) setUsMenuData(siteUsData);
  }, [siteUsData, setUsMenuData]);

  useEffect(() => {
    if (siteItData) setItMenuData(siteItData);
  }, [siteItData, setItMenuData]);

  useEffect(() => {
    if (siteFrData) setFrMenuData(siteFrData);
  }, [siteFrData, setFrMenuData]);

  useEffect(() => {
    if (sitePlData) setPlMenuData(sitePlData);
  }, [sitePlData, setPlMenuData]);

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
          <title>{pageTitle ? `${pageTitle} | CW Bearing` : 'CW Bearing'}</title>
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
            pageData.data &&
            pageData.data.content &&
            pageData.data.content.colPos0 &&
            Array.isArray(pageData.data.content.colPos0) &&
            pageData.data.content.colPos0.length > 0 ? (
              <ContentType pageContentProps={pageData.data.content.colPos0} />
            ) : (
              <div className="content-section pt-11 pb-7 pt-lg-30 pb-lg-28 bg-default-6">
                <Container>
                  <Row className="justify-content-center">
                    <div className="col-xl-6 col-lg-8 col-sm-10">
                      <div className="section-title text-center mt-12 mt-lg-20 mb-12 mb-lg-23">
                        <h2>No Content Available</h2>
                        <p className="gr-text-8 px-lg-7 px-xl-0">
                          This page has no content to display.
                        </p>
                      </div>
                    </div>
                  </Row>
                </Container>
              </div>
            )}
          </main>
        )}

        {configurator.isVisible && <Configurator />}

        {successModal && <SuccessModal />}
      </PageWrapper>




        {process.env.NODE_ENV === 'production' && (
          <Script
            id="Cookiebot"
            src="https://consent.cookiebot.com/uc.js"
            data-cbid="066c2f59-a1cf-4a05-acd8-2424f005a608"
            type="text/javascript"
            async
            strategy="afterInteractive"
          />
        )}
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

    // Prevent certain paths from being treated as pages (like API endpoints)
    if (paramSlug && paramSlug.length === 1 && paramSlug[0] === 'typo3') {
      return {
        notFound: true,
      };
    }

    let pageData;
    try {
      var newsData = await getAPIData("news/detail/" + paramSlug, isDraftMode);
      if (!newsData.error) {
        pageData = newsData;
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
        pageData = await getAPIData(url, isDraftMode);
      }
    } catch (apiError) {
      console.error(`API Error for locale ${context.locale}:`, apiError);
      // Return notFound instead of crashing
      return {
        notFound: true,
      };
    }

    // If pageData has an error, return notFound to trigger 404
    if (pageData && pageData.error) {
      return {
        notFound: true,
      };
    }

    // Only fetch menu data for current locale to reduce payload
    let menuItems;
    try {
      menuItems = await getAPIData(
        !isGerman(context.locale) ? `${context.locale}/` : "",
        isDraftMode
      );
    } catch (menuError) {
      console.error(`Menu API Error for locale ${context.locale}:`, menuError);
      menuItems = { data: { page: {} } };
    }

    // For draft mode, fetch all languages. For production, only fetch current locale
    let enData, usData, deData, itData, frData, plData;

    if (isDraftMode) {
      // Draft mode: fetch all languages for complete preview
      try {
        [enData, usData, deData, itData, frData, plData] = await Promise.all([
          getAPIData("en", isDraftMode),
          getAPIData("us", isDraftMode),
          getAPIData("", isDraftMode),
          getAPIData("it", isDraftMode),
          getAPIData("fr", isDraftMode),
          getAPIData("pl", isDraftMode)
        ]);
      } catch (draftError) {
        console.error('Draft mode API error:', draftError);
        // Set fallback data
        enData = usData = deData = itData = frData = plData = { data: { page: {} } };
      }
    } else {
      // Production: only fetch current locale and default
      const currentLocale = context.locale;
      const defaultLocale = "de";

      try {
        if (currentLocale === defaultLocale) {
          deData = await getAPIData("", isDraftMode);
          enData = usData = itData = frData = plData = { data: { page: {} } };
        } else {
          const [currentData, defaultData] = await Promise.all([
            getAPIData(currentLocale, isDraftMode),
            getAPIData(defaultLocale === "de" ? "" : defaultLocale, isDraftMode)
          ]);

          // Assign based on current locale
          if (currentLocale === "en") enData = currentData;
          else if (currentLocale === "us") usData = currentData;
          else if (currentLocale === "it") itData = currentData;
          else if (currentLocale === "fr") frData = currentData;
          else if (currentLocale === "pl") plData = currentData;

          deData = defaultData;

          // Set others to empty
          enData = enData || { data: { page: {} } };
          usData = usData || { data: { page: {} } };
          itData = itData || { data: { page: {} } };
          frData = frData || { data: { page: {} } };
          plData = plData || { data: { page: {} } };
        }
      } catch (productionError) {
        console.error(`Production API error for locale ${currentLocale}:`, productionError);
        // Set fallback data
        enData = usData = deData = itData = frData = plData = { data: { page: {} } };
      }
    }

    return {
      props: {
        pageData,
        pageMenuItems: menuItems?.data?.page || {},
        siteEnData: enData?.data?.page || {},
        siteUsData: usData?.data?.page || {},
        siteDeData: deData?.data?.page || {},
        siteItData: itData?.data?.page || {},
        siteFrData: frData?.data?.page || {},
        sitePlData: plData?.data?.page || {},
      },
      // Enable ISR - faster revalidation for draft mode, slower for production
      revalidate: isDraftMode ? 10 : 60, // 10 seconds for draft, 60 for production
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
