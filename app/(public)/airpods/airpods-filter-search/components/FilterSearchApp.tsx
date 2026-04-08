'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  formatPrice,
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
  name: string
  slug: string
  image: string | null
  date: string | null
  type: string | null
  chip: string | null
  battery_earphone: string | null
  battery_case: string | null
  port: string | null
  fit: string | null
  control: string | null
  point: string | null
  spatial_audio: boolean
  magsafe: boolean
  qi_charge: boolean
  waterproof: string | null
  anc: boolean
  adaptive_audio: boolean
  iosysMin: number | null
  janparaMin: number | null
  eearphoneMin: number | null
}

type Props = {
  models: FilterModel[]
  shopLinks: ShopLink[]
}

// ============================================================
// 用途オプション（STEP 1）
// ============================================================

type PurposeKey =
  | 'music'
  | 'call'
  | 'workout'
  | 'commute'
  | 'anc'
  | 'spatial'
  | 'cost'
  | 'beginner'

const PURPOSE_OPTIONS: PurposeOption<PurposeKey>[] = [
  { key: 'music', icon: 'fa-music', label: '音楽鑑賞', desc: '高音質で音楽を楽しみたい。没入感のあるリスニング体験を重視' },
  { key: 'call', icon: 'fa-phone', label: '通話・Web会議', desc: 'テレワークやオンライン会議で快適に通話したい' },
  { key: 'workout', icon: 'fa-dumbbell', label: '運動・ジム', desc: 'ランニングやジムなどスポーツ中に使いたい' },
  { key: 'commute', icon: 'fa-train', label: '通勤・外出', desc: '電車やカフェなど外出先でのリスニングがメイン' },
  { key: 'anc', icon: 'fa-volume-xmark', label: 'ノイキャン重視', desc: 'アクティブノイズキャンセリングで周囲の騒音をカットしたい' },
  { key: 'spatial', icon: 'fa-globe', label: '空間オーディオ', desc: 'Apple Musicの空間オーディオやDolby Atmosを体験したい' },
  { key: 'cost', icon: 'fa-piggy-bank', label: 'とにかく安く', desc: '予算最優先。必要最低限のスペックで安く手に入れたい' },
  { key: 'beginner', icon: 'fa-hand-sparkles', label: '初めてのAirPods', desc: 'AirPodsが初めて。どれを選べばいいかわからない方向け' },
]

// ============================================================
// 予算オプション（STEP 2）
// ============================================================

type BudgetKey = 'any' | 'under10k' | 'under20k' | 'under30k' | 'over30k'

const BUDGET_OPTIONS: BudgetOption<BudgetKey>[] = [
  { key: 'any', label: '指定なし', desc: '予算を気にせずベストなモデルを探す' },
  { key: 'under10k', label: '1万円以下', desc: 'とにかく安く。最低限使えればOK' },
  { key: 'under20k', label: '2万円以下', desc: 'コスパ重視。バランスの良いモデルを探したい' },
  { key: 'under30k', label: '3万円以下', desc: '高機能モデルも視野に入れたい' },
  { key: 'over30k', label: '3万円以上', desc: '予算に余裕あり。最高性能のモデルが欲しい' },
]

// ============================================================
// こだわり条件（STEP 3）
// ============================================================

type TypeFilter = 'any' | 'inner_ear' | 'canal' | 'headphone'
type PortFilter = 'any' | 'usbc' | 'lightning'
type FeatureKey = 'anc' | 'spatial_audio' | 'adaptive_audio' | 'magsafe' | 'qi_charge' | 'waterproof'

const FEATURE_OPTIONS: { key: FeatureKey; label: string }[] = [
  { key: 'anc', label: 'ノイズキャンセリング' },
  { key: 'spatial_audio', label: '空間オーディオ' },
  { key: 'adaptive_audio', label: 'アダプティブオーディオ' },
  { key: 'magsafe', label: 'MagSafe充電' },
  { key: 'qi_charge', label: 'ワイヤレス充電' },
  { key: 'waterproof', label: '防水・防塵対応' },
]

// ============================================================
// AirPods固有ヘルパー
// ============================================================

/** AirPods用の平均価格算出（iosys, janpara, eearphone） */
function getAirPodsAvgPrice(m: {
  iosysMin: number | null
  janparaMin: number | null
  eearphoneMin: number | null
}): number | null {
  const prices = [m.iosysMin, m.janparaMin, m.eearphoneMin].filter(
    (p): p is number => p != null && p > 0,
  )
  if (prices.length === 0) return null
  return Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
}

