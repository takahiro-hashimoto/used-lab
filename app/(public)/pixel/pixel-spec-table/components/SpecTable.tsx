'use client'
import ContentImage from '../../../../components/ContentImage'

import Link from 'next/link'
import { useState, useMemo, useEffect } from 'react'
import StickyTableWrapper from '@/app/components/StickyTableWrapper'
import { parseDate, formatDate, BoolCell, TextCell, PortCell, formatStorageRange } from '@/app/components/spec-table-utils'
import type { ProductShopLink } from '@/lib/types'
import { AMAZON_PRICE_DISCLAIMER } from '@/lib/data/price-source-note'
import { formatAnnualCost, remainingYearsFromSupportUntil } from '@/lib/utils/shared-helpers'

type SpecModel = {
  id: number
  model: string
  slug: string
  image: string | null
  date: string | null
  support_until: string | null
  cpu: string | null
  tensor_gen: string | null
  ram: string | null
  weight: string | null
  strage: string | null
  size: string | null
  display: string | null
  refresh_rate: string | null
  port: string | null
  water_resistance: string | null
  felica: boolean
  battery: string | null
  wired_charging: string | null
  wireless_charging: string | null
  main_camera: string | null
  ultrawide_camera: string | null
  tele_camera: string | null
  front_camera: string | null
  magic_eraser: boolean
  best_take: boolean
  magic_editor: boolean
  night_sight: boolean
  real_tone: boolean
  temp_sensor: boolean
  video_boost: boolean
}

type Props = {
  models: SpecModel[]
  shopLinks: ProductShopLink[]
  prices: Record<number, number | null>
  /** 相場の集計日（"YYYY-MM-DD"）。スペックと違い相場は日々変わるため明示する */
  priceDate?: string | null
}

type SortOrder = 'old' | 'new' | 'price-asc'
// 中古を探す人の出発点は「予算いくらまで」なので、価格帯で絞れるようにする
type PriceFilter = 'price-1' | 'price-2' | 'price-3' | 'price-4'
const PRICE_RANGES: Record<PriceFilter, { label: string; min: number; max: number }> = {
  'price-1': { label: '〜3万円', min: 0, max: 30000 },
  'price-2': { label: '3〜6万円', min: 30000, max: 60000 },
  'price-3': { label: '6〜10万円', min: 60000, max: 100000 },
  'price-4': { label: '10万円〜', min: 100000, max: Infinity },
}
type FilterType = 'all' | 'pro-family' | 'standard-family' | 'a-family'
type FeatureFilter = 'size-lg' | 'size-sm' | 'size-xs'

