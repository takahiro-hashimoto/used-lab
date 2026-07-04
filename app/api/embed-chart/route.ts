import { NextRequest, NextResponse } from 'next/server'
import {
  buildChartSeries,
  SHOPS_DEFAULT,
  SHOPS_AIRPODS,
  SHOPS_MACBOOK,
  type ChartSeries,
} from '@/lib/chart-embed'
import {
  getAllIPhoneModelsIncludingEnded, getAllIPhonePriceLogsByModelIds,
  getAllIPadModelsIncludingEnded, getAllIPadPriceLogsByModelIds,
  getAllWatchModelsIncludingEnded, getAllWatchPriceLogsByModelIds,
  getAllMacBookModelsIncludingEnded, getAllMacBookPriceLogsByModelIds,
  getAllAirPodsModelsIncludingEnded, getAllAirPodsPriceLogsByModelIds,
} from '@/lib/queries'

export const runtime = 'nodejs'

// カテゴリ別の系列ビルダー。各サムはカテゴリ固有のクエリ関数を型安全にクロージャする。
const BUILDERS: Record<string, (slugs: string[]) => Promise<ChartSeries[]>> = {
  iphone: (slugs) => buildChartSeries(slugs, getAllIPhoneModelsIncludingEnded, getAllIPhonePriceLogsByModelIds, SHOPS_DEFAULT),
  ipad: (slugs) => buildChartSeries(slugs, getAllIPadModelsIncludingEnded, getAllIPadPriceLogsByModelIds, SHOPS_DEFAULT),
  watch: (slugs) => buildChartSeries(slugs, getAllWatchModelsIncludingEnded, getAllWatchPriceLogsByModelIds, SHOPS_DEFAULT),
  macbook: (slugs) => buildChartSeries(slugs, getAllMacBookModelsIncludingEnded, getAllMacBookPriceLogsByModelIds, SHOPS_MACBOOK),
  airpods: (slugs) => buildChartSeries(slugs, getAllAirPodsModelsIncludingEnded, getAllAirPodsPriceLogsByModelIds, SHOPS_AIRPODS),
}

// 埋め込みチャートのデータ供給。days はクライアント側でスライスするため受け取らず、
// category + models のみをキャッシュキーにして CDN ヒット率を最大化する。
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams
  const category = sp.get('category') ?? ''
  const build = BUILDERS[category]
  if (!build) {
    return NextResponse.json({ series: [] }, { status: 400 })
  }

  const slugs = (sp.get('models') ?? '').split(',').map((s) => s.trim()).filter(Boolean)
  const series = await build(slugs)

  return NextResponse.json(
    { series },
    {
      headers: {
        // Vercel CDN で1日キャッシュ。同一 iframe URL の再表示は Function を起動しない。
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
      },
    }
  )
}
