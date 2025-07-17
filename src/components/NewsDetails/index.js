import ReactMarkdown from "react-markdown";
import Slider from "react-slick";
import { useRouter } from "next/router";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import fileDownload from "js-file-download";
import Link from "next/link";
import { convertDateToNum } from "../../utils/date";
import MoreLink from "../Shared/MoreLink";
import rehypeRaw from "rehype-raw";
// import { useTranslation } from "../../pages/i18n/client";
import { useTranslation } from "../i18n/client";

const NewsDetails = ({ data }) => {
  const router = useRouter();
  const {t} = useTranslation(router.locale);
  var settings = {
    dots: true,
    controls: false,
    infinite: true,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };

  return (
    <section className="news-details-section">
      <div className="news-details-banner gray-gradient dark-btm-right-shape">
        <div className="container-sm">
          <div className="news-details-banner-content">
            {data.datetime ? (
              <span className="date" data-aos="fade">
                {convertDateToNum(data.datetime)}
              </span>
            ) : (
              ""
            )}
            {data.title && <h1 data-aos="fade">{data.title}</h1>}
            {data.bodytext && (
              <div data-aos="fade-up">
                <ReactMarkdown children={data.teaser} rehypePlugins={[rehypeRaw]} components={{ a: Link }}/>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="news-details-box">
        <div className="container-sm">
          {data.media ? (
            <>
              {data.media.length > 1 ? (
                <Slider {...settings}>
                  {data.media.map((m, id) => (
                    <div className="news-img-wrapper" data-aos="fade-up">
                      <div className="news-img-in">
                        <img src={m.images.defaultImage.publicUrl} alt="News" />
                      </div>
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="news-img-in single-image" data-aos="fade-up">
                  <img
                    src={data.media[0].images.defaultImage.publicUrl}
                    alt="News"
                  />
                </div>
              )}
            </>
          ) : (
            ""
          )}
          <div className="news-details-content" data-aos="fade-up">
            <ReactMarkdown children={data.bodytext} rehypePlugins={[rehypeRaw]} components={{ a: Link }}/>
          </div>
          <Row
            className={`${(data.falRelatedLinks && data.falRelatedLinks.length) ||
              (data.falRelatedFiles &&
                data.falRelatedFiles.length &&
                data.falRelatedFiles[0].properties)
              ? "news-cta-row"
              : ""
              }`}
          >
            {data.falRelatedLinks && data.falRelatedLinks.length ? (
              <Col sm={12} md={6}>
                <div className="links-wrapper">
                  <h3 data-aos="fade-up">
                      {t('data.relatedLinks')}
                  </h3>
                  {data.falRelatedLinks.map((fafRelatedLink, id) => {
                    return (
                      <MoreLink
                        link={fafRelatedLink.uri}
                        key={fafRelatedLink.uri}
                        targetBlank={fafRelatedLink.uri.includes('https://') || fafRelatedLink.uri.includes('http://') || fafRelatedLink.uri.includes('fileadmin') ? true : false}
                        diffDomain={fafRelatedLink.uri.includes('fileadmin') ? true : false}
                        data-aos="fade-up"
                      >
                        {fafRelatedLink.title}
                      </MoreLink>
                    );
                  })}
                </div>
              </Col>
            ) : (
              ""
            )}

            {data.falRelatedFiles &&
              data.falRelatedFiles.length &&
              data.falRelatedFiles[0].properties ? (
              <Col sm={12} md={6}>
                <div className="download-wrapper">
                  <h3 data-aos="fade-up">Downloads</h3>
                  <button
                    data-aos="fade-up"
                    onClick={() => {
                      axios
                        .get(data.falRelatedFiles[0].properties.publicUrl, {
                          responseType: "blob",
                        })
                        .then((res) => {
                          fileDownload(
                            res.data,
                            data.falRelatedFiles[0].properties.name
                          );
                        });
                    }}
                    className="btn btn-download"
                  >
                    {t('data.downloadText')}
                  </button>
                </div>
              </Col>
            ) : (
              ""
            )}
          </Row>
          <div className="back-to-news-link">
            <Link href="/news" className="back-link">
              <span>
                <img src="/images/png/arrow-left-lightblue.svg" alt="Back" />
              </span>
              {t('data.backToOverviewText')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsDetails;
