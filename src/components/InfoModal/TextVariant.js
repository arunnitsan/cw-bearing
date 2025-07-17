import { useContext } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";
// import { useTranslation } from "../../pages/i18n/client";
import { useTranslation } from "../i18n/client";
import { useRouter } from "next/router";

const TextVariant = ({ translation, handleStepTwoSelectChange, data }) => {
  const router = useRouter();
  const { t } = useTranslation(router.locale);
  const { showInfo, handleShowInfo } = useContext(GlobalContext);

  const renderInfobox = (infobox) => {
    return infobox.map((box, id) => (
      <Col md={12} lg={6} key={box.name + id}>
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
        >
          <div className="info">
            {box.name && <h5>{box.name}</h5>}
            {box.description && <p>{box.description}</p>}
          </div>
        </div>
      </Col>
    ));
  };

  return (
    <Modal
      className="text-variant-modal"
      show={showInfo.isVisible}
      onHide={() => {
        return false;
      }}
    >
      <div className="info-modal-wrapper">
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
              {data.description && <p>test-2 {data.description}</p>}
            </div>
            <Row>
              {data.infobox && data.infobox.length
                ? renderInfobox(data.infobox)
                : ""}
            </Row>
          </div>
          <div className="info-text">{t("data.moreInfo")}</div>
        </div>
      </div>
    </Modal>
  );
};

export default TextVariant;
