import type { PixelModel } from '@/lib/types'
import TimelineBase, { type SeriesDef } from '@/app/components/EvolutionTimeline'
import ModelModalButton from './ModelModalButton'

type Props = {
  models: PixelModel[]
  avgPrices: Record<number, number | null>
  iosysUrlMap: Record<number, string>
}

// 無印・aシリーズ・Foldを1本に並べると、隣り合う2件が別ラインになり
// 「何からの進化なのか」が読み取れない。ラインごとに区切る。
// 主力の無印・Proが先頭。廉価のaシリーズとFoldはそのあと。
const isFold = (m: PixelModel) => /Fold/.test(m.model)
const isA = (m: PixelModel) => /Pixel \d+a/.test(m.model)

const SERIES: SeriesDef<PixelModel>[] = [
  { key: 'main', label: 'Pixel 無印・Proシリーズの進化', match: (m) => !isFold(m) && !isA(m) },
  { key: 'a', label: 'Pixel aシリーズの進化', match: isA },
  { key: 'fold', label: 'Pixel Foldシリーズの進化', match: isFold },
]

export default function EvolutionTimeline({ models, avgPrices, iosysUrlMap }: Props) {
  return (
    <TimelineBase
      models={models}
      heading="歴代Google Pixelの主な進化点（新しい順）"
      descriptions={[
        '歴代Google Pixelの主に進化したポイントを新しい順に整理しました。',
        'シリーズを重ねるごとにどのような点がアップデートされてきたのかを把握するのにお役立てください！',
      ]}
      series={SERIES}
      standardLabel="スタンダードモデルのみ"
      proLabel="Proモデルのみ"
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
