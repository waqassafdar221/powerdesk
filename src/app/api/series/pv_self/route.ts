import { NextResponse } from 'next/server'
import { generatePvSelfSeries, getSeriesMultiplier } from '../../../../lib/mock'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const scenario = url.searchParams.get('scenario')

  const mult = getSeriesMultiplier('pv_self', scenario)
  const data = generatePvSelfSeries(48).map((d) => ({ ...d, savedEUR: Number((d.savedEUR * mult).toFixed(2)) }))
  return NextResponse.json(data)
}
