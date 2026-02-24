'use client'

import { useState, useMemo } from 'react'
import { parseDate, formatDate, BoolCell, TextCell, PortCell, formatStorageRange } from '@/app/components/spec-table-utils'
import type { ProductShopLink } from '@/lib/types'

type SpecModel = {
  id: number
  model: string
  slug: string
  image: string | null
  date: string | null
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
}

type SortOrder = 'old' | 'new'
type FilterType = 'all' | 'promax' | 'pro' | 'plus' | 'standard' | 'se' | 'mini'
type FeatureFilter = 'size-sm' | 'size-lg' | 'usbc' | 'camera-control' | 'magsafe'

function getModelCategory(model: string): string {
  const lower = model.toLowerCase()
  if (lower.includes('pro max')) return 'promax'
  if (lower.includes('pro')) return 'pro'
  if (lower.includes('plus')) return 'plus'
  if (lower.includes('se') || lower.includes('16e')) return 'se'
  if (lower.includes('mini')) return 'mini'
  return 'standard'
}

function parseSizeInch(size: string | null): number {
  if (!size) return 0
  const match = size.match(/([\d.]+)/)
  return match ? parseFloat(match[1]) : 0
}

function extractScreenInch(display: string | null): string | null {
  if (!display) return null
  const match = display.match(/([\d.]+)\s*インチ/)
  return match ? `${match[1]}インチ` : null
}

export default function SpecTable({ models, shopLinks }: Props) {
  const [sortOrder, setSortOrder] = useState<SortOrder>('old')
  const [modelFilter, setModelFilter] = useState<FilterType>('all')
  const [featureFilters, setFeatureFilters] = useState<Set<FeatureFilter>>(new Set())

  const toggleFeature = (f: FeatureFilter) => {
    setFeatureFilters((prev) => {
      const next = new Set(prev)
      if (next.has(f)) next.delete(f)
      else next.add(f)
      return next
    })
  }

  const filteredModels = useMemo(() => {
    let result = [...models]

    // 機種別フィルタ
    if (modelFilter !== 'all') {
      result = result.filter((m) => getModelCategory(m.model) === modelFilter)
    }

    // サイズ・機能フィルタ
    for (const f of featureFilters) {
      switch (f) {
        case 'size-sm':
          result = result.filter((m) => { const s = parseSizeInch(m.size); return s >= 6.1 && s <= 6.3 })
          break
        case 'size-lg':
          result = result.filter((m) => { const s = parseSizeInch(m.size); return s >= 6.7 && s <= 6.9 })
          break
        case 'usbc':
          result = result.filter((m) => m.port?.toLowerCase().includes('usb'))
          break
        case 'camera-control':
          result = result.filter((m) => m.camera_control)
          break
        case 'magsafe':
          result = result.filter((m) => m.magsafe)
          break
      }
    }

    // 並び替え
    result.sort((a, b) => {
      const da = parseDate(a.date).getTime()
      const db = parseDate(b.date).getTime()
      return sortOrder === 'old' ? da - db : db - da
    })

    return result
  }, [models, sortOrder, modelFilter, featureFilters])

  const getShopLink = (productId: number, shopId: number) =>
    shopLinks.find((l) => l.product_id === productId && l.shop_id === shopId)

  const SPEC_ROWS: { label: string; render: (m: SpecModel) => React.ReactNode }[] = [
    {
      label: 'サイズ',
      render: (m) => (
        <>
          {m.image && (
            <img
              src={`/images/iphone/${m.image}`}
              alt={m.model}
              width={50}
              height={65}
              loading="lazy"
              className="spec-compare-table__cell-img"
            />
          )}
          {extractScreenInch(m.display) || '-'}
        </>
      ),
    },
    { label: '発売日', render: (m) => formatDate(m.date) },
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
    { label: 'カメラコントロール', render: (m) => <BoolCell value={m.camera_control} /> },
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
    <section className="l-section l-section--bg-subtle" id="spec-table" aria-labelledby="heading-spec-table">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-spec-table">
          歴代iPhoneのスペック比較表一覧
        </h2>
        <p className="m-section-desc">
          歴代iPhoneの主要スペックを一覧で比較できます。
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
            <span className="spec-filter__label">機種別絞り込み</span>
            <div className="spec-filter__tags">
              {([
                ['all', 'すべて'],
                ['promax', 'Pro Max'],
                ['pro', 'Pro'],
                ['plus', 'Plus'],
                ['standard', '無印'],
                ['se', 'SE'],
                ['mini', 'mini'],
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
          <div className="spec-filter__row">
            <span className="spec-filter__label">機能別</span>
            <div className="spec-filter__tags">
              {([
                ['size-sm', '6.1~6.3型'],
                ['size-lg', '6.7~6.9型'],
                ['usbc', 'USB-C'],
                ['camera-control', 'カメラコントロール'],
                ['magsafe', 'MagSafe'],
              ] as [FeatureFilter, string][]).map(([key, label]) => (
                <button
                  key={key}
                  className={`spec-filter__tag${featureFilters.has(key) ? ' is-active' : ''}`}
                  onClick={() => toggleFeature(key)}
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
