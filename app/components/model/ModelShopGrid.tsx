import type { Shop, ProductShopLink } from '@/lib/types'
import RatingMark from '@/app/components/RatingMark'

export type SpecRow = {
  label: string
  getValue: (shop: Shop) => string | null
}

type Props = {
  shops: Shop[]
  shopLinks: ProductShopLink[]
  modelName: string
  ctaLabel: string
  description: string
  specRows: SpecRow[]
  memoLink?: { href: string; text: string }
}

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

const EXCLUDED_SHOP_IDS = [5, 15]
const RECOMMENDED_SHOP_ID = 1 // イオシス

export default function ModelShopGrid({
  shops,
  shopLinks,
  modelName,
  ctaLabel,
  description,
  specRows,
  memoLink,
}: Props) {
  const linkedShops = shopLinks
    .map((link) => {
      if (EXCLUDED_SHOP_IDS.includes(link.shop_id)) return null
      const shop = shops.find((s) => s.id === link.shop_id)
      if (!shop) return null
      return { shop, url: link.url }
    })
    .filter((item): item is { shop: Shop; url: string } => item !== null)

  if (linkedShops.length === 0) return null

  return (
    <section className="l-section" id="shops" aria-labelledby="heading-shops">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-shops">
          中古{modelName}を安く買えるECサイト
        </h2>
        <p className="m-section-desc">
          信頼性の高い中古ショップを厳選し、保証期間や{description}の有無などをまとめました。
        </p>
        <p className="m-section-desc">
          気になるECサイトにアクセスして{modelName}の中古価格や在庫数をチェックしましょう。
        </p>

        <div className="l-grid l-grid--3col l-grid--gap-lg">
          {linkedShops.map(({ shop, url }) => {
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
                  <div className="m-spec-row">
                    <dt>価格</dt>
                    <dd><PriceIcon value={shop.price} /></dd>
                  </div>
                  {specRows.map((row) => (
                    <div key={row.label} className="m-spec-row">
                      <dt>{row.label}</dt>
                      <dd><SpecValue value={row.getValue(shop)} /></dd>
                    </div>
                  ))}
                </dl>
                <a
                  href={url}
                  className="m-btn m-btn--primary m-btn--block"
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                >
                  {ctaLabel}の中古価格{' '}
                  <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                </a>
              </article>
            )
          })}
        </div>

        {memoLink && (
          <div className="m-callout m-callout--tip" style={{ marginTop: 'var(--space-2xl)' }}>
            <span className="m-callout__label">memo</span>
            <p className="m-callout__text">
              購入先を比較したい方は「<a href={memoLink.href}>{memoLink.text}</a>」もあわせてご覧ください。
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
