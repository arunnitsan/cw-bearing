import { useEffect, useState, useRef, useCallback } from "react";
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
  const [searchTerm, setSearchTerm] = useState(() => {
    // Safely extract search term from URL with proper null checks
    if (router.asPath && router.asPath.includes("=")) {
      const pathParts = router.asPath.split("=");
      if (pathParts.length > 1 && pathParts[1]) {
        return pathParts[1].replaceAll("+", " ");
      }
    }
    return "";
  });
  const [searchData, setSearchData] = useState(null);
  const [resultSearchTerm, setResultSearchTerm] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [configData, setConfigData] = useState(
  //   router.locale === "de" ? deData : router.locale === "it" ? itData : enData
  // );

  // Callback ref to handle focus after DOM is ready
  const setSearchInputRef = useCallback((element) => {
    searchInput.current = element;
    if (element) {
      // Focus the input after it's mounted
      setTimeout(() => {
        element.focus();
      }, 0);
    }
  }, []);

  const searchResults = async (term) => {
    try {
      // Don't search if term is empty or only whitespace
      if (!term || !term.trim()) {
        setLoading(false);
        setResultSearchTerm("");
        setSearchData(null);
        return;
      }

      setLoading(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL
        }${router.locale === "de" ? "" : router.locale+"/"}search/score/desc/0/1/${term.toLowerCase()}`
      );

      setLoading(false);

      // Always set resultSearchTerm when we have a valid search term
      setResultSearchTerm(term);

      if (
        data &&
        data.content &&
        data.content.colPos0 &&
        data.content.colPos0.length &&
        data.content.colPos0[1].content &&
        data.content.colPos0[1].content.data
      ) {
        setSearchData(data.content.colPos0[1].content.data.resultrows);
      } else {
        // No results found, but search was performed
        setSearchData([]);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      // Set resultSearchTerm even when API call fails
      setResultSearchTerm(term);
      setSearchData([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm && !searchTerm.trim()) return;

    // Create URL-friendly slug from search term
    const searchSlug = searchTerm.trim().toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens

    // Update URL with both slug and query parameters
    const searchQuery = encodeURIComponent(searchTerm.trim());
    const newPath = `/search?search_query=${searchQuery}`;

    // Update URL without triggering a page reload
    await router.push(newPath, undefined, { shallow: true });

    // Perform the search
    searchResults(searchTerm.trim());
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchData(null);
    setResultSearchTerm("");
    setLoading(false);

    // Preserve locale when clearing search
    const currentLocale = router.locale;
    const localePath = currentLocale && currentLocale !== 'de' ? `/${currentLocale}` : '';
    const clearPath = `${localePath}/search?search_query=`;

    router.push(clearPath, undefined, { shallow: true });
  };

  useEffect(() => {
    // Try to get search term from query parameters first
    let extractedSearchTerm = "";

    if (router.query.search_query) {
      extractedSearchTerm = decodeURIComponent(router.query.search_query);
    } else if (router.asPath) {
      // Fallback to parsing from URL path (for backward compatibility)
      const pathParts = router.asPath.split("=");
      if (pathParts.length > 1) {
        extractedSearchTerm = pathParts[1].replaceAll("+", " ");
      }
    }

    setSearchTerm(extractedSearchTerm);

    // Only search if we have a valid search term
    if (extractedSearchTerm && extractedSearchTerm.trim()) {
      searchResults(extractedSearchTerm);
    } else {
      setLoading(false);
      setResultSearchTerm("");
      setSearchData(null);
    }
  }, [router.asPath, router.query.search_query]);

  const renderMarkdown = (str) => {
    if (!str) return null;

    const withoutRNT = str
      .replaceAll("\r", "")
      .replaceAll("\n", "")
      .replaceAll("\t", "");
    return (
    <ReactMarkdown rehypePlugins={[rehypeRaw]} components={{ a: Link }}>
      {withoutRNT}
    </ReactMarkdown>
  );
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
                ref={setSearchInputRef}
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
              <div className="close" onClick={handleClearSearch}></div>
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
            {resultSearchTerm !== null && resultSearchTerm !== "" ? (
              <h3 className="main-search-title" data-aos="fade">
                {t("data.YourSearchFor")} „{resultSearchTerm}" {t("data.resultedIn")}{" "}
                {searchData && searchData.length} {t("data.hits")}
              </h3>
            ) : (
              <h3 className="main-search-title" data-aos="fade">
                {t("data.EnterSearchTerm")}
              </h3>
            )}
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
              ) : resultSearchTerm !== null && resultSearchTerm !== "" ? (
                <div className="no-results" data-aos="fade-up">
                  <p>{t("data.noResultsFound")}</p>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="spinner-wrapper">
          <Spinner animation="border" role="status">
            <span className="sr-only visually-hidden">{t("data.loading")}</span>
          </Spinner>
        </div>
      )}
    </section>
  );
};

export default IndexedSearch;
