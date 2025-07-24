import React, { useEffect, useContext, useRef, useState } from "react";
import Slider from "react-slick";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { Row, Col } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { renderWordHtml } from "../utils/WordAnimation";
import Button from "../components/Core/Button";
import AuroraInner from "../components/Shared/AuroraInner";
import MoreLink from "../components/Shared/MoreLink";
import GlobalContext from "../context/GlobalContext";
import { AOSRefresh } from "../utils/AOSRefresh";
import rehypeRaw from "rehype-raw";
import Link from "next/link";
import { extractTextFromHtml } from "../utils/htmlUtils";

const HeaderBig = ({ data }) => {
  const hero = useRef();
  const [activeIcon, setActiveIcon] = useState(1);
  const [bannerScrolled, setBannerScrolled] = useState(false);
  const { width, configurator, handleConfigurator, handleBigHeader } =
    useContext(GlobalContext);

  useEffect(() => {
    handleBigHeader(true);

    return () => {
      handleBigHeader(false);
      return;
    };
  }, []);

  const renderAnimatedIcons = (image) => {
    return (image.map((i, id) => {
      return (
        <span
          className={`animated-icon icon-in animated-icon-${id + 1} ${id === 0 ? "blink" : ""}`}
          key={i + id}
        >
          {i && (
            <LazyLoadImage
              src={`${i?.publicUrl ? i?.publicUrl : `${process.env.NEXT_PUBLIC_API_URL}${i?.properties?.originalUrl}`}`}
              afterLoad={AOSRefresh}
              alt="Solution"
            />
          )}
        </span>
      );
    }));
  };

  const settings = {
    dots: false,
    arrows: false,
    draggable: false,
    swipe: false,
    infinite: true,
    fade: true,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <section className="header-banner-section">
        <div
          className={`${bannerScrolled && width < 575 ? "sm-spining-circle" : ""
            } hb-hero`}
          ref={hero}
        >
          <AuroraInner />
          {data.image && data.image.length ? (
            <span
              className={`spining-circle`}
              style={{
                backgroundImage: `url(${data.image[0]?.publicUrl ? data.image[0]?.publicUrl : `${process.env.NEXT_PUBLIC_API_URL}${data.image[0]?.properties?.originalUrl}`})`,
              }}
            ></span>
          ) : (
            ""
          )}
          <div className="container-md header-container">
            <div className="banner-content">
              <h1>
                {data.headline && renderWordHtml(data.headline, 0.25, 0.05)}
              </h1>
              <div className="btn-wrapper" data-aos="fade-up">
                {data.btntext && (
                  <Button whiteHover={true}>{data.btntext}</Button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="banner-description">
          <div className="container-sm">
            <div data-aos="fade-up">
              {data.text && (
                <ReactMarkdown rehypePlugins={[rehypeRaw]} components={{ a: Link }}>
                  {data.text}
                </ReactMarkdown>
              )}
            </div>
            <div className="btn-box" style={{ paddingTop: "40px" }}>
              {data.btn2text && data.link2 && (
                <Button
                  onClick={() => {
                    handleConfigurator({
                      ...configurator,
                      isVisible: true,
                      data: { step: 3 },
                    });
                  }}
                >
                  {data.btn2text}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
      <div className="banner-solutions blue-gradient">
        <div className="container-sm">
          <div className="banner-solutions-inner">
            {data.listheadline && (
              <h2 data-aos="fade-up">{data.listheadline}</h2>
            )}
            <Row>
              {
                data.list && data.list.length ?
                  data.list.map((l, id) => (
                    <Col key={l + id} xs={12} sm={6}>
                      <div className="solution-box">
                        <div className="solution-left" data-aos="fade-right">
                          {l.image && l.image.length ? (
                            <Slider {...settings}>
                              {renderAnimatedIcons(l.image)}
                            </Slider>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="solution-right" data-aos="fade-up">
                          {l.title && <h3>{l.title}</h3>}
                          {l.content && (
                            <ReactMarkdown
                              children={l.content}
                              rehypePlugins={[rehypeRaw]}
                              components={{ a: Link }}
                            />
                          )}
                          {l.link && l.btntext && (
                            // <MoreLink link={l.link.href}>{l.btntext}</MoreLink>
                            <MoreLink link={extractTextFromHtml(l.link.href)}>{l.btntext}</MoreLink>
                          )}
                        </div>
                      </div>
                    </Col>
                  ))
                  : ""
              }
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderBig;
