import Image from 'next/image'
import type { IPhoneModel, IPhonePriceLog, ProductShopLink, FallbackShop } from '@/lib/types'
import { formatPrice, formatReleaseDate, buildDisplayLinks } from '@/lib/utils/shared-helpers'
import { calculatePriceRange, calculateOSLifespan, calculateAnnualCost } from '@/lib/utils/iphone-helpers'
import { RECOMMEND_DATE_LABEL, RECOMMEND_COUNT_LABEL } from '@/lib/data/iphone-recommend'

type RecommendItem = {
  model: IPhoneModel
  latestPrice: IPhonePriceLog | null
  shopLinks: ProductShopLink[]
  fallbackShops: FallbackShop[]
  label: string
  subtitle: string
  description: string[]
  good: string[]
  bad: string[]
}

type Props = {
  items: RecommendItem[]
}

const SHOP_NAMES: Record<number, string> = {
  1: 'イオシス',
  7: 'Amazon',
  2: 'にこスマ',
  6: 'じゃんぱら',
  3: 'ゲオ',
}

export default function RecommendDetailSection({ items }: Props) {
  return (
    <section className="l-section l-section--bg-subtle" id="detail" aria-labelledby="heading-detail">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-detail">
          中古iPhoneおすすめ{RECOMMEND_COUNT_LABEL}【{RECOMMEND_DATE_LABEL}最新】
        </h2>
        <p className="m-section-desc">
          ここからは{RECOMMEND_DATE_LABEL}現在、おすすめの中古iPhoneを{RECOMMEND_COUNT_LABEL}紹介していきます。
        </p>
        <p className="m-section-desc">
          詳細なスペックやイチオシの中古ECショップのリンクも複数掲載しています。
        </p>

        {items.map((item) => {
          const { model, latestPrice, shopLinks, fallbackShops, label, subtitle, description, good, bad } = item
          const priceRange = calculatePriceRange(latestPrice)
          const osLife = calculateOSLifespan(model.date)
          const releaseDate = formatReleaseDate(model.date)
          const annualCost = priceRange.minPrice && osLife.remainingYears > 0
            ? calculateAnnualCost(priceRange.minPrice, osLife.remainingYears)
            : null

          const displayLinks = buildDisplayLinks(shopLinks, fallbackShops, SHOP_NAMES)

          return (
            <div key={model.id} className="m-card m-card--shadow recommend-card" id={`detail-${model.slug}`}>
              <div className="recommend-card__header">
                <h3>
                  <i className="fa-regular fa-square" aria-hidden="true"></i>{' '}
                  {model.model}（{label}）
                </h3>
              </div>

              <div className="recommend-card__overview">
                <figure className="recommend-card__image">
                  {model.image ? (
                    <Image
                      src={`/images/iphone/${model.image}`}
                      alt={`${model.model}の外観`}
                      width={200}
                      height={280}
                      loading="lazy"
                    />
                  ) : (
                    <Image
                      src="https://placehold.co/200x280/f5f5f7/1d1d1f?text=iPhone"
                      alt={`${model.model}の外観`}
                      width={200}
                      height={280}
                      loading="lazy"
                    />
                  )}
                </figure>
                <div className="recommend-card__info">
                  <h4 className="recommend-card__info-title">{model.model}の基本情報</h4>
                  <dl className="recommend-card__specs">
                    {releaseDate && (
                      <div className="recommend-card__spec-item">
                        <dt>発売日</dt>
                        <dd><time dateTime={model.date || ''}>{releaseDate}</time></dd>
                      </div>
                    )}
                    <div className="recommend-card__spec-item">
                      <dt>iOSサポート期間</dt>
                      <dd>{osLife.osEndYear}年まで</dd>
                    </div>
                    {model.cpu && (
                      <div className="recommend-card__spec-item">
                        <dt>チップ</dt>
                        <dd>{model.cpu}</dd>
                      </div>
                    )}
                    {model.display && (
                      <div className="recommend-card__spec-item">
                        <dt>画面サイズ</dt>
                        <dd>{model.display}</dd>
                      </div>
                    )}
                    {model.port && (
                      <div className="recommend-card__spec-item">
                        <dt>充電端子</dt>
                        <dd>{model.port}</dd>
                      </div>
                    )}
                    {model.image_sensor && (
                      <div className="recommend-card__spec-item">
                        <dt>カメラ</dt>
                        <dd>{model.image_sensor}</dd>
                      </div>
                    )}
                  </dl>
                  {(priceRange.minPrice || priceRange.maxPrice) && (
                    <div className="recommend-card__price-card">
                      <div className="recommend-card__price-header">
                        <span>
                          <i className="fa-solid fa-tag" aria-hidden="true"></i> 中古相場（税込）
                        </span>
                        <span className="recommend-card__price-date">
                          {new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/')} 時点
                        </span>
                      </div>
                      <p className="recommend-card__price-range">
                        &yen;<strong>{priceRange.minPrice?.toLocaleString()}</strong>
                        {priceRange.maxPrice && (
                          <> ~ &yen;<strong>{priceRange.maxPrice.toLocaleString()}</strong></>
                        )}
                      </p>
                      {latestPrice?.storage && annualCost && (
                        <p className="recommend-card__price-note">
                          {model.model}（{latestPrice.storage}）　実質年単価 約{formatPrice(annualCost)}/年
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="recommend-card__body">
                <h4 className="recommend-card__subtitle">{subtitle}</h4>
                {description.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                <p className="recommend-card__detail-link">
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>{' '}
                  <a href={`/iphone/${model.slug}/`}>{model.model}の詳細情報を見る</a>
                </p>
              </div>

              <div className="recommend-card__fit">
                <div className="l-grid l-grid--2col l-grid--gap-lg">
                  <div className="recommend-card__fit-box recommend-card__fit-box--good">
                    <h4>
                      <i className="fa-solid fa-circle-check" aria-hidden="true"></i> こんな人におすすめ
                    </h4>
                    <ul>
                      {good.map((text, i) => (
                        <li key={i}>
                          <i className="fa-solid fa-check" aria-hidden="true"></i> {text}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="recommend-card__fit-box recommend-card__fit-box--bad">
                    <h4>
                      <i className="fa-solid fa-circle-xmark" aria-hidden="true"></i> こんな人には向かない
                    </h4>
                    <ul>
                      {bad.map((text, i) => (
                        <li key={i}>
                          <i className="fa-solid fa-xmark" aria-hidden="true"></i> {text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {displayLinks.length > 0 && (
                <div className="recommend-card__shops">
                  <p className="recommend-card__shops-label">
                    ＼ 人気ショップの比較で最安値の<strong>中古端末を探す</strong> ／
                  </p>
                  <div className="recommend-card__shop-btns">
                    {displayLinks.map((link) => (
                      <a
                        key={link.shop_id}
                        href={link.url}
                        className="m-btn m-btn--primary"
                        rel="nofollow noopener noreferrer"
                        target="_blank"
                      >
                        {link.shopName}で探す{' '}
                        <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
