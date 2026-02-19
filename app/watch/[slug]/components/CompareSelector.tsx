'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { WatchModel } from '@/lib/types'

type Props = {
  currentModel: WatchModel
  allModels: WatchModel[]
  initialCompareId: number
  iosysUrl?: string
}

type CompareRow = {
  section: string
  label: string
  current: string
  compare: string
}

function getBoolValue(val: boolean): string {
  return val ? '◯' : '×'
}

function formatReleaseDate(date: string | null): string {
  if (!date) return '-'
  const parts = date.split('/')
  if (parts.length >= 3) return `${parts[0]}年${parts[1]}月${parts[2]}日`
  if (parts.length >= 2) return `${parts[0]}年${parts[1]}月`
  return date
}

function buildCompareRows(current: WatchModel, compare: WatchModel): CompareRow[] {
  return [
    // 基本仕様
    { section: '基本仕様', label: 'ケースサイズ', current: current.size || '-', compare: compare.size || '-' },
    { section: '基本仕様', label: 'チップセット', current: current.cpu || '-', compare: compare.cpu || '-' },
    { section: '基本仕様', label: 'ストレージ', current: current.strage || '-', compare: compare.strage || '-' },
    { section: '基本仕様', label: 'ケース素材', current: current.material || '-', compare: compare.material || '-' },
    { section: '基本仕様', label: 'ディスプレイ輝度', current: current.max_brightness || '-', compare: compare.max_brightness || '-' },
    { section: '基本仕様', label: '耐水性能', current: current.water_resistance || '-', compare: compare.water_resistance || '-' },
    { section: '基本仕様', label: 'バッテリー', current: current.battery || '-', compare: compare.battery || '-' },
    // ディスプレイ・操作
    { section: 'ディスプレイ・操作', label: '常時表示', current: getBoolValue(current.always_on_display), compare: getBoolValue(compare.always_on_display) },
    { section: 'ディスプレイ・操作', label: '急速充電', current: getBoolValue(current.fast_charge), compare: getBoolValue(compare.fast_charge) },
    { section: 'ディスプレイ・操作', label: 'ダブルタップ', current: getBoolValue(current.double_tap), compare: getBoolValue(compare.double_tap) },
    { section: 'ディスプレイ・操作', label: '日本語入力', current: getBoolValue(current.japanese_input), compare: getBoolValue(compare.japanese_input) },
    // 健康・安全機能
    { section: '健康・安全機能', label: '血中酸素濃度', current: getBoolValue(current.blood_oxygen), compare: getBoolValue(compare.blood_oxygen) },
    { section: '健康・安全機能', label: '心電図', current: getBoolValue(current.cardiogram), compare: getBoolValue(compare.cardiogram) },
    { section: '健康・安全機能', label: '衝突事故検出', current: getBoolValue(current.accident_detection), compare: getBoolValue(compare.accident_detection) },
    { section: '健康・安全機能', label: '転倒検出', current: getBoolValue(current.fall_detection), compare: getBoolValue(compare.fall_detection) },
    { section: '健康・安全機能', label: '皮膚温センサー', current: getBoolValue(current.skin_temperature), compare: getBoolValue(compare.skin_temperature) },
    { section: '健康・安全機能', label: '睡眠トラッキング', current: getBoolValue(current.sleep_tracking), compare: getBoolValue(compare.sleep_tracking) },
    { section: '健康・安全機能', label: '高度計', current: getBoolValue(current.altimeter), compare: getBoolValue(compare.altimeter) },
    { section: '健康・安全機能', label: '血圧', current: getBoolValue(current.blood_pressure), compare: getBoolValue(compare.blood_pressure) },
    { section: '健康・安全機能', label: '睡眠スコア', current: getBoolValue(current.sleep_score), compare: getBoolValue(compare.sleep_score) },
    // その他
    { section: 'その他', label: '発売日', current: formatReleaseDate(current.date), compare: formatReleaseDate(compare.date) },
  ]
}

function CellValue({ value }: { value: string }) {
  if (value === '◯') return <span className="m-rating__icon m-rating__icon--good" aria-label="対応">&#9675;</span>
  if (value === '×') return <span className="m-spec-row__cross" aria-label="非対応">&times;</span>
  if (value.includes('\n')) {
    return <>{value.split('\n').map((line, i) => (
      <span key={i}>{i > 0 && <br />}{line}</span>
    ))}</>
  }
  return <>{value}</>
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

        <thead>
          <tr>
            <th></th>
            <td className="compare-table__header-cell">
              <strong className="compare-model-name">{currentModel.model}</strong>
              <span className="compare-model-note">このモデルを表示中</span>
              {currentModel.image && (
                <Image
                  src={`/images/watch/${currentModel.image}`}
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
              <Link href={`/watch/${compareModel.slug}`} className="compare-model-link">
                このモデルの詳細を見る &rsaquo;
              </Link>
              {compareModel.image && (
                <Image
                  src={`/images/watch/${compareModel.image}`}
                  alt={compareModel.model}
                  width={120}
                  height={120}
                  className="compare-model-img"
                />
              )}
            </td>
          </tr>
        </thead>

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
              <Link href={`/watch/${compareModel.slug}`} className="m-btn m-btn--primary m-btn--block">
                {compareModel.model}の詳細 <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </Link>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
