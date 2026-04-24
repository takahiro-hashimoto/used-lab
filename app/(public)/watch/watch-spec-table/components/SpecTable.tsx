'use client'

import { useState, useMemo } from 'react'
import StickyTableWrapper from '@/app/components/StickyTableWrapper'
import { parseDate, formatDate, BoolCell } from '@/app/components/spec-table-utils'
import type { ProductShopLink } from '@/lib/types'

type SpecModel = {
  id: number
  model: string
  slug: string
  image: string | null
  date: string | null
  cpu: string | null
  size: string | null
  strage: string | null
  material: string | null
  battery: string | null
  water_resistance: string | null
  always_on_display: boolean
  fast_charge: boolean
  blood_oxygen: boolean
  cardiogram: boolean
  accident_detection: boolean
  fall_detection: boolean
  skin_temperature: boolean
  japanese_input: boolean
  double_tap: boolean
  sleep_tracking: boolean
  altimeter: boolean
  blood_pressure: boolean
  sleep_score: boolean
  max_brightness: string | null
}

type Props = {
  models: SpecModel[]
  shopLinks: ProductShopLink[]
}

type SortOrder = 'old' | 'new'
type FilterType = 'all' | 'series' | 'se' | 'ultra'
function getModelCategory(model: string): string {
  const lower = model.toLowerCase()
  if (lower.includes('ultra')) return 'ultra'
  if (lower.includes('se')) return 'se'
  return 'series'
}

export default function SpecTable({ models, shopLinks }: Props) {
  const [sortOrder, setSortOrder] = useState<SortOrder>('old')
  const [modelFilter, setModelFilter] = useState<FilterType>('all')

  const filteredModels = useMemo(() => {
    let result = [...models]

    // 機種別フィルタ
    if (modelFilter !== 'all') {
      result = result.filter((m) => getModelCategory(m.model) === modelFilter)
    }

    // 並び替え
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
    { label: 'サイズ', render: (m) => m.size || '-' },
    { label: '発売日', render: (m) => formatDate(m.date) },
    { label: 'チップ', render: (m) => m.cpu || '-' },
    { label: 'ストレージ', render: (m) => m.strage || '-' },
    { label: 'ケース素材', render: (m) => {
      if (!m.material) return '-'
      const parts = m.material.split(/\s*\/\s*/)
      if (parts.length <= 1) return m.material
      return <>{parts.map((p, i) => <span key={i}>{i > 0 && <br />}{p}</span>)}</>
    }},
    { label: 'バッテリー', render: (m) => m.battery || '-' },
    { label: '耐水性能', render: (m) => m.water_resistance || '-' },
    { label: '最大輝度', render: (m) => m.max_brightness || '-' },
    { label: '常時表示', render: (m) => <BoolCell value={m.always_on_display} /> },
    { label: '急速充電', render: (m) => <BoolCell value={m.fast_charge} /> },
    { label: '血中酸素', render: (m) => <BoolCell value={m.blood_oxygen} /> },
    { label: '心電図', render: (m) => <BoolCell value={m.cardiogram} /> },
    { label: '血圧', render: (m) => <BoolCell value={m.blood_pressure} /> },
    { label: '皮膚温センサー', render: (m) => <BoolCell value={m.skin_temperature} /> },
    { label: '衝突事故検出', render: (m) => <BoolCell value={m.accident_detection} /> },
    { label: '転倒検出', render: (m) => <BoolCell value={m.fall_detection} /> },
    { label: '睡眠トラッキング', render: (m) => <BoolCell value={m.sleep_tracking} /> },
    { label: '睡眠スコア', render: (m) => <BoolCell value={m.sleep_score} /> },
    { label: 'ダブルタップ', render: (m) => <BoolCell value={m.double_tap} /> },
    { label: '日本語入力', render: (m) => <BoolCell value={m.japanese_input} /> },
    { label: '高度計', render: (m) => <BoolCell value={m.altimeter} /> },
  ]

  return (
    <section className="l-section" id="spec-table" aria-labelledby="heading-spec-table">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-spec-table">
          歴代Apple Watchスペック比較表
        </h2>
        <p className="m-section-desc">
          歴代Apple Watchの主要スペックを一覧で比較できます。
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
            <span className="spec-filter__label">絞り込み</span>
            <div className="spec-filter__tags">
              {([
                ['all', 'すべて'],
                ['series', 'ノーマル'],
                ['se', 'SE'],
                ['ultra', 'Ultra'],
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
        </fieldset>

        {/* テーブル */}
        {filteredModels.length === 0 ? (
          <p className="m-section-desc">該当するモデルがありません。フィルターを変更してください。</p>
        ) : (
          <StickyTableWrapper className="m-card m-card--shadow m-table-card">
            <div className="m-table-scroll">
              <table className="m-table spec-compare-table">
                <caption className="visually-hidden">歴代Apple Watchスペック比較表</caption>
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
                    <th scope="row" className="spec-compare-table__sticky"></th>
                    {filteredModels.map((m) => (
                      <td key={m.id} style={{ textAlign: 'center', padding: 'var(--space-sm)' }}>
                        {m.image && (
                          <img
                            src={`/images/watch/${m.image}`}
                            alt={m.model}
                            width={50}
                            height={50}
                            loading="lazy"
                            className="spec-compare-table__cell-img"
                          />
                        )}
                      </td>
                    ))}
                  </tr>
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
                            <a href={link.url} className="m-btn m-btn--primary m-btn--sm" rel="nofollow noopener noreferrer" target="_blank" aria-label={`${m.model}をイオシスで探す（新しいタブで開く）`}>
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
                            <a href={link.url} className="m-btn m-btn--amazon m-btn--sm" rel="nofollow noopener noreferrer" target="_blank" aria-label={`${m.model}をAmazonで探す（新しいタブで開く）`}>
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
          </StickyTableWrapper>
        )}
      </div>
    </section>
  )
}
