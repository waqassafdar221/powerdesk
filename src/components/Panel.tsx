"use client"

import React from 'react'
import { motion } from 'framer-motion'

type PanelProps = React.PropsWithChildren<{
  title?: React.ReactNode
  className?: string
  glow?: string
}>

export default function Panel({ title, children, className = '', glow }: PanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`rounded-xl border border-border glass overflow-hidden ${className}`}
    >
      <div className="relative">
        <div
          style={{ height: 6, background: glow || 'linear-gradient(90deg, rgba(124,138,248,0.9), rgba(41,56,191,0.8))' }}
          className="w-full"
        />
          {title && (
            <header className="px-4 pt-4 pb-2">
              <h2 className="text-sm font-semibold">{title}</h2>
            </header>
          )}
      </div>

      <div className={`p-4 ${title ? 'pt-0' : ''}`}>{children}</div>
    </motion.div>
  )
}
