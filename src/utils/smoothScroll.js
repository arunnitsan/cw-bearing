const smoothScroll = () => {
  if (typeof document !== undefined && typeof window !== undefined) {
    const links = document.querySelectorAll("a");
    const arrLinks = Array.from(links);
    arrLinks.forEach((link, id) => {
      link.addEventListener("click", (e) => {
        const href = link
          .getAttribute("href")
          .replace(window.location.origin, "");

        const siteURL = window.location.href
          .replace(window.location.origin, "")
          .split("#")[0];
        const linkURL = link.getAttribute("href").split("#")[0];

        if (siteURL !== linkURL) return;

        const finalHref = href
          .replace(window.location.href, "")
          .replace(link.getAttribute("href").split("#")[0], "");

        if (/^#c/.test(finalHref)) {
          e.preventDefault();
          const targetEl = document.getElementById(
            `${finalHref.split("#")[1]}`
          );
          if (!targetEl) return;
          const offsetTop =
            window.pageYOffset + targetEl.getBoundingClientRect().top;

          scroll({
            top: offsetTop,
            behavior: "smooth",
          });

          return;
        }
      });
    });
  }
};

export default smoothScroll;
