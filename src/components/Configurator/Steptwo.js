import { useContext, useRef, useState, useEffect } from "react";
import { Spinner, Row, Col, Dropdown } from "react-bootstrap";
import Button from "../Core/Button";
import InfoModal from "../InfoModal";
import GlobalContext from "../../context/GlobalContext";
import CTAWithBackground from "../../sections/CTAWithBackground";
import PersonalContact from "../../sections/PersonalContact";
// import { useTranslation } from "../../pages/i18n/client";
import { useTranslation } from "../i18n/client";
import { useRouter } from "next/router";
import DOMPurify from "dompurify";

const Steptwo = ({
  // data,
  activeProduct,
  inputs,
  handleStep,
  handleStepTwoSelectChange,
  handleStepTwoInputChange,
  stepTwoData,
  handleIsCustomize,
}) => {
  const router = useRouter();
  const { t } = useTranslation(router.locale);
  const modalWrapper = useRef(null);
  const dropdownWrapper = useRef(null);
  const [modalData, setModalData] = useState(null);
  const { ctaWithBG, personalContactData, showInfo } =
    useContext(GlobalContext);

  const { isLoading, infoModals } = stepTwoData;
  // const { stepTwo, stepOne } = data;

  useEffect(() => {
    if (modalWrapper && modalWrapper.current) {
      modalWrapper.current.scrollIntoView();
    }
  }, []);

  const handleInfoModalData = (data) => {
    setModalData(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const renderOptions = (options, data) => {
    if (!options || !options.length) return;
    var optionNameArr = [];
    if (data.enabledInput) {
      optionNameArr = [
        ...options.map((option, id) => option.name),
        t("data.stepTwo.individualInput"),
      ];
    } else {
      optionNameArr = [...options.map((option, id) => option.name)];
    }
    return optionNameArr;
  };

  const renderInputAndDropdowns = (infoModal) => {
    return (
      <>
        <DropdownGroup
          infoModals={infoModals}
          handleInfoModalData={handleInfoModalData}
          inputs={inputs}
          dropdown={{
            id: infoModal.uid,
            label: infoModal.name,
            options: renderOptions(infoModal.infobox, infoModal),
          }}
          handleStepTwoSelectChange={handleStepTwoSelectChange}
        />
        {inputs[infoModal.uid] &&
        inputs[infoModal.uid].label ==
          `${t("data.stepTwo.individualInput")}` ? (
          <InputGroup
            legend={infoModal.name}
            name={infoModal.name}
            value={inputs[infoModal.uid].value}
            handleChange={(e) =>
              handleStepTwoInputChange({
                id: infoModal.uid,
                name: infoModal.name,
                label: `${t("data.stepTwo.individualInput")}`,
                value: e.target.value,
              })
            }
          />
        ) : (
          ""
        )}
      </>
    );
  };

  const renderDropdowns = () => {
    const secondColumnStart = Math.floor((infoModals.length + 3) / 2);
    return (
      <Row>
        <Col sm={12} md={6}>
          {infoModals
            .slice(0, secondColumnStart)
            .map((infoModal) => renderInputAndDropdowns(infoModal))}
        </Col>
        <Col sm={12} md={6}>
          {infoModals
            .slice(secondColumnStart)
            .map((infoModal) => renderInputAndDropdowns(infoModal))}
        </Col>
      </Row>
    );
  };

  if (isLoading) {
    return (
      <div className="spinner-wrapper step-two-spinner">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="step-two">
      <div
        ref={modalWrapper}
        className="modal-banner btm-center-shape blue-gradient"
      >
        <div className="container-md">
          <div className="title-wrapper">
            <h1>
              {activeProduct.bearingType && (
                <>{activeProduct.bearingType.name}</>
              )}
            </h1>
            <h3>
              {activeProduct.name}{" "}
              {`${activeProduct.nameIntl && `/ ${activeProduct.nameIntl}`}`}
            </h3>
          </div>
          <div className="product-action-outer">
            <div className="product-details">
              <span className="detail">
                {t("data.stepOne.innerD")} ⌀:{" "}
                {activeProduct.dInnerDiameter
                  ? activeProduct.dInnerDiameter
                  : "-"}{" "}
                mm
              </span>
              <span className="detail">
                {t("data.stepOne.outerD")} ⌀:{" "}
                {activeProduct.dOuterDiameter
                  ? activeProduct.dOuterDiameter
                  : "-"}{" "}
                mm
              </span>
              <span className="detail">
                {t("data.stepOne.width")}:{" "}
                {activeProduct.bWidth ? activeProduct.bWidth : "-"} mm
              </span>
            </div>
            <div className="btn-wrapper">
              <Button
                onClick={() => {
                  handleStep(3);
                  handleIsCustomize(true);
                }}
              >
                {t("data.stepTwo.priceRequest")}
              </Button>
              <a
                onClick={() => {
                  dropdownWrapper.current.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                    inline: "nearest",
                  });
                }}
                className="btn-customize"
              >
                {t("data.stepTwo.configure")}
              </a>
            </div>
          </div>
          <div
            className="product-image"
            style={{
              backgroundImage: `url(${activeProduct.productImage})`,
            }}
          ></div>
        </div>
      </div>
      <div
        className="dropdown-wrapper"
        ref={dropdownWrapper}
        id="dropdownWrapper"
      >
        <form onSubmit={handleSubmit}>
          {infoModals && infoModals.length ? renderDropdowns() : ""}
          <div className="btn-wrapper">
            <Button
              type="submit"
              onClick={() => {
                handleStep(3);
                handleIsCustomize(true);
              }}
            >
              {t("data.stepTwo.priceRequest")}
            </Button>
          </div>
        </form>
      </div>
      <CTAWithBackground data={ctaWithBG} />
      <div className="dimensions-box">
        <h3>
          {t("data.stepTwo.dimensions")} {activeProduct.name}{" "}
          {`${activeProduct.nameIntl ? `/ ${activeProduct.nameIntl}` : ""}`}
        </h3>
        <div className="dimensions-inner">
          <div className="dimensions-img-in desktop-visible">
            <img
              src={activeProduct.productWidthImage}
              alt={t("data.altDimensionsText")}
            />
          </div>
          <div className="dimensions-data">
            <div className="data-in">
              <span className="data-label">d</span>
              <span className="data-value">
                {activeProduct.dInnerDiameter
                  ? activeProduct.dInnerDiameter
                  : "-"}{" "}
                mm
              </span>
            </div>
            <div className="data-in">
              <span className="data-label">D</span>
              <span className="data-value">
                {activeProduct.dOuterDiameter
                  ? activeProduct.dOuterDiameter
                  : "-"}{" "}
                mm
              </span>
            </div>
            <div className="data-in">
              <span className="data-label">B</span>
              <span className="data-value">
                {activeProduct.bWidth ? activeProduct.bWidth : "-"} mm
              </span>
            </div>
          </div>
        </div>
      </div>
      <PersonalContact data={personalContactData} />
      {showInfo.isVisible && (
        <InfoModal
          handleStepTwoSelectChange={handleStepTwoSelectChange}
          data={modalData}
        />
      )}
    </div>
  );
};

const DropdownGroup = ({
  infoModals,
  inputs,
  dropdown,
  handleInfoModalData,
  handleStepTwoSelectChange,
}) => {
  const [infoModal, setInfoModal] = useState(null);
  const { handleShowInfo } = useContext(GlobalContext);

  useEffect(() => {
    const modal =
      infoModals &&
      infoModals.filter((iModal) => {
        return iModal.name === dropdown.label;
      });

    setInfoModal(modal);
  }, [infoModals]);

  useEffect(() => {
    if (!infoModal) return;
    infoModal[0].infobox.map((box) => {
      if (box.name === inputs[dropdown.id].label) {
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
          const dependentModal = infoModals.filter(
            (modal) => modal.uid === box.dependency_hide
          );
          if (
            dependentModal[0].infobox[0].dependency_hide &&
            document.querySelector(
              `#dropdown${dependentModal[0].infobox[0].dependency_hide}`
            )
          ) {
            setTimeout(() => {
              document
                .querySelector(
                  `#dropdown${dependentModal[0].infobox[0].dependency_hide}`
                )
                .classList.add("d-none");
            }, 300);
          }
        }
      }
    });
  }, [infoModal]);

  return (
    <div
      className="info-form-group"
      id={`dropdown${infoModal ? infoModal[0].uid : ""}`}
    >
      <Select
        title={`${inputs[dropdown.id] ? inputs[dropdown.id].label : ""}`}
        placeholder={dropdown.label}
        handleSelect={(evtKey, event) => {
          let optionVal;
          if (infoModal && infoModal.length) {
            infoModal[0].infobox.map((box) => {
              if (box.name === event.target.textContent) {
                optionVal = box.infobox_value;
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
                  const dependentModal = infoModals.filter(
                    (modal) => modal.uid === box.dependency_hide
                  );
                  if (
                    dependentModal[0].infobox[0].dependency_hide &&
                    document.querySelector(
                      `#dropdown${dependentModal[0].infobox[0].dependency_hide}`
                    )
                  ) {
                    document
                      .querySelector(
                        `#dropdown${dependentModal[0].infobox[0].dependency_hide}`
                      )
                      .classList.add("d-none");
                  }
                }
              }
            });
          }
          handleStepTwoSelectChange(
            dropdown.id,
            event.target.textContent,
            optionVal,
            dropdown.label
          );
        }}
        options={dropdown.options}
      />
      {infoModal && infoModal[0].enabledInfobox ? (
        <div
          className="icon-in"
          onClick={() => {
            const modal =
              infoModals &&
              infoModals.filter((iModal) => {
                return iModal.name === dropdown.label;
              });
            handleInfoModalData(modal);
            handleShowInfo({ isVisible: true });
          }}
        >
          <img src="/images/png/info-i-red.svg" alt="Info Red" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

const InputGroup = ({ legend, name, label, value, handleChange }) => {
  return (
    <div className="info-form-group inpu-form-group fade-in-bottom">
      <div className="custom-input-group">
        <span>{legend}</span>
        <input
          name={name}
          label={label}
          type="text"
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

const Select = ({ title, placeholder, options, handleSelect }) => {
  return (
    <div className="custom-input-group fade-in-bottom">
      {/* <span>{placeholder}</span> */}
      <span
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(placeholder),
        }}
      />
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle>{title}</Dropdown.Toggle>

        <Dropdown.Menu>
          {options.map((option, id) => (
            <Dropdown.Item key={option + id} as="span">
              {option}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Steptwo;
