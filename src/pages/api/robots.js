export default function handler(req, res) {
  console.log("test", req.rawHeaders[1]);
  const robots = `
    User-agent: *
    Allow: /

    # folders
    Disallow: /typo3/
    Disallow: /typo3conf/
    Allow: /_assets/
    Allow: /typo3temp/

    # sitemap
    Sitemap: https://cwbearing.de/sitemap.xml
    Sitemap: https://www.cwbearing.com/sitemap.xml
    `;
  res.send(robots);
}
