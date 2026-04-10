import Link from 'next/link'
import type { AdvanceData } from '@/lib/types'

type Model = {
  slug: string
  model: string
  date: string | null
  advance: AdvanceData | null
}

// シリーズのグルーピング定義（slugのみ管理）
const PRO_GROUPS = [
  { slugs: ['pro11-6', 'pro13-2'] },
  { slugs: ['pro11-5', 'pro13-1'] },
  { slugs: ['pro11-4', 'pro12-6'] },
  { slugs: ['pro11-3', 'pro12-5'] },
  { slugs: ['pro11-2', 'pro12-4'] },
]

const AIR_GROUPS = [
  { slugs: ['air-7-11', 'air-7-13'] },
  { slugs: ['air-6-11', 'air-6-13'] },
  { slugs: ['air-5'] },
  { slugs: ['air-4'] },
]

const MINI_SLUGS = ['mini-7', 'mini-6']
const STANDARD_SLUGS = ['normal-11', 'normal-10', 'normal-9']

/** "2024/5" → "2024年5月" */
function formatDate(date: string | null): string {
  if (!date) return ''
  const [y, m] = date.split('/')
  return `${y}年${parseInt(m, 10)}月`
}

type Props = {
  models: Model[]
}

/** 複数モデルをグルーピングしてタイムラインアイテムを構築 */
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

/** 単体モデルのタイムラインアイテムを構築 */
function buildSingleTimeline(slugs: string[], modelMap: Map<string, Model>) {
  return slugs
    .map((slug) => modelMap.get(slug))
    .filter((m): m is Model => m != null && m.advance?.all_models?.features != null)
    .map((m, idx) => ({
      date: formatDate(m.date),
      title: m.model,
      slug: m.slug,
      filled: idx % 2 === 0,
      items: m.advance!.all_models!.features,
    }))
}

export default function EvolutionTimeline({ models }: Props) {
  const modelMap = new Map(models.map((m) => [m.slug, m]))

  const proTimeline = buildGroupTimeline(PRO_GROUPS, modelMap)
  const airTimeline = buildGroupTimeline(AIR_GROUPS, modelMap)
  const miniTimeline = buildSingleTimeline(MINI_SLUGS, modelMap)
  const standardTimeline = buildSingleTimeline(STANDARD_SLUGS, modelMap)

  return (
    <section className="l-section" id="evolution" aria-labelledby="heading-evolution">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-evolution">
          歴代iPadの主な進化点（シリーズ別）
        </h2>
        <p className="m-section-desc">歴代iPadの主に進化したポイントをシリーズ別に整理しました。</p>
        <p className="m-section-desc">シリーズを重ねるごとにどのような点がアップデートされてきたのかを把握するのにお役立てください！</p>

        {/* iPad Pro */}
        <h3 className="m-section-heading m-section-heading--md u-mt-2xl" style={{ textAlign: 'left' }}>
          iPad Pro シリーズの進化した点
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
                        <Link href={`/ipad/${m.slug}/`}>{m.name}</Link>
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

        {/* iPad Air */}
        <h3 className="m-section-heading m-section-heading--md u-mt-3xl" style={{ textAlign: 'left' }}>
          iPad Air シリーズの進化した点
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
                        <Link href={`/ipad/${m.slug}/`}>{m.name}</Link>
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

        {/* iPad mini */}
        <h3 className="m-section-heading m-section-heading--md u-mt-3xl" style={{ textAlign: 'left' }}>
          iPad mini シリーズの進化した点
        </h3>

        <div className="evolution-timeline">
          {miniTimeline.map((item) => (
            <div key={item.slug} className="evolution-item">
              <div className={`evolution-item__marker${item.filled ? ' evolution-item__marker--filled' : ''}`}></div>
              <div className="evolution-item__content">
                <span className="evolution-item__date">{item.date}</span>
                <div className="evolution-item__header">
                  <h4 className="evolution-item__title">
                    <Link href={`/ipad/${item.slug}/`}>{item.title}</Link>
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

        {/* iPad（無印） */}
        <h3 className="m-section-heading m-section-heading--md u-mt-3xl" style={{ textAlign: 'left' }}>
          iPad（無印）シリーズの進化した点
        </h3>

        <div className="evolution-timeline">
          {standardTimeline.map((item) => (
            <div key={item.slug} className="evolution-item">
              <div className={`evolution-item__marker${item.filled ? ' evolution-item__marker--filled' : ''}`}></div>
              <div className="evolution-item__content">
                <span className="evolution-item__date">{item.date}</span>
                <div className="evolution-item__header">
                  <h4 className="evolution-item__title">
                    <Link href={`/ipad/${item.slug}/`}>{item.title}</Link>
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
        <div className="m-callout m-callout--tip u-mt-2xl">
          <span className="m-callout__label">memo</span>
          <p className="m-callout__text">
            各シリーズの進化がわかったら、<Link href="/ipad/recommend/">おすすめ中古iPad機種まとめ</Link>で用途別の狙い目モデルも確認してみてください。
          </p>
        </div>
      </div>
    </section>
  )
}
