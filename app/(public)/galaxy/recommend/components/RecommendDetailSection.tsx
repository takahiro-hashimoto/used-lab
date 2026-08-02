import { priceSourceShortParagraphs } from '@/lib/data/price-source-note'
import Image from 'next/image'
import { placeholder } from '@/lib/placeholder'
import type { GalaxyModel, GalaxyPriceLog, ProductShopLink, FallbackShop } from '@/lib/types'
import { formatDateSlash, formatReleaseDate, buildDisplayLinks } from '@/lib/utils/shared-helpers'
import { calculatePriceRange } from '@/lib/utils/iphone-helpers'
import SpecToggle from '@/app/components/SpecToggle'
import { BoolValue, SpecRows, SpecCategory } from '@/app/components/spec-helpers'
import { getGalaxySupport } from './galaxy-support'

type RecommendItem = {
  model: GalaxyModel
  latestPrice: GalaxyPriceLog | null
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
  2: 'にこスマ',
  6: 'じゃんぱら',
  3: 'ゲオ',
}


export default function RecommendDetailSection({ items }: Props) {
  return (
    <section className="l-section" id="detail" aria-labelledby="heading-detail">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-detail">
          中古Samsung Galaxyおすすめ機種の詳細解説
        </h2>
        <p className="m-section-desc">
          各モデルの詳細なスペックや特徴、そしてイチオシの中古ECショップのリンクもまとめています。
        </p>
        <p className="m-section-desc">
          それぞれの強みを比較しながら、あなたの使い方に最適な1台を見つけてみてください。
        </p>

        <div className="m-callout m-callout--muted u-mt-xl u-mb-2xl">
          <span className="m-callout__label"><i className="fa-solid fa-circle-info" aria-hidden="true"></i> 中古相場の算出方法について</span>
          {priceSourceShortParagraphs('galaxy').map((text, i) => (
            <p key={i} className="m-callout__text" style={{ margin: i === 0 ? 0 : 'var(--space-sm) 0 0' }}>
              {text}
            </p>
          ))}
        </div>

        {items.map((item) => {
          const { model, latestPrice, shopLinks, fallbackShops, label, subtitle, description, good, bad, updatedDateStr } = item
          const priceRange = calculatePriceRange(latestPrice)
          const support = getGalaxySupport(model)
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
                      src={`/images/galaxy/${model.image}`}
                      alt={`${model.model}の外観`}
                      width={200}
                      height={280}
                      loading="lazy"
                    />
                  ) : (
                    <Image
                      src={placeholder(200, 280, 'Galaxy')}
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
                      <dt>サポート期間</dt>
                      <dd>{support.endLabel ? `${support.endLabel}頃まで` : '-'}</dd>
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
                    {model.refresh_rate && (
                      <div className="recommend-card__spec-item">
                        <dt>リフレッシュレート</dt>
                        <dd>{model.refresh_rate}</dd>
                      </div>
                    )}
                    {model.main_camera && (
                      <div className="recommend-card__spec-item">
                        <dt>メインカメラ</dt>
                        <dd>{model.main_camera}</dd>
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
                      {latestPrice?.storage && (
                        <p className="recommend-card__price-note">
                          <span>{model.model}（{latestPrice.storage}）の場合</span>
                          <span>最終更新日：{formatDateSlash(updatedDateStr)}</span>
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
                      { label: 'シリーズ', value: model.series ? `${model.series}シリーズ` : null },
                      { label: '型番', value: model.model_number },
                      { label: '公式サイト', value: model.official ? <a href={model.official} target="_blank" rel="noopener noreferrer" aria-label={`${model.model}の技術仕様（新しいタブで開く）`}>{model.model}の技術仕様</a> : null },
                      { label: 'サイズ', value: model.size },
                      { label: '重量', value: model.weight },
                      { label: 'カラー', value: model.color },
                      { label: 'ストレージ', value: model.strage },
                    ]} />

                    <SpecCategory title="バッテリー・充電" />
                    <SpecRows items={[
                      { label: 'バッテリー容量', value: model.battery },
                      { label: '有線充電', value: model.wired_charging },
                      { label: 'ワイヤレス充電', value: model.wireless_charging },
                      { label: 'Wireless PowerShare', value: <BoolValue value={model.reverse_charging} /> },
                      { label: '充電端子', value: model.port },
                    ]} />

                    <SpecCategory title="機能" />
                    <SpecRows items={[
                      { label: '防水・防塵', value: model.water_resistance },
                      { label: 'SIM', value: model.sim },
                      { label: 'microSD', value: <BoolValue value={model.microsd} /> },
                      { label: 'おサイフケータイ', value: <BoolValue value={model.felica} /> },
                      { label: 'S Pen対応', value: <BoolValue value={model.s_pen} /> },
                      { label: 'Samsung DeX', value: <BoolValue value={model.dex} /> },
                    ]} />

                    <SpecCategory title="ディスプレイ" />
                    <SpecRows items={[
                      { label: '画面サイズ', value: model.display },
                      { label: 'カバー画面', value: model.cover_display },
                      { label: '画像解像度', value: model.resolution },
                      { label: 'リフレッシュレート', value: model.refresh_rate },
                    ]} />

                    <SpecCategory title="処理性能" />
                    <SpecRows items={[
                      { label: 'チップ', value: model.cpu },
                      { label: 'RAM', value: model.ram },
                      { label: 'GeekBench シングル', value: model.score_single?.toLocaleString() ?? null },
                      { label: 'GeekBench マルチ', value: model.score_multi?.toLocaleString() ?? null },
                      { label: 'AnTuTu 総合', value: model.antutu_total?.toLocaleString() ?? null },
                    ]} />

                    <SpecCategory title="カメラ" />
                    <SpecRows items={[
                      { label: 'メインカメラ', value: model.main_camera },
                      { label: '超広角カメラ', value: model.ultrawide_camera },
                      { label: '望遠カメラ', value: model.tele_camera },
                      { label: '光学ズーム', value: model.optical_zoom },
                      { label: 'フロントカメラ', value: model.front_camera },
                      { label: 'Galaxy AI', value: <BoolValue value={model.galaxy_ai} /> },
                      { label: 'かこって検索', value: <BoolValue value={model.circle_to_search} /> },
                      { label: 'オブジェクト消去', value: <BoolValue value={model.object_eraser} /> },
                      { label: 'ナイトモード', value: <BoolValue value={model.night_mode} /> },
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
                  <a href={`/galaxy/${model.slug}/`} className="m-btn m-btn--primary">
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
