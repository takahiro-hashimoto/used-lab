import type { ReactNode } from 'react'
import type { AdvanceData } from '@/lib/types'

// ============================================================
// 歴代モデルの進化点タイムライン（Galaxy / Pixel 共通の土台）
// ============================================================
// カテゴリ側の違いは「シリーズの分け方」「見出しの文言」「機種名の描画」の
// 3点だけで、advance の展開・並び替え・マークアップは完全に同じだった。
// 差分だけを props で受け取り、本体はここに1つ置く。

/** タイムラインに必要な最小の型。GalaxyModel / PixelModel の両方が満たす */
export type TimelineModel = {
  id: number
  model: string
  date: string | null
  advance: AdvanceData | null
}

/** シリーズの分け方。上から順に判定し、最初に一致したものへ振り分ける */
export type SeriesDef<T> = {
  key: string
  label: string
  match: (model: T) => boolean
}

type TimelineItem<T> = {
  model: T
  date: string
  filled: boolean
  columns: { category: string; items: string[] }[]
}

type Props<T extends TimelineModel> = {
  models: T[]
  heading: string
  /** 見出し下の説明文（1〜2文） */
  descriptions: string[]
  series: SeriesDef<T>[]
  /** advance の standard_only / pro_only に付ける見出し。カテゴリで呼び方が違う */
  standardLabel: string
  proLabel: string
  /** 機種名の描画。モーダルボタンがカテゴリごとに別コンポーネントなので注入する */
  renderTitle: (model: T) => ReactNode
  /** どのシリーズにも当てはまらない機種の受け皿 */
  otherLabel?: string
}

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

function hasFeatures(a: AdvanceData | null): boolean {
  return !!(a?.all_models?.features?.length || a?.standard_only?.features?.length || a?.pro_only?.features?.length)
}

/**
 * シリーズ定義の順に、重複なく振り分ける。
 * 先に一致したシリーズが取るので、定義の並べ替えで取りこぼしや重複は起きない。
 */
function groupBySeries<T extends TimelineModel>(
  items: TimelineItem<T>[],
  series: SeriesDef<T>[],
  otherLabel: string,
) {
  const buckets = series.map((s) => ({ key: s.key, label: s.label, items: [] as TimelineItem<T>[] }))
  const others: TimelineItem<T>[] = []

  for (const item of items) {
    const i = series.findIndex((s) => s.match(item.model))
    if (i === -1) others.push(item)
    else buckets[i].items.push(item)
  }

  const result = buckets.filter((b) => b.items.length > 0)
  if (others.length > 0) result.push({ key: 'other', label: otherLabel, items: others })
  return result
}

export default function EvolutionTimeline<T extends TimelineModel>({
  models,
  heading,
  descriptions,
  series,
  standardLabel,
  proLabel,
  renderTitle,
  otherLabel = 'その他のシリーズ',
}: Props<T>) {
  const timeline: TimelineItem<T>[] = [...models]
    .filter((m) => hasFeatures(m.advance))
    // 新しい機種が上に来るよう降順。読者の関心は現行付近の世代差にある
    .sort((a, b) => parseDateValue(b.date) - parseDateValue(a.date))
    .map((m, idx) => {
      const advance = m.advance
      const columns: { category: string; items: string[] }[] = []
      if (advance?.all_models?.features?.length) {
        columns.push({ category: '共通の進化点', items: advance.all_models.features })
      }
      if (advance?.standard_only?.features?.length) {
        columns.push({ category: standardLabel, items: advance.standard_only.features })
      }
      if (advance?.pro_only?.features?.length) {
        columns.push({ category: proLabel, items: advance.pro_only.features })
      }
      return { model: m, date: formatDate(m.date), filled: idx % 2 === 0, columns }
    })

  const sections = groupBySeries(timeline, series, otherLabel)

  return (
    <section className="l-section" id="evolution" aria-labelledby="heading-evolution">
      <div className="l-container">
        <h2 className="m-section-heading m-section-heading--lg" id="heading-evolution">
          {heading}
        </h2>
        {descriptions.map((d) => (
          <p key={d} className="m-section-desc">{d}</p>
        ))}

        {sections.map((section) => (
          <div key={section.key}>
            <h3 className="m-section-heading m-section-heading--md u-mt-2xl" style={{ textAlign: 'left' }}>
              {section.label}
            </h3>
            <div className="evolution-timeline">
              {section.items.map((item) => (
                <div key={item.model.id} className="evolution-item">
                  <div className={`evolution-item__marker${item.filled ? ' evolution-item__marker--filled' : ''}`}></div>
                  <div className="evolution-item__content">
                    <span className="evolution-item__date">{item.date}</span>
                    <div className="evolution-item__header">
                      <h4 className="evolution-item__title">{renderTitle(item.model)}</h4>
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
        ))}
      </div>
    </section>
  )
}
