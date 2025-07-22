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
import { useTranslation } from 'next-i18next';
// import enData from '../assets/translations/en.json';
// import deData from '../assets/translations/de.json';
// import { useTranslation } from "../pages/i18n/client";
// import { useTranslation } from "../components/i18n/client";

const ContextAwareToggle = ({ handleKey, children, eventKey, callback }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
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
  const { t } = useTranslation('common');
  const [accordionKey, setAccordionKey] = useState("0");
  const [count, setCount] = useState(0);
  const accordionEl = useRef();

  // Handle accordion expansion and scroll into view
  const handleAccordionToggle = (newKey) => {
    setAccordionKey(newKey);

    // Only scroll if the accordion is being expanded (not collapsed)
    if (newKey !== accordionKey) {
      // Use setTimeout to ensure the accordion content is rendered before scrolling
      setTimeout(() => {
        const activeCard = accordionEl.current?.querySelector(".active-card");
        if (activeCard) {
          // Calculate the position to scroll to (with some offset for better UX)
          const cardRect = activeCard.getBoundingClientRect();
          const offsetTop = window.pageYOffset + cardRect.top - 100; // 100px offset from top

          // Smooth scroll to bring the accordion into view
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }, 300); // Wait for accordion animation to start
    }
  };

  useEffect(() => {
    setTimeout(() => {
      // const imageEl = document.querySelectorAll(".collapse.show .img-in");
      const currEl = document.querySelectorAll(".collapse.show");
      const imageEls = Array.from(
        document.querySelectorAll(".collapse.show .card-body-wrapper > .img-in")
      );
      const accordionPos = accordionEl.current?.getBoundingClientRect();
      if (!accordionPos) return;

      imageEls.forEach((imageEl) => {
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
      });
    }, 1000);

    // Use functional update to avoid dependency on count
    setCount(prevCount => prevCount + 1);
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
                          handleKey={(num) => handleAccordionToggle(num)}
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
                                src={`${accordion.image[0]?.publicUrl ? accordion.image[0]?.publicUrl : `${process.env.NEXT_PUBLIC_API_URL}${accordion.image[0]?.properties?.originalUrl}`}`}
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
