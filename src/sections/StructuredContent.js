import React from "react";
import { Row } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { renderComponents } from "../utils/renderComponents";
import Form from "./Form";
import Link from "next/link";

const renderHeader = (content) => {
  return (
    <div className="structure-headline-wrapper">
      {content && content.header && <h1 data-aos="fade">{content.header}</h1>}
    </div>
  );
};

const renderText = (content) => {
  return (
    <div className="structure-text-wrapper">
      {content && content.header && <h1 data-aos="fade">{content.header}</h1>}
      {content && content.bodytext && (
        <div data-aos="fade-up">
          <ReactMarkdown rehypePlugins={[rehypeRaw]} components={{ a: Link }}>
            {content.bodytext}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};

const renderImage = (content) => {
  return (
    <div className="structure-image-wrapper" data-aos="fade-up">
      {content &&
      content.gallery &&
      content.gallery.rows &&
      content.gallery.rows["1"] &&
      content.gallery.rows["1"].columns &&
      content.gallery.rows["1"].columns["1"] &&
      content.gallery.rows["1"].columns["1"].publicUrl ? (
        <img
          src={content.gallery.rows["1"].columns["1"].publicUrl}
          alt="Content"
        />
      ) : (
        ""
      )}
    </div>
  );
};

const StructuredContent = ({ id, data }) => {
  return (
    <section id={`c${id}`} className="structured-content-section">
      <div
        className={
          data.structure.flexform?.checkbox * 1 ? "container-fluid" : "container"
        }
      >
        <Row>
          {data.structure.rows && data.structure.rows.length ? (
            <>
              {data.structure.rows.map((structRow, rowID) => {
                return structRow.columns && structRow.columns.length ? (
                  <React.Fragment key={`${structRow}${rowID}`}>
                    {structRow.columns.map((structCol, colID) => (
                      <React.Fragment key={`${rowID}${colID}`}>
                        {data.structure.layout === "nsBaseContainer" ? (
                          <>
                            {structCol.elements &&
                              structCol.elements.map((el, id) => {
                                return (
                                  <div
                                    className="structure-box"
                                    key={el.type + id}
                                    id={`c${el.id}`}
                                  >
                                    {el.type === "header" &&
                                      renderHeader(el.content)}
                                    {el.type === "structured_content" && (
                                      <StructuredContent data={el.content} />
                                    )}
                                    {el.type === "text" &&
                                      renderText(el.content)}
                                    {el.type === "image" &&
                                      renderImage(el.content)}
                                    {renderComponents(
                                      el.id,
                                      el.type,
                                      // el.content.pi_flexform_content
                                      el.content
                                    )}
                                  </div>
                                );
                              })}
                          </>
                        ) : (
                          <div
                            className={
                              `${
                                data.structure.flexform && data.structure.flexform[
                                  `width_column_xs_${colID + 1}`
                                ]
                                  ? data.structure.flexform && data.structure.flexform[
                                      `width_column_xs_${colID + 1}`
                                    ]
                                  : ""
                              }` +
                              " " +
                              `${
                                data.structure.flexform && data.structure.flexform[
                                  `width_column_sm_${colID + 1}`
                                ]
                                  ? data.structure.flexform && data.structure.flexform[
                                      `width_column_sm_${colID + 1}`
                                    ]
                                  : ""
                              }` +
                              " " +
                              `${
                                data.structure.flexform && data.structure.flexform[
                                  `width_column_md_${colID + 1}`
                                ]
                                  ? data.structure.flexform && data.structure.flexform[
                                      `width_column_md_${colID + 1}`
                                    ]
                                  : ""
                              }` +
                              " " +
                              `${
                                data.structure.flexform && data.structure.flexform[
                                  `width_column_lg_${colID + 1}`
                                ]
                                  ? data.structure.flexform && data.structure.flexform[
                                      `width_column_lg_${colID + 1}`
                                    ]
                                  : ""
                              }` +
                              " " +
                              `${
                                data.structure.flexform && data.structure.flexform[
                                  `width_column_xl_${colID + 1}`
                                ]
                                  ? data.structure.flexform && data.structure.flexform[
                                      `width_column_xl_${colID + 1}`
                                    ]
                                  : ""
                              }`
                            }
                          >
                            {structCol.elements &&
                              structCol.elements.map((el, id) => {
                                return (
                                  <div
                                    className="structure-box"
                                    key={el.type + id}
                                    id={`c${el.id}`}
                                  >
                                    {el.type === "form_formframework" && (
                                      <Form id={el.id} data={el.content} />
                                    )}
                                    {el.type === "header" &&
                                      renderHeader(el.content)}
                                    {el.type === "structured_content" && (
                                      <StructuredContent data={el.content} />
                                    )}
                                    {el.type === "text" &&
                                      renderText(el.content)}
                                    {el.type === "image" &&
                                      renderImage(el.content)}
                                    {renderComponents(
                                      el.id,
                                      el.type,
                                      // el.content.pi_flexform_content
                                      el.content
                                    )}
                                  </div>
                                );
                              })}
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ) : (
                  ""
                );
              })}
            </>
          ) : (
            ""
          )}
        </Row>
      </div>
    </section>
  );
};

export default StructuredContent;
