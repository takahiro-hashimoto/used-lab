import type { Shop } from '@/lib/types'

const ensureAbsoluteUrl = (url: string) =>
  url.startsWith('http') || url === '#' ? url : url.startsWith('//') ? `https:${url}` : `https://${url}`

type ShopItem = {
  shop: Shop
  url: string
}

type SpecRowDef = {
  label: string
  field: 'price' | 'support' | 'block' | 'battery' | 'photo' | 'postage'
}

type Props = {
  items: ShopItem[]
  productName: string
  description: string
  specRows: SpecRowDef[]
}

import RatingMark from '@/app/components/RatingMark'

function PriceIcon({ value }: { value: string | null }) {
  if (!value) return <span>-</span>
  if (['◎', '◯', '〇', '△'].includes(value)) return <RatingMark mark={value} size="sm" />
  return <span>{value}</span>
}

function SpecValue({ value }: { value: string | null }) {
  if (!value || value === '×') return <RatingMark mark="×" size="sm" />
  if (['◎', '◯', '〇'].includes(value)) return <RatingMark mark={value} size="sm" />
  if (value === '無料') return <span className="m-spec-row__free">無料</span>
  return <>{value}</>
}

const RECOMMENDED_SHOP_ID = 1

export default function ShopSection({ items, productName, description, specRows }: Props) {
  if (items.length === 0) return null

  return (
    <section className="l-section" id="shops" aria-labelledby="heading-shops">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-shops">
          中古{productName}を安く買えるおすすめショップ
        </h2>
        <p className="m-section-desc">
          {description}
        </p>
        <p className="m-section-desc">
          気になるECサイトにアクセスして在庫数や価格をチェックしましょう。
        </p>

        <div className="l-grid l-grid--3col l-grid--gap-lg">
          {items.map(({ shop, url }) => {
            const isRecommended = shop.id === RECOMMENDED_SHOP_ID
            return (
              <article
                key={shop.id}
                className="m-card m-card--shadow m-vendor-card"
              >
                <div className="m-vendor-card__header">
                  <h3 className="m-vendor-card__name">{shop.shop}</h3>
                  {shop.extension_name && shop.extension_name !== '-' && (
                    <span className="m-tag">{shop.extension_name}</span>
                  )}
                </div>
                <dl className="m-vendor-card__specs">
                  {specRows.map((row) => (
                    <div className="m-spec-row" key={row.field}>
                      <dt>{row.label}</dt>
                      <dd>
                        {row.field === 'price'
                          ? <PriceIcon value={shop[row.field]} />
                          : <SpecValue value={shop[row.field]} />}
                      </dd>
                    </div>
                  ))}
                </dl>
                <a
                  href={ensureAbsoluteUrl(url)}
                  className="m-btn m-btn--primary m-btn--block"
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                >
                  中古{productName}を探す{' '}
                  <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                </a>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
