"use client"

import React from 'react'
import useSWR from 'swr'
import AppShell from '../../components/AppShell'
import Panel from '../../components/Panel'
import BatteryDonutPro from '../../components/BatteryDonutPro'
import InverterCard from '../../components/InverterCard'
import KpiRibbon from '../../components/KpiRibbon'
import AreaSavings from '../../components/AreaSavings'
import CumulativeRecouped from '../../components/CumulativeRecouped'
import apiFetch from '../../lib/fetcher'
import useSettingsStore from '../../store/settings'
import useTranslations from '../../lib/useTranslations'
import type { Battery, Inverter, Charger, GridStatus, Generator, KPIs } from '../../lib/types'

export default function DashboardPage() {
  // QA scenario from settings
  const { scenario } = useSettingsStore()

  const withScenario = (path: string) => (scenario ? `${path}?scenario=${encodeURIComponent(scenario)}` : path)
  const { t } = useTranslations()

  const { data: battery, error: batteryError } = useSWR<Battery | undefined>(() => withScenario('/battery'), () => apiFetch<Battery>('battery'), { refreshInterval: 4000 })
  const { data: inverters, error: invertersError } = useSWR<Inverter[] | undefined>(() => withScenario('/inverters'), () => apiFetch<Inverter[]>('inverters'), { refreshInterval: 4000 })
  const { data: grid, error: gridError } = useSWR<GridStatus | undefined>(() => withScenario('/grid'), () => apiFetch<GridStatus>('grid'), { refreshInterval: 4000 })
  const { data: generator, error: generatorError } = useSWR<Generator | undefined>(() => withScenario('/generator'), () => apiFetch<Generator>('generator'), { refreshInterval: 4000 })
  const { data: chargers, error: chargersError } = useSWR<Charger[] | undefined>(() => withScenario('/chargers'), () => apiFetch<Charger[]>('chargers'), { refreshInterval: 4000 })
  const { data: kpis, error: kpisError } = useSWR<KPIs | undefined>(() => withScenario('/kpis'), () => apiFetch<KPIs>('kpis'), { refreshInterval: 4000 })
  const { data: pvSelf, error: pvSelfError } = useSWR<Array<{ t: string; savedEUR: number; consumptionKwh: number; priceEUR: number }> | undefined>(() => withScenario('/series/pv_self'), () => apiFetch('/series/pv_self'), { refreshInterval: 4000 })
  const { data: recouped, error: recoupedError } = useSWR<Array<{ t: string; cumulativeEUR: number }> | undefined>(() => withScenario('/series/recouped'), () => apiFetch('/series/recouped'), { refreshInterval: 4000 })

  // settings-driven flags
  const {
    nightReservePercent,
    eveningTargetPercent,
    minReservePercent,
  } = useSettingsStore()

  const soc = battery?.state_of_charge ?? 0
  const reserve = nightReservePercent
  const evening = eveningTargetPercent
  const eveningTarget = reserve + evening
  const lowWarning = soc < minReservePercent
  const needsEveningHint = soc < eveningTarget && !lowWarning

  return (
    <AppShell>
      <div className="space-y-6">
  <Panel title={t('panel.kpis')}>
          {kpisError ? (
            <div className="text-sm text-red-400">Error loading KPIs</div>
          ) : !kpis ? (
            <div className="p-4"><div className="h-12" /><div className="mt-2"><div className="h-8 rounded bg-foreground/6 dark:bg-foreground/10" /></div></div>
          ) : (
            <KpiRibbon items={
              [
                { label: t('kpi.site_load'), value: `${kpis.total_site_load_kw} kW` },
                { label: t('kpi.generation'), value: `${kpis.total_generation_kw} kW` },
                { label: t('kpi.battery_soc'), value: `${kpis.battery_soc_percent}%` },
                { label: t('kpi.grid_import'), value: `${kpis.grid_import_kw} kW` },
                { label: t('kpi.grid_export'), value: `${kpis.grid_export_kw} kW` },
              ]
            } />
          )}
        </Panel>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Panel title={t('panel.battery')}>
              <div className="flex flex-col items-center">
                {batteryError ? (
                  <div className="text-sm text-red-400">Error loading battery</div>
                ) : !battery ? (
                  <div style={{ width: 220, height: 220 }} className="mx-auto">
                    <div className="h-[220px] rounded bg-foreground/6 dark:bg-foreground/10" />
                  </div>
                ) : (
                  <BatteryDonutPro soc_percent={battery?.state_of_charge ?? 0} reservePercent={reserve} eveningPercent={evening} />
                )}

                <div className="mt-4 text-sm">
                  {lowWarning && <span className="text-red-400 font-semibold">Low battery — cannot discharge</span>}
                  {needsEveningHint && !lowWarning && <span className="text-yellow-400">Below evening target</span>}
                  {!battery && !batteryError && <span className="text-muted">Loading…</span>}
                </div>
              </div>
          </Panel>

          <Panel title={t('panel.grid')}>
              <div className="space-y-2">
                <div className="text-sm text-muted">Status</div>
                <div className="text-lg font-semibold">
                  {gridError ? (
                    <span className="text-sm text-red-400">Error loading grid</span>
                  ) : !grid ? (
                    <span className="text-muted">Loading…</span>
                  ) : grid.import_kw > 0 ? (
                    <span className="text-emerald-400">IMPORT {grid.import_kw} kW</span>
                  ) : grid.export_kw > 0 ? (
                    <span className="text-sky-400">EXPORT {grid.export_kw} kW</span>
                  ) : (
                    <span className="text-muted">Idle</span>
                  )}
                </div>
              </div>
          </Panel>

          <Panel title={t('panel.generator')}>
            <div className="space-y-2">
              <div className="text-sm text-muted">Status</div>
              <div className="text-lg font-semibold">
                {generatorError ? (
                  <span className="text-sm text-red-400">Error loading generator</span>
                ) : !generator ? (
                  'Loading…'
                ) : generator.running ? (
                  `${generator.output_kw} kW`
                ) : (
                  'Off'
                )}
              </div>
            </div>
          </Panel>
        </div>

  <Panel title={t('panel.inverters')}>
          {invertersError ? (
            <div className="text-sm text-red-400 p-4">Error loading inverters</div>
          ) : !inverters ? (
            <div className="p-4"><div className="h-32 rounded bg-foreground/6 dark:bg-foreground/10" /></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {inverters.map((inv: Inverter, idx: number) => {
                const rated = inv?.rated_kw ?? 25
                const percentFloat = ((inv?.active_power_kw ?? 0) / rated) * 100
                return (
                  <InverterCard
                    key={inv?.id ?? idx}
                    id={inv?.id ?? `inv-${idx}`}
                    name={inv?.name}
                    percent={percentFloat}
                    kw={inv?.active_power_kw ?? 0}
                    dimmedReason={inv?.dimmedReason ?? null}
                  />
                )
              })}
            </div>
          )}
        </Panel>

  <Panel title={t('panel.ev')}>
          {chargersError ? (
            <div className="text-sm text-red-400 p-4">Error loading chargers</div>
          ) : !chargers ? (
            <div className="p-4"><div className="h-32 rounded bg-foreground/6 dark:bg-foreground/10" /></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {chargers.map((c: Charger, i: number) => (
                <div key={c?.id ?? i} className="rounded-lg p-4 glass" role="group" aria-label={c?.vehicle ?? `Charger ${i + 1}`}>
                  <div className="text-sm font-semibold">{c?.vehicle ?? `Charger ${i + 1}`}</div>
                  <div className="text-xs text-muted">{c?.plugged_in ? `Charging ${c.charging_kw} kW` : 'Idle'}</div>
                </div>
              ))}
            </div>
          )}
        </Panel>

  <Panel title={t('panel.revenue')}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-2">
              {pvSelfError ? <div className="text-sm text-red-400 p-2">Error loading savings series</div> : <AreaSavings data={pvSelf} />}
            </div>
            <div className="p-2">
              {recoupedError ? <div className="text-sm text-red-400 p-2">Error loading recouped series</div> : <CumulativeRecouped data={recouped} />}
            </div>
          </div>
        </Panel>
      </div>
    </AppShell>
  )
}
