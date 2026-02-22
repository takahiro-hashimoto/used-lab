'use client'

import { useState, useMemo } from 'react'
import { parseDate, formatDate, BoolCell, TextCell } from '@/app/components/spec-table-utils'
import type { ProductShopLink } from '@/lib/types'

type CameraModel = {
  id: number
  model: string
  slug: string
  image: string | null
  date: string | null
  image_sensor: string | null
  front_camera: string | null
  in_camera: string | null
  camera_control: boolean
  lidar: boolean
  night_mode: boolean
  photography_style: boolean
  portrait_mode: boolean
  cinematic_mode: boolean
  action_mode: boolean
  macro_mode: boolean
  centerframe: boolean
  apple_proraw: boolean
  apple_prores: boolean
}

type Props = {
  models: CameraModel[]
  shopLinks: ProductShopLink[]
}

type SortOrder = 'old' | 'new'

function getModelCategory(model: string): string {
  const lower = model.toLowerCase()
  if (lower.includes('pro max')) return 'promax'
  if (lower.includes('pro')) return 'pro'
  if (lower.includes('plus')) return 'plus'
  if (lower.includes('se') || lower.includes('16e')) return 'se'
  if (lower.includes('mini')) return 'mini'
  return 'standard'
}

type FilterType = 'all' | 'promax' | 'pro' | 'plus' | 'standard' | 'se' | 'mini'

export default function CameraComparisonTable({ models, shopLinks }: Props) {
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

  const CAMERA_ROWS: { label: string; render: (m: CameraModel) => React.ReactNode }[] = [
    {
      label: 'イメージ',
      render: (m) => (
        m.image ? (
          <img
            src={`/images/iphone/${m.image}`}
            alt={m.model}
            width={50}
            height={65}
            loading="lazy"
            className="spec-compare-table__cell-img"
          />
        ) : '-'
      ),
    },
    { label: '発売日', render: (m) => formatDate(m.date) },
    { label: 'カメラ', render: (m) => m.in_camera ? <TextCell value={m.in_camera} /> : '-' },
    { label: 'センサーサイズ', render: (m) => m.image_sensor ? <TextCell value={m.image_sensor} /> : '-' },
    { label: 'カメラコントロール', render: (m) => <BoolCell value={m.camera_control} /> },
    { label: 'LiDARスキャン', render: (m) => <BoolCell value={m.lidar} /> },
    { label: 'ナイト', render: (m) => <BoolCell value={m.night_mode} /> },
    { label: 'フォトグラフスタイル', render: (m) => <BoolCell value={m.photography_style} /> },
    { label: 'ポートレート', render: (m) => <BoolCell value={m.portrait_mode} /> },
    { label: 'シネマティック', render: (m) => <BoolCell value={m.cinematic_mode} /> },
    { label: 'アクション', render: (m) => <BoolCell value={m.action_mode} /> },
    { label: 'マクロ撮影', render: (m) => <BoolCell value={m.macro_mode} /> },
    { label: 'センターフレーム', render: (m) => <BoolCell value={m.centerframe} /> },
    { label: 'Apple ProRaw', render: (m) => <BoolCell value={m.apple_proraw} /> },
    { label: 'Apple ProRes', render: (m) => <BoolCell value={m.apple_prores} /> },
  ]

  return (
    <section className="l-section l-section--bg-subtle" id="camera-comparison" aria-labelledby="heading-camera-comparison">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-camera-comparison">
          歴代iPhoneのカメラ性能 比較表
        </h2>
        <p className="m-section-desc">
          下記はiPhone11以降のモデルでiPhoneのカメラにどのような変化があったのかをまとめた表です。
        </p>
        <p className="m-section-desc">
          シリーズを重ねるごとに様々な撮影モードが搭載されていることがわかります。
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
        </div>

        {/* テーブル */}
        {filteredModels.length === 0 ? (
          <p className="m-section-desc">該当するモデルがありません。フィルターを変更してください。</p>
        ) : (
          <div className="m-card m-card--shadow m-table-card">
            <div className="m-table-scroll">
              <table className="m-table spec-compare-table">
                <caption className="visually-hidden">歴代iPhoneカメラ性能比較表</caption>
                <thead>
                  <tr>
                    <th scope="col" className="spec-compare-table__sticky"></th>
                    {filteredModels.map((m) => (
                      <th key={m.id} scope="col">{m.model}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CAMERA_ROWS.map((row) => (
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
