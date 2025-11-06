import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type TariffMode = 'flat' | 'time-of-use' | 'dynamic'

type SettingsState = {
  // operator controls
  nightReservePercent: number // e.g., keep X% battery for night
  eveningTargetPercent: number // evening target percent (additional to reserve)
  minReservePercent: number // absolute minimum reserve
  zeroExport: boolean // prevent exporting to grid
  negativePriceCurtailment: boolean // curtail when price negative
  generatorThresholdKw: number // start generator when site load > threshold
  tariffMode: TariffMode
  maxChargeRateKw: number
  // QA scenario selector (null = off)
  scenario: string | null

  // actions
  setNightReserve: (v: number) => void
  setEveningTarget: (v: number) => void
  setMinReserve: (v: number) => void
  setZeroExport: (v: boolean) => void
  setNegativePriceCurtailment: (v: boolean) => void
  setGeneratorThreshold: (v: number) => void
  setTariffMode: (v: TariffMode) => void
  setMaxChargeRate: (v: number) => void
  setScenario: (s: string | null) => void
  reset: () => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
  nightReservePercent: 20,
  eveningTargetPercent: 15,
  minReservePercent: 5,
    scenario: null,
      zeroExport: false,
      negativePriceCurtailment: false,
      generatorThresholdKw: 40,
      tariffMode: 'flat' as TariffMode,
      maxChargeRateKw: 50,

  setNightReserve: (v: number) => set(() => ({ nightReservePercent: v })),
  setEveningTarget: (v: number) => set(() => ({ eveningTargetPercent: v })),
      setMinReserve: (v: number) => set(() => ({ minReservePercent: v })),
      setZeroExport: (v: boolean) => set(() => ({ zeroExport: v })),
      setNegativePriceCurtailment: (v: boolean) => set(() => ({ negativePriceCurtailment: v })),
      setGeneratorThreshold: (v: number) => set(() => ({ generatorThresholdKw: v })),
      setTariffMode: (v: TariffMode) => set(() => ({ tariffMode: v })),
      setMaxChargeRate: (v: number) => set(() => ({ maxChargeRateKw: v })),
      setScenario: (s: string | null) => set(() => ({ scenario: s })),
      reset: () =>
        set(() => ({
          nightReservePercent: 20,
          eveningTargetPercent: 15,
          minReservePercent: 5,
              scenario: null,
          zeroExport: false,
          negativePriceCurtailment: false,
          generatorThresholdKw: 40,
          tariffMode: 'flat',
          maxChargeRateKw: 50,
        })),
    }),
    {
      name: 'powerdesk-settings',
      // use localStorage (default) — safe in browser only
    }
  )
)

export default useSettingsStore
