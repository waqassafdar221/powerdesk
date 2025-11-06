"use client"

import React from 'react'

export default function Skeleton({ rows = 3, className = '' }: { rows?: number; className?: string }) {
  return (
    <div className={`animate-pulse space-y-2 ${className}`} aria-hidden>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-3 bg-foreground/6 dark:bg-foreground/10 rounded" />
      ))}
    </div>
  )
}
