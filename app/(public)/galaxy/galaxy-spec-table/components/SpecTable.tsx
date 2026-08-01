'use client'
import ContentImage from '../../../../components/ContentImage'

import Link from 'next/link'
import { useState, useMemo, useEffect } from 'react'
import StickyTableWrapper from '@/app/components/StickyTableWrapper'
import { parseDate, formatDate, BoolCell, TextCell, PortCell, formatStorageRange } from '@/app/components/spec-table-utils'
import type { ProductShopLink } from '@/lib/types'

type SpecModel = {
  id: number
  model: string
  slug: string
  image: string | null
  date: string | null
  support_until: string | null
  series: string | null
  cpu: string | null
  model_number: string | null
  ram: string | null
  weight: string | null
  strage: string | null
  size: string | null
  display: string | null
  refresh_rate: string | null
  cover_display: string | null
  port: string | null
  water_resistance: string | null
  felica: boolean
  microsd: boolean
  battery: string | null
  wired_charging: string | null
  wireless_charging: string | null
  reverse_charging: boolean
  main_camera: string | null
  ultrawide_camera: string | null
  tele_camera: string | null
  front_camera: string | null
  optical_zoom: string | null
  galaxy_ai: boolean
  circle_to_search: boolean
  object_eraser: boolean
  s_pen: boolean
  dex: boolean
}

type Props = {
  models: SpecModel[]
  shopLinks: ProductShopLink[]
  prices: Record<number, number | null>
  /** 相場の集計日（"YYYY-MM-DD"）。スペックと違い相場は日々変わるため明示する */
  priceDate?: string | null
}

type SortOrder = 'old' | 'new'
// 中古を探す人の出発点は「予算いくらまで」なので、価格帯で絞れるようにする
type PriceFilter = 'price-1' | 'price-2' | 'price-3' | 'price-4'
const PRICE_RANGES: Record<PriceFilter, { label: string; min: number; max: number }> = {
  'price-1': { label: '〜3万円', min: 0, max: 30000 },
  'price-2': { label: '3〜6万円', min: 30000, max: 60000 },
  'price-3': { label: '6〜10万円', min: 60000, max: 100000 },
  'price-4': { label: '10万円〜', min: 100000, max: Infinity },
}
type FilterType = 'all' | 'ultra-family' | 'standard-family' | 'a-family' | 'fold-family'
type FeatureFilter = 'size-lg' | 'size-sm' | 'size-xs'

