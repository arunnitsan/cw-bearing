import React, { useEffect, useState, useRef, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Row, Col, Dropdown } from "react-bootstrap";
import { validateText } from "../utils/validation";
import GlobalContext from "../context/GlobalContext";
// import { useTranslation } from "../pages/i18n/client";
import { useTranslation } from "../components/i18n/client";

const InputGroup = ({
  error,
  legend,
  name,
  type,
  value,
  placeholder,
  handleChange,
  handleBlur,
  description,
}) => {
  const isplaceholder = placeholder ? placeholder : "";
  return (
    <div className="custom-input-group">
      <div className="custom-input-root">
        <span className="s-label">{legend}</span>
        <div className="custom-input-focused">
          <input
            name={name}
            type={type}
            placeholder={isplaceholder}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <fieldset>
            <legend>
              <span>{legend}</span>
            </legend>
          </fieldset>
        </div>
      </div>
      {description && <div className="input-description">{description}</div>}
      {error && <div className="input-feedback">{error}</div>}
    </div>
  );
};

const Textarea = ({
  error,
  legend,
  name,
  value,
  placeholder,
  handleChange,
  handleBlur,
  description,
}) => {
  const isplaceholder = placeholder ? placeholder : "";
  return (
    <div className="custom-input-group">
      <div className="custom-input-root">
        <span className="s-label">{legend}</span>
        <div className="custom-input-focused">
          <textarea
            name={name}
            placeholder={isplaceholder}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <fieldset>
            <legend>
              <span>{legend}</span>
            </legend>
          </fieldset>
        </div>
      </div>
      {description && <div className="input-description">{description}</div>}
      <div className="input-feedback">{error}</div>
    </div>
  );
};

