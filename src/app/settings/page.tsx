"use client"

import React from 'react'
import useSettingsStore from '../../store/settings'
import AppShell from '../../components/AppShell'
import Panel from '../../components/Panel'
import { SCENARIOS } from '../../lib/mock'

export default function SettingsPage() {
  const {
    nightReservePercent,
    eveningTargetPercent,
    minReservePercent,
    zeroExport,
    negativePriceCurtailment,
    generatorThresholdKw,
    tariffMode,
    maxChargeRateKw,
    setNightReserve,
    setEveningTarget,
    setMinReserve,
    setZeroExport,
    setNegativePriceCurtailment,
    setGeneratorThreshold,
    setTariffMode,
    setMaxChargeRate,
    reset,
  } = useSettingsStore()

  // scenario selector
  const { scenario, setScenario } = useSettingsStore()

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-6">
        <Panel title="Operator Settings">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Night reserve (%)</label>
              <input
                type="range"
                min={0}
                max={50}
                value={nightReservePercent}
                onChange={(e) => setNightReserve(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-xs text-muted">{nightReservePercent}%</div>
            </div>

            <div>
              <label className="block text-sm font-medium">Evening target (%)</label>
              <input
                type="range"
                min={0}
                max={50}
                value={eveningTargetPercent}
                onChange={(e) => setEveningTarget(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-xs text-muted">{eveningTargetPercent}%</div>
            </div>

            <div>
              <label className="block text-sm font-medium">Min reserve (%)</label>
              <input
                type="number"
                min={0}
                max={50}
                value={minReservePercent}
                onChange={(e) => setMinReserve(Number(e.target.value))}
                className="w-32 mt-1"
              />
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm">Zero export</label>
              <input type="checkbox" checked={zeroExport} onChange={(e) => setZeroExport(e.target.checked)} />
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm">Curtail on negative price</label>
              <input type="checkbox" checked={negativePriceCurtailment} onChange={(e) => setNegativePriceCurtailment(e.target.checked)} />
            </div>

            <div>
              <label className="block text-sm">Generator threshold (kW)</label>
              <input type="number" value={generatorThresholdKw} onChange={(e) => setGeneratorThreshold(Number(e.target.value))} className="w-32 mt-1" />
            </div>

            <div>
              <label className="block text-sm">Tariff mode</label>
              <select value={tariffMode} onChange={(e) => setTariffMode(e.target.value as 'flat' | 'time-of-use' | 'dynamic')} className="mt-1">
                <option value="flat">Flat</option>
                <option value="time-of-use">Time of use</option>
                <option value="dynamic">Dynamic</option>
              </select>
            </div>

            <div>
              <label className="block text-sm">Max charge rate (kW)</label>
              <input type="number" value={maxChargeRateKw} onChange={(e) => setMaxChargeRate(Number(e.target.value))} className="w-32 mt-1" />
            </div>

            <div className="pt-4">
              <button className="rounded-full bg-brand-600 px-4 py-2 text-white mr-2" onClick={() => reset()}>Reset</button>
              <div className="mt-4">
                <label className="block text-sm font-medium">QA Scenario</label>
                <select value={scenario ?? ''} onChange={(e) => setScenario(e.target.value || null)} className="mt-1">
                  <option value="">(none)</option>
                  {SCENARIOS.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
                {scenario && <div className="text-xs text-muted mt-2">Active scenario: <strong>{scenario}</strong></div>}
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </AppShell>
  )
}
