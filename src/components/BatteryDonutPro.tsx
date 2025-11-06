"use client"

import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { motion, useSpring } from 'framer-motion'

type Props = {
  soc_percent?: number
  reservePercent?: number
  eveningPercent?: number
}

export default function BatteryDonutPro({ soc_percent = 68, reservePercent = 20, eveningPercent = 15 }: Props) {
  // define segments (reserve, evening, usable)
  const reserve = reservePercent
  const evening = eveningPercent
  const usable = Math.max(0, soc_percent - reserve - evening)

  const data = [
    { name: 'reserve', value: reserve },
    { name: 'evening', value: evening },
    { name: 'usable', value: usable },
  ]

  const colors = ['#ef4444', '#f59e0b', '#10b981']

  // animate center value
  const spring = useSpring(soc_percent, { stiffness: 120, damping: 20 })

  return (
  <div style={{ width: 220, height: 220 }} className="mx-auto" role="img" aria-label={`Battery state of charge ${soc_percent}%`}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={70}
            outerRadius={100}
            startAngle={90}
            endAngle={-270}
            paddingAngle={2}
          >
            {data.map((entry, i) => (
              <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

  <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.span className="text-2xl font-bold" style={{}} aria-live="polite">
            {Math.round(spring.get())}%
          </motion.span>
          <div className="text-xs text-muted">SOC</div>
        </motion.div>
      </div>
    </div>
  )
}
