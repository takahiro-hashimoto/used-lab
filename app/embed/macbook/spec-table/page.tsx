import type { Metadata } from 'next'
import { getAllMacBookModelsIncludingEnded, getLatestMacBookPriceLogsWithPricesForModels } from '@/lib/queries'
import { calcAvgFromShops } from '@/lib/utils/price-info-helpers'
import SpecTable from '@/app/(public)/macbook/macbook-spec-table/components/SpecTable'

export const revalidate = false
export const metadata: Metadata = { robots: { index: false, follow: false } }

export default async function MacBookSpecTableEmbedPage() {
  const allModels = await getAllMacBookModelsIncludingEnded()
  const PRICE_COLS = ['min1_price','max1_price','min2_price','max2_price','min3_price','max3_price','min4_price','max4_price','min5_price','max5_price']
  const latestPriceLogs = await getLatestMacBookPriceLogsWithPricesForModels(allModels.map((m) => m.id), PRICE_COLS)

  const avgPrices: Record<number, number | null> = {}
  for (const model of allModels) {
    const log = latestPriceLogs[model.id]
    if (!log) { avgPrices[model.id] = null; continue }
    const rec = log as unknown as Record<string, number | null>
    const mins: number[] = [], maxs: number[] = []
    for (let i = 1; i <= 5; i++) {
      const mn = rec[`min${i}_price`]; if (typeof mn === 'number' && mn > 0) mins.push(mn)
      const mx = rec[`max${i}_price`]; if (typeof mx === 'number' && mx > 0) maxs.push(mx)
    }
    // 詳細ページ・相場一覧と同じ中央値ベースにする（同じ機種で違う相場を出さない）
    const rec2 = log as unknown as Record<string, number[] | null>
    avgPrices[model.id] = calcAvgFromShops(mins, maxs, '', [rec2['matched_prices']])?.avg ?? null
  }

  return (
    <div className="spec-embed-page">
      <SpecTable models={allModels} shopLinks={[]} prices={avgPrices} embed />
      <p className="spec-embed-cite">
        出典:{' '}
        <a
          href="https://used-lab.jp/macbook/macbook-spec-table/"
          target="_blank"
          rel="noopener noreferrer"
        >
          歴代MacBookスペック比較表 | ユーズドラボ
        </a>
      </p>
    </div>
  )
}
