import { useRef, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Input from "../Core/Input";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import GlobalContext from "../../context/GlobalContext";
// import { useTranslation } from "../../pages/i18n/client";
import { useTranslation } from "../i18n/client";

const Stepone = ({
  // data,
  url,
  inputs,
  handleStep,
  products,
  handleProducts,
  handleStepOneInputChange,
  getInfoModals,
  handleIsCustomize,
  handleActiveProduct,
}) => {
  const router = useRouter();
  const { t } = useTranslation(router.locale);
  const modalWrapper = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bearingType, setBearingType] = useState(
    inputs.bearingType ? inputs.bearingType : ""
  );
  const [itemNo, setitemNo] = useState(inputs.itemNo ? inputs.itemNo : "");
  const [error, setError] = useState("");
  const { bearingTypes, optionProducts } = useContext(GlobalContext);

  useEffect(() => {
    modalWrapper.current.scrollIntoView();
  }, []);

  const bearingTypeChange = (bearingType, values) => {
    values.bearingType = bearingType.value;
    setBearingType(bearingType);
  };

  const itemNoChange = (itemNo, values) => {
    values.itemNo = itemNo.value;
    setitemNo(itemNo);
  };

  const filterNames = (inputValueUnfiltered) => {
    const inputValue = inputValueUnfiltered.toLowerCase();
    const filteredOptionsProducts = optionProducts
      .filter(
        (i) =>
          i.name.toLowerCase().includes(inputValue) ||
          i.nameIntl.toLowerCase().includes(inputValue)
      )
      .map((optionProduct) => {
        return {
          label: `${optionProduct.name}`,
          value: `${optionProduct.name}`,
        };
      });
    return filteredOptionsProducts;
  };

  const promiseOptions = (inputValue) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterNames(inputValue));
      }, 1000);
    });
  };

  const renderProducts = () => {
    if (isLoading) {
      return (
        <div className="spinner-wrapper">
          <Spinner animation="border" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="error">
          <div className="container-md">
            <h4>{error}</h4>
          </div>
        </div>
      );
    }

    return products.length ? (
      <div className="product-results-wrapper">
        <div className="container-md">
          <h4>
            {t("data.stepOne.searchResultTitle")}
            <span className="d-block">
              {" "}
              {`(${products.length} ${t("data.stepOne.xProducts")})`}
            </span>
          </h4>
        </div>
        {products.map((product, id) => (
          <div key={product.nameIntl + id} className="product-details-wrapper">
            <div className="container-md">
              <div className="product-details">
                <div className="product-image">
                  <div className="img-in">
                    <img
                      src={`${product.productImage}`}
                      alt={t("data.product")}
                    />
                  </div>
                </div>
                <div className="product-desc">
                  <h3>
                    {product.name}{" "}
                    {`${product.nameIntl ? `/ ${product.nameIntl}` : ""}`}
                  </h3>
                  <div className="details-wrapper">
                    <span className="detail">
                      <span className="detail-label">
                        {t("data.stepOne.innerD")} ⌀:{" "}
                      </span>
                      {product.dInnerDiameter} mm
                    </span>
                    <span className="detail">
                      <span className="detail-label">
                        {t("data.stepOne.outerD")} ⌀:{" "}
                      </span>
                      {product.dOuterDiameter} mm
                    </span>
                    <span className="detail width-in">
                      <span className="detail-label">
                        {t("data.stepOne.width")}:{" "}
                      </span>
                      {product.bWidth} mm
                    </span>
                  </div>
                </div>
              </div>
              <div className="choose-wrapper">
                <button
                  onClick={() => {
                    handleStep(2);
                    handleActiveProduct(product);
                    getInfoModals(product);
                  }}
                >
                  {t("data.stepOne.select")}
                  <span className="mobile-visible arrow-blue">
                    <img
                      src="/images/png/arrow-blue-right-over.svg"
                      alt={t("data.arrow")}
                    />
                  </span>
                  <span className="desktop-visible arrow-white">
                    <img
                      src="/images/png/arrow-right-circle.svg"
                      alt={t("data.arrow")}
                    />
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      ""
    );
  };

  // const { stepOne } = data;

  return (
    <div className="step-one">
      <div
        ref={modalWrapper}
        className="modal-banner btm-center-shape blue-gradient"
      >
        <div className="container-md">
          <h1>{t("data.stepOne.title")}</h1>
          <div className="search-selection-wrapper">
            <Formik
              initialValues={{ itemNo: inputs.itemNo ? inputs.itemNo : "" }}
              onSubmit={async (values) => {
                handleStepOneInputChange({ itemNo: values.itemNo });
                setIsLoading(true);
                setError("");
                axios
                  .get(
                    `${url}product-configurator?productName=${values.itemNo}`
                  )
                  .then(function (response) {
                    setIsLoading(false);
                    const products =
                      response.data.content.colPos0[0].content.data.products;
                    if (!products.length) {
                      setError(`${t("data.stepOne.noProducts")}`);
                      return;
                    }
                    handleProducts(products);
                  })
                  .catch((e) => {
                    setIsLoading(false);
                    setError(`${t("data.stepOne.noProducts")}`);
                  });
              }}
              validationSchema={Yup.object().shape({
                itemNo: Yup.string().required(
                  `${t("data.stepOne.basisTypeValidation")}`
                ),
              })}
            >
              {(props) => {
                const {
                  values,
                  touched,
                  errors,
                  dirty,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  handleReset,
                } = props;
                return (
                  <form className="item-no-form" onClick={handleSubmit}>
                    <div className="input-outer">
                      <div className="custom-select-wrapper  custom-input-group async-input">
                        <div className="custom-input-root">
                          <span className="placeholder s-label">
                            {t("data.stepOne.basisType")}
                          </span>
                          <div className="custom-input-focused">
                            <AsyncSelect
                              placeholder=""
                              className="custom-select-group"
                              classNamePrefix="custom-select"
                              cacheOptions
                              defaultOptions={optionProducts.map((o) => ({
                                label: `${o.name}`,
                                value: `${o.name}`,
                              }))}
                              loadOptions={promiseOptions}
                              defaultValue={{
                                label: itemNo,
                                value: itemNo,
                              }}
                              onChange={(selectedOption) => {
                                itemNoChange(selectedOption, values);
                                handleChange("itemNo")(selectedOption.value);
                              }}
                            />
                            <fieldset>
                              <legend>
                                <span>{t("data.stepOne.basisType")}</span>
                              </legend>
                            </fieldset>
                          </div>
                        </div>
                        {errors.itemNo && touched.itemNo && (
                          <div className="input-feedback">
                            {errors.itemNo}
                          </div>
                        )}
                      </div>
                    </div>
                    <button className="btn-search" type="submit">
                      <span>
                        <img
                          src="/images/png/search.svg"
                          alt={t("data.search")}
                        />
                      </span>
                    </button>
                  </form>
                );
              }}
            </Formik>

            <div className="text-box">
              <p className="text-start">{t("data.stepOne.searchTypeText")}</p>
            </div>
            <Formik
              initialValues={{
                bearingType,
                inner: inputs.inner ? inputs.inner : "",
                outer: inputs.outer ? inputs.outer : "",
                width: inputs.width ? inputs.width : "",
              }}
              onSubmit={async (values) => {
                const { bearingType, inner, outer, width } = values;
                handleStepOneInputChange({ bearingType, inner, outer, width });
                setIsLoading(true);
                setError("");
                axios
                  .get(`${url}product-configurator`, {
                    params: {
                      bearingType: bearingTypes[bearingType],
                      inner: inner,
                      outer: outer,
                      width: width,
                    },
                  })
                  .then(function (response) {
                    setIsLoading(false);
                    const products =
                      response.data.content.colPos0[0].content.data.products;
                    if (!products.length) {
                      setError(`${t("data.stepOne.noProducts")}`);
                      return;
                    }
                    handleProducts(products);
                  })
                  .catch((e) => {
                    setIsLoading(false);
                    setError(`${t("data.stepOne.noProducts")}`);
                  });
              }}
              validationSchema={Yup.object().shape(
                {
                  bearingType: Yup.string().required(
                    `${t("data.stepOne.bearingTypeValidation")}`
                  ),
                  inner: Yup.number()
                    .typeError(`${t("data.stepOne.innerDTypeValidation")}`)
                    .when("outer", {
                      is: (outer) => !outer || outer.length === 0,
                      then: Yup.number()
                        .typeError(`${t("data.stepOne.innerDTypeValidation")}`)
                        .required(`${t("data.stepOne.innerDValidation")}`),
                    }),
                  outer: Yup.number()
                    .typeError(`${t("data.stepOne.outerDTypeValidation")}`)
                    .when("inner", {
                      is: (inner) => !inner || inner.length === 0,
                      then: Yup.number()
                        .typeError(`${t("data.stepOne.outerDTypeValidation")}`)
                        .required(`${t("data.stepOne.outerDValidation")}`),
                    }),
                  // .required("Außenring is Required"),
                  width: Yup.number(
                    `${t("data.stepOne.widthTypeValidation")}`
                  ).typeError(`${t("data.stepOne.widthTypeValidation")}`),
                },
                ["inner", "outer"]
              )}
            >
              {(props) => {
                const {
                  values,
                  touched,
                  errors,
                  dirty,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  handleReset,
                } = props;
                return (
                  <form className="text-form" onSubmit={handleSubmit}>
                    <div className="custom-select-wrapper custom-input-group">
                      <div className="custom-input-root">
                        <span className="placeholder s-label">
                          {t("data.stepOne.bearingType")}
                        </span>
                        <div className="custom-input-focused">
                          <Select
                            defaultValue={{
                              label: bearingType,
                              value: bearingType,
                            }}
                            placeholder=""
                            className="custom-select-group"
                            classNamePrefix="custom-select"
                            onChange={(selectedOption) => {
                              bearingTypeChange(selectedOption, values);
                              handleChange("bearingType", selectedOption.value);
                            }}
                            options={Object.keys(bearingTypes).map(
                              (bearingType) => ({
                                label: bearingType,
                                value: bearingType,
                              })
                            )}
                            name="bearingType"
                          />
                          <fieldset>
                            <legend>
                              <span>{t("data.stepOne.bearingType")}</span>
                            </legend>
                          </fieldset>
                        </div>
                      </div>
                      {errors.bearingType && touched.bearingType && (
                        <div className="input-feedback">
                          {errors.bearingType}
                        </div>
                      )}
                    </div>
                    <div className="product-input-wrapper">
                      <div className="input-outer">
                        <Input
                          value={values.inner}
                          legend={`${t("data.stepOne.innerD")} ⌀`}
                          name="inner"
                          placeholder="mm"
                          handleChange={handleChange("inner")}
                          error={errors.inner && touched.inner && errors.inner}
                        />
                        <Input
                          value={values.outer}
                          legend={`${t("data.stepOne.outerD")} ⌀`}
                          name="outer"
                          placeholder="mm"
                          handleChange={handleChange("outer")}
                          error={errors.outer && touched.outer && errors.outer}
                        />
                        <Input
                          value={values.width}
                          legend={`${t("data.stepOne.width")}`}
                          name="productwidth"
                          placeholder="mm"
                          handleChange={handleChange("width")}
                          error={errors.width && touched.width && errors.width}
                        />
                      </div>
                      <button className="btn-search" type="submit">
                        <span>
                          <img
                            src="/images/png/search.svg"
                            alt={t("data.search")}
                          />
                        </span>
                      </button>
                    </div>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
      {renderProducts()}

      <div className="solution-box">
        <div className="container-md">
          <div className="solution-details">
            <div className="solution-image">
              <div className="img-in">
                <img
                  src="/images/png/solution-icon.svg"
                  alt={t("data.product")}
                />
              </div>
            </div>
            <div className="solution-desc">
              <h3>{t("data.stepOne.individualSolution")}</h3>
              <div className="details-wrapper">
                <div className="detail">
                  <p>{t("data.stepOne.uploadDrawingDesc")}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="choose-wrapper">
            <button
              onClick={() => {
                handleStep(3);
                handleIsCustomize(false);
              }}
            >
              {t("data.stepOne.toForm")}
              <span className="mobile-visible arrow-red">
                <img
                  src="/images/png/arrow-red-right-over.svg"
                  alt={t("data.arrow")}
                />
              </span>
              <span className="desktop-visible arrow-white">
                <img
                  src="/images/png/arrow-right-circle.svg"
                  alt={t("data.arrow")}
                />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stepone;
