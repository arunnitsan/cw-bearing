import { useTranslation as useTranslationOriginal } from "../components/i18n/client";

// Safe wrapper for useTranslation that handles errors gracefully
export const useTranslation = (lng, ns, options) => {
  try {
    return useTranslationOriginal(lng, ns, options);
  } catch (error) {
    console.error('Translation error:', error);
    console.error('Parameters:', { lng, ns, options });

    // Return fallback translation object
    return {
      t: (key) => {
        console.warn(`Translation fallback used for key: ${key}`);
        return key; // Return the key itself as fallback
      },
      i18n: {
        language: lng || 'en',
        changeLanguage: () => {},
      }
    };
  }
};

// Safe translation function that can be used without hooks
export const safeTranslate = (key, lng = 'en') => {
  try {
    // This is a simple fallback - in a real implementation you might want to load translations
    return key;
  } catch (error) {
    console.error(`Translation error for key ${key}:`, error);
    return key;
  }
};
