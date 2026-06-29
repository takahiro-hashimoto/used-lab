'use client'
import ContentImage from '../../../../components/ContentImage'

import Link from 'next/link'
import { useState, useMemo, useEffect } from 'react'
import StickyTableWrapper from '@/app/components/StickyTableWrapper'
import { parseDate, formatDate, BoolCell, TextCell } from '@/app/components/spec-table-utils'
import { calculateOSLifespan } from '@/lib/utils/macbook-helpers'
import type { ProductShopLink } from '@/lib/types'

type SpecModel = {
  id: number
  model: string
  shortname: string | null
  slug: string
  image: string | null
  date: string | null
  last_macos: string | null
  cpu: string | null
  ram: string | null
  strage: string | null
  size: string | null
  weight: string | null
  display: string | null
  resolution: string | null
  luminance: string | null
  port: string | null
  hdmi: boolean
  slot: boolean
  magsafe: boolean
  camera: string | null
  speaker: string | null
  promotion: boolean
  fan: boolean
  center_frame: boolean
  apple_intelligence: boolean
  external_display: string | null
  battery: string | null
  color: string | null
}

type Props = {
  models: SpecModel[]
  shopLinks: ProductShopLink[]
  prices: Record<number, number | null>
}

type SortOrder = 'old' | 'new'
type FilterType = 'all' | 'air' | 'pro' | 'neo'
type FilterInch = 'all' | '13' | '14' | '15' | '16'

function getModelCategory(model: string): string {
  const lower = model.toLowerCase()
  if (lower.includes('neo')) return 'neo'
  if (lower.includes('pro')) return 'pro'
  return 'air'
}

function getModelInch(model: string): string | null {
  const match = model.match(/(\d+)インチ/)
  return match ? match[1] : null
}

