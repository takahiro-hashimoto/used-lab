'use client'
import ContentImage from '../../../../components/ContentImage'

import Link from 'next/link'
import { useState, useMemo, useEffect } from 'react'
import StickyTableWrapper from '@/app/components/StickyTableWrapper'
import { parseDate, formatDate, BoolCell, TextCell, PortCell, formatStorageRange } from '@/app/components/spec-table-utils'
import { calculateOSLifespan } from '@/lib/utils/iphone-helpers'
import type { ProductShopLink } from '@/lib/types'
import SpecEmbedButton from './SpecEmbedButton'
import { AMAZON_PRICE_DISCLAIMER } from '@/lib/data/price-source-note'

type SpecModel = {
  id: number
  model: string
  slug: string
  image: string | null
  date: string | null
  last_ios: string | null
  cpu: string | null
  ram: string | null
  weight: string | null
  strage: string | null
  size: string | null
  display: string | null
  port: string | null
  battery: string | null
  image_sensor: string | null
  apple_intelligence: boolean
  magsafe: boolean
  dynamic_island: boolean
  promotion: boolean
  accident_detection: boolean
  action_button: boolean
  camera_control: boolean
  lidar: boolean
  night_mode: boolean
  portrait_mode: boolean
  cinematic_mode: boolean
  action_mode: boolean
  macro_mode: boolean
  apple_proraw: boolean
  apple_prores: boolean
}

type Props = {
  models: SpecModel[]
  shopLinks: ProductShopLink[]
  prices: Record<number, number | null>
  /** 相場の集計日（"YYYY-MM-DD"）。スペックと違い相場は日々変わるため明示する */
  priceDate?: string | null
  /** 埋め込み(iframe)表示: 販売リンク行と埋め込みボタンを非表示にする */
  embed?: boolean
}

type SortOrder = 'old' | 'new'
type FilterType = 'all' | 'pro-family' | 'standard-family' | 'se-family'
type FeatureFilter = 'size-lg' | 'size-sm' | 'size-xs'
// 中古を探す人の出発点は「予算いくらまで」なので、価格帯で絞れるようにする
type PriceFilter = 'price-1' | 'price-2' | 'price-3' | 'price-4'
const PRICE_RANGES: Record<PriceFilter, { label: string; min: number; max: number }> = {
  'price-1': { label: '〜3万円', min: 0, max: 30000 },
  'price-2': { label: '3〜6万円', min: 30000, max: 60000 },
  'price-3': { label: '6〜10万円', min: 60000, max: 100000 },
  'price-4': { label: '10万円〜', min: 100000, max: Infinity },
}

function getModelCategory(model: string): string {
  const lower = model.toLowerCase()
  if (lower.includes('pro max')) return 'promax'
  if (lower.includes('pro')) return 'pro'
  if (lower.includes('plus')) return 'plus'
  if (lower.includes('se') || lower.includes('16e') || lower.includes('17e')) return 'se'
  if (lower.includes('mini')) return 'mini'
  return 'standard'
}

function parseDisplayInch(display: string | null): number {
  if (!display) return 0
  const match = display.match(/([\d.]+)\s*インチ/)
  return match ? parseFloat(match[1]) : 0
}

function extractScreenInch(display: string | null): string | null {
  if (!display) return null
  const match = display.match(/([\d.]+)\s*インチ/)
  return match ? `${match[1]}インチ` : null
}

/** "2026-07-30" → "7/30" */
function formatPriceDate(date: string): string {
  const [, m, d] = date.split('-').map(Number)
  return m && d ? `${m}/${d}` : date
}

