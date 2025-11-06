import { NextResponse } from 'next/server'
import { generateGenerator, getScenarioOverrides } from '../../../lib/mock'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const scenario = url.searchParams.get('scenario')

  const overrides = getScenarioOverrides('generator', scenario)
  const data = generateGenerator(overrides)
  return NextResponse.json(data)
}
