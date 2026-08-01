import ModelHeroSection from '@/app/components/model/ModelHeroSection'
import type { ModelHeroConfig } from '@/app/components/model/ModelHeroSection'
import type { PixelModel, PixelPriceLog } from '@/lib/types'
import { buildPixelPageTitle } from '../pixel-helpers'

const config: ModelHeroConfig = {
  categoryPath: '/pixel',
  categoryLabel: '中古Google Pixelおすすめ機種・選び方ガイド',
  imageFolder: 'pixel',
}

type Props = {
  model: PixelModel
  latestPrice: PixelPriceLog | null
  dateStr: string
  dateDisplay: string
}

export default function HeroSection({ model, dateStr, dateDisplay }: Props) {
  return <ModelHeroSection model={model} config={config} dateStr={dateStr} dateDisplay={dateDisplay} h1Override={buildPixelPageTitle(model)} />
}
