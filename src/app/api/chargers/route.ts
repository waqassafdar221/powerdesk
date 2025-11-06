import { NextResponse } from 'next/server'
import { generateChargers, getScenarioOverrides } from '../../../lib/mock'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const scenario = url.searchParams.get('scenario')

  const overrides = getScenarioOverrides('chargers', scenario)
  const data = generateChargers(3, overrides)
  return NextResponse.json(data)
}
