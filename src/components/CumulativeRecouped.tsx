"use client"

import React from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

type Point = { t: string; cumulativeEUR: number }

export default function CumulativeRecouped({ data }: { data?: Point[] }) {
  const series = data || []

  // compute time to payback (simple heuristic: when cumulative crosses 1000 EUR)
  const target = 1000
  const reached = series.find((s) => s.cumulativeEUR >= target)
  const timeToPayback = reached ? new Date(reached.t).toLocaleString() : null

  if (!series.length) {
    return (
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-semibold">Cumulative recouped</div>
          <div className="text-xs text-muted">Payback not reached</div>
        </div>
        <div style={{ width: '100%', height: 180 }} aria-label="Cumulative recouped over time">
          <div className="h-[160px] rounded bg-foreground/6 dark:bg-foreground/10" />
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-semibold">Cumulative recouped</div>
        {timeToPayback ? (
          <div className="text-xs bg-foreground/6 dark:bg-foreground/10 px-2 py-1 rounded">Payback: {timeToPayback}</div>
        ) : (
          <div className="text-xs text-muted">Payback not reached</div>
        )}
      </div>
      <div style={{ width: '100%', height: 180 }} aria-label="Cumulative recouped over time">
        <ResponsiveContainer>
          <LineChart data={series} margin={{ top: 6, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.04} />
            <XAxis dataKey="t" tick={false} />
            <YAxis />
            <Tooltip formatter={(v: unknown) => (typeof v === 'number' ? (v as number).toFixed(2) + '€' : String(v))} />
            <Line type="monotone" dataKey="cumulativeEUR" stroke="#7c8af8" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
