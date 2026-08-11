// 歴代デスクトップMacの進化点。MacBook版（macbook-spec-table/components/EvolutionTimeline.tsx）の
// デスクトップ版だが、ベンチマークの数値だけは DB から計算する。
// 静的な文字列に書くとスコアを更新したときに本文だけ古い数字のまま残るため。
//
// iMac には M2 世代が存在しない（2021 M1 → 2023 M3 → 2024 M4）。
// Mac Studio も M3 Max 世代が無く、2025 は M4 Max / M3 Ultra の混成。
// そのため「Mシリーズの数字が1つ飛ぶ」のが正しい。

import type { MacModel } from '@/lib/types'

type EvolutionStep = {
  title: string
  /** 進化の起点となる機種の slug */
  from: string
  /** 進化後の機種の slug */
  to: string
  /** ベンチマーク以外の進化点。スコアの行は from / to から自動生成する */
  features: string[]
}

const IMAC_STEPS: EvolutionStep[] = [
  {
    title: 'M3→M4の進化ポイント',
    from: 'imac-24-2023',
    to: 'imac-24-2024',
    features: [
      'メモリの標準構成が8GBから16GBになった（増設できないため、快適に使える年数を左右する差）',
      'カメラが1080p FaceTime HDから12MPセンターフレームカメラに（デスクビュー対応）',
      '外部ディスプレイが最大1台から2台（6K 60Hz × 2）に増えた',
      '上位構成のポートがThunderbolt 4 × 4になった（2023年モデルはThunderbolt / USB 4 × 2）',
      '映り込みを抑えるNano-textureガラスがオプションで選べるようになった',
    ],
  },
  {
    title: 'M1→M3の進化ポイント',
    from: 'imac-24-2021',
    to: 'imac-24-2023',
    features: [
      '同梱キーボードがTouch ID搭載Magic Keyboardになり、指紋認証でロック解除できるようになった',
      'GPUコアが7・8コアから8・10コアに増えた',
      'メモリの上限が16GBから24GBに広がった',
      'ディスプレイ（24インチ4.5K・4,480 × 2,520・500ニト）と本体サイズは変わらず',
      'iMacにM2世代は存在しないため、M1の次はM3になる',
    ],
  },
]

const MINI_STEPS: EvolutionStep[] = [
  {
    title: 'M2→M4の進化ポイント',
    from: 'mac-mini-2023',
    to: 'mac-mini-2024',
    features: [
      '筐体が19.7cm角から12.7cm角に。設置面積は388平方センチから161平方センチへ約4割に縮んだ',
      'メモリの標準構成が8GBから16GBになった',
      '前面にUSB-C × 2とヘッドフォンジャックが付き、背面に手を回さず挿せるようになった',
      'USB-Aポートが廃止された（古い周辺機器には変換アダプタが要る）',
      'Thunderboltが2基から3基に。M4 Pro構成ではThunderbolt 5になった',
      '外部ディスプレイが最大2台から3台に増えた',
    ],
  },
  {
    title: 'M1→M2の進化ポイント',
    from: 'mac-mini-2020',
    to: 'mac-mini-2023',
    features: [
      'M2 Pro構成が追加され、GPU最大19コア・Thunderbolt 4基を選べるようになった',
      'メモリの上限が16GBから32GBに広がった',
      'ストレージの上限が2TBから8TBに広がった',
      '外部ディスプレイがM2 Pro構成で最大3台に増えた',
      'HDMIが4K 60Hz止まりから8K 60Hz出力に対応した',
    ],
  },
]

const STUDIO_STEPS: EvolutionStep[] = [
  {
    title: 'M2 Max→M4 Maxの進化ポイント',
    from: 'mac-studio-2023',
    to: 'mac-studio-2025',
    features: [
      'ポートがThunderbolt 5 × 4になり、転送速度が上がった',
      'HDMIが2.1に対応した',
      'Ultra構成のメモリ上限が192GBから256GBに広がった（M3 Ultra）',
      'ストレージの上限が8TBから16TBに広がった',
      'Ultra構成のGPUが最大76コアから80コアに増えた',
      'この世代はM4 MaxとM3 Ultraの混成で、Ultraだけ1世代前のチップになる',
    ],
  },
  {
    title: 'M1 Max→M2 Maxの進化ポイント',
    from: 'mac-studio-2022',
    to: 'mac-studio-2023',
    features: [
      'メモリの上限が128GBから192GBに広がった',
      'Ultra構成のGPUが最大64コアから76コアに増えた',
      '外部ディスプレイが最大5台から最大8台に増えた（M2 Ultra）',
      'HDMIが8K 60Hz出力に対応した',
      '筐体サイズ（19.7 × 19.7 × 9.5cm）とポート構成は変わらず',
    ],
  },
]

/** 「10,007から15,085へ（約51%向上）」の1行を DB のスコアから作る */
function buildScoreFeature(
  models: Map<string, MacModel>,
  step: EvolutionStep,
): string | null {
  const from = models.get(step.from)
  const to = models.get(step.to)
  if (!from?.score_multi || !to?.score_multi) return null
  const rate = Math.round(((to.score_multi - from.score_multi) / from.score_multi) * 100)
  return `Geekbench 6のマルチコアスコアが${from.score_multi.toLocaleString()}から${to.score_multi.toLocaleString()}へ（約${rate}%向上）`
}

function TimelineSection({
  heading,
  steps,
  models,
}: {
  heading: string
  steps: EvolutionStep[]
  models: Map<string, MacModel>
}) {
  return (
    <>
      <h3 className="m-section-heading m-section-heading--md u-mt-2xl" style={{ textAlign: 'left' }}>
        {heading}
      </h3>
      <div className="evolution-timeline">
        {steps.map((step, idx) => {
          const score = buildScoreFeature(models, step)
          const features = score ? [score, ...step.features] : step.features
          return (
            <div key={step.to} className="evolution-item">
              <div className={`evolution-item__marker${idx % 2 === 0 ? ' evolution-item__marker--filled' : ''}`} />
              <div className="evolution-item__content">
                <div className="evolution-item__header">
                  <h4 className="evolution-item__title">{step.title}</h4>
                </div>
                <div className="evolution-item__body evolution-item__col">
                  <ul className="evolution-item__list">
                    {features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default function EvolutionTimeline({ models }: { models: MacModel[] }) {
  const bySlug = new Map(models.map((m) => [m.slug, m]))
  return (
    <section className="l-section" id="evolution" aria-labelledby="heading-evolution">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-evolution">
          歴代iMac・Mac miniの主な進化点（シリーズ別）
        </h2>
        <p className="m-section-desc">歴代のiMac・Mac mini・Mac Studioが世代ごとに何を変えてきたのかを整理しました。</p>
        <p className="m-section-desc">型落ちを選ぶときに「その世代で何を諦めることになるのか」を確認するのにお役立てください！</p>

        <TimelineSection heading="歴代iMac 24インチの進化した点" steps={IMAC_STEPS} models={bySlug} />
        <TimelineSection heading="歴代Mac miniの進化した点" steps={MINI_STEPS} models={bySlug} />
        <TimelineSection heading="歴代Mac Studioの進化した点" steps={STUDIO_STEPS} models={bySlug} />
      </div>
    </section>
  )
}
