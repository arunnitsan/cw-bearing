import { useEffect, useContext, useState, useRef } from "react";
import { Accordion, AccordionContext, useAccordionButton, Card, Row, Col } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AOSRefresh } from "../utils/AOSRefresh";
import { renderComponents } from "../utils/renderComponents";
import rehypeRaw from "rehype-raw";
import Link from "next/link";
import React from "react";

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
      }, 400); // Wait for accordion animation to start
    }
  };

  useEffect(() => {
    // Use functional update to avoid dependency on count
    setCount(prevCount => prevCount + 1);
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
          <Col xs={12} sm={6} key={`content-col-${id}`}>
            <ReactMarkdown
              children={column.elements[0].content.bodytext}
              rehypePlugins={[rehypeRaw]}
              components={{ a: Link }}
            />
          </Col>
        );
      } else {
        return <React.Fragment key={`empty-col-${id}`}></React.Fragment>;
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
                      handleKey={(num) => handleAccordionToggle(num)}
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
                              (row, rowId) => {
                                return row.columns && row.columns.length ? (
                                  <React.Fragment key={`row-${rowId}`}>
                                    {row.columns.map((column, columnId) => {
                                      return (
                                        <React.Fragment key={`column-${rowId}-${columnId}`}>
                                          {column.elements &&
                                            column.elements.length ? (
                                            <React.Fragment key={`elements-${rowId}-${columnId}`}>
                                              {column.elements.map(
                                                (element, elementId) => {
                                                  return (
                                                    <React.Fragment key={`element-${rowId}-${columnId}-${elementId}`}>
                                                      {element.type ===
                                                        "image" && (
                                                          <Row key={`image-row-${elementId}`}>
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
                                                          <Row key={`text-row-${elementId}`}>
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
                                                          <React.Fragment key={`structured-${elementId}`}>
                                                            {element.content.structure.rows.map(
                                                              (
                                                                innerRow,
                                                                innerRowId
                                                              ) => (
                                                                <Row
                                                                  key={`inner-row-${elementId}-${innerRowId}`}
                                                                >
                                                                  {renderContent(
                                                                    innerRow.columns
                                                                  )}
                                                                </Row>
                                                              )
                                                            )}
                                                          </React.Fragment>
                                                        )}
                                                      {renderComponents(
                                                        element.id,
                                                        element.type,
                                                        // element.content
                                                        //   .pi_flexform_content
                                                        element.content
                                                      )}
                                                    </React.Fragment>
                                                  );
                                                }
                                              )}
                                            </React.Fragment>
                                          ) : (
                                            ""
                                          )}
                                        </React.Fragment>
                                      );
                                    })}
                                  </React.Fragment>
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
