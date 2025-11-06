import { NextResponse } from 'next/server'
import { generateKPIs, getScenarioOverrides } from '../../../lib/mock'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const scenario = url.searchParams.get('scenario')

  const overrides = getScenarioOverrides('kpis', scenario)
  const data = generateKPIs(overrides)
  return NextResponse.json(data)
}
