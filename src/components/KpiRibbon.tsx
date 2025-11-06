"use client"

import React from 'react'

type KPI = { label: string; value: string; delta?: string }

export default function KpiRibbon({ items }: { items?: KPI[] }) {
  const list: KPI[] =
    items || [
      { label: 'Savings', value: '$124', delta: '+4%' },
      { label: 'Week', value: '−3.2 kWh' },
      { label: 'Month', value: '32 kWh' },
      { label: 'EV margin', value: '12 kWh' },
      { label: 'Autonomy', value: '78%' },
    ]

  return (
    <div className="flex gap-3 overflow-x-auto py-2" role="list" aria-live="polite">
      {list.map((i, idx) => (
        <div key={idx} role="listitem" className="min-w-[140px] p-3 rounded-lg glass" aria-label={`${i.label}: ${i.value}`}>
          <div className="text-xs text-muted">{i.label}</div>
          <div className="text-lg font-semibold">{i.value} {i.delta && <span className="text-sm text-muted">{i.delta}</span>}</div>
        </div>
      ))}
    </div>
  )
}
