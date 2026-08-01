import ModelHeroSection from '@/app/components/model/ModelHeroSection'
import type { ModelHeroConfig } from '@/app/components/model/ModelHeroSection'
import type { GalaxyModel, GalaxyPriceLog } from '@/lib/types'
import { buildGalaxyPageTitle } from '../lib/helpers'

const config: ModelHeroConfig = {
  categoryPath: '/galaxy',
  categoryLabel: '中古Samsung Galaxyおすすめ機種・選び方ガイド',
  imageFolder: 'galaxy',
}

type Props = {
  model: GalaxyModel
  latestPrice: GalaxyPriceLog | null
  dateStr: string
  dateDisplay: string
}

export default function HeroSection({ model, dateStr, dateDisplay }: Props) {
  return <ModelHeroSection model={model} config={config} dateStr={dateStr} dateDisplay={dateDisplay} h1Override={buildGalaxyPageTitle(model)} />
}
