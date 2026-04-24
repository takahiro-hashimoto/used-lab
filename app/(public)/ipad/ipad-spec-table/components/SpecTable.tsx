'use client'
import ContentImage from '../../../../components/ContentImage'

import { useState, useMemo } from 'react'
import StickyTableWrapper from '@/app/components/StickyTableWrapper'
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
  port: string | null
  battery: string | null
  display: string | null
  display_type: string | null
  resolution: string | null
  sim: string | null
  certification: string | null
  front_camera: string | null
  in_camera: string | null
  apple_intelligence: boolean
  promotion: boolean
  center_frame: boolean
  lidar: boolean
  pencil: string | null
  keyboard: string | null
  speaker: string | null
  last_ipados: string | null
}

type Props = {
  models: SpecModel[]
  shopLinks: ProductShopLink[]
}

type SortOrder = 'old' | 'new'
type FilterType = 'all' | 'pro' | 'air' | 'mini' | 'standard'
type PencilFilter = 'all' | 'gen1' | 'gen2' | 'usbc' | 'pro'

function extractScreenInch(display: string | null): string | null {
  if (!display) return null
  const match = display.match(/([\d.]+)\s*インチ/)
  return match ? `${match[1]}インチ` : null
}

/** カメラ表記を「シングルレンズ / デュアルレンズ」に変換 */
function formatCameraLens(camera: string | null): string {
  if (!camera) return '-'
  return camera.includes('/') ? 'デュアルレンズ' : 'シングルレンズ'
}

/** OSサポート終了目安を算出（発売から7年） */
function formatOsSupport(date: string | null, lastOs: string | null): string {
  if (lastOs) {
    // last_ipadosが設定済み → サポート終了済み
    return `終了（${lastOs}）`
  }
  if (!date) return '-'
  const y = parseInt(date.split('-')[0], 10)
  if (isNaN(y)) return '-'
  return `${y + 7}年頃まで`
}

function getModelCategory(model: string): string {
  const lower = model.toLowerCase()
  if (lower.includes('pro')) return 'pro'
  if (lower.includes('air')) return 'air'
  if (lower.includes('mini')) return 'mini'
  return 'standard'
}

function matchPencilFilter(pencil: string | null, filter: PencilFilter): boolean {
  if (filter === 'all') return true
  if (!pencil) return false
  const lower = pencil.toLowerCase()
  switch (filter) {
    case 'gen1':
      return lower.includes('第1世代') || lower.includes('1st')
    case 'gen2':
      return lower.includes('第2世代') || lower.includes('2nd')
    case 'usbc':
      return lower.includes('usb-c') || lower.includes('usb c')
    case 'pro':
      return lower.includes('pro')
    default:
      return true
  }
}

export default function SpecTable({ models, shopLinks }: Props) {
  const [sortOrder, setSortOrder] = useState<SortOrder>('old')
  const [modelFilter, setModelFilter] = useState<FilterType>('all')
  const [pencilFilter, setPencilFilter] = useState<PencilFilter>('all')

  const filteredModels = useMemo(() => {
    let result = [...models]

    // 機種別フィルタ
    if (modelFilter !== 'all') {
      result = result.filter((m) => getModelCategory(m.model) === modelFilter)
    }

    // Apple Pencilフィルタ
    if (pencilFilter !== 'all') {
      result = result.filter((m) => matchPencilFilter(m.pencil, pencilFilter))
    }

    // 並び替え
    result.sort((a, b) => {
      const da = parseDate(a.date).getTime()
      const db = parseDate(b.date).getTime()
      return sortOrder === 'old' ? da - db : db - da
    })

    return result
  }, [models, sortOrder, modelFilter, pencilFilter])

  const getShopLink = (productId: number, shopId: number) =>
    shopLinks.find((l) => l.product_id === productId && l.shop_id === shopId)

  const SPEC_ROWS: { label: string; render: (m: SpecModel) => React.ReactNode }[] = [
    { label: 'サイズ', render: (m) => extractScreenInch(m.display) || '-' },
    { label: '発売日', render: (m) => formatDate(m.date) },
    { label: 'OSサポート目安', render: (m) => formatOsSupport(m.date, m.last_ipados) },
    { label: 'チップ', render: (m) => m.cpu ? <TextCell value={m.cpu} /> : '-' },
    { label: 'メモリ', render: (m) => m.ram || '-' },
    { label: '重量', render: (m) => m.weight || '-' },
    { label: 'バッテリー', render: (m) => m.battery || '-' },
    { label: 'ポート', render: (m) => m.port ? <PortCell value={m.port} /> : '-' },
    { label: '認証', render: (m) => m.certification ? <TextCell value={m.certification} /> : '-' },
    { label: '外カメラ', render: (m) => formatCameraLens(m.in_camera) },
    { label: 'ディスプレイ', render: (m) => m.display_type ? <TextCell value={m.display_type} /> : '-' },
    { label: 'Apple Intelligence', render: (m) => <BoolCell value={m.apple_intelligence} /> },
    { label: 'センターフレーム', render: (m) => <BoolCell value={m.center_frame} /> },
    { label: 'ProMotion', render: (m) => <BoolCell value={m.promotion} /> },
    { label: 'LiDAR機能', render: (m) => <BoolCell value={m.lidar} /> },
    { label: 'オーディオ', render: (m) => m.speaker ? <TextCell value={m.speaker} /> : '-' },
    { label: 'Apple Pencil', render: (m) => m.pencil ? <TextCell value={m.pencil} /> : '-' },
    { label: '純正キーボード', render: (m) => <BoolCell value={!!m.keyboard} /> },
    { label: 'ストレージ', render: (m) => formatStorageRange(m.strage) },
  ]

  return (
    <section className="l-section" id="spec-table" aria-labelledby="heading-spec-table">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-spec-table">
          歴代iPadのスペック比較表一覧
        </h2>
        <p className="m-section-desc">
          歴代iPadの主要スペックを一覧で比較できます。
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
            <span className="spec-filter__label">機種絞り込み</span>
            <div className="spec-filter__tags">
              {([
                ['all', 'すべて'],
                ['pro', 'Pro'],
                ['air', 'Air'],
                ['standard', '無印'],
                ['mini', 'mini'],
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
            <span className="spec-filter__label">Apple Pencil</span>
            <div className="spec-filter__tags">
              {([
                ['all', 'すべて'],
                ['gen1', '第1世代'],
                ['gen2', '第2世代'],
                ['usbc', 'USB-C'],
                ['pro', 'Pro'],
              ] as [PencilFilter, string][]).map(([key, label]) => (
                <button
                  key={key}
                  className={`spec-filter__tag${pencilFilter === key ? ' is-active' : ''}`}
                  onClick={() => setPencilFilter(key)}
                  aria-pressed={pencilFilter === key}
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
                <caption className="visually-hidden">歴代iPadスペック比較表</caption>
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
                          <ContentImage
                            src={`/images/ipad/${m.image}`}
                            alt={m.model}
                            width={50}
                            height={65}
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
