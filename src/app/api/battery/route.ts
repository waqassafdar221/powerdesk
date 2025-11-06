import { NextResponse } from 'next/server'
import { generateBattery, getScenarioOverrides } from '../../../lib/mock'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const scenario = url.searchParams.get('scenario')

  const overrides = getScenarioOverrides('battery', scenario)
  const data = generateBattery(overrides)
  return NextResponse.json(data)
}
