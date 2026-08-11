import type { GalaxyModel } from '@/lib/types'
import TimelineBase, { type SeriesDef } from '@/app/components/EvolutionTimeline'
import ModelModalButton from './ModelModalButton'

type Props = {
  models: GalaxyModel[]
  avgPrices: Record<number, number | null>
  iosysUrlMap: Record<number, string>
}

// 1本のタイムラインに S / Z Fold / Z Flip / A が混ざると、
// 隣り合う2件が別シリーズになり「何からの進化なのか」が読み取れない。
// シリーズごとに区切って、その中だけで新しい順に並べる。
// どれにも当てはまらないもの（Z TriFold など）は「その他のシリーズ」に入る。
const SERIES: SeriesDef<GalaxyModel>[] = [
  { key: 's', label: 'Galaxy Sシリーズの進化', match: (m) => /Galaxy S\d/.test(m.model) },
  { key: 'fold', label: 'Galaxy Z Foldシリーズの進化', match: (m) => /Z Fold/.test(m.model) },
  { key: 'flip', label: 'Galaxy Z Flipシリーズの進化', match: (m) => /Z Flip/.test(m.model) },
  { key: 'a', label: 'Galaxy Aシリーズの進化', match: (m) => /Galaxy A\d/.test(m.model) },
]

export default function EvolutionTimeline({ models, avgPrices, iosysUrlMap }: Props) {
  return (
    <TimelineBase
      models={models}
      heading="歴代Samsung Galaxyの主な進化点（新しい順）"
      descriptions={[
        '歴代Samsung Galaxyの主に進化したポイントを新しい順に整理しました。',
        'シリーズを重ねるごとにどのような点がアップデートされてきたのかを把握するのにお役立てください！',
      ]}
      series={SERIES}
      standardLabel="標準モデルのみ"
      proLabel="上位モデルのみ"
      renderTitle={(m) => (
        <ModelModalButton
          model={m}
          avgPrice={avgPrices[m.id] ?? null}
          iosysUrl={iosysUrlMap[m.id] ?? null}
          className="evolution-item__model-link"
        />
      )}
    />
  )
}
