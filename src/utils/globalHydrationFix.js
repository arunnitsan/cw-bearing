export const applyGlobalHydrationFix = () => {
  if (typeof window !== 'undefined') {
    const removeExtensionAttributes = () => {
      const elements = document.querySelectorAll('*');
      elements.forEach(element => {
        if (element.removeAttribute) {
          element.removeAttribute('bis_skin_checked');
          element.removeAttribute('data-adblockkey');
          element.removeAttribute('data-adblock');
          element.removeAttribute('data-adblocker');
          element.removeAttribute('data-adblock-detected');
        }
      });
    };

    removeExtensionAttributes();

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', removeExtensionAttributes);
    }

    setInterval(removeExtensionAttributes, 1000);

    const observer = new MutationObserver(() => {
      removeExtensionAttributes();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['bis_skin_checked', 'data-adblockkey', 'data-adblock', 'data-adblocker', 'data-adblock-detected']
    });
  }
};
