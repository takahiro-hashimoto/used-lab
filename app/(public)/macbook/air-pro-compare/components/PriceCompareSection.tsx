import type { MacBookModel, MacBookPriceLog } from '@/lib/types'
import { calculatePriceRange } from '@/lib/utils/macbook-helpers'

interface PriceCompareSectionProps {
  models: MacBookModel[]
  priceMap: Map<number, MacBookPriceLog>
}

// 同世代の Air vs Pro ペアを作る
function buildPairs(models: MacBookModel[], priceMap: Map<number, MacBookPriceLog>) {
  // Airモデル（13インチ）を基準にして同世代のProとペアリング
  const airModels = models
    .filter(m => m.model.includes('Air') && m.model.includes('13'))
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))

  const pairs: {
    gen: string
    chip: string
    air: { model: MacBookModel; minPrice: number | null; maxPrice: number | null } | null
    pro: { model: MacBookModel; minPrice: number | null; maxPrice: number | null } | null
  }[] = []

  for (const air of airModels) {
    // Airのチップ世代を抽出 (M1, M2, M3, M4)
    const chipMatch = air.cpu?.match(/M\d+/)
    if (!chipMatch) continue
    const chipGen = chipMatch[0]

    // 同世代のPro 14インチを探す（無印チップのPro、またはProチップ）
    const pro = models.find(m =>
      m.model.includes('Pro') &&
      (m.model.includes('14') || m.model.includes('13')) &&
      m.cpu?.includes(chipGen)
    )

    const airPrice = calculatePriceRange(priceMap.get(air.id) ?? null)
    const proPrice = pro ? calculatePriceRange(priceMap.get(pro.id) ?? null) : null

    pairs.push({
      gen: chipGen,
      chip: chipGen,
      air: { model: air, ...airPrice },
      pro: pro ? { model: pro, minPrice: proPrice?.minPrice ?? null, maxPrice: proPrice?.maxPrice ?? null } : null,
    })
  }

  return pairs.slice(0, 4) // 最新4世代まで
}

function formatPrice(price: number | null): string {
  if (price == null) return '–'
  return `¥${price.toLocaleString()}`
}

export default function PriceCompareSection({ models, priceMap }: PriceCompareSectionProps) {
  const pairs = buildPairs(models, priceMap)

  return (
    <section className="l-section" id="price" aria-labelledby="heading-price">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-price">
          中古価格で比較
        </h2>
        <p className="m-section-desc">
          同世代のAirとProで中古最安価格を比較。価格差を見ることで「Proに追加投資する価値」を判断できます
        </p>

        <div className="m-card m-card--shadow m-table-card">
          <div className="m-table-scroll">
            <table className="m-table m-table--center">
              <thead>
                <tr>
                  <th>世代</th>
                  <th>Air 13インチ</th>
                  <th>Pro 13/14インチ</th>
                  <th>価格差</th>
                </tr>
              </thead>
              <tbody>
                {pairs.map((pair) => {
                  const airMin = pair.air?.minPrice ?? null
                  const proMin = pair.pro?.minPrice ?? null
                  const diff = airMin != null && proMin != null ? proMin - airMin : null

                  return (
                    <tr key={pair.gen}>
                      <th>{pair.chip}</th>
                      <td style={{ color: 'var(--color-primary)', fontWeight: 700 }}>
                        {formatPrice(airMin)}〜
                      </td>
                      <td style={{ color: 'var(--color-primary)', fontWeight: 700 }}>
                        {proMin != null ? `${formatPrice(proMin)}〜` : '–'}
                      </td>
                      <td style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                        {diff != null ? `+${formatPrice(diff)}` : '–'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="m-callout m-callout--tip" style={{ marginTop: 'var(--space-xl)' }}>
          <span className="m-callout__label">memo</span>
          <p className="m-callout__text">
            表示価格は各モデルの最小構成での中古最安値です。詳しい価格推移は「<a href="/macbook/macbook-price-info/">中古MacBookの価格推移・相場一覧</a>」で確認できます。
          </p>
        </div>
      </div>
    </section>
  )
}
