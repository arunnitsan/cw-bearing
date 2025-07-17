/** @type {import('next-i18next').UserConfig} */
const path = require("path");
module.exports = {
  i18n: {
    localeDetection: false,
    locales: ["en", "de", "us", "it", "fr", "pl"],
    defaultLocale: "de",
    // This is a list of locale domains and the default locale they
    // should handle (these are only required when setting up domain routing)
    // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
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