export default function SpecTable({ models, shopLinks, prices, priceDate, embed = false }: Props) {
  const [sortOrder, setSortOrder] = useState<SortOrder>(() => {
    if (typeof window === 'undefined') return 'old'
    const v = new URLSearchParams(window.location.search).get('sort')
    return (v === 'new' || v === 'old') ? v : 'old'
  })
  const [modelFilter, setModelFilter] = useState<FilterType>(() => {
    if (typeof window === 'undefined') return 'all'
    const v = new URLSearchParams(window.location.search).get('model')
    return (v === 'pro-family' || v === 'standard-family' || v === 'se-family') ? v : 'all'
  })
  const [featureFilter, setFeatureFilter] = useState<FeatureFilter | null>(() => {
    if (typeof window === 'undefined') return null
    const v = new URLSearchParams(window.location.search).get('size')
    return (v === 'size-lg' || v === 'size-sm' || v === 'size-xs') ? v : null
  })

  const [priceFilter, setPriceFilter] = useState<PriceFilter | null>(() => {
    if (typeof window === 'undefined') return null
    const v = new URLSearchParams(window.location.search).get('price')
    return v && v in PRICE_RANGES ? (v as PriceFilter) : null
  })

  // フィルタ変更時にURLを更新
  useEffect(() => {
    const p = new URLSearchParams()
    if (sortOrder !== 'old') p.set('sort', sortOrder)
    if (modelFilter !== 'all') p.set('model', modelFilter)
    if (featureFilter) p.set('size', featureFilter)
    if (priceFilter) p.set('price', priceFilter)
    const qs = p.toString()
    window.history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname)
  }, [sortOrder, modelFilter, featureFilter, priceFilter])

  const toggleFeature = (f: FeatureFilter) => {
    setFeatureFilter((prev) => (prev === f ? null : f))
  }

  const filteredModels = useMemo(() => {
    let result = [...models]

    // 機種別フィルタ
    if (modelFilter !== 'all') {
      const cat = getModelCategory
      if (modelFilter === 'pro-family') {
        result = result.filter((m) => ['promax', 'pro'].includes(cat(m.model)))
      } else if (modelFilter === 'standard-family') {
        result = result.filter((m) => ['plus', 'standard', 'mini'].includes(cat(m.model)))
      } else if (modelFilter === 'se-family') {
        result = result.filter((m) => ['se'].includes(cat(m.model)))
      }
    }

    // サイズフィルタ
    if (featureFilter) {
      switch (featureFilter) {
        case 'size-lg':
          result = result.filter((m) => { const s = parseDisplayInch(m.display); return s >= 6.7 && s <= 6.9 })
          break
        case 'size-sm':
          result = result.filter((m) => { const s = parseDisplayInch(m.display); return s >= 6.1 && s <= 6.3 })
          break
        case 'size-xs':
          result = result.filter((m) => { const s = parseDisplayInch(m.display); return s > 0 && s < 6.1 })
          break
      }
    }

    // 価格帯フィルタ（相場が未取得の機種は絞り込み時に除外する）
    if (priceFilter) {
      const { min, max } = PRICE_RANGES[priceFilter]
      result = result.filter((m) => {
        const price = prices[m.id]
        return price != null && price >= min && price < max
      })
    }

    // 並び替え
    result.sort((a, b) => {
      const da = parseDate(a.date).getTime()
      const db = parseDate(b.date).getTime()
      return sortOrder === 'old' ? da - db : db - da
    })

    return result
  }, [models, sortOrder, modelFilter, featureFilter, priceFilter, prices])

  const getShopLink = (productId: number, shopId: number) =>
    shopLinks.find((l) => l.product_id === productId && l.shop_id === shopId)

  const SPEC_ROWS: { label: React.ReactNode; render: (m: SpecModel) => React.ReactNode }[] = [
    {
      label: <>発売日<br /><span style={{ fontSize: '0.75em', fontWeight: 'normal' }}>サポート期間（予想）</span></>,
      render: (m) => {
        const { osEndYear } = calculateOSLifespan(m.date, m.last_ios)
        return (
          <>
            {formatDate(m.date)}
            <br />
            <span style={{ fontSize: '0.8em', color: '#888' }}>{osEndYear ? `〜${osEndYear}年` : '-'}</span>
          </>
        )
      },
    },
    {
      // 中古サイトの比較表で最も重要な判断材料。スペックより先に置く。
      // 値は実勢相場（販売中商品の中央値）で、詳細ページ・相場一覧と同じ指標
      label: '中古相場',
      render: (m) => {
        const price = prices[m.id]
        if (price == null) return <span style={{ color: '#888' }}>-</span>
        return <strong style={{ color: 'var(--color-primary)', whiteSpace: 'nowrap' }}>&yen;{price.toLocaleString()}</strong>
      },
    },
    { label: 'CPU', render: (m) => m.cpu ? <TextCell value={m.cpu} /> : '-' },
    { label: 'RAM', render: (m) => m.ram || '-' },
    { label: '重量', render: (m) => m.weight || '-' },
    { label: 'ストレージ', render: (m) => formatStorageRange(m.strage) },
    { label: 'コネクター', render: (m) => m.port ? <PortCell value={m.port} /> : '-' },
    { label: 'バッテリー容量', render: (m) => m.battery || '-' },
    { label: '外カメラ', render: (m) => m.image_sensor ? <TextCell value={m.image_sensor} /> : '-' },
    { label: 'Apple Intelligence', render: (m) => <BoolCell value={m.apple_intelligence} /> },
    { label: 'MagSafe', render: (m) => <BoolCell value={m.magsafe} /> },
    { label: 'Dynamic Island', render: (m) => <BoolCell value={m.dynamic_island} /> },
    { label: 'ProMotion', render: (m) => <BoolCell value={m.promotion} /> },
    { label: '事故衝突検知', render: (m) => <BoolCell value={m.accident_detection} /> },
    { label: 'アクションボタン', render: (m) => <BoolCell value={m.action_button} /> },
    { label: <span style={{ fontSize: '0.85em' }}>カメラコントロール</span>, render: (m) => <BoolCell value={m.camera_control} /> },
    { label: 'LiDARスキャン', render: (m) => <BoolCell value={m.lidar} /> },
    { label: 'ナイト', render: (m) => <BoolCell value={m.night_mode} /> },
    { label: 'ポートレート', render: (m) => <BoolCell value={m.portrait_mode} /> },
    { label: 'シネマティック', render: (m) => <BoolCell value={m.cinematic_mode} /> },
    { label: 'アクション', render: (m) => <BoolCell value={m.action_mode} /> },
    { label: 'マクロ撮影', render: (m) => <BoolCell value={m.macro_mode} /> },
    { label: 'Apple ProRAW', render: (m) => <BoolCell value={m.apple_proraw} /> },
    { label: 'Apple ProRes', render: (m) => <BoolCell value={m.apple_prores} /> },
  ]

  return (
    <section className="l-section" id="spec-table" aria-labelledby="heading-spec-table">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-spec-table">
          歴代iPhoneのスペック比較表一覧
        </h2>
        <p className="m-section-desc">
          歴代iPhoneの主要スペックを一覧で比較できます。
          カメラ関連は<Link prefetch={false} href="/iphone/iphone-camera/">歴代iPhoneカメラ性能の比較まとめ</Link>で解説しています。
        </p>

        {/* フィルターUI。行数が多く縦を取るので、広い画面では横に詰めて折り返す */}
        <fieldset className="spec-filter u-mb-xl">
          <legend className="visually-hidden">テーブルの絞り込み</legend>
          <div className="spec-filter__row">
            <span className="spec-filter__label">並び替え</span>
            <div className="spec-filter__tags">
              <button
                className={`spec-filter__tag${sortOrder === 'old' ? ' is-active' : ''}`}
                onClick={() => setSortOrder('old')}
                aria-pressed={sortOrder === 'old'}
              >
                発売日が古い順
              </button>
              <button
                className={`spec-filter__tag${sortOrder === 'new' ? ' is-active' : ''}`}
                onClick={() => setSortOrder('new')}
                aria-pressed={sortOrder === 'new'}
              >
                発売日が新しい順
              </button>
            </div>
          </div>
          <div className="spec-filter__row">
            <span className="spec-filter__label">価格帯</span>
            <div className="spec-filter__tags">
              {(Object.entries(PRICE_RANGES) as [PriceFilter, { label: string }][]).map(([key, { label }]) => (
                <button
                  key={key}
                  className={`spec-filter__tag${priceFilter === key ? ' is-active' : ''}`}
                  onClick={() => setPriceFilter((prev) => (prev === key ? null : key))}
                  aria-pressed={priceFilter === key}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="spec-filter__row">
            <span className="spec-filter__label">機種別</span>
            <div className="spec-filter__tags">
              {([
                ['all', 'すべて'],
                ['pro-family', 'Pro'],
                ['standard-family', 'スタンダード'],
                ['se-family', '廉価モデル'],
              ] as [FilterType, string][]).map(([key, label]) => (
                <button
                  key={key}
                  className={`spec-filter__tag${modelFilter === key ? ' is-active' : ''}`}
                  onClick={() => setModelFilter(key)}
                  aria-pressed={modelFilter === key}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="spec-filter__row">
            <span className="spec-filter__label">サイズ別</span>
            <div className="spec-filter__tags">
              {([
                ['size-lg', '6.7~6.9型'],
                ['size-sm', '6.1~6.3型'],
                ['size-xs', '6.1型以下'],
              ] as [FeatureFilter, string][]).map(([key, label]) => (
                <button
                  key={key}
                  className={`spec-filter__tag${featureFilter === key ? ' is-active' : ''}`}
                  onClick={() => toggleFeature(key)}
                  aria-pressed={featureFilter === key}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </fieldset>

        {/* テーブル */}
        {filteredModels.length === 0 ? (
          <p className="m-section-desc">該当するモデルがありません。フィルターを変更してください。</p>
        ) : (
          <StickyTableWrapper className="m-card m-card--shadow m-table-card" floatingHeader>
            <div className="m-table-scroll">
              <table className="m-table spec-compare-table">
                <caption className="visually-hidden">歴代iPhoneスペック比較表</caption>
                <thead>
                  <tr>
                    <th scope="col" className="spec-compare-table__sticky"></th>
                    {filteredModels.map((m) => (
                      <th key={m.id} scope="col">{m.model}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" className="spec-compare-table__sticky">サイズ</th>
                    {filteredModels.map((m) => (
                      <td key={m.id} style={{ textAlign: 'center', padding: 'var(--space-sm)' }}>
                        {m.image && (
                          <ContentImage
                            src={`/images/iphone/${m.image}`}
                            alt={m.model}
                            width={50}
                            height={65}
                            loading="lazy"
                            sizes="50px" className="spec-compare-table__cell-img"
                          />
                        )}
                        <div style={{ fontSize: '0.8em', marginTop: '0.25rem' }}>{extractScreenInch(m.display) || '-'}</div>
                      </td>
                    ))}
                  </tr>
                  {SPEC_ROWS.map((row, rowIdx) => (
                    <tr key={rowIdx}>
                      <th scope="row" className="spec-compare-table__sticky">{row.label}</th>
                      {filteredModels.map((m) => (
                        <td key={m.id}>{row.render(m)}</td>
                      ))}
                    </tr>
                  ))}
                  {/* 販売リンク行（埋め込み表示では非表示） */}
                  {!embed && (
                    <>
                      {/* イオシスリンク行 */}
                      <tr className="spec-compare-table__action-row">
                        <th scope="row" className="spec-compare-table__sticky">イオシス</th>
                        {filteredModels.map((m) => {
                          const link = getShopLink(m.id, 1)
                          return (
                            <td key={m.id}>
                              {link ? (
                                <a href={link.url} className="m-btn m-btn--primary m-btn--sm" rel="nofollow noopener noreferrer" target="_blank" aria-label={`${m.model}をイオシスで探す（新しいタブで開く）`}>
                                  イオシスで見る
                                </a>
                              ) : '-'}
                            </td>
                          )
                        })}
                      </tr>
                      {/* Amazonリンク行（リンクのみ。Amazonの価格は取得・表示しない） */}
                      <tr className="spec-compare-table__action-row">
                        <th scope="row" className="spec-compare-table__sticky">Amazon</th>
                        {filteredModels.map((m) => {
                          const link = getShopLink(m.id, 7)
                          return (
                            <td key={m.id}>
                              {link ? (
                                <a href={link.url} className="m-btn m-btn--amazon m-btn--sm" rel="nofollow noopener noreferrer" target="_blank" aria-label={`${m.model}をAmazonで探す（新しいタブで開く）`}>
                                  Amazonで見る
                                </a>
                              ) : '-'}
                            </td>
                          )
                        })}
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </StickyTableWrapper>
        )}
        <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#888', lineHeight: 1.7 }}>
          {/* 相場の算出根拠と集計日は列幅を圧迫するため、表の外にまとめる */}
          ※ 中古相場は販売中の商品の実勢価格（中央値）です{priceDate && `（${formatPriceDate(priceDate)}時点）`}。
          各機種の価格推移グラフは「<Link prefetch={false} href="/iphone/price-info/" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>iPhone中古相場・価格推移ページ</Link>」でご確認いただけます。
          <br />
          {AMAZON_PRICE_DISCLAIMER}
        </p>
        {!embed && <SpecEmbedButton />}
      </div>
    </section>
  )
}
