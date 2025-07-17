import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isGerman } from "../utils/checkLanguage";
import axios from "axios";

const GlobalContext = React.createContext();

const initialShowInfo = {
  isVisible: false,
  data: null,
};

const initialConfiguratorInfo = {
  isVisible: false,
  data: {
    step: 1,
  },
};

const GlobalProvider = ({ children }) => {
  const router = useRouter();
  const [width, setWidth] = useState(undefined);
  const [isBigHeader, setisBigHeader] = useState(false);
  const [configurator, setConfigurator] = useState(initialConfiguratorInfo);
  const [showInfo, setShowInfo] = useState(initialShowInfo);
  const [successModal, setSuccessModal] = useState({
    isVisible: false,
    data: null,
  });
  const [menuItems, setMenuItems] = useState({});
  const [ctaWithBG, setCtaWithBG] = useState({});
  const [bearingTypes, setBearingTypes] = useState({});
  const [configuratorData, setConfiguratorData] = useState({});
  const [personalContactData, setPersonalContactData] = useState({});
  const [optionProducts, setOptionProducts] = useState([]);
  const [socialMedia, setSocialMedia] = useState({});
  const [copyright, setCopyright] = useState({});
  const [enMenuData, setEnMenuData] = useState(null);
  const [deMenuData, setDeMenuData] = useState(null);
  const [usMenuData, setUsMenuData] = useState(null);
  const [itMenuData, setItMenuData] = useState(null);
  const [frMenuData, setFrMenuData] = useState(null);
  const [plMenuData, setPlMenuData] = useState(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    const url =
      router.locale === router.defaultLocale && isGerman(router.locale)
        ? `${process.env.NEXT_PUBLIC_API_URL}`
        : `${process.env.NEXT_PUBLIC_API_URL}${router.locale}/`;

    axios.get(`${url}product-configurator`).then((res) => {
      if (!res.data.content) return;
      var bearings = {};
      var labels = {};
      res.data.content.colPos0[0].content.data.bearingTypes.map((bearing) => {
        labels = { ...labels, [bearing["slug"]]: bearing["name"] };
        bearings = { ...bearings, [bearing["name"]]: bearing["uid"] };
      });

      setBearingTypes({ ...bearings });
    });

    (async function () {
      const resProducts = await axios.get(
        `${url}product-configurator?productName`
      );
      if (
        resProducts.status === 200 &&
        resProducts.data &&
        resProducts.data.content &&
        resProducts.data.content.colPos0 &&
        resProducts.data.content.colPos0.length &&
        resProducts.data.content.colPos0[0].content &&
        resProducts.data.content.colPos0[0].content.data
      ) {
        setOptionProducts(
          resProducts.data.content.colPos0[0].content.data.products
        );
      }
    })();
  }, [router]);

  const updateWidth = () => {
    if (typeof window !== undefined) {
      setWidth(window.innerWidth);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        bearingTypes,
        configuratorData,
        setConfiguratorData,
        width,
        configurator,
        socialMedia,
        handleSocialMedia: (val) => setSocialMedia(val),
        copyright,
        handleCopyright: (val) => setCopyright(val),
        handleConfigurator: (val) => setConfigurator({ ...val }),
        showInfo,
        handleShowInfo: (val) => setShowInfo({ ...showInfo, ...val }),
        isBigHeader,
        handleBigHeader: (val) => setisBigHeader(val),
        menuItems,
        handleMenuItems: (val) => setMenuItems(val),
        successModal,
        handleSuccessModal: (val) =>
          setSuccessModal({ ...successModal, ...val }),
        ctaWithBG,
        handleCTAWithBG: (val) => setCtaWithBG(val),
        personalContactData,
        handlePersonalContactData: (val) => setPersonalContactData(val),
        optionProducts,
        setOptionProducts,
        enMenuData,
        setEnMenuData,
        deMenuData,
        setDeMenuData,
        usMenuData,
        setUsMenuData,
        itMenuData,
        setItMenuData,
        frMenuData,
        setFrMenuData,
        plMenuData,
        setPlMenuData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
export { GlobalProvider };
