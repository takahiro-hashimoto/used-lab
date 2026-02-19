'use client'

import { useState } from 'react'


import Image from 'next/image'
import type { IPhoneModel } from '@/lib/types'

type Props = {
  currentModel: IPhoneModel
  allModels: IPhoneModel[]
  initialCompareId: number
  iosysUrl?: string
}

type CompareRow = {
  section: string
  label: string
  current: string
  compare: string
}

function getFeatureValue(model: IPhoneModel, key: string): string {
  const val = model[key as keyof IPhoneModel]
  if (val === true || val === '◯') return '◯'
  if (val === false || val === '×') return '×'
  if (val == null) return '-'
  return String(val).replace(/<br\s*\/?>/g, '\n')
}

function getAntutuTotal(m: IPhoneModel): string {
  const t = (m.antutu_cpu || 0) + (m.antutu_gpu || 0) + (m.antutu_mem || 0) + (m.antutu_ux || 0)
  return t > 0 ? t.toLocaleString() : '-'
}

function getBatteryLife(m: IPhoneModel): string {
  const parts: string[] = []
  if (m.video) parts.push(`ビデオ再生：${m.video}`)
  if (m.streaming) parts.push(`ストリーミング：${m.streaming}`)
  if (m.audio) parts.push(`音楽再生：${m.audio}`)
  return parts.length > 0 ? parts.join('\n') : '-'
}

function formatReleaseDate(date: string | null): string {
  if (!date) return '-'
  const parts = date.split('/')
  if (parts.length >= 3) return `${parts[0]}年${parts[1]}月${parts[2]}日`
  if (parts.length >= 2) return `${parts[0]}年${parts[1]}月`
  return date
}

function buildCompareRows(current: IPhoneModel, compare: IPhoneModel): CompareRow[] {
  return [
    // サイズ・重量
    { section: 'サイズ・重量', label: 'サイズ', current: current.size || '-', compare: compare.size || '-' },
    { section: 'サイズ・重量', label: '重量', current: current.weight || '-', compare: compare.weight || '-' },
    // ボディ
    { section: 'ボディ', label: 'CPU', current: current.cpu || '-', compare: compare.cpu || '-' },
    { section: 'ボディ', label: 'RAM', current: current.ram || '-', compare: compare.ram || '-' },
    { section: 'ボディ', label: 'カラー', current: current.color?.replace(/ \/ /g, '\n') || '-', compare: compare.color?.replace(/ \/ /g, '\n') || '-' },
    { section: 'ボディ', label: 'ストレージ容量', current: current.strage?.replace(/ \/ /g, '\n') || '-', compare: compare.strage?.replace(/ \/ /g, '\n') || '-' },
    { section: 'ボディ', label: 'バッテリー容量', current: current.battery || '-', compare: compare.battery || '-' },
    { section: 'ボディ', label: 'バッテリー持ち', current: getBatteryLife(current), compare: getBatteryLife(compare) },
    { section: 'ボディ', label: '充電端子', current: current.port || '-', compare: compare.port || '-' },
    { section: 'ボディ', label: 'Apple Intelligence', current: getFeatureValue(current, 'apple_intelligence'), compare: getFeatureValue(compare, 'apple_intelligence') },
    { section: 'ボディ', label: 'MagSafe充電', current: getFeatureValue(current, 'magsafe'), compare: getFeatureValue(compare, 'magsafe') },
    { section: 'ボディ', label: 'アクションボタン', current: getFeatureValue(current, 'action_button'), compare: getFeatureValue(compare, 'action_button') },
    { section: 'ボディ', label: 'カメラコントロール', current: getFeatureValue(current, 'camera_control'), compare: getFeatureValue(compare, 'camera_control') },
    // ディスプレイ
    { section: 'ディスプレイ', label: '画面サイズ', current: current.display || '-', compare: compare.display || '-' },
    { section: 'ディスプレイ', label: '画像解像度', current: current.resolution || '-', compare: compare.resolution || '-' },
    { section: 'ディスプレイ', label: 'ProMotion', current: getFeatureValue(current, 'promotion'), compare: getFeatureValue(compare, 'promotion') },
    { section: 'ディスプレイ', label: 'Dynamic Island', current: getFeatureValue(current, 'dynamic_island'), compare: getFeatureValue(compare, 'dynamic_island') },
    // カメラ
    { section: 'カメラ', label: 'フロントカメラ', current: current.front_camera || '-', compare: compare.front_camera || '-' },
    { section: 'カメラ', label: 'インカメラ', current: current.in_camera || '-', compare: compare.in_camera || '-' },
    { section: 'カメラ', label: 'センサーサイズ', current: current.image_sensor || '-', compare: compare.image_sensor || '-' },
    { section: 'カメラ', label: 'フォトグラフスタイル', current: getFeatureValue(current, 'photography_style'), compare: getFeatureValue(compare, 'photography_style') },
    { section: 'カメラ', label: 'ナイトモード', current: getFeatureValue(current, 'night_mode'), compare: getFeatureValue(compare, 'night_mode') },
    { section: 'カメラ', label: 'ポートレートモード', current: getFeatureValue(current, 'portrait_mode'), compare: getFeatureValue(compare, 'portrait_mode') },
    { section: 'カメラ', label: 'アクションモード', current: getFeatureValue(current, 'action_mode'), compare: getFeatureValue(compare, 'action_mode') },
    { section: 'カメラ', label: 'シネマティックモード', current: getFeatureValue(current, 'cinematic_mode'), compare: getFeatureValue(compare, 'cinematic_mode') },
    { section: 'カメラ', label: 'マクロ撮影', current: getFeatureValue(current, 'macro_mode'), compare: getFeatureValue(compare, 'macro_mode') },
    { section: 'カメラ', label: 'LiDARスキャナー', current: getFeatureValue(current, 'lidar'), compare: getFeatureValue(compare, 'lidar') },
    { section: 'カメラ', label: 'Apple ProRAW', current: getFeatureValue(current, 'apple_proraw'), compare: getFeatureValue(compare, 'apple_proraw') },
    { section: 'カメラ', label: 'Apple ProRes', current: getFeatureValue(current, 'apple_prores'), compare: getFeatureValue(compare, 'apple_prores') },
    // その他
    { section: 'その他', label: '発売日', current: formatReleaseDate(current.date), compare: formatReleaseDate(compare.date) },
    { section: 'その他', label: '認証機能', current: current.certification || '-', compare: compare.certification || '-' },
    { section: 'その他', label: 'SIM', current: current.sim || '-', compare: compare.sim || '-' },
    { section: 'その他', label: '事故衝突検知', current: getFeatureValue(current, 'accident_detection'), compare: getFeatureValue(compare, 'accident_detection') },
  ]
}

