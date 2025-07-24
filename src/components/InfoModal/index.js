import { useState } from "react";
import { useRouter } from "next/router";
import TextBild from "./TextBild";
import TextBildTwo from "./TextBildtwo";
import TextImageVariant from "./TextImageVariant";
import TextOnly from "./TextOnly";
import TextVariant from "./TextVariant";
// import deData from "../../assets/translations/de.json";
// import enData from "../../assets/translations/en.json";
// import itData from "../../assets/translations/it.json";
// import { useTranslation } from "../../pages/i18n/client";
import { useTranslation } from "../i18n/client";

const InfoModal = ({ handleStepTwoSelectChange, data }) => {
  const router = useRouter();
  const {t} = useTranslation(router.locale);
  // const [configData, setConfigData] = useState(
  //   router.locale === "de" ? deData : router.locale === "it" ? itData : enData
  // );

  if (!data || !Object.values(data).length) {
    return <div>{t('data.loading')}</div>;
  }

  return (
    <>
      {data[0].infobox_type === 0 && (
        <TextBild
          // translation={configData.data}
          handleStepTwoSelectChange={handleStepTwoSelectChange}
          data={data[0]}
        />
      )}
      {data[0].infobox_type === 1 && (
        <TextOnly
          // translation={configData.data}
          handleStepTwoSelectChange={handleStepTwoSelectChange}
          data={data[0]}
        />
      )}
      {data[0].infobox_type === 2 && (
        <TextBildTwo
          // translation={configData.data}
          handleStepTwoSelectChange={handleStepTwoSelectChange}
          data={data[0]}
        />
      )}
      {data[0].infobox_type === 3 && (
        <TextImageVariant
          // translation={configData.data}
          handleStepTwoSelectChange={handleStepTwoSelectChange}
          data={data[0]}
        />
      )}
      {data[0].infobox_type === 4 && (
        <TextVariant
          // translation={configData.data}
          handleStepTwoSelectChange={handleStepTwoSelectChange}
          data={data[0]}
        />
      )}
    </>
  );
};

export default InfoModal;
