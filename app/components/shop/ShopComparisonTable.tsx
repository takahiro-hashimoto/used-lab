import type { Shop } from '@/lib/types'
import type { SpecRow } from '@/app/components/shop/ShopDetailSection'
import RatingMark from '@/app/components/RatingMark'

function renderValue(value: string | null) {
  if (!value) return <span>–</span>
  if (['◎', '◯', '○', '△', '×', '✕'].includes(value)) return <RatingMark mark={value} size="sm" />
  if (value === '無料') return <span className="m-spec-row__free">無料</span>
  return <>{value}</>
}

type Props = {
  shops: Shop[]
  specRows: SpecRow[]
  caption?: string
  /** 各ショップのリンクURLを返す関数 */
  getShopUrl?: (shop: Shop) => string | null
  ctaText?: string
}

export default function ShopComparisonTable({ shops, specRows, caption, getShopUrl, ctaText = '公式サイト' }: Props) {
  if (shops.length === 0) return null

  return (
    <div className="m-card m-card--shadow m-table-card">
      <div className="m-table-scroll">
        <table className="m-table m-table--center">
          {caption && <caption className="visually-hidden">{caption}</caption>}
          <thead>
            <tr>
              <th scope="col">比較項目</th>
              {shops.map((s) => (
                <th key={s.id} scope="col">{s.shop}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specRows.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                {shops.map((s) => (
                  <td key={s.id}>{renderValue(row.getValue(s))}</td>
                ))}
              </tr>
            ))}
            {getShopUrl && (
              <tr>
                <th scope="row">リンク</th>
                {shops.map((s) => {
                  const url = getShopUrl(s)
                  return (
                    <td key={s.id}>
                      {url ? (
                        <a href={url} className="m-btn m-btn--primary m-btn--sm" target="_blank" rel="noopener noreferrer nofollow" aria-label={`${s.shop}で探す（新しいタブで開く）`}>
                          {ctaText}
                        </a>
                      ) : (
                        <span>–</span>
                      )}
                    </td>
                  )
                })}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
