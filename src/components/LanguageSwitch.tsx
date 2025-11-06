"use client"

import React from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import useTranslations from '../lib/useTranslations'

export default function LanguageSwitch() {
  const pathname = usePathname() || '/'
  useSearchParams()
  const { locale, t } = useTranslations()
  const router = useRouter()

  async function handleClick(e: React.MouseEvent, code: string) {
    e.preventDefault()
    // set NEXT_LOCALE cookie so our useTranslations hook (which checks this
    // cookie) sees the new locale immediately
    try {
      document.cookie = `NEXT_LOCALE=${encodeURIComponent(code)}; path=/`
    } catch {}
    // Instead of navigating to a locale-prefixed URL (which can 404 in some
    // dev setups), reload the current page after setting the cookie so the
    // client-side translation hook picks up the new locale. This avoids the
    // 404 on paths like `/nl` or `/nl/dashboard` seen in some dev servers.
    try {
      // Use router.replace to avoid adding history entry, then reload
      router.replace(pathname)
    } catch {}
    // Full reload to ensure any client-side hooks read the cookie.
    setTimeout(() => window.location.reload(), 50)
  }

  return (
    <div className="flex items-center gap-2">
      <a href={pathname} onClick={(e) => handleClick(e, 'en')} className={`px-2 py-1 rounded ${locale === 'en' ? 'bg-foreground/8' : 'hover:bg-foreground/4'}`}>
        {t('lang.en')}
      </a>
      <a href={pathname} onClick={(e) => handleClick(e, 'nl')} className={`px-2 py-1 rounded ${locale === 'nl' ? 'bg-foreground/8' : 'hover:bg-foreground/4'}`}>
        {t('lang.nl')}
      </a>
    </div>
  )
}
