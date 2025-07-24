import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const useTranslationDebug = (namespace = 'common') => {
  const { t, i18n, ready } = useTranslation(namespace);
  const router = useRouter();
  const [isTranslationReady, setIsTranslationReady] = useState(false);

  useEffect(() => {
    // Check if translations are properly loaded
    if (ready && i18n.language) {
      const hasTranslations = i18n.hasResourceBundle(i18n.language, namespace);
      setIsTranslationReady(hasTranslations);
    }
  }, [i18n.language, ready, namespace, i18n, router.locale]);

  // Get domain-specific default locale
  const getDomainDefaultLocale = () => {
    if (typeof window !== 'undefined') {
      const host = window.location.host;
      if (host.includes('cwbearing.de')) {
        return 'de';
      } else if (host.includes('www.cwbearing.com')) {
        return 'us';
      }
    }
    return 'de'; // fallback default
  };

  // Enhanced translation function with domain-specific fallback
  const tWithFallback = (key, options = {}) => {
    if (!ready) {
      return key; // Return key if translations aren't ready yet
    }

    const translation = t(key, options);

    // If translation returns the key itself, it means the key wasn't found
    if (translation === key) {
      // Try to get from domain-specific default locale first
      const domainDefault = getDomainDefaultLocale();
      if (i18n.language !== domainDefault) {
        const domainFallbackTranslation = i18n.t(key, {
          ...options,
          lng: domainDefault,
          fallbackLng: domainDefault
        });
        if (domainFallbackTranslation !== key) {
          return domainFallbackTranslation;
        }
      }

      // If domain-specific fallback failed, try German as ultimate fallback
      if (domainDefault !== 'de') {
        const germanFallbackTranslation = i18n.t(key, {
          ...options,
          lng: 'de',
          fallbackLng: 'de'
        });
        if (germanFallbackTranslation !== key) {
          return germanFallbackTranslation;
        }
      }

      // If still not found, return a more user-friendly fallback
      return key.split('.').pop() || key;
    }

    return translation;
  };

  return {
    t: tWithFallback,
    i18n,
    ready: isTranslationReady,
    isTranslationReady
  };
};
