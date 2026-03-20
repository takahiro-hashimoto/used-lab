// スペクトラム型「お得ゾーン」インフォグラフィック — MacBook版
// サポート残年数でゾーンを全自動振り分け
// 同年・同ラインのモデルはグループ化（例: MacBook Pro 14 / 16 2023年モデル（M3））

import type { MacBookModel } from '@/lib/types'

const SUPPORT_YEARS = 7
const SWEET_MIN = 3
const SWEET_MAX = 4

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

// グループ定義: 同年・同ラインのモデルをまとめる
// labelTemplate: {year} と {chip} はDBから自動置換
const ALL_GROUPS = [
  { labelTemplate: 'MBA 13 {year}（{chip}）', representativeSlug: 'mba-13-2020' },
  { labelTemplate: 'MBP 14 / 16 {year}（{chip}）', representativeSlug: 'mbp-14-2021' },
  { labelTemplate: 'MBP 13 {year}（{chip}）', representativeSlug: 'mbp-13-2022' },
  { labelTemplate: 'MBA 13 {year}（{chip}）', representativeSlug: 'mba-13-2022' },
  { labelTemplate: 'MBA 15 {year}（{chip}）', representativeSlug: 'mba-15-2023' },
  { labelTemplate: 'MBP 14 / 16 {year}（{chip}）', representativeSlug: 'mbp-14-2023' },
  { labelTemplate: 'MBP 14 / 16 {year}（{chip}）', representativeSlug: 'mbp-14-2023-nov' },
  { labelTemplate: 'MBA 13 / 15 {year}（{chip}）', representativeSlug: 'mba-13-2024' },
  { labelTemplate: 'MBP 14 / 16 {year}（{chip}）', representativeSlug: 'mbp-14-2024-nov' },
  { labelTemplate: 'MBA 13 / 15 {year}（{chip}）', representativeSlug: 'mba-13-2025' },
]

function calcSupportRemaining(dateStr: string | null): number {
  if (!dateStr) return 0
  return Math.max(0, new Date(dateStr).getFullYear() + SUPPORT_YEARS - new Date().getFullYear())
}

function formatSupportLabel(remaining: number): string {
  if (remaining <= 0) return 'サポート終了'
  if (remaining < 1) return '残り1年未満'
  return `残り約${remaining}年`
}

function getZoneId(remaining: number): 'danger' | 'sweet' | 'premium' {
  if (remaining >= SWEET_MIN && remaining <= SWEET_MAX) return 'sweet'
  if (remaining > SWEET_MAX) return 'premium'
  return 'danger'
}

/** CPUフィールドからチップ名を抽出（例: "Apple M2 8コア" → "M2"） */
function extractChipName(cpu: string | null): string {
  if (!cpu) return '---'
  const match = cpu.match(/M\d+(\s?(Pro|Max|Ultra))?/i)
  return match ? match[0] : cpu
}

type Props = {
  allModels: MacBookModel[]
}

export default function MacBookValueZoneChart({ allModels }: Props) {
  const slugMap = new Map(allModels.map((m) => [m.slug, m]))

  const seriesWithZone = ALL_GROUPS
    .map((g) => {
      const model = slugMap.get(g.representativeSlug)
      if (!model?.date) return null
      const remaining = calcSupportRemaining(model.date)
      const year = new Date(model.date).getFullYear()
      const chip = extractChipName(model.cpu)
      const label = g.labelTemplate
        .replace('{year}', String(year))
        .replace('{chip}', chip)
      return {
        label,
        releaseYear: year,
        remaining,
        supportLabel: formatSupportLabel(remaining),
        zoneId: getZoneId(remaining),
      }
    })
    .filter((s) => s != null)

  const zones = (['danger', 'sweet', 'premium'] as const).map((id) => ({
    id,
    ...ZONE_META[id],
    items: seriesWithZone.filter((s) => s.zoneId === id),
  }))

  return (
    <section className="l-section l-section--bg-subtle" id="value-zone" aria-labelledby="heading-value-zone">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-value-zone">
          中古MacBookの「お得ゾーン」とは？
        </h2>
        <p className="m-section-desc">
          macOSサポートに余裕があり、かつ価格も落ちてきている機種が「お得ゾーン」。
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
                  {z.items.map((item) => (
                    <li key={item.label} className={`vz__model vz__model--${z.id}`}>
                      <div className="vz__model-row">
                        <span className="vz__model-name">{item.label}</span>
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
