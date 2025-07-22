import React, { useState, useRef } from "react";
import { Card, Accordion } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';
// import { useTranslation } from "../pages/i18n/client";
// import { useTranslation } from "../components/i18n/client";
import SimpleDownload from "./SimplesDownload";

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

const AccordionDownloads = ({ id, data }) => {
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

  React.useEffect(() => {
    setCount(count + 1);

    if (!count) return;
  }, [accordionKey]);

  return (
    <section
      ref={accordionEl}
      id={`c${id}`}
      className="accordion-downloads-section accordion-section"
    >
      <div className="container">
        <div className="accordion-downloads-wrapper accordion-wrapper">
          <div className="accordion-download-left">
            <div className="title-wrapper">
              {data.header && <h1>{data.header}</h1>}
              {data.subheader && <p>{data.subheader}</p>}
            </div>
          </div>
          <div className="accordion-download-right">
            <div className="accordion-downloads-outer">
              <Accordion defaultActiveKey="0">
                {Object.values(data.structure.rows[0].columns[0].elements).map(
                  (accordion, id) => (
                    <React.Fragment
                      key={
                        accordion.content &&
                        // accordion.content.pi_flexform_content &&
                        accordion.content.headline
                      }
                    >
                      {accordion &&
                        accordion.content &&
                        // accordion.content.pi_flexform_content &&
                        accordion.content.headline && (
                          <Card
                            key={
                              accordion.content.headline
                            }
                            className={`${id == accordionKey ? "active-card" : ""
                              }`}
                          >
                            <Card.Header
                              as={Card.Header}
                              eventKey={`${id}`}
                            >
                              <ContextAwareToggle
                                handleKey={(num) => handleAccordionToggle(num)}
                                eventKey={`${id}`}
                              >
                                {
                                  accordion.content
                                    .headline
                                }
                              </ContextAwareToggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={`${id}`}>
                              <Card.Body>
                                <div className="card-body-wrapper">
                                  <SimpleDownload
                                    data={
                                      accordion.content
                                    }
                                    inAccordion={true}
                                  />
                                </div>
                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>
                        )}
                    </React.Fragment>
                  )
                )}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccordionDownloads;
