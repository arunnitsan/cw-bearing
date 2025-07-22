import { useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AOSRefresh } from "../utils/AOSRefresh";
import ReactMarkdown from "react-markdown";
import Button from "../components/Core/Button";
import SecondaryButton from "../components/Shared/SecondaryButton";
import GlobalContext from "../context/GlobalContext";
import rehypeRaw from "rehype-raw";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';
// import { useTranslation } from "../pages/i18n/client";
// import { useTranslation } from "../components/i18n/client";

const CTAWithCircle = ({ id, contactVariant, data }) => {
  const { width } = useContext(GlobalContext);
  const router = useRouter();
  const { t } = useTranslation(router.locale);
  return (
    <section
      id={`c${id}`}
      className={`cta-circle-section ${contactVariant ? "contact-variant" : "not-contact-variant"
        }`}
    >
      <span className="circle" data-aos="fade"></span>
      <div className="container">
        <div className="cta-circle-wrapper">
          <div className="headline-wrapper">
            <div className="icon-in desktop-visible" data-aos="fade-right">
              {data.image && data.image.length ? (
                <LazyLoadImage
                  src={`${data.image[0]?.publicUrl ? data.image[0]?.publicUrl : `${process.env.NEXT_PUBLIC_API_URL}${data.image[0]?.properties?.originalUrl}`}`}
                  afterLoad={AOSRefresh}
                  alt={t("data.icon")}
                />
              ) : (
                ""
              )}
            </div>
            {data.headline && <h1 data-aos="fade">{data.headline}</h1>}
          </div>
          <div className="content-wrapper">
            <div className="content">
              {!contactVariant && width < 768 && (
                <span data-aos="fade-right" className="icon-in">
                  {data.image && data.image.length ? (
                    <LazyLoadImage
                      src={`${data.image[0]?.publicUrl ? data.image[0]?.publicUrl : `${process.env.NEXT_PUBLIC_API_URL}${data.image[0]?.properties?.originalUrl}`}`}
                      afterLoad={AOSRefresh}
                      alt={t("data.office")}
                    />
                  ) : (
                    ""
                  )}
                </span>
              )}
              <div data-aos="fade-up">
                {data.text && (
                  <ReactMarkdown children={data.text} rehypePlugins={[rehypeRaw]} components={{ a: Link }} />
                )}
              </div>
              {contactVariant && data.phone?.href ? (
                <Link
                  data-aos="fade-up"
                  href={`tel:${data.phone.href ? data.phone.href : ''}`}
                  className="tel-no"
                >
                  {data.phone.title ? data.phone.title : ''}
                </Link>
              ) : (
                ""
              )}
            </div>
            <div className="btn-wrapper" data-aos="fade-up">

              {width < 768 && contactVariant ? (
                <>

                  {
                    data.list && data.list.length ? (
                      <>
                        {data.list[0].btnlink && data.list[0].btntext && (
                          <SecondaryButton
                            targetBlank={
                              data.list[0].btnlink.href ?
                                data.list[0].btnlink.href.includes('https://') || data.list[0].btnlink.href.includes('http://') || data.list[0].btnlink.href.includes('fileadmin') ?
                                  true :
                                  false
                                :
                                data.list[0].btnlink.includes('https://') || data.list[0].btnlink.includes('http://') || data.list[0].btnlink.includes('fileadmin') ?
                                  true :
                                  false
                            }
                            // diffDomain={data.list[0].btnlink.href ? data.list[0].btnlink.href.includes('fileadmin') ? true : false : data.list[0].btnlink.includes('fileadmin') ? true : false}
                            diffDomain={
                              data.list[0].btnlink.href
                                ?
                                data.list[0].btnlink.href.includes('fileadmin')
                                  ?
                                  data.list[0].btnlink.href.includes('https://') || data.list[0].btnlink.href.includes('http://')
                                    ?
                                    false
                                    :
                                    true
                                  :
                                  false
                                :
                                data.list[0].btnlink.includes('fileadmin')
                                  ?
                                  data.list[0].btnlink.includes('https://') || data.list[0].btnlink.includes('http://')
                                    ?
                                    false
                                    :
                                    false
                                  :
                                  false
                            }
                            link={`${data.list[0].btnlink?.href}`}>
                            {data.list[0].btntext}
                          </SecondaryButton>
                        )}
                      </>
                    ) : ("")
                  }
                </>
              ) : (
                <>
                  {
                    data.list && data.list.length ? (
                      <>
                        {data.list[0].btntext && (
                          <Button
                            targetBlank={
                              data.list[0].btnlink.href ?
                                data.list[0].btnlink.href.includes('https://') || data.list[0].btnlink.href.includes('http://') || data.list[0].btnlink.href.includes('fileadmin') ?
                                  true :
                                  false
                                :
                                data.list[0].btnlink.includes('https://') || data.list[0].btnlink.includes('http://') || data.list[0].btnlink.includes('fileadmin') ?
                                  true :
                                  false
                            }
                            diffDomain={data.list[0].btnlink.href
                              ?
                              data.list[0].btnlink.href.includes('fileadmin')
                                ?
                                data.list[0].btnlink.href.includes('https://') || data.list[0].btnlink.href.includes('http://')
                                  ?
                                  false
                                  :
                                  true
                                :
                                false
                              :
                              data.list[0].btnlink.includes('fileadmin')
                                ?
                                data.list[0].btnlink.includes('https://') || data.list[0].btnlink.includes('http://')
                                  ?
                                  false
                                  :
                                  false
                                :
                                false}
                            link={`${data.list[0].btnlink?.href}`}>
                            {data.list[0].btntext}
                          </Button>
                        )}
                      </>
                    ) : ("")
                  }
                </>
              )}
              {
                data.list && data.list.length && data.list[1] ? (
                  <>
                    {data.list[1].btnlink.href && data.list[1].btntext && (
                      <SecondaryButton
                        targetBlank={data.list[1].btnlink.href.includes('https://') || data.list[1].btnlink.href.includes('http://') || data.list[1].btnlink.href.includes('fileadmin') ? true : false}
                        diffDomain={data.list[1].btnlink.href
                          ?
                          data.list[1].btnlink.href.includes('fileadmin')
                            ?
                            data.list[1].btnlink.href.includes('https://') || data.list[1].btnlink.href.includes('http://')
                              ?
                              false
                              :
                              true
                            :
                            false
                          :
                          data.list[1].btnlink.includes('fileadmin')
                            ?
                            data.list[1].btnlink.includes('https://') || data.list[1].btnlink.includes('http://')
                              ?
                              false
                              :
                              false
                            :
                            false}
                        link={`${data.list[1].btnlink.href}`}>
                        {data.list[1].btntext}
                      </SecondaryButton>
                    )}
                  </>
                ) : ("")
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

CTAWithCircle.defaultProps = {
  contactVariant: false,
};

export default CTAWithCircle;
