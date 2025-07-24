import React, { useState, useContext, useRef } from "react";
import {
  AccordionContext,
  useAccordionButton,
  Accordion,
  Card,
} from "react-bootstrap";
import SimpleDownload from "./SimplesDownload";
import { useRouter } from "next/router";
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

const AccordionDownloads = ({ id, data }) => {
  const [accordionKey, setAccordionKey] = useState("0");
  const [count, setCount] = useState(0);
  const accordionEl = useRef();

  React.useEffect(() => {
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
                                handleKey={(num) => setAccordionKey(num)}
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
