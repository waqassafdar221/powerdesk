import { NextResponse } from 'next/server'
import { generateInverters, getScenarioOverrides } from '../../../lib/mock'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const scenario = url.searchParams.get('scenario')

  const overrides = getScenarioOverrides('inverters', scenario)
  const data = generateInverters(3, overrides)
  return NextResponse.json(data)
}
