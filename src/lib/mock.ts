// Simple mock data generators for API routes
import type { Battery, Inverter, Generator, Charger, GridStatus, KPIs } from './types'

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function rint(min: number, max: number) {
  return Math.floor(rand(min, max + 1))
}

function rbool(p = 0.5) {
  return Math.random() < p
}

export function timestamp() {
  return new Date().toISOString()
}

export function generateBattery(overrides: Partial<Battery> = {}) {
  const base: Battery = {
    id: 'battery-1',
    capacity_kwh: 120,
    state_of_charge: rint(10, 95),
    charging: rbool(0.6),
    updated_at: timestamp(),
  }
  return { ...base, ...overrides }
}

export function generateInverters(count = 3, overrides: Partial<Inverter> = {}) {
  return Array.from({ length: count }).map((_, i) => ({
    id: `inverter-${i + 1}`,
    name: `Inverter ${i + 1}`,
    active_power_kw: Number(rand(0.2, 25).toFixed(2)),
    temperature_c: Number(rand(25, 65).toFixed(1)),
    updated_at: timestamp(),
    ...overrides,
  })) as Inverter[]
}

export function generateGenerator(overrides: Partial<Generator> = {}) {
  const running = rbool(0.2)
  const base: Generator & { updated_at?: string } = {
    id: 'generator-1',
    running,
    output_kw: running ? Number(rand(5, 80).toFixed(2)) : 0,
    updated_at: timestamp(),
  }
  return { ...base, ...overrides }
}

export function generateChargers(count = 2, overrides: Partial<Charger> = {}) {
  return Array.from({ length: count }).map((_, i) => ({
    id: `charger-${i + 1}`,
    vehicle: rbool(0.6) ? `EV-${rint(100, 999)}` : undefined,
    charging_kw: Number((rbool(0.7) ? rand(3, 22) : 0).toFixed(2)),
    plugged_in: rbool(0.7),
    kwhFromBattery: Number((rbool(0.5) ? rand(0, 20) : 0).toFixed(2)),
    revenueEUR: Number((rbool(0.5) ? rand(0, 200) : 0).toFixed(2)),
    updated_at: timestamp(),
    ...overrides,
  })) as Charger[]
}

export function generateGrid(overrides: Partial<GridStatus> = {}) {
  // import positive = importing from grid; export positive = exporting
  const import_kw = Number(rand(0, 20).toFixed(2))
  const export_kw = Number((Math.max(0, rand(-5, 10)) > 5 ? rand(0, 6) : 0).toFixed(2))
  const base: GridStatus & { updated_at?: string } = {
    connected: true,
    import_kw,
    export_kw,
    updated_at: timestamp(),
  }
  return { ...base, ...overrides }
}

export function generateKPIs(overrides: Partial<KPIs> = {}) {
  const inverters = generateInverters(3)
  const generation = inverters.reduce((s, inv) => s + inv.active_power_kw, 0)
  const battery = generateBattery()
  const grid = generateGrid()

  const base: KPIs & { updated_at?: string } = {
    total_site_load_kw: Number(rand(5, 60).toFixed(2)),
    total_generation_kw: Number(generation.toFixed(2)),
    battery_soc_percent: battery.state_of_charge,
    grid_import_kw: grid.import_kw,
    grid_export_kw: grid.export_kw,
    updated_at: timestamp(),
  }
  return { ...base, ...overrides }
}

const MOCK = {
  generateBattery,
  generateInverters,
  generateGenerator,
  generateChargers,
  generateGrid,
  generateKPIs,
}

export default MOCK

// --- Series generators for revenue graphs ---
export function generatePvSelfSeries(points = 24) {
  const series: Array<{ t: string; savedEUR: number; consumptionKwh: number; priceEUR: number }> = []
  let baseSaved = 0
  for (let i = 0; i < points; i++) {
    const t = new Date(Date.now() - (points - i) * 3600 * 1000).toISOString()
    const consumptionKwh = Number((Math.random() * 5 + 1).toFixed(2))
    const priceEUR = Number((0.08 + Math.random() * 0.12).toFixed(3))
    baseSaved += consumptionKwh * priceEUR * (0.3 + Math.random() * 0.5)
    series.push({ t, savedEUR: Number(baseSaved.toFixed(2)), consumptionKwh, priceEUR })
  }
  return series
}

