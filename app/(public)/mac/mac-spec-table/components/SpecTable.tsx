'use client'

import Link from 'next/link'
import { useState, useMemo, useEffect } from 'react'
import ContentImage from '@/app/components/ContentImage'
import StickyTableWrapper from '@/app/components/StickyTableWrapper'
import { parseDate, formatDate, BoolCell, PortSpec, DetailSpec } from '@/app/components/spec-table-utils'
import { calculateOSLifespan } from '@/lib/utils/macbook-helpers'
import type { ProductShopLink, MacDeviceType } from '@/lib/types'
import { AMAZON_PRICE_DISCLAIMER } from '@/lib/data/price-source-note'
import { formatAnnualCost } from '@/lib/utils/shared-helpers'

// MacBook版（macbook-spec-table/components/SpecTable.tsx）が元。
// ノート固有の列（重量・バッテリー・MagSafe・ProMotion・冷却ファン）を落とし、
// デスクトップの判断材料（内蔵ディスプレイ・Ethernet・同梱物・GPUコア）に差し替えている。
// 絞り込みは「インチ」ではなく device_type（iMac / Mac mini / Mac Studio）。

type SpecModel = {
  id: number
  model: string
  shortname: string | null
  slug: string
  image: string | null
  date: string | null
  device_type: MacDeviceType
  last_macos: string | null
  cpu: string | null
  gpu: string | null
  ram: string | null
  strage: string | null
  size: string | null
  display_builtin: boolean
  display: string | null
  resolution: string | null
  luminance: string | null
  thunderbolt: string | null
  thunderbolt_gen: string | null
  usb_c: string | null
  usb_a: string | null
  headphone: boolean
  hdmi: boolean
  slot: boolean
  ethernet: string | null
  external_display: string | null
  camera: string | null
  speaker: string | null
  included_accessories: string | null
  apple_intelligence: boolean
  color: string | null
}

type Props = {
  models: SpecModel[]
  shopLinks: ProductShopLink[]
  prices: Record<number, number | null>
  /** 相場の集計日（"YYYY-MM-DD"）。スペックと違い相場は日々変わるため明示する */
  priceDate?: string | null
  /** 埋め込み(iframe)表示: 販売リンク行を非表示にする */
  embed?: boolean
}

type SortOrder = 'old' | 'new' | 'price-asc'
type PriceFilter = 'price-1' | 'price-2' | 'price-3' | 'price-4'

// 中古デスクトップMacの実勢に合わせた区切り。
// ノート（10万円刻み）と違い、Mac mini が5万円前後から、
// Mac Studio が20万円超からという分布になるため下側を細かくしている
const PRICE_RANGES: Record<PriceFilter, { label: string; min: number; max: number }> = {
  'price-1': { label: '〜5万円', min: 0, max: 50000 },
  'price-2': { label: '5〜10万円', min: 50000, max: 100000 },
  'price-3': { label: '10〜20万円', min: 100000, max: 200000 },
  'price-4': { label: '20万円〜', min: 200000, max: Infinity },
}

type FilterType = 'all' | MacDeviceType

const TYPE_FILTERS: [FilterType, string][] = [
  ['all', 'すべて'],
  ['imac', 'iMac'],
  ['mac-mini', 'Mac mini'],
  ['mac-studio', 'Mac Studio'],
]

const isDeviceType = (v: string | null): v is MacDeviceType =>
  v === 'imac' || v === 'mac-mini' || v === 'mac-studio'

/** "2026-07-30" → "7/30" */
function formatPriceDate(date: string): string {
  const [, m, d] = date.split('-').map(Number)
  return m && d ? `${m}/${d}` : date
}

/** "A / B / C" を改行で積む。セル幅が狭い列で1行に収まらないため */
function stacked(value: string | null): React.ReactNode {
  if (!value) return '-'
  const parts = value.split(/\s*\/\s*/)
  if (parts.length <= 1) return value
  return <>{parts.map((p, i) => <span key={i}>{i > 0 && <br />}{p}</span>)}</>
}

