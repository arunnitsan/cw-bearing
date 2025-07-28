/** @type {import('next-i18next').UserConfig} */
const path = require("path");
module.exports = {
  i18n: {
    localeDetection: false,
    locales: ["en", "de", "us", "it", "fr", "pl"],
    defaultLocale: "de",
    // live
    domains: [
      {
        domain: "cwbearing.de",
        defaultLocale: "de",
      },
      {
        domain: "www.cwbearing.com",
        defaultLocale: "us",
      },
    ],
    //local
    // domains: [
    //   {
    //     domain: "de.localhost",
    //     defaultLocale: "de",
    //   },
    //   {
    //     domain: "us.localhost",
    //     defaultLocale: "us",
    //   },
    // ],
  },
};
