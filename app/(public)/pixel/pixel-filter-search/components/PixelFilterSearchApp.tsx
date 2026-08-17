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
  tensor_gen: string | null
  display: string | null
  weight: string | null
  ram: string | null
  refresh_rate: string | null
  water_resistance: string | null
  /** Googleが公表しているOSアップデート期限（YYYY-MM）。推定ではない */
  support_until: string | null
  update_years: number | null
  marketPrice: number | null
  iosysMin: number | null
  geoMin: number | null
  janparaMin: number | null
  tele_camera: boolean
  best_take: boolean
  magic_editor: boolean
  video_boost: boolean
  temp_sensor: boolean
  face_unlock: boolean
  reverse_charging: boolean
}

type Props = {
  models: FilterModel[]
  shopLinks: ShopLink[]
}

// ============================================================
// 用途オプション（STEP 1）
//
// pixel_models で実際に差が出る列だけを使う。表示中17機種すべてが同じ値に
// なる列は、選んでも1件も絞れないため絞り込みには使わない。
//   magic_eraser 17/17 · night_sight 17/17 · real_tone 17/17
//   ultrawide_camera 17/17 · felica 17/17 · wireless_charging 17/17
// これらは「Pixelなら全機種できること」なので、下の説明文で扱う。
// ============================================================

type PurposeKey =
  | 'sns'
  | 'video'
  | 'gaming'
  | 'camera'
  | 'photo_edit'
  | 'longuse'
  | 'cost'
  | 'compact'
  | 'security'

const PURPOSE_OPTIONS: PurposeOption<PurposeKey>[] = [
  { key: 'sns', icon: 'fa-hashtag', label: 'SNS・Web閲覧', desc: 'LINE・Instagram・X(Twitter)・Webブラウジングが中心' },
  { key: 'video', icon: 'fa-play', label: '動画視聴', desc: 'YouTube・Netflixなどを大きな画面で楽しみたい' },
  { key: 'gaming', icon: 'fa-gamepad', label: 'ゲーム', desc: '原神・スタレなど高負荷ゲームを快適にプレイしたい' },
  { key: 'camera', icon: 'fa-camera', label: 'カメラ重視', desc: '望遠で遠くの被写体もきれいに撮りたい' },
  { key: 'photo_edit', icon: 'fa-wand-magic-sparkles', label: '写真をAIで編集', desc: 'ベストテイク・編集マジックで撮ったあとに直したい' },
  { key: 'longuse', icon: 'fa-shield-halved', label: '長く使いたい', desc: 'OSアップデートが7年提供される機種から選びたい' },
  { key: 'cost', icon: 'fa-piggy-bank', label: 'とにかく安く', desc: '予算最優先。必要最低限のスペックで安く手に入れたい' },
  { key: 'compact', icon: 'fa-compress', label: 'コンパクト', desc: '片手で操作しやすい小さめサイズが欲しい' },
  { key: 'security', icon: 'fa-face-smile', label: '顔認証を使いたい', desc: '指紋だけでなく顔でもロック解除したい' },
]

// ============================================================
// 予算オプション（STEP 2）
//
// pixel_price_logs の実勢に合わせた帯。aシリーズが下、Pro XL / Fold が上。
// ============================================================

type BudgetKey = 'any' | 'under30k' | 'under60k' | 'under100k' | 'over100k'

const BUDGET_OPTIONS: BudgetOption<BudgetKey>[] = [
  { key: 'any', label: '指定なし', desc: '予算を気にせずベストな機種を探す' },
  { key: 'under30k', label: '3万円以下', desc: '型落ちのaシリーズ中心。安さ最優先' },
  { key: 'under60k', label: '6万円以下', desc: 'コスパ重視。無印の型落ちも視野に' },
  { key: 'under100k', label: '10万円以下', desc: 'Proシリーズの型落ちも検討したい' },
  { key: 'over100k', label: '10万円以上', desc: '予算に余裕あり。最新モデルも含めて選ぶ' },
]

// ============================================================
// こだわり条件（STEP 3）
// ============================================================

type DisplayFilter = 'any' | 'small' | 'medium' | 'large'
type LineFilter = 'any' | 'pro' | 'standard' | 'a'
type FeatureKey =
  | 'tele_camera'
  | 'best_take'
  | 'magic_editor'
  | 'video_boost'
  | 'temp_sensor'
  | 'face_unlock'
  | 'reverse_charging'
  | 'hz120'

const FEATURE_OPTIONS: { key: FeatureKey; label: string }[] = [
  { key: 'tele_camera', label: '望遠カメラ' },
  { key: 'best_take', label: 'ベストテイク' },
  { key: 'magic_editor', label: '編集マジック' },
  { key: 'video_boost', label: '動画ブースト' },
  { key: 'hz120', label: '120Hz表示' },
  { key: 'face_unlock', label: '顔認証' },
  { key: 'temp_sensor', label: '温度センサー' },
  { key: 'reverse_charging', label: 'リバース充電' },
]

