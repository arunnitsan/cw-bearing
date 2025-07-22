import React, { useContext,useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";
import getAPIData from "../utils/API";
import { isGerman } from "../utils/checkLanguage";
import GlobalContext from "../context/GlobalContext";
import { useTranslation } from "../components/i18n/client";
import { useRouter } from "next/router";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Custom404 = ({ pageData, pageMenuItems }) => {

  const router = useRouter();
  const {t} = useTranslation(router.locale);

  // Add error handling for missing pageData
  const siteLanguage = pageData?.data?.i18n?.[0]?.twoLetterIsoCode || 'en';
  const { handleMenuItems, handleCopyright, handleSocialMedia } =
    useContext(GlobalContext);

  React.useEffect(() => {
    if (pageMenuItems) {
      handleMenuItems(pageMenuItems);
    }
  }, [pageMenuItems]);

  React.useEffect(() => {
    // Add error handling for missing page data
    if (!pageData?.data?.page?.constants) {
      console.warn('404 page: Missing page data or constants');
      return;
    }

    try {
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
    } catch (error) {
      console.error('404 page: Error processing page data:', error);
    }
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
  try {
    // Only fetch minimal data for 404 page to reduce bundle size
    const locale = context.locale || 'de';

    // Fetch only essential data
    const [pageData, menuItems] = await Promise.all([
      getAPIData("").catch(() => ({ data: { i18n: [{ twoLetterIsoCode: locale }] } })),
      getAPIData(!isGerman(locale) ? `${locale}/` : "").catch(() => ({ data: { page: {} } }))
    ]);

    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        pageData: pageData || { data: { i18n: [{ twoLetterIsoCode: locale }] } },
        pageMenuItems: menuItems?.data?.page || null,
      },
      // Reduce revalidation time for 404 page
      revalidate: 3600, // 1 hour
    };
  } catch (error) {
    console.error('404 getStaticProps: Error fetching data:', error);

    // Return minimal fallback props if API fails
    return {
      props: {
        ...(await serverSideTranslations(context.locale || 'de', ['common'])),
        pageData: { data: { i18n: [{ twoLetterIsoCode: context.locale || 'de' }] } },
        pageMenuItems: null,
      },
      revalidate: 3600,
    };
  }
};

export default Custom404;
