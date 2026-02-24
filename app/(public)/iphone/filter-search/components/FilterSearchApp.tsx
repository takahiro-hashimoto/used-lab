'use client'

import { useState, useMemo } from 'react'
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
  size: string | null
  port: string | null
  image_sensor: string | null
  front_camera: string | null
  battery: string | null
  point: string | null
  last_ios: string | null
  iosysMin: number | null
  geoMin: number | null
  janparaMin: number | null
  apple_intelligence: boolean
  dynamic_island: boolean
  promotion: boolean
  action_button: boolean
  camera_control: boolean
  magsafe: boolean
  lidar: boolean
  night_mode: boolean
  portrait_mode: boolean
  cinematic_mode: boolean
  action_mode: boolean
  macro_mode: boolean
  apple_proraw: boolean
  apple_prores: boolean
  photography_style: boolean
  centerframe: boolean
  accident_detection: boolean
}

type Props = {
  models: FilterModel[]
  shopLinks: ShopLink[]
}

// ============================================================
// 用途オプション（STEP 1）
// ============================================================

type PurposeKey =
  | 'sns'
  | 'video'
  | 'gaming'
  | 'camera'
  | 'business'
  | 'beginner'
  | 'cost'
  | 'ai'
  | 'latest'
  | 'compact'

const PURPOSE_OPTIONS: PurposeOption<PurposeKey>[] = [
  { key: 'sns', icon: 'fa-hashtag', label: 'SNS・Web閲覧', desc: 'LINE・Instagram・X(Twitter)・Webブラウジングが中心' },
  { key: 'video', icon: 'fa-play', label: '動画視聴', desc: 'YouTube・Netflix・TikTokなどの動画を快適に楽しみたい' },
  { key: 'gaming', icon: 'fa-gamepad', label: 'ゲーム', desc: '原神・スタレ・FPSなど高負荷ゲームを快適にプレイしたい' },
  { key: 'camera', icon: 'fa-camera', label: 'カメラ重視', desc: '写真・動画撮影にこだわりたい。SNS映えする写真を撮りたい' },
  { key: 'business', icon: 'fa-briefcase', label: 'ビジネス用途', desc: 'メール・チャット・オンライン会議など仕事用メインとして使いたい' },
  { key: 'beginner', icon: 'fa-hand-sparkles', label: '初めてのiPhone', desc: 'Android からの乗り換え。初めてiPhoneを購入する方向け' },
  { key: 'cost', icon: 'fa-piggy-bank', label: 'とにかく安く', desc: '予算最優先。必要最低限のスペックで安く手に入れたい' },
  { key: 'ai', icon: 'fa-robot', label: 'Apple Intelligence', desc: '最新AI機能（Apple Intelligence）を使いたい' },
  { key: 'latest', icon: 'fa-star', label: '最新機能重視', desc: 'Dynamic Island・カメラコントロールなど最新機能を体験したい' },
  { key: 'compact', icon: 'fa-compress', label: 'コンパクト', desc: '片手で操作しやすい小さめサイズのiPhoneが欲しい' },
]

// ============================================================
// 予算オプション（STEP 2）
// ============================================================

type BudgetKey = 'any' | 'under20k' | 'under30k' | 'under50k' | 'under80k' | 'over80k'

const BUDGET_OPTIONS: BudgetOption<BudgetKey>[] = [
  { key: 'any', label: '指定なし', desc: '予算を気にせずベストな機種を探す' },
  { key: 'under20k', label: '2万円以下', desc: 'とにかく安く。最低限使えればOK' },
  { key: 'under30k', label: '3万円以下', desc: '安さ重視だけど、ある程度快適に使いたい' },
  { key: 'under50k', label: '5万円以下', desc: 'コスパ重視。バランスの良い一台を探したい' },
  { key: 'under80k', label: '8万円以下', desc: 'ハイスペック寄りの機種も視野に入れたい' },
  { key: 'over80k', label: '8万円以上', desc: '予算に余裕あり。最高性能の機種が欲しい' },
]

// ============================================================
// こだわり条件（STEP 3）
// ============================================================

type DisplayFilter = 'any' | 'small' | 'medium' | 'large'
type CameraFilter = 'any' | 'dual' | 'triple'
type FeatureKey = 'usbc' | 'magsafe' | 'dynamic_island' | 'promotion' | 'action_button' | 'camera_control' | 'apple_intelligence' | 'lidar'
type ShootingKey = 'night_mode' | 'portrait_mode' | 'cinematic_mode' | 'action_mode' | 'macro_mode' | 'apple_proraw' | 'apple_prores' | 'photography_style'

const FEATURE_OPTIONS: { key: FeatureKey; label: string }[] = [
  { key: 'usbc', label: 'USB-C対応' },
  { key: 'magsafe', label: 'MagSafe対応' },
  { key: 'dynamic_island', label: 'Dynamic Island' },
  { key: 'promotion', label: 'ProMotion（120Hz）' },
  { key: 'action_button', label: 'アクションボタン' },
  { key: 'camera_control', label: 'カメラコントロール' },
  { key: 'apple_intelligence', label: 'Apple Intelligence' },
  { key: 'lidar', label: 'LiDARスキャナ' },
]

