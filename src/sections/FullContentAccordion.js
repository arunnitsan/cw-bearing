import { useEffect, useContext, useState, useRef } from "react";
import { Accordion, AccordionContext, useAccordionButton, Card, Row, Col } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AOSRefresh } from "../utils/AOSRefresh";
import { renderComponents } from "../utils/renderComponents";
import rehypeRaw from "rehype-raw";
import Link from "next/link";

const ContextAwareToggle = ({ handleKey, children, eventKey, callback }) => {
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
        <img src="/images/png/arrowhead-up.svg" alt="Arrow" />
      </span>
    </h3>
  );
};

const FullAccordion = ({ id, data }) => {
  const [accordionKey, setAccordionKey] = useState("0");
  const [count, setCount] = useState(0);
  const accordionEl = useRef();

  useEffect(() => {
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
    }, 400);
  }, [accordionKey]);

  const renderImage = (url) => {
    return (
      <Col xs={12} sm={12} key={url}>
        <div className="img-in">
          <LazyLoadImage
            src={url}
            afterLoad={AOSRefresh}
            alt="Accordion Item"
          />
        </div>
      </Col>
    );
  };

  const renderText = (text) => {
    return (
      <Col xs={12} sm={12} key={text}>
        <div className="text-wrapper">
          <ReactMarkdown children={text} rehypePlugins={[rehypeRaw]} components={{ a: Link }} />
        </div>
      </Col>
    );
  };

  const renderContent = (columns) => {
    return columns.map((column, id) => {
      if (
        column.elements &&
        column.elements.length &&
        column.elements[0].content &&
        column.elements[0].content.bodytext
      ) {
        return (
          <Col xs={12} sm={6} key={column + id}>
            <ReactMarkdown
              children={column.elements[0].content.bodytext}
              rehypePlugins={[rehypeRaw]}
              components={{ a: Link }}
            />
          </Col>
        );
      } else {
        return <></>;
      }
    });
  };

  return (
    <section
      ref={accordionEl}
      id={`c${id}`}
      data-aos="fade-up"
      className="accordion-section full-accordion-section"
    >
      <div className="container-md">
        <h3 className="full-accordion-headline">{data.header}</h3>
        <div className="accordion-wrapper">
          <Accordion defaultActiveKey="0">
            {Object.values(data.structure.rows[0].columns[0].elements).map(
              (accordion, id) => (
                <Card
                  key={accordion.content.header}
                  className={`${id == accordionKey ? "active-card" : ""}`}
                >
                  <Card.Header>
                    <ContextAwareToggle
                      handleKey={(num) => setAccordionKey(num)}
                      eventKey={`${id}`}
                    >
                      {accordion.content.header}
                    </ContextAwareToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey={`${id}`}>
                    <Card.Body>
                      <div className="card-body-wrapper">
                        {accordion.content.structure &&
                          accordion.content.structure.rows &&
                          accordion.content.structure.rows.length ? (
                          <>
                            {accordion.content.structure.rows.map(
                              (row, id) => {
                                return row.columns && row.columns.length ? (
                                  <>
                                    {row.columns.map((column, id) => {
                                      return (
                                        <>
                                          {column.elements &&
                                            column.elements.length ? (
                                            <>
                                              {column.elements.map(
                                                (element, id) => {
                                                  return (
                                                    <>
                                                      {element.type ===
                                                        "image" && (
                                                          <Row>
                                                            {renderImage(
                                                              element.content
                                                                .gallery.rows[1]
                                                                .columns[1]
                                                                .publicUrl
                                                            )}
                                                          </Row>
                                                        )}
                                                      {element.type ===
                                                        "text" && (
                                                          <Row>
                                                            {element.content
                                                              .bodytext
                                                              ? renderText(
                                                                element
                                                                  .content
                                                                  .bodytext
                                                              )
                                                              : ""}
                                                          </Row>
                                                        )}
                                                      {element.type ===
                                                        "structured_content" && (
                                                          <>
                                                            {element.content.structure.rows.map(
                                                              (
                                                                innerRow,
                                                                id
                                                              ) => (
                                                                <Row
                                                                  key={
                                                                    innerRow.columns
                                                                  }
                                                                >
                                                                  {renderContent(
                                                                    innerRow.columns
                                                                  )}
                                                                </Row>
                                                              )
                                                            )}
                                                          </>
                                                        )}
                                                      {renderComponents(
                                                        element.id,
                                                        element.type,
                                                        // element.content
                                                        //   .pi_flexform_content
                                                        element.content
                                                      )}
                                                    </>
                                                  );
                                                }
                                              )}
                                            </>
                                          ) : (
                                            ""
                                          )}
                                        </>
                                      );
                                    })}
                                  </>
                                ) : (
                                  ""
                                );
                              }
                            )}
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              )
            )}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FullAccordion;
