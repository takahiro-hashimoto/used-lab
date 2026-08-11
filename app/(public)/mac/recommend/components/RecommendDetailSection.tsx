import Image from 'next/image'
import { priceSourceShortParagraphs } from '@/lib/data/price-source-note'
import { placeholder } from '@/lib/placeholder'
import type { MacModel, MacPriceLog, ProductShopLink, FallbackShop } from '@/lib/types'
import { formatDateSlash, formatReleaseDate, buildDisplayLinks } from '@/lib/utils/shared-helpers'
import { calculatePriceRange, calculateOSLifespan } from '@/lib/utils/macbook-helpers'
import SpecToggle from '@/app/components/SpecToggle'
import { BoolValue, SpecRows, SpecCategory } from '@/app/components/spec-helpers'
import { PortSpec, DetailSpec } from '@/app/components/spec-table-utils'

type RecommendItem = {
  model: MacModel
  latestPrice: MacPriceLog | null
  shopLinks: ProductShopLink[]
  fallbackShops: FallbackShop[]
  subtitle: string
  description: string[]
  good: string[]
  bad: string[]
  updatedDateStr: string
}

type Props = {
  items: RecommendItem[]
  /** 製品ラインごとに複数回描画するので、id は呼び出し側で分ける */
  sectionId: string
  heading: string
  lead: string
  /** 相場の算出方法の注記は1ページに1回だけ出す */
  showPriceNote?: boolean
}

const SHOP_NAMES: Record<number, string> = {
  1: 'イオシス',
  7: 'Amazon',
  8: '楽天市場',
  4: 'リコレ',
  6: 'じゃんぱら',
  3: 'ゲオ',
}

/**
 * 購入先ボタンの並び順（このカテゴリだけの例外）。
 *
 * デスクトップMacはイオシス・じゃんぱらでの取扱数が少なく、Amazon整備済み品の
 * ほうが在庫を見つけやすいため、Amazon を先頭に出す。
 * 他カテゴリ（MacBook / iPhone など）は従来どおりイオシス先頭のまま。
 *
 * buildDisplayLinks は product_shop_links の行順をそのまま返すので、
 * 指定しないと機種ごとにボタンの並びが変わってしまう。ここで order を固定する。
 */
const SHOP_DISPLAY_ORDER = [7, 1, 3, 4, 6, 8]

const shopOrderOf = (shopId: number) => {
  const i = SHOP_DISPLAY_ORDER.indexOf(shopId)
  return i === -1 ? SHOP_DISPLAY_ORDER.length : i
}

