'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  formatPrice,
  getAvgPrice,
  formatReleaseDate,
  StickyBar,
  NoResult,
  ResultsHeader,
  PurposeGrid,
  BudgetGrid,
  ResultCardActions,
} from '@/app/components/filter-search'
import type { ShopLink, PurposeOption, BudgetOption } from '@/app/components/filter-search'

// ============================================================
// Types
// ============================================================

type FilterModel = {
  id: number
  model: string
  slug: string
  image: string | null
  date: string | null
  cpu: string | null
  display: string | null
  weight: string | null
  ram: string | null
  series: string | null
  refresh_rate: string | null
  water_resistance: string | null
  /** メーカー公表のOSアップデート期限（YYYY-MM）。推定ではない */
  support_until: string | null
  marketPrice: number | null
  iosysMin: number | null
  geoMin: number | null
  janparaMin: number | null
  galaxy_ai: boolean
  s_pen: boolean
  dex: boolean
  microsd: boolean
  felica: boolean
  tele_camera: boolean
  reverse_charging: boolean
}

type Props = {
  models: FilterModel[]
  shopLinks: ShopLink[]
}

// ============================================================
// 用途オプション（STEP 1）
//
// iPhone 版をそのまま移植せず、galaxy_models で実際に差が出る列だけを使う。
// 表示中29機種で全機種が同じ値になる列は、選んでも1件も絞れないので外した。
//   felica 29/29 · wireless_charging 29/29 · night_mode 29/29
// felica は日本の購入判断で重要なので、絞り込みではなく結果カードのタグに出す。
// ============================================================

type PurposeKey =
  | 'sns'
  | 'video'
  | 'gaming'
  | 'camera'
  | 'fold'
  | 'spen'
  | 'dex'
  | 'ai'
  | 'cost'
  | 'compact'

const PURPOSE_OPTIONS: PurposeOption<PurposeKey>[] = [
  { key: 'sns', icon: 'fa-hashtag', label: 'SNS・Web閲覧', desc: 'LINE・Instagram・X(Twitter)・Webブラウジングが中心' },
  { key: 'video', icon: 'fa-play', label: '動画視聴', desc: 'YouTube・Netflixなどを大きな画面で楽しみたい' },
  { key: 'gaming', icon: 'fa-gamepad', label: 'ゲーム', desc: '原神・スタレなど高負荷ゲームを快適にプレイしたい' },
  { key: 'camera', icon: 'fa-camera', label: 'カメラ重視', desc: '望遠で遠くの被写体もきれいに撮りたい' },
  { key: 'fold', icon: 'fa-mobile-screen-button', label: '折りたたみ', desc: 'Z Fold・Z Flip のような折りたたみ端末が欲しい' },
  { key: 'spen', icon: 'fa-pen', label: '手書きメモ', desc: 'S Pen で手書きしたい・イラストを描きたい' },
  { key: 'dex', icon: 'fa-desktop', label: 'PCのように使う', desc: '外部ディスプレイにつないで DeX で作業したい' },
  { key: 'ai', icon: 'fa-robot', label: 'Galaxy AI', desc: '通訳・かこって検索などのAI機能を使いたい' },
  { key: 'cost', icon: 'fa-piggy-bank', label: 'とにかく安く', desc: '予算最優先。必要最低限のスペックで安く手に入れたい' },
  { key: 'compact', icon: 'fa-compress', label: 'コンパクト', desc: '片手で操作しやすい小さめサイズが欲しい' },
]

// ============================================================
// 予算オプション（STEP 2）
//
// 上限はiPhone版と揃えず、galaxy_price_logs の実勢に合わせている。
// Aシリーズが2万円台から、Z Fold系が上に伸びるため帯の切り方が変わる。
// ============================================================

type BudgetKey = 'any' | 'under30k' | 'under60k' | 'under100k' | 'over100k'

