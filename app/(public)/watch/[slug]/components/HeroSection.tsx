import ModelHeroSection from '@/app/components/model/ModelHeroSection'
import type { ModelHeroConfig } from '@/app/components/model/ModelHeroSection'
import type { WatchModel, WatchPriceLog } from '@/lib/types'

const config: ModelHeroConfig = {
  categoryPath: '/watch',
  categoryLabel: '中古Apple Watch完全購入ガイド',
  categoryJsonLd: 'スマートウォッチ',
  imageFolder: 'watch',
  h1Template: '中古${model}は今買うべき？製品寿命、基本スペック、中古相場から解説',
  descriptionTemplate: '${model}の中古価格相場、スペック比較、おすすめショップ情報。',
}

type Props = {
  model: WatchModel
  latestPrice: WatchPriceLog | null
  dateStr: string
  dateDisplay: string
}

export default function HeroSection({ model, dateStr, dateDisplay }: Props) {
  return <ModelHeroSection model={model} config={config} dateStr={dateStr} dateDisplay={dateDisplay} />
}
