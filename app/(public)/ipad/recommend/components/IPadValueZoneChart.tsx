// スペクトラム型「お得ゾーン」インフォグラフィック — iPad版
// サポート残年数でゾーンを全自動振り分け

import type { IPadModel } from '@/lib/types'

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

// iPadシリーズ定義（representativeSlug: サポート残算出用）
const ALL_SERIES = [
  { label: 'iPad 第7世代', representativeSlug: 'normal-7' },
  { label: 'iPad 第8世代', representativeSlug: 'normal-8' },
  { label: 'iPad mini 第5世代', representativeSlug: 'mini-5' },
  { label: 'iPad Air 第4世代', representativeSlug: 'air-4' },
  { label: 'iPad 第9世代', representativeSlug: 'normal-9' },
  { label: 'iPad mini 第6世代', representativeSlug: 'mini-6' },
  { label: 'iPad 第10世代', representativeSlug: 'normal-10' },
  { label: 'iPad Air 第5世代', representativeSlug: 'air-5' },
  { label: 'iPad Pro 11" 第3世代', representativeSlug: 'pro11-3' },
  { label: 'iPad Pro 12.9" 第5世代', representativeSlug: 'pro12-5' },
  { label: 'iPad Pro 11" 第4世代', representativeSlug: 'pro11-4' },
  { label: 'iPad Pro 12.9" 第6世代', representativeSlug: 'pro12-6' },
  { label: 'iPad Air 第6世代', representativeSlug: 'air-6-11' },
  { label: 'iPad mini 第7世代', representativeSlug: 'mini-7' },
  { label: 'iPad 第11世代', representativeSlug: 'normal-11' },
  { label: 'iPad Pro M4', representativeSlug: 'pro11-5' },
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

type Props = {
  allModels: IPadModel[]
}

export default function IPadValueZoneChart({ allModels }: Props) {
  const slugMap = new Map(allModels.map((m) => [m.slug, m]))

  const seriesWithZone = ALL_SERIES
    .map((s) => {
      const model = slugMap.get(s.representativeSlug)
      if (!model?.date) return null
      const remaining = calcSupportRemaining(model.date)
      return {
        label: s.label,
        releaseYear: new Date(model.date).getFullYear(),
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
          中古iPadの「お得ゾーン」とは？
        </h2>
        <p className="m-section-desc">
          iPadOSサポートに余裕があり、かつ価格も落ちてきている機種が「お得ゾーン」。
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
                        <span className="vz__model-name">
                          {item.label}
                          <span className="vz__model-release">（{item.releaseYear}年）</span>
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
