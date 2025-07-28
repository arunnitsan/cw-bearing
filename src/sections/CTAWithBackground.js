import React, { useEffect, useContext } from "react";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";
import Button from "../components/Core/Button";
import GlobalContext from "../context/GlobalContext";
import rehypeRaw from "rehype-raw";
import Link from "next/link";
// import { identical } from "ramda";

const CTAWithBackground = ({ id, data }) => {
  const router = useRouter();

  const { width, handleCTAWithBG, handleConfigurator, configurator } =
    useContext(GlobalContext);

  useEffect(() => {
    // Check for products page in any locale
    const pathWithoutLocale = router.asPath.replace(/^\/[a-z]{2}\//, '/');
    if (pathWithoutLocale === "/products") {
      handleCTAWithBG(data);
    }
  }, [router.asPath]);

  return (
    <section id={`c${id}`} className="cta-background-section">
      {width > 767 ? (
        <>
          {data.image ? (
            <span
              className="cta-bg container-md"
              style={{
                backgroundImage: `url(${data.image[0]?.publicUrl ? data.image[0]?.publicUrl : `${process.env.NEXT_PUBLIC_API_URL}${data.image[0]?.properties?.originalUrl}`})`,
              }}
            ></span>
          ) : (
            ""
          )}
        </>
      ) : (
        <>
          {data.media && data.media.length ? (
            <span
              className="cta-bg"
              style={{
                backgroundImage: `url(${data.media[0]?.publicUrl ? data.media[0]?.publicUrl : `${process.env.NEXT_PUBLIC_API_URL}${data.media[0]?.properties?.originalUrl}`})`,
              }}
            ></span>
          ) : (<></>)}
        </>
      )}
      <div className="container-md">
        <div className="cta-background-wrapper">
          {data.headline && <h1>{data.headline}</h1>}
          <div className="cta-content">
            <div data-aos="fade-up">
              {data.text && (
                <ReactMarkdown rehypePlugins={[rehypeRaw]} components={{ a: Link }}>
                  {data.text}
                </ReactMarkdown>
              )}
            </div>
            <div className="btn-wrapper" data-aos="fade-up">
              {data.list && data.list.length ? (
                <>
                  {data.list.map((btn,id) => (
                    <React.Fragment key={btn.btntext}>
                      {btn.btntext && (
                        <>
                          {btn.btnlink.href==="#variant1" || btn.btnlink.href === "#variant2" ? (
                            <Button onClick={() => {
                              handleConfigurator({...configurator, isVisible:true, data:{step:btn.btnlink.href === "#variant1" ? 1 : 3},});
                            }}>
                              {btn.btntext}
                            </Button>
                          ) : (<Button link={btn.btnlink.href}>{btn.btntext}</Button>)}
                        </>
                      )}
                    </React.Fragment>
                  ))}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAWithBackground;
