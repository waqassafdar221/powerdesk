import { NextResponse } from 'next/server'
import { generateGrid, getScenarioOverrides } from '../../../lib/mock'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const scenario = url.searchParams.get('scenario')

  const overrides = getScenarioOverrides('grid', scenario)
  const data = generateGrid(overrides)
  return NextResponse.json(data)
}
