import { BenchBar } from '@/app/components/spec-table-utils'
import StickyTableWrapper from '@/app/components/StickyTableWrapper'
import type { GalaxyBenchModel } from './BenchmarkRanking'

/** シリーズごとの位置づけと特徴 */
const SERIES_FEATURES: Record<string, { label: string; position: string; feature: string }> = {
  S: {
    label: 'Sシリーズ（フラッグシップ）',
    position: 'フラッグシップ',
    feature: 'Galaxyの最上位ライン。多くの世代でSnapdragon 8系（日本版は「for Galaxy」版が中心）を搭載し、一部世代はExynosを採用。ピーク性能・カメラ・ディスプレイすべてが最上級で、ベンチマークスコアも歴代トップクラス。ゲームや動画編集などの高負荷用途に最適。',
  },
  A: {
    label: 'Aシリーズ（ミドルレンジ）',
    position: 'ミドル',
    feature: '価格を抑えたミドルレンジ。ExynosやMediaTek Dimensityなどのミドル向けチップを搭載し、スコア帯はSシリーズより控えめ。SNS・Web閲覧・動画視聴といった日常使いには十分で、microSD対応など実用性を重視した機種が多い。',
  },
  'Z Fold': {
    label: 'Z Fold（折りたたみ・大画面）',
    position: '折りたたみ',
    feature: '大画面を開ける折りたたみ（フォルダブル）。SシリーズUltra相当のSnapdragon 8系フラッグシップチップを搭載し、性能はトップクラス。マルチタスクやS Pen対応で生産性を重視するユーザー向け。ヒンジや画面折り目、防塵性能（IPX8等）は中古選びで要確認。',
  },
  'Z Flip': {
    label: 'Z Flip（折りたたみ・コンパクト）',
    position: '折りたたみ',
    feature: '縦折りでコンパクトに収まるフォルダブル。Snapdragon 8系のフラッグシップチップを搭載しつつ、デザイン性とカバー画面の使い勝手を両立。性能は十分高いがバッテリー容量は控えめ。中古ではヒンジ状態やカバー画面の傷に注意。',
  },
}

/** 表示順（フラッグシップ→折りたたみ→ミドル） */
const SERIES_ORDER = ['S', 'Z Fold', 'Z Flip', 'A']

type SeriesGroup = {
  series: string
  models: GalaxyBenchModel[]
  avgSingle: number
  avgMulti: number
  avgAntutu: number
  chips: string[]
}

function groupBySeries(models: GalaxyBenchModel[]): SeriesGroup[] {
  const map = new Map<string, GalaxyBenchModel[]>()
  for (const m of models) {
    const series = m.series
    if (!series) continue
    const arr = map.get(series) || []
    arr.push(m)
    map.set(series, arr)
  }

  return Array.from(map.entries()).map(([series, ms]) => {
    const avgSingle = Math.round(ms.reduce((s, m) => s + m.score_single, 0) / ms.length)
    const avgMulti = Math.round(ms.reduce((s, m) => s + m.score_multi, 0) / ms.length)
    const antutuModels = ms.filter((m) => m.antutu_total != null)
    const avgAntutu = antutuModels.length > 0
      ? Math.round(antutuModels.reduce((s, m) => s + (m.antutu_total as number), 0) / antutuModels.length)
      : 0
    // 代表的なチップ名（重複排除）
    const chips = Array.from(
      new Set(ms.map((m) => m.cpu).filter((c): c is string => !!c))
    )
    return { series, models: ms, avgSingle, avgMulti, avgAntutu, chips }
  })
}

function seriesOrder(series: string): number {
  const idx = SERIES_ORDER.indexOf(series)
  return idx === -1 ? SERIES_ORDER.length : idx
}

export default function SeriesGenerationCompare({ models }: { models: GalaxyBenchModel[] }) {
  const groups = groupBySeries(models)
  if (groups.length < 2) return null

  const sorted = [...groups].sort((a, b) => seriesOrder(a.series) - seriesOrder(b.series))

  const maxSingle = Math.max(...sorted.map((g) => g.avgSingle))
  const maxMulti = Math.max(...sorted.map((g) => g.avgMulti))
  const maxAntutu = Math.max(...sorted.map((g) => g.avgAntutu))

  return (
    <section className="l-section" id="chip-compare" aria-labelledby="heading-chip-compare">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-chip-compare">
          S / A / Z シリーズ別の性能比較
        </h2>
        <p className="m-section-desc">
          各シリーズの平均ベンチマークスコアを比較。Sシリーズ＝フラッグシップ（Snapdragon 8系）、Aシリーズ＝ミドル（Exynos／Dimensity）、Zシリーズ＝折りたたみという位置づけで、シリーズごとの性能傾向が一目でわかります。
        </p>

        <StickyTableWrapper floatingHeader className="m-card m-card--shadow m-table-card">
          <div className="m-table-scroll">
            <table className="m-table bench-table chip-gen-table">
              <caption className="visually-hidden">Samsung Galaxy シリーズ別 平均ベンチマークスコア比較</caption>
              <thead>
                <tr>
                  <th scope="col">シリーズ</th>
                  <th scope="col">シングル（平均）</th>
                  <th scope="col">マルチ（平均）</th>
                  <th scope="col">AnTuTu（平均）</th>
                  <th scope="col">主なチップ</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((g) => (
                  <tr key={g.series}>
                    <th scope="row" className="bench-table__sticky chip-gen-table__chip">
                      <span className="chip-gen-badge">{g.series}シリーズ</span>
                    </th>
                    <td><BenchBar value={g.avgSingle} maxValue={maxSingle} color="#e74c6f" /></td>
                    <td><BenchBar value={g.avgMulti} maxValue={maxMulti} color="#f0a030" /></td>
                    <td>
                      {g.avgAntutu > 0
                        ? <BenchBar value={g.avgAntutu} maxValue={maxAntutu} color="var(--color-primary, #2589d0)" />
                        : <span className="u-text-muted">-</span>}
                    </td>
                    <td className="u-text-muted" style={{ fontSize: '0.85em', lineHeight: 1.5 }}>
                      {g.chips.length > 0 ? g.chips.join(' / ') : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </StickyTableWrapper>
        <p className="m-table-note">※ 平均値は各シリーズに属するモデルのGeekbench 6スコアから算出。同一シリーズ内の世代差（例：S22とS24）を含む平均値です。</p>

        {/* 各シリーズの特徴 */}
        <div className="l-grid l-grid--3col l-grid--gap-lg u-mt-2xl">
          {sorted.map((g) => {
            const info = SERIES_FEATURES[g.series]
            if (!info) return null
            return (
              <div key={g.series} className="m-card m-card--shadow m-card--padded">
                <h3 className="post-check-item__heading">
                  <i className="fa-solid fa-microchip" aria-hidden="true" style={{ color: '#2563eb' }}></i>
                  {info.label}
                </h3>
                <p className="post-check-item__desc">{info.feature}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
