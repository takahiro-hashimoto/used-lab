'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  formatPrice,
  getAvgPrice,
  formatReleaseDate,
  isWithin3Years,
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
  size: string | null
  point: string | null
  last_watchos: string | null
  iosysMin: number | null
  geoMin: number | null
  janparaMin: number | null
  // Boolean features
  always_on_display: boolean
  fast_charge: boolean
  blood_oxygen: boolean
  cardiogram: boolean
  accident_detection: boolean
  fall_detection: boolean
  skin_temperature: boolean
  japanese_input: boolean
  double_tap: boolean
  sleep_tracking: boolean
}

type Props = {
  models: FilterModel[]
  shopLinks: ShopLink[]
}

// ============================================================
// 用途オプション（STEP 1）
// ============================================================

type PurposeKey =
  | 'health_advanced'
  | 'fitness'
  | 'longevity'
  | 'budget_friendly'
  | 'always_on'
  | 'outdoor'
  | 'sleep_tracking'

const PURPOSE_OPTIONS: PurposeOption<PurposeKey>[] = [
  { key: 'health_advanced', icon: 'fa-heart-pulse', label: '健康管理を本格的にしたい', desc: '心電図・血中酸素濃度測定など高度なヘルスケア機能搭載モデル' },
  { key: 'fitness', icon: 'fa-person-running', label: 'フィットネス・運動記録をしたい', desc: '転倒検出・高度計・ワークアウト追跡に優れたモデルを診断' },
  { key: 'longevity', icon: 'fa-battery-full', label: '最新watchOSで長く使いたい', desc: '発売3年以内・サポート期間に余裕がある機種を診断' },
  { key: 'budget_friendly', icon: 'fa-piggy-bank', label: 'コスパ重視・安く手に入れたい', desc: '中古5万円以下で実力のあるApple Watchを診断' },
  { key: 'always_on', icon: 'fa-clock', label: '常時表示ディスプレイが欲しい', desc: '腕を上げなくても時刻が確認できる便利な機種' },
  { key: 'outdoor', icon: 'fa-mountain', label: 'アウトドア・タフに使いたい', desc: 'Ultra系の高耐久・長時間バッテリーモデルを診断' },
  { key: 'sleep_tracking', icon: 'fa-bed', label: '睡眠の質を管理したい', desc: '睡眠時無呼吸通知など高度な睡眠トラッキング機能搭載' },
]

// ============================================================
// 予算オプション（STEP 2）
// ============================================================

type BudgetKey = 'any' | 'under30k' | '30k_50k' | '50k_80k' | '80k_120k' | 'over120k'

const BUDGET_OPTIONS: BudgetOption<BudgetKey>[] = [
  { key: 'any', label: '指定なし', desc: '予算を気にせずベストな機種を探す' },
  { key: 'under30k', label: '3万円以下', desc: 'とにかく安く。最低限使えればOK' },
  { key: '30k_50k', label: '3〜5万円', desc: 'コスパ重視。バランスの良い一台を探したい' },
  { key: '50k_80k', label: '5〜8万円', desc: '性能にも妥協したくない方向け' },
  { key: '80k_120k', label: '8〜12万円', desc: 'ハイスペック寄りの機種も視野に入れたい' },
  { key: 'over120k', label: '12万円以上', desc: '予算に余裕あり。最高性能の機種が欲しい' },
]

// ============================================================
// こだわり条件（STEP 3）
// ============================================================

type SeriesFilter = 'any' | 'series' | 'se' | 'ultra'
type SizeFilter = 'any' | 'small' | 'large'
type HealthFeatureKey = 'cardiogram' | 'blood_oxygen' | 'skin_temperature' | 'sleep_tracking' | 'fall_detection' | 'accident_detection'
type ConvenienceFeatureKey = 'always_on_display' | 'fast_charge' | 'double_tap' | 'japanese_input'

const HEALTH_FEATURE_OPTIONS: { key: HealthFeatureKey; label: string }[] = [
  { key: 'cardiogram', label: '心電図測定' },
  { key: 'blood_oxygen', label: '血中酸素濃度' },
  { key: 'skin_temperature', label: '皮膚温測定' },
  { key: 'sleep_tracking', label: '睡眠時無呼吸通知' },
  { key: 'fall_detection', label: '転倒検出' },
  { key: 'accident_detection', label: '衝突事故検出' },
]

const CONVENIENCE_FEATURE_OPTIONS: { key: ConvenienceFeatureKey; label: string }[] = [
  { key: 'always_on_display', label: '常時表示ディスプレイ' },
  { key: 'fast_charge', label: '急速充電' },
  { key: 'double_tap', label: 'ダブルタップ' },
  { key: 'japanese_input', label: '日本語入力' },
]

