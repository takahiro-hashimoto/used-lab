import type { MacModel } from '@/lib/types'

type Props = {
  model: MacModel
}

/**
 * 表示する進化ポイントを返す。空なら下のセクションは描画されない。
 * 目次は静的なリストなので、ここが空だと #upgrade だけがリンク切れになる。
 * 目次側と判定を一致させるため、この関数を唯一の判定元にする。
 */
export function advanceFeaturesOf(model: MacModel): string[] {
  if (!model.advance) return []

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

  return [...new Set(features)]
}

export default function AdvanceFeatures({ model }: Props) {
  const uniqueFeatures = advanceFeaturesOf(model)
  if (uniqueFeatures.length === 0) return null

  return (
    <section className="l-section" id="upgrade" aria-labelledby="heading-upgrade">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-upgrade">
          {model.model}の進化したポイント
        </h2>
        <p className="m-section-desc">前モデルから進化した主要なポイントをまとめました。</p>

        <div className="m-card m-card--shadow upgrade-card">
          <ul className="upgrade-list m-check-list m-check-list--baseline">
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
