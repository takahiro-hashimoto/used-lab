'use client'

import { useState } from 'react'

import { getBoolDisplay, TextCell, formatDate } from '@/app/components/spec-table-utils'
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
  color: string | null
  score_single: number | null
  score_multi: number | null
  score_metal: number | null
}

type Props = {
  models: SpecModel[]
  shopLinks: ProductShopLink[]
}

type CompareCategory = {
  title: string
  rows: { label: string; get: (m: SpecModel) => React.ReactNode }[]
}

function formatScore(val: number | null): string {
  if (val == null) return '-'
  return val.toLocaleString()
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
  const score = (getter: (m: SpecModel) => number | null) => ({
    get: (m: SpecModel) => formatScore(getter(m)),
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
        { label: 'カラー', ...text((m) => m.color) },
        { label: 'ストレージ', ...text((m) => m.strage) },
        { label: 'バッテリー容量', ...text((m) => m.battery) },
        { label: '充電端子', ...text((m) => m.port) },
        { label: 'スピーカー', ...text((m) => m.speaker) },
      ],
    },
    {
      title: 'CPU・ベンチマークスコア',
      rows: [
        { label: 'CPU', ...text((m) => m.cpu) },
        { label: 'GeekBench シングル', ...score((m) => m.score_single) },
        { label: 'GeekBench マルチ', ...score((m) => m.score_multi) },
        { label: 'GeekBench Metal', ...score((m) => m.score_metal) },
        { label: 'メモリ', ...text((m) => m.ram) },
      ],
    },
    {
      title: 'ディスプレイ',
      rows: [
        { label: '画面サイズ', ...text((m) => m.display) },
        { label: '画像解像度', ...text((m) => m.resolution) },
        { label: 'ProMotion', ...bool((m) => m.promotion) },
      ],
    },
    {
      title: 'カメラ',
      rows: [
        { label: 'フロントカメラ', ...text((m) => m.front_camera) },
        { label: 'インカメラ', ...text((m) => m.in_camera) },
        { label: 'センターフレーム', ...bool((m) => m.center_frame) },
        { label: 'LiDARスキャナー', ...bool((m) => m.lidar) },
      ],
    },
    {
      title: 'その他',
      rows: [
        { label: '発売日', get: (m: SpecModel) => formatDate(m.date) },
        { label: '認証機能', ...text((m) => m.certification) },
        { label: 'Apple Intelligence', ...bool((m) => m.apple_intelligence) },
        { label: 'SIM', ...text((m) => m.sim) },
        { label: 'Apple Pencil', ...text((m) => m.pencil) },
        { label: '外付けキーボード', ...text((m) => m.keyboard) },
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
          気になる2機種のiPadの違いを比較
        </h2>
        <p className="m-section-desc">
          気になる2機種のiPadを簡単に比較できるツールです。<br />
          今持っている機種と購入を検討中の機種を比較したい方はぜひチェックしてみてください。
        </p>

        <div className="m-card m-card--shadow compare-card">
          <table className="compare-table">
            <caption className="visually-hidden">2機種のiPadスペック比較</caption>
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
                      <option key={m.id} value={m.id}>{m.model}（{m.cpu}）</option>
                    ))}
                  </select>
                  <a href={`/ipad/${modelA.slug}`} className="compare-model-link">
                    このモデルの詳細を見る &rsaquo;
                  </a>
                  {modelA.image && (
                    <img
                      src={`/images/ipad/${modelA.image}`}
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
                  <a href={`/ipad/${modelB.slug}`} className="compare-model-link">
                    このモデルの詳細を見る &rsaquo;
                  </a>
                  {modelB.image && (
                    <img
                      src={`/images/ipad/${modelB.image}`}
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
