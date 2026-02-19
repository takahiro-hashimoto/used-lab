'use client'

import { useState } from 'react'

import { getBoolDisplay, formatDate } from '@/app/components/spec-table-utils'
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

type CompareCategory = {
  title: string
  rows: { label: string; get: (m: SpecModel) => React.ReactNode }[]
}

function buildCategories(): CompareCategory[] {
  const text = (getter: (m: SpecModel) => string | null) => ({
    get: (m: SpecModel) => getter(m) || '-',
  })
  const bool = (getter: (m: SpecModel) => boolean) => ({
    get: (m: SpecModel) => getBoolDisplay(getter(m)),
  })

  return [
    {
      title: '基本仕様',
      rows: [
        { label: 'サイズ', ...text((m) => m.size) },
        { label: '発売日', get: (m: SpecModel) => formatDate(m.date) },
        { label: '重量', ...text((m) => m.weight) },
        { label: 'ストレージ', ...text((m) => m.strage) },
        { label: 'カラー', ...text((m) => m.color) },
      ],
    },
    {
      title: '処理性能',
      rows: [
        { label: 'チップ', ...text((m) => m.cpu) },
        { label: 'メモリ', ...text((m) => m.ram) },
      ],
    },
    {
      title: 'ディスプレイ',
      rows: [
        { label: 'ディスプレイ', ...text((m) => m.display) },
        { label: '解像度', ...text((m) => m.resolution) },
        { label: '輝度', ...text((m) => m.luminance) },
        { label: 'ProMotion', ...bool((m) => m.promotion) },
      ],
    },
    {
      title: 'その他',
      rows: [
        { label: 'バッテリー', ...text((m) => m.battery) },
        { label: 'カメラ', ...text((m) => m.camera) },
        { label: 'センターフレーム', ...bool((m) => m.center_frame) },
        { label: 'インターフェース', ...text((m) => m.port) },
        { label: 'SDカードスロット', ...bool((m) => m.slot) },
        { label: 'HDMI', ...bool((m) => m.hdmi) },
        { label: 'MagSafe', ...bool((m) => m.magsafe) },
        { label: 'スピーカー', ...text((m) => m.speaker) },
        { label: '冷却ファン', ...bool((m) => m.fan) },
        { label: 'Apple Intelligence', ...bool((m) => m.apple_intelligence) },
      ],
    },
  ]
}

export default function DualCompare({ models, shopLinks }: Props) {
  const defaultA = models.length > 5 ? models[5].id : models[0]?.id || 0
  const defaultB = models.length > 6 ? models[6].id : models[1]?.id || 0

  const [idA, setIdA] = useState(defaultA)
  const [idB, setIdB] = useState(defaultB)

  const modelA = models.find((m) => m.id === idA) || models[0]
  const modelB = models.find((m) => m.id === idB) || models[1] || models[0]

  const categories = buildCategories()

  const getIosysLink = (productId: number) =>
    shopLinks.find((l) => l.product_id === productId && l.shop_id === 1)

  const linkA = getIosysLink(modelA.id)
  const linkB = getIosysLink(modelB.id)

  return (
    <section className="l-section" id="compare" aria-labelledby="heading-compare">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-compare">
          気になる2機種のMacBookの違いを比較
        </h2>
        <p className="m-section-desc">
          気になる2機種のMacBookを簡単に比較できるツールです。<br />
          今持っている機種と購入を検討中の機種を比較したい方はぜひチェックしてみてください。
        </p>

        <div className="m-card m-card--shadow compare-card">
          <table className="compare-table">
            <caption className="visually-hidden">2機種のMacBookスペック比較</caption>
            <colgroup>
              <col className="compare-table__col-label" />
              <col />
              <col />
            </colgroup>

            <thead>
              <tr>
                <th></th>
                <td className="compare-table__header-cell">
                  <label htmlFor="compare-select-a" className="visually-hidden">1台目のモデルを選択</label>
                  <select
                    className="compare-select"
                    id="compare-select-a"
                    value={idA}
                    onChange={(e) => setIdA(Number(e.target.value))}
                  >
                    {models.map((m) => (
                      <option key={m.id} value={m.id}>{m.shortname || m.model}</option>
                    ))}
                  </select>
                  <a href={`/macbook/${modelA.slug}`} className="compare-model-link">
                    このモデルの詳細を見る &rsaquo;
                  </a>
                  {modelA.image && (
                    <img
                      src={`/images/macbook/${modelA.image}`}
                      alt={modelA.model}
                      width={120}
                      height={120}
                      className="compare-model-img"
                    />
                  )}
                </td>
                <td className="compare-table__header-cell">
                  <label htmlFor="compare-select-b" className="visually-hidden">2台目のモデルを選択</label>
                  <select
                    className="compare-select"
                    id="compare-select-b"
                    value={idB}
                    onChange={(e) => setIdB(Number(e.target.value))}
                  >
                    {models.map((m) => (
                      <option key={m.id} value={m.id}>{m.shortname || m.model}</option>
                    ))}
                  </select>
                  <a href={`/macbook/${modelB.slug}`} className="compare-model-link">
                    このモデルの詳細を見る &rsaquo;
                  </a>
                  {modelB.image && (
                    <img
                      src={`/images/macbook/${modelB.image}`}
                      alt={modelB.model}
                      width={120}
                      height={120}
                      className="compare-model-img"
                    />
                  )}
                </td>
              </tr>
            </thead>

            {categories.map((cat) => (
              <tbody key={cat.title}>
                <tr>
                  <th colSpan={3} className="compare-category-cell">
                    <span className="compare-category">
                      <i className="fa-solid fa-circle-check" aria-hidden="true"></i> {cat.title}
                    </span>
                  </th>
                </tr>
                {cat.rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{row.get(modelA)}</td>
                    <td>{row.get(modelB)}</td>
                  </tr>
                ))}
              </tbody>
            ))}

            <tfoot>
              <tr className="compare-table__action-row">
                <th></th>
                <td>
                  {linkA ? (
                    <a href={linkA.url} className="m-btn m-btn--primary m-btn--block" rel="nofollow noopener noreferrer" target="_blank">
                      イオシスで中古価格を見る <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                    </a>
                  ) : '-'}
                </td>
                <td>
                  {linkB ? (
                    <a href={linkB.url} className="m-btn m-btn--primary m-btn--block" rel="nofollow noopener noreferrer" target="_blank">
                      イオシスで中古価格を見る <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                    </a>
                  ) : '-'}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  )
}
