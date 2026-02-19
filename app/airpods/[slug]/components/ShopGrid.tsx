import type { AirPodsModel, Shop, ProductShopLink } from '@/lib/types'

type Props = {
  shops: Shop[]
  shopLinks: ProductShopLink[]
  model: AirPodsModel
}

function PriceIcon({ value }: { value: string | null }) {
  if (!value) return <span>-</span>
  if (value === '◎') return <span className="m-rating__icon m-rating__icon--excellent">&#9678;</span>
  if (value === '◯' || value === '〇') return <span className="m-rating__icon m-rating__icon--good">&#9675;</span>
  if (value === '△') return <span className="m-rating__icon m-rating__icon--fair">&#9651;</span>
  return <span>{value}</span>
}

function SpecValue({ value }: { value: string | null }) {
  if (!value || value === '×') {
    return <span className="m-spec-row__cross" aria-label="なし">&times;</span>
  }
  if (value === '◯' || value === '〇' || value === '◎') {
    return <span className="m-rating__icon m-rating__icon--good" aria-label="あり">&#9675;</span>
  }
  if (value === '無料') {
    return <span className="m-spec-row__free">無料</span>
  }
  return <>{value}</>
}

export default function ShopGrid({ shops, shopLinks, model }: Props) {
  const EXCLUDED_SHOP_IDS = [5, 15]
  const RECOMMENDED_SHOP_ID = 1 // イオシス

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
          中古{model.name}（{model.model}）を安く買えるECサイト
        </h2>
        <p className="m-section-desc">
          信頼性の高い中古ショップを厳選し、保証期間や配送料の有無などをまとめました。
        </p>
        <p className="m-section-desc">
          気になるECサイトにアクセスして{model.name}（{model.model}）の中古価格や在庫数をチェックしましょう。
        </p>

        <div className="l-grid l-grid--3col l-grid--gap-lg">
          {linkedShops.map(({ shop, url }) => {
            const isRecommended = shop.id === RECOMMENDED_SHOP_ID
            return (
              <article
                key={shop.id}
                className={`m-card m-card--shadow m-vendor-card${isRecommended ? ' m-vendor-card--recommended' : ''}`}
              >
                {isRecommended && (
                  <span className="m-badge m-badge--primary m-vendor-card__badge">迷ったらココ！</span>
                )}
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
                  <div className="m-spec-row">
                    <dt>保証期間</dt>
                    <dd><SpecValue value={shop.support} /></dd>
                  </div>
                  <div className="m-spec-row">
                    <dt>実物写真</dt>
                    <dd><SpecValue value={shop.photo} /></dd>
                  </div>
                  <div className="m-spec-row">
                    <dt>配送料</dt>
                    <dd><SpecValue value={shop.postage} /></dd>
                  </div>
                </dl>
                <a
                  href={url}
                  className="m-btn m-btn--primary m-btn--block"
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                >
                  {model.name}の中古価格{' '}
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
