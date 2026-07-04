import ModelHeroSection from '@/app/components/model/ModelHeroSection'
import type { ModelHeroConfig } from '@/app/components/model/ModelHeroSection'
import type { WatchModel, WatchPriceLog } from '@/lib/types'

const config: ModelHeroConfig = {
  categoryPath: '/watch',
  categoryLabel: '中古Apple Watchおすすめ機種・選び方ガイド',
  imageFolder: 'watch',
  h1Template: '中古${model}はいつまで使える？相場・製品寿命・スペックを解説',
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
