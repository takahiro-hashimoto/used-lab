import ModelHeroSection from '@/app/components/model/ModelHeroSection'
import type { ModelHeroConfig } from '@/app/components/model/ModelHeroSection'
import type { IPadModel, IPadPriceLog } from '@/lib/types'

const config: ModelHeroConfig = {
  categoryPath: '/ipad',
  categoryLabel: '中古iPadおすすめ機種・選び方ガイド',
  imageFolder: 'ipad',
}

type Props = {
  model: IPadModel
  latestPrice: IPadPriceLog | null
  dateStr: string
  dateDisplay: string
}

export default function HeroSection({ model, dateStr, dateDisplay }: Props) {
  return <ModelHeroSection model={model} config={config} dateStr={dateStr} dateDisplay={dateDisplay} />
}