// ============================================================
// Pixel固有ヘルパー
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

/**
 * ライン判定。Pixel には Galaxy の series に当たる列が無いため機種名から判定する。
 * 「Pixel 9a」のように数字のあとに a が付くものが a シリーズ。
 */
function lineOf(model: string): 'pro' | 'a' | 'standard' {
  if (/\bPro\b/i.test(model)) return 'pro'
  if (/\d+a\b/i.test(model)) return 'a'
  return 'standard'
}

/**
 * サポート期限の判定。support_until は Google 公表の実値（YYYY-MM）。
 *
 * Pixel 8 以降が7年、それ以前が5年と明示されているので推定しない。
 * 表示中の機種にも期限が1年以内のものがある（Pixel 6 / 6 Pro は 2026-10）ため、
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
  if (m.best_take) tags.push('ベストテイク')
  if (m.magic_editor) tags.push('編集マジック')
  if (m.video_boost) tags.push('動画ブースト')
  if (m.temp_sensor) tags.push('温度センサー')
  return tags.slice(0, 4)
}

// ============================================================
// Component
// ============================================================

export default function PixelFilterSearchApp({ models, shopLinks }: Props) {
  const [purposes, setPurposes] = useState<Set<PurposeKey>>(new Set())
  const [budget, setBudget] = useState<BudgetKey>('any')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [displayFilter, setDisplayFilter] = useState<DisplayFilter>('any')
  const [lineFilter, setLineFilter] = useState<LineFilter>('any')
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
    setLineFilter('any')
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
              // Tensor は世代差がそのまま性能差になる。G1（Pixel 6世代）は
              // multi 2,850〜2,950 で、G3 以降（3,600〜）と開きがある
              if (parseHz(m.refresh_rate) < 120) return false
              if (m.tensor_gen === 'G1' || m.tensor_gen === 'G2') return false
              break
            case 'camera':
              if (!m.tele_camera) return false
              break
            case 'photo_edit':
              if (!m.best_take && !m.magic_editor) return false
              break
            case 'longuse':
              if ((m.update_years ?? 0) < 7) return false
              break
            case 'cost':
              // 予算そのものは STEP 2 で指定する
              break
            case 'compact':
              if (inch > 6.3) return false
              break
            case 'security':
              if (!m.face_unlock) return false
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

    // ========== ラインフィルタ ==========
    if (lineFilter !== 'any') {
      result = result.filter((m) => lineOf(m.model) === lineFilter)
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
  }, [models, purposes, budget, displayFilter, lineFilter, featureFilters])

  const getShopLink = (productId: number, shopId: number) =>
    shopLinks.find((l) => l.product_id === productId && l.shop_id === shopId)

  const activeFilterCount = purposes.size
    + (budget !== 'any' ? 1 : 0)
    + (displayFilter !== 'any' ? 1 : 0)
    + (lineFilter !== 'any' ? 1 : 0)
    + featureFilters.size

  return (
    <>
      {/* STEP 1: 用途選択 */}
      <section className="l-section" id="ifd-step1" aria-labelledby="heading-step1">
        <div className="l-container">
          <div className="ifd-step-header">
            <span className="ifd-step-badge">STEP 1</span>
            <h2 className="m-section-heading m-section-heading--lg" id="heading-step1">
              Pixelの用途を選んでください
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
              {/* ライン */}
              <div className="ifd-filter-group">
                <h3 className="ifd-filter-group__title">
                  <i className="fa-solid fa-layer-group" aria-hidden="true"></i> ライン
                </h3>
                <div className="spec-filter__tags">
                  {([
                    ['any', 'すべて'],
                    ['pro', 'Pro（上位モデル）'],
                    ['standard', '無印（標準モデル）'],
                    ['a', 'aシリーズ（廉価モデル）'],
                  ] as [LineFilter, string][]).map(([key, label]) => (
                    <button
                      key={key}
                      className={`spec-filter__tag${lineFilter === key ? ' is-active' : ''}`}
                      onClick={() => setLineFilter(key)}
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
                <>望遠カメラ・動画ブースト・温度センサーはProシリーズに偏っています。これらとaシリーズを同時に指定すると該当がなくなります。</>
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
                            src={`/images/pixel/${m.image}`}
                            alt={m.model}
                            width={80}
                            height={80}
                          />
                        )}
                      </div>
                      <div className="ifd-result-card__info">
                        <Link prefetch={false} href={`/pixel/${m.slug}`} className="ifd-result-card__name">
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