function getModelCategory(model: string): string {
  const lower = model.toLowerCase()
  if (lower.includes('fold')) return 'fold'
  if (lower.includes('pro')) return 'pro'
  if (/\d+a(\s|$|\))/.test(lower)) return 'a'
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
    if (typeof window === 'undefined') return 'new'
    const v = new URLSearchParams(window.location.search).get('sort')
    return (v === 'new' || v === 'old' || v === 'price-asc') ? v : 'new'
  })
  const [modelFilter, setModelFilter] = useState<FilterType>(() => {
    if (typeof window === 'undefined') return 'all'
    const v = new URLSearchParams(window.location.search).get('model')
    return (v === 'pro-family' || v === 'standard-family' || v === 'a-family') ? v : 'all'
  })
  const [featureFilter, setFeatureFilter] = useState<FeatureFilter | null>(() => {
    if (typeof window === 'undefined') return null
    const v = new URLSearchParams(window.location.search).get('size')
    return (v === 'size-lg' || v === 'size-sm' || v === 'size-xs') ? v : null
  })

  // フィルタ変更時にURLを更新
  const [priceFilter, setPriceFilter] = useState<PriceFilter | null>(() => {
    if (typeof window === 'undefined') return null
    const v = new URLSearchParams(window.location.search).get('price')
    return v && v in PRICE_RANGES ? (v as PriceFilter) : null
  })

  useEffect(() => {
    const p = new URLSearchParams()
    if (sortOrder !== 'new') p.set('sort', sortOrder)
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
        result = result.filter((m) => ['pro', 'fold'].includes(cat(m.model)))
      } else if (modelFilter === 'standard-family') {
        result = result.filter((m) => ['standard'].includes(cat(m.model)))
      } else if (modelFilter === 'a-family') {
        result = result.filter((m) => ['a'].includes(cat(m.model)))
      }
    }

    // サイズフィルタ
    if (featureFilter) {
      switch (featureFilter) {
        case 'size-lg':
          result = result.filter((m) => { const s = parseDisplayInch(m.display); return s >= 6.6 })
          break
        case 'size-sm':
          result = result.filter((m) => { const s = parseDisplayInch(m.display); return s >= 6.2 && s < 6.6 })
          break
        case 'size-xs':
          result = result.filter((m) => { const s = parseDisplayInch(m.display); return s > 0 && s < 6.2 })
          break
      }
    }

    // 並び替え
    // 価格帯フィルタ（相場が未取得の機種は絞り込み時に除外する）
    if (priceFilter) {
      const { min, max } = PRICE_RANGES[priceFilter]
      result = result.filter((m) => {
        const price = prices[m.id]
        return price != null && price >= min && price < max
      })
    }

    result.sort((a, b) => {
      if (sortOrder === 'price-asc') {
        // 相場が未取得の機種は比較できないので末尾へ回す
        const pa = prices[a.id] ?? Infinity
        const pb = prices[b.id] ?? Infinity
        if (pa !== pb) return pa - pb
        return parseDate(b.date).getTime() - parseDate(a.date).getTime()
      }
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
        // 価格の下に年単価を添える。サポート残り年数で割った「1年あたりの負担」で、
        // 価格だけ・サポート期間だけでは見えない割高／割安が分かる
        const annual = formatAnnualCost(price, remainingYearsFromSupportUntil(m.support_until))
        return (
          <>
            <strong style={{ color: 'var(--color-primary)', whiteSpace: 'nowrap' }}>&yen;{price.toLocaleString()}</strong>
            {annual && <span className="spec-compare-table__annual">{annual}</span>}
          </>
        )
      },
    },
    { label: 'チップ', render: (m) => m.cpu ? <TextCell value={m.cpu} /> : '-' },
    { label: 'Tensor世代', render: (m) => m.tensor_gen || '-' },
    { label: 'RAM', render: (m) => m.ram || '-' },
    { label: '重量', render: (m) => m.weight || '-' },
    { label: 'ストレージ', render: (m) => formatStorageRange(m.strage) },
    { label: 'リフレッシュレート', render: (m) => m.refresh_rate ? <TextCell value={m.refresh_rate} /> : '-' },
    { label: 'コネクター', render: (m) => m.port ? <PortCell value={m.port} /> : '-' },
    { label: '防水防塵', render: (m) => m.water_resistance || '-' },
    { label: 'おサイフケータイ', render: (m) => <BoolCell value={m.felica} /> },
    { label: 'バッテリー容量', render: (m) => m.battery || '-' },
    { label: '有線充電', render: (m) => m.wired_charging || '-' },
    { label: 'ワイヤレス充電', render: (m) => m.wireless_charging ? <TextCell value={m.wireless_charging} /> : '-' },
    { label: 'メインカメラ', render: (m) => m.main_camera ? <TextCell value={m.main_camera} /> : '-' },
    { label: '超広角カメラ', render: (m) => m.ultrawide_camera ? <TextCell value={m.ultrawide_camera} /> : '-' },
    { label: '望遠カメラ', render: (m) => m.tele_camera ? <TextCell value={m.tele_camera} /> : '-' },
    { label: 'フロントカメラ', render: (m) => m.front_camera ? <TextCell value={m.front_camera} /> : '-' },
    { label: '消しゴムマジック', render: (m) => <BoolCell value={m.magic_eraser} /> },
    { label: 'ベストテイク', render: (m) => <BoolCell value={m.best_take} /> },
    { label: '編集マジック', render: (m) => <BoolCell value={m.magic_editor} /> },
    { label: '夜景モード', render: (m) => <BoolCell value={m.night_sight} /> },
    { label: 'リアルトーン', render: (m) => <BoolCell value={m.real_tone} /> },
    { label: '温度センサー', render: (m) => <BoolCell value={m.temp_sensor} /> },
    { label: '動画ブースト', render: (m) => <BoolCell value={m.video_boost} /> },
  ]

  return (
    <section className="l-section" id="spec-table" aria-labelledby="heading-spec-table">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-spec-table">
          歴代Google Pixelのスペック比較表一覧
        </h2>
        <p className="m-section-desc">
          歴代Google Pixelの主要スペックを一覧で比較できます。
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
              <button
                className={`spec-filter__tag${sortOrder === 'price-asc' ? ' is-active' : ''}`}
                onClick={() => setSortOrder('price-asc')}
                aria-pressed={sortOrder === 'price-asc'}
              >
                中古相場が安い順
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
                ['a-family', 'aシリーズ'],
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
                ['size-lg', '6.6型以上'],
                ['size-sm', '6.2~6.5型'],
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

        {/* 絞り込みの結果件数。フィルタを押しても表の変化が視界に入らない
            （特にモバイルは横スクロールの先が見えない）ため、効いたことを明示する */}
        {filteredModels.length > 0 && (
          <p className="spec-filter__result" aria-live="polite">
            全{models.length}機種中 <strong>{filteredModels.length}機種</strong>を表示中
          </p>
        )}

        {/* テーブル */}
        {filteredModels.length === 0 ? (
          <p className="m-section-desc">該当するモデルがありません。フィルターを変更してください。</p>
        ) : (
          <StickyTableWrapper className="m-card m-card--shadow m-table-card" floatingHeader>
            <div className="m-table-scroll">
              <table className="m-table spec-compare-table">
                <caption className="visually-hidden">歴代Google Pixelスペック比較表</caption>
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
                            src={`/images/pixel/${m.image}`}
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
                </tbody>
              </table>
            </div>
          </StickyTableWrapper>
        )}
        <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#888', lineHeight: 1.7 }}>
          ※ 中古相場は販売中の商品の実勢価格（中央値）です{priceDate && `（${formatPriceDate(priceDate)}時点）`}。
          各機種の価格推移グラフは「<Link prefetch={false} href="/pixel/price-info/" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>Pixel中古相場・価格推移ページ</Link>」でご確認いただけます。
          <br />
          ※ 相場の下の年単価は、中古相場をOSサポートの残り年数で割った「1年あたりの負担額」です。価格が同じでもサポートが長い機種ほど割安になります。
          <br />
          {AMAZON_PRICE_DISCLAIMER}
        </p>
      </div>
    </section>
  )
}
