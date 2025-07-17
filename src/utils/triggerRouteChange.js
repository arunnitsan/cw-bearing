import { getPathData, findTranslatedLink } from "./getPathData";

export const triggerRouterChange = (router, lang, enMenuData, deMenuData) => {
  let pathData, linkId, routerAsPath;

  if (router.asPath === "/") {
    router.push(``, ``, { locale: lang });
    return;
  }

  if (router.locale === "de" && deMenuData) {
    pathData = getPathData(deMenuData, router.asPath);
  } else if (enMenuData) {
    pathData = getPathData(enMenuData, router.asPath);
  }

  if (pathData && pathData.length) {
    linkId = pathData[0].data.uid;
  }

  if (router.locale === "de" && enMenuData) {
    routerAsPath = findTranslatedLink(enMenuData, linkId);
  } else if (deMenuData) {
    routerAsPath = findTranslatedLink(deMenuData, linkId);
  }

  if (routerAsPath && routerAsPath.length) {
    const destRoute = routerAsPath[0].data.slug;
    router.push(`${destRoute}`, `${destRoute}`, { locale: lang });
  }
};