const SHOOTING_OPTIONS: { key: ShootingKey; label: string }[] = [
  { key: 'night_mode', label: 'ナイトモード' },
  { key: 'portrait_mode', label: 'ポートレートモード' },
  { key: 'cinematic_mode', label: 'シネマティックモード' },
  { key: 'action_mode', label: 'アクションモード' },
  { key: 'macro_mode', label: 'マクロ撮影' },
  { key: 'apple_proraw', label: 'Apple ProRAW' },
  { key: 'apple_prores', label: 'Apple ProRes' },
  { key: 'photography_style', label: 'フォトグラフスタイル' },
]

// ============================================================
// iPhone固有ヘルパー
// ============================================================

function parseSizeInch(size: string | null): number {
  if (!size) return 0
  const match = size.match(/([\d.]+)/)
  return match ? parseFloat(match[1]) : 0
}

function getCameraCount(frontCamera: string | null): number {
  if (!frontCamera) return 0
  const brCount = (frontCamera.match(/<br>/gi) || []).length
  return brCount + 1
}

function isSupportedModel(lastIos: string | null): boolean {
  return lastIos === null
}

function estimateSupportEnd(date: string | null, lastIos: string | null): string {
  if (lastIos !== null) return '終了'
  if (!date) return '-'
  const d = new Date(date)
  const endYear = d.getFullYear() + 6
  return `${endYear}年頃まで`
}

function formatDisplaySize(display: string | null): string {
  if (!display) return '-'
  return display
}

function formatCameraConfig(frontCamera: string | null): string {
  const count = getCameraCount(frontCamera)
  if (count >= 3) return 'トリプル'
  if (count === 2) return 'デュアル'
  if (count === 1) return 'シングル'
  return '-'
}

function formatPort(port: string | null): string {
  if (!port) return '-'
  if (port.toLowerCase().includes('usb')) return 'USB-C'
  if (port.toLowerCase().includes('lightning')) return 'Lightning'
  return port
}

function getFeatureTags(m: FilterModel): string[] {
  const tags: string[] = []
  if (m.dynamic_island) tags.push('Dynamic Island')
  if (m.promotion) tags.push('ProMotion')
  if (m.action_button) tags.push('アクションボタン')
  if (m.camera_control) tags.push('カメラコントロール')
  return tags.slice(0, 4)
}

// ============================================================
// Component
// ============================================================

