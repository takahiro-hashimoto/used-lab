'use client'

import { useState } from 'react'

import { getBoolDisplay, TextCell } from '@/app/components/spec-table-utils'
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
  resolution: string | null
  sim: string | null
  certification: string | null
  image_sensor: string | null
  night_mode: boolean
  apple_proraw: boolean
  magsafe: boolean
  dynamic_island: boolean
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
    get: (m: SpecModel) => {
      const val = getter(m)
      if (!val) return '-'
      return <TextCell value={val} />
    },
  })
  const bool = (getter: (m: SpecModel) => boolean) => ({
    get: (m: SpecModel) => getBoolDisplay(getter(m)),
  })

  return [
    {
      title: 'サイズ・重量',
      rows: [
        { label: 'サイズ', ...text((m) => m.size) },
        { label: '重量', ...text((m) => m.weight) },
      ],
    },
    {
      title: 'ボディ',
      rows: [
        { label: 'CPU', ...text((m) => m.cpu) },
        { label: 'RAM', ...text((m) => m.ram) },
        { label: 'ストレージ容量', ...text((m) => m.strage) },
        { label: 'バッテリー容量', ...text((m) => m.battery) },
      ],
    },
    {
      title: 'ディスプレイ',
      rows: [
        { label: 'ディスプレイ', ...text((m) => m.display) },
        { label: '解像度', ...text((m) => m.resolution) },
      ],
    },
    {
      title: 'カメラ',
      rows: [
        { label: 'リアカメラ', ...text((m) => m.image_sensor) },
        { label: 'ナイトモード', ...bool((m) => m.night_mode) },
        { label: 'ProRAW', ...bool((m) => m.apple_proraw) },
      ],
    },
    {
      title: '機能',
      rows: [
        { label: 'MagSafe', ...bool((m) => m.magsafe) },
        { label: 'Dynamic Island', ...bool((m) => m.dynamic_island) },
      ],
    },
    {
      title: '接続',
      rows: [
        { label: '端子', ...text((m) => m.port) },
        { label: 'SIM', ...text((m) => m.sim) },
        { label: '認証', ...text((m) => m.certification) },
      ],
    },
  ]
}

export default function DualCompare({ models, shopLinks }: Props) {
  const defaultA = models.length > 4 ? models[4].id : models[0]?.id || 0
  const defaultB = models.length > 5 ? models[5].id : models[1]?.id || 0

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
          気になる2機種のiPhoneの違いを比較
        </h2>
        <p className="m-section-desc">
          気になる2機種のiPhoneを簡単に比較できるツールです。<br />
          今持っている機種と購入を検討中の機種を比較したい方はぜひチェックしてみてください。
        </p>

        <div className="m-card m-card--shadow compare-card">
          <table className="compare-table">
            <caption className="visually-hidden">2機種のiPhoneスペック比較</caption>
            <colgroup>
              <col className="compare-table__col-label" />
              <col />
              <col />
            </colgroup>

            {/* ヘッダー：モデル選択 + 画像 */}
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
                      <option key={m.id} value={m.id}>{m.model}</option>
                    ))}
                  </select>
                  <a href={`/iphone/${modelA.slug}`} className="compare-model-link">
                    このモデルの詳細を見る &rsaquo;
                  </a>
                  {modelA.image && (
                    <img
                      src={`/images/iphone/${modelA.image}`}
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
                      <option key={m.id} value={m.id}>{m.model}</option>
                    ))}
                  </select>
                  <a href={`/iphone/${modelB.slug}`} className="compare-model-link">
                    このモデルの詳細を見る &rsaquo;
                  </a>
                  {modelB.image && (
                    <img
                      src={`/images/iphone/${modelB.image}`}
                      alt={modelB.model}
                      width={120}
                      height={120}
                      className="compare-model-img"
                    />
                  )}
                </td>
              </tr>
            </thead>

            {/* カテゴリ別比較 */}
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

            {/* フッター：リンクボタン */}
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
