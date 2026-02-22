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
  display: string | null
  port: string | null
  front_camera: string | null
  certification: string | null
  speaker: string | null
  pencil: string | null
  keyboard: string | null
  last_ipados: string | null
  iosysMin: number | null
  geoMin: number | null
  janparaMin: number | null
  apple_intelligence: boolean
  promotion: boolean
  center_frame: boolean
  lidar: boolean
}

type Props = {
  models: FilterModel[]
  shopLinks: ShopLink[]
}

// ============================================================
// 用途オプション（STEP 1）
// ============================================================

type PurposeKey =
  | 'creative'
  | 'entertainment'
  | 'video_edit'
  | 'business'
  | 'reading'
  | 'gaming'
  | 'longevity'
  | 'budget_friendly'
  | 'high_spec'
  | 'car_navi'
  | 'ar_3d'
  | 'multitask'

const PURPOSE_OPTIONS: PurposeOption<PurposeKey>[] = [
  { key: 'creative', icon: 'fa-palette', label: 'イラスト・クリエイティブ制作', desc: 'Apple Pencil第2世代/Pro対応の描きやすいモデルを診断' },
  { key: 'entertainment', icon: 'fa-film', label: '動画視聴・エンタメ', desc: '10インチ以上の大画面で没入感あるモデルをおすすめ' },
  { key: 'video_edit', icon: 'fa-video', label: '動画編集・映像制作', desc: 'Mチップ+Thunderbolt+大画面のプロ向けモデルを診断' },
  { key: 'business', icon: 'fa-briefcase', label: 'ビジネス・資料作成', desc: 'Magic Keyboard対応でPC代わりに使えるモデルを診断' },
  { key: 'reading', icon: 'fa-book-open', label: '読書・ブラウジング', desc: '軽量コンパクトなiPad miniや無印iPadなど廉価モデル' },
  { key: 'gaming', icon: 'fa-gamepad', label: 'ゲーム', desc: 'M1/A14以降の高性能チップ搭載モデルをおすすめ' },
  { key: 'longevity', icon: 'fa-battery-full', label: '長く使い続けたい', desc: '発売3年以内・サポート期間に余裕がある機種を診断' },
  { key: 'budget_friendly', icon: 'fa-piggy-bank', label: 'コスパ重視・安く', desc: '中古5万円以下で実力のある人気iPadを診断' },
  { key: 'high_spec', icon: 'fa-bolt', label: '最新機能・最高性能', desc: 'Apple Intelligence対応の最新iPad Pro/Airを診断' },
  { key: 'car_navi', icon: 'fa-car', label: '車載・カーナビ', desc: 'GPS搭載のセルラーモデル対応機種を診断' },
  { key: 'ar_3d', icon: 'fa-cube', label: '3Dスキャン・AR開発', desc: 'LiDARスキャナ搭載のProモデルを診断' },
  { key: 'multitask', icon: 'fa-table-columns', label: 'マルチタスク', desc: 'Stage Manager対応（M1以降+11インチ以上）を診断' },
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

type DisplayFilter = 'any' | 'display_13' | 'display_11' | 'display_10' | 'display_mini'
type PencilFilter = 'any' | 'gen1' | 'gen2' | 'pro'
type CameraFilter = 'any' | 'wide' | 'wide_ultra'
type AuthFilter = 'any' | 'face_id' | 'touch_id'
type FeatureKey = 'usbc' | 'lightning' | 'ai' | 'promotion' | 'center_frame' | 'lidar' | 'speaker_4' | 'keyboard_support' | 'thunderbolt'

const FEATURE_OPTIONS: { key: FeatureKey; label: string }[] = [
  { key: 'usbc', label: 'USB-C' },
  { key: 'lightning', label: 'Lightning' },
  { key: 'ai', label: 'Apple Intelligence' },
  { key: 'promotion', label: 'ProMotion（120Hz）' },
  { key: 'center_frame', label: 'センターフレーム' },
  { key: 'lidar', label: 'LiDARスキャナ' },
  { key: 'speaker_4', label: '4スピーカーオーディオ' },
  { key: 'keyboard_support', label: '純正キーボード対応' },
  { key: 'thunderbolt', label: 'Thunderbolt対応' },
]

// ============================================================
// iPad固有ヘルパー
// ============================================================

function parseDisplayInch(display: string | null): number {
  if (!display) return 0
  const match = display.match(/([\d.]+)/)
  return match ? parseFloat(match[1]) : 0
}

function isMChip(cpu: string | null): boolean {
  if (!cpu) return false
  return /M[1-9]/.test(cpu)
}

function isHighPerformanceCPU(cpu: string | null): boolean {
  if (!cpu) return false
  if (isMChip(cpu)) return true
  const match = cpu.match(/A(\d+)/)
  return match ? parseInt(match[1]) >= 14 : false
}

function isSupportedModel(lastIpados: string | null): boolean {
  return lastIpados === null
}

function estimateSupportEnd(date: string | null, lastIpados: string | null): string {
  if (lastIpados !== null) return '終了'
  if (!date) return '-'
  const d = new Date(date)
  const endYear = d.getFullYear() + 7
  return `${endYear}年頃まで`
}

function formatDisplaySize(display: string | null): string {
  if (!display) return '-'
  return display
}

function formatPort(port: string | null): string {
  if (!port) return '-'
  if (port.includes('Thunderbolt')) return 'Thunderbolt / USB-C'
  if (port.toLowerCase().includes('usb')) return 'USB-C'
  if (port.toLowerCase().includes('lightning')) return 'Lightning'
  return port
}

function getCameraConfig(frontCamera: string | null): string {
  if (!frontCamera) return '-'
  const hasWide = frontCamera.includes('広角')
  const hasUltraWide = frontCamera.includes('超広角')
  if (hasWide && hasUltraWide) return '広角+超広角（2眼）'
  return '広角（1眼）'
}

function getFeatureTags(m: FilterModel): string[] {
  const tags: string[] = []
  if (m.apple_intelligence) tags.push('Apple Intelligence')
  if (m.promotion) tags.push('ProMotion')
  if (m.center_frame) tags.push('センターフレーム')
  if (m.lidar) tags.push('LiDAR')
  return tags.slice(0, 4)
}

// ============================================================
// Component
// ============================================================

export default function IPadFilterSearchApp({ models, shopLinks }: Props) {
  const [purposes, setPurposes] = useState<Set<PurposeKey>>(new Set())
  const [budget, setBudget] = useState<BudgetKey>('any')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [displayFilter, setDisplayFilter] = useState<DisplayFilter>('any')
  const [pencilFilter, setPencilFilter] = useState<PencilFilter>('any')
  const [cameraFilter, setCameraFilter] = useState<CameraFilter>('any')
  const [authFilter, setAuthFilter] = useState<AuthFilter>('any')
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
    setPencilFilter('any')
    setCameraFilter('any')
    setAuthFilter('any')
    setFeatureFilters(new Set())
  }

  const filteredModels = useMemo(() => {
    let result = [...models]
    const hasBudget = budget !== 'any'

    // ========== 用途フィルタ ==========
    if (purposes.size > 0) {
      result = result.filter((m) => {
        for (const p of purposes) {
          switch (p) {
            case 'creative':
              if (!m.pencil || (!m.pencil.includes('第2世代') && !m.pencil.includes('Pro'))) return false
              break
            case 'entertainment':
              if (parseDisplayInch(m.display) < 10) return false
              break
            case 'video_edit':
              if (!isMChip(m.cpu) || !m.port?.includes('Thunderbolt') || parseDisplayInch(m.display) < 11) return false
              break
            case 'business':
              if (!m.keyboard?.includes('Magic')) return false
              break
            case 'reading':
              if (!m.model.includes('mini') && !(!m.model.includes('Pro') && !m.model.includes('Air'))) return false
              break
            case 'gaming':
              if (!isHighPerformanceCPU(m.cpu)) return false
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
            case 'high_spec':
              if (!m.apple_intelligence) return false
              break
            case 'car_navi':
              if (m.model.includes('mini')) return false
              break
            case 'ar_3d':
              if (!m.lidar) return false
              break
            case 'multitask':
              if (!isMChip(m.cpu) || parseDisplayInch(m.display) < 11) return false
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

    // ========== ディスプレイサイズフィルタ ==========
    if (displayFilter !== 'any') {
      result = result.filter((m) => {
        const s = parseDisplayInch(m.display)
        switch (displayFilter) {
          case 'display_13': return s >= 12.5
          case 'display_11': return s >= 10.5 && s < 12.5
          case 'display_10': return s >= 9.5 && s < 10.5
          case 'display_mini': return s < 9.5
          default: return true
        }
      })
    }

    // ========== Apple Pencilフィルタ ==========
    if (pencilFilter !== 'any') {
      result = result.filter((m) => {
        if (!m.pencil) return false
        switch (pencilFilter) {
          case 'gen1': return m.pencil.includes('第1世代')
          case 'gen2': return m.pencil.includes('第2世代')
          case 'pro': return m.pencil.includes('Pro')
          default: return true
        }
      })
    }

    // ========== カメラ構成フィルタ ==========
    if (cameraFilter !== 'any') {
      result = result.filter((m) => {
        if (!m.front_camera) return false
        const hasWide = m.front_camera.includes('広角')
        const hasUltraWide = m.front_camera.includes('超広角')
        switch (cameraFilter) {
          case 'wide': return hasWide && !hasUltraWide
          case 'wide_ultra': return hasWide && hasUltraWide
          default: return true
        }
      })
    }

    // ========== 認証方式フィルタ ==========
    if (authFilter !== 'any') {
      result = result.filter((m) => {
        if (!m.certification) return false
        switch (authFilter) {
          case 'face_id': return m.certification.includes('Face ID')
          case 'touch_id': return m.certification.includes('Touch ID')
          default: return true
        }
      })
    }

    // ========== 機能フィルタ ==========
    for (const f of featureFilters) {
      switch (f) {
        case 'usbc':
          result = result.filter((m) => m.port?.includes('USB-C') || m.port?.includes('Thunderbolt'))
          break
        case 'lightning':
          result = result.filter((m) => m.port?.includes('Lightning'))
          break
        case 'ai':
          result = result.filter((m) => m.apple_intelligence)
          break
        case 'promotion':
          result = result.filter((m) => m.promotion)
          break
        case 'center_frame':
          result = result.filter((m) => m.center_frame)
          break
        case 'lidar':
          result = result.filter((m) => m.lidar)
          break
        case 'speaker_4':
          result = result.filter((m) => m.speaker?.includes('4スピーカー'))
          break
        case 'keyboard_support':
          result = result.filter((m) => m.keyboard && m.keyboard !== '-' && m.keyboard !== '×')
          break
        case 'thunderbolt':
          result = result.filter((m) => m.port?.includes('Thunderbolt'))
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
  }, [models, purposes, budget, displayFilter, pencilFilter, cameraFilter, authFilter, featureFilters])

  const getShopLink = (productId: number, shopId: number) =>
    shopLinks.find((l) => l.product_id === productId && l.shop_id === shopId)

  const activeFilterCount = purposes.size
    + (budget !== 'any' ? 1 : 0)
    + (displayFilter !== 'any' ? 1 : 0)
    + (pencilFilter !== 'any' ? 1 : 0)
    + (cameraFilter !== 'any' ? 1 : 0)
    + (authFilter !== 'any' ? 1 : 0)
    + featureFilters.size

  return (
    <>
      {/* STEP 1: 用途選択 */}
      <section className="l-section l-section--bg-subtle" id="ifd-step1" aria-labelledby="heading-step1">
        <div className="l-container">
          <div className="ifd-step-header">
            <span className="ifd-step-badge">STEP 1</span>
            <h2 className="m-section-heading m-section-heading--lg" id="heading-step1">
              iPadの使用目的を選ぶ
            </h2>
          </div>
          <p className="m-section-desc">あなたがiPadで何をしたいか選んでください（複数選択可）</p>
          <PurposeGrid options={PURPOSE_OPTIONS} selected={purposes} onToggle={togglePurpose} />
        </div>
      </section>

      {/* STEP 2: 予算選択 */}
      <section className="l-section" id="ifd-step2" aria-labelledby="heading-step2">
        <div className="l-container">
          <div className="ifd-step-header">
            <span className="ifd-step-badge">STEP 2</span>
            <h2 className="m-section-heading m-section-heading--lg" id="heading-step2">
              中古iPadの予算を設定する
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
              こだわり条件でiPadを絞り込む（任意）
            </h2>
          </div>
          <p className="m-section-desc">さらに細かい条件で絞り込みたい場合はこちら</p>

          <button
            type="button"
            className="ifd-toggle-btn"
            onClick={() => setShowAdvanced(!showAdvanced)}
            aria-expanded={showAdvanced}
          >
            <i className={`fa-solid ${showAdvanced ? 'fa-chevron-up' : 'fa-chevron-down'}`} aria-hidden="true"></i>
            {showAdvanced ? 'こだわり条件を閉じる' : 'こだわり条件を開く'}
          </button>

          {showAdvanced && (
            <div className="ifd-advanced-filters">
              {/* 画面サイズ */}
              <div className="ifd-filter-group">
                <h3 className="ifd-filter-group__title">
                  <i className="fa-solid fa-expand" aria-hidden="true"></i> 画面サイズで選ぶ
                </h3>
                <div className="spec-filter__tags">
                  {([
                    ['any', '指定なし'],
                    ['display_13', '13インチ（大画面）'],
                    ['display_11', '11インチ台'],
                    ['display_10', '10インチ台'],
                    ['display_mini', '8インチ台（mini）'],
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

              {/* Apple Pencil */}
              <div className="ifd-filter-group">
                <h3 className="ifd-filter-group__title">
                  <i className="fa-solid fa-pen-fancy" aria-hidden="true"></i> Apple Pencil対応で選ぶ
                </h3>
                <div className="spec-filter__tags">
                  {([
                    ['any', '指定なし'],
                    ['gen1', '第1世代'],
                    ['gen2', '第2世代'],
                    ['pro', 'Apple Pencil Pro'],
                  ] as [PencilFilter, string][]).map(([key, label]) => (
                    <button
                      key={key}
                      className={`spec-filter__tag${pencilFilter === key ? ' is-active' : ''}`}
                      onClick={() => setPencilFilter(key)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* カメラ構成 */}
              <div className="ifd-filter-group">
                <h3 className="ifd-filter-group__title">
                  <i className="fa-solid fa-camera" aria-hidden="true"></i> カメラ構成で選ぶ
                </h3>
                <div className="spec-filter__tags">
                  {([
                    ['any', '指定なし'],
                    ['wide', '広角のみ（1眼）'],
                    ['wide_ultra', '広角+超広角（2眼）'],
                  ] as [CameraFilter, string][]).map(([key, label]) => (
                    <button
                      key={key}
                      className={`spec-filter__tag${cameraFilter === key ? ' is-active' : ''}`}
                      onClick={() => setCameraFilter(key)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 認証方式 */}
              <div className="ifd-filter-group">
                <h3 className="ifd-filter-group__title">
                  <i className="fa-solid fa-lock" aria-hidden="true"></i> 認証方式で選ぶ
                </h3>
                <div className="spec-filter__tags">
                  {([
                    ['any', '指定なし'],
                    ['face_id', 'Face ID'],
                    ['touch_id', 'Touch ID'],
                  ] as [AuthFilter, string][]).map(([key, label]) => (
                    <button
                      key={key}
                      className={`spec-filter__tag${authFilter === key ? ' is-active' : ''}`}
                      onClick={() => setAuthFilter(key)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 機能 */}
              <div className="ifd-filter-group">
                <h3 className="ifd-filter-group__title">
                  <i className="fa-solid fa-microchip" aria-hidden="true"></i> 便利な機能で絞り込む
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
                const supported = isSupportedModel(m.last_ipados)
                const tags = getFeatureTags(m)

                return (
                  <div key={m.id} className="m-card m-card--shadow ifd-result-card">
                    <div className="ifd-result-card__header">
                      <div className="ifd-result-card__img-wrap">
                        {m.image && (
                          <img
                            src={`/images/ipad/${m.image}`}
                            alt={m.model}
                            loading="lazy"
                          />
                        )}
                      </div>
                      <div className="ifd-result-card__info">
                        <Link href={`/ipad/${m.slug}`} className="ifd-result-card__name">
                          {m.model}
                        </Link>
                        <div className="ifd-result-card__tags">
                          {supported ? (
                            <span className="ifd-tag ifd-tag--supported">
                              <i className="fa-solid fa-shield-halved" aria-hidden="true"></i> OSサポート {estimateSupportEnd(m.date, m.last_ipados)}
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
                        {m.cpu && <div><dt>CPU</dt><dd>{m.cpu}</dd></div>}
                        <div><dt>画面</dt><dd>{formatDisplaySize(m.display)}</dd></div>
                        <div><dt>充電ポート</dt><dd>{formatPort(m.port)}</dd></div>
                        {m.pencil && <div><dt>Pencil</dt><dd>{m.pencil}</dd></div>}
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
