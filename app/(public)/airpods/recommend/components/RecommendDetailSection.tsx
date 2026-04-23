import Image from 'next/image'
import { placeholder } from '@/lib/placeholder'
import type { AirPodsModel, AirPodsPriceLog, ProductShopLink, FallbackShop } from '@/lib/types'
import { formatReleaseDate, buildDisplayLinks } from '@/lib/utils/shared-helpers'
import { calculatePriceRange, calculateFirmwareLifespan } from '@/lib/utils/airpods-helpers'
import { RECOMMEND_DATE_LABEL, RECOMMEND_COUNT_LABEL } from '@/lib/data/airpods-recommend'
import SpecToggle from '@/app/components/SpecToggle'
import { BoolValue, SpecRows, SpecCategory } from '@/app/components/spec-helpers'

type RecommendItem = {
  model: AirPodsModel
  latestPrice: AirPodsPriceLog | null
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
  3: 'ゲオ',
  6: 'じゃんぱら',
  16: 'eイヤホン',
}

export default function RecommendDetailSection({ items }: Props) {
  return (
    <section className="l-section" id="detail" aria-labelledby="heading-detail">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-detail">
          中古AirPodsおすすめ{RECOMMEND_COUNT_LABEL}【{RECOMMEND_DATE_LABEL}最新】
        </h2>
        <p className="m-section-desc">
          ここからは{RECOMMEND_DATE_LABEL}現在、おすすめの中古AirPodsを{RECOMMEND_COUNT_LABEL}紹介していきます。
        </p>
        <p className="m-section-desc">
          詳細なスペックやイチオシの中古ECショップのリンクも複数掲載しています。
        </p>

        {items.map((item) => {
          const { model, latestPrice, shopLinks, fallbackShops, label, subtitle, description, good, bad } = item
          const priceRange = calculatePriceRange(latestPrice)
          const fwLife = calculateFirmwareLifespan(model.date)
          const releaseDate = formatReleaseDate(model.date)
          const displayLinks = buildDisplayLinks(shopLinks, fallbackShops, SHOP_NAMES)
          const iosysLink = displayLinks.find((l) => l.shop_id === 1)

          return (
            <article key={model.id} className="m-card m-card--shadow recommend-card" id={`detail-${model.slug}`}>
              <div className="recommend-card__header">
                <h3>
                  <i className="fa-solid fa-headphones" aria-hidden="true"></i>{' '}
                  {model.name}（{label}）
                </h3>
              </div>

              <div className="recommend-card__overview">
                <figure className="recommend-card__image">
                  {model.image ? (
                    <Image
                      src={`/images/airpods/${model.image}`}
                      alt={`${model.name}の外観`}
                      width={200}
                      height={280}
                      loading="lazy"
                    />
                  ) : (
                    <Image
                      src={placeholder(200, 280, 'AirPods')}
                      alt={`${model.name}の外観`}
                      width={200}
                      height={280}
                      loading="lazy"
                    />
                  )}
                </figure>
                <div className="recommend-card__info">
                  <h4 className="recommend-card__info-title">{model.name}の基本情報</h4>
                  <dl className="recommend-card__specs">
                    {releaseDate && (
                      <div className="recommend-card__spec-item">
                        <dt>発売日</dt>
                        <dd><time dateTime={model.date || ''}>{releaseDate}</time></dd>
                      </div>
                    )}
                    <div className="recommend-card__spec-item">
                      <dt>サポート期間</dt>
                      <dd>{fwLife.endYear}年頃まで</dd>
                    </div>
                    {model.chip && (
                      <div className="recommend-card__spec-item">
                        <dt>チップ</dt>
                        <dd>{model.chip}</dd>
                      </div>
                    )}
                    {model.type && (
                      <div className="recommend-card__spec-item">
                        <dt>装着タイプ</dt>
                        <dd>{model.type}</dd>
                      </div>
                    )}
                    {model.port && (
                      <div className="recommend-card__spec-item">
                        <dt>充電端子</dt>
                        <dd>{model.port}</dd>
                      </div>
                    )}
                    <div className="recommend-card__spec-item">
                      <dt>ノイズキャンセリング</dt>
                      <dd>{model.anc ? '対応' : '非対応'}</dd>
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
                        <span>最終更新日：{new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/')}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="recommend-card__body">
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
                        aria-label={`${model.name}を${link.shopName}で探す（新しいタブで開く）`}
                      >
                        {link.shopName}で探す{' '}
                        <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
                      </a>
                    ))}
                    <a
                      href={`/airpods/${model.slug}/`}
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
                      { label: '公式サイト', value: model.official ? <a href={model.official} target="_blank" rel="noopener noreferrer" aria-label={`${model.name}の技術仕様（新しいタブで開く）`}>{model.name}の技術仕様</a> : null },
                      { label: '装着タイプ', value: model.type },
                      { label: '装着感', value: model.fit },
                      { label: '操作方法', value: model.control },
                      { label: '耐水性能', value: model.waterproof },
                    ]} />
                    <SpecCategory title="バッテリー・充電" />
                    <SpecRows items={[
                      { label: 'バッテリー（イヤホン）', value: model.battery_earphone },
                      { label: 'バッテリー（ケース）', value: model.battery_case },
                      { label: '充電端子', value: model.port },
                      { label: 'MagSafe充電', value: <BoolValue value={model.magsafe} /> },
                      { label: 'Qi充電', value: <BoolValue value={model.qi_charge} /> },
                    ]} />
                    <SpecCategory title="オーディオ" />
                    <SpecRows items={[
                      { label: 'チップ', value: model.chip },
                      { label: 'ノイズキャンセリング', value: <BoolValue value={model.anc} /> },
                      { label: 'アダプティブオーディオ', value: <BoolValue value={model.adaptive_audio} /> },
                      { label: '空間オーディオ', value: <BoolValue value={model.spatial_audio} /> },
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
                      aria-label={`イオシスで${model.name}を探す（新しいタブで開く）`}
                    >
                      イオシスで{model.name}を探す{' '}
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