export function generateRecoupedSeries(points = 24) {
  const series: Array<{ t: string; cumulativeEUR: number }> = []
  let cumulative = 0
  for (let i = 0; i < points; i++) {
    const t = new Date(Date.now() - (points - i) * 3600 * 1000).toISOString()
    const delta = Number((Math.random() * 20 + 5).toFixed(2))
    cumulative += delta
    series.push({ t, cumulativeEUR: Number(cumulative.toFixed(2)) })
  }
  return series
}

// Centralized scenario mapping for QA/demo scenarios
// Typed scenario configuration
export type ScenarioName =
  | 'battery-protect'
  | 'battery-full'
  | 'battery-low'
  | 'inverter-dim'
  | 'inverter-off'
  | 'generator-on'
  | 'generator-off'
  | 'ev-profit-spike'
  | 'zero-export'
  | 'import-heavy'

type EndpointOverrides = Partial<{
  battery: Partial<Battery>
  inverters: Partial<Inverter>
  generator: Partial<Generator>
  chargers: Partial<Charger>
  grid: Partial<GridStatus>
  kpis: Partial<KPIs>
}>

type ScenarioConfig = {
  label: string
  endpoints?: EndpointOverrides
  seriesMultiplier?: Record<string, number>
}

const SCENARIO_CONFIG: Record<ScenarioName, ScenarioConfig> = {
  'battery-protect': {
    label: 'Battery: protect (low SOC)',
    endpoints: { battery: { state_of_charge: 15, charging: false }, kpis: { battery_soc_percent: 15 } },
  },
  'battery-full': { label: 'Battery: full', endpoints: { battery: { state_of_charge: 99, charging: false } } },
  'battery-low': { label: 'Battery: very low', endpoints: { battery: { state_of_charge: 5, charging: true } } },
  'inverter-dim': { label: 'Inverters: dim', endpoints: { inverters: { active_power_kw: 0.5 } } },
  'inverter-off': { label: 'Inverters: off', endpoints: { inverters: { active_power_kw: 0 } } },
  'generator-on': { label: 'Generator: on', endpoints: { generator: { running: true, output_kw: 60 } } },
  'generator-off': { label: 'Generator: off', endpoints: { generator: { running: false, output_kw: 0 } } },
  'ev-profit-spike': {
    label: 'EV: revenue spike',
    endpoints: { chargers: { revenueEUR: 1200, kwhFromBattery: 50 }, kpis: { total_site_load_kw: 120 } },
    seriesMultiplier: { recouped: 1.5, pv_self: 1.6 },
  },
  'zero-export': { label: 'Grid: zero-export', endpoints: { grid: { export_kw: 0 } } },
  'import-heavy': { label: 'Grid: import-heavy', endpoints: { grid: { import_kw: 50 } } },
}

export const SCENARIOS: Array<{ value: ScenarioName; label: string }> = Object.keys(SCENARIO_CONFIG).map((k) => ({ value: k as ScenarioName, label: SCENARIO_CONFIG[k as ScenarioName].label }))

export function getScenarioOverrides<T extends keyof EndpointOverrides>(endpoint: T, scenario?: ScenarioName | string | null): EndpointOverrides[T] {
  if (!scenario) return {} as EndpointOverrides[T]
  const cfg = (SCENARIO_CONFIG as Record<string, ScenarioConfig>)[scenario]
  if (!cfg || !cfg.endpoints) return {} as EndpointOverrides[T]
  return (cfg.endpoints as EndpointOverrides)[endpoint] ?? ({} as EndpointOverrides[T])
}

export function getSeriesMultiplier(seriesName: string, scenario?: ScenarioName | string | null) {
  if (!scenario) return 1
  const cfg = (SCENARIO_CONFIG as Record<string, ScenarioConfig>)[scenario]
  if (!cfg || !cfg.seriesMultiplier) return 1
  return cfg.seriesMultiplier[seriesName] ?? 1
}
