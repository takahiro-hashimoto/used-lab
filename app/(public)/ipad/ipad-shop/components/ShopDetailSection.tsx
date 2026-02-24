import type { Shop } from '@/lib/types'
import type { IPadShopDetailMeta } from '@/lib/data/ipad-shop'

type ShopDetailItem = {
  shop: Shop
  meta: IPadShopDetailMeta
}

type Props = {
  items: ShopDetailItem[]
}

function SpecValue({ value }: { value: string | null }) {
  if (!value || value === '×') {
    return <span className="text-negative">&times;</span>
  }
  if (value === '◎') return <span className="text-positive">&#9678;</span>
  if (value === '◯' || value === '〇') return <span className="text-info">&#9675;</span>
  if (value === '△') return <span className="text-caution">&#9651;</span>
  if (value === '無料') return <strong className="text-positive">無料</strong>
  return <>{value}</>
}

export default function ShopDetailSection({ items }: Props) {
  if (items.length === 0) return null

  return (
    <section className="l-section l-section--bg-subtle" id="shops-detail" aria-labelledby="heading-shops-detail">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-shops-detail">
          <i className="fa-solid fa-bullseye" aria-hidden="true"></i> 中古iPadの主な購入先の詳細
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
              <div className="recommend-card__info">
                <h4 className="recommend-card__info-title">{shop.shop}の特徴</h4>
                <dl className="recommend-card__specs">
                  <div className="recommend-card__spec-item">
                    <dt>価格</dt>
                    <dd><SpecValue value={shop.price} /></dd>
                  </div>
                  <div className="recommend-card__spec-item">
                    <dt>在庫</dt>
                    <dd><SpecValue value={shop.stock} /></dd>
                  </div>
                  <div className="recommend-card__spec-item">
                    <dt>保証期間</dt>
                    <dd>{shop.support || '-'}</dd>
                  </div>
                  <div className="recommend-card__spec-item">
                    <dt>独自保証</dt>
                    <dd><SpecValue value={shop.extension} /></dd>
                  </div>
                  <div className="recommend-card__spec-item">
                    <dt>赤ロム保証</dt>
                    <dd>{shop.block || '-'}</dd>
                  </div>
                  <div className="recommend-card__spec-item">
                    <dt>実物写真</dt>
                    <dd><SpecValue value={shop.photo} /></dd>
                  </div>
                  <div className="recommend-card__spec-item">
                    <dt>バッテリー表示</dt>
                    <dd><SpecValue value={shop.battery} /></dd>
                  </div>
                  <div className="recommend-card__spec-item">
                    <dt>配送料</dt>
                    <dd><SpecValue value={shop.postage} /></dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="recommend-card__body m-rich-text">
              <h4 className="recommend-card__subtitle">{meta.subtitle}</h4>
              {meta.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="recommend-card__fit">
              <div className="l-grid l-grid--2col l-grid--gap-lg">
                <div className="recommend-card__fit-box recommend-card__fit-box--good">
                  <h4>
                    <i className="fa-solid fa-circle-check" aria-hidden="true"></i> メリット
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
                    <i className="fa-solid fa-circle-xmark" aria-hidden="true"></i> デメリット
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
                ＼ {shop.shop}で<strong>中古iPadを探す</strong> ／
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
                    href={shop.ipad_url || shop.url || '#'}
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
