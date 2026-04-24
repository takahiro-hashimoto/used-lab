import Image from 'next/image'
import { placeholder } from '@/lib/placeholder'
import type { WatchModel, WatchPriceLog, ProductShopLink, FallbackShop } from '@/lib/types'
import { formatDateSlash, formatReleaseDate, buildDisplayLinks } from '@/lib/utils/shared-helpers'
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
  updatedDateStr: string
}

type Props = {
  items: RecommendItem[]
}

const SHOP_NAMES: Record<number, string> = {
  1: 'イオシス',
  7: 'Amazon',
  4: 'リコレ',
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
          const { model, latestPrice, shopLinks, fallbackShops, label, subtitle, description, good, bad, updatedDateStr } = item
          const priceRange = calculatePriceRange(latestPrice)
          const osLife = calculateOSLifespan(model.date, model.last_watchos)
          const releaseDate = formatReleaseDate(model.date)

          const displayLinks = buildDisplayLinks(shopLinks, fallbackShops, SHOP_NAMES)
          const iosysLink = displayLinks.find((l) => l.shop_id === 1)

          return (
            <article key={model.id} className="m-card m-card--shadow recommend-card" id={`detail-${model.slug}`}>
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
                      <p className="recommend-card__price-line">
                        <span className="recommend-card__price-header">
                          <i className="fa-solid fa-tag" aria-hidden="true"></i> 中古相場（税込）
                        </span>
                        <span className="recommend-card__price-range m-price-display m-price-display--sm">
                          &yen;<strong>{priceRange.minPrice?.toLocaleString()}</strong>
                          {priceRange.maxPrice && (
                            <> ~ &yen;<strong>{priceRange.maxPrice.toLocaleString()}</strong></>
                          )}
                        </span>
                      </p>
                      <p className="recommend-card__price-note">
                        <span>最終更新日：{formatDateSlash(updatedDateStr)}</span>
                      </p>
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
                    <h5 className="recommend-card__fit-title">
                      <i className="fa-solid fa-circle-check" aria-hidden="true"></i> こんな人におすすめ
                    </h5>
                    <ul>
                      {good.map((text, i) => (
                        <li key={i}>
                          <i className="fa-solid fa-check" aria-hidden="true"></i> {text}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="recommend-card__fit-box recommend-card__fit-box--bad">
                    <h5 className="recommend-card__fit-title">
                      <i className="fa-solid fa-circle-xmark" aria-hidden="true"></i> こんな人には向かない
                    </h5>
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
                <div className="recommend-card__infos">
                  <div className="recommend-card__info-btns">
                    {displayLinks.map((link) => (
                      <a
                        key={link.shop_id}
                        href={link.url}
                        className="m-btn m-btn--primary"
                        rel="nofollow noopener noreferrer"
                        target="_blank"
                        aria-label={`${model.model}を${link.shopName}で探す（新しいタブで開く）`}
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
                    <SpecCategory title="基本情報" />
                    <SpecRows items={[
                      { label: '発売日', value: releaseDate },
                      { label: '公式サイト', value: model.official ? <a href={model.official} target="_blank" rel="noopener noreferrer" aria-label={`${model.model}の技術仕様（新しいタブで開く）`}>{model.model}の技術仕様</a> : null },
                      { label: 'ケースサイズ', value: model.size },
                      { label: '素材', value: model.material },
                      { label: 'ストレージ', value: model.strage },
                      { label: '最大輝度', value: model.max_brightness },
                    ]} />
                    <SpecCategory title="バッテリー・耐久" />
                    <SpecRows items={[
                      { label: 'バッテリー', value: model.battery },
                      { label: '急速充電', value: <BoolValue value={model.fast_charge} /> },
                      { label: '耐水性能', value: model.water_resistance },
                    ]} />
                    <SpecCategory title="ヘルスケア・センサー" />
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
                      { label: '事故衝突検知', value: <BoolValue value={model.accident_detection} /> },
                      { label: '転倒検出', value: <BoolValue value={model.fall_detection} /> },
                      { label: 'ダブルタップ', value: <BoolValue value={model.double_tap} /> },
                      { label: '日本語入力', value: <BoolValue value={model.japanese_input} /> },
                      { label: '高度計', value: <BoolValue value={model.altimeter} /> },
                    ]} />
                  </tbody>
                </table>
                {iosysLink && (
                  <div className="recommend-card__specs-cta">
                    <a
                      href={iosysLink.url}
                      className="m-btn m-btn--primary"
                      rel="nofollow noopener noreferrer"
                      target="_blank"
                      aria-label={`イオシスで${model.model}を探す（新しいタブで開く）`}
                    >
                      イオシスで{model.model}を探す{' '}
                      <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
                    </a>
                  </div>
                )}
              </SpecToggle>
            </article>
          )
        })}
      </div>
    </section>
  )
}
