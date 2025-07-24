import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { Modal } from "react-bootstrap";
import axios from "axios";
import GlobalContext from "../../context/GlobalContext";
import Stepone from "./Stepone";
import StepThree from "./Stepthree";
import Steptwo from "./Steptwo";
// import deData from "../../assets/translations/de.json";
// import enData from "../../assets/translations/en.json";
// import itData from "../../assets/translations/it.json";
import { isGerman } from "../../utils/checkLanguage";
// import { useTranslation } from "../../pages/i18n/client";
import { useTranslation } from "../i18n/client";

const initialStepOneValues = {
  itemNo: "",
  productTerm: {
    label: "",
    id: undefined,
  },
  inner: "",
  outer: "",
  productwidth: "",
};

const initialVariantOneValues = {
  company: {
    value: "",
    required: true,
  },
  name: {
    value: "",
    required: true,
  },
  email: {
    value: "",
    required: true,
  },
  country: {
    value: "",
    required: true,
  },
  phone: {
    value: "",
    required: false,
  },
  requiredVolume: {
    value: "",
    required: true,
  },
  timeframe: {
    value: "",
    required: true,
  },
  serialDelievery: {
    value: "",
    required: false,
  },
  addInfo: {
    value: "",
    required: false,
  },
  specificationDoc: {
    value: "",
    required: false,
  },
  techCheckbox: {
    value: false,
    required: false,
  },
  privacyCheckbox: {
    value: false,
    required: true,
  },
};

const initialVariantTwoValues = {
  company: {
    value: "",
    required: true,
  },
  name: {
    value: "",
    required: true,
  },
  email: {
    value: "",
    required: true,
  },
  country: {
    value: "",
    required: true,
  },
  phone: {
    value: "",
    required: false,
  },
  requiredVolume: {
    value: "",
    required: true,
  },
  timeframe: {
    value: "",
    required: true,
  },
  serialDelievery: {
    value: "",
    required: false,
  },
  addInfo: {
    value: "",
    required: true,
  },
  specificationDoc: {
    value: "",
    required: false,
  },
  techCheckbox: {
    value: false,
    required: false,
  },
  privacyCheckbox: {
    value: false,
    required: true,
  },
  drawingDoc: {
    value: "",
    required: false,
  },
};

