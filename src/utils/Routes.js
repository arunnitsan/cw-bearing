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

  const mainNavMenu = menuData.data.page.mainNavigation
    .filter((article) => article.data && article.data.slug && article.data.slug.length > 1)
    .map((article) => {
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

  const subNavMenu = menuData.data.page.subNavigation
    .filter((article) => article.data && article.data.slug && article.data.slug.length > 1)
    .map((article) => ({
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
    var spreadMenuChildren = menus.children
      .filter((child) => child.data && child.data.slug && child.data.slug.length > 1)
      .map((child) => {
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
      var spreadMenuChildren = mainNav.children
        .filter((child) => child.data && child.data.slug && child.data.slug.length > 1)
        .map((child) => {
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
      spreadSubMenuChildren = child.children
        .filter((subChild) => subChild.data && subChild.data.slug && subChild.data.slug.length > 1)
        .map((subChild) => {
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
      spreadSubMenuChildren = child.children
        .filter((subChild) => subChild.data && subChild.data.slug && subChild.data.slug.length > 1)
        .map((subChild) => {
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
  let menuData, enMenuData, usMenuData, itMenuData, frMenuData, plMenuData;
  let newsData, enNewsData, usNewsData, itNewsData, frNewsData, plNewsData;

  try {
    [menuData, enMenuData, usMenuData, itMenuData, frMenuData, plMenuData] = await Promise.allSettled([
      getAPIData(""),
      getAPIData("en"),
      getAPIData("us"),
      getAPIData("it"),
      getAPIData("fr"),
      getAPIData("pl")
    ]);

    [newsData, enNewsData, usNewsData, itNewsData, frNewsData, plNewsData] = await Promise.allSettled([
      getAPIData("news"),
      getAPIData("en/news"),
      getAPIData("us/news"),
      getAPIData("it/news"),
      getAPIData("fr/news"),
      getAPIData("pl/news")
    ]);

    // Extract values from Promise.allSettled results
    menuData = menuData.status === 'fulfilled' ? menuData.value : null;
    enMenuData = enMenuData.status === 'fulfilled' ? enMenuData.value : null;
    usMenuData = usMenuData.status === 'fulfilled' ? usMenuData.value : null;
    itMenuData = itMenuData.status === 'fulfilled' ? itMenuData.value : null;
    frMenuData = frMenuData.status === 'fulfilled' ? frMenuData.value : null;
    plMenuData = plMenuData.status === 'fulfilled' ? plMenuData.value : null;

    newsData = newsData.status === 'fulfilled' ? newsData.value : null;
    enNewsData = enNewsData.status === 'fulfilled' ? enNewsData.value : null;
    usNewsData = usNewsData.status === 'fulfilled' ? usNewsData.value : null;
    itNewsData = itNewsData.status === 'fulfilled' ? itNewsData.value : null;
    frNewsData = frNewsData.status === 'fulfilled' ? frNewsData.value : null;
    plNewsData = plNewsData.status === 'fulfilled' ? plNewsData.value : null;
  } catch (error) {
    console.error('Error fetching menu data:', error);
    // Set all to null if there's an error
    menuData = enMenuData = usMenuData = itMenuData = frMenuData = plMenuData = null;
    newsData = enNewsData = usNewsData = itNewsData = frNewsData = plNewsData = null;
  }
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

  if (newsData && newsData.data && newsData.data.content && newsData.data.content.colPos0) {
    var newsMenu = getNewsList(newsData.data.content.colPos0)?.content?.data?.list;
    if (newsMenu) {
      var news = newsMenu
        .filter((article) => article && article.pathSegment)
        .map((article) => ({
          params: {
            slug: ["news", article.pathSegment],
          },
          locale: "de",
        }));
      allNews = [...allNews, ...news];
    }
  }

  if (enNewsData && enNewsData.data && enNewsData.data.content && enNewsData.data.content.colPos0) {
    var newsMenu = getNewsList(enNewsData.data.content.colPos0)?.content?.data?.list;
    if (newsMenu) {
      news = newsMenu
        .filter((article) => article && article.pathSegment)
        .map((article) => ({
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