export default function SpecTable({ models, shopLinks, prices, priceDate, embed = false }: Props) {
  const [sortOrder, setSortOrder] = useState<SortOrder>(() => {
    if (typeof window === 'undefined') return 'new'
    const v = new URLSearchParams(window.location.search).get('sort')
    return (v === 'new' || v === 'old' || v === 'price-asc') ? v : 'new'
  })
  const [typeFilter, setTypeFilter] = useState<FilterType>(() => {
    if (typeof window === 'undefined') return 'all'
    const v = new URLSearchParams(window.location.search).get('type')
    return isDeviceType(v) ? v : 'all'
  })
  const [priceFilter, setPriceFilter] = useState<PriceFilter | null>(() => {
    if (typeof window === 'undefined') return null
    const v = new URLSearchParams(window.location.search).get('price')
    return v && v in PRICE_RANGES ? (v as PriceFilter) : null
  })

  useEffect(() => {
    const p = new URLSearchParams()
    if (sortOrder !== 'new') p.set('sort', sortOrder)
    if (typeFilter !== 'all') p.set('type', typeFilter)
    if (priceFilter) p.set('price', priceFilter)
    const qs = p.toString()
    window.history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname)
  }, [sortOrder, typeFilter, priceFilter])

  const filteredModels = useMemo(() => {
    let result = [...models]

    if (typeFilter !== 'all') {
      result = result.filter((m) => m.device_type === typeFilter)
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
  }, [models, sortOrder, typeFilter, priceFilter, prices])

  // 販売リンクは行 × 機種で引くため、毎セル find すると O(行数 × 機種数 × リンク数) になる。
  // "productId:shopId" の Map に畳んでおく
  const shopLinkMap = useMemo(() => {
    const map = new Map<string, ProductShopLink>()
    for (const l of shopLinks) map.set(`${l.product_id}:${l.shop_id}`, l)
    return map
  }, [shopLinks])
  const getShopLink = (productId: number, shopId: number) => shopLinkMap.get(`${productId}:${shopId}`)

  const SPEC_ROWS: { label: React.ReactNode; render: (m: SpecModel) => React.ReactNode }[] = [
    { label: 'カラー', render: (m) => stacked(m.color) },
    {
      label: <>発売日<br /><span style={{ fontSize: '0.75em', fontWeight: 'normal' }}>サポート期間（予想）</span></>,
      render: (m) => {
        const { osEndYear } = calculateOSLifespan(m.date, m.last_macos)
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
        const annual = formatAnnualCost(price, calculateOSLifespan(m.date, m.last_macos).remainingYears)
        return (
          <>
            <strong style={{ color: 'var(--color-primary)', whiteSpace: 'nowrap' }}>&yen;{price.toLocaleString()}</strong>
            {annual ? <span className="spec-compare-table__annual">{annual}</span> : null}
          </>
        )
      },
    },
    {
      // iMac と mini/Studio を分ける最大の判断材料なので、スペックの先頭に置く。
      // ディスプレイを別途買う必要があるかどうかで実質の総額が変わる
      label: 'ディスプレイ',
      render: (m) => (
        m.display_builtin
          ? <>{m.display ? <DetailSpec value={m.display} /> : '内蔵'}</>
          : <span style={{ color: '#888' }}>別途必要</span>
      ),
    },
    { label: '解像度', render: (m) => m.resolution || '-' },
    { label: '輝度', render: (m) => m.luminance || '-' },
    { label: 'チップ', render: (m) => stacked(m.cpu) },
    { label: 'GPUコア', render: (m) => stacked(m.gpu) },
    { label: 'メモリ', render: (m) => m.ram || '-' },
    { label: 'ストレージ', render: (m) => m.strage || '-' },
    { label: '外部ディスプレイ', render: (m) => <DetailSpec value={m.external_display} /> },
    // ポートは100字近くになる機種があり、セルが nowrap のままだと列が極端に広がる。
    // このセルだけ折り返しを許可する
    // ポートは1セルに全文を詰めると違いが読み取れないので、種類ごとに行を分ける。
    // 各行の値は「何基あるか」だけ。前面/背面の区別は比較に使わないため持たない
    { label: 'Thunderbolt', render: (m) => <PortSpec value={m.thunderbolt} /> },
    { label: 'Thunderboltの規格', render: (m) => <DetailSpec value={m.thunderbolt_gen} /> },
    { label: 'USB-C', render: (m) => <PortSpec value={m.usb_c} /> },
    { label: 'USB-A', render: (m) => <PortSpec value={m.usb_a} /> },
    { label: 'HDMI', render: (m) => <BoolCell value={m.hdmi} /> },
    { label: 'SDカードスロット', render: (m) => <BoolCell value={m.slot} /> },
    { label: 'ヘッドフォンジャック', render: (m) => <BoolCell value={m.headphone} /> },
    { label: 'Ethernet', render: (m) => <DetailSpec value={m.ethernet} /> },
    { label: 'カメラ', render: (m) => <DetailSpec value={m.camera} /> },
    { label: 'スピーカー', render: (m) => <DetailSpec value={m.speaker} /> },
    // iMac は Magic Keyboard / Mouse が同梱される。mini との実質価格差になるため列にしている
    { label: '同梱物', render: (m) => stacked(m.included_accessories) },
    { label: 'Apple Intelligence', render: (m) => <BoolCell value={m.apple_intelligence} /> },
  ]

  return (
    <section className="l-section" id="spec-table" aria-labelledby="heading-spec-table">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-spec-table">
          歴代iMac・Mac miniスペック比較表
        </h2>
        <p className="m-section-desc">
          iMac・Mac mini・Mac Studioの主要スペックを一覧で比較できます。
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
              {TYPE_FILTERS.map(([key, label]) => (
                <button
                  key={key}
                  className={`spec-filter__tag${typeFilter === key ? ' is-active' : ''}`}
                  onClick={() => setTypeFilter(key)}
                  aria-pressed={typeFilter === key}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </fieldset>

        {/* 絞り込みの結果件数。フィルタを押しても表の変化が視界に入らない
            （特にモバイルは横スクロールの先が見えない）ため、効いたことを明示する */}
        {filteredModels.length > 0 ? (
          <p className="spec-filter__result" aria-live="polite">
            全{models.length}機種中 <strong>{filteredModels.length}機種</strong>を表示中
          </p>
        ) : null}

        {/* テーブル */}
        {filteredModels.length === 0 ? (
          <p className="m-section-desc">該当するモデルがありません。フィルターを変更してください。</p>
        ) : (
          <StickyTableWrapper className="m-card m-card--shadow m-table-card" floatingHeader>
            <div className="m-table-scroll">
              <table className="m-table spec-compare-table">
                <caption className="visually-hidden">歴代iMac・Mac miniスペック比較表</caption>
                <thead>
                  <tr>
                    <th scope="col" className="spec-compare-table__sticky"></th>
                    {filteredModels.map((m) => (
                      <th key={m.id} scope="col">{m.shortname || m.model}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" className="spec-compare-table__sticky">サイズ</th>
                    {filteredModels.map((m) => (
                      <td key={m.id} style={{ textAlign: 'center', padding: 'var(--space-sm)' }}>
                        {m.image ? (
                          <ContentImage
                            src={`/images/mac/${m.image}`}
                            alt={m.model}
                            width={50}
                            height={50}
                            loading="lazy"
                            sizes="50px" className="spec-compare-table__cell-img"
                          />
                        ) : null}
                        <div style={{ fontSize: '0.8em', marginTop: '0.25rem' }}>{m.size || '-'}</div>
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
                  {!embed ? (
                    <>
                      <tr className="spec-compare-table__action-row">
                        <th scope="row" className="spec-compare-table__sticky">イオシス</th>
                        {filteredModels.map((m) => {
                          const link = getShopLink(m.id, 1)
                          return (
                            <td key={m.id}>
                              {link ? (
                                <a href={link.url} className="m-btn m-btn--primary m-btn--sm" rel="nofollow noopener noreferrer" target="_blank" aria-label={`${m.shortname || m.model}をイオシスで探す（新しいタブで開く）`}>
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
                                <a href={link.url} className="m-btn m-btn--amazon m-btn--sm" rel="nofollow noopener noreferrer" target="_blank" aria-label={`${m.shortname || m.model}をAmazonで探す（新しいタブで開く）`}>
                                  Amazonで見る
                                </a>
                              ) : '-'}
                            </td>
                          )
                        })}
                      </tr>
                    </>
                  ) : null}
                </tbody>
              </table>
            </div>
          </StickyTableWrapper>
        )}
        <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#888', lineHeight: 1.7 }}>
          ※ 中古相場は販売中の商品の実勢価格（中央値）です{priceDate ? `（${formatPriceDate(priceDate)}時点）` : ''}。
          各機種の価格推移グラフは「<Link prefetch={false} href="/mac/price-info/" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>iMac・Mac mini中古相場・価格推移ページ</Link>」でご確認いただけます。
          <br />
          ※ 相場の下の年単価は、中古相場をOSサポートの残り年数で割った「1年あたりの負担額」です。価格が同じでもサポートが長い機種ほど割安になります。
          <br />
          ※ iMacはMagic Keyboard・Magic Mouseが同梱されます。Mac mini・Mac Studioはディスプレイもキーボードも別途必要なので、総額で比較してください。
          <br />
          {AMAZON_PRICE_DISCLAIMER}
        </p>
      </div>
    </section>
  )
}
