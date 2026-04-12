import type { ProductShopLink } from '@/lib/types'

type BaseModel = {
  id: number
  model: string | null
}

type LinkItem = {
  href: string
  label: string
}

type CompareLink = {
  href: string
  label: string
  desc: string
}

type Props<T extends BaseModel> = {
  model: T
  allModels: T[]
  shopLinks: ProductShopLink[]
  /** 表示名（デフォルトは model.model） */
  displayName?: string
  /** スペック比較記事へのリンク */
  specLinks?: LinkItem[]
  /** よく比較されている組み合わせリンク */
  compareLinks?: CompareLink[]
  /** モデル個別URLがない場合に使うイオシスカテゴリURL */
  fallbackIosysUrl?: string
  /** CompareSelector コンポーネント */
  children: (props: {
    currentModel: T
    allModels: T[]
    initialCompareId: number
    iosysUrl?: string
    fallbackIosysUrl?: string
    shopLinks: ProductShopLink[]
  }) => React.ReactNode
}

export default function CompareSection<T extends BaseModel>({
  model, allModels, shopLinks, displayName, specLinks, compareLinks, fallbackIosysUrl, children,
}: Props<T>) {
  const name = displayName || model.model || ''
  const otherModels = allModels.filter((m) => m.id !== model.id)
  const defaultCompare = otherModels.find((m) => m.id > model.id) || otherModels[0]

  if (!defaultCompare) return null

  const iosysLink = shopLinks.find((link) => link.product_id === model.id && link.shop_id === 1)

  return (
    <section className="l-section" id="compare" aria-labelledby="heading-compare">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-compare">
          {name}とその他機種のスペック比較
        </h2>
        
        <p className="m-section-desc">{name}とその他のモデルのスペック比較表を用意しました。</p>
        <p className="m-section-desc">各シリーズごとの違いを確認するのにご活用ください。</p>

        {children({
          currentModel: model,
          allModels,
          initialCompareId: defaultCompare.id,
          iosysUrl: iosysLink?.url,
          fallbackIosysUrl,
          shopLinks,
        })}

        {compareLinks && compareLinks.length > 0 && (
          <>
            <h3 className="m-section-heading u-mt-2xl" style={{ textAlign: 'left' }}>よく比較されている組み合わせ</h3>
            <div className="l-grid l-grid--2col" style={{ marginTop: 'var(--space-md)' }}>
              {compareLinks.map((link) => (
                <a key={link.href} className="m-card m-card--shadow related-link-card related-link-card--icon m-card--hoverable" href={link.href}>
                  <span className="related-link-card__icon m-icon-box m-icon-box--sm">
                    <i className="fa-solid fa-scale-balanced" aria-hidden="true" />
                  </span>
                  <p className="related-link-card__title">{link.label}</p>
                  <p className="related-link-card__desc">{link.desc}</p>
                  <span className="related-link-card__arrow">
                    <i className="fa-solid fa-chevron-right" aria-hidden="true" />
                  </span>
                </a>
              ))}
            </div>
          </>
        )}

        {specLinks && specLinks.length > 0 && (
          <div className="m-callout m-callout--tip u-mt-2xl">
            <span className="m-callout__label">memo</span>
            <p className="m-callout__text">
              {specLinks.map((link, i) => (
                <span key={link.href}>
                  {i > 0 && ''}
                  スペックを比較したい方は「<a href={link.href}>{link.label}</a>」もあわせてご覧ください。
                </span>
              ))}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
