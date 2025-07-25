import { useEffect } from "react";
import TagManager from "react-gtm-module";
import Layout from "../components/Layout";
import AOS from "aos";
import { GlobalProvider } from "../context/GlobalContext";
import { inter, lato } from "../utils/fonts";
import { appWithTranslation } from 'next-i18next'
import { hasHeaderBig } from "../utils/ContentType";

// CSS imports for node_modules packages
import "aos/dist/aos.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css/animate.min.css";

// Main SCSS file
import "../scss/main.scss";

const MyApp = ({ Component, pageProps, router }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      useClassNames: true,
      initClassName: false,
    });
    TagManager.initialize({ gtmId: "GTM-MFTBM4J" });
  }, []);

  // Detect if HeaderBig exists in page content for initial state
  const initialIsBigHeader = pageProps.pageData?.data?.content?.colPos0
    ? hasHeaderBig(pageProps.pageData.data.content.colPos0)
    : false;

  return (
    <GlobalProvider initialIsBigHeader={initialIsBigHeader}>
      <div className={`${inter.variable} ${lato.variable}`}>
        <Layout pageContext={{}} pageData={pageProps.pageData}>
          <Component {...pageProps} />
        </Layout>
      </div>
    </GlobalProvider>
  );
};

export default appWithTranslation(MyApp);
