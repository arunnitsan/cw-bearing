import { useEffect, useContext, useState, useRef } from "react";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { useRouter } from "next/router";
import {
  AccordionContext,
  useAccordionButton,
  Accordion,
  Card,
} from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AOSRefresh } from "../utils/AOSRefresh";
import MoreLink from "../components/Shared/MoreLink";
import rehypeRaw from "rehype-raw";
import Link from "next/link";
// import enData from '../assets/translations/en.json';
// import deData from '../assets/translations/de.json';
// import { useTranslation } from "../pages/i18n/client";
import { useTranslation } from "../components/i18n/client";

const ContextAwareToggle = ({ handleKey, children, eventKey, callback }) => {
  const router = useRouter();
  const { t } = useTranslation(router.locale);
  const currentEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(eventKey, () => {
    handleKey(eventKey);
    return callback && callback(eventKey);
  });

  const isCurrentEventKey = currentEventKey === eventKey;

  return (
    <h3
      className={`${isCurrentEventKey ? "active" : ""}`}
      onClick={decoratedOnClick}
    >
      {children}
      <span className="icon-in">
        <img src="/images/png/arrowhead-up.svg" alt={t("data.arrow")} />
      </span>
    </h3>
  );
};

const CustomAccordion = ({ id, data }) => {
  const router = useRouter();
  const { t } = useTranslation(router.locale);
  const [accordionKey, setAccordionKey] = useState("0");
  const [count, setCount] = useState(0);
  const accordionEl = useRef();

  useEffect(() => {
    setTimeout(() => {
      // const imageEl = document.querySelectorAll(".collapse.show .img-in");
      const currEl = document.querySelectorAll(".collapse.show");
      const imageEls = Array.from(
        document.querySelectorAll(".collapse.show .card-body-wrapper > .img-in")
      );
      const accordionPos = accordionEl.current.getBoundingClientRect();
      imageEls.map((imageEl) => {
        const imageElTop = parseInt(imageEl.style.top, 10);
        if (imageEl) {
          if (imageElTop * 2 + imageEl.clientHeight > accordionPos.height) {
            imageEl.style.top = `${
              accordionPos.height - imageEl.clientHeight
            }px`;
            return;
          }
          if (
            Math.abs(accordionPos.y) >
            accordionPos.height - imageEl.clientHeight
          ) {
            imageEl.style.top = `${Math.abs(
              accordionPos.height - imageEl.clientHeight
            )}px`;
            return;
          }
          imageEl.style.top = `${Math.abs(accordionPos.top)}px`;
        }
      }, 1000);
    });

    setCount(count + 1);

    if (!count) return;

    setTimeout(() => {
      let activeCard = accordionEl.current.querySelector(".active-card");
      let distance = 0;
      do {
        distance += activeCard.offsetTop;
        activeCard = activeCard.offsetParent;
      } while (activeCard);
      distance = distance < 0 ? 0 : distance;

      window.scrollTo({
        top: distance - 20,
        left: 0,
        behavior: "smooth",
      });
    }, 300);
  }, [accordionKey]);

  useScrollPosition(({ prevPos, currPos }) => {
    const convertedCurrPos = Math.abs(currPos.y);
    const imageEls = Array.from(
      document.querySelectorAll(".collapse.show .card-body-wrapper > .img-in")
    );
    imageEls.map((imageEl) => {
      const accordionPos = accordionEl.current.getBoundingClientRect();
      const imageElTop = parseInt(imageEl.style.top, 10);
      if (accordionPos.top < 0 && imageEl) {
        if (imageElTop * 2 + imageEl.clientHeight > accordionPos.height) {
          imageEl.style.top = `${accordionPos.height - imageEl.clientHeight}px`;
          return;
        }
        if (
          Math.abs(accordionPos.y) >
          accordionPos.height - imageEl.clientHeight
        ) {
          imageEl.style.top = `${Math.abs(
            accordionPos.height - imageEl.clientHeight
          )}px`;
          return;
        }
        imageEl.style.top = `${Math.abs(accordionPos.top)}px`;
      } else {
        imageEl.style.top = `0px`;
      }
    });
  });

  return (
    <section
      ref={accordionEl}
      id={`c${id}`}
      data-aos="fade-up"
      className="accordion-section"
    >
      <div className="container-md">
        <div className="accordion-wrapper">
          <Accordion defaultActiveKey="0">
            {data.list && data.list.length ? (
              <>
                {data.list.map((accordion, id) => (
                  <Card
                    key={accordion.headline}
                    className={`${id == accordionKey ? "active-card" : ""}`}
                  >
                    <Card.Header as={Card.Header} eventKey={`${id}`}>
                      {accordion.headline && (
                        <ContextAwareToggle
                          handleKey={(num) => setAccordionKey(num)}
                          eventKey={`${id}`}
                        >
                          {accordion.headline}
                        </ContextAwareToggle>
                      )}
                    </Card.Header>
                    <Accordion.Collapse eventKey={`${id}`}>
                      <Card.Body>
                        <div className="card-body-wrapper">
                          <div className="img-in">
                            {accordion.image && accordion.image.length ? (
                              <LazyLoadImage
                                src={`${process.env.NEXT_PUBLIC_API_URL}${accordion.image[0]?.properties?.originalUrl}`}
                                afterLoad={AOSRefresh}
                                alt={t("data.accordianItem")}
                              />
                            ) : (
                              ""
                            )}
                          </div>
                          {accordion.text && (
                            <ReactMarkdown
                              children={accordion.text}
                              rehypePlugins={[rehypeRaw]}
                              components={{ a: Link }}
                            />
                          )}
                          {accordion.link && (
                            // <MoreLink link={`${accordion.link.href}`}>
                            <MoreLink
                              link={`${
                                new DOMParser().parseFromString(
                                  accordion.link.href,
                                  "text/html"
                                ).documentElement.textContent
                              }`}
                            >
                              {router.locale === "de"
                                ? "MEHR"
                                : router.locale === "it"
                                ? "DI PIÙ"
                                : router.locale === "fr"
                                ? "PLUS"
                                : router.locale === "pl"
                                ? "WIĘCEJ"
                                : "MORE"}
                            </MoreLink>
                          )}
                        </div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                ))}
              </>
            ) : (
              ""
            )}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default CustomAccordion;