const RenderInputs = ({
  elements,
  setValues,
  values,
  fileupload,
  fileuploadTwo,
}) => {
  const router = useRouter();
  let fileUploadCount = 0;
  const handleFileUpload = (e) => {
    setValues({
      ...values,
      [e.target.name]: {
        ...values[e.target.name],
        error: "",
        value: e.target.files[0],
      },
    });
  };

  return elements.map((element, id) => {
    const { label, name, properties, identifier } = element;
    const type = element.type.toLowerCase();
    const { t } = useTranslation(router.locale);

    if (
      type === "email" ||
      type === "text" ||
      type === "url" ||
      type === "telephone"
    ) {
      return (
        <Col md="12" key={name} data-aos="fade-up">
          <InputGroup
            legend={label}
            name={name}
            type={type === "telephone" ? "tel" : type}
            value={values[name] ? values[name].value : ""}
            handleChange={(e) =>
              setValues({
                ...values,
                [name]: { ...values[name], value: e.target.value },
              })
            }
            handleBlur={(e) => {
              setValues({
                ...values,
                [name]: {
                  ...values[name],
                  error: validateText(
                    values[name].required,
                    values[name].type,
                    properties.validationErrorMessages,
                    e.target.value,
                    router.locale
                  ),
                },
              });
            }}
            description={properties.elementDescription}
            error={values[name] ? values[name].error : ""}
          />
        </Col>
      );
    } else if (type === "fileupload") {
      fileUploadCount++;
      let localFileUploadCount = fileUploadCount;
      if (fileUploadCount > 2) {
        return <></>;
      }
      return (
        <Col md="12" key={name} data-aos="fade-up">
          <div className="file-upload-wrapper custom-form-wrapper flex-wrap justify-content-start align-items-center">
            <input
              ref={fileUploadCount === 1 ? fileupload : fileuploadTwo}
              onChange={handleFileUpload}
              name={name}
              type="file"
              style={{ display: "none" }}
            />
            <button
              type="button"
              className="btn-upload"
              onClick={() => {
                if (localFileUploadCount === 1) {
                  fileupload.current.click();
                } else {
                  fileuploadTwo.current.click();
                }
              }}
            >
              {label}
              <span className="icon-in">
                <img src={"/images/png/file-upload.svg"} alt={t("data.upload")} />
              </span>
            </button>
            {values[name] && values[name].value && values[name].value.name && (
              <div className="file-name">
                <span className="img-in">
                  <img src="/images/png/list-view.svg" alt="Tick" />
                </span>
                {values[name].value.name}
              </div>
            )}
            {values[name] && values[name].error && (
              <div className="input-feedback">{values[name].error}</div>
            )}
          </div>
        </Col>
      );
    } else if (type === "textarea") {
      return (
        <Col md="12" key={name} data-aos="fade-up">
          <Textarea
            legend={label}
            name={name}
            type={type}
            value={values[name] ? values[name].value : ""}
            handleChange={(e) =>
              setValues({
                ...values,
                [name]: { ...values[name], value: e.target.value },
              })
            }
            handleBlur={(e) => {
              setValues({
                ...values,
                [name]: {
                  ...values[name],
                  error:
                    type !== "email"
                      ? validateText(
                        values[name].required,
                        values[name].type,
                        label,
                        e.target.value,
                        router.locale
                      )
                      : validateEmail(label, e.target.value),
                },
              });
            }}
            description={properties.elementDescription}
            error={values[name] ? values[name].error : ""}
          />
        </Col>
      );
    } else if (type === "checkbox") {
      return (
        <Col md="12" key={name} data-aos="fade-up">
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id={`${identifier}`}
              name={name}
              checked={values[name] ? values[name].value : false}
              onChange={(e) => {
                setValues({
                  ...values,
                  [name]: {
                    ...values[name],
                    value: values[name].value ? 0 : 1,
                    error: validateText(
                      values[name].required,
                      values[name].type,
                      values[name].validation,
                      !values[name].value,
                      router.locale
                    ),
                  },
                });
              }}
            />
            <label htmlFor={identifier}>{label}</label>
            {values[name] && values[name].error && (
              <div className="input-feedback">{values[name].error}</div>
            )}
          </div>
        </Col>
      );
    } else if (type === "radiobutton") {
      return (
        <Col md="12" key={name} data-aos="fade-up">
          <div className="radio-wrapper">
            <h5>{label}</h5>
            {values[name] &&
              values[name].options &&
              Object.entries(values[name]).length ? (
              <>
                {Object.entries(values[name].options).map((option) => {
                  return (
                    <div className="radio-group">
                      <input
                        type="radio"
                        id={`${option[0]}`}
                        name={name}
                        value={option[1]}
                        checked={
                          values[name] && values[name].value === option[1]
                            ? true
                            : false
                        }
                        onChange={(e) => {
                          setValues({
                            ...values,
                            [name]: {
                              ...values[name],
                              value: option[1],
                              error: validateText(
                                values[name].required,
                                values[name].type,
                                values[name].validation,
                                e.target.value,
                                router.locale
                              ),
                            },
                          });
                        }}
                      />
                      <label htmlFor={`${option[0]}`}>{option[0]}</label>
                    </div>
                  );
                })}
              </>
            ) : (
              ""
            )}
            {values[name] && values[name].error && (
              <div className="input-feedback">{values[name].error}</div>
            )}
          </div>
        </Col>
      );
    } else if (type === "singleselect") {
      return (
        <Col md="12" key={name}>
          <div className="select-wrapper">
            <div className="custom-input-group" data-aos="fade-up">
              <span>{label}</span>
              <Dropdown
                onSelect={(evtKey, event) => {
                  setValues({
                    ...values,
                    [name]: {
                      ...values[name],
                      value: event.target.getAttribute("data-value"),
                      error: validateText(
                        values[name].required,
                        values[name].type,
                        values[name].validation,
                        event.target.getAttribute("data-value"),
                        router.locale
                      ),
                    },
                  });
                }}
              >
                <Dropdown.Toggle>
                  {values[name] && values[name].value
                    ? values[name].value
                    : `Select ${label}`}
                </Dropdown.Toggle>

                {values[name] && values[name].options && (
                  <Dropdown.Menu>
                    {Object.entries(values[name].options).map((option, id) => (
                      <Dropdown.Item
                        key={option[0] + id}
                        as="span"
                        data-value={option[1]}
                      >
                        {option[0]}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                )}
              </Dropdown>
            </div>
            {values[name] && values[name].error && (
              <div className="input-feedback">{values[name].error}</div>
            )}
          </div>
        </Col>
      );
    } else {
      return <React.Fragment key={name}></React.Fragment>;
    }
  });
};

const Form = ({ id, data }) => {
  const router = useRouter();
  const fileupload = useRef(null);
  const fileuploadTwo = useRef(null);
  const [values, setValues] = useState({});
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [redirectLink, setRedirectLink] = useState("");
  const { handleSuccessModal } = useContext(GlobalContext);

  useEffect(() => {
    let tempValues = {};
    data.form.elements.map((element, id) => {
      const { label, name, defaultValue, properties, identifier } = element;
      const type = element.type.toLowerCase();

      if (
        type === "email" ||
        type === "text" ||
        type === "telephone" ||
        type === "textarea" ||
        type === "checkbox" ||
        type === "url" ||
        type === "singleselect" ||
        type === "radiobutton" ||
        type === "fileupload"
      ) {
        tempValues = {
          ...tempValues,
          [name]: {
            identifier,
            value: defaultValue,
            error: "",
            name,
            label,
            type,
            required:
              properties &&
                properties.fluidAdditionalAttributes &&
                properties.fluidAdditionalAttributes.required
                ? true
                : false,
            validation:
              properties && properties.validationErrorMessages
                ? properties.validationErrorMessages
                : [],
            options:
              properties && properties.options ? properties.options : null,
          },
        };
      } else if (type === "hidden") {
        tempValues = {
          ...tempValues,
          [name]: {
            value: defaultValue,
            name,
            label,
            type,
          },
        };
      }
    });

    setValues({ ...tempValues });
  }, []);

  useEffect(() => {
    if (
      data.form_additional &&
      data.form_additional.finishers &&
      data.form_additional.finishers.length
    ) {
      data.form_additional.finishers.map((finisher) => {
        if (finisher.identifier === "Confirmation") {
          setConfirmationMessage(finisher.options.message);
        }
        if (finisher.identifier === "Redirect") {
          setRedirectLink(finisher.link);
        }
      });
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isError = Object.values(values).some((inValues, id) => {
      const error = validateText(
        inValues.required,
        inValues.type,
        inValues.validation,
        inValues.value,
        router.locale
      );
      return error ? true : false;
    });

    if (isError) {
      let tempValues = { ...values };
      Object.values(values).map((inValues, id) => {
        tempValues = {
          ...tempValues,
          [inValues.name]: {
            ...inValues,
            error: validateText(
              inValues.required,
              inValues.type,
              inValues["validation"],
              inValues["value"],
              router.locale
            ),
          },
        };
      });
      setValues({ ...tempValues });
    } else {
      const formData = new FormData();

      Object.entries(values).map((inValue) => {
        formData.append(inValue[0], inValue[1].value);
      });

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL.slice(0, -1)}${data.link.href}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        function findAllByKey(obj, keyToFind) {
          return Object.entries(obj).reduce(
            (acc, [key, value]) =>
              key === keyToFind
                ? acc.concat(value)
                : typeof value === "object" && value
                  ? acc.concat(findAllByKey(value, keyToFind))
                  : acc,
            []
          );
        }
        let serverErrors = findAllByKey(res, "errors");
        let forms = Array.from(document.querySelectorAll(".form-section"));
        let formId;
        forms.map((form, index) => {
          if (form.getAttribute("id") === `c${id}`) {
            formId = index;
          }
        });

        if (serverErrors && serverErrors.length) {
          setValues({
            ...values,
            [`tx_form_formframework[${Object.entries(serverErrors[formId])[0][0]
              }]`]: {
              ...values[
              `tx_form_formframework[${Object.entries(serverErrors[formId])[0][0]
              }]`
              ],
              error: Object.entries(serverErrors[formId])[0][1],
            },
          });
          return;
        }

        let tempValues = { ...values };
        Object.values(values).map((inValues, id) => {
          tempValues = {
            ...tempValues,
            [inValues.name]: {
              ...inValues,
              value: "",
            },
          };
        });
        setValues({ ...tempValues });
        if (redirectLink) {
          if (redirectLink === "/") {
            router.push("/", `${redirectLink}`);
          } else {
            router.push("/[...slug]", `${redirectLink}`);
          }
        } else {
          handleSuccessModal({
            notConfigModal: true,
            isVisible: true,
            data: {
              confirmationMessage,
              redirectLink,
            },
          });
        }
      } catch (e) {
        console.log(e, "e");
      }
    }
  };

  return (
    <section id={`c${id}`} className="form-section">
      <form onSubmit={handleSubmit}>
        <Row>
          <RenderInputs
            elements={data.form.elements}
            values={values}
            setValues={setValues}
            fileupload={fileupload}
            fileuploadTwo={fileuploadTwo}
          />
          <Col xs="3">
            <button className="btn btn-red" data-aos="fade-up" type="submit">
              {data.form_additional &&
                data.form_additional.renderingOptions.submitButtonLabel
                ? data.form_additional.renderingOptions.submitButtonLabel
                : t("data.stepThree.absenden")}
            </button>
          </Col>
        </Row>
      </form>
    </section>
  );
};

export default Form;
