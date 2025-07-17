import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import MoreLink from "../components/Shared/MoreLink";
import rehypeRaw from "rehype-raw";
// import enData from "../assets/translations/en.json";
// import deData from "../assets/translations/de.json";
// import itData from "../assets/translations/it.json";
import Link from "next/link";
// import { useTranslation } from "../pages/i18n/client";
import { useTranslation } from "../components/i18n/client";

const IndexedSearch = () => {
  const router = useRouter();
  const { t } = useTranslation(router.locale);
  const searchInput = useRef(null);
  const [searchTerm, setSearchTerm] = useState(
    router.asPath ? router.asPath.split("=")[1].replaceAll("+", " ") : ""
  );
  const [searchData, setSearchData] = useState(null);
  const [resultSearchTerm, setResultSearchTerm] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [configData, setConfigData] = useState(
  //   router.locale === "de" ? deData : router.locale === "it" ? itData : enData
  // );

  const searchResults = async (term) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL
        }${router.locale === "de" ? "" : router.locale+"/"}search/score/desc/0/1/${term.toLowerCase()}`
      );

      setLoading(false);
      if (
        data &&
        data.content &&
        data.content.colPos0 &&
        data.content.colPos0.length &&
        data.content.colPos0[1].content &&
        data.content.colPos0[1].content.data
      ) {
        setResultSearchTerm(term);
        setSearchData(data.content.colPos0[1].content.data.resultrows);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm && !searchTerm.trim()) return;

    searchResults(searchTerm);
  };

  useEffect(() => {
    setSearchTerm(
      router.asPath ? router.asPath.split("=")[1].replaceAll("+", " ") : ""
    );
    searchResults(
      router.asPath ? router.asPath.split("=")[1].replaceAll("+", " ") : ""
    );
  }, [router.asPath]);
  useEffect(() => {
    if (searchInput) {
      searchInput.current.focus();
    }
  }, [searchInput]);

  const renderMarkdown = (str) => {
    const withoutRNT = str
      .replaceAll("\r", "")
      .replaceAll("\n", "")
      .replaceAll("\t", "");
    return <ReactMarkdown children={withoutRNT} rehypePlugins={[rehypeRaw]} components={{ a: Link }} />;
  };

  return (
    <section className="search-results-section">
      <div className="search-results-banner gray-gradient dark-btm-right-shape">
        <div className="container-sm">
          <form
            className="search-form"
            onSubmit={handleSubmit}
            data-aos="fade-up"
          >
            <div className="input-box">
              <input
                type="text"
                value={searchTerm}
                ref={searchInput}
                name="tx_indexedsearch_pi2[search][sword]"
                placeholder={t("data.searchFieldPlaceholder")}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button type="submit">
              <span>
                <img src="/images/png/search-blue.svg" alt="Search" />
              </span>
            </button>
            <div className="close-wrapper">
              <div className="close" onClick={() => setSearchTerm("")}></div>
            </div>
          </form>
        </div>
      </div>
      {!loading ? (
        <div className="search-results-wrapper">
          <div className="container-sm">
            {/* {router.locale === "it" ? (
              <h3 className="main-search-title" data-aos="fade">
                La tua ricerca di „{resultSearchTerm}“ provocato{" "}
                {searchData && searchData.length} colpi
              </h3>

            ) : router.locale === "de" ? (
              <h3 className="main-search-title" data-aos="fade">
                Ihre Suche nach „{resultSearchTerm}“ ergab{" "}
                {searchData && searchData.length} Treffer
              </h3>
            ) : (
              <h3 className="main-search-title" data-aos="fade">
                Your search for „{resultSearchTerm}“ resulted in{" "}
                {searchData && searchData.length} hits
              </h3>
            )} */}
            <h3 className="main-search-title" data-aos="fade">
              {t("data.YourSearchFor")} „{resultSearchTerm}“ {t("data.resultedIn")}{" "}
              {searchData && searchData.length} {t("data.hits")}
            </h3>
            <div className="search-results">
              {searchData && searchData.length ? (
                <>
                  {searchData.map((s, id) => (
                    <div
                      className="search-result-box"
                      key={s.title_text + id}
                      data-aos="fade-up"
                    >
                      {s.title_text && <h3>{s.title_text}</h3>}
                      {s.teaser && renderMarkdown(s.teaser)}
                      <MoreLink link={s.url}>{t("data.toThePage")}</MoreLink>
                    </div>
                  ))}
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="spinner-wrapper">
          <Spinner animation="border" role="status">
            <span className="sr-only">{t("data.loading")}</span>
          </Spinner>
        </div>
      )}
    </section>
  );
};

export default IndexedSearch;
