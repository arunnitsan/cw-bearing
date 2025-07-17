import Router from "next/router";

const germanLanguages = ["de", "de-CH", "de-AT", "de-LU", "de-LI"];

export const isGerman = (lang) => {
  return germanLanguages.some((gLang) => gLang === lang);
};
