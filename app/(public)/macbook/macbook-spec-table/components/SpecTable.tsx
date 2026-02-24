'use client'

import { useState, useMemo } from 'react'
import { parseDate, formatDate, BoolCell, TextCell } from '@/app/components/spec-table-utils'
import type { ProductShopLink } from '@/lib/types'

type SpecModel = {
  id: number
  model: string
  shortname: string | null
  slug: string
  image: string | null
  date: string | null
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
  battery: string | null
  color: string | null
}

type Props = {
  models: SpecModel[]
  shopLinks: ProductShopLink[]
}

type SortOrder = 'old' | 'new'
type FilterType = 'all' | 'air' | 'pro'

function getModelCategory(model: string): string {
  const lower = model.toLowerCase()
  if (lower.includes('pro')) return 'pro'
  return 'air'
}

export default function SpecTable({ models, shopLinks }: Props) {
  const [sortOrder, setSortOrder] = useState<SortOrder>('old')
  const [modelFilter, setModelFilter] = useState<FilterType>('all')

  const filteredModels = useMemo(() => {
    let result = [...models]

    if (modelFilter !== 'all') {
      result = result.filter((m) => getModelCategory(m.model) === modelFilter)
    }

    result.sort((a, b) => {
      const da = parseDate(a.date).getTime()
      const db = parseDate(b.date).getTime()
      return sortOrder === 'old' ? da - db : db - da
    })

    return result
  }, [models, sortOrder, modelFilter])

  const getShopLink = (productId: number, shopId: number) =>
    shopLinks.find((l) => l.product_id === productId && l.shop_id === shopId)

  const SPEC_ROWS: { label: string; render: (m: SpecModel) => React.ReactNode }[] = [
    {
      label: 'サイズ',
      render: (m) => (
        <>
          {m.image && (
            <img
              src={`/images/macbook/${m.image}`}
              alt={m.model}
              width={50}
              height={50}
              loading="lazy"
              className="spec-compare-table__cell-img"
            />
          )}
          {m.size || '-'}
        </>
      ),
    },
    { label: '発売日', render: (m) => formatDate(m.date) },
    { label: '重量', render: (m) => m.weight || '-' },
    { label: 'チップ', render: (m) => m.cpu || '-' },
    { label: 'メモリ', render: (m) => m.ram || '-' },
    { label: 'ストレージ', render: (m) => m.strage || '-' },
    { label: 'ディスプレイ', render: (m) => m.display ? <TextCell value={m.display} /> : '-' },
    { label: '解像度', render: (m) => m.resolution || '-' },
    { label: '輝度', render: (m) => m.luminance || '-' },
    { label: 'ProMotion', render: (m) => <BoolCell value={m.promotion} /> },
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
    <section className="l-section l-section--bg-subtle" id="spec-table" aria-labelledby="heading-spec-table">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-spec-table">
          歴代MacBookスペック比較表
        </h2>
        <p className="m-section-desc">
          歴代MacBookの主要スペックを一覧で比較できます。
        </p>

        {/* フィルターUI */}
        <div className="spec-filter" aria-label="絞り込み">
          <div className="spec-filter__row">
            <span className="spec-filter__label">並び替え</span>
            <div className="spec-filter__tags">
              <button
                className={`spec-filter__tag${sortOrder === 'old' ? ' is-active' : ''}`}
                onClick={() => setSortOrder('old')}
              >
                発売日が古い順
              </button>
              <button
                className={`spec-filter__tag${sortOrder === 'new' ? ' is-active' : ''}`}
                onClick={() => setSortOrder('new')}
              >
                発売日が新しい順
              </button>
            </div>
          </div>
          <div className="spec-filter__row">
            <span className="spec-filter__label">絞り込み</span>
            <div className="spec-filter__tags">
              {([
                ['all', 'すべて'],
                ['air', 'Air'],
                ['pro', 'Pro'],
              ] as [FilterType, string][]).map(([key, label]) => (
                <button
                  key={key}
                  className={`spec-filter__tag${modelFilter === key ? ' is-active' : ''}`}
                  onClick={() => setModelFilter(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* テーブル */}
        {filteredModels.length === 0 ? (
          <p className="m-section-desc">該当するモデルがありません。フィルターを変更してください。</p>
        ) : (
          <div className="m-card m-card--shadow m-table-card">
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
                  {SPEC_ROWS.map((row) => (
                    <tr key={row.label}>
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
                            <a href={link.url} className="m-btn m-btn--primary m-btn--sm" rel="nofollow noopener noreferrer" target="_blank">
                              中古価格を見る
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
                            <a href={link.url} className="m-btn m-btn--amazon m-btn--sm" rel="nofollow noopener noreferrer" target="_blank">
                              中古価格を見る
                            </a>
                          ) : '-'}
                        </td>
                      )
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
