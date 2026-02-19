import type { IPadModel } from '@/lib/types'

type Props = {
  model: IPadModel
}

export default function AdvanceFeatures({ model }: Props) {
  if (!model.advance) return null

  const isProModel = model.model.toLowerCase().includes('pro')
  const features: string[] = []

  if (model.advance.all_models?.features) {
    features.push(...model.advance.all_models.features)
  }
  if (isProModel) {
    if (model.advance.pro_only?.features) {
      features.push(...model.advance.pro_only.features)
    }
  } else {
    if (model.advance.standard_only?.features) {
      features.push(...model.advance.standard_only.features)
    }
  }

  const uniqueFeatures = [...new Set(features)]
  if (uniqueFeatures.length === 0) return null

  return (
    <section className="l-section l-section--bg-subtle" id="upgrade" aria-labelledby="heading-upgrade">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-upgrade">
          {model.model}の進化したポイント
        </h2>
        <p className="m-section-desc">前モデルから進化した主要なポイントをまとめました。</p>

        <div className="m-card m-card--shadow upgrade-card">
          <ul className="upgrade-list">
            {uniqueFeatures.map((feature, i) => (
              <li key={i}>
                <i className="fa-solid fa-circle-check" aria-hidden="true"></i> {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
