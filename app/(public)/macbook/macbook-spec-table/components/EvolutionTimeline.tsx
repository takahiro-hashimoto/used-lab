import Link from 'next/link'
import type { AdvanceData } from '@/lib/types'

type Model = {
  slug: string
  model: string
  date: string | null
  advance: AdvanceData | null
}

// シリーズのグルーピング定義（slugのみ管理）
const AIR_GROUPS = [
  { slugs: ['mba-13-2025', 'mba-15-2025'] },
  { slugs: ['mba-13-2024', 'mba-15-2024'] },
  { slugs: ['mba-15-2023'] },
  { slugs: ['mba-13-2022'] },
  { slugs: ['mba-13-2020'] },
]

const PRO_GROUPS = [
  { slugs: ['mbp-14-2024-nov', 'mbp-16-2024-nov'] },
  { slugs: ['mbp-14-2023-nov', 'mbp-16-2023-nov'] },
  { slugs: ['mbp-14-2023', 'mbp-16-2023'] },
  { slugs: ['mbp-13-2022'] },
  { slugs: ['mbp-14-2021', 'mbp-16-2021'] },
  { slugs: ['mbp-13-2020'] },
]

/** "2024/3" → "2024年3月" */
function formatDate(date: string | null): string {
  if (!date) return ''
  const [y, m] = date.split('/')
  return `${y}年${parseInt(m, 10)}月`
}

type Props = {
  models: Model[]
}

function buildGroupTimeline(
  groups: { slugs: string[] }[],
  modelMap: Map<string, Model>,
) {
  return groups
    .map((group, idx) => {
      const resolved = group.slugs.map((s) => modelMap.get(s)).filter((m): m is Model => m != null)
      if (resolved.length === 0) return null
      const representative = resolved[0]
      const features = representative.advance?.all_models?.features
      if (!features?.length) return null
      return {
        date: formatDate(representative.date),
        models: resolved.map((m) => ({ name: m.model, slug: m.slug })),
        filled: idx % 2 === 0,
        items: features,
      }
    })
    .filter((item): item is NonNullable<typeof item> => item != null)
}

export default function EvolutionTimeline({ models }: Props) {
  const modelMap = new Map(models.map((m) => [m.slug, m]))

  const airTimeline = buildGroupTimeline(AIR_GROUPS, modelMap)
  const proTimeline = buildGroupTimeline(PRO_GROUPS, modelMap)

  // advanceデータが未投入の場合はセクション自体を非表示
  if (airTimeline.length === 0 && proTimeline.length === 0) return null

  return (
    <section className="l-section" id="evolution" aria-labelledby="heading-evolution">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-evolution">
          歴代MacBookの主な進化点（シリーズ別）
        </h2>
        <p className="m-section-desc">歴代MacBookの主に進化したポイントをシリーズ別に整理しました。</p>
        <p className="m-section-desc">シリーズを重ねるごとにどのような点がアップデートされてきたのかを把握するのにお役立てください！</p>

        {/* MacBook Air */}
        {airTimeline.length > 0 && (
          <>
            <h3 className="m-section-heading m-section-heading--md u-mt-2xl" style={{ textAlign: 'left' }}>
              MacBook Air シリーズの進化した点
            </h3>

            <div className="evolution-timeline">
              {airTimeline.map((item) => (
                <div key={item.models[0].slug} className="evolution-item">
                  <div className={`evolution-item__marker${item.filled ? ' evolution-item__marker--filled' : ''}`}></div>
                  <div className="evolution-item__content">
                    <span className="evolution-item__date">{item.date}</span>
                    <div className="evolution-item__header">
                      <h4 className="evolution-item__title">
                        {item.models.map((m, i) => (
                          <span key={m.slug}>
                            {i > 0 && ' / '}
                            <Link href={`/macbook/${m.slug}/`}>{m.name}</Link>
                          </span>
                        ))}
                      </h4>
                    </div>
                    <div className="evolution-item__body">
                      <div className="l-grid l-grid--2col l-grid--gap-lg">
                        <div className="evolution-item__col">
                          <ul className="evolution-item__list">
                            {item.items.map((li, i) => (
                              <li key={i}>{li}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* MacBook Pro */}
        {proTimeline.length > 0 && (
          <>
            <h3 className="m-section-heading m-section-heading--md u-mt-3xl" style={{ textAlign: 'left' }}>
              MacBook Pro シリーズの進化した点
            </h3>

            <div className="evolution-timeline">
              {proTimeline.map((item) => (
                <div key={item.models[0].slug} className="evolution-item">
                  <div className={`evolution-item__marker${item.filled ? ' evolution-item__marker--filled' : ''}`}></div>
                  <div className="evolution-item__content">
                    <span className="evolution-item__date">{item.date}</span>
                    <div className="evolution-item__header">
                      <h4 className="evolution-item__title">
                        {item.models.map((m, i) => (
                          <span key={m.slug}>
                            {i > 0 && ' / '}
                            <Link href={`/macbook/${m.slug}/`}>{m.name}</Link>
                          </span>
                        ))}
                      </h4>
                    </div>
                    <div className="evolution-item__body">
                      <div className="l-grid l-grid--2col l-grid--gap-lg">
                        <div className="evolution-item__col">
                          <ul className="evolution-item__list">
                            {item.items.map((li, i) => (
                              <li key={i}>{li}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