export default function RecommendDetailSection({ items, sectionId, heading, lead, showPriceNote }: Props) {
  return (
    <section className="l-section" id={sectionId} aria-labelledby={`heading-${sectionId}`}>
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id={`heading-${sectionId}`}>
          {heading}
        </h2>
        <p className="m-section-desc">{lead}</p>
        <p className="m-section-desc">
          各モデルの詳細なスペックや特徴、そしてイチオシの中古ECショップのリンクもまとめています。
        </p>

        {showPriceNote && (
          <div className="m-callout m-callout--muted u-mt-xl u-mb-2xl">
            <span className="m-callout__label"><i className="fa-solid fa-circle-info" aria-hidden="true"></i> 中古相場の算出方法について</span>
            {priceSourceShortParagraphs('mac').map((text, i) => (
              <p key={i} className="m-callout__text" style={{ margin: i === 0 ? 0 : 'var(--space-sm) 0 0' }}>
                {text}
              </p>
            ))}
          </div>
        )}

        {items.map((item) => {
          const { model, latestPrice, shopLinks, fallbackShops, subtitle, description, good, bad, updatedDateStr } = item
          const priceRange = calculatePriceRange(latestPrice)
          const osLife = calculateOSLifespan(model.date, model.last_macos)
          const releaseDate = formatReleaseDate(model.date)

          const displayLinks = [...buildDisplayLinks(shopLinks, fallbackShops, SHOP_NAMES)]
            .sort((a, b) => shopOrderOf(a.shop_id) - shopOrderOf(b.shop_id))
          const iosysLink = displayLinks.find((l) => l.shop_id === 1)

          return (
            <article key={model.id} className="m-card m-card--shadow recommend-card" id={`detail-${model.slug}`}>
              <div className="recommend-card__header">
                <h3>
                  <i className="fa-solid fa-laptop" aria-hidden="true"></i>{' '}
                  {model.model}
                </h3>
              </div>

              <div className="recommend-card__overview">
                <figure className="recommend-card__image">
                  {model.image ? (
                    <Image
                      src={`/images/mac/${model.image}`}
                      alt={`${model.model}の外観`}
                      width={200}
                      height={280}
                      loading="lazy"
                    />
                  ) : (
                    <Image
                      src={placeholder(200, 280, model.shortname || 'Mac')}
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
                      <dt>macOSサポート期間</dt>
                      <dd>{osLife.osEndYear}年まで</dd>
                    </div>
                    {model.cpu && (
                      <div className="recommend-card__spec-item">
                        <dt>チップ</dt>
                        <dd>{model.cpu}</dd>
                      </div>
                    )}
                    {/* ディスプレイとポートは長文になりやすく基本情報の3列グリッドで潰れるため、
                        ここには出さない。下のスペック表（SpecToggle）で確認できる */}
                  </dl>
                  {(priceRange.minPrice || priceRange.maxPrice) && (
                    <div className="recommend-card__price-card">
                      <p className="recommend-card__price-line">
                        <span className="recommend-card__price-header">
                          <i className="fa-solid fa-tag" aria-hidden="true"></i> 中古相場（税込）
                        </span>
                        <span className="recommend-card__price-range m-price-display m-price-display--sm">
                          {/* 実勢相場（中央値）を出す。最安値だけを大きく出すと
                              1点限りの特価を相場と誤解させるため、個別機種ページと基準を揃える */}
                          {priceRange.medianPrice != null ? (
                            <>&yen;<strong>{priceRange.medianPrice.toLocaleString()}</strong></>
                          ) : (
                            <>
                              &yen;<strong>{priceRange.minPrice?.toLocaleString()}</strong>
                              {priceRange.maxPrice && (
                                <> ~ &yen;<strong>{priceRange.maxPrice.toLocaleString()}</strong></>
                              )}
                            </>
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
                      { label: '本体サイズ', value: model.size },
                      { label: 'カラー', value: model.color },
                      { label: 'ストレージ', value: model.strage },
                      { label: '同梱物', value: model.included_accessories },
                    ]} />
                    <SpecCategory title="ポート・入出力" />
                    {/* ポートは種類ごとに分け、値は本数だけにする。
                        null は SpecRows に行ごと落とされるので、非搭載は明示的に ✕ を渡す */}
                    <SpecRows items={[
                      { label: 'Thunderbolt', value: <PortSpec value={model.thunderbolt} /> },
                      { label: 'Thunderboltの規格', value: <DetailSpec value={model.thunderbolt_gen} /> },
                      { label: 'USB-C', value: <PortSpec value={model.usb_c} /> },
                      { label: 'USB-A', value: <PortSpec value={model.usb_a} /> },
                      { label: 'HDMI', value: <BoolValue value={model.hdmi} /> },
                      { label: 'SDカードスロット', value: <BoolValue value={model.slot} /> },
                      { label: 'ヘッドフォンジャック', value: <BoolValue value={model.headphone} /> },
                      { label: 'Ethernet', value: <DetailSpec value={model.ethernet} /> },
                    ]} />
                    <SpecCategory title="機能" />
                    <SpecRows items={[
                      { label: 'Apple Intelligence', value: <BoolValue value={model.apple_intelligence} /> },
                      { label: 'カメラ', value: model.camera },
                      { label: 'スピーカー', value: model.speaker },
                    ]} />
                    <SpecCategory title="ディスプレイ" />
                    <SpecRows items={[
                      { label: '内蔵ディスプレイ', value: <BoolValue value={model.display_builtin} /> },
                      { label: '画面サイズ', value: model.display },
                      { label: '画像解像度', value: model.resolution },
                      { label: '輝度', value: model.luminance },
                      { label: '外部ディスプレイ', value: model.external_display },
                    ]} />
                    <SpecCategory title="処理性能" />
                    <SpecRows items={[
                      { label: 'CPU', value: model.cpu },
                      { label: 'GPUコア', value: model.gpu },
                      { label: 'メモリ', value: model.ram },
                      { label: 'GeekBench シングル', value: model.score_single?.toLocaleString() ?? null },
                      { label: 'GeekBench マルチ', value: model.score_multi?.toLocaleString() ?? null },
                      { label: 'GeekBench Metal', value: model.score_metal?.toLocaleString() ?? null },
                    ]} />
                  </tbody>
                </table>
                <div className="recommend-card__specs-cta">
                  {iosysLink && (
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
                  )}
                  <a href={`/mac/${model.slug}/`} className="m-btn m-btn--primary">
                    {model.model}の詳細記事を見る{' '}
                    <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
                  </a>
                </div>
              </SpecToggle>
            </article>
          )
        })}
      </div>
    </section>
  )
}
