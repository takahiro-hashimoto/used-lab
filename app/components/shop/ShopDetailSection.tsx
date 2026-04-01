import type { Shop } from '@/lib/types'
import RatingMark from '@/app/components/RatingMark'

/** Shared meta type that all category-specific meta types satisfy */
export type ShopDetailMeta = {
  subtitle: string
  description: string[]
  good: string[]
  bad: string[]
  ctaButtons?: { label: string; url: string }[]
}

export type SpecRow = {
  label: string
  getValue: (shop: Shop) => string | null
}

type ShopDetailItem = {
  shop: Shop
  meta: ShopDetailMeta
}

type Props = {
  productName: string
  items: ShopDetailItem[]
  specRows: SpecRow[]
  getCtaUrl?: (shop: Shop) => string
}

function SpecValue({ value }: { value: string | null }) {
  if (!value || value === '×') return <RatingMark mark="×" size="md" />
  if (['◎', '◯', '〇', '△'].includes(value)) return <RatingMark mark={value} size="md" />
  if (value === '無料') return <strong className="text-positive">無料</strong>
  return <>{value}</>
}

export default function ShopDetailSection({ productName, items, specRows, getCtaUrl }: Props) {
  if (items.length === 0) return null

  return (
    <section className="l-section" id="shops-detail" aria-labelledby="heading-shops-detail">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-shops-detail">
          <i className="fa-solid fa-bullseye" aria-hidden="true"></i> 中古{productName}の主な購入先の詳細
        </h2>
        <p className="m-section-desc">各購入先の特徴をおすすめ順に一つずつ詳細に説明していきます。</p>

        {items.map(({ shop, meta }) => (
          <div key={shop.id} className="m-card m-card--shadow recommend-card" id={`detail-${shop.shop_key}`}>
            <div className="recommend-card__header">
              <h3>
                <i className="fa-solid fa-store" aria-hidden="true"></i> {shop.shop}
              </h3>
            </div>
            <div className="recommend-card__overview">
              <figure className="recommend-card__image">
                <img
                  src={`/images/shop/${shop.shop_key}-thumb.jpg`}
                  alt={`${shop.shop}公式サイトのスクリーンショット`}
                  width={300}
                  height={400}
                  loading="lazy"
                />
              </figure>
              <div className="recommend-card__info" style={{ background: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)' }}>
                <p className="recommend-card__info-title">{shop.shop}の特徴</p>
                <dl className="recommend-card__specs">
                  {specRows.map((row) => (
                    <div key={row.label} className="recommend-card__spec-item" style={{ display: 'flex' }}>
                      <dt>{row.label}</dt>
                      <dd><SpecValue value={row.getValue(shop)} /></dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div className="recommend-card__body m-rich-text">
              <p className="recommend-card__subtitle">{meta.subtitle}</p>
              {meta.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="recommend-card__fit">
              <div className="l-grid l-grid--2col l-grid--gap-lg">
                <div className="recommend-card__fit-box recommend-card__fit-box--good">
                  <h4>
                    <i className="fa-solid fa-circle-check" aria-hidden="true"></i> こんな人におすすめ
                  </h4>
                  <ul>
                    {meta.good.map((item, i) => (
                      <li key={i}>
                        <i className="fa-solid fa-check" aria-hidden="true"></i> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="recommend-card__fit-box recommend-card__fit-box--bad">
                  <h4>
                    <i className="fa-solid fa-circle-xmark" aria-hidden="true"></i> こんな人には向かない
                  </h4>
                  <ul>
                    {meta.bad.map((item, i) => (
                      <li key={i}>
                        <i className="fa-solid fa-xmark" aria-hidden="true"></i> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="recommend-card__shops">
              <p className="recommend-card__shops-label">
                ＼ {shop.shop}で<strong>中古{productName}を探す</strong> ／
              </p>
              {meta.ctaButtons && meta.ctaButtons.length > 0 ? (
                <div className="recommend-card__shop-btns">
                  {meta.ctaButtons.map((btn, i) => (
                    <a
                      key={i}
                      href={btn.url}
                      className="m-btn m-btn--primary"
                      rel="nofollow noopener noreferrer"
                      target="_blank"
                    >
                      {btn.label} <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="recommend-card__shop-btns recommend-card__shop-btns--single">
                  <a
                    href={getCtaUrl?.(shop) || shop.url || '#'}
                    className="m-btn m-btn--primary"
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                  >
                    {shop.shop}で探す <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
