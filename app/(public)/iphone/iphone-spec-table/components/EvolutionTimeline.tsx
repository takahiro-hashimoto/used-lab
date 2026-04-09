import Link from 'next/link'
import type { AdvanceData } from '@/lib/types'

type Model = {
  slug: string
  model: string
  date: string | null
  advance: AdvanceData | null
}

// シリーズのグルーピング定義（slug のみ管理）
const FLAGSHIP_SERIES = [
  { title: 'iPhone 16 シリーズ', standardSlugs: ['16normal', '16plus'], proSlugs: ['16pro', '16promax'] },
  { title: 'iPhone 15 シリーズ', standardSlugs: ['15normal', '15plus'], proSlugs: ['15pro', '15promax'] },
  { title: 'iPhone 14 シリーズ', standardSlugs: ['14normal', '14plus'], proSlugs: ['14pro', '14promax'] },
  { title: 'iPhone 13 シリーズ', standardSlugs: ['13mini', '13normal'], proSlugs: ['13pro', '13promax'] },
  { title: 'iPhone 12 シリーズ', standardSlugs: ['12mini', '12normal'], proSlugs: ['12pro', '12promax'] },
  { title: 'iPhone 11 シリーズ', standardSlugs: ['11normal'], proSlugs: ['11pro', '11promax'] },
]

const SE_SLUGS = ['17e', '16e', 'se3', 'se2']

/** "2024/9" → "2024年9月" */
function formatDate(date: string | null): string {
  if (!date) return ''
  const [y, m] = date.split('/')
  return `${y}年${parseInt(m, 10)}月`
}

type Props = {
  models: Model[]
}

export default function EvolutionTimeline({ models }: Props) {
  const modelMap = new Map(models.map((m) => [m.slug, m]))

  // フラッグシップ タイムライン構築
  const flagshipTimeline = FLAGSHIP_SERIES.map((series, idx) => {
    // 代表モデル（advance取得用）: 無印の先頭 or Proの先頭
    const standardModels = series.standardSlugs.map((s) => modelMap.get(s)).filter((m): m is Model => m != null)
    const proModels = series.proSlugs.map((s) => modelMap.get(s)).filter((m): m is Model => m != null)
    const representative = standardModels[0] || proModels[0]
    const advance = representative?.advance

    const columns = []

    // 全モデル共通
    if (advance?.all_models?.features?.length) {
      columns.push({
        category: 'シリーズ共通',
        models: [] as { name: string; slug: string }[],
        items: advance.all_models.features,
      })
    }

    // 無印モデルのみ
    if (advance?.standard_only?.features?.length) {
      columns.push({
        category: 'スタンダードモデルのみ',
        models: standardModels.map((m) => ({ name: m.model, slug: m.slug })),
        items: advance.standard_only.features,
      })
    }

    // Proモデルのみ
    if (advance?.pro_only?.features?.length) {
      columns.push({
        category: 'プロモデルのみ',
        models: proModels.map((m) => ({ name: m.model, slug: m.slug })),
        items: advance.pro_only.features,
      })
    }

    return {
      title: series.title,
      date: formatDate(representative?.date ?? null),
      filled: idx % 2 === 0,
      columns,
    }
  }).filter((item) => item.columns.length > 0)

  // SE タイムライン構築
  const seTimeline = SE_SLUGS
    .map((slug) => modelMap.get(slug))
    .filter((m): m is Model => m != null && m.advance?.all_models?.features != null)
    .map((m, idx) => ({
      title: m.model,
      slug: m.slug,
      date: formatDate(m.date),
      filled: idx % 2 === 0,
      items: m.advance!.all_models!.features,
    }))

  return (
    <section className="l-section" id="evolution" aria-labelledby="heading-evolution">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-evolution">
          歴代iPhoneの主な進化点（時系列順）
        </h2>
        <p className="m-section-desc">歴代iPhoneの主に進化したポイントを時系列順に整理しました。</p>
        <p className="m-section-desc">シリーズを重ねるごとにどのような点がアップデートされてきたのかを把握するのにお役立てください！</p>

        <h3 className="m-section-heading m-section-heading--md u-mt-2xl" style={{ textAlign: 'left' }}>
          フラッグシップモデルの進化した点
        </h3>

        <div className="evolution-timeline">
          {flagshipTimeline.map((item) => (
            <div key={item.title} className="evolution-item">
              <div className={`evolution-item__marker${item.filled ? ' evolution-item__marker--filled' : ''}`}></div>
              <div className="evolution-item__content">
                <span className="evolution-item__date">{item.date}</span>
                <div className="evolution-item__header">
                  <h4 className="evolution-item__title">{item.title}</h4>
                </div>
                <div className="evolution-item__body">
                  <div className="l-grid l-grid--3col l-grid--gap-lg evolution-item__details">
                    {item.columns.map((col) => (
                      <div key={col.category} className="evolution-item__col">
                        <p className="evolution-item__category">{col.category}</p>
                        {col.models.length > 0 && (
                          <div className="evolution-item__model-links">
                            {col.models.map((m) => (
                              <Link key={m.slug} href={`/iphone/${m.slug}/`} className="evolution-item__model-link">
                                {m.name}
                              </Link>
                            ))}
                          </div>
                        )}
                        <ul className="evolution-item__list">
                          {col.items.map((li, i) => (
                            <li key={i}>{li}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="m-section-heading m-section-heading--md u-mt-3xl" style={{ textAlign: 'left' }}>
          廉価モデル（SEシリーズ）の進化した点
        </h3>

        <div className="evolution-timeline">
          {seTimeline.map((item) => (
            <div key={item.title} className="evolution-item">
              <div className={`evolution-item__marker${item.filled ? ' evolution-item__marker--filled' : ''}`}></div>
              <div className="evolution-item__content">
                <span className="evolution-item__date">{item.date}</span>
                <div className="evolution-item__header">
                  <h4 className="evolution-item__title">
                    <Link href={`/iphone/${item.slug}/`}>{item.title}</Link>
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
    </section>
  )
}
