import type { PixelModel } from '@/lib/types'
import ModelModalButton from './ModelModalButton'

type Model = PixelModel

/** "2024/9" → "2024年9月" */
function formatDate(date: string | null): string {
  if (!date) return ''
  const [y, m] = date.split('/')
  return m ? `${y}年${parseInt(m, 10)}月` : `${y}年`
}

function parseDateValue(date: string | null): number {
  if (!date) return 0
  const [y, m, d] = date.split('/')
  return new Date(Number(y), Number(m ?? 1) - 1, Number(d ?? 1)).getTime()
}

type Props = {
  models: Model[]
  avgPrices: Record<number, number | null>
  iosysUrlMap: Record<number, string>
}

export default function EvolutionTimeline({ models, avgPrices, iosysUrlMap }: Props) {
  // advance データを持つモデルを発売日順に並べてタイムライン化
  const timeline = [...models]
    .filter((m) => {
      const a = m.advance
      return !!(a?.all_models?.features?.length || a?.standard_only?.features?.length || a?.pro_only?.features?.length)
    })
    .sort((a, b) => parseDateValue(a.date) - parseDateValue(b.date))
    .map((m, idx) => {
      const advance = m.advance
      const columns: { category: string; items: string[] }[] = []
      if (advance?.all_models?.features?.length) {
        columns.push({ category: '共通の進化点', items: advance.all_models.features })
      }
      if (advance?.standard_only?.features?.length) {
        columns.push({ category: 'スタンダードモデルのみ', items: advance.standard_only.features })
      }
      if (advance?.pro_only?.features?.length) {
        columns.push({ category: 'Proモデルのみ', items: advance.pro_only.features })
      }
      return {
        model: m,
        title: m.model,
        date: formatDate(m.date),
        filled: idx % 2 === 0,
        columns,
      }
    })

  return (
    <section className="l-section" id="evolution" aria-labelledby="heading-evolution">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-evolution">
          歴代Google Pixelの主な進化点（時系列順）
        </h2>
        <p className="m-section-desc">歴代Google Pixelの主に進化したポイントを時系列順に整理しました。</p>
        <p className="m-section-desc">シリーズを重ねるごとにどのような点がアップデートされてきたのかを把握するのにお役立てください！</p>

        <div className="evolution-timeline u-mt-2xl">
          {timeline.map((item) => (
            <div key={item.model.id} className="evolution-item">
              <div className={`evolution-item__marker${item.filled ? ' evolution-item__marker--filled' : ''}`}></div>
              <div className="evolution-item__content">
                <span className="evolution-item__date">{item.date}</span>
                <div className="evolution-item__header">
                  <h4 className="evolution-item__title">
                    <ModelModalButton
                      model={item.model}
                      avgPrice={avgPrices[item.model.id] ?? null}
                      iosysUrl={iosysUrlMap[item.model.id] ?? null}
                      className="evolution-item__model-link"
                    />
                  </h4>
                </div>
                <div className="evolution-item__body">
                  <div className="l-grid l-grid--3col l-grid--gap-lg evolution-item__details">
                    {item.columns.map((col) => (
                      <div key={col.category} className="evolution-item__col">
                        <p className="evolution-item__category">{col.category}</p>
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
      </div>
    </section>
  )
}
