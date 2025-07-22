import React, { useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import GlobalContext from "../../context/GlobalContext";
import AuroraInner from "../Shared/AuroraInner";
import { useTranslation } from 'next-i18next';
// import { useTranslation } from "../../pages/i18n/client";
// import { useTranslation } from "../i18n/client";

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
