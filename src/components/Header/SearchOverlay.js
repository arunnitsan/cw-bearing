import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import AuroraInner from "../Shared/AuroraInner";
// import deData from "../../assets/translations/de.json";
// import enData from "../../assets/translations/en.json";
// import itData from "../../assets/translations/it.json";
// import axios from "axios";
// import { useTranslation } from "../../pages/i18n/client";
import { useTranslation } from "../i18n/client";

const SearchOverlay = ({
  searchOverlayShow,
  hideSearchOverlay,
  handleClose,
}) => {
  const searchInput = useRef(null);
  const router = useRouter();
  const {t} = useTranslation(router.locale)
  const [searchTerm, setSearchTerm] = useState("");
  // const [configData, setConfigData] = useState(
  //   // router.locale === "de" ? deData : enData
  //   router.locale === "de" ? deData : router.locale === "it" ? itData : enData
  // );
  const aosData = searchOverlayShow ? "fade-up" : "";

  useEffect(() => {
    if (searchInput) {
      searchInput.current.focus();
    }
  }, [searchInput, searchOverlayShow]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm && !searchTerm.trim()) return;

    try {
      const formData = new FormData();

      formData.append("search[action]", "search");
      formData.append("search[controller]", "search");
      formData.append("tx_indexedsearch_pi2[search][sword]", searchTerm);

      const searchQuery = searchTerm.replaceAll(" ", "+");
      handleClose();
      router.push("/[...slug]", `/search?search_query=${searchQuery}`);
    } catch (e) {
      console.log(e, "e");
    }
  };

  return (
    <div
      className={`search-overlay ${!searchOverlayShow && "hidden"}`}
      data-aos={aosData}
    >
      <AuroraInner />
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="input-box">
          <input
            type="text"
            value={searchTerm}
            ref={searchInput}
            name="tx_indexedsearch_pi2[search][sword]"
            // placeholder={configData.data.searchFieldPlaceholder}
            placeholder={t('data.searchFieldPlaceholder')}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <input type="hidden" name="search[action]" value="search " />
        <input type="hidden" name="search[controller]" value="Search" />
        <button type="submit">
          <span>
            <img src="/images/png/search.svg" alt="Search" />
          </span>
        </button>
        <div className="close-wrapper">
          <div className="close" onClick={() => setSearchTerm("")}></div>
        </div>
      </form>
    </div>
  );
};

export default SearchOverlay;
