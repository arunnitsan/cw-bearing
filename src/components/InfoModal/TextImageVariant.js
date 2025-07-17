import { useContext } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";
// import { useTranslation } from "../../pages/i18n/client";
import { useTranslation } from "../i18n/client";
import { useRouter } from "next/router";

const TextImageVariant = ({ translation, handleStepTwoSelectChange, data }) => {
  const router = useRouter();
  const { t } = useTranslation(router.locale);
  const { showInfo, handleShowInfo } = useContext(GlobalContext);

  const renderLeftStep = (info, id) => {
    if (id + 1 > data.infobox.length / 2) return;
    return (
      <div
        className="info-inner"
        onClick={() => {
          if (
            box.dependency_show &&
            document.querySelector(`#dropdown${box.dependency_show}`)
          ) {
            document
              .querySelector(`#dropdown${box.dependency_show}`)
              .classList.remove("d-none");
          }
          if (
            box.dependency_hide &&
            document.querySelector(`#dropdown${box.dependency_hide}`)
          ) {
            document
              .querySelector(`#dropdown${box.dependency_hide}`)
              .classList.add("d-none");
          }
          handleShowInfo({ isVisible: false });
          handleStepTwoSelectChange(
            data.uid,
            box.name,
            box.infobox_value,
            data.name
          );
        }}
        key={info.name + id}
      >
        <div className="img-in">
          <img src={info.icon} alt="Info" />
        </div>
        <div className="info-about">
          <div className="info-about">{info.name && <h5>{info.name}</h5>}</div>
        </div>
      </div>
    );
  };

  const renderRightStep = (info, id) => {
    if (id + 1 <= data.infobox.length / 2) return;
    return (
      <div className="info-inner" id={info.option}>
        <div className="img-in">
          <img src={info.icon} alt="Info" />
        </div>
        <div className="info-about">{info.name && <h5>{info.name}</h5>}</div>
      </div>
    );
  };

  return (
    <Modal
      className="text-image-variant-modal"
      show={showInfo.isVisible}
      onHide={() => {
        return false;
      }}
    >
      <div className="info-modal-wrapper text-image-modal">
        <div className="container-md">
          <div
            className="action-box"
            onClick={() => handleShowInfo({ isVisible: false })}
          >
            <span className="icon-in">
              <img src="/images/png/back-brand.svg" alt="Back" />
            </span>
            {t("data.backToConfiguration")}
          </div>
          <div className="info-box">
            <div className="info-title">
              {data.name && (
                <h3>
                  <span className="icon-in">
                    <img src="/images/png/info-i.svg" alt="Info" />
                  </span>
                  {data.name}
                </h3>
              )}
            </div>
            <div className="info-desc">
              {data.description && <p> test-3 {data.description}</p>}
            </div>
            <Row>
              <Col md={12} lg={6}>
                {data.infobox && data.infobox.length ? (
                  <>
                    {data.infobox.map((info, id) => (
                      <>{renderLeftStep(info, id)}</>
                    ))}
                  </>
                ) : (
                  ""
                )}
              </Col>
              <Col md={12} lg={6}>
                {data.infobox && data.infobox.length ? (
                  <>
                    {data.infobox.map((info, id) => (
                      <>{renderRightStep(info, id)}</>
                    ))}
                  </>
                ) : (
                  ""
                )}
              </Col>
            </Row>
          </div>
          <div className="info-text">{t("data.moreInfo")}</div>
        </div>
      </div>
    </Modal>
  );
};

export default TextImageVariant;
