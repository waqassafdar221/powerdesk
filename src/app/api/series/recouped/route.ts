import { NextResponse } from 'next/server'
import { generateRecoupedSeries, getSeriesMultiplier } from '../../../../lib/mock'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const scenario = url.searchParams.get('scenario')

  const mult = getSeriesMultiplier('recouped', scenario)
  const data = generateRecoupedSeries(48).map((d) => ({ ...d, cumulativeEUR: Number((d.cumulativeEUR * mult).toFixed(2)) }))
  return NextResponse.json(data)
}