function CellValue({ value }: { value: string }) {
  if (value === '◯') return <span className="m-rating__icon m-rating__icon--good" aria-label="対応">&#9675;</span>
  if (value === '×') return <span className="m-spec-row__cross" aria-label="非対応">&times;</span>
  const normalized = value.replace(/<br\s*\/?>/g, '\n')
  if (normalized.includes('\n')) {
    return <>{normalized.split('\n').map((line, i) => (
      <span key={i}>{i > 0 && <br />}{line}</span>
    ))}</>
  }
  return <>{normalized}</>
}

export default function CompareSelector({ currentModel, allModels, initialCompareId, iosysUrl }: Props) {
  const [compareId, setCompareId] = useState(initialCompareId)
  const compareModel = allModels.find((m) => m.id === compareId) || allModels[0]
  const rows = buildCompareRows(currentModel, compareModel)
  const sections = [...new Set(rows.map((r) => r.section))]

  return (
    <div className="m-card m-card--shadow compare-card">
      <table className="compare-table">
        <caption className="visually-hidden">
          {currentModel.model} と {compareModel.model} のスペック比較
        </caption>
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
              <strong className="compare-model-name">{currentModel.model}</strong>
              <span className="compare-model-note">このモデルを表示中</span>
              {currentModel.image && (
                <Image
                  src={`/images/iphone/${currentModel.image}`}
                  alt={currentModel.model}
                  width={120}
                  height={120}
                  className="compare-model-img"
                />
              )}
            </td>
            <td className="compare-table__header-cell">
              <label htmlFor="compare-model-select" className="visually-hidden">比較するモデルを選択</label>
              <select
                className="compare-select"
                id="compare-model-select"
                value={compareId}
                onChange={(e) => setCompareId(Number(e.target.value))}
              >
                {allModels
                  .filter((m) => m.id !== currentModel.id)
                  .map((m) => (
                    <option key={m.id} value={m.id}>{m.model}</option>
                  ))}
              </select>
              <a href={`/iphone/${compareModel.slug}`} className="compare-model-link">
                このモデルの詳細を見る &rsaquo;
              </a>
              {compareModel.image && (
                <Image
                  src={`/images/iphone/${compareModel.image}`}
                  alt={compareModel.model}
                  width={120}
                  height={120}
                  className="compare-model-img"
                />
              )}
            </td>
          </tr>
        </thead>

        {/* カテゴリ別比較 */}
        {sections.map((section) => {
          const sectionRows = rows.filter((r) => r.section === section)
          return (
            <tbody key={section}>
              <tr>
                <th colSpan={3} className="compare-category-cell">
                  <span className="compare-category">
                    <i className="fa-solid fa-circle-check" aria-hidden="true"></i> {section}
                  </span>
                </th>
              </tr>
              {sectionRows.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  <td><CellValue value={row.current} /></td>
                  <td><CellValue value={row.compare} /></td>
                </tr>
              ))}
            </tbody>
          )
        })}

        {/* フッター：アクションボタン */}
        <tfoot>
          <tr className="compare-table__action-row">
            <th></th>
            <td>
              {iosysUrl ? (
                <a href={iosysUrl} target="_blank" rel="noopener noreferrer nofollow" className="m-btn m-btn--primary m-btn--block">
                  {currentModel.model}の購入先 <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </a>
              ) : (
                <a href="#shops" className="m-btn m-btn--primary m-btn--block">
                  {currentModel.model}の購入先 <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </a>
              )}
            </td>
            <td>
              <a href={`/iphone/${compareModel.slug}`} className="m-btn m-btn--primary m-btn--block">
                {compareModel.model}の詳細 <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </a>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
