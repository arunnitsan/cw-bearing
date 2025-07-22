import { useEffect } from "react";
import TagManager from "react-gtm-module";
import Layout from "../components/Layout";
import AOS from "aos";
import { GlobalProvider } from "../context/GlobalContext";
import { inter, lato } from "../utils/fonts";
import { appWithTranslation } from 'next-i18next'
import { useRouter } from 'next/router';

// CSS imports for node_modules packages
import "aos/dist/aos.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css/animate.min.css";

// Main SCSS file
import "../scss/main.scss";

const MyApp = ({ Component, pageProps, router }) => {
  const nextRouter = useRouter();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      useClassNames: true,
      initClassName: false,
    });
    TagManager.initialize({ gtmId: "GTM-MFTBM4J" });

    // Force scroll to top on initial load
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }

    // Handle scroll restoration for Next.js
    const handleRouteChangeStart = () => {
      // Store current scroll position
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
      }
    };

    const handleRouteChangeComplete = (url) => {
      // Always reset scroll to top for new pages, regardless of hash
      if (typeof window !== 'undefined') {
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
          window.scrollTo(0, 0);
        });
      }
    };

    // Subscribe to router events
    nextRouter.events.on('routeChangeStart', handleRouteChangeStart);
    nextRouter.events.on('routeChangeComplete', handleRouteChangeComplete);

    // Cleanup
    return () => {
      nextRouter.events.off('routeChangeStart', handleRouteChangeStart);
      nextRouter.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [nextRouter]);

  return (
    <GlobalProvider>
      <div className={`${inter.variable} ${lato.variable}`}>
        <Layout pageContext={{}} pageData={pageProps.pageData}>
          <Component {...pageProps} />
        </Layout>
      </div>
    </GlobalProvider>
  );
};

export default appWithTranslation(MyApp);
