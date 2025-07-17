import { Row, Col } from "react-bootstrap";
import axios from "axios";
import fileDownload from "js-file-download";
import { useTranslation } from "../components/i18n/client";
import { useRouter } from "next/router";

const SimpleDownload = ({ id, data, inAccordion }) => {
  const router = useRouter();
  const { t } = useTranslation(router.locale);
  const renderDownloadCols = (lists) => {
    return lists.map((list) => (
      <Col
        xs={12}
        sm={inAccordion ? 12 : 6}
        className="download-col"
        data-aos="fade-up"
        key={list.headline && list.headline}
      >
        <div className="download-box">
          <div className="download-img">
            <div className="download-img-in">
              {list.image && list.image.length ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}${list.image[0]?.properties?.originalUrl}`}
                  alt="Table"
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="download-content">
            {list.headline && (
              <h3
                data-content={
                  list.file2 && list.file2.length
                    ? list.file2[0]?.properties?.originalUrl
                        .split(".")
                        .pop()
                        .toUpperCase()
                    : ""
                }
              >
                {list.headline}
              </h3>
            )}
            {list.file2 && list.file2.length ? (
              <button
                onClick={() => {
                  axios
                    .get(
                      `${process.env.NEXT_PUBLIC_API_URL}${list.file2[0]?.properties?.originalUrl}`,
                      {
                        responseType: "blob",
                      }
                    )
                    .then((res) => {
                      fileDownload(
                        res.data,
                        list.file2[0]?.properties?.originalUrl.replace(
                          "/Download/",
                          ""
                        )
                      );
                    });
                }}
                className="download-link"
              >
                {/* DOWNLOAD */}
                {t("data.download")}
                <span className="download-icon">
                  <img src="/images/png/download.svg" alt="Download" />
                </span>
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </Col>
    ));
  };

  const renderContent = () => (
    <div className="simple-downloads-wrapper">
      {data.headline && !inAccordion && (
        <h1 data-aos="fade">{data.headline}</h1>
      )}
      {data.text && !inAccordion && (
        <div className="download-teaser" data-aos="fade-up">
          <p>{data.text}</p>
        </div>
      )}
      <Row>
        {data.list && Object.values(data.list).length
          ? renderDownloadCols(Object.values(data.list))
          : ""}
      </Row>
    </div>
  );

  return (
    <section id={`c${id}`} className="simple-downloads-section">
      {inAccordion ? (
        <>{renderContent()}</>
      ) : (
        <div className="container-md">{renderContent()}</div>
      )}
    </section>
  );
};

export default SimpleDownload;
