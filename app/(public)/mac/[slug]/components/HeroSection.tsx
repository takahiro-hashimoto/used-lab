import ModelHeroSection from '@/app/components/model/ModelHeroSection'
import type { ModelHeroConfig } from '@/app/components/model/ModelHeroSection'
import type { MacModel, MacPriceLog } from '@/lib/types'

const config: ModelHeroConfig = {
  categoryPath: '/mac',
  categoryLabel: '中古iMac・Mac miniおすすめ機種',
  imageFolder: 'mac',
  imageWidth: 480,
  imageHeight: 320,
}

type Props = {
  model: MacModel
  latestPrice: MacPriceLog | null
  dateStr: string
  dateDisplay: string
}

export default function HeroSection({ model, dateStr, dateDisplay }: Props) {
  return <ModelHeroSection model={model} config={config} dateStr={dateStr} dateDisplay={dateDisplay} />
}
