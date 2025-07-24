import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AOSRefresh } from "../utils/AOSRefresh";
import { Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import GlobalContext from "../context/GlobalContext";
import { convertDateToNum } from "../utils/date";
import NextArrow from "../components/SliderArrows/NextArrow";
import PrevArrow from "../components/SliderArrows/PrevArrow";
import Button from "../components/Core/Button";
import NewsDetails from "../components/NewsDetails";
// import enData from "../assets/translations/en.json";
// import deData from "../assets/translations/de.json";
// import itData from "../assets/translations/it.json";
// import { useTranslation } from "../pages/i18n/client";
import { useTranslation } from "../components/i18n/client";

const renderSlides = (list, readMore) => {
  const [mouseMoved, setMouseMoved] = useState(false);
  const { width, setWidth } = useContext(GlobalContext);
  const router = useRouter();
  const {t} = useTranslation(router.locale);
  // const [configData, setConfigData] = useState(
  //   // router.locale === "de" ? deData : enData
  //   router.locale === "de" ? deData : router.locale === "it" ? itData : enData
  // );
  
  return list.map((news, id) => {
    const handleClick = (e) => {
      if (!mouseMoved) {
        router.push(`news/${news.pathSegment}`);
      }
    };
    return (
      <div className="news-teaser-slide" key={news.uid}>
        <div className="news-teaser-slide-overlay">
          <div className="news-teaser-slide-inner">
            <div className="news-box">
              {news.title && <h3>{news.title}</h3>}
              {news.teaser && <p>{news.teaser}</p>}
              {news.media && news.media.length ? (
                <div className="img-in">
                  <img
                    src={`${news.media[0].images.defaultImage.publicUrl}`}
                    // afterLoad={AOSRefresh}
                    alt="office"
                  />
                </div>
              ) : (
                ""
              )}
              {news.pathSegment && (
                <div className="btn-wrapper">
                  {width < 992 ? (
                    <button
                      className="btn btn-red btn-w-arrow"
                      onMouseMove={() => {
                        setMouseMoved(true);
                      }}
                      onMouseDown={() => {
                        setMouseMoved(false);
                      }}
                      onMouseOver={() => {
                        handleClick();
                      }}
                    >
                      <span className="text-wrapper">
                        {readMore}
                        <span className="icon-in">
                          <img
                            src="/images/png/arrow-white-right-over.svg"
                            alt="Arrow Right"
                          />
                          <img
                            src="/images/png/arrow-red-right-over.svg"
                            alt="Arrow Right"
                            className="hover-visible"
                          />
                        </span>
                      </span>
                    </button>
                  ) : (
                    <Button
                      className="btn btn-red btn-w-arrow"
                      link={`news/${news.pathSegment}`}
                      btnWithArrow={true}
                    >
                      {readMore}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  });
};

const NewsTeaser = ({ id, data }) => {
  const router = useRouter();
  const {t} = useTranslation(router.locale);
  // const [configData, setConfigData] = useState(
  //   // router.locale === "de" ? deData : enData
  //   router.locale === "de" ? deData : router.locale === "it" ? itData : enData
  // );
  let newlistsettings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          speed: 1,
        },
      },
    ],
  };

  if (router && router.asPath.includes("/news")) {
    if (data.data.detail) {
      return <NewsDetails data={data.data.detail} />;
    } else {
      return (
        <section className="news-list-section">
          <div className="news-list-banner gray-gradient dark-btm-right-shape">
            <div className="container-md">
              {data.header && <h1 data-aos="fade">{data.header}</h1>}
            </div>
          </div>
          <div className="news-list-wrapper">
            <div className="container-sm">
              <Row>
                {data.data && data.data.list && data.data.list.length ? (
                  <>
                    {data.data.list.map((news, id) => (
                      <Col
                        data-aos="fade-up"
                        xs={12}
                        sm={12}
                        className="news-col"
                        key={news.title && news.title}
                      >
                        <div className="news-box">
                          <div className="news-img-in">
                            {news.media && news.media.length ? (
                              <img
                                src={
                                  news.media[0].images.defaultImage.publicUrl
                                }
                                alt="News"
                              />
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="news-content">
                            {news.title && <h3>{news.title}</h3>}
                            {news.teaser && (
                              <p>
                                <span className="date">
                                  {convertDateToNum(news.datetime)}
                                </span>
                                {news.teaser}
                              </p>
                            )}
                            {news.pathSegment && (
                              <div className="btn-wrapper">
                                <Button
                                  link={`news/${news.pathSegment}`}
                                  btnWithArrow={true}
                                >
                                  {data.data.settings.readMore}
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </Col>
                    ))}
                  </>
                ) : (
                  <Col data-aos="fade-up" xs={12} sm={12} className="news-col">
                    {t('data.noNewsFound')}
                  </Col>
                )}
              </Row>
            </div>
          </div>
        </section>
      );
    }
  }

  return (
    <section
      id={`c${id}`}
      className="news-teaser-section blue-top-gradient top-center-shape"
    >
      <div className="news-teaser-block">
        {data.header && <h1 data-aos="fade">{data.header}</h1>}
        <div className="news-slider-wrapper">
          {data.data && data.data.list && data.data.list.length ? (
            <Slider {...newlistsettings}>
              {renderSlides(data.data.list, data.data.settings.readMore)}
            </Slider>
          ) : (
            ""
          )}
        </div>
        <div className="text-link" data-aos="fade-up">
          <Link href="/news">
            {data.data.settings.allNews}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsTeaser;
