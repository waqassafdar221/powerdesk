"use client"

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // avoid synchronous setState in effect body (rulesafe): defer to next tick
    const id = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(id)
  }, [])

  if (!mounted) return null

  const current = theme === 'system' ? systemTheme : theme

  const toggle = () => {
    const next = current === 'dark' ? 'light' : 'dark'
    setTheme(next)
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="inline-flex items-center gap-3 rounded-full px-4 py-2 text-sm font-medium bg-foreground/6 text-foreground/90 dark:bg-foreground/10 dark:text-foreground transition-shadow shadow-sm hover:shadow-glass-md"
    >
      <span className="w-5 h-5 flex items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white text-xs">
        {current === 'dark' ? '🌙' : '☀️'}
      </span>
      <span>{current === 'dark' ? 'Dark' : 'Light'}</span>
    </button>
  )
}