export default function FilterSearchApp({ models, shopLinks }: Props) {
  const [purposes, setPurposes] = useState<Set<PurposeKey>>(new Set())
  const [budget, setBudget] = useState<BudgetKey>('any')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [displayFilter, setDisplayFilter] = useState<DisplayFilter>('any')
  const [cameraFilter, setCameraFilter] = useState<CameraFilter>('any')
  const [featureFilters, setFeatureFilters] = useState<Set<FeatureKey>>(new Set())
  const [shootingFilters, setShootingFilters] = useState<Set<ShootingKey>>(new Set())

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

  const toggleShooting = (key: ShootingKey) => {
    setShootingFilters((prev) => {
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
    setCameraFilter('any')
    setFeatureFilters(new Set())
    setShootingFilters(new Set())
  }

  const filteredModels = useMemo(() => {
    let result = [...models]

    // ========== 用途フィルタ ==========
    if (purposes.size > 0) {
      result = result.filter((m) => {
        const sizeInch = parseSizeInch(m.display)
        const cameraCount = getCameraCount(m.front_camera)

        for (const p of purposes) {
          switch (p) {
            case 'sns':
              break
            case 'video':
              if (sizeInch < 6.1) return false
              break
            case 'gaming':
              if (!m.dynamic_island && !m.promotion) {
                const cpuNum = m.cpu ? parseInt(m.cpu.replace(/[^0-9]/g, '')) : 0
                if (cpuNum < 15) return false
              }
              break
            case 'camera':
              if (cameraCount < 2) return false
              break
            case 'business':
              break
            case 'beginner':
              break
            case 'cost':
              break
            case 'ai':
              if (!m.apple_intelligence) return false
              break
            case 'latest':
              if (!m.dynamic_island) return false
              break
            case 'compact':
              if (sizeInch > 6.2) return false
              break
          }
        }
        return true
      })
    }

    // ========== 予算フィルタ ==========
    if (budget !== 'any') {
      const maxBudget: Record<string, number> = {
        under20k: 20000,
        under30k: 30000,
        under50k: 50000,
        under80k: 80000,
        over80k: Infinity,
      }
      const limit = maxBudget[budget]

      if (budget === 'over80k') {
        result = result.filter((m) => { const p = getAvgPrice(m); return p !== null && p >= 80000 })
      } else if (limit) {
        result = result.filter((m) => { const p = getAvgPrice(m); return p !== null && p <= limit })
      }
    }

    // ========== ディスプレイサイズフィルタ ==========
    if (displayFilter !== 'any') {
      result = result.filter((m) => {
        const s = parseSizeInch(m.display)
        switch (displayFilter) {
          case 'small': return s > 0 && s <= 6.1
          case 'medium': return s > 6.1 && s <= 6.3
          case 'large': return s > 6.3
          default: return true
        }
      })
    }

    // ========== カメラ構成フィルタ ==========
    if (cameraFilter !== 'any') {
      result = result.filter((m) => {
        const count = getCameraCount(m.front_camera)
        switch (cameraFilter) {
          case 'dual': return count >= 2
          case 'triple': return count >= 3
          default: return true
        }
      })
    }

    // ========== 機能フィルタ ==========
    for (const f of featureFilters) {
      switch (f) {
        case 'usbc':
          result = result.filter((m) => m.port?.toLowerCase().includes('usb'))
          break
        case 'magsafe':
          result = result.filter((m) => m.magsafe)
          break
        case 'dynamic_island':
          result = result.filter((m) => m.dynamic_island)
          break
        case 'promotion':
          result = result.filter((m) => m.promotion)
          break
        case 'action_button':
          result = result.filter((m) => m.action_button)
          break
        case 'camera_control':
          result = result.filter((m) => m.camera_control)
          break
        case 'apple_intelligence':
          result = result.filter((m) => m.apple_intelligence)
          break
        case 'lidar':
          result = result.filter((m) => m.lidar)
          break
      }
    }

    // ========== 撮影機能フィルタ ==========
    for (const s of shootingFilters) {
      result = result.filter((m) => m[s])
    }

    // 新しい順にソート
    result.sort((a, b) => {
      const da = a.date ? new Date(a.date).getTime() : 0
      const db = b.date ? new Date(b.date).getTime() : 0
      return db - da
    })

    return result
  }, [models, purposes, budget, displayFilter, cameraFilter, featureFilters, shootingFilters])

  const getShopLink = (productId: number, shopId: number) =>
    shopLinks.find((l) => l.product_id === productId && l.shop_id === shopId)

  const activeFilterCount = purposes.size
    + (budget !== 'any' ? 1 : 0)
    + (displayFilter !== 'any' ? 1 : 0)
    + (cameraFilter !== 'any' ? 1 : 0)
    + featureFilters.size
    + shootingFilters.size

  return (
    <>
      {/* STEP 1: 用途選択 */}
      <section className="l-section l-section--bg-subtle" id="ifd-step1" aria-labelledby="heading-step1">
        <div className="l-container">
          <div className="ifd-step-header">
            <span className="ifd-step-badge">STEP 1</span>
            <h2 className="m-section-heading m-section-heading--lg" id="heading-step1">
              iPhoneの用途を選んでください
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
      <section className="l-section l-section--bg-subtle" id="ifd-step3" aria-labelledby="heading-step3">
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
              {/* ディスプレイサイズ */}
              <div className="ifd-filter-group">
                <h3 className="ifd-filter-group__title">
                  <i className="fa-solid fa-mobile-screen" aria-hidden="true"></i> ディスプレイサイズ
                </h3>
                <div className="spec-filter__tags">
                  {([
                    ['any', 'すべて'],
                    ['small', '~6.1型（コンパクト）'],
                    ['medium', '6.1~6.3型（標準）'],
                    ['large', '6.3型~（大画面）'],
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

              {/* カメラ構成 */}
              <div className="ifd-filter-group">
                <h3 className="ifd-filter-group__title">
                  <i className="fa-solid fa-camera" aria-hidden="true"></i> カメラ構成
                </h3>
                <div className="spec-filter__tags">
                  {([
                    ['any', 'すべて'],
                    ['dual', 'デュアル以上（2眼〜）'],
                    ['triple', 'トリプル（3眼）'],
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

              {/* 撮影機能 */}
              <div className="ifd-filter-group">
                <h3 className="ifd-filter-group__title">
                  <i className="fa-solid fa-film" aria-hidden="true"></i> 撮影機能
                </h3>
                <div className="spec-filter__tags">
                  {SHOOTING_OPTIONS.map((opt) => (
                    <button
                      key={opt.key}
                      className={`spec-filter__tag${shootingFilters.has(opt.key) ? ' is-active' : ''}`}
                      onClick={() => toggleShooting(opt.key)}
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
                const supported = isSupportedModel(m.last_ios)
                const tags = getFeatureTags(m)

                return (
                  <div key={m.id} className="m-card m-card--shadow ifd-result-card">
                    <div className="ifd-result-card__header">
                      <div className="ifd-result-card__img-wrap">
                        {m.image && (
                          <img
                            src={`/images/iphone/${m.image}`}
                            alt={m.model}
                            loading="lazy"
                          />
                        )}
                      </div>
                      <div className="ifd-result-card__info">
                        <Link href={`/iphone/${m.slug}`} className="ifd-result-card__name">
                          {m.model}
                        </Link>
                        <div className="ifd-result-card__tags">
                          {supported ? (
                            <span className="ifd-tag ifd-tag--supported">
                              <i className="fa-solid fa-shield-halved" aria-hidden="true"></i> OSサポート {estimateSupportEnd(m.date, m.last_ios)}
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
                        <div><dt>カメラ構成</dt><dd>{formatCameraConfig(m.front_camera)}</dd></div>
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
