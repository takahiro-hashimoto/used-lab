import Image from 'next/image'
import { placeholder } from '@/lib/placeholder'
import type { IPhoneModel, IPhonePriceLog, ProductShopLink, FallbackShop } from '@/lib/types'
import { formatPrice, formatReleaseDate, buildDisplayLinks, calculateAnnualCost } from '@/lib/utils/shared-helpers'
import { calculatePriceRange, calculateOSLifespan } from '@/lib/utils/iphone-helpers'
import { RECOMMEND_DATE_LABEL, RECOMMEND_COUNT_LABEL } from '@/lib/data/iphone-recommend'
import SpecToggle from '@/app/components/SpecToggle'
import { BoolValue, SpecRows, SpecCategory } from '@/app/components/spec-helpers'

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
  4: 'リコレ',
  2: 'にこスマ',
  6: 'じゃんぱら',
  3: 'ゲオ',
}

export default function RecommendDetailSection({ items }: Props) {
  return (
    <section className="l-section" id="detail" aria-labelledby="heading-detail">
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
          const osLife = calculateOSLifespan(model.date, model.last_ios)
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
                      src={placeholder(200, 280, 'iPhone')}
                      alt={`${model.model}の外観`}
                      width={200}
                      height={280}
                      loading="lazy"
                    />
                  )}
                </figure>
                <div className="recommend-card__info">
                  <p className="recommend-card__info-title">{model.model}の基本情報</p>
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
                      {latestPrice?.storage && (
                        <p className="recommend-card__price-note">
                          <span>{model.model}（{latestPrice.storage}）の場合</span>
                          <span>最終更新日：{new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/')}</span>
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
                    <p className="recommend-card__fit-title">
                      <i className="fa-solid fa-circle-check" aria-hidden="true"></i> こんな人におすすめ
                    </p>
                    <ul>
                      {good.map((text, i) => (
                        <li key={i}>
                          <i className="fa-solid fa-check" aria-hidden="true"></i> {text}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="recommend-card__fit-box recommend-card__fit-box--bad">
                    <p className="recommend-card__fit-title">
                      <i className="fa-solid fa-circle-xmark" aria-hidden="true"></i> こんな人には向かない
                    </p>
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
                      >
                        {link.shopName}で探す{' '}
                        <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
                      </a>
                    ))}
                    <a
                      href={`/iphone/${model.slug}/`}
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
                      { label: '公式サイト', value: model.official ? <a href={model.official} target="_blank" rel="noopener noreferrer">{model.model}の技術仕様</a> : null },
                      { label: 'サイズ', value: model.size },
                      { label: '重量', value: model.weight },
                      { label: 'カラー', value: model.color },
                      { label: 'ストレージ', value: model.strage },
                    ]} />

                    <SpecCategory title="バッテリー・充電" />
                    <SpecRows items={[
                      { label: 'バッテリー', value: model.battery },
                      { label: '充電端子', value: model.port },
                      { label: 'MagSafe充電', value: <BoolValue value={model.magsafe} /> },
                    ]} />

                    <SpecCategory title="機能" />
                    <SpecRows items={[
                      { label: '認証機能', value: model.certification },
                      { label: 'SIM', value: model.sim },
                      { label: 'アクションボタン', value: <BoolValue value={model.action_button} /> },
                      { label: 'カメラコントロール', value: <BoolValue value={model.camera_control} /> },
                      { label: '事故衝突検知', value: <BoolValue value={model.accident_detection} /> },
                      { label: 'Apple Intelligence', value: <BoolValue value={model.apple_intelligence} /> },
                    ]} />

                    <SpecCategory title="ディスプレイ" />
                    <SpecRows items={[
                      { label: '画面サイズ', value: model.display },
                      { label: '画像解像度', value: model.resolution },
                      { label: 'ProMotion', value: <BoolValue value={model.promotion} /> },
                      { label: 'Dynamic Island', value: <BoolValue value={model.dynamic_island} /> },
                    ]} />

                    <SpecCategory title="処理性能" />
                    <SpecRows items={[
                      { label: 'CPU', value: model.cpu },
                      { label: 'RAM', value: model.ram },
                      { label: 'GeekBench シングル', value: model.score_single?.toLocaleString() ?? null },
                      { label: 'GeekBench マルチ', value: model.score_multi?.toLocaleString() ?? null },
                      { label: 'GeekBench Metal', value: model.score_metal?.toLocaleString() ?? null },
                      { label: 'Antutu CPU', value: model.antutu_cpu?.toLocaleString() ?? null },
                      { label: 'Antutu GPU', value: model.antutu_gpu?.toLocaleString() ?? null },
                      { label: 'Antutu MEM', value: model.antutu_mem?.toLocaleString() ?? null },
                      { label: 'Antutu UX', value: model.antutu_ux?.toLocaleString() ?? null },
                    ]} />

                    <SpecCategory title="カメラ" />
                    <SpecRows items={[
                      { label: 'フロントカメラ', value: model.front_camera },
                      { label: 'インカメラ', value: model.in_camera },
                      { label: 'イメージセンサー', value: model.image_sensor },
                      { label: 'LiDARスキャナー', value: <BoolValue value={model.lidar} /> },
                      { label: 'ナイトモード', value: <BoolValue value={model.night_mode} /> },
                      { label: 'シネマティックモード', value: <BoolValue value={model.cinematic_mode} /> },
                      { label: 'マクロ撮影', value: <BoolValue value={model.macro_mode} /> },
                      { label: 'ポートレイトモード', value: <BoolValue value={model.portrait_mode} /> },
                      { label: 'アクションモード', value: <BoolValue value={model.action_mode} /> },
                      { label: 'フォトグラフスタイル', value: <BoolValue value={model.photography_style} /> },
                      { label: 'Apple ProRAW', value: <BoolValue value={model.apple_proraw} /> },
                      { label: 'Apple ProRes', value: <BoolValue value={model.apple_prores} /> },
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