// ============================================================
// Watch固有ヘルパー
// ============================================================

function isSupportedModel(lastWatchos: string | null): boolean {
  return lastWatchos === null
}

function estimateSupportEnd(date: string | null, lastWatchos: string | null): string {
  if (lastWatchos !== null) return '終了'
  if (!date) return '-'
  const d = new Date(date)
  const endYear = d.getFullYear() + 7
  return `${endYear}年頃まで`
}

function getSeries(model: string): 'series' | 'se' | 'ultra' | null {
  if (model.includes('Ultra')) return 'ultra'
  if (model.includes('SE')) return 'se'
  if (/Series \d+/.test(model)) return 'series'
  return null
}

function getSizeCategory(size: string | null): 'small' | 'large' | null {
  if (!size) return null
  if (size.includes('40mm') || size.includes('41mm') || size.includes('38mm')) return 'small'
  if (size.includes('44mm') || size.includes('45mm') || size.includes('46mm') || size.includes('49mm')) return 'large'
  return null
}

function getFeatureTags(m: FilterModel): string[] {
  const tags: string[] = []
  if (m.always_on_display) tags.push('常時表示')
  if (m.cardiogram) tags.push('心電図')
  if (m.blood_oxygen) tags.push('血中酸素')
  if (m.fast_charge) tags.push('急速充電')
  return tags.slice(0, 4)
}

// ============================================================
// Component
// ============================================================

