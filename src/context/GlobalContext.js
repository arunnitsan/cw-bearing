import React, { useEffect, useState, useCallback, useMemo } from "react";
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
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Memoize the API calls to prevent recreation on every render
  const fetchConfiguratorData = useCallback(async () => {
    try {
      const url =
        router.locale === router.defaultLocale && isGerman(router.locale)
          ? `${process.env.NEXT_PUBLIC_API_URL}`
          : `${process.env.NEXT_PUBLIC_API_URL}${router.locale}/`;

      const configRes = await axios.get(`${url}product-configurator`);

      // Handle configurator data
      if (
        configRes.status === 200 &&
        configRes.data?.content?.colPos0?.[0]?.content?.data?.send_button
      ) {
        setConfiguratorData(prevData => ({
          ...prevData,
          sendButton: configRes.data.content.colPos0[0].content.data.send_button,
        }));
      }

      // Handle bearing types
      if (
        configRes.status === 200 &&
        configRes.data?.content?.colPos0?.[1]?.content?.data?.bearing_types
      ) {
        const bearings = {};
        configRes.data.content.colPos0[1].content.data.bearing_types.forEach(
          (bearing) => {
            bearings[bearing.name] = bearing.uid;
          }
        );
        setBearingTypes(bearings);
      }

      // Handle products - extract from the same product-configurator response
      if (
        configRes.status === 200 &&
        configRes.data?.content?.colPos0?.[0]?.content?.data?.products
      ) {
        setOptionProducts(
          configRes.data.content.colPos0[0].content.data.products
        );
      }
    } catch (error) {
      console.error('Error fetching configurator data:', error);
    }
  }, [router.locale, router.defaultLocale]);

  useEffect(() => {
    fetchConfiguratorData();
  }, [fetchConfiguratorData]);

  const updateWidth = useCallback(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
    }
  }, []);

  // Memoize all handler functions to prevent infinite loops
  const handleSocialMedia = useCallback((val) => setSocialMedia(val), []);
  const handleCopyright = useCallback((val) => setCopyright(val), []);
  const handleConfigurator = useCallback((val) => setConfigurator({ ...val }), []);
  const handleShowInfo = useCallback((val) => setShowInfo(prev => ({ ...prev, ...val })), []);
  const handleBigHeader = useCallback((val) => setisBigHeader(val), []);
  const handleMenuItems = useCallback((val) => setMenuItems(val), []);
  const handleSuccessModal = useCallback((val) => setSuccessModal(prev => ({ ...prev, ...val })), []);
  const handleCTAWithBG = useCallback((val) => setCtaWithBG(val), []);
  const handlePersonalContactData = useCallback((val) => setPersonalContactData(val), []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    bearingTypes,
    configuratorData,
    setConfiguratorData,
    width,
    configurator,
    socialMedia,
    handleSocialMedia,
    copyright,
    handleCopyright,
    handleConfigurator,
    showInfo,
    handleShowInfo,
    isBigHeader,
    handleBigHeader,
    menuItems,
    handleMenuItems,
    successModal,
    handleSuccessModal,
    ctaWithBG,
    handleCTAWithBG,
    personalContactData,
    handlePersonalContactData,
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
  }), [
    bearingTypes,
    configuratorData,
    width,
    configurator,
    socialMedia,
    copyright,
    showInfo,
    isBigHeader,
    menuItems,
    successModal,
    ctaWithBG,
    personalContactData,
    optionProducts,
    enMenuData,
    deMenuData,
    usMenuData,
    itMenuData,
    frMenuData,
    plMenuData,
    handleSocialMedia,
    handleCopyright,
    handleConfigurator,
    handleShowInfo,
    handleBigHeader,
    handleMenuItems,
    handleSuccessModal,
    handleCTAWithBG,
    handlePersonalContactData,
  ]);

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
export { GlobalProvider };
