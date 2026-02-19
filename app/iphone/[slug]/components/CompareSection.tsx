import type { IPhoneModel, ProductShopLink } from '@/lib/types'
import CompareSelector from './CompareSelector'

type Props = {
  model: IPhoneModel
  allModels: IPhoneModel[]
  shopLinks: ProductShopLink[]
}

export default function CompareSection({ model, allModels, shopLinks }: Props) {
  const otherModels = allModels.filter((m) => m.id !== model.id)
  const defaultCompare = otherModels.find((m) => m.id > model.id) || otherModels[0]

  if (!defaultCompare) return null

  const iosysLink = shopLinks.find((link) => link.shop_id === 1)

  return (
    <section className="l-section" id="compare" aria-labelledby="heading-compare">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-compare">
          {model.model}とその他機種のスペック比較
        </h2>
        <p className="m-section-desc">
          {model.model}とその他のモデルのスペック比較表を用意しました。各シリーズごとの違いを確認するのにご活用ください。
        </p>

        <CompareSelector
          currentModel={model}
          allModels={allModels}
          initialCompareId={defaultCompare.id}
          iosysUrl={iosysLink?.url}
        />
      </div>
    </section>
  )
}
