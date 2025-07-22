const smoothScroll = () => {
  if (typeof document !== "undefined" && typeof window !== "undefined") {
    const links = document.querySelectorAll("a[href*='#']");
    const arrLinks = Array.from(links);

    arrLinks.forEach((link) => {
      // Remove existing event listeners to prevent duplicates
      link.removeEventListener("click", handleSmoothScrollClick);
      link.addEventListener("click", handleSmoothScrollClick);
    });
  }
};

const handleSmoothScrollClick = (e) => {
  const href = e.target.getAttribute("href");

  // Only handle internal links with hash fragments
  if (!href || !href.includes("#")) return;

  const siteURL = window.location.href
    .replace(window.location.origin, "")
    .split("#")[0];
  const linkURL = href.split("#")[0];

  // Only handle same-page navigation
  if (siteURL !== linkURL) return;

  const hash = href.split("#")[1];
  if (!hash) return;

  // Only handle links that start with #c (content sections)
  if (!/^c/.test(hash)) return;

  e.preventDefault();
  const targetEl = document.getElementById(hash);
  if (!targetEl) return;

  const offsetTop = window.pageYOffset + targetEl.getBoundingClientRect().top;

  scroll({
    top: offsetTop,
    behavior: "smooth",
  });
};

// Cleanup function to remove event listeners
const cleanupSmoothScroll = () => {
  if (typeof document !== "undefined") {
    const links = document.querySelectorAll("a[href*='#']");
    const arrLinks = Array.from(links);

    arrLinks.forEach((link) => {
      link.removeEventListener("click", handleSmoothScrollClick);
    });
  }
};

module.exports = smoothScroll;
module.exports.cleanupSmoothScroll = cleanupSmoothScroll;
