import type { ProductShopLink } from '@/lib/types'

type BaseModel = {
  id: number
  model: string | null
}

type Props<T extends BaseModel> = {
  model: T
  allModels: T[]
  shopLinks: ProductShopLink[]
  /** 表示名（デフォルトは model.model） */
  displayName?: string
  /** CompareSelector コンポーネント */
  children: (props: {
    currentModel: T
    allModels: T[]
    initialCompareId: number
    iosysUrl?: string
  }) => React.ReactNode
}

export default function CompareSection<T extends BaseModel>({
  model, allModels, shopLinks, displayName, children,
}: Props<T>) {
  const name = displayName || model.model || ''
  const otherModels = allModels.filter((m) => m.id !== model.id)
  const defaultCompare = otherModels.find((m) => m.id > model.id) || otherModels[0]

  if (!defaultCompare) return null

  const iosysLink = shopLinks.find((link) => link.shop_id === 1)

  return (
    <section className="l-section" id="compare" aria-labelledby="heading-compare">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-compare">
          {name}とその他機種のスペック比較
        </h2>
        <p className="m-section-desc">
          {name}とその他のモデルのスペック比較表を用意しました。各シリーズごとの違いを確認するのにご活用ください。
        </p>

        {children({
          currentModel: model,
          allModels,
          initialCompareId: defaultCompare.id,
          iosysUrl: iosysLink?.url,
        })}
      </div>
    </section>
  )
}