const BUDGET_OPTIONS: BudgetOption<BudgetKey>[] = [
  { key: 'any', label: '指定なし', desc: '予算を気にせずベストな機種を探す' },
  { key: 'under30k', label: '3万円以下', desc: 'Aシリーズ中心。日常使いに絞って安く' },
  { key: 'under60k', label: '6万円以下', desc: 'コスパ重視。型落ちSシリーズも視野に' },
  { key: 'under100k', label: '10万円以下', desc: 'ハイスペック寄りの機種も検討したい' },
  { key: 'over100k', label: '10万円以上', desc: '予算に余裕あり。最新・折りたたみも含めて選ぶ' },
]

// ============================================================
// こだわり条件（STEP 3）
// ============================================================

type DisplayFilter = 'any' | 'small' | 'medium' | 'large'
type SeriesFilter = 'any' | 's' | 'a' | 'fold' | 'flip'
type FeatureKey =
  | 'galaxy_ai'
  | 's_pen'
  | 'dex'
  | 'microsd'
  | 'tele_camera'
  | 'reverse_charging'
  | 'hz120'

const FEATURE_OPTIONS: { key: FeatureKey; label: string }[] = [
  { key: 'galaxy_ai', label: 'Galaxy AI' },
  { key: 's_pen', label: 'S Pen対応' },
  { key: 'dex', label: 'DeX（PCモード）' },
  { key: 'microsd', label: 'microSD対応' },
  { key: 'tele_camera', label: '望遠カメラ' },
  { key: 'hz120', label: '120Hz表示' },
  { key: 'reverse_charging', label: 'リバース充電' },
]

// ============================================================
// Galaxy固有ヘルパー
// ============================================================

function parseSizeInch(display: string | null): number {
  if (!display) return 0
  const match = display.match(/([\d.]+)/)
  return match ? parseFloat(match[1]) : 0
}

function parseHz(refreshRate: string | null): number {
  if (!refreshRate) return 0
  const match = refreshRate.match(/(\d+)/)
  return match ? parseInt(match[1], 10) : 0
}

/** 折りたたみ機か。series は 'Z Fold' / 'Z Flip' / 'S' / 'A' が入る */
function isFoldable(series: string | null): boolean {
  return series != null && series.startsWith('Z ')
}

/**
 * サポート期限の判定。support_until はメーカー公表の実値（YYYY-MM）。
 *
 * iPhone 版は発売日から推定しているが、Samsung は機種ごとに更新年数を
 * 公表しているので、ここでは推定せず DB の値をそのまま使う。
 * 期限切れの機種が実際に存在する（S21 は 2026-01 で終了済み）ため、
 * 終了・まもなく終了・継続中を区別する。
 */
type SupportState = { label: string; state: 'ended' | 'soon' | 'active' }

function supportStateOf(supportUntil: string | null): SupportState | null {
  if (!supportUntil) return null
  const [y, m] = supportUntil.split('-').map(Number)
  if (!y || !m) return null
  const end = new Date(y, m - 1, 1)
  const now = new Date()
  const months = (end.getFullYear() - now.getFullYear()) * 12 + (end.getMonth() - now.getMonth())
  if (months < 0) return { label: `OSサポート ${y}年${m}月に終了`, state: 'ended' }
  // 1年以内は残り月数を明示する。「残りわずか」だと9か月先も6か月先も同じ表記になり、
  // 買うかどうかの判断材料にならない
  if (months <= 12) return { label: `OSサポート ${y}年${m}月まで（あと${months}か月）`, state: 'soon' }
  return { label: `OSサポート ${y}年${m}月まで`, state: 'active' }
}

function getFeatureTags(m: FilterModel): string[] {
  const tags: string[] = []
  if (m.s_pen) tags.push('S Pen')
  if (m.dex) tags.push('DeX')
  if (m.galaxy_ai) tags.push('Galaxy AI')
  if (m.microsd) tags.push('microSD')
  if (m.felica) tags.push('おサイフケータイ')
  return tags.slice(0, 4)
}

// ============================================================
// Component
// ============================================================