function formatType(type: string | null): string {
  if (!type) return '-'
  return type
}

function formatPort(port: string | null): string {
  if (!port) return '-'
  if (port.toLowerCase().includes('usb')) return 'USB-C'
  if (port.toLowerCase().includes('lightning')) return 'Lightning'
  return port
}

function getFeatureTags(m: FilterModel): string[] {
  const tags: string[] = []
  if (m.anc) tags.push('ノイキャン')
  if (m.spatial_audio) tags.push('空間オーディオ')
  if (m.adaptive_audio) tags.push('アダプティブ')
  if (m.waterproof) tags.push(m.waterproof)
  return tags.slice(0, 4)
}

function estimateSupportEnd(date: string | null): string {
  if (!date) return '-'
  const d = new Date(date)
  const endYear = d.getFullYear() + 7
  return `${endYear}年頃まで`
}

// ============================================================
// Component
// ============================================================

export default function AirPodsFilterSearchApp({ models, shopLinks }: Props) {
  const [purposes, setPurposes] = useState<Set<PurposeKey>>(new Set())
  const [budget, setBudget] = useState<BudgetKey>('any')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('any')
  const [portFilter, setPortFilter] = useState<PortFilter>('any')
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
    setTypeFilter('any')
    setPortFilter('any')
    setFeatureFilters(new Set())
  }

  const filteredModels = useMemo(() => {
    let result = [...models]

    // ========== 用途フィルタ ==========
    if (purposes.size > 0) {
      result = result.filter((m) => {
        for (const p of purposes) {
          switch (p) {
            case 'music':
              // 音楽鑑賞: ANCまたは空間オーディオ対応を推奨
              if (!m.anc && !m.spatial_audio) return false
              break
            case 'call':
              // 通話向け: 特に絞り込まない（全モデル対応）
              break
            case 'workout':
              // 運動: 防水必須
              if (!m.waterproof) return false
              break
            case 'commute':
              // 通勤: ANC推奨
              if (!m.anc) return false
              break
            case 'anc':
              if (!m.anc) return false
              break
            case 'spatial':
              if (!m.spatial_audio) return false
              break
            case 'cost':
              break
            case 'beginner':
              break
          }
        }
        return true
      })
    }

    // ========== 予算フィルタ ==========
    if (budget !== 'any') {
      const maxBudget: Record<string, number> = {
        under10k: 10000,
        under20k: 20000,
        under30k: 30000,
        over30k: Infinity,
      }
      const limit = maxBudget[budget]

      if (budget === 'over30k') {
        result = result.filter((m) => { const p = getAirPodsAvgPrice(m); return p !== null && p >= 30000 })
      } else if (limit) {
        result = result.filter((m) => { const p = getAirPodsAvgPrice(m); return p !== null && p <= limit })
      }
    }

    // ========== 装着タイプフィルタ ==========
    if (typeFilter !== 'any') {
      result = result.filter((m) => {
        switch (typeFilter) {
          case 'inner_ear': return m.type === 'インナーイヤー型'
          case 'canal': return m.type === 'カナル型'
          case 'headphone': return m.type === 'ヘッドホン'
          default: return true
        }
      })
    }

    // ========== 充電ポートフィルタ ==========
    if (portFilter !== 'any') {
      result = result.filter((m) => {
        switch (portFilter) {
          case 'usbc': return m.port?.toLowerCase().includes('usb')
          case 'lightning': return m.port?.toLowerCase().includes('lightning')
          default: return true
        }
      })
    }

    // ========== 機能フィルタ ==========
    for (const f of featureFilters) {
      switch (f) {
        case 'anc':
          result = result.filter((m) => m.anc)
          break
        case 'spatial_audio':
          result = result.filter((m) => m.spatial_audio)
          break
        case 'adaptive_audio':
          result = result.filter((m) => m.adaptive_audio)
          break
        case 'magsafe':
          result = result.filter((m) => m.magsafe)
          break
        case 'qi_charge':
          result = result.filter((m) => m.qi_charge)
          break
        case 'waterproof':
          result = result.filter((m) => !!m.waterproof)
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
  }, [models, purposes, budget, typeFilter, portFilter, featureFilters])

  const getShopLink = (productId: number, shopId: number) =>
    shopLinks.find((l) => l.product_id === productId && l.shop_id === shopId)

  const activeFilterCount = purposes.size
    + (budget !== 'any' ? 1 : 0)
    + (typeFilter !== 'any' ? 1 : 0)
    + (portFilter !== 'any' ? 1 : 0)
    + featureFilters.size

  return (
    <>
      {/* STEP 1: 用途選択 */}
      <section className="l-section" id="ifd-step1" aria-labelledby="heading-step1">
        <div className="l-container">
          <div className="ifd-step-header">
            <span className="ifd-step-badge">STEP 1</span>
            <h2 className="m-section-heading m-section-heading--lg" id="heading-step1">
              AirPodsの用途を選んでください
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
              {/* 装着タイプ */}
              <div className="ifd-filter-group">
                <h3 className="ifd-filter-group__title">
                  <i className="fa-solid fa-headphones" aria-hidden="true"></i> 装着タイプ
                </h3>
                <div className="spec-filter__tags">
                  {([
                    ['any', 'すべて'],
                    ['inner_ear', 'インナーイヤー型'],
                    ['canal', 'カナル型（イヤーチップ）'],
                    ['headphone', 'ヘッドホン'],
                  ] as [TypeFilter, string][]).map(([key, label]) => (
                    <button
                      key={key}
                      className={`spec-filter__tag${typeFilter === key ? ' is-active' : ''}`}
                      onClick={() => setTypeFilter(key)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 充電ポート */}
              <div className="ifd-filter-group">
                <h3 className="ifd-filter-group__title">
                  <i className="fa-solid fa-plug" aria-hidden="true"></i> 充電ポート
                </h3>
                <div className="spec-filter__tags">
                  {([
                    ['any', 'すべて'],
                    ['usbc', 'USB-C'],
                    ['lightning', 'Lightning'],
                  ] as [PortFilter, string][]).map(([key, label]) => (
                    <button
                      key={key}
                      className={`spec-filter__tag${portFilter === key ? ' is-active' : ''}`}
                      onClick={() => setPortFilter(key)}
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
            <NoResult onReset={resetAll} />
          ) : (
            <div className="ifd-results-grid">
              {filteredModels.map((m) => {
                const iosysLink = getShopLink(m.id, 1)
                const amazonLink = getShopLink(m.id, 7)
                const tags = getFeatureTags(m)
                const avgPrice = getAirPodsAvgPrice(m)

                return (
                  <div key={m.id} className="m-card m-card--shadow ifd-result-card">
                    <div className="ifd-result-card__header">
                      <div className="ifd-result-card__img-wrap">
                        {m.image && (
                          <img
                            src={`/images/airpods/${m.image}`}
                            alt={m.name}
                            loading="lazy"
                          />
                        )}
                      </div>
                      <div className="ifd-result-card__info">
                        <Link href={`/airpods/${m.slug}`} className="ifd-result-card__name">
                          {m.name}
                        </Link>
                        <div className="ifd-result-card__tags">
                          <span className="ifd-tag ifd-tag--supported">
                            <i className="fa-solid fa-shield-halved" aria-hidden="true"></i> サポート {estimateSupportEnd(m.date)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="ifd-result-card__body">
                      {avgPrice ? (
                        <div className="ifd-result-card__price">
                          <span className="ifd-result-card__price-label">中古価格相場</span>
                          <span className="ifd-result-card__price-value">¥{formatPrice(avgPrice)}〜</span>
                        </div>
                      ) : null}
                      <dl className="ifd-result-card__specs">
                        <div><dt>発売日</dt><dd>{formatReleaseDate(m.date)}</dd></div>
                        <div><dt>タイプ</dt><dd>{formatType(m.type)}</dd></div>
                        {m.chip && <div><dt>チップ</dt><dd>{m.chip}</dd></div>}
                        {m.battery_earphone && <div><dt>バッテリー</dt><dd>{m.battery_earphone}</dd></div>}
                        <div><dt>充電ポート</dt><dd>{formatPort(m.port)}</dd></div>
                      </dl>
                      {tags.length > 0 && (
                        <div className="ifd-result-card__feature-tags">
                          {tags.map((tag) => (
                            <span key={tag} className="ifd-feature-tag">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    <ResultCardActions modelName={m.name} iosysLink={iosysLink} amazonLink={amazonLink} />
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
