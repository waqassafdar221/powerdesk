"use client"

import React from 'react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

type Point = { t: string; savedEUR: number; consumptionKwh: number; priceEUR: number }

export default function AreaSavings({ data }: { data?: Point[] }) {
  const series = data || []

  if (!series.length) {
    return (
      <div style={{ width: '100%', height: 220 }} aria-label="Self-consumption savings over time">
        <div className="p-4">
          <div className="text-sm text-muted">Self-consumption savings over time</div>
          <div className="mt-3">
            <div className="h-[180px] rounded bg-foreground/6 dark:bg-foreground/10" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ width: '100%', height: 220 }} aria-label="Self-consumption savings over time">
      <ResponsiveContainer>
        <AreaChart data={series} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.04} />
          <XAxis dataKey="t" tick={false} />
          <YAxis />
          <Tooltip formatter={(v: unknown) => (typeof v === 'number' ? (v as number).toFixed(2) : String(v))} />
          <Area type="monotone" dataKey="savedEUR" stroke="#10b981" fillOpacity={1} fill="url(#g1)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