export default function GalaxyFilterSearchApp({ models, shopLinks }: Props) {
  const [purposes, setPurposes] = useState<Set<PurposeKey>>(new Set())
  const [budget, setBudget] = useState<BudgetKey>('any')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [displayFilter, setDisplayFilter] = useState<DisplayFilter>('any')
  const [seriesFilter, setSeriesFilter] = useState<SeriesFilter>('any')
  const [featureFilters, setFeatureFilters] = useState<Set<FeatureKey>>(new Set())

  const togglePurpose = (key: PurposeKey) => {
    setPurposes((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const toggleFeature = (key: FeatureKey) => {
    setFeatureFilters((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const resetAll = () => {
    setPurposes(new Set())
    setBudget('any')
    setShowAdvanced(false)
    setDisplayFilter('any')
    setSeriesFilter('any')
    setFeatureFilters(new Set())
  }

  const filteredModels = useMemo(() => {
    let result = [...models]

    // ========== 用途フィルタ ==========
    if (purposes.size > 0) {
      result = result.filter((m) => {
        const inch = parseSizeInch(m.display)

        for (const p of purposes) {
          switch (p) {
            case 'sns':
              // 表示中の全機種が問題なくこなせるため絞り込まない
              break
            case 'video':
              if (inch < 6.5) return false
              break
            case 'gaming':
              // 120Hz かつ Sシリーズ／折りたたみ相当の性能を持つもの。
              // Aシリーズは A36 でも multi 2,922 で、S22（3,900）に届かない
              if (parseHz(m.refresh_rate) < 120) return false
              if (m.series === 'A') return false
              break
            case 'camera':
              if (!m.tele_camera) return false
              break
            case 'fold':
              if (!isFoldable(m.series)) return false
              break
            case 'spen':
              if (!m.s_pen) return false
              break
            case 'dex':
              if (!m.dex) return false
              break
            case 'ai':
              if (!m.galaxy_ai) return false
              break
            case 'cost':
              // 予算そのものは STEP 2 で指定する
              break
            case 'compact':
              if (inch > 6.3) return false
              break
          }
        }
        return true
      })
    }

    // ========== 予算フィルタ ==========
    if (budget !== 'any') {
      const maxBudget: Record<string, number> = {
        under30k: 30000,
        under60k: 60000,
        under100k: 100000,
      }
      if (budget === 'over100k') {
        result = result.filter((m) => { const p = getAvgPrice(m); return p !== null && p >= 100000 })
      } else {
        const limit = maxBudget[budget]
        result = result.filter((m) => { const p = getAvgPrice(m); return p !== null && p <= limit })
      }
    }

    // ========== ディスプレイサイズフィルタ ==========
    if (displayFilter !== 'any') {
      result = result.filter((m) => {
        const s = parseSizeInch(m.display)
        switch (displayFilter) {
          case 'small': return s > 0 && s <= 6.3
          case 'medium': return s > 6.3 && s <= 6.9
          case 'large': return s > 6.9
          default: return true
        }
      })
    }

    // ========== シリーズフィルタ ==========
    if (seriesFilter !== 'any') {
      result = result.filter((m) => {
        switch (seriesFilter) {
          case 's': return m.series === 'S'
          case 'a': return m.series === 'A'
          case 'fold': return m.series === 'Z Fold'
          case 'flip': return m.series === 'Z Flip'
          default: return true
        }
      })
    }

    // ========== 機能フィルタ ==========
    for (const f of featureFilters) {
      switch (f) {
        case 'hz120':
          result = result.filter((m) => parseHz(m.refresh_rate) >= 120)
          break
        default:
          result = result.filter((m) => m[f])
          break
      }
    }

    // 新しい順にソート
    result.sort((a, b) => {
      const da = a.date ? new Date(a.date).getTime() : 0
      const db = b.date ? new Date(b.date).getTime() : 0
      return db - da
    })

    return result
  }, [models, purposes, budget, displayFilter, seriesFilter, featureFilters])

  const getShopLink = (productId: number, shopId: number) =>
    shopLinks.find((l) => l.product_id === productId && l.shop_id === shopId)

  const activeFilterCount = purposes.size
    + (budget !== 'any' ? 1 : 0)
    + (displayFilter !== 'any' ? 1 : 0)
    + (seriesFilter !== 'any' ? 1 : 0)
    + featureFilters.size

  return (
    <>
      {/* STEP 1: 用途選択 */}
      <section className="l-section" id="ifd-step1" aria-labelledby="heading-step1">
        <div className="l-container">
          <div className="ifd-step-header">
            <span className="ifd-step-badge">STEP 1</span>
            <h2 className="m-section-heading m-section-heading--lg" id="heading-step1">
              Galaxyの用途を選んでください
            </h2>
          </div>
          <p className="m-section-desc">あてはまるものをすべて選択してください（複数選択可）</p>
          <PurposeGrid options={PURPOSE_OPTIONS} selected={purposes} onToggle={togglePurpose} />
        </div>
      </section>

      {/* STEP 2: 予算選択 */}
      <section className="l-section" id="ifd-step2" aria-labelledby="heading-step2">
        <div className="l-container">
          <div className="ifd-step-header">
            <span className="ifd-step-badge">STEP 2</span>
            <h2 className="m-section-heading m-section-heading--lg" id="heading-step2">
              予算を選んでください
            </h2>
          </div>
          <p className="m-section-desc">中古価格の目安で絞り込みます</p>
          <BudgetGrid options={BUDGET_OPTIONS} selected={budget} onSelect={setBudget} />
        </div>
      </section>

      {/* STEP 3: こだわり条件 */}
      <section className="l-section" id="ifd-step3" aria-labelledby="heading-step3">
        <div className="l-container">
          <div className="ifd-step-header">
            <span className="ifd-step-badge">STEP 3</span>
            <h2 className="m-section-heading m-section-heading--lg" id="heading-step3">
              こだわり条件（任意）
            </h2>
          </div>
          <p className="m-section-desc">さらに細かい条件で絞り込みたい場合はこちら</p>

          <button
            type="button"
            className="ifd-toggle-btn m-selectable-card m-selectable-card--block"
            onClick={() => setShowAdvanced(!showAdvanced)}
            aria-expanded={showAdvanced}
          >
            <i className={`fa-solid ${showAdvanced ? 'fa-chevron-up' : 'fa-chevron-down'}`} aria-hidden="true"></i>
            {showAdvanced ? 'こだわり条件を閉じる' : 'こだわり条件を開く'}
          </button>

          {showAdvanced && (
            <div className="ifd-advanced-filters">
              {/* シリーズ */}
              <div className="ifd-filter-group">
                <h3 className="ifd-filter-group__title">
                  <i className="fa-solid fa-layer-group" aria-hidden="true"></i> シリーズ
                </h3>
                <div className="spec-filter__tags">
                  {([
                    ['any', 'すべて'],
                    ['s', 'Sシリーズ（ハイエンド）'],
                    ['a', 'Aシリーズ（ミドル）'],
                    ['fold', 'Z Fold（縦折り以外）'],
                    ['flip', 'Z Flip（縦折り）'],
                  ] as [SeriesFilter, string][]).map(([key, label]) => (
                    <button
                      key={key}
                      className={`spec-filter__tag${seriesFilter === key ? ' is-active' : ''}`}
                      onClick={() => setSeriesFilter(key)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* ディスプレイサイズ */}
              <div className="ifd-filter-group">
                <h3 className="ifd-filter-group__title">
                  <i className="fa-solid fa-mobile-screen" aria-hidden="true"></i> ディスプレイサイズ
                </h3>
                <div className="spec-filter__tags">
                  {([
                    ['any', 'すべて'],
                    ['small', '~6.3型（コンパクト）'],
                    ['medium', '6.3~6.9型（標準）'],
                    ['large', '6.9型~（大画面・折りたたみ）'],
                  ] as [DisplayFilter, string][]).map(([key, label]) => (
                    <button
                      key={key}
                      className={`spec-filter__tag${displayFilter === key ? ' is-active' : ''}`}
                      onClick={() => setDisplayFilter(key)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 機能 */}
              <div className="ifd-filter-group">
                <h3 className="ifd-filter-group__title">
                  <i className="fa-solid fa-microchip" aria-hidden="true"></i> 機能
                </h3>
                <div className="spec-filter__tags">
                  {FEATURE_OPTIONS.map((opt) => (
                    <button
                      key={opt.key}
                      className={`spec-filter__tag${featureFilters.has(opt.key) ? ' is-active' : ''}`}
                      onClick={() => toggleFeature(opt.key)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 結果セクション */}
      <section className="l-section" id="ifd-results" aria-labelledby="heading-results">
        <div className="l-container">
          <ResultsHeader count={filteredModels.length} activeFilterCount={activeFilterCount} onReset={resetAll} />

          {filteredModels.length === 0 ? (
            <NoResult
              onReset={resetAll}
              extraAdvice={
                <>S PenとDeXはSシリーズのUltraとZ Foldに、microSDはAシリーズに偏っています。これらを同時に指定すると該当がなくなります。</>
              }
            />
          ) : (
            <div className="ifd-results-grid">
              {filteredModels.map((m) => {
                const iosysLink = getShopLink(m.id, 1)
                const support = supportStateOf(m.support_until)
                const tags = getFeatureTags(m)

                return (
                  <div key={m.id} className="m-card m-card--shadow ifd-result-card">
                    <div className="ifd-result-card__header">
                      <div className="ifd-result-card__img-wrap">
                        {m.image && (
                          <Image
                            src={`/images/galaxy/${m.image}`}
                            alt={m.model}
                            width={80}
                            height={80}
                          />
                        )}
                      </div>
                      <div className="ifd-result-card__info">
                        <Link prefetch={false} href={`/galaxy/${m.slug}`} className="ifd-result-card__name">
                          {m.model}
                        </Link>
                        <div className="ifd-result-card__tags">
                          {support && (
                            <span className={`ifd-tag ifd-tag--${support.state === 'ended' ? 'ended' : 'supported'}`}>
                              <i
                                className={`fa-solid ${support.state === 'ended' ? 'fa-circle-xmark' : 'fa-shield-halved'}`}
                                aria-hidden="true"
                              ></i>{' '}
                              {support.label}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="ifd-result-card__body">
                      {(() => { const avg = getAvgPrice(m); return avg ? (
                        <div className="ifd-result-card__price">
                          <span className="ifd-result-card__price-label">中古価格相場</span>
                          <span className="ifd-result-card__price-value">¥{formatPrice(avg)}</span>
                        </div>
                      ) : null })()}
                      <dl className="ifd-result-card__specs">
                        <div><dt>発売日</dt><dd>{formatReleaseDate(m.date)}</dd></div>
                        {m.cpu && <div><dt>CPU</dt><dd>{m.cpu}</dd></div>}
                        <div><dt>画面</dt><dd>{m.display ?? '-'}{m.refresh_rate ? `／${m.refresh_rate}` : ''}</dd></div>
                        {m.ram && <div><dt>RAM</dt><dd>{m.ram}</dd></div>}
                        {m.weight && <div><dt>重量</dt><dd>{m.weight}</dd></div>}
                        {m.water_resistance && <div><dt>防水</dt><dd>{m.water_resistance}</dd></div>}
                      </dl>
                      {tags.length > 0 && (
                        <div className="ifd-result-card__feature-tags">
                          {tags.map((tag) => (
                            <span key={tag} className="ifd-feature-tag">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    <ResultCardActions modelName={m.model} iosysLink={iosysLink} />
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <StickyBar count={filteredModels.length} />
    </>
  )
}
