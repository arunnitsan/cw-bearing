const getSubLevelChildren = (navigation, routerPath) => {
  let pathData;

  navigation.map((menus) => {
    if (!menus.children || !menus.children.length) {
      return;
    }
    let tempPathData = menus.children.filter((nav) => {
      return nav.data.slug === routerPath;
    });
    if (!tempPathData || !tempPathData.length) {
      menus.children.map((mainNav) => {
        if (!mainNav.children || !mainNav.children.length) {
          return;
        }
        let subTempPathData = mainNav.children.filter((subNav, id) => {
          return subNav.data.slug === routerPath;
        });
        if (subTempPathData && subTempPathData.length) {
          pathData = subTempPathData;
        }
      });
    } else {
      pathData = tempPathData;
    }
  });

  return pathData;
};

const getSubLevelId = (navigation, linkid) => {
  let id;

  navigation.map((menus) => {
    if (!menus.children || !menus.children.length) {
      return;
    }
    let tempid = menus.children.filter((nav) => {
      return nav.data.uid === linkid;
    });
    if (!tempid || !tempid.length) {
      menus.children.map((mainNav) => {
        if (!mainNav.children || !mainNav.children.length) {
          return;
        }
        let subTempid = mainNav.children.filter((subNav, id) => {
          return subNav.data.uid === linkid;
        });
        if (subTempid && subTempid.length) {
          id = subTempid;
        }
      });
    } else {
      id = tempid;
    }
  });

  return id;
};

export const getPathData = (menuData, routerPath) => {
  let pathData;

  pathData = menuData.mainNavigation.filter((nav, id) => {
    return nav.data.slug === routerPath;
  });

  if (!pathData || !pathData.length) {
    pathData = menuData.subNavigation.filter((nav, id) => {
      return nav.data.slug === routerPath;
    });
  }

  if (!pathData || !pathData.length) {
    pathData = getSubLevelChildren(menuData.mainNavigation, routerPath);
  }

  if (!pathData || !pathData.length) {
    pathData = getSubLevelChildren(menuData.subNavigation, routerPath);
  }

  return pathData;
};

export const findTranslatedLink = (menuData, linkid) => {
  let pathData;

  pathData = menuData.mainNavigation.filter((nav, id) => {
    return nav.data.uid === linkid;
  });

  if (!pathData || !pathData.length) {
    pathData = menuData.subNavigation.filter((nav, id) => {
      return nav.data.uid === linkid;
    });
  }

  if (!pathData || !pathData.length) {
    pathData = getSubLevelId(menuData.mainNavigation, linkid);
  }

  if (!pathData || !pathData.length) {
    pathData = getSubLevelId(menuData.subNavigation, linkid);
  }

  return pathData;
};
