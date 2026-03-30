// スペクトラム型「お得ゾーン」インフォグラフィック（全製品共通）
// サポート残年数でゾーンを全自動振り分け

import type { ReactNode } from 'react'
import type { BaseProductModel } from '@/lib/types'

// ---------- ゾーン表示情報（全製品共通） ----------
const ZONE_META = {
  danger: {
    barLabel: '非推奨',
    title: 'サポート終了が近い',
    subtitle: '安いが、すぐにサポート外になるリスク',
  },
  sweet: {
    barLabel: 'お得ゾーン',
    title: '価格も下がり、サポートも余裕あり',
    subtitle: '今買うならこのゾーンが狙い目',
  },
  premium: {
    barLabel: '割高',
    title: 'まだ割高',
    subtitle: 'サポートは長いが中古価格がまだ高い',
  },
} as const

type ZoneId = 'danger' | 'sweet' | 'premium'

export type SeriesDefinition = {
  label: string
  representativeSlug: string
}

type Props = {
  productName: string
  osName: string
  supportYears: number
  sweetMin: number
  sweetMax: number
  series: SeriesDefinition[]
  allModels: BaseProductModel[]
  /** モデルからラベルを生成する関数（デフォルト: label + （発売年）） */
  buildLabel?: (seriesDef: SeriesDefinition, model: BaseProductModel, releaseYear: number) => ReactNode
  /** 発売年をラベル外に表示するか（デフォルト: true） */
  showReleaseYear?: boolean
}

function calcSupportRemaining(dateStr: string | null, supportYears: number): number {
  if (!dateStr) return 0
  const release = new Date(dateStr)
  const now = new Date()
  const monthsPassed =
    (now.getFullYear() - release.getFullYear()) * 12 + now.getMonth() - release.getMonth()
  return Math.max(0, supportYears - monthsPassed / 12)
}

function formatSupportLabel(remaining: number): string {
  if (remaining <= 0) return 'サポート終了'
  if (remaining < 1) return '残り1年未満'
  const rounded = Math.round(remaining * 10) / 10
  return `残り約${rounded}年`
}

function getZoneId(remaining: number, sweetMin: number, sweetMax: number): ZoneId {
  if (remaining >= sweetMin && remaining <= sweetMax) return 'sweet'
  if (remaining > sweetMax) return 'premium'
  return 'danger'
}

export default function ValueZoneChart({
  productName,
  osName,
  supportYears,
  sweetMin,
  sweetMax,
  series,
  allModels,
  buildLabel,
  showReleaseYear = true,
}: Props) {
  const slugMap = new Map(allModels.map((m) => [m.slug, m]))

  const seriesWithZone = series
    .map((s) => {
      const model = slugMap.get(s.representativeSlug)
      if (!model?.date) return null
      const remaining = calcSupportRemaining(model.date, supportYears)
      const releaseYear = new Date(model.date).getFullYear()
      return {
        label: buildLabel ? buildLabel(s, model, releaseYear) : s.label,
        releaseYear,
        remaining,
        supportLabel: formatSupportLabel(remaining),
        zoneId: getZoneId(remaining, sweetMin, sweetMax),
        showYear: !buildLabel,
      }
    })
    .filter((s) => s != null)

  const zones = (['danger', 'sweet', 'premium'] as const).map((id) => ({
    id,
    ...ZONE_META[id],
    items: seriesWithZone.filter((s) => s.zoneId === id),
  }))

  return (
    <section className="l-section" id="value-zone" aria-labelledby="heading-value-zone">
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .vz__models { display: grid !important; grid-template-columns: 1fr 1fr; }
          .vz__model:nth-child(n+3) { display: none; }
        }
      ` }} />
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-value-zone">
          中古{productName}の「お得ゾーン」とは？
        </h2>
        <p className="m-section-desc">
          {osName}サポートに余裕があり、かつ価格も落ちてきている機種が「お得ゾーン」。
        </p>
        <p className="m-section-desc">
          安すぎる旧モデルはサポート切れのリスクがあり、最新モデルはまだ割高。そのちょうど中間が狙い目です。
        </p>

        <div className="vz">
          <div className="vz__bar">
            {zones.map((z) => (
              <div key={z.id} className={`vz__bar-seg vz__bar-seg--${z.id}`}>
                {z.barLabel}
              </div>
            ))}
          </div>

          <div className="vz__cols">
            {zones.map((z) => (
              <div key={z.id} className={`vz__col vz__col--${z.id}`}>
                <p className="vz__col-title">{z.title}</p>
                <p className="vz__col-sub">{z.subtitle}</p>
                <ul className="vz__models">
                  {z.items.map((item, i) => (
                    <li key={i} className={`vz__model vz__model--${z.id}`}>
                      <div className="vz__model-row">
                        <span className="vz__model-name">
                          {item.label}
                          {showReleaseYear && item.showYear && (
                            <span className="vz__model-release">（{item.releaseYear}年）</span>
                          )}
                        </span>
                      </div>
                      <div className="vz__model-row">
                        <span className={`vz__model-support vz__model-support--${z.id}`}>
                          {item.supportLabel}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="vz__axis">
            <span>← 安い・サポート短い</span>
            <span>高い・サポート長い →</span>
          </div>
        </div>
      </div>
    </section>
  )
}
