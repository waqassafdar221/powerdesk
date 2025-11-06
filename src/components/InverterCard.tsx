"use client"

import React, { useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'

type Props = {
  id: string
  name?: string
  percent?: number
  kw?: number
  dimmedReason?: string | null
}

export default function InverterCard({ id, name, percent = 0, kw = 6.2, dimmedReason }: Props) {
  // accept a float percent for smoother animation; clamp to [0,100]
  const width = Math.max(0, Math.min(100, Number(percent) || 0))
  const prev = useRef<number>(width)
  const barControls = useAnimation()
  const cardControls = useAnimation()

  useEffect(() => {
    // animate bar to new width
    barControls.start({ width: `${width}%`, transition: { duration: 0.8, ease: 'easeOut' } })

    // pulse card on change for a subtle micro-interaction
    if (prev.current !== width) {
      cardControls.start({ scale: [1, 1.02, 1], transition: { duration: 0.5 } })
      prev.current = width
    }
  }, [width, barControls, cardControls])

  return (
    <motion.div
      animate={cardControls}
      initial={false}
      className={`p-4 rounded-lg glass ${dimmedReason ? 'opacity-60' : ''}`}
      role="group"
      aria-labelledby={`${id}-title`}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 id={`${id}-title`} className="text-sm font-semibold">{name || id}</h3>
          <div className="text-xs text-muted">{kw} kW</div>
        </div>

  <div className="text-sm font-medium" aria-live="polite">{Math.round(width)}%</div>
      </div>

      <div className="w-full bg-border h-3 rounded-full overflow-hidden" aria-hidden>
        <motion.div
          style={{ width: `${width}%` }}
          animate={barControls}
          className="h-3 bg-gradient-to-r from-brand-500 to-brand-700"
        />
      </div>

      {dimmedReason && <div className="mt-3 text-xs text-muted">Dimmed due to {dimmedReason}</div>}
    </motion.div>
  )
}
