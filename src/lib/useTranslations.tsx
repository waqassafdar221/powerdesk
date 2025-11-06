"use client"

import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import en from '../locales/en.json'
import nl from '../locales/nl.json'

const DICTS: Record<string, Record<string, string>> = { en, nl }
const SUPPORTED = ['en', 'nl']

function localeFromPath(pathname?: string) {
  if (!pathname) return 'en'
  const parts = pathname.split('/')
  const first = parts[1]
  if (SUPPORTED.includes(first)) return first
  return 'en'
}

export default function useTranslations() {
  const pathname = usePathname()
  // try to read NEXT_LOCALE cookie set by Next.js when navigating with locale
  let cookieLocale: string | undefined
  if (typeof document !== 'undefined') {
    const m = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]+)/)
    cookieLocale = m ? decodeURIComponent(m[1]) : undefined
  }

  const locale = cookieLocale ?? localeFromPath(pathname ?? '/')

  const dict = useMemo(() => DICTS[locale] ?? DICTS['en'], [locale])

  function t(key: string) {
    return dict[key] ?? key
  }

  return { t, locale }
}