export default function WatchFilterSearchApp({ models, shopLinks }: Props) {
  const [purposes, setPurposes] = useState<Set<PurposeKey>>(new Set())
  const [budget, setBudget] = useState<BudgetKey>('any')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [seriesFilter, setSeriesFilter] = useState<SeriesFilter>('any')
  const [sizeFilter, setSizeFilter] = useState<SizeFilter>('any')
  const [healthFeatures, setHealthFeatures] = useState<Set<HealthFeatureKey>>(new Set())
  const [convenienceFeatures, setConvenienceFeatures] = useState<Set<ConvenienceFeatureKey>>(new Set())

  const togglePurpose = (key: PurposeKey) => {
    setPurposes((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const toggleHealthFeature = (key: HealthFeatureKey) => {
    setHealthFeatures((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const toggleConvenienceFeature = (key: ConvenienceFeatureKey) => {
    setConvenienceFeatures((prev) => {
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
    setSeriesFilter('any')
    setSizeFilter('any')
    setHealthFeatures(new Set())
    setConvenienceFeatures(new Set())
  }

  const filteredModels = useMemo(() => {
    let result = [...models]
    const hasBudget = budget !== 'any'

    // ========== 用途フィルタ（AND条件） ==========
    if (purposes.size > 0) {
      result = result.filter((m) => {
        for (const p of purposes) {
          switch (p) {
            case 'health_advanced':
              if (!m.cardiogram && !m.blood_oxygen) return false
              break
            case 'fitness':
              if (!m.fall_detection) return false
              break
            case 'longevity':
              if (!isWithin3Years(m.date)) return false
              break
            case 'budget_friendly':
              if (!hasBudget) {
                const avg = getAvgPrice(m)
                if (!avg || avg > 50000) return false
              }
              break
            case 'always_on':
              if (!m.always_on_display) return false
              break
            case 'outdoor':
              if (!m.model.includes('Ultra')) return false
              break
            case 'sleep_tracking':
              if (!m.sleep_tracking) return false
              break
          }
        }
        return true
      })
    }

    // ========== 予算フィルタ ==========
    if (budget !== 'any') {
      result = result.filter((m) => {
        const avg = getAvgPrice(m)
        if (avg === null) return false
        switch (budget) {
          case 'under30k': return avg <= 30000
          case '30k_50k': return avg >= 30000 && avg <= 50000
          case '50k_80k': return avg >= 50000 && avg <= 80000
          case '80k_120k': return avg >= 80000 && avg <= 120000
          case 'over120k': return avg >= 120000
          default: return true
        }
      })
    }

    // ========== シリーズフィルタ ==========
    if (seriesFilter !== 'any') {
      result = result.filter((m) => getSeries(m.model) === seriesFilter)
    }

    // ========== サイズフィルタ ==========
    if (sizeFilter !== 'any') {
      result = result.filter((m) => getSizeCategory(m.size) === sizeFilter)
    }

    // ========== ヘルスケア機能フィルタ ==========
    for (const f of healthFeatures) {
      result = result.filter((m) => m[f])
    }

    // ========== 便利機能フィルタ ==========
    for (const f of convenienceFeatures) {
      result = result.filter((m) => m[f])
    }

    // ソート（価格昇順、価格なしは最後。同価格なら新しい順）
    result.sort((a, b) => {
      const avgA = getAvgPrice(a) ?? Infinity
      const avgB = getAvgPrice(b) ?? Infinity
      if (avgA !== avgB) return avgA - avgB
      const da = a.date ? new Date(a.date).getTime() : 0
      const db = b.date ? new Date(b.date).getTime() : 0
      return db - da
    })

    return result
  }, [models, purposes, budget, seriesFilter, sizeFilter, healthFeatures, convenienceFeatures])

  const getShopLink = (productId: number, shopId: number) =>
    shopLinks.find((l) => l.product_id === productId && l.shop_id === shopId)

  const activeFilterCount = purposes.size
    + (budget !== 'any' ? 1 : 0)
    + (seriesFilter !== 'any' ? 1 : 0)
    + (sizeFilter !== 'any' ? 1 : 0)
    + healthFeatures.size
    + convenienceFeatures.size

  // Watch固有の追加アドバイス
  const extraAdvice = (
    <>
      {purposes.has('budget_friendly') && purposes.has('health_advanced') && (
        <li>「コスパ重視」と「高度な健康管理」は両立が難しい組み合わせです。心電図・血中酸素測定はSeries 4以降の上位モデルに限定されます。</li>
      )}
      {purposes.has('budget_friendly') && purposes.has('outdoor') && (
        <li>「コスパ重視」と「アウトドア」は相反する条件です。Ultra系は10万円以上が相場です。</li>
      )}
      {purposes.has('sleep_tracking') && (
        <li>睡眠時無呼吸通知はApple Watch Series 10以降の最新機能です。予算に余裕があれば8万円以上の価格帯で探してみてください。</li>
      )}
      {purposes.size > 1 && (
        <li>目的の選択数を減らしてみてください。現在{purposes.size}個選択中です。</li>
      )}
      {budget !== 'any' && (
        <li>予算を「指定なし」に変更してみてください。希望の機能を持つモデルが予算外にある可能性があります。</li>
      )}
    </>
  )

  return (
    <>
      {/* STEP 1: 用途選択 */}
      <section className="l-section l-section--bg-subtle" id="ifd-step1" aria-labelledby="heading-step1">
        <div className="l-container">
          <div className="ifd-step-header">
            <span className="ifd-step-badge">STEP 1</span>
            <h2 className="m-section-heading m-section-heading--lg" id="heading-step1">
              Apple Watchの使用目的を選ぶ
            </h2>
          </div>
          <p className="m-section-desc">あなたがApple Watchで何をしたいか選んでください（複数選択可）</p>
          <PurposeGrid options={PURPOSE_OPTIONS} selected={purposes} onToggle={togglePurpose} />
        </div>
      </section>

      {/* STEP 2: 予算選択 */}
      <section className="l-section" id="ifd-step2" aria-labelledby="heading-step2">
        <div className="l-container">
          <div className="ifd-step-header">
            <span className="ifd-step-badge">STEP 2</span>
            <h2 className="m-section-heading m-section-heading--lg" id="heading-step2">
              中古Apple Watchの予算を設定する
            </h2>
          </div>
          <p className="m-section-desc">大手中古販売店の最安値を基準に予算で絞り込みます</p>
          <BudgetGrid options={BUDGET_OPTIONS} selected={budget} onSelect={setBudget} />
        </div>
      </section>

      {/* STEP 3: こだわり条件 */}
      <section className="l-section l-section--bg-subtle" id="ifd-step3" aria-labelledby="heading-step3">
        <div className="l-container">
          <div className="ifd-step-header">
            <span className="ifd-step-badge">STEP 3</span>
            <h2 className="m-section-heading m-section-heading--lg" id="heading-step3">
              こだわり条件でApple Watchを絞り込む（任意）
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
                  <i className="fa-solid fa-layer-group" aria-hidden="true"></i> シリーズで選ぶ
                </h3>
                <p className="ifd-filter-group__desc">Seriesは標準モデル、SEは廉価版、Ultraは高耐久・大画面のフラッグシップです。</p>
                <div className="spec-filter__tags">
                  {([
                    ['any', '指定なし'],
                    ['series', 'Series（標準）'],
                    ['se', 'SE（廉価版）'],
                    ['ultra', 'Ultra（高耐久）'],
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

              {/* ケースサイズ */}
              <div className="ifd-filter-group">
                <h3 className="ifd-filter-group__title">
                  <i className="fa-solid fa-ruler" aria-hidden="true"></i> ケースサイズで選ぶ
                </h3>
                <p className="ifd-filter-group__desc">手首が細い方や女性には小サイズ、視認性重視なら大サイズがおすすめです。</p>
                <div className="spec-filter__tags">
                  {([
                    ['any', '指定なし'],
                    ['small', '小（38〜41mm）'],
                    ['large', '大（44〜49mm）'],
                  ] as [SizeFilter, string][]).map(([key, label]) => (
                    <button
                      key={key}
                      className={`spec-filter__tag${sizeFilter === key ? ' is-active' : ''}`}
                      onClick={() => setSizeFilter(key)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* ヘルスケア機能 */}
              <div className="ifd-filter-group">
                <h3 className="ifd-filter-group__title">
                  <i className="fa-solid fa-heart-pulse" aria-hidden="true"></i> ヘルスケア機能で絞り込む
                </h3>
                <p className="ifd-filter-group__desc">心電図・血中酸素などの健康管理機能でApple Watchを診断できます。</p>
                <div className="spec-filter__tags">
                  {HEALTH_FEATURE_OPTIONS.map((opt) => (
                    <button
                      key={opt.key}
                      className={`spec-filter__tag${healthFeatures.has(opt.key) ? ' is-active' : ''}`}
                      onClick={() => toggleHealthFeature(opt.key)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 便利機能 */}
              <div className="ifd-filter-group">
                <h3 className="ifd-filter-group__title">
                  <i className="fa-solid fa-microchip" aria-hidden="true"></i> 便利機能で絞り込む
                </h3>
                <p className="ifd-filter-group__desc">常時表示ディスプレイや急速充電など、日常で役立つ機能で絞り込めます。</p>
                <div className="spec-filter__tags">
                  {CONVENIENCE_FEATURE_OPTIONS.map((opt) => (
                    <button
                      key={opt.key}
                      className={`spec-filter__tag${convenienceFeatures.has(opt.key) ? ' is-active' : ''}`}
                      onClick={() => toggleConvenienceFeature(opt.key)}
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
            <NoResult onReset={resetAll} extraAdvice={extraAdvice} />
          ) : (
            <div className="ifd-results-grid">
              {filteredModels.map((m) => {
                const iosysLink = getShopLink(m.id, 1)
                const amazonLink = getShopLink(m.id, 7)
                const supported = isSupportedModel(m.last_watchos)
                const tags = getFeatureTags(m)

                return (
                  <div key={m.id} className="m-card m-card--shadow ifd-result-card">
                    <div className="ifd-result-card__header">
                      <div className="ifd-result-card__img-wrap">
                        {m.image && (
                          <img
                            src={`/images/watch/${m.image}`}
                            alt={m.model}
                            loading="lazy"
                          />
                        )}
                      </div>
                      <div className="ifd-result-card__info">
                        <Link href={`/watch/${m.slug}`} className="ifd-result-card__name">
                          {m.model}
                        </Link>
                        <div className="ifd-result-card__tags">
                          {supported ? (
                            <span className="ifd-tag ifd-tag--supported">
                              <i className="fa-solid fa-shield-halved" aria-hidden="true"></i> OSサポート {estimateSupportEnd(m.date, m.last_watchos)}
                            </span>
                          ) : (
                            <span className="ifd-tag ifd-tag--ended">
                              <i className="fa-solid fa-circle-xmark" aria-hidden="true"></i> サポート終了
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="ifd-result-card__body">
                      {(() => { const avg = getAvgPrice(m); return avg ? (
                        <div className="ifd-result-card__price">
                          <span className="ifd-result-card__price-label">中古価格相場</span>
                          <span className="ifd-result-card__price-value">¥{formatPrice(avg)}〜</span>
                        </div>
                      ) : null })()}
                      <dl className="ifd-result-card__specs">
                        <div><dt>発売日</dt><dd>{formatReleaseDate(m.date)}</dd></div>
                        {m.cpu && <div><dt>チップ</dt><dd>{m.cpu}</dd></div>}
                        {m.size && <div><dt>サイズ</dt><dd>{m.size}</dd></div>}
                      </dl>
                      {tags.length > 0 && (
                        <div className="ifd-result-card__feature-tags">
                          {tags.map((tag) => (
                            <span key={tag} className="ifd-feature-tag">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    <ResultCardActions iosysLink={iosysLink} amazonLink={amazonLink} />
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
