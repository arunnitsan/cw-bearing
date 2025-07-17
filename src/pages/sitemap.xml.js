import Routes from "../utils/Routes";

function Sitemap(pageRoutes) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pageRoutes
      .map((slug) => {
        return `
      <url>
          <loc>${`${slug}`}</loc>
          <priority>0.5</priority>
      </url>
    `;
      })
      .join("")}
   </urlset>`;
}

export async function getServerSideProps({ res }) {
  const paths = await Routes();
  let pageRoutes = [];
  await Promise.all(
    paths.map((item) => {
      const paramSlug = item?.params?.slug;
      let slug;
      if (paramSlug && paramSlug.length > 2) {
        slug = paramSlug.toString().replace(/,/g, "/");
      } else if (paramSlug && paramSlug.length > 1) {
        slug = paramSlug.toString().replace(",", "/");
      } else if (!paramSlug) {
        slug = "";
      } else {
        slug = paramSlug[0];
      }
      pageRoutes.push(`${item.locale}/${slug}`);
    })
  );

  const sitemap = await Sitemap(pageRoutes);
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default Sitemap;