const Configurator = () => {
  
  const router = useRouter();
  const { t } = useTranslation(router.locale);
  const url =
    router.locale === router.defaultLocale && isGerman(router.locale)
      ? `${process.env.NEXT_PUBLIC_API_URL}`
      : `${process.env.NEXT_PUBLIC_API_URL}${router.locale}/`;
  // const [configData, setConfigData] = useState(
  //   router.locale === "de" ? deData : router.locale === "it" ? itData : enData
  // );
  const { configurator, handleConfigurator } = useContext(GlobalContext);
  const [step, setStep] = useState(
    configurator.data.step ? configurator.data.step : 1
  );
  const [products, setProducts] = useState([]);
  const [activeProduct, setActiveProduct] = useState({});
  const [stepOneInput, setStepOneInput] = useState(initialStepOneValues);
  const [stepTwoInput, setStepTwoInput] = useState({});
  const [stepTwoData, setStepTwoData] = useState({});
  const [isCustomized, setIsCustomized] = useState(false);
  const [stepThreeInput, setStepThreeInput] = useState(
    isCustomized ? initialVariantOneValues : initialVariantTwoValues
  );

  // const stepBackText = {
  //   2: `${configData.data.backToStep}`,
  //   3: isCustomized
  //     ? `${configData.data.backToStepTwo}`
  //     : `${configData.data.backToStep}`,
  // };

  const stepBackText = {
    2: `${t("data.backToStep")}`,
    3: isCustomized
      ? `${t('data.backToStepTwo')}`
      : `${t('data.backToStep')}`,
  };

  // useEffect(() => {
  //   setConfigData(router.locale === "de" ? deData : router.locale === "it" ? itData : enData);
  // }, [router]);

  useEffect(() => {
    setStepThreeInput(
      isCustomized ? initialVariantOneValues : initialVariantTwoValues
    );
  }, [isCustomized]);

  const handleStepOneInputChange = (values) => {
    setStepOneInput({
      ...values,
    });
  };

  const handleStepOneSelectChange = (name, label, id) => {
    setStepOneInput({
      ...stepOneInput,
      [name]: {
        label,
        id,
      },
    });
  };

  const handleStepTwoSelectChange = (id, label, value, name) => {
    const val = value ? value : "";

    setStepTwoInput({
      ...stepTwoInput,
      [id]: { ...stepTwoInput[id], value: val, label, name, id },
    });
  };

  const handleStepTwoInputChange = ({ id, name, label, value }) => {
    setStepTwoInput({
      ...stepTwoInput,
      [id]: { ...stepTwoInput[id], value, label, name, id },
    });
  };

  const handleStepThreeInputChange = (e) => {
    const { name, value } = e.target;

    setStepThreeInput({
      ...stepThreeInput,
      [name]: { ...stepThreeInput[name], value: value },
    });
  };

  const handleStepThreeSelectChange = (name, value) => {
    setStepThreeInput({
      ...stepThreeInput,
      [name]: { ...stepThreeInput[name], value: value },
    });
  };

  const handleStepThreeFileChange = (name, e) => {
    setStepThreeInput({
      ...stepThreeInput,
      [name]: { ...stepThreeInput[name], value: e },
    });
  };

  const resetStepTwoValue = () => setStepTwoInput(initialStepTwoValues);

  const handleCheckbox = (name, value) => {
    setStepThreeInput({
      ...stepThreeInput,
      [name]: { ...stepThreeInput[name], value },
    });
  };

  const handleStep = (val) => setStep(val);

  const getInfoModals = (product) => {
    setStepTwoData({ ...stepTwoData, isLoading: true });
    axios
      .get(`${url}product-configurator/details/?productUid=${product.uid}`)
      .then((res) => {
        const resInfoModals =
          res.data.content.colPos0[0].content.data.infoModals;
        let stepTwoInputs = {};
        Object.values(resInfoModals).map((modal) => {
          const modalObj = {
            [modal.uid]: {
              label: modal.infobox[0].name,
              value: modal.infobox[0].infobox_value,
              id: modal.uid,
              name: modal.name,
              order: modal.order ? parseInt(modal.order) : "",
            },
          };
          stepTwoInputs = { ...stepTwoInputs, ...modalObj };
        });
        setStepTwoInput({ ...stepTwoInputs });
        setStepTwoData({
          ...stepTwoData,
          isLoading: false,
          infoModals: resInfoModals,
        });
        setActiveProduct({
          ...res.data.content.colPos0[0].content.data.product,
          bearingType: res.data.content.colPos0[0].content.data.bearingTypes[0],
        });
      })
      .catch((e) => setStepTwoData({ ...stepTwoData, isLoading: false }));
  };

  // const { data } = configData;
  return (
    <Modal
      className="configurator-modal"
      show={configurator.isVisible}
      onHide={() => {
        return false;
      }}
    >
      <div className="custom-modal-wrapper">
        <div className="modal-action-box blue-gradient">
          <div className="container-md">
            <div className="modal-action-inner">
              {step !== 1 ? (
                <span
                  className="back-box"
                  onClick={() => {
                    if (step === 3 && !isCustomized) {
                      setStep(1);
                    } else if (step === 3 && isCustomized) {
                      setStep(2);
                    } else {
                      setStep(step - 1);
                    }
                  }}
                >
                  <img src="/images/png/back-lightblue.svg" alt="Back" />
                  <span>{stepBackText[step]}</span>
                </span>
              ) : (
                <span className="back-box"></span>
              )}
              <div className="solution-step-no">
                {t('data.stepOne.subtitle')} {step}/3
              </div>
              <span
                className="close-box"
                onClick={() =>
                  handleConfigurator({
                    ...configurator,
                    isVisible: false,
                    data: { step: 1 },
                  })
                }
              >
                <img src="/images/png/close-lightblue.svg" alt="Close" />
              </span>
            </div>
          </div>
        </div>
        {step === 1 && (
          <Stepone
            // data={data}
            url={url}
            products={products}
            handleProducts={(res) => setProducts(res)}
            handleStep={handleStep}
            inputs={stepOneInput}
            getInfoModals={getInfoModals}
            handleStepOneInputChange={handleStepOneInputChange}
            handleStepOneSelectChange={handleStepOneSelectChange}
            handleIsCustomize={(val) => setIsCustomized(val)}
            handleActiveProduct={(product) => setActiveProduct(product)}
          />
        )}
        {step === 2 && (
          <Steptwo
            // data={data}
            url={url}
            activeProduct={activeProduct}
            stepTwoData={stepTwoData}
            handleActiveProduct={(data) =>
              setActiveProduct({ ...data, ...activeProduct })
            }
            handleStepTwoInputs={(data) => setStepTwoInput(data)}
            handleStep={handleStep}
            handleStepTwoInputChange={handleStepTwoInputChange}
            handleStepTwoSelectChange={handleStepTwoSelectChange}
            inputs={stepTwoInput}
            resetStepTwoValue={resetStepTwoValue}
            handleIsCustomize={(val) => setIsCustomized(val)}
          />
        )}
        {step === 3 && (
          <StepThree
            // data={data}
            url={url}
            isCustomized={isCustomized}
            activeProduct={activeProduct}
            handleStep={handleStep}
            stepTwoInput={stepTwoInput}
            stepTwoData={stepTwoData}
            stepThreeInput={stepThreeInput}
            handleStepThreeSelectChange={handleStepThreeSelectChange}
            handleStepThreeInputChange={handleStepThreeInputChange}
            handleStepThreeFileChange={handleStepThreeFileChange}
            handleCheckbox={handleCheckbox}
          />
        )}
      </div>
    </Modal>
  );
};

export default Configurator;
