'use client'

import { useState } from 'react'

import { getBoolDisplay, formatDate } from '@/app/components/spec-table-utils'
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
        { label: 'CPU', ...text((m) => m.cpu) },
        { label: '素材', ...text((m) => m.material) },
        { label: '容量', ...text((m) => m.strage) },
        { label: '輝度', ...text((m) => m.max_brightness) },
        { label: '耐水性能', ...text((m) => m.water_resistance) },
        { label: 'バッテリー', ...text((m) => m.battery) },
      ],
    },
    {
      title: '搭載機能',
      rows: [
        { label: '常時点灯ディスプレイ', ...bool((m) => m.always_on_display) },
        { label: '急速充電', ...bool((m) => m.fast_charge) },
        { label: '血中酸素濃度', ...bool((m) => m.blood_oxygen) },
        { label: '心電図', ...bool((m) => m.cardiogram) },
        { label: '血圧', ...bool((m) => m.blood_pressure) },
        { label: '事故検出機能', ...bool((m) => m.accident_detection) },
        { label: '転倒検出機能', ...bool((m) => m.fall_detection) },
        { label: '皮膚温測定機能', ...bool((m) => m.skin_temperature) },
        { label: 'ダブルタップ', ...bool((m) => m.double_tap) },
        { label: '日本語入力', ...bool((m) => m.japanese_input) },
        { label: '睡眠トラッキング', ...bool((m) => m.sleep_tracking) },
        { label: '睡眠スコア', ...bool((m) => m.sleep_score) },
        { label: '高度計', ...bool((m) => m.altimeter) },
      ],
    },
  ]
}

export default function DualCompare({ models, shopLinks }: Props) {
  const defaultA = models.length > 8 ? models[8].id : models[0]?.id || 0
  const defaultB = models.length > 9 ? models[9].id : models[1]?.id || 0

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
          気になる2機種のApple Watchの違いを比較
        </h2>
        <p className="m-section-desc">
          気になる2機種のApple Watchを簡単に比較できるツールです。<br />
          今持っている機種と購入を検討中の機種を比較したい方はぜひチェックしてみてください。
        </p>

        <div className="m-card m-card--shadow compare-card">
          <table className="compare-table">
            <caption className="visually-hidden">2機種のApple Watchスペック比較</caption>
            <colgroup>
              <col className="compare-table__col-label" />
              <col />
              <col />
            </colgroup>

            {/* ヘッダー：モデル選択 */}
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
                      <option key={m.id} value={m.id}>{m.model}（{m.cpu}）</option>
                    ))}
                  </select>
                  <a href={`/watch/${modelA.slug}`} className="compare-model-link">
                    このモデルの詳細を見る &rsaquo;
                  </a>
                  {modelA.image && (
                    <img
                      src={`/images/watch/${modelA.image}`}
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
                      <option key={m.id} value={m.id}>{m.model}（{m.cpu}）</option>
                    ))}
                  </select>
                  <a href={`/watch/${modelB.slug}`} className="compare-model-link">
                    このモデルの詳細を見る &rsaquo;
                  </a>
                  {modelB.image && (
                    <img
                      src={`/images/watch/${modelB.image}`}
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