function isFolding(series: string | null): boolean {
  return !!series && series.startsWith('Z')
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

function formatSupportUntil(s: string | null): string {
  if (!s) return '-'
  const [y, m] = s.split('-')
  return m ? `〜${y}年${parseInt(m, 10)}月` : `〜${y}年`
}

/** "2026-07-30" → "7/30" */
function formatPriceDate(date: string): string {
  const [, m, d] = date.split('-').map(Number)
  return m && d ? `${m}/${d}` : date
}

export default function SpecTable({ models, shopLinks, prices, priceDate }: Props) {
  const [sortOrder, setSortOrder] = useState<SortOrder>(() => {
    if (typeof window === 'undefined') return 'old'
    const v = new URLSearchParams(window.location.search).get('sort')
    return (v === 'new' || v === 'old') ? v : 'old'
  })
  const [modelFilter, setModelFilter] = useState<FilterType>(() => {
    if (typeof window === 'undefined') return 'all'
    const v = new URLSearchParams(window.location.search).get('model')
    return (v === 'ultra-family' || v === 'standard-family' || v === 'a-family' || v === 'fold-family') ? v : 'all'
  })

  // フィルタ変更時にURLを更新
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

  useEffect(() => {
    const p = new URLSearchParams()
    if (sortOrder !== 'old') p.set('sort', sortOrder)
    if (modelFilter !== 'all') p.set('model', modelFilter)
    if (featureFilter) p.set('size', featureFilter)
    if (priceFilter) p.set('price', priceFilter)
    const qs = p.toString()
    window.history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname)
  }, [sortOrder, modelFilter, featureFilter, priceFilter])

  const filteredModels = useMemo(() => {
    let result = [...models]

    // 機種別フィルタ。Ultra とそれ以外のSシリーズは価格も立ち位置も違うため分ける
    if (modelFilter !== 'all') {
      if (modelFilter === 'ultra-family') {
        result = result.filter((m) => /ultra/i.test(m.model))
      } else if (modelFilter === 'standard-family') {
        result = result.filter((m) => m.series === 'S' && !/ultra/i.test(m.model))
      } else if (modelFilter === 'a-family') {
        result = result.filter((m) => m.series === 'A')
      } else if (modelFilter === 'fold-family') {
        result = result.filter((m) => isFolding(m.series))
      }
    }

    // 並び替え
    // サイズ別フィルタ（同じ選択をもう一度押すと解除）
    if (featureFilter) {
      if (featureFilter === 'size-lg') {
        result = result.filter((m) => parseDisplayInch(m.display) >= 6.7)
      } else if (featureFilter === 'size-sm') {
        const inRange = (v: number) => v >= 6.3 && v < 6.7
        result = result.filter((m) => inRange(parseDisplayInch(m.display)))
      } else {
        result = result.filter((m) => { const v = parseDisplayInch(m.display); return v > 0 && v < 6.3 })
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
      label: <>発売日<br /><span style={{ fontSize: '0.75em', fontWeight: 'normal' }}>サポート終了予定</span></>,
      render: (m) => (
        <>
          {formatDate(m.date)}
          <br />
          <span style={{ fontSize: '0.8em', color: '#888' }}>{formatSupportUntil(m.support_until)}</span>
        </>
      ),
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
    { label: 'チップ', render: (m) => m.cpu ? <TextCell value={m.cpu} /> : '-' },
    { label: '型番', render: (m) => m.model_number ? <TextCell value={m.model_number} /> : '-' },
    { label: 'RAM', render: (m) => m.ram || '-' },
    { label: '重量', render: (m) => m.weight || '-' },
    { label: 'ストレージ', render: (m) => formatStorageRange(m.strage) },
    {
      label: '画面',
      render: (m) => (
        <>
          {m.display ? <TextCell value={m.display} /> : '-'}
          {m.refresh_rate && <div style={{ fontSize: '0.8em', color: '#888', marginTop: '0.25rem' }}>{m.refresh_rate}</div>}
        </>
      ),
    },
    { label: 'カバー画面', render: (m) => m.cover_display ? <TextCell value={m.cover_display} /> : '-' },
    { label: 'コネクター', render: (m) => m.port ? <PortCell value={m.port} /> : '-' },
    { label: '防水防塵', render: (m) => m.water_resistance || '-' },
    { label: 'おサイフケータイ', render: (m) => <BoolCell value={m.felica} /> },
    { label: 'microSD', render: (m) => <BoolCell value={m.microsd} /> },
    { label: 'バッテリー容量', render: (m) => m.battery || '-' },
    { label: '有線充電', render: (m) => m.wired_charging || '-' },
    { label: 'ワイヤレス充電', render: (m) => m.wireless_charging ? <TextCell value={m.wireless_charging} /> : '-' },
    { label: 'Wireless PowerShare', render: (m) => <BoolCell value={m.reverse_charging} /> },
    { label: 'メインカメラ', render: (m) => m.main_camera ? <TextCell value={m.main_camera} /> : '-' },
    { label: '超広角カメラ', render: (m) => m.ultrawide_camera ? <TextCell value={m.ultrawide_camera} /> : '-' },
    { label: '望遠カメラ', render: (m) => m.tele_camera ? <TextCell value={m.tele_camera} /> : '-' },
    { label: '光学ズーム', render: (m) => m.optical_zoom ? <TextCell value={m.optical_zoom} /> : '-' },
    { label: 'フロントカメラ', render: (m) => m.front_camera ? <TextCell value={m.front_camera} /> : '-' },
    { label: 'Galaxy AI', render: (m) => <BoolCell value={m.galaxy_ai} /> },
    { label: 'かこって検索', render: (m) => <BoolCell value={m.circle_to_search} /> },
    { label: 'オブジェクト消去', render: (m) => <BoolCell value={m.object_eraser} /> },
    { label: 'S Pen対応', render: (m) => <BoolCell value={m.s_pen} /> },
    { label: 'Samsung DeX', render: (m) => <BoolCell value={m.dex} /> },
  ]

  return (
    <section className="l-section" id="spec-table" aria-labelledby="heading-spec-table">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-spec-table">
          歴代Samsung Galaxyのスペック比較表一覧
        </h2>
        <p className="m-section-desc">
          歴代Samsung Galaxyの主要スペックを一覧で比較できます。
        </p>

        {/* フィルターUI */}
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
                ['ultra-family', 'Ultra'],
                ['standard-family', 'スタンダード'],
                ['a-family', '廉価モデル'],
                ['fold-family', '折りたたみ'],
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
                ['size-lg', '6.7型以上'],
                ['size-sm', '6.3~6.6型'],
                ['size-xs', '6.2型以下'],
              ] as [FeatureFilter, string][]).map(([key, label]) => (
                <button
                  key={key}
                  className={`spec-filter__tag${featureFilter === key ? ' is-active' : ''}`}
                  onClick={() => setFeatureFilter((prev) => (prev === key ? null : key))}
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
                <caption className="visually-hidden">歴代Samsung Galaxyスペック比較表</caption>
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
                            src={`/images/galaxy/${m.image}`}
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
                  {/* 販売リンク行 */}
                  <tr className="spec-compare-table__action-row">
                    <th scope="row" className="spec-compare-table__sticky">イオシス</th>
                    {filteredModels.map((m) => {
                      const link = getShopLink(m.id, 1)
                      return (
                        <td key={m.id}>
                          {link ? (
                            <a href={link.url} className="m-btn m-btn--primary m-btn--sm" rel="nofollow noopener noreferrer" target="_blank" aria-label={`${m.model}をイオシスで探す（新しいタブで開く）`}>
                              最安値を確認
                            </a>
                          ) : '-'}
                        </td>
                      )
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </StickyTableWrapper>
        )}
        <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#888', lineHeight: 1.7 }}>
          ※ 中古相場は販売中の商品の実勢価格（中央値）です{priceDate && `（${formatPriceDate(priceDate)}時点）`}。
          各機種の価格推移グラフは「<Link prefetch={false} href="/galaxy/price-info/" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>Galaxy中古相場・価格推移ページ</Link>」でご確認いただけます。
        </p>
      </div>
    </section>
  )
}
