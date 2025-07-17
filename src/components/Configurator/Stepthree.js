import { useEffect, useState, useRef, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Input from "../Core/Input";
import axios from "axios";
import Button from "../Core/Button";
import TextArea from "../Core/TextArea";
import { Row, Col } from "react-bootstrap";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import GlobalContext from "../../context/GlobalContext";
// import { useTranslation } from "../../pages/i18n/client";
import { useTranslation } from "../i18n/client";

const initialVariantOneValues = {
  specificationDoc: {
    value: "",
    required: false,
  },
};

const initialVariantTwoValues = {
  specificationDoc: {
    value: "",
    required: false,
  },
  drawingDoc: {
    value: "",
    required: false,
  },
};

const StepThree = ({
  // data,
  url,
  activeProduct,
  stepTwoInput,
  stepTwoData,
  stepThreeInput,
  handleStep,
  isCustomized,
}) => {
  const router = useRouter();
  const { t } = useTranslation(router.locale);
  let requiredText = `${t("data.required")}`;
  // router.locale === "de"
  //   ? (requiredText = "ist ein Pflichtfeld") :
  //   router.locale === "it" ? (requiredText = "è Obbligatorio")
  //     : (requiredText = "is Required");
  const hiddenInput = useRef(null);
  const [showValues, setShowValues] = useState(false);
  const [filteredStepTwoInputs, setFilteredStepTwoInputs] = useState(null);
  const [inputs, setInputs] = useState(
    isCustomized ? initialVariantOneValues : initialVariantTwoValues
  );
  const modalWrapper = useRef(null);
  const specificationDoc = useRef(null);
  const specificationDocTwo = useRef(null);
  const drawingDoc = useRef(null);
  const {
    configurator,
    configuratorData,
    handleConfigurator,
    handleSuccessModal,
  } = useContext(GlobalContext);
  const { infoModals } = stepTwoData;

  // const { stepThree } = data;

  const HiddenInput = () => (
    <input
      ref={hiddenInput}
      type="hidden"
      value="1"
      name="product-enquiry"
      style={{
        display: "none",
      }}
    />
  );

  useEffect(() => {
    const tempStepTwoInputs = { ...stepTwoInput };

    if (!infoModals || !infoModals.length) return;

    infoModals.map((modal, mid) => {
      const modalId = modal.uid;
      modal.infobox.map((box, boxId) => {
        if (stepTwoInput[modalId] && box.name === stepTwoInput[modalId].label) {
          if (box.dependency_hide && tempStepTwoInputs[box.dependency_hide]) {
            const dModal = infoModals.filter(
              (dbox) => dbox.uid === tempStepTwoInputs[box.dependency_hide].id
            );
            if (
              dModal &&
              dModal.length &&
              dModal[0].infobox[0].dependency_hide
            ) {
              delete tempStepTwoInputs[dModal[0].infobox[0].dependency_hide];
            }
            delete tempStepTwoInputs[box.dependency_hide];
          }
        }
      });
    });

    setFilteredStepTwoInputs({
      ...tempStepTwoInputs,
    });
  }, [stepTwoInput]);

  useEffect(() => {
    modalWrapper.current.scrollIntoView();
  }, []);

  useEffect(() => {
    setInputs(isCustomized ? initialVariantOneValues : initialVariantTwoValues);
  }, [isCustomized]);

  const handleDocUpload = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: { ...inputs[e.target.name], value: e.target.files[0] },
    });
  };

  const renderVariantOne = () => {
    if (!stepThreeInput || !Object.values(stepThreeInput).length) {
      return <div>{t("data.loading")}</div>;
    }
    return (
      <Formik
        initialValues={{
          company: "",
          name: "",
          email: "",
          country: "",
          phone: "",
          requiredVolume: "",
          timeframe: "",
          serialDelievery: "",
          addInfo: "",
          specificationDoc: "",
          techCheckbox: false,
          privacyCheckbox: false,
        }}
        onSubmit={async (values) => {
          const formValues = {
            ...values,
            specificationDoc: inputs["specificationDoc"].value,
            basisType: `${activeProduct.name} ${
              activeProduct.nameIntl ? `/ ${activeProduct.nameIntl}` : ""
            }`,
          };

          const formData = new FormData();

          Object.entries(formValues).map((value) => {
            formData.append(value[0], value[1]);
          });

          var code = "";

          const orderedInputs = Object.values(filteredStepTwoInputs).sort(
            function (a, b) {
              return a.order - b.order;
            }
          );

          orderedInputs.map((v) => {
            if (code) {
              code = code + ` + ${v.value}`;
            } else {
              code = code + `${v.value}`;
            }
          });

          formData.append("code", code);

          orderedInputs.map((input) => {
            formData.append(`infoModal-${input.id}`, input.value);
          });

          const res = await axios.post(
            `${url}product-configurator?product-enquiry=${hiddenInput.current.value}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          handleSuccessModal({
            isVisible: true,
            data: res.data.content.colPos0[0].content.data.thank_you_message,
          });
          handleConfigurator({
            ...configurator,
            isVisible: false,
            data: { step: 1 },
          });
        }}
        validationSchema={Yup.object().shape({
          company: Yup.string().required(
            `${t("data.stepThree.company")} ${requiredText}`
          ),
          name: Yup.string().required(
            `${t("data.stepThree.name")} ${requiredText}`
          ),
          email: Yup.string()
            .email(`${t("data.invaliEamil")}`)
            .required(`${t("data.stepThree.email")} ${requiredText}`),
          country: Yup.string().required(
            `${t("data.stepThree.country")} ${requiredText}`
          ),
          phone: Yup.number("Invalid Number").typeError(
            // "Telefon must be a number"
            `${t("data.telNumberRequired")}`
          ),
          requiredVolume: Yup.string().required(
            `${t("data.stepThree.requiredQuantity")} ${requiredText}`
          ),
          timeframe: Yup.string().required(
            `${t("data.stepThree.projectDuration")} ${requiredText}`
          ),
          privacyCheckbox: Yup.bool().oneOf(
            [true],
            `${t("data.stepThree.privacy")}-${t(
              "data.checkBox"
            )} ${requiredText}`
          ),
        })}
      >
        {(props) => {
          const { values, touched, errors, handleChange, handleSubmit } = props;
          return (
            <form className="form-wrapper" onSubmit={handleSubmit}>
              <Row>
                <HiddenInput />
                <Col sm={12} lg={6}>
                  <Input
                    value={values.company}
                    legend={`${t("data.stepThree.company")}*`}
                    name="company"
                    handleChange={handleChange}
                    error={errors.company && touched.company && errors.company}
                  />
                </Col>
                <Col sm={12} lg={6}>
                  <Input
                    value={values.name}
                    legend={`${t("data.stepThree.name")}*`}
                    name="name"
                    handleChange={handleChange}
                    error={errors.name && touched.name && errors.name}
                  />
                </Col>
                <Col sm={12} lg={6}>
                  <Input
                    value={values.email}
                    legend={`${t("data.stepThree.email")}*`}
                    name="email"
                    handleChange={handleChange}
                    error={errors.email && touched.email && errors.email}
                  />
                </Col>
                <Col sm={12} lg={6}>
                  <div className="dropdown-input-wrapper">
                    <div className="dropdown-in input-in">
                      <Input
                        value={values.country}
                        legend={`${t("data.stepThree.country")}*`}
                        name="country"
                        handleChange={handleChange}
                        error={
                          errors.country && touched.country && errors.country
                        }
                      />
                    </div>
                    <div className="input-in">
                      <Input
                        value={values.phone}
                        legend={t("data.stepThree.phone")}
                        name="phone"
                        handleChange={handleChange}
                        error={errors.phone && touched.phone && errors.phone}
                      />
                    </div>
                  </div>
                </Col>
                <Col sm={12} lg={6} className="span-bg-white">
                  <Row className="inputs-row">
                    <Col xs={6} sm={6}>
                      <Input
                        value={values.requiredVolume}
                        legend={`${t("data.stepThree.requiredQuantity")}*`}
                        name="requiredVolume"
                        handleChange={handleChange}
                        error={
                          errors.requiredVolume &&
                          touched.requiredVolume &&
                          errors.requiredVolume
                        }
                      />
                    </Col>
                    <Col xs={6} sm={6}>
                      <Input
                        value={values.timeframe}
                        legend={`${t("data.stepThree.projectDuration")}*`}
                        name="timeframe"
                        handleChange={handleChange}
                        error={
                          errors.timeframe &&
                          touched.timeframe &&
                          errors.timeframe
                        }
                      />
                    </Col>
                  </Row>
                </Col>
                <Col sm={12} lg={6} className="span-bg-white">
                  <Input
                    value={values.serialDelievery}
                    legend={t("data.stepThree.delievery")}
                    name="serialDelievery"
                    handleChange={handleChange}
                    error={
                      errors.serialDelievery &&
                      touched.serialDelievery &&
                      errors.serialDelievery
                    }
                  />
                </Col>
                <Col sm={12} lg={12} className="span-bg-white">
                  <TextArea
                    value={values.addInfo}
                    legend={t("data.stepThree.otherInfo")}
                    name="addInfo"
                    handleChange={handleChange}
                    error={errors.addInfo && touched.addInfo && errors.addInfo}
                  />
                </Col>
                <Col sm={12} lg={12}>
                  <div className="optional-box">
                    <span>{t("data.stepThree.required")}</span>
                  </div>
                </Col>
                <Col sm={12} lg={12}>
                  <div className="file-upload-wrapper configurator-file-wrapper">
                    <input
                      ref={specificationDoc}
                      onChange={handleDocUpload}
                      type="file"
                      name="specificationDoc"
                      style={{ display: "none" }}
                    />
                    <button
                      type="button"
                      className="btn-upload"
                      onClick={() => specificationDoc.current.click()}
                    >
                      {t("data.stepThree.uploadSpecifications")}
                      <span className="icon-in">
                        <img
                          src={"/images/png/file-upload.svg"}
                          alt={t("data.altUploadText")}
                        />
                      </span>
                    </button>
                    {inputs.specificationDoc.value.name && (
                      <div className="file-name">
                        <span className="img-in">
                          <img
                            src="/images/png/list-view.svg"
                            alt={t("data.altTickText")}
                          />
                        </span>
                        {inputs.specificationDoc.value.name}
                      </div>
                    )}
                  </div>
                </Col>
                <Col sm={12} lg={12}>
                  <div className="checkbox-wrapper">
                    <Field
                      type="checkbox"
                      id="techCheckbox"
                      name="techCheckbox"
                    />
                    <label htmlFor="techCheckbox">
                      {t("data.stepThree.dataSpecsSheet")}
                    </label>
                  </div>
                </Col>
                <Col sm={12} lg={12}>
                  <div className="checkbox-wrapper">
                    <Field
                      type="checkbox"
                      id="privacyCheckbox"
                      name="privacyCheckbox"
                    />
                    <label htmlFor="privacyCheckbox">
                      {t("data.stepThree.agreement")}{" "}
                      <Link href={t("data.stepThree.privacyPolicyPageLink")}>
                        {t("data.stepThree.privacyPolicyPage")}
                      </Link>
                      {t("data.stepThree.agreementLine2")}
                    </label>
                    {errors.privacyCheckbox && touched.privacyCheckbox && (
                      <div className="input-feedback">
                        {errors.privacyCheckbox}
                      </div>
                    )}
                  </div>
                </Col>
                <Col sm={12} lg={12}>
                  <div className="btn-wrapper">
                    <Button type="submit">{configuratorData.sendButton}</Button>
                  </div>
                </Col>
              </Row>
            </form>
          );
        }}
      </Formik>
    );
  };

  const renderVariantTwo = () => {
    return (
      <Formik
        initialValues={{
          company: "",
          name: "",
          email: "",
          country: "",
          phone: "",
          requiredVolume: "",
          timeframe: "",
          serialDelievery: "",
          addInfo: "",
          specificationDoc: "",
          techCheckbox: false,
          privacyCheckbox: false,
          drawingDoc: "",
        }}
        onSubmit={async (values) => {
          const formValues = {
            ...values,
            specificationDoc: inputs["specificationDoc"].value,
            drawingDoc: inputs["drawingDoc"].value,
          };

          const formData = new FormData();

          Object.entries(formValues).map((value) => {
            formData.append(value[0], value[1]);
          });

          const res = await axios.post(
            `${url}product-configurator?product-enquiry=${hiddenInput.current.value}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          handleSuccessModal({
            isVisible: true,
            data: res.data.content.colPos0[0].content.data.thank_you_message,
          });
          handleConfigurator({
            ...configurator,
            isVisible: false,
            data: { step: 1 },
          });
        }}
        validationSchema={Yup.object().shape({
          company: Yup.string().required(
            `${t("data.stepThree.company")} ${requiredText}`
          ),
          name: Yup.string().required(
            `${t("data.stepThree.name")} ${requiredText}`
          ),
          email: Yup.string()
            .email(`${t("data.invaliEamil")}`)
            .required(`${t("data.stepThree.email")} ${requiredText}`),
          country: Yup.string().required(
            `${t("data.stepThree.country")} ${requiredText}`
          ),
          phone: Yup.number(`${t("data.invalidNumber")}`).typeError(
            `${t("data.telNumberRequired")}`
          ),
          requiredVolume: Yup.string().required(
            `${t("data.stepThree.requiredQuantity")} ${requiredText}`
          ),
          timeframe: Yup.string().required(
            `${t("data.stepThree.projectDuration")} ${requiredText}`
          ),
          privacyCheckbox: Yup.bool().oneOf(
            [true],
            `${t("data.stepThree.privacy")}-${t(
              "data.checkBox"
            )} ${requiredText}`
          ),
        })}
      >
        {(props) => {
          const { values, touched, errors, handleChange, handleSubmit } = props;
          return (
            <form className="form-wrapper" onSubmit={handleSubmit}>
              <Row>
                <HiddenInput />
                <Col sm={12} lg={6}>
                  <Input
                    value={values.company}
                    legend={`${t("data.stepThree.company")}*`}
                    name="company"
                    handleChange={handleChange}
                    error={errors.company && touched.company && errors.company}
                  />
                </Col>
                <Col sm={12} lg={6}>
                  <Input
                    value={values.name}
                    legend={`${t("data.stepThree.name")}*`}
                    name="name"
                    handleChange={handleChange}
                    error={errors.name && touched.name && errors.name}
                  />
                </Col>
                <Col sm={12} lg={6}>
                  <Input
                    value={values.email}
                    legend={`${t("data.stepThree.email")}*`}
                    name="email"
                    handleChange={handleChange}
                    error={errors.email && touched.email && errors.email}
                  />
                </Col>
                <Col sm={12} lg={6}>
                  <div className="dropdown-input-wrapper">
                    <div className="dropdown-in input-in">
                      <Input
                        value={values.country}
                        legend={`${t("data.stepThree.country")}*`}
                        name="country"
                        handleChange={handleChange}
                        error={
                          errors.country && touched.country && errors.country
                        }
                      />
                    </div>
                    <div className="input-in">
                      <Input
                        value={values.phone}
                        legend={t("data.stepThree.phone")}
                        name="phone"
                        handleChange={handleChange}
                        error={errors.phone && touched.phone && errors.phone}
                      />
                    </div>
                  </div>
                </Col>
                <Col sm={12} lg={6} className="span-bg-white">
                  <Row className="inputs-row">
                    <Col xs={6} sm={6}>
                      <Input
                        value={values.requiredVolume}
                        legend={`${t("data.stepThree.requiredQuantity")}*`}
                        name="requiredVolume"
                        handleChange={handleChange}
                        error={
                          errors.requiredVolume &&
                          touched.requiredVolume &&
                          errors.requiredVolume
                        }
                      />
                    </Col>
                    <Col xs={6} sm={6}>
                      <Input
                        value={values.timeframe}
                        legend={`${t("data.stepThree.projectDuration")}*`}
                        name="timeframe"
                        handleChange={handleChange}
                        error={
                          errors.timeframe &&
                          touched.timeframe &&
                          errors.timeframe
                        }
                      />
                    </Col>
                  </Row>
                </Col>
                <Col sm={12} lg={6} className="span-bg-white">
                  <Input
                    value={values.serialDelievery}
                    legend={t("data.stepThree.delievery")}
                    name="serialDelievery"
                    handleChange={handleChange}
                    error={
                      errors.serialDelievery &&
                      touched.serialDelievery &&
                      errors.serialDelievery
                    }
                  />
                </Col>
                <Col sm={12} lg={12} className="span-bg-white">
                  <TextArea
                    value={values.addInfo}
                    legend={t("data.stepThree.otherInfo")}
                    name="addInfo"
                    handleChange={handleChange}
                    error={errors.addInfo && touched.addInfo && errors.addInfo}
                  />
                </Col>
                <Col sm={12} lg={12}>
                  <div className="optional-box">
                    <span>{t("data.stepThree.required")}</span>
                  </div>
                </Col>
                <Col sm={12} lg={12}>
                  <div className="file-upload-wrapper configurator-file-wrapper">
                    <input
                      ref={specificationDocTwo}
                      onChange={handleDocUpload}
                      type="file"
                      name="specificationDoc"
                      style={{ display: "none" }}
                    />
                    <button
                      type="button"
                      className="btn-upload"
                      onClick={() => specificationDocTwo.current.click()}
                    >
                      {t("data.stepThree.uploadSpecifications")}
                      <span className="icon-in">
                        <img
                          src={"/images/png/file-upload.svg"}
                          alt={t("data.altUploadText")}
                        />
                      </span>
                    </button>
                    {inputs.specificationDoc.value.name && (
                      <div className="file-name">
                        <span className="img-in">
                          <img
                            src="/images/png/list-view.svg"
                            alt={t("data.altTickText")}
                          />
                        </span>
                        {inputs.specificationDoc.value.name}
                      </div>
                    )}
                  </div>
                </Col>
                <Col sm={12} lg={12}>
                  <div className="file-upload-wrapper configurator-file-wrapper">
                    <input
                      ref={drawingDoc}
                      onChange={handleDocUpload}
                      type="file"
                      name="drawingDoc"
                      style={{ display: "none" }}
                    />
                    <button
                      type="button"
                      className="btn-upload"
                      onClick={() => drawingDoc.current.click()}
                    >
                      {t("data.stepThree.uploadDrawing")}

                      <span className="icon-in">
                        <img
                          src={"/images/png/file-upload.svg"}
                          alt={t("data.altUploadText")}
                        />
                      </span>
                    </button>
                    {inputs.drawingDoc.value.name && (
                      <div className="file-name">
                        <span className="img-in">
                          <img
                            src=" /images/png/list-view.svg"
                            alt={t("data.altTickText")}
                          />
                        </span>
                        {inputs.drawingDoc.value.name}
                      </div>
                    )}
                  </div>
                </Col>
                <Col sm={12} lg={12}>
                  <div className="checkbox-wrapper">
                    <Field
                      type="checkbox"
                      id="techCheckbox"
                      name="techCheckbox"
                    />
                    <label htmlFor="techCheckbox">
                      {t("data.stepThree.dataSpecsSheet")}
                    </label>
                  </div>
                </Col>
                <Col sm={12} lg={12}>
                  <div className="checkbox-wrapper">
                    <Field
                      type="checkbox"
                      id="privacyCheckbox"
                      name="privacyCheckbox"
                    />
                    <label htmlFor="privacyCheckbox">
                      {t("data.stepThree.agreement")}{" "}
                      <Link href={t("data.stepThree.privacyPolicyPageLink")}>
                        {t("data.stepThree.privacyPolicyPage")}
                      </Link>
                      {t("data.stepThree.agreementLine2")}
                    </label>
                    {errors.privacyCheckbox && touched.privacyCheckbox && (
                      <div className="input-feedback">
                        {errors.privacyCheckbox}
                      </div>
                    )}
                  </div>
                </Col>
                <Col sm={12} lg={12}>
                  <div className="btn-wrapper">
                    <Button type="submit">{configuratorData.sendButton}</Button>
                  </div>
                </Col>
              </Row>
            </form>
          );
        }}
      </Formik>
    );
  };

  return (
    <div className="step-three">
      <div
        ref={modalWrapper}
        className="modal-banner btm-center-shape blue-gradient"
      >
        <div className="container-md">
          <div className="banner-content">
            <h1>
              {isCustomized
                ? `${t("data.stepThree.varTwoTitle")}`
                : `${t("data.stepThree.varOneTitle")}`}
            </h1>
            {isCustomized ? (
              <p>{t("data.stepThree.varTwoDesc")}</p>
            ) : (
              <>
                <p>{t("data.stepThree.varOneDescOne")}</p>
                <p>{t("data.stepThree.varOneDescTwo")}</p>
              </>
            )}
            {isCustomized && (
              <div className="show-values-wrapper">
                <div
                  className="show-values-block"
                  onClick={() => setShowValues(!showValues)}
                >
                  <h4>{t("data.stepThree.varTwoSelectedConfig")}</h4>
                  <span className="icon-in">
                    {showValues ? (
                      <img
                        src="/images/png/minus.svg"
                        alt={t("data.altMinusText")}
                      />
                    ) : (
                      <img
                        src="/images/png/plus.svg"
                        alt={t("data.altMinusPlus")}
                      />
                    )}
                  </span>
                </div>
                <div
                  className={`values-in-wrapper ${showValues && " fadeInDown"}`}
                >
                  <h3>
                    {activeProduct.name}{" "}
                    {`${
                      activeProduct.nameIntl
                        ? `/ ${activeProduct.nameIntl}`
                        : ""
                    }`}
                  </h3>
                  <div className="values-table">
                    {filteredStepTwoInputs &&
                      Object.values(filteredStepTwoInputs).map((input, id) => {
                        return (
                          <div className="values-in">
                            <span className="label">{input.name}</span>
                            <span className="value">{input.label}</span>
                            <span
                              className="icon-in"
                              onClick={() => {
                                if (isCustomized) {
                                  handleStep(2);
                                } else {
                                  handleStep(1);
                                }
                              }}
                            >
                              <img
                                src="/images/png/pencil.svg"
                                alt={t("data.altMinusEdit")}
                              />
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="container-md">
        {isCustomized ? renderVariantOne() : renderVariantTwo()}
      </div>
    </div>
  );
};

export default StepThree;
