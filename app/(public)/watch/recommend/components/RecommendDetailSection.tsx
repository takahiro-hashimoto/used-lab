import Image from 'next/image'
import { placeholder } from '@/lib/placeholder'
import type { WatchModel, WatchPriceLog, ProductShopLink, FallbackShop } from '@/lib/types'
import { formatPrice, formatReleaseDate, buildDisplayLinks, calculateAnnualCost } from '@/lib/utils/shared-helpers'
import { calculatePriceRange, calculateOSLifespan } from '@/lib/utils/watch-helpers'
import { RECOMMEND_DATE_LABEL, RECOMMEND_COUNT_LABEL } from '@/lib/data/watch-recommend'
import SpecToggle from '@/app/components/SpecToggle'
import { BoolValue, SpecRows, SpecCategory } from '@/app/components/spec-helpers'

type RecommendItem = {
  model: WatchModel
  latestPrice: WatchPriceLog | null
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
  6: 'じゃんぱら',
  3: 'ゲオ',
}

export default function RecommendDetailSection({ items }: Props) {
  return (
    <section className="l-section" id="detail" aria-labelledby="heading-detail">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-detail">
          中古Apple Watchおすすめ{RECOMMEND_COUNT_LABEL}【{RECOMMEND_DATE_LABEL}最新】
        </h2>
        <p className="m-section-desc">
          ここからは{RECOMMEND_DATE_LABEL}現在、おすすめの中古Apple Watchを{RECOMMEND_COUNT_LABEL}紹介していきます。
        </p>
        <p className="m-section-desc">
          詳細なスペックやイチオシの中古ECショップのリンクも複数掲載しています。
        </p>

        {items.map((item) => {
          const { model, latestPrice, shopLinks, fallbackShops, label, subtitle, description, good, bad } = item
          const priceRange = calculatePriceRange(latestPrice)
          const osLife = calculateOSLifespan(model.date)
          const releaseDate = formatReleaseDate(model.date)
          const annualCost = calculateAnnualCost(priceRange.minPrice, osLife.remainingYears)

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
                      src={`/images/watch/${model.image}`}
                      alt={`${model.model}の外観`}
                      width={200}
                      height={280}
                      loading="lazy"
                    />
                  ) : (
                    <Image
                      src={placeholder(200, 280, 'Watch')}
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
                      <dt>watchOSサポート期間</dt>
                      <dd>{osLife.osEndYear}年まで</dd>
                    </div>
                    {model.cpu && (
                      <div className="recommend-card__spec-item">
                        <dt>チップ</dt>
                        <dd>{model.cpu}</dd>
                      </div>
                    )}
                    {model.size && (
                      <div className="recommend-card__spec-item">
                        <dt>ケースサイズ</dt>
                        <dd>{model.size}</dd>
                      </div>
                    )}
                    <div className="recommend-card__spec-item">
                      <dt>バッテリー</dt>
                      <dd>{model.battery || '-'}</dd>
                    </div>
                    <div className="recommend-card__spec-item">
                      <dt>常時表示</dt>
                      <dd>{model.always_on_display ? '対応' : '非対応'}</dd>
                    </div>
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
                      <p className="recommend-card__price-range m-price-display m-price-display--sm">
                        &yen;<strong>{priceRange.minPrice?.toLocaleString()}</strong>
                        {priceRange.maxPrice && (
                          <> ~ &yen;<strong>{priceRange.maxPrice.toLocaleString()}</strong></>
                        )}
                      </p>
                      {annualCost && (
                        <p className="recommend-card__price-note">
                          実質年単価 約{formatPrice(annualCost)}/年
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="recommend-card__body m-rich-text">
                <h4 className="recommend-card__subtitle">{subtitle}</h4>
                {description.map((p, i) => (
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
                    <a
                      href={`/watch/${model.slug}/`}
                      className="m-btn m-btn--primary"
                    >
                      詳細記事を見る{' '}
                      <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              )}

              <SpecToggle>
                <table className="recommend-card__specs-table">
                  <tbody>
                    <SpecCategory title="基本スペック" />
                    <SpecRows items={[
                      { label: 'ケースサイズ', value: model.size },
                      { label: '素材', value: model.material },
                      { label: 'ストレージ', value: model.strage },
                      { label: 'バッテリー', value: model.battery },
                      { label: '耐水性能', value: model.water_resistance },
                      { label: '最大輝度', value: model.max_brightness },
                    ]} />
                    <SpecCategory title="ヘルスケア" />
                    <SpecRows items={[
                      { label: '血中酸素', value: <BoolValue value={model.blood_oxygen} /> },
                      { label: '心電図', value: <BoolValue value={model.cardiogram} /> },
                      { label: '皮膚温センサー', value: <BoolValue value={model.skin_temperature} /> },
                      { label: '血圧', value: <BoolValue value={model.blood_pressure} /> },
                      { label: '睡眠トラッキング', value: <BoolValue value={model.sleep_tracking} /> },
                      { label: '睡眠スコア', value: <BoolValue value={model.sleep_score} /> },
                    ]} />
                    <SpecCategory title="機能" />
                    <SpecRows items={[
                      { label: '常時表示', value: <BoolValue value={model.always_on_display} /> },
                      { label: '急速充電', value: <BoolValue value={model.fast_charge} /> },
                      { label: '事故衝突検知', value: <BoolValue value={model.accident_detection} /> },
                      { label: '転倒検出', value: <BoolValue value={model.fall_detection} /> },
                      { label: 'ダブルタップ', value: <BoolValue value={model.double_tap} /> },
                      { label: '日本語入力', value: <BoolValue value={model.japanese_input} /> },
                      { label: '高度計', value: <BoolValue value={model.altimeter} /> },
                    ]} />
                    <SpecCategory title="その他" />
                    <SpecRows items={[
                      { label: '発売日', value: releaseDate },
                      { label: '公式サイト', value: model.official ? <a href={model.official} target="_blank" rel="noopener noreferrer">{model.model}の技術仕様</a> : null },
                    ]} />
                  </tbody>
                </table>
              </SpecToggle>
            </div>
          )
        })}
      </div>
    </section>
  )
}
