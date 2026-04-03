import Link from 'next/link'
import type { AdvanceData } from '@/lib/types'

type Model = {
  slug: string
  model: string
  date: string | null
  advance: AdvanceData | null
}

const SERIES_SLUGS = ['series11', 'series10', 'series9', 'series8', 'series7', 'series6', 'series5', 'series4']
const SE_SLUGS = ['se3', 'se2', 'se']
const ULTRA_SLUGS = ['ultra3', 'ultra2', 'ultra']

/** "2024/9" → "2024年9月" */
function formatDate(date: string | null): string {
  if (!date) return ''
  const [y, m] = date.split('/')
  return `${y}年${parseInt(m, 10)}月`
}

function buildTimeline(slugs: string[], modelMap: Map<string, Model>) {
  return slugs
    .map((slug) => modelMap.get(slug))
    .filter((m): m is Model => m != null && m.advance?.all_models?.features != null)
    .map((m, idx) => ({
      title: m.model,
      slug: m.slug,
      date: formatDate(m.date),
      filled: idx % 2 === 0,
      items: m.advance!.all_models!.features,
    }))
}

type Props = {
  models: Model[]
}

export default function EvolutionTimeline({ models }: Props) {
  const modelMap = new Map(models.map((m) => [m.slug, m]))

  const seriesTimeline = buildTimeline(SERIES_SLUGS, modelMap)
  const seTimeline = buildTimeline(SE_SLUGS, modelMap)
  const ultraTimeline = buildTimeline(ULTRA_SLUGS, modelMap)

  const renderTimeline = (items: ReturnType<typeof buildTimeline>) => (
    <div className="m-card m-card--shadow" style={{ padding: 'var(--space-lg)' }}>
      <div className="evolution-timeline">
        {items.map((item) => (
          <div key={item.slug} className="evolution-item">
            <div className={`evolution-item__marker${item.filled ? ' evolution-item__marker--filled' : ''}`}></div>
            <div className="evolution-item__content">
              <span className="evolution-item__date">{item.date}</span>
              <div className="evolution-item__header">
                <h4 className="evolution-item__title">
                  <Link href={`/watch/${item.slug}/`}>{item.title}</Link>
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
    </div>
  )

  return (
    <section className="l-section" id="evolution" aria-labelledby="heading-evolution">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-evolution">
          歴代Apple Watchの主な進化点（シリーズ別）
        </h2>
        <p className="m-section-desc">歴代Apple Watchの主に進化したポイントをシリーズ別に整理しました。</p>
        <p className="m-section-desc">シリーズを重ねるごとにどのような点がアップデートされてきたのかを把握するのにお役立てください！</p>

        {/* Series */}
        <h3 className="m-section-heading m-section-heading--md u-mt-2xl" style={{ textAlign: 'left' }}>
          Apple Watch Series の進化した点
        </h3>
        {renderTimeline(seriesTimeline)}

        {/* SE */}
        <h3 className="m-section-heading m-section-heading--md u-mt-3xl" style={{ textAlign: 'left' }}>
          Apple Watch SE シリーズの進化した点
        </h3>
        {renderTimeline(seTimeline)}

        {/* Ultra */}
        <h3 className="m-section-heading m-section-heading--md u-mt-3xl" style={{ textAlign: 'left' }}>
          Apple Watch Ultra シリーズの進化した点
        </h3>
        {renderTimeline(ultraTimeline)}
      </div>
    </section>
  )
}
