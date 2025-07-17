import getAPIData from "./API";

export const getRoute = ({ lang, langPages, defaultLocale }) => {
  let path;

  langPages.map((langPage) => {
    // if (langPage.hreflang === "en-US") return;
    if (lang === langPage.twoLetterIsoCode) {
      if (lang === defaultLocale) {
        path = langPage.link;
      } else {
        path = langPage.link.substring(3);
      }
    }
  });
  return path;
};

const getRoutes = (menuData, lang) => {
  var mainMenu = [];

  const mainNavMenu = menuData.data.page.mainNavigation.map((article) => {
    // const link =
    //   lang === "de"
    //     ? article.data.slug.substring(1)
    //     : article.data.slug.replace(`/${lang}/`, "");
    return {
      params: {
        slug: [article.data.slug.substring(1)],
      },
      locale: lang,
    };
  });

  const subNavMenu = menuData.data.page.subNavigation.map((article) => ({
    params: {
      slug: [article.data.slug.substring(1)],
    },
    locale: lang,
  }));

  mainMenu = [...mainNavMenu, ...subNavMenu];

  var menuChildren = [];

  menuData.data.page.mainNavigation.map((menus) => {
    if (!menus.children || !menus.children.length) {
      return;
    }
    var spreadMenuChildren = menus.children.map((child) => {
      // const subLink =
      //   lang === "de"
      //     ? child.link.substring(1)
      //     : child.link.replace(`/${lang}/`, "");
      return {
        params: {
          slug: child.data.slug.substring(1).split("/"),
        },
        locale: lang,
      };
    });
    menuChildren = [...menuChildren, ...spreadMenuChildren];
  });

  menuData.data.page.subNavigation
    .filter((mainNav) => mainNav.children && mainNav.children.length)
    .map((mainNav) => {
      if (!mainNav.children && !mainNav.children.length) {
        return;
      }
      var spreadMenuChildren = mainNav.children.map((child) => {
        return {
          params: {
            slug: child.data.slug.substring(1).split("/"),
          },
          locale: lang,
        };
      });
      menuChildren = [...menuChildren, ...spreadMenuChildren];
    });

  let subMenuChildren = [];

  menuData.data.page.mainNavigation.map((menus) => {
    if (!menus.children || !menus.children.length) {
      return;
    }
    menus.children.map((child) => {
      if (!child.children || !child.children.length) {
        return;
      }
      let spreadSubMenuChildren;
      spreadSubMenuChildren = child.children.map((subChild) => {
        return {
          params: {
            slug: subChild.data.slug.substring(1).split("/"),
          },
          locale: lang,
        };
      });
      subMenuChildren = [...subMenuChildren, ...spreadSubMenuChildren];
    });
  });

  menuData.data.page.subNavigation.map((menus) => {
    if (!menus.children || !menus.children.length) {
      return;
    }
    menus.children.map((child) => {
      if (!child.children || !child.children.length) {
        return;
      }
      let spreadSubMenuChildren;
      spreadSubMenuChildren = child.children.map((subChild) => {
        return {
          params: {
            slug: subChild.data.slug.substring(1).split("/"),
          },
          locale: lang,
        };
      });
      subMenuChildren = [...subMenuChildren, ...spreadSubMenuChildren];
    });
  });

  mainMenu = [...mainMenu, ...menuChildren, ...subMenuChildren];

  return mainMenu;
};

const getNewsList = (newsData) => {
  const list = newsData.filter((comps) => comps.type === "news_pi1");
  return list[0];
};