export default function SpecTable({ models, shopLinks, prices }: Props) {
  const [sortOrder, setSortOrder] = useState<SortOrder>(() => {
    if (typeof window === 'undefined') return 'old'
    const v = new URLSearchParams(window.location.search).get('sort')
    return (v === 'new' || v === 'old') ? v : 'old'
  })
  const [modelFilter, setModelFilter] = useState<FilterType>(() => {
    if (typeof window === 'undefined') return 'all'
    const v = new URLSearchParams(window.location.search).get('model')
    return (v === 'air' || v === 'pro' || v === 'neo') ? v : 'all'
  })
  const [inchFilter, setInchFilter] = useState<FilterInch>(() => {
    if (typeof window === 'undefined') return 'all'
    const v = new URLSearchParams(window.location.search).get('inch')
    return (v === '13' || v === '14' || v === '15' || v === '16') ? v : 'all'
  })
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const p = new URLSearchParams()
    if (sortOrder !== 'old') p.set('sort', sortOrder)
    if (modelFilter !== 'all') p.set('model', modelFilter)
    if (inchFilter !== 'all') p.set('inch', inchFilter)
    const qs = p.toString()
    window.history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname)
  }, [sortOrder, modelFilter, inchFilter])

  const handleCopyUrl = async () => {
    const url = `${window.location.origin}${window.location.pathname}${window.location.search}#heading-spec-table`
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const filteredModels = useMemo(() => {
    let result = [...models]

    if (modelFilter !== 'all') {
      result = result.filter((m) => getModelCategory(m.model) === modelFilter)
    }

    if (inchFilter !== 'all') {
      result = result.filter((m) => getModelInch(m.model) === inchFilter)
    }

    result.sort((a, b) => {
      const da = parseDate(a.date).getTime()
      const db = parseDate(b.date).getTime()
      return sortOrder === 'old' ? da - db : db - da
    })

    return result
  }, [models, sortOrder, modelFilter, inchFilter])

  const getShopLink = (productId: number, shopId: number) =>
    shopLinks.find((l) => l.product_id === productId && l.shop_id === shopId)

  const SPEC_ROWS: { label: React.ReactNode; render: (m: SpecModel) => React.ReactNode }[] = [
    { label: '中古相場', render: (m) => { const price = prices[m.id]; return price ? `¥${price.toLocaleString()}` : '-' } },
    { label: 'カラー', render: (m) => {
      if (!m.color) return '-'
      const parts = m.color.split(/\s*\/\s*/)
      if (parts.length <= 1) return m.color
      return <>{parts.map((p, i) => <span key={i}>{i > 0 && <br />}{p}</span>)}</>
    }},
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
    { label: '重量', render: (m) => m.weight || '-' },
    { label: 'チップ', render: (m) => m.cpu || '-' },
    { label: 'メモリ', render: (m) => m.ram || '-' },
    { label: 'ストレージ', render: (m) => m.strage || '-' },
    { label: 'ディスプレイ', render: (m) => m.display ? <TextCell value={m.display} /> : '-' },
    { label: '解像度', render: (m) => m.resolution || '-' },
    { label: '輝度', render: (m) => m.luminance || '-' },
    { label: 'ProMotion', render: (m) => <BoolCell value={m.promotion} /> },
    { label: '外部ディスプレイ', render: (m) => {
      if (!m.external_display) return '-'
      const parts = m.external_display.split(/\s*\/\s*/)
      if (parts.length <= 1) return m.external_display
      return <>{parts.map((p, i) => <span key={i}>{i > 0 && <br />}{p}</span>)}</>
    }},
    { label: 'インターフェース', render: (m) => {
      if (!m.port) return '-'
      const parts = m.port.split(/\s*\/\s*/)
      if (parts.length <= 1) return m.port
      return <>{parts.map((p, i) => <span key={i}>{i > 0 && <br />}{p}</span>)}</>
    }},
    { label: 'HDMI', render: (m) => <BoolCell value={m.hdmi} /> },
    { label: 'SDカードスロット', render: (m) => <BoolCell value={m.slot} /> },
    { label: 'MagSafe', render: (m) => <BoolCell value={m.magsafe} /> },
    { label: 'カメラ', render: (m) => m.camera || '-' },
    { label: 'スピーカー', render: (m) => m.speaker || '-' },
    { label: 'センターフレーム', render: (m) => <BoolCell value={m.center_frame} /> },
    { label: '冷却ファン', render: (m) => <BoolCell value={m.fan} /> },
    { label: 'Apple Intelligence', render: (m) => <BoolCell value={m.apple_intelligence} /> },
  ]

  return (
    <section className="l-section" id="spec-table" aria-labelledby="heading-spec-table">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-spec-table">
          歴代MacBookスペック比較表
        </h2>
        <p className="m-section-desc">
          歴代MacBookの主要スペックを一覧で比較できます。
        </p>

        {/* フィルターUI */}
        <fieldset className="u-mb-xl">
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
            <span className="spec-filter__label">機種</span>
            <div className="spec-filter__tags">
              {([
                ['all', 'すべて'],
                ['air', 'Air'],
                ['pro', 'Pro'],
                ['neo', 'Neo'],
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
            <span className="spec-filter__label">インチ</span>
            <div className="spec-filter__tags">
              {([
                ['all', 'すべて'],
                ['13', '13インチ'],
                ['14', '14インチ'],
                ['15', '15インチ'],
                ['16', '16インチ'],
              ] as [FilterInch, string][]).map(([key, label]) => (
                <button
                  key={key}
                  className={`spec-filter__tag${inchFilter === key ? ' is-active' : ''}`}
                  onClick={() => setInchFilter(key)}
                  aria-pressed={inchFilter === key}
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
                <caption className="visually-hidden">歴代MacBookスペック比較表</caption>
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
                        {m.image && (
                          <ContentImage
                            src={`/images/macbook/${m.image}`}
                            alt={m.model}
                            width={50}
                            height={50}
                            loading="lazy"
                            sizes="50px" className="spec-compare-table__cell-img"
                          />
                        )}
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
                  {/* イオシスリンク行 */}
                  <tr className="spec-compare-table__action-row">
                    <th scope="row" className="spec-compare-table__sticky">イオシス</th>
                    {filteredModels.map((m) => {
                      const link = getShopLink(m.id, 1)
                      return (
                        <td key={m.id}>
                          {link ? (
                            <a href={link.url} className="m-btn m-btn--primary m-btn--sm" rel="nofollow noopener noreferrer" target="_blank" aria-label={`${m.shortname || m.model}をイオシスで探す（新しいタブで開く）`}>
                              最安値を確認
                            </a>
                          ) : '-'}
                        </td>
                      )
                    })}
                  </tr>
                  {/* Amazonリンク行 */}
                  <tr className="spec-compare-table__action-row">
                    <th scope="row" className="spec-compare-table__sticky">Amazon</th>
                    {filteredModels.map((m) => {
                      const link = getShopLink(m.id, 7)
                      return (
                        <td key={m.id}>
                          {link ? (
                            <a href={link.url} className="m-btn m-btn--amazon m-btn--sm" rel="nofollow noopener noreferrer" target="_blank" aria-label={`${m.shortname || m.model}をAmazonで探す（新しいタブで開く）`}>
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
          ※ 中古相場は、楽天市場の中古ショップから毎日自動取得した最安値Top5・最高値Top5の平均中間値です。対象は各機種の最小構成モデルで、100円単位に丸めて表示しています。機種別の価格推移グラフは「<Link href="/macbook/price-info/" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>MacBook中古相場・価格推移ページ</Link>」でご確認いただけます。
        </p>
        <div style={{ marginTop: '1.5rem' }}>
          <button type="button" className="m-btn m-btn--secondary m-btn--md" onClick={handleCopyUrl}>
            <i className="fa-solid fa-link" aria-hidden="true"></i>{' '}
            {copied ? 'コピーしました' : 'この絞り込み条件をシェア'}
          </button>
        </div>
      </div>
    </section>
  )
}
