'use client'

import { useEffect, useState } from 'react'
import i18next from 'i18next'
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { getOptions,languages } from './settings'

const runsOnServerSide = typeof window === 'undefined'

//
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend((language, namespace) => import(`./locales/${language}/common.json`)))
  .init({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
    preload: runsOnServerSide ? languages : [],
    fallbackLng: 'de', // Ensure fallback is set
    supportedLngs: languages, // Ensure supported languages are set
  })

export function useTranslation(lng, ns, options) {
  const ret = useTranslationOrg(ns, options)
  const { i18n } = ret

  // Always call hooks in the same order (Rules of Hooks)
  const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage)

  // Server-side language change (synchronous)
  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng)
  }

  // Client-side effects (only run on client)
  useEffect(() => {
    if (runsOnServerSide) return // Skip on server
    if (activeLng === i18n.resolvedLanguage) return
    setActiveLng(i18n.resolvedLanguage)
  }, [activeLng, i18n.resolvedLanguage])

  useEffect(() => {
    if (runsOnServerSide) return // Skip on server
    if (!lng || i18n.resolvedLanguage === lng) return
    i18n.changeLanguage(lng)
  }, [lng, i18n])

  return ret
}