export const Routes = async () => {
  const menuData = await getAPIData("");
  const enMenuData = await getAPIData("en");
  const usMenuData = await getAPIData("us");
  const itMenuData = await getAPIData("it");
  const frMenuData = await getAPIData("fr");
  const plMenuData = await getAPIData("pl");
  const newsData = await getAPIData("news");
  const enNewsData = await getAPIData("en/news");
  const usNewsData = await getAPIData("us/news");
  const itNewsData = await getAPIData("it/news");
  const frNewsData = await getAPIData("fr/news");
  const plNewsData = await getAPIData("pl/news");
  let allNews = [];

  let pages = [
    {
      params: { slug: [""] },
      locale: "de",
    },
    {
      params: { slug: [""] },
      locale: "en",
    },
    {
      params: { slug: [""] },
      locale: "us",
    },
    {
      params: { slug: [""] },
      locale: "it",
    },
    {
      params: { slug: [""] },
      locale: "fr",
    },
    {
      params: { slug: [""] },
      locale: "pl",
    },
    {
      params: { slug: ["search"] },
      locale: "de",
    },
    { params: { slug: ["search"] }, locale: "en" },
    { params: { slug: ["search"] }, locale: "us" },
    { params: { slug: ["search"] }, locale: "it" },
    { params: { slug: ["search"] }, locale: "fr" },
    { params: { slug: ["search"] }, locale: "pl" },
  ];

  let getDERoutes = [];
  let getENRoutes = [];
  let getUSRoutes = [];
  let getITRoutes = [];
  let getFRRoutes = [];
  let getPLRoutes = [];

  if (menuData && menuData.data) {
    getDERoutes = getRoutes(menuData, "de");
  }
  if (enMenuData && enMenuData.data) {
    getENRoutes = getRoutes(enMenuData, "en");
  }
  if (usMenuData && usMenuData.data) {
    getUSRoutes = getRoutes(usMenuData, "us");
  }
  if (itMenuData && itMenuData.data) {
    getITRoutes = getRoutes(itMenuData, "it");
  }
  if (frMenuData && frMenuData.data) {
    getFRRoutes = getRoutes(frMenuData, "fr");
  }
  if (plMenuData && plMenuData.data) {
    getPLRoutes = getRoutes(plMenuData, "pl");
  }

  pages = [
    ...pages,
    ...getDERoutes,
    ...getENRoutes,
    ...getUSRoutes,
    ...getITRoutes,
    ...getFRRoutes,
    ...getPLRoutes,
  ];

  if (newsData && newsData.data) {
    var newsMenu = getNewsList(newsData.data.content.colPos0).content.data.list;
    if (newsMenu) {
      var news = newsMenu.map((article) => ({
        params: {
          slug: ["news", article.pathSegment],
        },
        locale: "de",
      }));
      allNews = [...allNews, ...news];
    }
  }

  if (enNewsData && enNewsData.data) {
    var newsMenu = getNewsList(enNewsData.data.content.colPos0).content.data
      .list;
    if (newsMenu) {
      news = newsMenu.map((article) => ({
        params: {
          slug: ["news", article.pathSegment],
        },
        locale: "en",
      }));
      allNews = [...allNews, ...news];
    }
  }

  if (usNewsData && usNewsData.data) {
    var newsMenu = getNewsList(usNewsData.data.content.colPos0).content.data
      .list;
    if (newsMenu) {
      news = newsMenu.map((article) => ({
        params: {
          slug: ["news", article.pathSegment],
        },
        locale: "us",
      }));
      allNews = [...allNews, ...news];
    }
  }

  if (itNewsData && itNewsData.data) {
    var newsMenu = getNewsList(itNewsData.data.content.colPos0).content.data
      .list;
    if (newsMenu) {
      news = newsMenu.map((article) => ({
        params: {
          slug: ["news", article.pathSegment],
        },
        locale: "it",
      }));
      allNews = [...allNews, ...news];
    }
  }

  if (frNewsData && frNewsData.data) {
    var newsMenu = getNewsList(frNewsData.data.content.colPos0).content.data
      .list;
    if (newsMenu) {
      news = newsMenu.map((article) => ({
        params: {
          slug: ["news", article.pathSegment],
        },
        locale: "fr",
      }));
      allNews = [...allNews, ...news];
    }
  }

  if (plNewsData && plNewsData.data) {
    var newsMenu = getNewsList(plNewsData.data.content.colPos0).content.data
      .list;
    if (newsMenu) {
      news = newsMenu.map((article) => ({
        params: {
          slug: ["news", article.pathSegment],
        },
        locale: "pl",
      }));
      allNews = [...allNews, ...news];
    }
  }

  var paths = allNews ? pages.concat(allNews) : pages;

  return paths;
};

export default Routes;
