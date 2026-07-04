import type { Metadata } from 'next'
import { getAllIPhoneModelsIncludingEnded, getLatestIPhonePriceLogsWithPricesForModels } from '@/lib/queries'
import { calcAvgFromShops } from '@/lib/utils/price-info-helpers'
import SpecTable from '@/app/(public)/iphone/iphone-spec-table/components/SpecTable'

export const revalidate = false
export const metadata: Metadata = { robots: { index: false, follow: false } }

export default async function IPhoneSpecTableEmbedPage() {
  const allModels = await getAllIPhoneModelsIncludingEnded()
  const PRICE_COLS = ['iosys_min', 'iosys_max', 'geo_min', 'geo_max', 'janpara_min', 'janpara_max']
  const latestPriceLogs = await getLatestIPhonePriceLogsWithPricesForModels(allModels.map((m) => m.id), PRICE_COLS)

  const avgPrices: Record<number, number | null> = {}
  for (const model of allModels) {
    const log = latestPriceLogs[model.id]
    if (!log) { avgPrices[model.id] = null; continue }
    const rec = log as unknown as Record<string, number | null>
    const mins: number[] = []
    const maxs: number[] = []
    for (const [minK, maxK] of [['iosys_min', 'iosys_max'], ['geo_min', 'geo_max'], ['janpara_min', 'janpara_max']]) {
      const mn = rec[minK]; if (typeof mn === 'number' && mn > 0) mins.push(mn)
      const mx = rec[maxK]; if (typeof mx === 'number' && mx > 0) maxs.push(mx)
    }
    avgPrices[model.id] = calcAvgFromShops(mins, maxs, '')?.avg ?? null
  }

  return (
    <div style={{ padding: '0 8px 16px' }}>
      <SpecTable models={allModels} shopLinks={[]} prices={avgPrices} embed />
      <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#888', marginTop: '8px' }}>
        出典:{' '}
        <a
          href="https://used-lab.jp/iphone/iphone-spec-table/"
          target="_blank"
          rel="noopener noreferrer"
        >
          歴代iPhoneスペック比較表 | ユーズドラボ
        </a>
      </p>
    </div>
  )
}
