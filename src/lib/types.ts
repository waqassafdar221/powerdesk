// Shared domain types for Powerdesk (minimal starter shapes)

export interface Battery {
  id: string
  capacity_kwh: number
  state_of_charge: number // 0-100
  charging: boolean
  updated_at?: string
}

export interface Inverter {
  id: string
  name?: string
  // rated capacity (kW) used for UI percent calculations
  rated_kw?: number
  // optional reason why the inverter is dimmed in mocks/UI
  dimmedReason?: string | null
  active_power_kw: number
  temperature_c?: number
  updated_at?: string
}

export interface GridStatus {
  connected: boolean
  import_kw: number
  export_kw: number
  updated_at?: string
}

export interface Generator {
  id: string
  running: boolean
  output_kw: number
  updated_at?: string
}

export interface Charger {
  id: string
  vehicle?: string
  charging_kw: number
  plugged_in: boolean
  updated_at?: string
  // optional analytics/demo fields used by mocks
  kwhFromBattery?: number
  revenueEUR?: number
}

export interface KPIs {
  total_site_load_kw: number
  total_generation_kw: number
  battery_soc_percent: number
  grid_import_kw: number
  grid_export_kw: number
  updated_at?: string
}

export interface Prices {
  timestamp: string
  energy_price_per_kwh: number
  currency?: string
}

export type APICollection = {
  batteries?: Battery[]
  inverters?: Inverter[]
  grid?: GridStatus
  generators?: Generator[]
  chargers?: Charger[]
  kpis?: KPIs
  prices?: Prices[]
}

export default APICollection
