import { useEffect, useState } from "react";

export const useHydrationFix = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

// Component wrapper to prevent hydration mismatches
export const ClientOnly = ({ children, fallback = null }) => {
  const isClient = useHydrationFix();

  if (!isClient) {
    return fallback;
  }

  return children;
};

// Hook to clean up browser extension attributes
export const useCleanupAttributes = (ref) => {
  useEffect(() => {
    if (ref?.current) {
      const removeExtensionAttributes = (element) => {
        if (element && element.removeAttribute) {
          element.removeAttribute('bis_skin_checked');
          element.removeAttribute('data-adblockkey');
          element.removeAttribute('data-adblock');
          element.removeAttribute('data-adblocker');
          element.removeAttribute('data-adblock-detected');
        }

        if (element.children) {
          Array.from(element.children).forEach(removeExtensionAttributes);
        }
      };

      removeExtensionAttributes(ref.current);
      setTimeout(() => removeExtensionAttributes(ref.current), 100);
    }
  }, [ref]);
};
