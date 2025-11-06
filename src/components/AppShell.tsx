"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'
import LanguageSwitch from './LanguageSwitch'
import useTranslations from '../lib/useTranslations'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/'

  const { t } = useTranslations()

  const nav = [
    { name: t('nav.dashboard'), href: '/dashboard' },
    { name: t('nav.settings'), href: '/settings' },
  ]

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <aside className="w-72 border-r border-border bg-sidebar p-6">
          <div className="mb-8 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-brand-600/20 flex items-center justify-center text-brand-700 font-bold">PD</div>
          <div>
            <div className="text-sm font-semibold">{t('app.title')}</div>
            <div className="text-xs text-muted">{t('app.tagline')}</div>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          {nav.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-foreground/6 text-foreground dark:bg-foreground/10'
                    : 'text-muted hover:bg-foreground/4 dark:hover:bg-foreground/6'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-brand-500" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="mt-8 text-xs text-muted">© {new Date().getFullYear()} Powerdesk</div>
      </aside>

      <div className="flex-1 min-h-screen flex flex-col">
        <header className="glass sticky top-0 z-30 border-b border-border py-3 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold">{t('header.workspace')}</h2>
            <div className="text-sm text-muted">{t('header.subtitle')}</div>
          </div>

          <div className="flex items-center gap-3">
            <button aria-label="Notifications" className="p-2 rounded-md hover:bg-foreground/4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 17H9v-1a3 3 0 0 1 6 0v1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <ThemeToggle />
            <LanguageSwitch />
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
